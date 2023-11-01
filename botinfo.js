// other_regex.js
module.exports = {
    additionalIntents: [
  
      { regex: /^(?=.*\b(about|intruduce|info)\b)(?=.*\b(you|yourself|iiucbot)\b)/i, type: 'text', text:`👋 Hello! I'm iiucbot, your friendly virtual companion from the International Islamic University Chittagong (IIUC). 📚🏫
  
  I'm here to make your IIUC experience easier and more enjoyable! 🎉✨
  
  I can provide you with a wide range of services, including study materials 📖, important notices 📢, university bus schedules 🚌, updates on campus events 📅, valuable resources 🌐, and contact information for the university 📞.
  
  Whether you're a student, faculty member, or just curious about IIUC, feel free to ask me anything, and I'll do my best to assist you. Let's make your time at IIUC a breeze! 😊👍`, groupmention:true, },
  
      {
        regex: /^(?=.*\b(codecademy|codeacademy|course)\b)/i,
        type: 'text',
        text: `👉 You can try Codecademy courses, I am giving you the Premium account that costs around $391 💰. Just try to learn them 📚, and please don't change the password so that other students can learn too 🔒. You can access everything in Codecademy including Full Stack Dev, AI, ML, APP DEV,....etc 🌐. Also, get a certificate 📜.\n\n
        Try to login at codecademy.com with this:\n
        📧 Email: jakol53253@bookspre.com \n
        🔐 Password: R@kib1234\n
        Thanks me later 😊. If this doesn't work, message us at @iiucbothelp 📬.`,
        
      },
  
  
  
      {
        regex: /^(?=.*\b(false)\b)/i,
        type: "text",
        text: "its false working",
        groupmention: false,
      },
      { regex: /^(?=.*\b(ff)\b)/i, type: "text", text: "ff", groupmention: true },
      {
        regex: /^(?=.*\b(sourav)\b)/i,
        type: "text",
        text: "New Guy",
        
      },
      {
        regex: /^(?=.*\b(hjh)\b)/i,
        files: [
          {
            type: "photo",
            text: "Bus Schedule",
            postLink: "https://t.me/botresourcefordev/24",
          },
          {
            type: "document",
            text: "Normal PDF file",
            postLink: "https://t.me/botresourcefordev/9",
          },
          {
            type: "video",
            text: "ddd",
            postLink: "https://t.me/botresourcefordev/342",
          },
        ],
        
      },
      {
        regex: /^(?=.*\b(info|information)\b)(?=.*\b(faisal)\b)/i,
        type: "text",
        text: "Faisal is CR",
        
      },
  
      {
        regex: /^(?=.*\b(from group)\b)/i,
        type: "text",
        text: "from group",
        
      },
      {
        regex: /^(?=.*\b(about)\b)(?=.*\b(rakib|rakibur)\b)/i,
        type: "text",
        text: "Rakibur Rahaman is good boy",
        
      },
      {
        regex: /^(?=.*\b(hi|hello|yo|hey man)\b)/i,
        type: "text",
        text: "Hi there, what can i do for you?",
        
      },
  
      {
        regex: /^(?=.*\b(andrew)\b)(?=.*\b(topg)\b)/i,
        files: [
          {
            type: "photo",
            text: "Andrew Tate",
            postLink: "https://t.me/botresourcefordev/23",
          },
        ],
        
      },
  
      {
        regex: /^(?=.*\b(who)\b)(?=.*\b(rakib)\b)/i,
        type: "text",
        text: "Rakib is PRO",
        
      },
  
      {
        regex: /pattern1|demo/i,
        type: "text",
        text: "Response for Pattern 1",
      },
      {
        regex: /pattern2/i,
        type: "text",
        text: "Response for Pattern 2",
      },
      // Add more regex patterns and intents here
      {
        regex: /^(?=.*\b(your|you)\b)(?=.*\b(name)\b)/i,
        type: "text",
        text: "My name is IIUC Bot. How can I help you today?",
        
      },
  
      //search intent for google
  
      {
        regex: /searchpro|rr|search|google/i,
        type: 'search',
         //must mention bot in group chat before accesing this regex
      },
    ],
  };
