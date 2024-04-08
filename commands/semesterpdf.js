
const { 
    axios, 
    githubToken, 
    githubRepoURL,
    db
} = require('../config/config');
const { doc, getDoc } = require("firebase/firestore");

module.exports = async function(bot) {

 

 // json data tree in firebase 

// users -> 1927701329(telegrame userid) -> {
//     "userid": 1927701329,
//     "username": "@rakiburrahaman",
//     "department": "CSE",
//     "name": "Rakibur Rahaman",
//     "roll": "C221054",
//     "semester": 5
//   }

bot.onText(/\/getsemester$/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id; // Get user's Telegram ID

    // Fetch user data from Firebase
    const docRef = doc(db, "users", userId.toString());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const userData = docSnap.data();
        bot.sendMessage(chatId, `Your semester is: ${userData.semester}`);
    } else {
        bot.sendMessage(chatId, 'No data found for your user ID.');
    }
});
 
 bot.onText(/\/notes$/, async (msg) => {
     const chatId = msg.chat.id;
     const userId = msg.from.id; // Get user's Telegram ID

        // Fetch user data from Firebase

        try {
            const docRef = doc(db, "users", userId.toString());
            const docSnap = await getDoc(docRef);
        
            if (docSnap.exists()) {
                const userData = docSnap.data();
                getGitHubRepoContentsbyquery(userData.semester, chatId);
                bot.sendMessage(chatId, `Your semester is: ${userData.semester}`);
            } else {
                bot.sendMessage(chatId, 'No data found for your user ID.');
            }
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, 'There was an error for fetching the data using /start command.\n\n You can use /your_semester (for example: /1st, /2nd.../8th) to get your semester data.');
        }
 });
 
 
 
 async function getGitHubRepoContentsbyquery(path, chatId) {
     try {
         const repoContents = await getGitHubRepoContents(path);
         const folders = repoContents.filter((item) => item.type === 'dir');
     
         const folderButtons = folders.map((folder) => [
           {
             text: folder.name,
             callback_data: folder.path,
           },
         ]);
     
         bot.sendMessage(chatId, `${path} semester all data:`, {
           reply_markup: {
             inline_keyboard: folderButtons,
           },
         });
       } catch (error) {
         console.error(error);
         bot.sendMessage(chatId, 'There was an error for fetching the data using /start command.\n\n You can use /your_semester (for example: /1st, /2nd.../8th) to get your semester data.');
       }
 }
   
   
   
 
 
   
   let currentFolderPath = '';

   
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
   
         const textFiles = folderContents.filter(
           (item) => item.type === 'file' && item.name.endsWith('.txt')
         );
   
         if (textFiles.length > 0) {
           for (const textFile of textFiles) {
             const textFileContent = await getTextFileContent(textFile.download_url);
             bot.sendMessage(chatId, `${textFileContent}`);
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
   
         const textFiles = folderContents.filter(
           (item) => item.type === 'file' && item.name.endsWith('.txt')
         );
   
         if (textFiles.length > 0) {
           for (const textFile of textFiles) {
             const textFileContent = await getTextFileContent(textFile.download_url);
             bot.sendMessage(chatId, `${textFileContent}`);
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
       return response.data;
     } catch (error) {
       throw error;
     }
   }
   
   
   async function getTextFileContent(fileDownloadUrl) {
     try {
       const response = await axios.get(fileDownloadUrl, { responseType: 'text' });
       return response.data;
     } catch (error) {
       console.error(`Error fetching text file content: ${error}`);
       return 'Error fetching guidline content content.';
     }
   }
   
   
 };
 