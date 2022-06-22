console.log('background running');

chrome.runtime.onMessage.addListener(receiver);

window.word = 'home';
window.loginId = ''

function receiver(request, sender, sendResponse) {
  console.log(request, 'request');
  if(request.type == 'message'){
    word = request.message;

    console.log(request);
  }
  
  var i = setInterval(() => {
    if(request.type == 'auth'){
      loginId = request.auth;
      clearInterval(i)
    }
  }, 100)
}