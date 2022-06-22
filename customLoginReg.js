// Test URL

// const globalURl = "http://192.168.10.15:80"

// Stable URL

const globalURl = "https://linkedin.thefastech.com";

// Test URL

// const globalURl = "https://testlinkedin.thefastech.com";

if (document.getElementById("register_submit")) {
  document
    .getElementById("register_submit")
    .addEventListener("click", registerSubmit);
}
if (document.getElementById("register_linkedIn")) {
  document
    .getElementById("register_linkedIn")
    .addEventListener("click", registerLinkedIn);
}

if (document.getElementById("registerLogo")) {
  document
    .getElementById("registerLogo")
    .addEventListener("click", registerBackPage);
}

function registerBackPage() {
  document.location.href = "popup.html";
}

if (document.getElementById("backToMainPage")) {
  document
    .getElementById("backToMainPage")
    .addEventListener("click", loginBackPage);
}

function loginBackPage() {
  document.location.href = "popup.html";
}

function registerSubmit() {
  var username = document.getElementById("username_register").value;
  var password = document.getElementById("password_register").value;
  var confirm_password = document.getElementById(
    "confirm_password_register"
  ).value;
  var message = document.getElementById("message");

  var re = /\S+@\S+\.\S+/;
  // return re.test(email);

  if (!re.test(username)) {
    message.innerText = "Email Format incorrect";
  } else if (password.length < 6) {
    message.innerText = "Password must be greater than 6 characters";
  } else if (password != confirm_password) {
    message.innerText = "Password and Confirm Password must be same";
  } else {
    message.style.color = "green";
    message.innerText = "Waiting for response";

    const url = `${globalURl}/registration`;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        username: username,
        password: password,
      })
    );

    xhr.onreadystatechange = function () {
      //Call a function when the state changes.
      if (xhr.readyState == 4 && xhr.status == 200) {
        if (xhr.responseText != "400") {
          message.innerText = "Registration Successful";
          setTimeout(function () {
            document.location.href = "login.html";
          }, 2000);
        } else {
          message.style.color = "red";
          message.innerText = "User Already Exists";
        }
      }
    };
  }
}

function registerLinkedIn() {
  let params = {
    active: true,
    currentWindow: true,
  };
  chrome.tabs.query(params, gotTab);

  function gotTab(tabs) {
    let msg = {
      auth: "https://testlinkedin.thefastech.com/social",
    };
    chrome.tabs.sendMessage(tabs[0].id, msg);
  }
  window.close();
}

if (document.getElementById("login_submit")) {
  document
    .getElementById("login_submit")
    .addEventListener("click", loginSubmit);
}

if (document.getElementById("login_linkedIn")) {
  document
    .getElementById("login_linkedIn")
    .addEventListener("click", loginLinkedIn);
}

function loginSubmit() {
  var username = document.getElementById("username_login").value;
  var message = document.getElementById("message");

  var re = /\S+@\S+\.\S+/;
  // return re.test(email);

  if (!re.test(username)) {
    message.innerText = "Email format incorrect";
  } else {
    message.style.color = "green";
    message.innerText = "Waiting for response";

    const url = `${globalURl}/login`;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        username: username,
      })
    );

    xhr.onreadystatechange = function () {
      //Call a function when the state changes.
      if (xhr.readyState == 4 && xhr.status == 200) {
        if (xhr.responseText != "400") {
          user = JSON.parse(xhr.responseText);

          if (user) {
            message.innerText = "Login Successful";
            localStorage.setItem("access_token", user.access_token);
            localStorage.setItem("user_id", user.id);
            localStorage.setItem("username", user.username);
            localStorage.setItem("profilePic", user.image);
			
            if (user.username == "admin1") {
              setTimeout(function () {
                document.location.href = "/admin.html";
              }, 2000);
            } else {
              setTimeout(function () {
                document.location.href = "popup.html";
              }, 2000);
            }
          } else {
            message.style.color = "red";
            message.innerText = "Login Credentials are not Correct";
          }
        } else {
          message.style.color = "red";
          message.innerText = "Login Credentials are not Correct";
        }
      }
    };
  }
}

function loginLinkedIn() {
  let params = {
    active: true,
    currentWindow: true,
  };
  chrome.tabs.query(params, gotTab);

  function gotTab(tabs) {
    let msg = {
      auth: "https://testlinkedin.thefastech.com/social",
    };
    chrome.tabs.sendMessage(tabs[0].id, msg);
  }
  window.close();
}
