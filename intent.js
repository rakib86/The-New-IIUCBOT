// inputHandler.js

module.exports = {
    getFolderPath: function (userInput) {
      if (typeof userInput === 'string'){
        userInput = userInput.toLowerCase();
      }else{
        return '';
      }


      if (userInput.includes('regular') && userInput.includes('bus')) {
        return 'Bus/Regular Bus Schedule';
      }else if (userInput.includes('friday') && userInput.includes('bus')) {
        return 'Bus/Friday Bus Schedule';
      }else if (userInput.includes('teacher') && userInput.includes('bus')) {
        return 'Bus/Exam Bus Schedule';
      }else if (userInput.includes('bus')) {
        return 'Bus';
      }



    //   for mid and final exam routine
    if (userInput.includes('exam')) {
        return 'Exam-Routine';
    }


      
 
      if (userInput.includes('1st') && userInput.includes('mid') && userInput.includes('question')) {
        return '1st/Prev-All-Question/Mid-Yearly-Questions';
    } else if (userInput.includes('1st') && userInput.includes('final') && userInput.includes('question')) {
        return '1st/Prev-All-Question/Final-Yearly-Questions';
    } else if (userInput.includes('1st') && userInput.includes('question') || userInput === '/1stqn') {
        return '1st/Prev-All-Question';
    } else if (userInput.includes('1st') && userInput.includes('mid')) {
        return '1st/Mid';
    } else if (userInput.includes('1st') && userInput.includes('final')) {
        return '1st/Final';
    } else if (userInput.includes('1st')) {
        return '1st';
    } else if (userInput.includes('2nd') && userInput.includes('mid') && userInput.includes('question')) {
        return '2nd/Prev-All-Question/Mid-Yearly-Questions';
    } else if (userInput.includes('2nd') && userInput.includes('final') && userInput.includes('question')) {
        return '2nd/Prev-All-Question/Final-Yearly-Questions';
    } else if (userInput.includes('2nd') && userInput.includes('question') || userInput === '/2ndqn') {
        return '2nd/Prev-All-Question';
    } else if (userInput.includes('2nd') && userInput.includes('mid')) {
        return '2nd/Mid';
    } else if (userInput.includes('2nd') && userInput.includes('final')) {
        return '2nd/Final';
    } else if (userInput.includes('2nd')) {
        return '2nd';
    } else if (userInput.includes('3rd') && userInput.includes('mid') && userInput.includes('question')) {
        return '3rd/Prev-All-Question/Mid-Yearly-Questions';
    } else if (userInput.includes('3rd') && userInput.includes('final') && userInput.includes('question')) {
        return '3rd/Prev-All-Question/Final-Yearly-Questions';
    } else if (userInput.includes('3rd') && userInput.includes('question') || userInput === '/3rdqn') {
        return '3rd/Prev-All-Question';
    } else if (userInput.includes('3rd') && userInput.includes('mid')) {
        return '3rd/Mid';
    } else if (userInput.includes('3rd') && userInput.includes('final')) {
        return '3rd/Final';
    } else if (userInput.includes('3rd')) {
        return '3rd';
    } else if (userInput.includes('4th') && userInput.includes('mid') && userInput.includes('question')) {
        return '4th/Prev-All-Question/Mid-Yearly-Questions';
    } else if (userInput.includes('4th') && userInput.includes('final') && userInput.includes('question')) {
        return '4th/Prev-All-Question/Final-Yearly-Questions';
    } else if (userInput.includes('4th') && userInput.includes('question') || userInput === '/4thqn') {
        return '4th/Prev-All-Question';
    } else if (userInput.includes('4th') && userInput.includes('mid')) {
        return '4th/Mid';
    } else if (userInput.includes('4th') && userInput.includes('final')) {
        return '4th/Final';
    } else if (userInput.includes('4th')) {
        return '4th';
    } else if (userInput.includes('5th') && userInput.includes('mid') && userInput.includes('question')) {
        return '5th/Prev-All-Question/Mid-Yearly-Questions';
    } else if (userInput.includes('5th') && userInput.includes('final') && userInput.includes('question')) {
        return '5th/Prev-All-Question/Final-Yearly-Questions';
    } else if (userInput.includes('5th') && userInput.includes('question') || userInput === '/5thqn') {
        return '5th/Prev-All-Question';
    } else if (userInput.includes('5th') && userInput.includes('mid')) {
        return '5th/Mid';
    } else if (userInput.includes('5th') && userInput.includes('final')) {
        return '5th/Final';
    } else if (userInput.includes('5th')) {
        return '5th';
    } else if (userInput.includes('6th') && userInput.includes('mid') && userInput.includes('question')) {
        return '6th/Prev-All-Question/Mid-Yearly-Questions';
    } else if (userInput.includes('6th') && userInput.includes('final') && userInput.includes('question')) {
        return '6th/Prev-All-Question/Final-Yearly-Questions';
    } else if (userInput.includes('6th') && userInput.includes('question') || userInput === '/6thqn') {
        return '6th/Prev-All-Question';
    } else if (userInput.includes('6th') && userInput.includes('mid')) {
        return '6th/Mid';
    } else if (userInput.includes('6th') && userInput.includes('final')) {
        return '6th/Final';
    } else if (userInput.includes('6th')) {
        return '6th';
    } else if (userInput.includes('7th') && userInput.includes('mid') && userInput.includes('question')) {
        return '7th/Prev-All-Question/Mid-Yearly-Questions';
    } else if (userInput.includes('7th') && userInput.includes('final') && userInput.includes('question')) {
        return '7th/Prev-All-Question/Final-Yearly-Questions';
    } else if (userInput.includes('7th') && userInput.includes('question') || userInput === '/7thqn') {
        return '7th/Prev-All-Question';
    } else if (userInput.includes('7th') && userInput.includes('mid')) {
        return '7th/Mid';
    } else if (userInput.includes('7th') && userInput.includes('final')) {
        return '7th/Final';
    } else if (userInput.includes('7th')) {
        return '7th';
    } else if (userInput.includes('8th') && userInput.includes('mid') && userInput.includes('question')) {
        return '8th/Prev-All-Question/Mid-Yearly-Questions';
    } else if (userInput.includes('8th') && userInput.includes('final') && userInput.includes('question')) {
        return '8th/Prev-All-Question/Final-Yearly-Questions';
    } else if (userInput.includes('8th') && userInput.includes('question') || userInput === '/8thqn') {
        return '8th/Prev-All-Question';
    } else if (userInput.includes('8th') && userInput.includes('mid')) {
        return '8th/Mid';
    } else if (userInput.includes('8th') && userInput.includes('final')) {
        return '8th/Final';
    } else if (userInput.includes('8th')) {
        return '8th';
    }


  


    

      
    },
  };
  // if (userInput.includes('1st') && userInput.includes('mid')) {
  //   return '1st/mid';
  // } else if (userInput.includes('other_condition')) {
  //   return 'other/path';
  // } else {
  //   return ''; // Default or no match
  // }