require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { Octokit } = require('@octokit/rest');
const axios = require('axios');
const fs = require('fs');

const allowedAdminUsernames = ['@rakiburrahaman', '@Maanisha001', '@fazlerabbitazriyan']; // Array of admin usernames

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

let currentFolder = ''; // Store the current folder
let pendingFile = {}; // Store the pending file to upload



bot.on('message', (msg) => {
    const chatId = msg.chat.id;
  

  
    if (msg.reply_to_message && (msg.reply_to_message.document || msg.reply_to_message.photo) && msg.text === '/upload') {
      
   
    const fileId = msg.reply_to_message.document ? msg.reply_to_message.document.file_id : msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1].file_id;
      const fileName = msg.reply_to_message.document ? msg.reply_to_message.document.file_name : 'image.jpg';
  
      bot.getFileLink(fileId).then((fileLink) => {
        pendingFile[chatId] = {
          fileLink,
          fileName,
          chatId,
        };
        

        showFolderContents(chatId);
        
      });
    }
  });

  

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const callbackmsgid = query.message.message_id;
  const folderName = query.data;

 
    if (currentFolder) {
      currentFolder += `/${folderName}`;
    } else {
      currentFolder = folderName;
    }
    showFolderContents(chatId);
  
});


bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;
  if (!allowedAdminUsernames.includes(`@${username}`)) {
    bot.sendMessage(chatId, 'You are not authorized to use this bot.');
    return;
  }else {
  currentFolder = ''; // Reset the current folder when starting
 
  showFolderContents(chatId);
  }
});



 


async function showFolderContents(chatId) {
  const repoOwner = 'rakib86';
  const repoName = 'IIUCbot-DataBase';
  const repoUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${currentFolder}`;

  try {
    const response = await axios.get(repoUrl);
    const contents = response.data;

    const subFolders = contents.filter((item) => item.type === 'dir');

    if (subFolders.length === 0) {
        bot.sendMessage(chatId, 'Uploading file to IIUCbot Database...');
       uploadFileToGitHub(pendingFile[chatId].fileLink, pendingFile[chatId].fileName, pendingFile[chatId].chatId);
    } else {
      const buttons = subFolders.map((folder) => ({
        text: folder.name,
        callback_data: folder.name,
      }));

      const keyboard = buttons.map((button) => [button]);

      bot.sendMessage(chatId, `Selected Folder: ${currentFolder}`, {
        reply_markup: {
          inline_keyboard: keyboard,
        },
      });
    }
  } catch (error) {
    console.error('Error fetching folder contents:', error);
    bot.sendMessage(chatId, 'Failed to fetch folder contents.');
  }
}

async function uploadFileToGitHub(fileLink, fileName, chatId) {
  try {
    const repoOwner = 'rakib86';
    const repoName = 'IIUCbot-DataBase';
    const filePath = `${currentFolder}/${fileName}`;

    pendingFile[chatId].folderpath = filePath;

    // Check if the file already exists
    try {
      await octokit.repos.getContent({
        owner: repoOwner,
        repo: repoName,
        path: filePath,
      });

      // If the file exists, send a message and return
      bot.sendMessage(chatId, 'A file with the same name already exists in the repository.');
      return;
    } catch (error) {
      console.error('File does not exist:', error);
    }

    const response = await axios.get(fileLink, { responseType: 'arraybuffer' });
    const contentBase64 = Buffer.from(response.data).toString('base64');

    await octokit.repos.createOrUpdateFileContents({
      owner: repoOwner,
      repo: repoName,
      path: filePath,
      message: 'Add PDF file',
      content: contentBase64,
    });

    bot.sendMessage(chatId, 'PDF file uploaded to GitHub successfully');
    bot.sendMessage(chatId, `File: ${pendingFile[chatId].fileName}\n${pendingFile[chatId].fileLink}\n${pendingFile[chatId].chatId},\n${pendingFile[chatId].folderpath}`);
    if (stickerMessage) {
      await bot.deleteMessage(chatId, stickerMessage.message_id);
    }
  } catch (error) {
    console.error('Error uploading to GitHub:', error);
  }
}







bot.startPolling();
