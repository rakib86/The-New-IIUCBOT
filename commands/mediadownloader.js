const { axios } = require("../config/config.js");
const ytdl = require('ytdl-core'); // For downloading YouTube videos
const getFBInfo = require("@xaviabot/fb-downloader"); // For downloading Facebook videos
const ytpl = require('ytpl');

module.exports = async function (bot) {
    bot.onText(/^http(.+)/, async (msg, match) => {
        const chatId = msg.chat.id;
        const text = msg.text;





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
            stickerMessage = await bot.sendSticker(chatId, "https://t.me/botresourcefordev/402");
            const videoUrl = YTlink[0];
            downloadAndSendYouTubeVideo(chatId, videoUrl);
            bot.deleteMessage(chatId, stickerMessage.message_id);
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
