module.exports = async function(bot) {
   

    //mute a user by replying to a message and using /mute

    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const messageId = msg.message_id;
        const replyMessageId = msg.reply_to_message ? msg.reply_to_message.message_id : null;
        const replyUserId = msg.reply_to_message ? msg.reply_to_message.from.id : null;


        //if the message is not '/mute' then return

        if (msg.text !== "/mute") {
            return;
        }

        const chatMember = await bot.getChatMember(chatId, userId);

        if (chatMember.status !== "administrator" && chatMember.status !== "creator") {
            bot.sendMessage(chatId, "Only admins can use this command.");
            return;
        }

        if (msg.text === "/mute" && replyMessageId) {
            bot.restrictChatMember(chatId, replyUserId, {
                until_date: 0,
            });
            bot.sendMessage(chatId, `User muted.`, {
                reply_to_message_id: messageId
            });
        }
    });

    //unmute a user by replying to a message and using /unmute

    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const messageId = msg.message_id;
        const replyMessageId = msg.reply_to_message ? msg.reply_to_message.message_id : null;
        const replyUserId = msg.reply_to_message ? msg.reply_to_message.from.id : null;

        if (msg.text !== "/unmute") {
            return;
        }

        const chatMember = await bot.getChatMember(chatId, userId);
        if (chatMember.status !== "administrator" && chatMember.status !== "creator") {
            bot.sendMessage(chatId, "Only admins can use this command.");
            return;
        }

        if (msg.text === "/unmute" && replyMessageId) {
            bot.restrictChatMember(chatId, replyUserId, {
                until_date: 0,
                can_send_messages: true,
                can_send_media_messages: true,
                can_send_other_messages: true,
                can_add_web_page_previews: true
            });
            bot.sendMessage(chatId, "User unmuted.");
        }
    });



    
    
};
