// Home Page Code ...............................................

localStorage.removeItem("group_id");
localStorage.removeItem("receiver_id");

// Test URL

// const globalURl = "https://precious-ride.thefastech.com"

// Stable URL

const globalURl = "https://linkedin.thefastech.com";

// Test URL

// const globalURl = "https://testlinkedin.thefastech.com";

setTimeout(() => {
  topbaricons();
}, 200);
setTimeout(() => {
  if (document.getElementById("shardm1")) {
    document.getElementById("shardm1").addEventListener("click", () => {
      var element = document.getElementById("value1").value;
      localStorage.setItem("reciever_id", element);
      openDirectChat(element);
    });
  }
  if (document.getElementById("shardm2")) {
    document.getElementById("shardm2").addEventListener("click", () => {
      var element = document.getElementById("value2").value;
      localStorage.setItem("reciever_id", element);
      openDirectChat(element);
    });
  }
  if (document.getElementById("shardm3")) {
    document.getElementById("shardm3").addEventListener("click", () => {
      var element = document.getElementById("value3").value;
      localStorage.setItem("reciever_id", element);
      openDirectChat(element);
    });
  }
}, 1000);

function openDirectChat(element) {
  localStorage.setItem("isChatIcon", true);
  window.location.href = "messagebox.html";
}

function topbaricons() {
  secondUserPic = localStorage.getItem("secondUserPic");
  if (secondUserPic != "") {
    document.getElementById("profilePic").src = secondUserPic;
  } else {
    profilePic = localStorage.getItem("profilePic");
    document.getElementById("profilePic").src = profilePic;
  }
  name = localStorage.getItem("second_user_name");
  if (name != "null" && name != "") {
    document.getElementById(
      "savedUserMessage"
    ).innerText = `You're in ${name}'s Database`;
  } else {
    document.getElementById("savedUserMessage").innerText =
      "Records from Database";
  }
  document.querySelector(".imgContainer").innerHTML = "";
  document.querySelector(".new_header_right_imgs").innerHTML = "";

  var user_id = localStorage.getItem("user_id");

  const url = `${globalURl}/getmembers/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);
      let style = -60;
      let count = 1;
      let z = 1;
      userData.users.slice(0, 3).map((item, i, arr) => {
        var row =
          item.image != null
            ? `
              <input type="hidden" id="value${z}" value="${
                item.linked_to_id
              }"></input>

              <div class="iconMsgPicContainer">
              ${
                item.total_notifications != 0
                  ? `<div class="countNum1">${item.total_notifications}</div>`
                  : ""
              }
                <img class="new-top-img" id="shardm${count}" src="${
                item.image
              }">
                <span class="tooltiptext">${item.username}</span>
              </div>
            `
            : "";

        document.querySelector(".imgContainer").innerHTML += row;
        style = style + 35;
        count = count + 1;
        z = z + 1;
      });

      if (userData.users.length > 3) {
        document.querySelector(
          ".imgContainer"
        ).innerHTML += `<span class='showMembersAll'><i class="fas fa-eye"></i></span>`;

        document
          .querySelector(".showMembersAll")
          .addEventListener("click", () => {
            document.querySelector(".membersContainer").innerHTML = "";

            document.getElementById("membersDynamicModal").style.transform =
              "scale(1)";
            document.getElementById("membersDynamicModal").style.opacity = 1;

            var user_id = localStorage.getItem("user_id");

            const url = `${globalURl}/chats/${user_id}`;

            let xhr = new XMLHttpRequest();

            xhr.open("GET", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();

            xhr.onreadystatechange = function () {
              //Call a function when the state changes.
              if (xhr.readyState == 4 && xhr.status == 200) {
                let userData = JSON.parse(xhr.responseText);

                if (userData.length > 0) {
                  userData.map((item, i, arr) => {
                    var row = `
                    <div class="prospectContent memberDiv" data-member_id=${item.linked_to_id}>

                      <img src=${item.image} alt=""/>

                      <h1>${item.mutual}</h1>

                    </div>
                  `;

                    document.querySelector(".membersContainer").innerHTML +=
                      row;
                  });
                } else {
                  document.querySelector(".membersContainer").innerHTML = `
                  <div class="prospectContent">

                    <h1>No Chat Memebers</h1>

                  </div>
                `;
                }
              }
            };
          });

        setInterval(() => {
          if (document.querySelector(".memberDiv")) {
            document.querySelectorAll(".memberDiv").forEach((ele) => {
              ele.addEventListener("click", (e) => {
                let receiver_id = ele.getAttribute("data-member_id");
                localStorage.setItem("reciever_id", receiver_id);
                openDirectChat();
              });
            });
          }
        }, 100);

        document
          .querySelector("#membersDynamicModalCloseBtn")
          .addEventListener("click", () => {
            document.getElementById("membersDynamicModal").style.transform =
              "scale(0)";
            document.getElementById("membersDynamicModal").style.opacity = 0;
          });
      }

      if (userData.groups != 200) {
        if (userData.groups.length > 3) {
          document.querySelectorAll(".new_header_right_imgs").forEach((ele) => {
            ele.innerHTML = `<span class='showGroupsAll'><i class="fas fa-eye"></i></span>`;
          });

          setTimeout(() => {
            document.querySelectorAll(".showGroupsAll").forEach((ele) => {
              ele.addEventListener("click", () => {
                document.querySelector(".groupDynamicContainer").innerHTML = "";

                document.getElementById("groupsDynamicModal").style.transform =
                  "scale(1)";
                document.getElementById("groupsDynamicModal").style.opacity = 1;

                document.getElementById("groupsDynamicModalH1").innerText =
                  "Groups";

                var user_id = localStorage.getItem("user_id");

                const url = `${globalURl}/check_groups/${user_id}/0`;

                let xhr = new XMLHttpRequest();

                xhr.open("GET", url, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send();

                xhr.onreadystatechange = function () {
                  if (xhr.readyState == 4 && xhr.status == 200) {
                    let userData = JSON.parse(xhr.responseText);

                    if (userData.length > 0) {
                      userData.map((item) => {
                        document.querySelector(
                          ".groupDynamicContainer"
                        ).innerHTML += `
                          <div style="position: relative;">
                          <div class="groupBox groupChats" data-group_id=${
                            item.group_id
                          }>

                               <img src="${
                                 item.image
                               }" class="userIconDemo" data-receiverid="32">

                            ${
                              item.notifications != 0
                                ? `<div class="notificationBox">${item.notifications}</div>`
                                : ""
                            }
                            </div>
                            <div class="groupName" style="display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            max-width: 328px;
                            width: auto;
              height: auto;
              line-height: 12px;
              font-size: 11px;
              white-space: break-spaces;
                            ">${item.name}</div>
                          </div>
                        `;
                      });

                      document
                        .querySelectorAll(".groupChats")
                        .forEach((element) => {
                          element.addEventListener("click", iconShareGroupChat);
                        });
                    }
                  }
                };
              });
            });
          }, 100);

          document
            .querySelector("#groupsDynamicModalCloseBtn")
            .addEventListener("click", () => {
              document.getElementById("groupsDynamicModal").style.transform =
                "scale(0)";
              document.getElementById("groupsDynamicModal").style.opacity = 0;
            });
        }

        userData.groups.slice(0, 3).map((item, i, arr) => {
          document.querySelector(".new_header_right_imgs").innerHTML += `
            <div class="smallgroupBox" data-group_id=${item.group_id}>
            <span class="tooltiptext">${
              item.group_name.length > 8
                ? `${item.group_name.slice(0, 8)}...`
                : `${item.group_name}`
            }</span>
            ${
              item.notifications != 0
                ? `<div class="countNum">${item.notifications}</div>`
                : ""
            }

                  <img src="${
                    item.group_image
                  }" class="smalluserIconDemo" data-receiverid="32">

            </div>
          `;
        });

        document.querySelectorAll(".smallgroupBox").forEach((ele) => {
          ele.addEventListener("click", iconShareGroupChat);
        });
      }
    }
  };
}
if (document.getElementById("msg_btn")) {
  document
    .getElementById("msg_btn")
    .addEventListener("click", redirectMessagePage);
}

function redirectMessagePage() {
  localStorage.setItem("openchatbox", "yeen");
  window.location.href = "messagebox.html";
}

if (document.getElementById("profile_btn")) {
  document
    .getElementById("profile_btn")
    .addEventListener("click", redirectProfilePage);
}

function redirectProfilePage() {
  window.location.reload();
  document.location.href = "popup.html";
}

if (document.getElementById("pipelines")) {
  document
    .getElementById("pipelines")
    .addEventListener("click", redirectToListingPage);
}

function redirectToListingPage() {
  localStorage.setItem("pipeLineClick", true);
  localStorage.setItem("loader_check", true);
  window.location.href = "popup.html";
}

if (document.getElementById("calender")) {
  document
    .getElementById("calender")
    .addEventListener("click", redirectCalenderPage);
}

function redirectCalenderPage() {
  window.location.href = "calender.html";
}

if (document.querySelector(".img__logo")) {
  document
    .querySelector(".img__logo")
    .addEventListener("click", redirectProfilePage);
}

function redirectProfilePage() {
  var clipper = localStorage.getItem("clipperpageCheck");
  var prospect = localStorage.getItem("prospect_id");
  if (clipper) {
    if (prospect) {
      window.location.href = "popup.html";
    }
  } else {
    window.location.href = "popup.html";
  }
}

function iconShareGroupChat(e) {
  var user_id = localStorage.getItem("user_id");
  var group_id = e.currentTarget.getAttribute("data-group_id");
  localStorage.setItem("group_id", group_id);

  const url = `${globalURl}/send_group_message`;

  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      user_id,
      group_id,
      text: "",
      shared: "yes",
    })
  );

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);
      localStorage.setItem("group_id", group_id);
      localStorage.setItem("shared", true);
      window.location.href = "messagebox.html";
    }
  };
}

if (document.getElementById("search_box")) {
  document.getElementById("search_box").addEventListener("click", () => {
    document.querySelector(".loaderContainer").style.display = "flex";
    document.querySelector(".tabs-row").style.display = "none";
    document.querySelector(".bottomContent").style.display = "none";
    document.getElementById("errorMessage").innerHTML = "";
    document.querySelector(".user-img-and-text").style.display = "none";

    setTimeout(() => {
      var user_id = localStorage.getItem("user_id");
      var second_user_id = localStorage.getItem("second_user_id");

      if (second_user_id == null) {
        second_user_id = 0;
      }

      const url = `${globalURl}/getAll/${user_id}/${second_user_id}`;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send();

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let arr = JSON.parse(xhr.responseText);

          if (arr != 200) {
            document.querySelector(".tabs-row").style.display = "block";
            document.querySelector(".bottomContent").style.display = "none";
            document.querySelector(".loaderContainer").style.display = "none";

            document.getElementById("getAll").innerHTML = "";

            arr != 200 &&
              arr.map(function (obj, key) {
                row =
                  `<div class="row m-0 tabs_two_main single_profile" id="` +
                  obj.id +
                  `">
              <div class="tabs_cols_two_main_1">
                <span class="left data_name">` +
                  obj.name +
                  `</span>
              </div>
              <div class="tabs_cols_two_main_1"
                       >
                <img src="` +
                  obj.image +
                  `" class="tabs_two_imgs">
                        </span>
                <span class="right"><i class="far fa-comment-alt comment_icon"></i></span>
              </div>
              <div class="tabs_cols_two_main_1">

                <span class="left">` +
                  obj.description +
                  `</span>

              </div>

              <div class="tabs_cols_two_main_1">


                <span class="left">` +
                  obj.company +
                  `</span>

              </div>
              <div class="tabs_cols_two_main_1"
                       >
                <span class="Address_msg">` +
                  obj.address +
                  `</span>
              </div>
                <div class="tabs_cols_two_main_1">
                  ${
                    obj.status === null
                      ? `<span style="color:#0e76a8 !important;" class="congrats_msg">LinkedIn Campaign</span>`
                      : ""
                  }
                  ${
                    obj.status === "LinkedIn Campaign"
                      ? `<span style="color:#0e76a8 !important;" class="congrats_msg">${obj.status}</span>`
                      : ""
                  }
                ${
                  obj.status === "Talking/Replied"
                    ? `<span style="color:#89CFF0 !important;" class="congrats_msg">${obj.status}</span>`
                    : ""
                }
                ${
                  obj.status === "Serious Conversations"
                    ? `<span style="color:#FFA500 !important;" class="congrats_msg">${obj.status}</span>`
                    : ""
                }
                ${
                  obj.status === "Discovery Call Scheduled"
                    ? `<span style="color:#FF0000 !important;" class="congrats_msg">${obj.status}</span>`
                    : ""
                }
                ${
                  obj.status === "Discovery Call Completed"
                    ? `<span style="color:#FFCB05 !important;" class="congrats_msg">${obj.status}</span>`
                    : ""
                }
                ${
                  obj.status === "Boom"
                    ? `<span style="color:#85bb65 !important;" class="congrats_msg">${obj.status}</span>`
                    : ""
                }
                ${
                  obj.status === "Lost"
                    ? `<span style="color:#808080 !important;" class="congrats_msg">${obj.status}</span>`
                    : ""
                }
              </div>
              <div class="tabs_cols_two_main_1"
                       >
                <span class="left">
                ${obj.follow_up !== null ? obj.follow_up : "No Date Added"}
              </span>
              </div>
            </div>`;
                document.getElementById("getAll").innerHTML += row;
              });

            var single_profile =
              document.getElementsByClassName("single_profile");
            for (var i = 0; i < single_profile.length; i++) {
              single_profile[i].addEventListener("click", getSinglePage, false);
            }
          } else {
            document.getElementById("getAll").innerHTML = "";
            document.getElementById("errorMessage").innerHTML = "";
            document.getElementById("errorMessage").innerHTML = `
            <div style="color: red; text-align: center;">
              No Records Found..
            </div>
            `;
          }
        }
      };
    }, 1000);
  });
}

function getSinglePage(e) {
  var user_id = this.getAttribute("id");
  const url = `${globalURl}/singlePage/` + user_id;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      res = xhr.responseText;
      if (res != "400") {
        res = JSON.parse(res);

        let params = {
          active: true,
          currentWindow: true,
        };
        chrome.tabs.query(params, gotTab);

        function gotTab(tabs) {
          let msg = {
            txt: res.user.profile_link,
          };
          chrome.tabs.sendMessage(tabs[0].id, msg);
        }
        localStorage.setItem("homeProspectData", JSON.stringify(res.user));
        window.location.href = "popup.html";
      }
    }
  };
}

if (document.getElementById("search_box")) {
  document
    .getElementById("search_box")
    .addEventListener("change", filterSearchProspect);
}

function filterSearchProspect(e) {
  ArrayMaker();
}

function ArrayMaker() {
  var user_id = localStorage.getItem("user_id");
  var second_user_id = localStorage.getItem("second_user_id");

  var search = document.getElementById("search_box").value;

  const url = `${globalURl}/filters`;

  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      filters: [{ field0: "and", field1: "status", field2: "=", field3: "" }],
      weekArray: [],
      view: "list",
      search,
      user_id,
      second_user_id,
    })
  );

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let arr = JSON.parse(xhr.responseText);

      document.getElementById("errorMessage").innerHTML = "";

      if (arr == 200) {
        document.getElementById("getAll").innerHTML = "";
        document.getElementById("errorMessage").innerHTML = "";
        document.getElementById("errorMessage").innerHTML = `
        <div style="color: red; text-align: center;">
          No Records Found..
        </div>
        `;
      } else {
        document.getElementById("getAll").innerHTML = "";

        arr != 200 &&
          arr.map(function (obj, key) {
            row =
              `<div class="row m-0 tabs_two_main single_profile" id="` +
              obj.id +
              `">
          <div class="tabs_cols_two_main_1">
            <span class="left data_name">` +
              obj.name +
              `</span>
          </div>
          <div class="tabs_cols_two_main_1"
               >
            <img src="` +
              obj.image +
              `" class="tabs_two_imgs">
                    </span>
            <span class="right"><i class="far fa-comment-alt comment_icon"></i></span>
          </div>
          <div class="tabs_cols_two_main_1">

            <span class="left">` +
              obj.description +
              `</span>

          </div>

          <div class="tabs_cols_two_main_1">


            <span class="left">` +
              obj.company +
              `</span>

          </div>
          <div class="tabs_cols_two_main_1"
               >
            <span class="Address_msg">` +
              obj.address +
              `</span>
          </div>
            <div class="tabs_cols_two_main_1">
              ${
                obj.status === null
                  ? `<span style="color:#0e76a8 !important;" class="congrats_msg">LinkedIn Campaign</span>`
                  : ""
              }
              ${
                obj.status === "LinkedIn Campaign"
                  ? `<span style="color:#0e76a8 !important;" class="congrats_msg">${obj.status}</span>`
                  : ""
              }
            ${
              obj.status === "Talking/Replied"
                ? `<span style="color:#89CFF0 !important;" class="congrats_msg">${obj.status}</span>`
                : ""
            }
            ${
              obj.status === "Serious Conversations"
                ? `<span style="color:#FFA500 !important;" class="congrats_msg">${obj.status}</span>`
                : ""
            }
            ${
              obj.status === "Discovery Call Scheduled"
                ? `<span style="color:#FF0000 !important;" class="congrats_msg">${obj.status}</span>`
                : ""
            }
            ${
              obj.status === "Discovery Call Completed"
                ? `<span style="color:#FFCB05 !important;" class="congrats_msg">${obj.status}</span>`
                : ""
            }
            ${
              obj.status === "Boom"
                ? `<span style="color:#85bb65 !important;" class="congrats_msg">${obj.status}</span>`
                : ""
            }
            ${
              obj.status === "Lost"
                ? `<span style="color:#808080 !important;" class="congrats_msg">${obj.status}</span>`
                : ""
            }
          </div>
          <div class="tabs_cols_two_main_1"
               >
            <span class="left">` +
              obj.follow_up +
              `</span>
          </div>
        </div>`;
            document.getElementById("getAll").innerHTML += row;
          });
      }
    }

    document.getElementById("getAll").style.display = "contents";

    var single_profile = document.getElementsByClassName("single_profile");
    for (var i = 0; i < single_profile.length; i++) {
      single_profile[i].addEventListener("click", getSinglePage, false);
    }
  };
}

if (document.querySelector(".HomeDiv")) {
  document.querySelector(".HomeDiv").addEventListener("click", () => {
    document.querySelector(".tabs-row").style.display = "none";
    document.querySelector(".bottomContent").style.display = "flex";
  });
}

if (document.getElementById("moreSpan")) {
  document.getElementById("moreSpan").addEventListener("click", (e) => {
    let innerVal = e.target.innerText;

    if (innerVal == "more") {
      document.getElementById("moreSpan").innerText = "...";
      document.querySelectorAll(".hidePipeParas").forEach((ele) => {
        ele.style.display = "block";
      });
      document.getElementById("moreSpan").style.top = "11rem";
      document.getElementById("moreSpan").style.left = "22.5rem";
      document.getElementById("moreSpan").style.fontSize = "16px";
    } else {
      document.getElementById("moreSpan").innerText = "more";
      document.querySelectorAll(".hidePipeParas").forEach((ele) => {
        ele.style.display = "none";
      });
      document.getElementById("moreSpan").style.top = "10.3rem";
      document.getElementById("moreSpan").style.left = "22rem";
      document.getElementById("moreSpan").style.fontSize = "12px";
    }
  });
}

if (document.getElementById("moreSpan1")) {
  document.getElementById("moreSpan1").addEventListener("click", (e) => {
    let innerVal = e.target.innerText;

    if (innerVal == "more") {
      document.getElementById("moreSpan1").innerText = "...";
      document.querySelector(".hidePipeParas1").style.display = "block";
      document.getElementById("moreSpan1").style.top = "24rem";
      document.getElementById("moreSpan1").style.left = "22.5rem";
      document.getElementById("moreSpan1").style.fontSize = "16px";
    } else {
      document.getElementById("moreSpan1").innerText = "more";
      document.querySelector(".hidePipeParas1").style.display = "none";
      document.getElementById("moreSpan1").style.top = "24rem";
      document.getElementById("moreSpan1").style.left = "22rem";
      document.getElementById("moreSpan1").style.fontSize = "12px";
    }
  });
}

if (document.getElementById("signoutDiv")) {
  document.getElementById("signoutDiv").addEventListener("click", () => {
    let bgData = JSON.parse(localStorage.getItem("bgData"));
    localStorage.clear();
    localStorage.setItem("bgData", JSON.stringify(bgData));
    window.close();
  });
}

if (document.getElementById("profilePic")) {
  document.getElementById("profilePic").addEventListener("click", () => {
    localStorage.setItem("OpenShowDataBase", true);
    window.location.href = "popup.html";
  });
}
if (document.getElementById("dashboard_open")) {
  document
    .getElementById("dashboard_open")
    .addEventListener("click", openprofile);
}

function openprofile() {
  console.log("here");
  var link = "https://extension-dashboard.vercel.app/index.html";
  var id = localStorage.getItem("user_id");
  var profilepic = localStorage.getItem("secondUserPic");
  var fname = localStorage.getItem("second_user_name");
  var username = localStorage.getItem("username");

  let params = {
    active: true,
    currentWindow: true,
  };
  chrome.tabs.query(params, gotTab);

  function gotTab(tabs) {
    let msg = {
      txt: link,
      temp: id,
      profilepic,
      fname,
      username,
    };
    chrome.tabs.sendMessage(tabs[0].id, msg);
  }
}

if (document.getElementById("loginBtn")) {
  document.getElementById("loginBtn").addEventListener("click", getLoginPage);
}
function getLoginPage() {
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

setTimeout(() => {
  user_id = localStorage.getItem("user_id");
  if (!user_id) {
    document.getElementById("profile_btn").style.display = "none";
    document.getElementById("loginBtn").style.display = null;
  }
});
