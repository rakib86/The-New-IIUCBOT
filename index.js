const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const dotenv = require('dotenv');
const inputHandler = require('./intent');
const botinfo = require('./botinfo.js');
const humanai = require('./humanai.js');
dotenv.config();
const waitingSticker = 'https://t.me/botresourcefordev/341';
const botToken = process.env.BOT_TOKEN;
const githubToken = process.env.GITHUB_ACCESS_TOKEN;
const githubRepoURL = 'https://api.github.com/repos/rakib86/IIUCbot-DataBase';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000; 




//Render Web Service part

// Replace with your bot token
// Replace with your bot token
const token = process.env.BOT_TOKEN;
const webhookUrl = `https://iiucbot-new-version.onrender.com/webhook/${token}`;
const bot = new TelegramBot(token, { webHook: { port: port } });




// This sets up the URL for receiving updates
bot.setWebHook(webhookUrl);

// Use body-parser middleware to parse incoming JSON
app.use(bodyParser.json());

// Handle incoming updates via POST requests
app.post(`/webhook/${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start the web server
app.listen(port, () => {
  console.log(`Web server is running on port ${port}`);
});



///Web Service part end

const GOOGLE_SEARCH_API_KEY = process.env.google_api_key;
const GOOGLE_SEARCH_ENGINE_ID = process.env.google_id;
const { google } = require('googleapis');
const sheets = google.sheets('v4');
// Load your service account key JSON file
const credentials = require('./iiucbotdata.json');
const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  
const intents = [
  

    ...botinfo.additionalIntents,
    ...humanai.additionalIntents,

    
  ];



  










// Function to add user data to Google Sheets
async function addToGoogleSheets(userData) {
    const authClient = await auth.getClient();
  
    // Specify the Google Sheets spreadsheet ID and range where you want to add data
    const spreadsheetId = '1JE9_CVHt5sCwk8118ihZaF74mp6jh7jALKoQdjZdyZ8';
    const range = 'Sheet1'; // Change to the name of your sheet
  
    const sheets = google.sheets({ version: 'v4', auth: authClient });
  
    try {
      // Prepare the values to be inserted
      const values = [[
        userData.userId,
        userData.firstName,
        userData.username,
    
      ]];
  
      // Use the Sheets API to append the values to the spreadsheet
      const request = {
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        resource: {
          values,
        },
      };
  
      const response = await sheets.spreadsheets.values.append(request);
      console.log('Data added successfully:', response.data);
    } catch (error) {
      console.error('Error adding data to Google Sheets:', error);
    }
  }
  
  
  
  
  // Function to get user data from Google Sheets
  
  async function getFromGoogleSheets() {
    try {
      const authClient = await auth.getClient();
  
      // Specify the Google Sheets spreadsheet ID and range from which to fetch data
      const spreadsheetId = '1JE9_CVHt5sCwk8118ihZaF74mp6jh7jALKoQdjZdyZ8';
      const range = 'Sheet1'; // Change to the name of your sheet
  
      const sheets = google.sheets({ version: 'v4', auth: authClient });
  
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
  
      const values = response.data.values;
  
      if (!values || values.length === 0) {
        console.log('No data found in the spreadsheet.');
        return [];
      }
  
      // Assuming your Google Sheets has columns like [User ID, First Name, Username]
      const userData = values.map((row) => ({
        userId: row[0],        // Assuming user ID is in the first column
        firstName: row[1],     // Assuming first name is in the second column
        username: row[2],      // Assuming username is in the third column

      }));
  
      return userData;
    } catch (error) {
      console.error('Error fetching data from Google Sheets:', error);
      return [];
    }
  }



  const Adminusername = 'rakiburrahaman'; //Admin username for broadcast message

  bot.onText(/\/broadcast$/, async (msg) => {
    const chatId = msg.chat.id;
    const broadcastusername = msg.from.username;
  
    // Check if the sender is the admin (rakiburrahaman)
    if (broadcastusername === Adminusername) {
      // Ask the admin for the broadcast message
      bot.sendMessage(chatId, 'Please enter the broadcast message you want to send to all users:');
  
      // Listen for the admin's response
      bot.on('text', async (adminMsg) => {
        const broadcastusername = adminMsg.from.username;
        const message = adminMsg.text;
        const userData = await getFromGoogleSheets();
        //check if the message is send by admin chatid
  
        if (broadcastusername === Adminusername) {
  
  
        // Send the broadcast message to all users
        for (const user of userData) {
          bot.sendMessage(user.userId, message);
        }
  
         // Inform the admin that the message has been sent to all users
         bot.sendMessage(chatId, 'Broadcast message sent to all users.');
  
         // Remove the event listener to avoid processing multiple times
         bot.removeListener('text');
  
      } else {
        bot.sendMessage(chatId, 'You are not authorized to use this command.');
        bot.removeListener('text');
  
      }
  
       
      });
    } else {
      bot.sendMessage(chatId, 'You are not authorized to use this command.');
    }
  });
  

//Broadcast Image to all users

bot.onText(/\/broadcastimg$/, (msg) => {
    const chatId = msg.chat.id;
    const broadcastusername = msg.from.username;
  
  
    if (broadcastusername === Adminusername) {
      bot.sendMessage(chatId, 'Please send the image you want to broadcast with a caption.');
  
      // Listen for the image upload
      bot.once('photo', async (msg) => {
        const broadcastusername = msg.from.username;
        const userData = await getFromGoogleSheets();
        // Store the image information temporarily
  
        if (broadcastusername === Adminusername) {
        const imageFileId = msg.photo[0].file_id;
        const caption = msg.caption || ''; // Get the caption (if provided)
  
        // Broadcast the image with the specified caption to all users
        for (const user of userData) {
          bot.sendPhoto(user.userId, imageFileId, { caption });
        }
  
        // Inform the admin that the image has been sent to all users
  
        bot.sendMessage(chatId, 'Broadcast image sent to all users.');
  
        // Remove the event listener to avoid processing multiple times
  
        bot.removeListener('photo');
  
        }else {
          bot.sendMessage(chatId, 'Try Again Boss!');
          bot.removeListener('photo');
        }
      });
    } else {
      bot.sendMessage(chatId, 'You are not authorized to use this command.');
    }
  });
  
  
  // BroadCast Video
  
  bot.onText(/\/broadcastvideo/, (msg) => {
    const chatId = msg.chat.id;
    const broadcastusername = msg.from.username;
  
  
    if (broadcastusername === Adminusername) {
      bot.sendMessage(chatId, 'Please send the video file you want to broadcast with a caption.');
  
      // Listen for the video file upload
      bot.once('video', async (msg) => {
        const broadcastusername = msg.from.username;
        const userData = await getFromGoogleSheets();
  
        if (broadcastusername === Adminusername) {
        // Store the video file information temporarily
        const videoFileId = msg.video.file_id;
        const caption = msg.caption || ''; // Get the caption (if provided)
  
        // Broadcast the video file with the specified caption to all users
        for (const user of userData) {
          bot.sendVideo(user.userId, videoFileId, { caption });
        }
  
        bot.sendMessage(chatId, 'Broadcast video sent to all users.');
  
        // Remove the event listener to avoid processing multiple times
  
        bot.removeListener('video');
        }else {
          bot.sendMessage(chatId, 'Try Again Boss!');
          bot.removeListener('video');
        }
      });
    } else {
      bot.sendMessage(chatId, 'You are not authorized to use this command.');
    }
  });
  
  
  //Broadcast PDF
  
  bot.onText(/\/broadcastpdf/, (msg) => {
    const chatId = msg.chat.id;
    const broadcastusername = msg.from.username;
  
  
    if (broadcastusername === Adminusername) {
      bot.sendMessage(chatId, 'Please send the PDF file you want to broadcast with a caption.');
  
      // Listen for the PDF file upload
      bot.once('document', async (msg) => {
        const broadcastusername = msg.from.username;
        const userData = await getFromGoogleSheets();
        // Store the PDF file information temporarily
  
        if (broadcastusername === Adminusername) {
        const documentFileId = msg.document.file_id;
        const caption = msg.caption || ''; // Get the caption (if provided)
  
        // Broadcast the PDF file with the specified caption to all users
        for (const user of userData) {
          bot.sendDocument(user.userId, documentFileId, { caption });
        }
  
        bot.sendMessage(chatId, 'Broadcast PDF sent to all users.');
  
        bot.removeListener('document');
        }else {
          bot.sendMessage(chatId, 'Try Again Boss!');
          bot.removeListener('document');
        }
      });
    } else {
      bot.sendMessage(chatId, 'You are not authorized to use this command.');
    }
  });
  
  
  
  bot.onText(/\/broadcastaudio/, (msg) => {
    const chatId = msg.chat.id;
    const broadcastusername = msg.from.username;
  
  
    if (broadcastusername === Adminusername) {
      bot.sendMessage(chatId, 'Please send the audio file you want to broadcast.');
  
      // Listen for the audio file upload
      bot.once('audio', async (msg) => {
        const broadcastusername = msg.from.username;
        const userData = await getFromGoogleSheets();
  
        if (broadcastusername === Adminusername) {
        // Store the audio file information temporarily
        const audioFileId = msg.audio.file_id;
  
        // Broadcast the audio file to all users
        for (const user of userData) {
          bot.sendAudio(user.userId, audioFileId);
        }
  
        bot.sendMessage(chatId, 'Broadcast audio sent to all users.');
  
        bot.removeListener('audio');
        }else {
          bot.sendMessage(chatId, 'Try Again Boss!');
          bot.removeListener('audio');
        }
      });
    } else {
      bot.sendMessage(chatId, 'You are not authorized to use this command.');
    }
  });
  
  

//Live User Number 

let dynamicUserCount = 0;
const activeUsers = new Set(); // Store active user count

bot.onText(/\/liveuser/, (msg) => {
  const chatId = msg.chat.id;
  const admin = msg.from.username;

  if (admin == Adminusername) {
    bot.sendMessage(chatId, `Live User Count: ${dynamicUserCount}`);
  } else {
    bot.sendMessage(chatId, 'You are not authorized to use this command.');
  }
});






//ASK function
bot.onText(/\/ask$/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Please provide a question after the /ask command. \nFor example: "/ask What is the weather today?"');
});
  

bot.onText(/\/ask (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const question = match[1];
    if (question.includes('porn') || question.includes('sex') || question.includes('xvideos') || question.includes('fuck') || question.includes('pornhub')) {
      bot.sendMessage(chatId, 'ভাল হয়ে যাও মাসুদ😒');
      return;
    }
    let stickerMessage = null; // Store the sticker message
  
    try {
      // Send the waiting sticker and store the message object
      stickerMessage = await bot.sendSticker(chatId, waitingSticker);
  
      // Make a request to the Google Custom Search API
      const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
        params: {
          key: GOOGLE_SEARCH_API_KEY,
          cx: GOOGLE_SEARCH_ENGINE_ID,
          q: question,
          safe: 'active',
        },
      });
  
      // Extract the first search result
      const firstResult = response.data.items[0];
  
      if (firstResult) {
        const title = firstResult.title;
        const link = firstResult.link;
        const snippet = firstResult.snippet;
  
        // Send the answer and the link to the user
        await bot.sendMessage(chatId, `${snippet}\nIn the link below you will find more information about your question.`);
        await bot.sendMessage(chatId, `${title}\n\nLink: ${link}`);
  
        // Remove the waiting sticker after a delay (e.g., 2 seconds)
      
          if (stickerMessage) {
            await bot.deleteMessage(chatId, stickerMessage.message_id);
          }
     
      } else {
        await bot.sendMessage(chatId, 'Sorry, I couldn\'t find any information for that question.');
  
        // Remove the waiting sticker immediately if no answer is found
        if (stickerMessage) {
          await bot.deleteMessage(chatId, stickerMessage.message_id);
        }
      }
    } catch (error) {
      console.error('Error searching Google:', error);
      await bot.sendMessage(chatId, 'An error occurred while searching. Please try again later.');
  
      // Remove the waiting sticker on error
      if (stickerMessage) {
        await bot.deleteMessage(chatId, stickerMessage.message_id);
      }
    }
  });
  

























let stickerMessage = null;


bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const userId = msg.from.id;
    const firstName = msg.from.first_name;
    const username = msg.from.username || firstName;
    let intentflag = false;
    // Check for intents based on regular expressions


    //Live User count
    if (!activeUsers.has(userId)) {
        activeUsers.add(userId);
        dynamicUserCount = activeUsers.size;
    }
    setTimeout(() => {
        activeUsers.clear();
        dynamicUserCount = 0;
    }, 600000); // 1 seconds = (1000 milliseconds)








    const userData = {
        userId,
        firstName,
        username,
   
      };
  
      // Check if the user already exists in the Google Sheet before adding
      const existingUsers = await getFromGoogleSheets();
      const userExists = existingUsers.some((user) => user.userId === userId || user.username === username);
      if (!userExists) {
        await addToGoogleSheets(userData);
      }

    
    for (const intent of intents) {
      if (intent.regex.test(text)) {
        if (intent.type === 'text') {
          bot.sendMessage(chatId, intent.text);
          intentflag = true;
        } else if (intent.files) {
            stickerMessage = await bot.sendSticker(chatId, waitingSticker);
          for (const file of intent.files) {
            if (file.type === "photo") {
              bot.sendPhoto(chatId, file.postLink, { caption: file.text });
            } else if (file.type === "document") {
              bot.sendDocument(chatId, file.postLink, { caption: file.text });
            }else if (file.type === "video") {
                bot.sendVideo(chatId, file.postLink, { caption: file.text });
            }else if (file.type === "audio") {
                bot.sendAudio(chatId, file.postLink, { caption: file.text });
            }
          }
          intentflag = true;
        }else{
            bot.sendMessage(chatId, 'sorry bro! i dont have any answer for this question');
        }

        if (stickerMessage) {
            await bot.deleteMessage(chatId, stickerMessage.message_id);
        }
        return; // Exit the loop when an intent is matched
      }
    }

    // If no intent is matched, check the folder
    const folderPath = inputHandler.getFolderPath(text);
  
    if (folderPath && intentflag === false) {
        stickerMessage = await bot.sendSticker(chatId, waitingSticker);
      try {
        const folderContents = await getGitHubRepoContents(folderPath);
        const folders = folderContents.filter((item) => item.type === 'dir');
        const files = folderContents.filter((item) => item.type === 'file');
  
        if (folders.length > 0) {
          intentflag = true;
          const folderButtons = folders.map((folder) => [
            {
              text: folder.name,
              callback_data: folder.path,
            },
          ]);

       
          bot.sendMessage(chatId, 'Choose here:', {
            reply_markup: {
              inline_keyboard: folderButtons,
            },
          });
          
          
        } else if (files.length > 0) {
          intentflag = true;
          // Send files in the folder
          for (const file of files) {
            // Send files as documents or any other appropriate method
            bot.sendDocument(chatId, file.download_url, {
              caption: file.name,
            });
          }
        } else {
          bot.sendMessage(chatId, 'No subfolders or files in this path.');
          intentflag = false;
        }
        if (stickerMessage) {
            await bot.deleteMessage(chatId, stickerMessage.message_id);
          }
      } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'An error occurred while retrieving the data.');
      }
      
    }else {
        intentflag = false;
    }

    if (!text.startsWith('/') && intentflag === false) {
        bot.sendMessage(chatId, 'Sorry Bro! I dont have any matterial for this question.');
    }
   
   
    
  });
  



bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    const repoContents = await getGitHubRepoContents('');
    const folders = repoContents.filter((item) => item.type === 'dir');

    const folderButtons = folders.map((folder) => [
      {
        text: folder.name,
        callback_data: folder.path,
      },
    ]);

    bot.sendMessage(chatId, 'Choose here:', {
      reply_markup: {
        inline_keyboard: folderButtons,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

let currentFolderPath = ''; // Initialize the current folder path to the root

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const folderPath = query.data;

  if (folderPath === 'BACK') {
    // Extract the parent folder path
    const parts = currentFolderPath.split('/');
    const parentFolder = parts.slice(0, -1).join('/');
    
    try {
      const folderContents = await getGitHubRepoContents(parentFolder);

      const subFolders = folderContents.filter((item) => item.type === 'dir');
      const pdfFiles = folderContents.filter(
        (item) => item.type === 'file' && item.name.endsWith('.pdf')
      );

      const photoFiles = folderContents.filter(
        (item) => item.type === 'file' && item.name.match(/\.(jpg|jpeg|png|gif)$/i)
      );

      const folderButtons = subFolders.map((folder) => [
        {
          text: folder.name,
          callback_data: folder.path,
        },
      ]);

      if (parentFolder) {
        folderButtons.unshift([
          {
            text: 'Back🐤',
            callback_data: 'BACK',
          },
        ]);
      }

      currentFolderPath = parentFolder; // Update the current folder path

      bot.editMessageReplyMarkup(
        { inline_keyboard: folderButtons },
        { chat_id: chatId, message_id: query.message.message_id }
      );

      if (pdfFiles.length > 0) {
        for (const pdfFile of pdfFiles) {
          const fileNameWithoutExtension = pdfFile.name.replace(/\.[^/.]+$/, '');
          bot.sendDocument(chatId, pdfFile.download_url, {
            caption: fileNameWithoutExtension,
          });
        }
      }

      if (photoFiles.length > 0) {
        for (const photoFile of photoFiles) {
          const fileNameWithoutExtension = photoFile.name.replace(/\.[^/.]+$/, ''); // Remove file extension
          bot.sendPhoto(chatId, photoFile.download_url, {
            caption: fileNameWithoutExtension,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      const folderContents = await getGitHubRepoContents(folderPath);

      const subFolders = folderContents.filter((item) => item.type === 'dir');
      const pdfFiles = folderContents.filter(
        (item) => item.type === 'file' && item.name.endsWith('.pdf')
      );

      const photoFiles = folderContents.filter(
        (item) => item.type === 'file' && item.name.match(/\.(jpg|jpeg|png|gif)$/i)
      );

      const folderButtons = subFolders.map((folder) => [
        {
          text: folder.name,
          callback_data: folder.path,
        },
      ]);

      if (currentFolderPath) {
        folderButtons.unshift([
          {
            text: 'Back✨',
            callback_data: 'BACK',
          },
        ]);
      }

      currentFolderPath = folderPath; // Update the current folder path

      bot.editMessageReplyMarkup(
        { inline_keyboard: folderButtons },
        { chat_id: chatId, message_id: query.message.message_id }
      );

      if (pdfFiles.length > 0) {
        for (const pdfFile of pdfFiles) {
          const fileNameWithoutExtension = pdfFile.name.replace(/\.[^/.]+$/, '');
          bot.sendDocument(chatId, pdfFile.download_url, {
            caption: fileNameWithoutExtension,
          });
        }
      }

      if (photoFiles.length > 0) {
        for (const photoFile of photoFiles) {
          const fileNameWithoutExtension = photoFile.name.replace(/\.[^/.]+$/, ''); // Remove file extension
          bot.sendPhoto(chatId, photoFile.download_url, {
            caption: fileNameWithoutExtension,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
});


async function getGitHubRepoContents(path) {
  try {
    const response = await axios.get(
      `${githubRepoURL}/contents/${path}`,
      {
        headers: {
          Authorization: `token ${githubToken}`,
        },
      }
    );
    console.log('GitHub API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('GitHub API Error:', error);
    throw error;
  }
}
