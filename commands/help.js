module.exports = async function(bot) {
    bot.onText(/\/help$/, async (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Hello sir, how are you?', {
            reply_to_message_id: msg.message_id
        });

        return;
    });





    
};
