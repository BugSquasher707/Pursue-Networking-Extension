var id = 0;
var new_id = 0;
var loc = null;
var new_location = "";
var loginId = "";

var x = setInterval(() => {
  if (localStorage.getItem("id") != null && !(window.location.href.includes("https://pursuenetworking.com/"))) {
    loginId = localStorage.getItem("id");
    chrome.runtime.sendMessage({ type: "auth", auth: loginId });
    clearInterval(x);
    localStorage.removeItem("id");
    loginId = "";
    window.location.href = "https://www.linkedin.com/in/";
  }
}, 500);

// let stateCheck = setInterval(() => {
// 	action();
// }, 4000);

var x = setInterval(() => {
  var new_location = window.location.href;
  getid = localStorage.getItem("user_id");

  var temp = 0;
  if (
    new_location != loc &&
    new_location.includes("https://www.linkedin.com/in/")
  ) {
    temp = 1;
    loc = new_location;
    let message = {
      loader: "loader",
    };
    chrome.runtime.sendMessage({ type: "message", message });
    action();
  }
}, 100);

function action() {
  setTimeout(() => {
    window.scroll(0, 1500);
  }, 4000);

  setTimeout(function () {
    window.scroll(0, 0);
    let about = document.querySelector(
      ".pv-shared-text-with-see-more.t-14.t-normal.t-black.display-flex.align-items-center"
    );

    if (!about) {
      about = null;
    } else {
      var spans = about.getElementsByTagName("span");
      if (!spans[0].innerText) {
        about = spans[1].innerText;
      } else {
        about = spans[0].innerText;
      }
    }

    new_id = document
      .getElementsByClassName("artdeco-card ember-view pv-top-card")[0]
      .getAttribute("data-member-id");

    let title = document.getElementsByTagName("title")[0];
    if (title != null) {
      title = title.innerText.toString().trim();
    }

    let name = document.getElementsByClassName(
      "text-heading-xlarge inline t-24 v-align-middle break-words"
    )[0];
    if (name != null && name.innerText != null) {
      name = name.innerText.toString().trim();
    }

    let description = document.getElementsByClassName(
      "text-body-medium break-words"
    )[0];
    if (description != null && description.innerText != null) {
      description = description.innerText.toString().trim();
    }

    let address = document.getElementsByClassName(
      "text-body-small inline t-black--light break-words"
    )[0];
    if (address != null && address.innerText != null) {
      address = address.innerText.toString().trim();
    }

    let company = document.querySelector('[aria-label="Current company"]');
    if (company != null && company.innerText != null) {
      company = company.innerText.toString().trim();
    } else {
      company = document.querySelector(
        ".pv-entity__secondary-title.t-14.t-black.t-normal"
      );
      if (company != null && company.innerText != null) {
        company = company.innerText;
      } else {
        company = null;
      }
    }

    var img = document.querySelector(".pv-top-card-profile-picture__image");

    if (img != null && img != null) {
      img = img.src;
    } else {
      img = document.querySelector(".ember-view.profile-photo-edit__preview");
      img = img.src;
    }
    if (img == null) {
      img = "./Assets/img/selecteddms.svg";
    }

    let profile_link = window.location.href;

    let message = {
      id: id,
      title: title,
      name: name,
      description: description,
      address: address,
      company: company,
      about: about,
      img: img,
      profile_link: profile_link,
    };

    chrome.runtime.sendMessage({ type: "message", message });
  }, 6000);
}

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  if (message.temp) {
    localStorage.setItem("user_id", message.temp);
    localStorage.setItem("profilepic", message.profilepic);
    localStorage.setItem("name", message.fname);
    localStorage.setItem("username", message.username);
  }

  if (!message.auth) {
    var current_location = window.location.href;
    if (
      current_location.includes("https://www.linkedin.com/in/") &&
      message.txt.includes("https://extension-dashboard.vercel.app")
    ) {
      window.open(message.txt, "_blank");
      window.focus();
    } else if (
      current_location.includes("https://extension-dashboard.vercel.app")
    ) {
      if (!message.txt.includes("https://extension-dashboard.vercel.app")) {
        if (!message.donot) {
          var myWindow = window.open(message.txt, "", "width=680, height=750");
          myWindow.blur();
        }
      }
    } else {
      window.location.href = message.txt;
    }
  } else {
    if (message.auth) {
      window.location.href = "";
      window.location.href = message.auth;
      clearInterval(a);
    }
  }
}

function getElementByXpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}
