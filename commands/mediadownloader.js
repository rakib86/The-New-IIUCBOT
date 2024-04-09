const { axios } = require("../config/config.js");
const ytdl = require('ytdl-core'); // For downloading YouTube videos
const getFBInfo = require("@xaviabot/fb-downloader"); // For downloading Facebook videos
const ytpl = require('ytpl');
const fs = require('fs');
const path = require('path');
module.exports = async function (bot) {
    bot.onText(/^http(.+)/, async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;

        //if chat is a group, return
        if (msg.chat.type === "group" || msg.chat.type === "supergroup") {
            bot.sendMessage(chatId, "I can't download media in groups. Please send me the link in private chat.@iiucbot");
            return;
        }



        const youtubePlaylistLink = text.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/playlist(.*)$/);
        if (youtubePlaylistLink) {
            const waitingMessage = await bot.sendSticker(chatId, "https://t.me/botresourcefordev/402");
            const playlistId = youtubePlaylistLink[4];
            const playlist = await ytpl(playlistId);
            const totalVideos = playlist.items.length;
            let totalDuration = 0;
            for (const video of playlist.items) {
                totalDuration += video.durationSec;
            }
            const averageDuration = totalDuration / totalVideos;
            const averageDurationMinutes = Math.floor(averageDuration / 60);
            const totalDurationHours = Math.floor(totalDuration / 3600);
            const totalDurationMinutes = Math.floor((totalDuration % 3600) / 60);
            //delete the waiting sticker
            bot.deleteMessage(chatId, waitingMessage.message_id);
            bot.sendMessage(chatId, `Total Videos: ${totalVideos}\nTotal Playlist Duration: ${totalDurationHours} hours ${totalDurationMinutes} minutes\nAverage Video Duration: ${averageDurationMinutes} minutes`);
            return;
        }





        //check if its a youtube shorts link

        const youtubeShortsLink = text.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/shorts(.*)$/);
 
if (youtubeShortsLink) {
    const stickerMessage = await bot.sendSticker(chatId, "https://t.me/botresourcefordev/402");
    const videoUrl = text;
    try {
        const videoInfo = await ytdl.getInfo(videoUrl);
        const highestQualityFormat = ytdl.chooseFormat(videoInfo.formats, { quality: 'highest' });

        if (highestQualityFormat) {
            const videoReadableStream = ytdl(videoUrl, { filter: 'audioandvideo', quality: 'highest' });

            // Generate a file name using the video title or a default name
            const videoFileName = 'ytshorts.mp4';

            // Create a directory path with the user's ID
            const directoryPath = path.join('YTvideos', String(chatId));

            // Create the directory if it doesn't exist
            fs.mkdirSync(directoryPath, { recursive: true });

            // Download the video to a local file in the specified directory
            const videoFileStream = fs.createWriteStream(path.join(directoryPath, videoFileName));
            videoReadableStream.pipe(videoFileStream);

            videoFileStream.on('finish', () => {
                // Send the downloaded video to the user
                bot.sendVideo(chatId, path.join(directoryPath, videoFileName))
                .then(() => {
                    // Delete the file after the video has been sent
                    fs.unlinkSync(path.join(directoryPath, videoFileName));
                })
                .catch((error) => {
                    console.error('Error sending or deleting video:', error);
                });

            });

            // Remove the waiting sticker
            bot.deleteMessage(chatId, stickerMessage.message_id);
            
        } else {
            bot.sendMessage(chatId, 'Error: Unable to find suitable video format.');
        }
    } catch (error) {
        console.error('Error downloading YouTube video:', error);
    }
  
    return;
}



        //check if the text is facebook reel link

     const facebookReelLink = text.match(/^(https?:\/\/)?(www\.)?(facebook\.com)\/(reel|share\/r)\/(.*)$/);

        if (facebookReelLink) {
            stickerMessage = await bot.sendSticker(chatId, "https://t.me/botresourcefordev/402");
            bot.sendMessage(chatId, "Downloading the video...");
            const videoUrl = text;
            getFBInfo(videoUrl)
                //then send the video download link
                .then((result) => {
                    bot.sendVideo(chatId, result.hd);
                })
                .catch((error) => {
                    console.log("Error:", error);
                });

            bot.deleteMessage(chatId, stickerMessage.message_id);

            return;
        }



















        const isLink = msg.text.includes("https://" || "http://");

        if (!isLink) {
            bot.sendMessage(chatId, "Please provide a valid link");
            return;
        }
        bot.sendMessage(chatId, "Please wait, I am fetching the media for you...");
        const link = msg.text;

        const options = {
            method: "POST",
            url: "https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink",
            headers: {
                "content-type": "application/json",
                "X-RapidAPI-Key": "10ce9c4267msha639dae37dabea5p10164ejsn4ddf4732589b",
                "X-RapidAPI-Host": "social-download-all-in-one.p.rapidapi.com",
            },
            data: {
                url: link,
            },
        };

        try {
            const response = await axios.request(options);

            bot.sendMessage(chatId, "Click the button below to download:", {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "Download",
                                url: response.data.medias[0].url,
                            },
                        ],
                    ],
                },
                reply_to_message_id: msg.message_id,
            });
        } catch (error) {
            console.error(error);
        }
    });
};



  
