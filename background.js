console.log("background running");

chrome.runtime.onMessage.addListener(receiver);

// let word = 'home';
let bgpage = {
  word: null,
  loginId: null,
};

// let idObj = {
//   msg : "loginId",
//   loginId: ''
// };

function receiver(request, sender, sendResponse) {
  // console.log(request, 'request');
  if (request.type == "message") {
    bgpage.word = request.message;
    bgpage.msg = "data";
    // console.log(bgpage.word.title);

    setTimeout(() => {
      chrome.runtime.sendMessage(bgpage, (res) => {
        if (chrome.runtime.lastError) {
          console.log("ERR");
        } else {
          console.log("OK");
        }
      });
    }, 2000);
    console.log(bgpage);
  }

  var i = setInterval(() => {
    if (request.type == "auth") {
      bgpage.loginId = request.auth;
      bgpage.msg = "loginId";
      setTimeout(() => {
        chrome.runtime.sendMessage(bgpage, (res) => {
          if (chrome.runtime.lastError) {
            console.log("ERR");
          } else {
            console.log("OK");
          }
        });
      }, 2000);
      clearInterval(i);
    }
  }, 100);
}
