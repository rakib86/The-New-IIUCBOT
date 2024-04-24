const { 
    TelegramBot, 
    axios, 
    botToken,
    db
} = require('../config/config.js');
const { getDoc } = require('@firebase/firestore');
const { doc, setDoc } = require("firebase/firestore");
const { updateDoc } = require('@firebase/firestore');
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");

const storage = getStorage();

module.exports = async function(bot) {


    bot.onText(/\/bus/, async (msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id; // Get user's Telegram ID

        const getBusOptions = {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Regular Bus',
                            callback_data: 'get_regular_bus'
                        },
                        {
                            text: 'Friday Bus',
                            callback_data: 'get_friday_bus'
                        }
                    ]
                ]
            }
        };

        bot.sendMessage(chatId, 'Choose your bus type:', getBusOptions);
    });




    bot.onText(/\/updatebus$/, async (msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id; 

        const updateBusOptions = {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Regular Bus',
                            callback_data: 'update_regular_bus'
                        },
                        {
                            text: 'Friday Bus',
                            callback_data: 'update_friday_bus'
                        }
                    ]
                ]
            }
        };

        bot.sendMessage(chatId, 'Choose your bus type:', updateBusOptions);
    });











bot.on("callback_query", async (query) => {
    const chatId = query.message.chat.id;

    if (!query.data.includes("bus")) {
        return;
    }

    
    try {
        const chatId = query.message.chat.id;
        const busType = query.data;
        const name = query.from.first_name + " " + query.from.last_name;

        const busTypes = {
            "get_regular_bus": { folder: "regular", action: "get" },
            "get_friday_bus": { folder: "friday", action: "get" },
            "update_regular_bus": { folder: "regular", action: "update" },
            "update_friday_bus": { folder: "friday", action: "update" }
        };

        const selectedBusType = busTypes[busType];

        if (selectedBusType.action === "get") {
            const storageRef = ref(storage, `bus/${selectedBusType.folder}/${selectedBusType.folder}_bus.jpg`);
            const url = await getDownloadURL(storageRef);
            const docRef = doc(db, 'bus', selectedBusType.folder);
            const docSnap = await getDoc(docRef);
            const buscaption = docSnap.data().updateInfo;

            bot.sendPhoto(chatId, url, {
                caption: buscaption
            });
        } else if (selectedBusType.action === "update") {
            bot.sendMessage(chatId, "Please send the bus image:");
            bot.once("photo", async (msg) => {
                const chatId = msg.chat.id;
                const uploadingMessage = await bot.sendMessage(chatId, "Uploading the image...");
                const photoId = msg.photo[msg.photo.length - 1].file_id;
                const file = await bot.getFile(photoId);
                const url = `https://api.telegram.org/file/bot${botToken}/${file.file_path}`;
                const response = await axios.get(url, {
                    responseType: "arraybuffer",
                });
                const buffer = Buffer.from(response.data, "binary");
                const storageRef = ref(storage, `bus/${selectedBusType.folder}/${selectedBusType.folder}_bus.jpg`);
                await uploadBytes(storageRef, buffer);
                bot.deleteMessage(chatId, uploadingMessage.message_id);
                bot.sendMessage(chatId, "Bus image updated successfully.");

                const updateInfo = `Last updated by: ${name} on ${new Date().toLocaleString()}\n`;
                const docRef = doc(db, "bus", selectedBusType.folder);
                await setDoc(docRef, { updateInfo });
            });
        }
    } catch (error) {
        bot.sendMessage(chatId, `Can you please try again few minutes later?`);
    }
});
};