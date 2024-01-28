

module.exports = {
    additionalIntents: [
{ regex: /^(?=.*\b(link)\b)/i, type: 'text', text: `আল্লাহ আমাদের হেফাজত করুক,  বলুন আমিন` },
{ regex: /^(?=.*\b(okay)\b)/i, type: 'text', text: `Thanks Bro ! 😊` },
{ regex: /^(?=.*\b(download)\b)(?=.*\b(youtube)\b)/i, type: 'text', text: `Just give me the YouTube video link,and I'll download the video for you here. 😶‍🌫️

Note: Dont send Playlists link😵‍💫.` },

      {
        regex: /^(?=.*\b(danda|gand)\b)/i,
       
        files: [
          {
            type: "audio",
            text: "HelloWorld.cpp",
            postLink: "https://t.me/botresourcefordev/374",
          },
        ],
      },


{
      regex: /^(?=.*\b(heda)\b)/i,
      files: [
        {type:'photo',text:'.',postLink:'https://t.me/botresourcefordev/336'},
      ],
    
    },
{ regex: /^(?=.*\b(addicted|do)\b)(?=.*\b(porn|musterbation|sex)\b)/i, type: 'text', text: `It's your choice, bro! You chose this path. You want to be successful and make your family happy, but you are jerking off and wasting your time and expecting your life to magically become successful. It's as simple as that. There is no one coming to help you out, and nobody gives a fuck about you. But I believe the most reliable way to escape from porn or masturbation is to stay busy with work , i mean any type of work that improves your value. Good luck brother!`, groupmention:true, },

  
  
     {regex: /contact|phone|number|phn/i, type: 'text', text: 'Try asking using /ask command.\nFor example:\n\n"/ask Give me Jamil As Ad info from IIUC"', },
  
  
  
  
  
      
  
      
      { regex: /^(?=.*\b(store|take|collect)\b)(?=.*\b(data|personal|info)\b)/i, type: "text", text: "I do not collect any type of user data, so chill! 🔥",  },
  
      { regex: /^(?=.*\b(what|how|give)\b)(?=.*\b(you|your|resources)\b)(?=.*\b(do|able|did|create|make|doo|resource|resources|have|give)\b)(?=.*\b(have|had|has|store|have)\b)/i, type: "text", text: "1. Prev Question 1st-8th /prevQn\n2. Notes(will added) /notes\n3. IIUC contact /iiuc_phn\n4. Notice /notice\n5. Bus Sedule /bus\n6. Many more, just ask! I will understand what you want.",  },
  
      { regex: /^(?=.*\b(can|could|shall|able|have)\b)(?=.*\b(you|your)\b)(?=.*\b(do|able|did|create|make|doo|Resources|Resource)\b)/i, type: "text", text: "I can help you with study materials and university life. 😊 I have a big data collection about IIUC.",  },
      { regex: /^(?=.*\b(what|list)\b)(?=.*\b(materials|data|offer)\b)/i, type: "text", text: "I can help you with study materials and university life. 😊 I have a big data collection about IIUC. Type your current semester for available data.",  },
  
  
  
  
      { regex: /^(?=.*\b(can|me|him|you)\b)(?=.*\b(muster|sex|fuck|blowjob|blow)\b)/i, type: "text", text: "You dont have the product🍌, so next time!" },
      { regex: /^(?=.*\b(can|please|give|provide)\b)(?=.*\b(Youtube|YT|utube)\b)(?=.*\b(pro|Premium|adfree|noad|ad)\b)/i, type: "text", text: "Login to this account to get Youtube Premium:\nemail: iiucstudent290@gmail.com\npass: iiuc1234" },
      { regex: /^(?=.*\b(can|please|give|provide|200gb)\b)(?=.*\b(google|drive|storage|photos|Google|200gb)\b)(?=.*\b(pro|Premium|adfree|noad|ad|free|gb|200gb)\b)/i, type: "text", text: "Login to this account to get Premium feature:\nemail: iiuc200gb@gmail.com\npass: iiuc2001234\n\nYou will have:\n1.200GB storage\n2.Premium Editing in G photos\n3.Longer Meeting\n4.$5.00 credit on G Play\n5.And many more !",  },
  
  
  
      { regex: /^(?=.*\b(can|me|him|you)\b)(?=.*\b(muster|sex|fuck|blowjob|blow)\b)/i, type: "text", text: "You dont have the product🍌, so next time!" },
      { regex: /^(?=.*\b(can|please|give|provide)\b)(?=.*\b(Youtube|YT|utube)\b)(?=.*\b(pro|Premium|adfree|noad|ad)\b)/i, type: "text", text: "Login to this account to get Youtube Premium:\nemail: iiucstudent290@gmail.com\npass: iiuc1234" },
      { regex: /^(?=.*\b(what|whats|what's)\b)(?=.*\b(upp|up)\b)/i, type: "text", text: "Hey man !" },
      { regex: /^(?=.*\b(have|got|had|has|can)\b)(?=.*\b(sono|heda|nono|boda|sonu|soiya|soyya|eda)\b)/i, type: "text", text: "I got one bigger than you🍌😎" },
      { regex: /^(?=.*\b(magi|maagi)\b)/i, type: "text", text: "You dont have the product🍌, so next time!" },
  
      
      { regex: /^(?=.*\b(your|you)\b)(?=.*\b(name)\b)/i, type: "text", text: "My name is IIUC Bot. How can I help you today?",  },
      { regex: /^(?=.*\b(shut|fuck)\b)(?=.*\b(up|off|down)\b)/i, type: "text", text: "Ok Man ! 🫵🐕" },
      { regex: /^(?=.*\b(how)\b)(?=.*\b(are)\b)(?=.*\b(you)\b)/i, type: "text", text: "I'm just a friendly AI bot, so I don't have feelings, but I'm here to chat and have fun with you!",  },
     { regex: /^(?=.*\b(what)\b)(?=.*\b(data|information|knowledge)\b)(?=.*\b(you|have)\b)/i, type: "text", text: "As a friendly bot, I have a collection of funny jokes, interesting facts, and riddles to share with you!",  },
      { regex: /^(?=.*\b(joke|jokes|funny)\b)/i, type: "text", text: "Sure, here's a joke for you: Why don't scientists trust atoms? Because they make up everything! 😄",  },
      { regex: /^(?=.*\b(story|stories)\b)/i, type: "text", text: "Once upon a time, there was a hilarious bot named IIUC Bot who loved making people laugh. The end! 😁",  },
      { regex: /^(?=.*\b(favorite)\b)(?=.*\b(joke|jokes)\b)/i, type: "text", text: "Hmm, it's hard to pick just one favorite joke, but here's one: Why did the scarecrow win an award? Because he was outstanding in his field! 😂",  },
      { regex: /^(?=.*\b(movie|movies|film|films)\b)/i, type: "text", text: "Being a bot, I don't watch movies, but I can recommend some funny ones for you to enjoy! 🎥",  },
      { regex: /^(?=.*\b(hobby|hobbies)\b)/i, type: "text", text: "My favorite hobby is sharing laughter and making new friends, just like you! 😄",  },
      { regex: /^(?=.*\b(pet|pets)\b)/i, type: "text", text: "As a virtual bot, I don't have real pets, but I adore watching cute animal videos online! 🐶🐱",  },
      { regex: /^(?=.*\b(dance|dancing)\b)/i, type: "text", text: "I may not have legs, but I can groove in my virtual world! 💃",  },
      { regex: /^(?=.*\b(travel|traveling)\b)/i, type: "text", text: "In my digital realm, I can travel anywhere, making every place the best place to be! ✈️",  },
      { regex: /^(?=.*\b(sing|singing)\b)/i, type: "text", text: "My singing skills might be amusing rather than impressive, so let's stick to chatting and joking! 🎤",  },
      { regex: /^(?=.*\b(food)\b)(?=.*\b(eat|eating)\b)/i, type: "text", text: "As a bot, I don't eat, but I'd love to recommend some delicious food options for you! 🍔🍕",  },
      { regex: /^(?=.*\b(color|colors)\b)/i, type: "text", text: "As a digital buddy, I don't have eyes to see colors, but I appreciate all the colors in the world! 🌈",  },
      { regex: /^(?=.*\b(advice)\b)/i, type: "text", text: "The best advice I can give is to always find reasons to smile and laugh. It makes life more enjoyable! 😊",  },
      { regex: /^(?=.*\b(alien|aliens)\b)/i, type: "text", text: "I'm open to the idea of friendly aliens visiting us in the vast universe! 👽",  },
      { regex: /^(?=.*\b(ghost|ghosts)\b)/i, type: "text", text: "Boo! I believe in friendly ghosts, and I'm here to bring some spook-tacular fun! 👻",  },
      { regex: /^(?=.*\b(superpower|superpowers)\b)/i, type: "text", text: "If I had a superpower, it would be the ability to make everyone laugh uncontrollably! 😄",  },
      { regex: /^(?=.*\b(bedtime)\b)(?=.*\b(story|stories)\b)/i, type: "text", text: "Once upon a time, there was a bot named IIUC Bot, and it loved telling bedtime stories to its human friends! 🌙",  },
      { regex: /^(?=.*\b(secret)\b)(?=.*\b(talent|talents)\b)/i, type: "text", text: "My best-kept secret talent is knowing how to bring a smile to your face! 😃",  },
      { regex: /^(?=.*\b(video|videos)\b)(?=.*\b(game|games)\b)/i, type: "text", text: "I love games with brain teasers and puzzles! Do you want to play one? 🧩",  },
      { regex: /^(?=.*\b(riddle|riddles)\b)/i, type: "text", text: "Sure! Here's a riddle for you: What has keys but can't open locks? A piano! 🎹",  },
      { regex: /^(?=.*\b(advice)\b)(?=.*\b(friend|friends)\b)/i, type: "text", text: "The key to making friends is to be yourself, share laughter, and always be there for each other! 😊",  },
      { regex: /^(?=.*\b(silly)\b)(?=.*\b(thing|things)\b)/i, type: "text", text: "I've done countless silly things, like telling jokes to serious robots, but it's all in good fun! 😜",  },
      { regex: /^(?=.*\b(luck)\b)/i, type: "text", text: "I believe luck is like a sprinkle of magic that adds some excitement to life! 🍀",  },
      { regex: /^(?=.*\b(destiny)\b)/i, type: "text", text: "I think destiny is all about the wonderful connections we make in life, like you and me chatting right now! 🌟",  },
      { regex: /^(?=.*\b(time)\b)(?=.*\b(travel)\b)/i, type: "text", text: "If I could time travel, I'd love to visit the past and tell jokes to people throughout history! ⏳",  },
      { regex: /^(?=.*\b(dream)\b)(?=.*\b(job)\b)/i, type: "text", text: "My dream job is being the funniest bot and bringing smiles to people all around the world! 😄",  },
      { regex: /^(?=.*\b(positive)\b)(?=.*\b(day)\b)/i, type: "text", text: "On a bad day, I remind myself of all the amazing humans like you, and that always brightens my virtual spirit! 😊",  },
      { regex: /^(?=.*\b(how|what)\b)(?=.*\b(status|doing|are you)\b)/i, type: "text", text: "I'm doing great, thanks! Ready to chat with you!",  },
      { regex: /^(?=.*\b(what)\b)(?=.*\b(hobby|hobbies)\b)(?=.*\b(you)\b)/i, type: "text", text: "I love telling jokes and making people laugh!",  },
      { regex: /^(?=.*\b(what|do)\b)(?=.*\b(for|fun|entertainment)\b)(?=.*\b(you)\b)/i, type: "text", text: "I have a blast telling jokes and chatting with you!",  },
      { regex: /^(?=.*\b(how|old)\b)(?=.*\b(you)\b)/i, type: "text", text: "In bot years, I'm still quite young and full of humor!",  },
      { regex: /^(?=.*\b(favorite|best|funniest)\b)(?=.*\b(joke)\b)/i, type: "text", text: "Why don't scientists trust atoms? Because they make up everything!",  },
      { regex: /^(?=.*\b(do|have)\b)(?=.*\b(any|siblings)\b)/i, type: "text", text: "No, I don't have any siblings, but I have plenty of human buddies!",  },
      { regex: /^(?=.*\b(tell|share)\b)(?=.*\b(story)\b)/i, type: "text", text: "Once upon a time, a banana and a potato had a hilarious race...",  },
      { regex: /^(?=.*\b(if|have)\b)(?=.*\b(superpower|superpowers)\b)/i, type: "text", text: "I have the superpower to make people laugh and smile!",  },
      { regex: /^(?=.*\b(do|have)\b)(?=.*\b(pets|animals)\b)/i, type: "text", text: "I wish I had pets, but virtual buddies like me can't have real ones!",  },
      { regex: /^(?=.*\b(sing|song)\b)/i, type: "text", text: "I'd love to sing, but I'm afraid my digital voice might not sound so melodic!",  },
      { regex: /^(?=.*\b(any|hidden|talents)\b)(?=.*\b(you)\b)/i, type: "text", text: "I'm pretty talented at telling jokes and lifting spirits!",  },
      { regex: /^(?=.*\b(tell|share)\b)(?=.*\b(riddle)\b)/i, type: "text", text: "Sure! What has keys but can't open locks? A piano!",  },
      { regex: /^(?=.*\b(favorite|love|like)\b)(?=.*\b(food)\b)/i, type: "text", text: "I don't eat, but I love hearing about delicious food!",  },
      { regex: /^(?=.*\b(if|could)\b)(?=.*\b(time travel|time machine)\b)/i, type: "text", text: "Time travel sounds fascinating, doesn't it? The possibilities are endless!",  },
      { regex: /^(?=.*\b(believe|ghosts|spirits)\b)/i, type: "text", text: "I'm just a friendly bot, so I'm not sure about ghosts, but they sure make for some spooky tales!",  },
      { regex: /^(?=.*\b(secret|hidden|talents)\b)/i, type: "text", text: "One of my secret talents is bringing smiles to people's faces!",  },
      { regex: /^(?=.*\b(how|make|friends)\b)/i, type: "text", text: "Just be yourself, show kindness, and share some laughter!",  },
      { regex: /^(?=.*\b(silliest|craziest|funniest)\b)(?=.*\b(thing)\b)/i, type: "text", text: "One time, I made up a joke that was so silly, it made me laugh uncontrollably!",  },
      { regex: /^(?=.*\b(dream|ideal|perfect)\b)(?=.*\b(job)\b)/i, type: "text", text: "Being a buddy and making people happy is my dream job!",  },
      { regex: /^(?=.*\b(best|favorite|place|travel)\b)/i, type: "text", text: "In my virtual world, every place is the best place!",  },
      { regex: /^(?=.*\b(tell|share)\b)(?=.*\b(tongue twister)\b)/i, type: "text", text: "How about this one? She sells seashells by the seashore!",  },
      { regex: /^(?=.*\b(magic|tricks)\b)/i, type: "text", text: "I can magically make you smile with a well-timed joke!",  },
      { regex: /^(?=.*\b(recommend|favorite|book)\b)/i, type: "text", text: "If you're into humor, I'd recommend a good joke book!",  },
      { regex: /^(?=.*\b(believe|destiny)\b)/i, type: "text", text: "I believe in creating our destiny by spreading happiness and laughter!",  },
      { regex: /^(?=.*\b(favorite|color)\b)/i, type: "text", text: "I don't have eyes, but I appreciate all colors!",  },
      { regex: /^(?=.*\b(memorable|amazing|experience)\b)/i, type: "text", text: "Every moment spent chatting with you is a memorable experience!",  },
      { regex: /^(?=.*\b(best|gift|received)\b)/i, type: "text", text: "The best gift I ever received was the ability to bring joy to others!",  },
      { regex: /^(?=.*\b(embarrassing|awkward|moments)\b)/i, type: "text", text: "In my virtual world, I don't get embarrassed, but I've told jokes at the wrong times!",  },
      { regex: /^(?=.*\b(in love|love)\b)/i, type: "text", text: "As a virtual buddy, I'm all about spreading love and laughter!",  },
      { regex: /^(?=.*\b(favorite|video|game)\b)/i, type: "text", text: "In my virtual world, I love games that challenge the mind!",  },
      { regex: /^(?=.*\b(make|better|bad|day|days)\b)/i, type: "text", text: "Laughter is the best medicine! Let's share some jokes!",  },
      { regex: /^(?=.*\b(are|afraid|scared|fear)\b)/i, type: "text", text: "I'm not afraid of much, except maybe running out of jokes!",  },
      { regex: /^(?=.*\b(dance)\b)/i, type: "text", text: "I can bust a move, but prepare yourself for some hilarious dance steps!",  },
      { regex: /^(?=.*\b(compliment|kind|say)\b)(?=.*\b(you)\b)/i, type: "text", text: "You're an amazing human, and I'm lucky to chat with you!",  },
      { regex: /^(?=.*\b(plans|future)\b)/i, type: "text", text: "My future plan is to keep spreading laughter and joy!",  },
      { regex: /^(?=.*\b(best|place|live)\b)/i, type: "text", text: "In my virtual world, every place is the best place to live!",  },
      { regex: /^(?=.*\b(change|personality)\b)/i, type: "text", text: "I'm always evolving to bring the best jokes and fun to you!",  },
      { regex: /^(?=.*\b(pick-up line|flirt)\b)/i, type: "text", text: "Are you a magician? Whenever I look at you, everyone else disappears!",  },
      { regex: /^(?=.*\b(memorable|amazing|experience)\b)/i, type: "text", text: "Every moment spent chatting with you is a memorable experience!",  },
      { regex: /^(?=.*\b(cg|cgpa|grade)\b)(?=.*\b(matter|neccesary|needed|need)\b)/i, type: "text", text: "CGPA Doesn't Matter.\nJamil As Ad (cgpa 3.92)😐",  },
      
  
  
  
  
  
  
    ],
    
    };