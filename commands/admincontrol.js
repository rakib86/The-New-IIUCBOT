const { 
    db
} = require('../config/config');
const { doc, setDoc } = require("firebase/firestore");

module.exports = async function(bot) {

    // /addbroadcastadmin command to add a broadcast admin (/addbroadcastadmin @username)

    bot.onText(/\/addbroadcastadmin (.+)/, async (msg, match) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id; // Get user's Telegram ID
        const adminId = match[1].replace('@', ''); // Get the admin's Telegram ID


        bot.sendMessage(chatId, `Adding admin ${adminId}...`);

        // Fetch user data from Firebase
        try {
            const docRef = doc(db, "broadcastadmins", adminId);
            

            const docSnap = await setDoc(docRef, {
                adminId: adminId,
                addedBy: userId,
                addedAt: new Date()
            });


            bot.sendMessage(chatId, `Admin ${adminId} has been added successfully.`);
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, 'There was an error for adding the admin.');
        }

        bot.deleteMessage(chatId, msg.message_id);
    });
    
};