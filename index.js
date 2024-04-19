const { 
    TelegramBot, 
    axios, 
    botToken, 
    githubToken, 
    githubRepoURL, 
    expressApp, 
    port,
    genAI,
    db
} = require('./config/config.js');
const { getDocs, collection, setDoc, updateDoc, doc, getDoc } = require("firebase/firestore");
const fs = require("fs");
const pdf = require('@bakedpotatolord/pdf-parse');
const path = require('path');

// Commands
const helloHandler = require('./commands/help');
const showallpdfHandler = require('./commands/showpdf');
const showsemesterpdfHandler = require('./commands/semesterpdf');
const busHandler = require('./commands/bus');
const mediadownloadHandler = require('./commands/mediadownloader');
const groupfeaturesHandler = require('./commands/group-features');
const { text } = require('express');

const bot = new TelegramBot(botToken, { polling: true });

expressApp.listen(port, () => {
  console.log(`Local server is running on port ${port}`);
});

// Initialize command handlers
helloHandler(bot);
showallpdfHandler(bot);
showsemesterpdfHandler(bot);
busHandler(bot);
mediadownloadHandler(bot);
groupfeaturesHandler(bot);


bot.on("photo", async (msg) => {
  const userId = msg.from.id;
  const caption = msg.caption;
  const chatId = msg.chat.id;
  const imageId = msg.photo[msg.photo.length - 1].file_id;

  //if caption is not empty
  if (caption) {
    await geminiImageProcess(imageId, userId, caption, chatId, bot, msg);
  }
});


async function geminipdfProcess(pdfId, userId, prompt, chatId, bot, msg) {

  const waitingMessage = await bot.sendSticker(chatId, "https://t.me/botresourcefordev/402");
  const userPdfFolder = path.join(__dirname, `pdf/user_${userId}`);
  if (!fs.existsSync(userPdfFolder)) {
    fs.mkdirSync(userPdfFolder, { recursive: true });
  }

  // Download and save the pdf in the user's folder
  const pdfFilePath = path.join(userPdfFolder, `${pdfId}.pdf`);
  const pdfFile = await bot.downloadFile(pdfId, userPdfFolder);
  fs.renameSync(pdfFile, pdfFilePath);

  // analyze the pdf with pdf2json and get the text \
  let pdftext = '';
  let dataBuffer = fs.readFileSync(pdfFilePath);

  try {
    const data = await pdf(dataBuffer);
    pdftext = data.text;
  } catch (error) {
    console.error('Failed to parse PDF:', error);
    await bot.sendMessage(chatId, 'Sorry, I failed to analyze the PDF. Please try again with a different file.');
    return;
  }

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const pdfquestion = 'Act like you are document analyzer. You analyze the document below and generate a response based on the prompt. \n\n' + pdftext + '\n\nThe prompt is:' + prompt;
  const result = await model.generateContent(pdfquestion);
  const response = await result.response;
  const text = response.text();

  bot.deleteMessage(chatId, waitingMessage.message_id);



  bot.sendMessage(chatId, text, {
    reply_to_message_id: msg.message_id
  });

  //delete the pdf file

  fs.unlinkSync(pdfFilePath);

}






bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const chattype = msg.chat.type;


  //check if the user is in the database in firebase

  const userDoc = doc(db, "demousers", msg.from.id.toString());
  const userSnapshot = await getDoc(userDoc);

  if (!userSnapshot.exists()) {
    bot.sendMessage(chatId, "Please type /start to get started");
    return;
  }

 

  const Bottleneck = require('bottleneck');
  const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 100 // 10 messages per second
  });
  
  if (msg.reply_to_message) {
    const chatId = msg.chat.id;
    const usersCollection = collection(db, "demo");
    const usersSnapshot = await getDocs(usersCollection);
  
    if ((msg.reply_to_message.photo || msg.reply_to_message.video || msg.reply_to_message.document || msg.reply_to_message.audio || msg.reply_to_message.voice || msg.reply_to_message.animation || msg.reply_to_message.sticker) && msg.text == '/broadcast' && msg.from.id == 1927701329) {
      const caption = msg.reply_to_message.caption;
      bot.sendMessage(chatId, "Sending broadcast to all users...");
  
      const tasks = usersSnapshot.docs.map((doc) => {
        return limiter.schedule(() => {
          const userData = doc.data();
          const userChatId = userData.userid;
  
          console.log('sending broadcast to user:', userChatId);
  
          try {
            if (msg.reply_to_message.photo) {
              bot.sendPhoto(userChatId, msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1].file_id, { caption });
            } else if (msg.reply_to_message.video) {
              bot.sendVideo(userChatId, msg.reply_to_message.video.file_id, { caption });
            } else if (msg.reply_to_message.document) {
              bot.sendDocument(userChatId, msg.reply_to_message.document.file_id, { caption });
            } else if (msg.reply_to_message.audio) {
              bot.sendAudio(userChatId, msg.reply_to_message.audio.file_id, { caption });
            } else if (msg.reply_to_message.voice) {
              bot.sendVoice(userChatId, msg.reply_to_message.voice.file_id, { caption });
            } else if (msg.reply_to_message.animation) {
              bot.sendAnimation(userChatId, msg.reply_to_message.animation.file_id, { caption });
            } else if (msg.reply_to_message.sticker) {
              bot.sendSticker(userChatId, msg.reply_to_message.sticker.file_id);
            }
          } catch (error) {
            console.log('Failed to send message to user:', userChatId);
          }
        });
      });
  
      Promise.all(tasks).then(() => {
        bot.sendMessage(chatId, "Broadcast sent to all users");
      });
  
    } else if (msg.reply_to_message.text && msg.text == '/broadcast' && msg.from.id == 1927701329) {
      bot.sendMessage(chatId, "Sending broadcast to all users...");
  
      const tasks = usersSnapshot.docs.map((doc) => {
        return limiter.schedule(() => {
          const userData = doc.data();
          const userChatId = userData.userid;
          try {
            bot.sendMessage(userChatId, msg.reply_to_message.text);
          } catch (error) {
            console.log('Failed to send message to user:', userChatId);
          }
        });
      });
  
      Promise.all(tasks).then(() => {
        bot.sendMessage(chatId, "Broadcast sent to all users");
      });
  
    } else if (msg.text == '/broadcast' && msg.from.id != 1927701329) {
      bot.sendMessage(chatId, "You are not authorized to use this command");
    }
  }
  
  





  if (chattype === "private" && msg.text && !msg.text.startsWith('/') && !msg.text.startsWith('http') && !msg.reply_to_message) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const waitingMessage = await bot.sendSticker(chatId, "https://t.me/botresourcefordev/402");
    const prompt = msg.text;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    bot.deleteMessage(chatId, waitingMessage.message_id);
    bot.sendMessage(chatId, text, {
      reply_to_message_id: msg.message_id
    } );
  }

  if((chattype === "group" || chattype === "supergroup") && msg.text && !msg.text.startsWith('/') && !msg.text.startsWith('http') && !msg.reply_to_message && msg.text.startsWith('@')) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const waitingMessage = await bot.sendSticker(chatId, "https://t.me/botresourcefordev/402");
    const prompt = msg.text.substring(1); // remove '@' from the start of the message
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    bot.deleteMessage(chatId, waitingMessage.message_id);
    bot.sendMessage(chatId, text, {
      reply_to_message_id: msg.message_id
    } );
  }

  if(chattype === "group" || chattype === "supergroup") {
    const userid = msg.from.id;
        //check the firebase database for the group (groups -> groupid -> membersid[])

        const groupDoc = doc(db, "groups", chatId.toString());
        const groupSnapshot = await getDoc(groupDoc);
    
        if (groupSnapshot.exists()) {
          const groupData = groupSnapshot.data();
          const members = groupData.members || [];
    
          if (!members.includes(msg.from.id)) {
            members.push(msg.from.id);
            await updateDoc(groupDoc, { members });
          }
        } else {
          await setDoc(groupDoc, {
            members: [msg.from.id]
          });
        }
  }    


  if (msg.reply_to_message && msg.reply_to_message.photo && !msg.text.includes('/')) {
    const userId = msg.from.id;
    const prompt = msg.text;
    const imageId = msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1].file_id;
    const chatId = msg.chat.id;

    //get the chat type

    if (chattype === "private") {
      await geminiImageProcess(imageId, userId, prompt, chatId, bot, msg);
    } else if (chattype === "group" || chattype === "supergroup" && msg.text.startsWith('@')) {
      await geminiImageProcess(imageId, userId, prompt, chatId, bot, msg);
    } else {
      bot.sendMessage(chatId, "You need to ask the question including '@' at first in the group chat");
    }

  }


  if (msg.reply_to_message && msg.text && msg.text.startsWith('/set')) {
    let replyToMessage = msg.reply_to_message;
    let fileId = null;
    let fileType = null;
    let text = null;

    if (replyToMessage.photo) {
      fileId = replyToMessage.photo[0].file_id;
      fileType = 'photo';
    } else if (replyToMessage.document) {
      fileId = replyToMessage.document.file_id;
      fileType = 'document';
    } else if (replyToMessage.audio) {
      fileId = replyToMessage.audio.file_id;
      fileType = 'audio';
    } else if (replyToMessage.voice) {
      fileId = replyToMessage.voice.file_id;
      fileType = 'audio/ogg';
    } else if (replyToMessage.video) {
      fileId = replyToMessage.video.file_id;
      fileType = 'video';
    } else if (replyToMessage.animation) {
      fileId = replyToMessage.animation.file_id;
      fileType = 'animation';
    } else if (replyToMessage.sticker) { // Add this condition
      fileId = replyToMessage.sticker.file_id;
      fileType = 'sticker';
    } else if (replyToMessage.text) {
      text = replyToMessage.text;
      fileType = 'text';
    }

    if (fileId || text) {
      let command = msg.text.split(' ')[1];
      let docPath = chattype === 'private' ? "users" : "groups";
      const chatDoc = doc(db, docPath, chatId.toString());
      const chatSnapshot = await getDoc(chatDoc);

      if (chatSnapshot.exists()) {
        const chatData = chatSnapshot.data();
        const commands = chatData.commands || {};

        const newIndex = commands[command] ? commands[command].length : 0;

        if (commands[command]) {
          commands[command].push({ fileId, fileType, text, index: newIndex });
        } else {
          commands[command] = [{ fileId, fileType, text, index: newIndex }];
        }

        await updateDoc(chatDoc, { commands });
      } else {
        await setDoc(chatDoc, {
          commands: {
            [command]: [{ fileId, fileType, text, index: 0 }]
          }
        });
      }

      bot.sendMessage(chatId, `File added to command /${command}`, {
        reply_to_message_id: msg.message_id
      });
    }
  } else if (msg.reply_to_message && msg.text === '/remove') {
    let idPattern = /ID: (\d+)/;
    let match = null;
    let id = null;

    // Check if the replied message is a caption or text
    if (msg.reply_to_message.caption) {
        match = msg.reply_to_message.caption.match(idPattern);
    } else if (msg.reply_to_message.text) {
        // Extract the ID from the first line of the text
        const firstLine = msg.reply_to_message.text.split('\n')[0];
        match = firstLine.match(idPattern);
    }

    if (match) {
        id = parseInt(match[1], 10);
        let docPath = chattype === 'private' ? "users" : "groups";
        const chatDoc = doc(db, docPath, chatId.toString());
        const chatSnapshot = await getDoc(chatDoc);

        if (chatSnapshot.exists()) {
            const chatData = chatSnapshot.data();
            const commands = chatData.commands || {};

            for (let command in commands) {
                const files = commands[command];
                const fileIndex = files.findIndex(file => file.index === id);

                if (fileIndex !== -1) {
                    files.splice(fileIndex, 1);
                    if (files.length === 0) {
                        delete commands[command];
                    }
                    await updateDoc(chatDoc, { commands });
                    bot.sendMessage(chatId, `File with ID ${id} deleted from command /${command}`, {
                        reply_to_message_id: msg.message_id
                    });
                    break;
                }
            }
        }
    }
}else if (msg.text && msg.text.startsWith('/')) {
    let command = msg.text.slice(1).split('@')[0]; // Remove the '/' and the bot username from the command
    let docPath = chattype === 'private' ? "users" : "groups";

    const chatDoc = doc(db, docPath, chatId.toString());
    const chatSnapshot = await getDoc(chatDoc);

      if (chatSnapshot.exists()) {
        const chatData = chatSnapshot.data();
        const commands = chatData.commands || {};

        if (commands[command]) {
          const files = commands[command];
          files.forEach((file, index) => {
            // 'index' is the index of the current element in the array
            const caption = `ID: <code>${index}</code>`; // Use 'index' instead of 'file.index'
            const options = {
              caption,
              parse_mode: "HTML",
              reply_to_message_id: msg.message_id,
            };

            if (file.fileType === "photo") {
              bot.sendPhoto(chatId, file.fileId, options);
            } else if (file.fileType === "document") {
              bot.sendDocument(chatId, file.fileId, options);
            } else if (file.fileType === "audio") {
              bot.sendAudio(chatId, file.fileId, options);
            } else if (file.fileType === "audio/ogg") {
              bot.sendVoice(chatId, file.fileId, options);
            } else if (file.fileType === "video") {
              bot.sendVideo(chatId, file.fileId, options);
            } else if (file.fileType === "animation") {
              bot.sendAnimation(chatId, file.fileId, options);
            } else if (file.fileType === "text") {
              bot.sendMessage(
                chatId,
                `ID: <code>${index}</code>\n\n${file.text}`,
                options
              );
            }
          });
        }
      }
  }
});


//if admin use /addmembertogroup then it will get all the memberid from firebase (groups -> groupid -> membersid[]) and add them to the group : https://t.me/+qHRmLySmeeVkMmU9

bot.onText(/\/addmembertogroup$/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const targetGroupId = '-4118956417'

  //check if the user is admin
  const chatMember = await bot.getChatMember(chatId, userId);
  if (chatMember.status !== "creator" && chatMember.status !== "administrator") {
    bot.sendMessage(chatId, "You are not an admin");
    return;
  }

  const groupDoc = doc(db, "groups", chatId.toString());
  const groupSnapshot = await getDoc(groupDoc);

  if (groupSnapshot.exists()) {
    const groupData = groupSnapshot.data();
    const members = groupData.members || [];

    for (const member of members) {
      try {
        await bot.approveChatJoinRequest(targetGroupId, member);
      } catch (error) {
        console.error(error);
      }
    }

    bot.sendMessage(chatId, "All members added to the group");
  } else {
    bot.sendMessage(chatId, "No members found for the group");
  }
});



// Check if github token is working
bot.onText(/\/github$/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      const response = await axios.get(githubRepoURL, {
        headers: {
          Authorization: `token ${githubToken}`,
        },
      });
      bot.sendMessage(chatId, 'GitHub token is working');
    } catch (error) {
      bot.sendMessage(chatId, 'GitHub token is not working');
    }
});


// Check if firebase is working
bot.onText(/\/firebase$/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      await setDoc(doc(db, "test", "testId"), {
        testText: 'Test text'
      });
      bot.sendMessage(chatId, 'Firebase is working');
    } catch (error) {
      bot.sendMessage(chatId, 'Firebase is not working');
    }
});

bot.onText(/\/start$/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id; // Get user's Telegram ID
  // Check if user already exists in the database
  const userDoc = doc(db, "demousers", userId.toString());
  const userSnapshot = await getDoc(userDoc);

  if (!userSnapshot.exists()) {
    // User does not exist in the database, so add them
    const userData = {
      userid: userId,
      username: msg.from.username || msg.from.first_name,
      department: "",
      fistname: msg.from.first_name,
      lastname: msg.from.last_name || "",
      roll: "",
      semester: 0,
    };

    try {
      await setDoc(userDoc, userData);
      addDepartment(chatId);
    } catch (error) {
      bot.sendMessage(chatId, "Error adding your data to Firebase");
    }
  } else {
    const userData = userSnapshot.data();

    if (!userData.department) {
      addDepartment(chatId);
    } else if (!userData.semester) {
      addSemester(chatId);
    } else {

     const userCommands = (Object.keys(userData.commands || {})).map(command => `/${command}`).join("\n");
 
      bot.sendMessage(
        chatId,
        `Welcome to the Telegram Bot!\n\nHere are your available commands:\n${userCommands}\n\n/help - Get help\n/getsemester - Get your semester\n/notes - Get your notes\n\n`
      );
    }
  }
});


function addSemester(chatId) {
  const keyboardSemester = {
    inline_keyboard: [
      [{ text: "1st Semester", callback_data: "semester_1" }],
      [{ text: "2nd Semester", callback_data: "semester_2" }],
      [{ text: "3rd Semester", callback_data: "semester_3" }],
      [{ text: "4th Semester", callback_data: "semester_4" }],
      [{ text: "5th Semester", callback_data: "semester_5" }],
      [{ text: "6th Semester", callback_data: "semester_6" }],
      [{ text: "7th Semester", callback_data: "semester_7" }],
      [{ text: "8th Semester", callback_data: "semester_8" }],
      // Add buttons for other semesters as needed
    ],
  };

  // Create inline keyboard for semesters
  bot.sendMessage(chatId, "Choose your semester:", { reply_markup: keyboardSemester });
}

function addDepartment(chatId) {
  const keyboardDepartment = {
    inline_keyboard: [
      [{ text: "CSE", callback_data: "dept_CSE" }],
      [{ text: "EEE", callback_data: "dept_EEE" }],
      [{ text: "BBA", callback_data: "dept_BBA" }],
      [{ text: "ELL", callback_data: "dept_ELL" }],
    ],
  };

  bot.sendMessage(chatId, "Choose your department:", {
    reply_markup: keyboardDepartment,
  });
}

bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const userId = query.from.id;
  const data = query.data;

  // Update the user's department and semester in Firestore
  const userDoc = doc(db, "demousers", userId.toString());

  if (data.startsWith("semester_")) {
    const semester = data.replace("semester_", "");
    await updateDoc(userDoc, { semester });
    bot.sendMessage(
      chatId,
      `Semester set to ${semester} successfully! \n\n Type /start to gell all commands`
    );
  } else if (data.startsWith("dept_")) {
    const department = data.replace("dept_", "");
    await updateDoc(userDoc, { department });
    addSemester(chatId);
    bot.sendMessage(
      chatId,
      `Department set to ${department} successfully! \n\n Type /start to gell all commands`
    );
  }
});


async function geminiImageProcess(imageId, userId, prompt, chatId, bot, msg) {

  const waitingMessage = await bot.sendSticker(chatId, "https://t.me/botresourcefordev/402");

  const userImageFolder = path.join(__dirname, `images/user_${userId}`);
  if (!fs.existsSync(userImageFolder)) {
    fs.mkdirSync(userImageFolder, { recursive: true });
  }

  // Download and save the image in the user's folder
  const imageFilePath = path.join(userImageFolder, `${imageId}.jpg`);
  const imageFile = await bot.downloadFile(imageId, userImageFolder);
  fs.renameSync(imageFile, imageFilePath);

  // Inline data for generative part
  const imagePart = {
    inlineData: {
      data: Buffer.from(fs.readFileSync(imageFilePath)).toString("base64"),
      mimeType: "image/jpeg"
    },
  };

  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  const result = await model.generateContent([prompt, imagePart]);
  const response = await result.response;
  const text = response.text();

  bot.deleteMessage(chatId, waitingMessage.message_id);

  //delete the image file
  fs.unlinkSync(imageFilePath);

  bot.sendMessage(chatId, text, {
    reply_to_message_id: msg.message_id
  });
}




