var profile_check = 0;

var globalArr = [];
var commentArray = [];
let x = 0;

var bgpage = {
  word: {
    loader: null,
  },
  loginId: null,
  msg: null,
};

// Test URL

const globalURl = "https://linkedin.thefastech.com";

// Test URL

// const globalURl = "http://192.168.10.17:80";

// Stable URL

// const globalURl = "https://linkedin.thefastech.com";

// Test URL

// const globalURl = "https://testlinkedin.thefastech.com";

setInterval(() => {
  chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    bgpage = msg;
    console.log(msg.word)

    if (bgpage.word?.name) {
      localStorage.setItem("bgData", JSON.stringify(bgpage.word));
      removeLoader();

      if (bgpage.loginId) {
        const url = `${globalURl}/login`;

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(
          JSON.stringify({
            id: bgpage.loginId,
          })
        );

        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
            let user = JSON.parse(xhr.responseText);

            if (user) {
              localStorage.removeItem("loginId");
              localStorage.setItem("access_token", user.access_token);
              localStorage.setItem("user_id", user.id);
              localStorage.setItem("username", user.username);
              localStorage.setItem("second_user_id", user.id);
              localStorage.setItem("second_user_name", user.name);
              localStorage.setItem("secondUserPic", user.image);

              localStorage.setItem("profilePic", user.image);
              window.location.reload();
            }
          }
        };
      }
    } else {
      addLoader();
    }

    sendResponse(1);
  });
}, 100);

function setup() {
  noCanvas();

  localStorage.removeItem("group_id");
  localStorage.removeItem("receiver_id");
  localStorage.removeItem("prospect_id");
  localStorage.removeItem("isProspectCollabClicked1");
  localStorage.removeItem("prospectCollabData1");
  localStorage.removeItem("prospect_id1");
  localStorage.removeItem("lists");
  localStorage.removeItem("comment_id");

  profile_check = 0;

  // var bgpage = chrome.extension.getBackgroundPage();

  let bgData = JSON.parse(localStorage.getItem("bgData"));

  let loginIdLocal = "";

  let x = setInterval(() => {
    if (localStorage.getItem("loginId")) {
      loginIdLocal = localStorage.getItem("loginId");
      clearInterval(x);
    }
  }, 100);

  if (loginIdLocal) {
    bgpage.loginId = loginIdLocal;
  }

  if (bgData) {
    bgpage.word = bgData;
  }

  var loginId = "";

  if (bgpage.loginId) {
    loginId = bgpage.loginId;
  }

  if (localStorage.getItem("profilePic")) {
    if (localStorage.getItem("secondUserPic")) {
      document.getElementById("profilePic").src =
        localStorage.getItem("secondUserPic");
    } else {
      document.getElementById("profilePic").src =
        localStorage.getItem("profilePic");
    }
  } else {
    document.getElementById("profilePic").src = "./Assets/img/user.png";
  }

  isImage = localStorage.getItem("profilePic");

  // var http = new XMLHttpRequest();

  // http.open('HEAD', isImage, false);
  // http.send();
  // console.log('htpptp',http)
  // if(http.statusText == "OK"){
  //   console.log('BRAH haha BRAH')
  // }else{
  //   localStorage.clear()
  //   console.log('yeenyeen',);
  // }

  var e = setInterval(() => {
    imageIS = localStorage.getItem("profilePic");
    if (imageIS) {
      var http = new XMLHttpRequest();
      http.open("HEAD", imageIS, false);
      http.send();
      console.log("yeen", http);
      if (http.status != 200) {
        localStorage.clear();
        console.log("User Image Damaged");
        window.location.reload();
      } else {
        console.log("User Image Correct");
      }
    }
    clearInterval(e);
  }, 4000);

  // var e = setInterval(() => {

  // var title = bgpage.word.title;
  // var name = bgpage.word.name;
  // var description = bgpage.word.description;
  // var address = bgpage.word.address;
  // var company = bgpage.word.company;
  // var about = bgpage.word.about;
  // var img = bgpage.word.img;
  // var profile_link = bgpage.word.profile_link;

  //   clearInterval(e)
  // },6000)
  // var xhr = new XMLHttpRequest();
  // xhr.open('GET',img,true);
  // xhr.responseType = 'blob';
  // xhr.onload = function(){
  //   var urlCreator = window.URL || window.webkitURL;
  //   var imageUrl = urlCreator.createObjectURL(this.response)
  //   console.log(imageUrl,"imageUrl")
  //   var tag = document.createElement('a');
  //   tag.href = imageUrl;
  //   tag.target = '_blank';
  //   tag.download = 'demo.png';
  //   document.body.appendChild(tag);
  // fetch('https://www.google.com/')
  // .then(response => response.json())
  // .then(data => console.log(data));
  //   // tag.click();
  //   document.body.removeChild(tag);
  //   // console.log(tag,'tag')

  // };
  // xhr.onerror = err => {
  //   alert('Yeen Failer')
  // }
  // xhr.send();

  //   const imageUrl = img;

  // (async () => {
  //   const response = await fetch(imageUrl)
  //   const imageBlob = await response.blob()
  //   const reader = new FileReader();
  //   reader.readAsDataURL(imageBlob);
  //   reader.onloadend = () => {
  //     const base64data = reader.result;
  //     var encodedString = btoa(base64data);
  //     var decodedString = atob(encodedString);
  //     img = decodedString;
  //     console.log(decodedString,'decoded');
  //   }
  // })()
  // console.log(img,'imgg')

  var prev = null;
  var access_token = localStorage.getItem("access_token");
  var username = localStorage.getItem("username");
  var user_id = localStorage.getItem("user_id");

  if (!localStorage.getItem("user_id")) {
    document.querySelector(".new-header-left-imgs").innerHTML = "";
    document.querySelector(".new_header_right_imgs").innerHTML = "";
    document.querySelector(".upperBackBtn").style.visibility = "hidden";
    document.querySelector(".upperMessageBtn").style.visibility = "hidden";
    document.querySelectorAll(".new-header-left-imgs").forEach((ele) => {
      ele.innerHTML = "";
    });
  } else {
    var user_id1 = localStorage.getItem("user_id");
    var secondary_id1 = localStorage.getItem("second_user_id");
    if (!secondary_id1) {
      var secondary_id1 = null;
    }
    if (secondary_id1 == user_id1) {
      secondary_id1 = null;
    }

    const url1 = `${globalURl}/getCommentsCount`;

    var xhr6 = new XMLHttpRequest();
    xhr6.open("POST", url1, true);
    xhr6.setRequestHeader("Content-Type", "application/json");
    xhr6.send(
      JSON.stringify({
        profile_link: bgpage.word?.profile_link,
        user_id: user_id1,
        secondary_id: secondary_id1,
      })
    );
    xhr6.onreadystatechange = function () {
      if (xhr6.readyState == 4 && xhr6.status == 200) {
        res = JSON.parse(xhr6.responseText);
        var count = res.count;
        if (count == 0) {
          document.getElementById("comment_count").style.display = "none";
        } else {
          document.getElementById("comment_count").style.display = "block";
          document.getElementById("comment_count").innerHTML = count;
        }
      }
    };

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
        let j = 4;
        let r = 4;
        document.querySelector(".new-header-left-imgs").innerHTML = "";
        document.querySelector(".new_header_right_imgs").innerHTML = "";
        document.querySelector(".new-header-left-img").innerHTML = ``;
        document.querySelector(".groupTopIcon").innerHTML = ``;

        if (userData.users) {
          userData.users.slice(0, 3).map((item, i, arr) => {
            var row =
              item.image != null
                ? `<span class="new-top-img" id="sharedm${count}">
          <input type="hidden" id="value${z}" value="${
                    item.linked_to_id
                  }"></input>
          <div class="iconMsgPicContainer">
          ${
            item.total_notifications != 0
              ? `<div class="countNum1">${item.total_notifications}</div>`
              : ""
          }

            <img class="new-header-item-img" src="${item.image}">
            <span class="tooltiptext">${item.username}</span>
            </div>
            </span>`
                : "";

            var row_second =
              item.image != null
                ? `<span class="new-top-img" id="sharedm${r}">
            <input type="hidden" id="value${j}" value="${
                    item.linked_to_id
                  }"></input>
            <div class="iconMsgPicContainer">
            ${
              item.total_notifications != 0
                ? `<div class="countNum1">${item.total_notifications}</div>`
                : ""
            }
              <img class="new-header-item-img" src="${item.image}">
              <span class="tooltiptext">${item.username}</span>
              </div>
              </span>`
                : "";

            document
              .querySelectorAll(".new-header-left-imgs")
              .forEach((chats) => {
                chats.innerHTML += row;
              });
            document
              .querySelectorAll(".new-header-left-img")
              .forEach((chats) => {
                chats.innerHTML += row_second;
              });
            style = style + 35;
            count = count + 1;
            z = z + 1;
            j = j + 1;
            r = r + 1;
          });

          if (userData.users.length > 3) {
            document.querySelector(
              ".new-header-left-imgs"
            ).innerHTML += `<span class='showMembersAll'><i class="fas fa-eye"></i></span>`;

            document.querySelector(
              ".new-header-left-img"
            ).innerHTML += `<span class='showMembersAll'><i class="fas fa-eye"></i></span>`;

            document.querySelectorAll(".showMembersAll").forEach((ele) => {
              ele.addEventListener("click", () => {
                document.querySelector(".membersContainer").innerHTML = "";

                document.getElementById("membersDynamicModal").style.transform =
                  "scale(1)";
                document.getElementById(
                  "membersDynamicModal"
                ).style.opacity = 1;

                document.getElementById("membersDynamicModalH1").innerText =
                  "Chat Members";

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
                document.getElementById(
                  "membersDynamicModal"
                ).style.opacity = 0;
              });
          }
        }
        if (userData.groups != 200) {
          if (userData.groups) {
            if (userData.groups.length > 3) {
              document
                .querySelectorAll(".new_header_right_imgs")
                .forEach((ele) => {
                  ele.innerHTML = `<span class='showGroupsAll'><i class="fas fa-eye"></i></span>`;
                });

              setTimeout(() => {
                document.querySelectorAll(".showGroupsAll").forEach((ele) => {
                  ele.addEventListener("click", () => {
                    document.querySelector(".groupDynamicContainer").innerHTML =
                      "";

                    document.getElementById(
                      "groupsDynamicModal"
                    ).style.transform = "scale(1)";
                    document.getElementById(
                      "groupsDynamicModal"
                    ).style.opacity = 1;

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
                              <div style="position: relative;width: calc(30% - 20px); margin: auto 15px;">
                              <div class="groupBox groupChats" data-group_id=${
                                item.group_id
                              }>
                                ${
                                  item.image
                                    ? `<img src="${item.image}" class="userIconDemo" data-receiverid="32">`
                                    : `<img src="./Assets/img/group-bg.png" class="userIconDemo" data-receiverid="32">`
                                }


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
                                "
                                >${item.name}</div>
                              </div>
                            `;
                          });

                          document
                            .querySelectorAll(".groupChats")
                            .forEach((element) => {
                              element.addEventListener(
                                "click",
                                iconShareGroupChat
                              );
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
                  document.getElementById(
                    "groupsDynamicModal"
                  ).style.transform = "scale(0)";
                  document.getElementById(
                    "groupsDynamicModal"
                  ).style.opacity = 0;
                });
            }

            userData.groups.slice(0, 3).map((item, i, arr) => {
              document
                .querySelectorAll(".new_header_right_imgs")
                .forEach((chats1) => {
                  chats1.innerHTML += `
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
            });
          }

          document.querySelectorAll(".smallgroupBox").forEach((ele) => {
            ele.addEventListener("click", iconShareGroupChat);
          });

          // var row = item.group_id != null ?`<span class="new-top-img group_top_icon" data-group_id=${item.group_id}><img class="new-header-item-img" src="./Assets/img/actress.jpg"></span>`: "";
          // document.querySelector(".new_header_right_imgs").innerHTML += row;
        }
      }

      document.querySelector(".upperBackBtn").style.visibility = "visible";
      document.querySelector(".upperMessageBtn").style.display = "visible";
    };
  }

  // var user = apiCall('https://linkedin.thefastech.com/access_token/'+access_token);
  if (access_token && username) {
    if (document.getElementById("loginBtn")) {
      document.getElementById("loginBtn").style.display = "none";
      document.getElementById("star__delete__icon").style.display = "none";
      document.getElementById("yeen").style.display = "block";
    }
    if (document.getElementById("profilePic")) {
      document.getElementById("profilePic").style.display = "block";
    }
    if (document.getElementById("username")) {
      var trimmed_username = username.substring(0, 20);
      document.getElementById("username").innerText =
        "Welcome, " + trimmed_username;
    }
  } else {
    document.getElementById("loginBtn").style.display = "block";
    document.getElementById("savedUserMessage").style.display = "none";
  }

  if (bgpage.word.loader == "loader") {
    addLoader();
    var j = setTimeout(function () {
      // var bgpage = chrome.extension.getBackgroundPage();
      var profile_link = bgpage.word.profile_link;

      var user_id = localStorage.getItem("user_id");
      var second_user_id = localStorage.getItem("second_user_id");

      if (second_user_id != null) {
        user_id = second_user_id;
      }

      if (user_id) {
        const url = `${globalURl}/alreadyStored`;

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(
          JSON.stringify({
            id: bgpage.word?.profile_link,
            user_id: user_id,
          })
        );

        xhr.onreadystatechange = function () {
          //Call a function when the state changes.
          if (xhr.readyState == 4 && xhr.status == 200) {
            res = JSON.parse(xhr.responseText);
            if (xhr.responseText != "400") {
              profile_check = 500;
              // document.getElementById('alreadyStored').innerText = 'Already Stored';
              prev = res.data;
              console.log("hey im here");

              var user_id = localStorage.getItem("user_id");
              var secondary_id = localStorage.getItem("second_user_id");
              if (!secondary_id) {
                var secondary_id = null;
              }
              if (secondary_id == user_id) {
                secondary_id = null;
              }
              var profile_link = bgpage.word.profile_link;
              const url = `${globalURl}/getCommentsCount`;

              var xhr4 = new XMLHttpRequest();
              xhr4.open("POST", url, true);
              xhr4.setRequestHeader("Content-Type", "application/json");
              xhr4.send(
                JSON.stringify({
                  profile_link: profile_link,
                  user_id: user_id,
                  secondary_id: secondary_id,
                })
              );
              xhr4.onreadystatechange = function () {
                if (xhr4.readyState == 4 && xhr4.status == 200) {
                  res = JSON.parse(xhr4.responseText);
                  var count = res.count;
                  if (count == 0) {
                    document.getElementById("comment_count").style.display =
                      "none";
                  } else {
                    document.getElementById("comment_count").style.display =
                      "block";
                    document.getElementById("comment_count").innerHTML = count;
                  }
                }
              };

              console.log("here i am");

              try {
                prev.image = bgpage.word.img;
                imageprofileInterval = setTimeout(() => {
                  eventSave();
                  clearInterval(imageprofileInterval);
                }, 6000);
              } catch (err) {
                prev.image = bgpage.word.img;
                imageprofileInterval = setTimeout(() => {
                  eventSave();
                  clearInterval(imageprofileInterval);
                }, 6000);
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
              var deleteIcon = document.getElementById("star__delete__icon");
              deleteIcon.src = "Assets/img/star-yellow.png";

              document.getElementById("star__delete__icon").style.display =
                "block";
              document.getElementById("yeen").style.display = "none";

              document.getElementById("topTitleName").innerText = prev.name;
              document.getElementById("fname").value = prev.name;
              document.getElementById("description").value = prev.description;
              document.getElementById("company").value = prev.company;
              document.getElementById("about").value = prev.about;

              document.getElementById("notes").innerHTML = prev.messages;
              document.getElementById("client_messages").value = prev.notes;

              document.getElementById("strategy_date").value =
                prev.strategy_date;

              if (document.getElementById(prev.status)) {
                document.getElementById(prev.status).selected = true;
                var status_tag = document.getElementById("status");
                status_tag = status_tag[status_tag.selectedIndex].style.color;
                document.getElementById("status_color").style.backgroundColor =
                  status_tag;
              }

              document.getElementById("profile_link").innerText =
                prev.profile_link;

              if (prev.discovery_call) {
                var dbDateDiscovery = prev.discovery_call;
                var dateDiscovery = new Date(dbDateDiscovery);
                var formattedDateDiscovery = dateDiscovery
                  .toISOString()
                  .slice(0, 10);
                document.getElementById("discovery_call").value =
                  formattedDateDiscovery;
              }

              var dbDateUpdated = prev.updated_at;

              var dateUpdated = new Date(dbDateUpdated);

              var formattedDateUpdated = dateUpdated.toISOString().slice(0, 10);

              document.getElementById("updated_at").value =
                formattedDateUpdated;

              if (prev.endorsement == "Yes") {
                document.getElementById("endorsement_yes").checked = true;
              } else if (prev.endorsement == "No") {
                document.getElementById("endorsement_no").checked = true;
              }

              if (prev.priority == "A") {
                document.getElementById("priority_a").checked = true;
              } else if (prev.priority == "B") {
                document.getElementById("priority_b").checked = true;
              } else if (prev.priority == "C") {
                document.getElementById("priority_c").checked = true;
              } else if (prev.priority == "D") {
                document.getElementById("priority_d").checked = true;
              }

              document.getElementById("total_messages").value =
                prev.total_messages;
              document.getElementById("follow_up").value = prev.follow_up;
              document.getElementById("conversion").value = prev.conversion;
              document.getElementById("weekly_date").value = prev.weekly_date;
              localStorage.setItem("prospect_id", prev.id);

              var today = new Date(prev.weekly_date);
              var today = today.toISOString().substring(0, 10);
              document.getElementById("weekly_date").value = today;
              document.getElementById("weekly_date").max = today;
              var weekly_source = today;
              var options = {
                month: "short",
              };
              var options_year = {
                year: "2-digit",
              };
              var today = new Date(weekly_source);

              //init date
              var date = new Date(weekly_source);

              document.getElementById("week_number").innerHTML =
                getWeekOfMonth(date);
              document.getElementById("week_number").innerHTML =
                "Week - Month" +
                ' <i class="far fa-calendar-alt clender_icons"></i>';

              document.getElementById("weekly_source").value =
                today.toLocaleDateString("en-US", options) +
                " Week " +
                getWeekOfMonth(date) +
                " -" +
                today.toLocaleDateString("en-US", options_year);
            } else {
              document.getElementById("star__delete__icon").style.display =
                "block";
              document.getElementById("yeen").style.display = "none";

              var user_id = localStorage.getItem("user_id");
              var secondary_id = localStorage.getItem("second_user_id");
              if (!secondary_id) {
                var secondary_id = null;
              }
              if (secondary_id == user_id) {
                secondary_id = null;
              }
              var profile_link = bgpage.word.profile_link;
              const url = `${globalURl}/getCommentsCount`;

              var xhr4 = new XMLHttpRequest();
              xhr4.open("POST", url, true);
              xhr4.setRequestHeader("Content-Type", "application/json");
              xhr4.send(
                JSON.stringify({
                  profile_link: profile_link,
                  user_id: user_id,
                  secondary_id: secondary_id,
                })
              );
              xhr4.onreadystatechange = function () {
                if (xhr4.readyState == 4 && xhr4.status == 200) {
                  res = JSON.parse(xhr4.responseText);
                  var count = res.count;
                  if (count == 0) {
                    document.getElementById("comment_count").style.display =
                      "none";
                  } else {
                    document.getElementById("comment_count").style.display =
                      "block";
                    document.getElementById("comment_count").innerHTML = count;
                  }
                }
              };

              var starIcon = document.getElementById("star__delete__icon");
              starIcon.src = "Assets/img/star-black.png";
              name = localStorage.getItem("second_user_name");
              if (name != "null" && name != "") {
                document.getElementById(
                  "savedUserMessage"
                ).innerText = `You're in ${name}'s Database`;
              } else {
                document.getElementById("savedUserMessage").innerText =
                  "Records from Database";
              } // document.getElementById("yeen").innerHTML = `<i class="fa fa-spinner fa-spin"></i>`;
            }
          }
        };

        removeLoader();
        clearInterval(j);
        var today = new Date();
        var today = today.toISOString().substring(0, 10);
        document.getElementById("weekly_date").value = today;
        document.getElementById("weekly_date").max = today;
        var weekly_source = today;
        var options = {
          month: "short",
        };
        var options_year = {
          year: "2-digit",
        };
        var today = new Date(weekly_source);

        // init date
        var date = new Date(weekly_source);

        // document.getElementById("week_number").innerHTML =(getWeekOfMonth(date));
        document.getElementById("week_number").innerHTML =
          "Week - Month" + ' <i class="far fa-calendar-alt clender_icons"></i>';

        document.getElementById("weekly_source").value =
          today.toLocaleDateString("en-US", options) +
          " Week " +
          getWeekOfMonth(date) +
          " -" +
          today.toLocaleDateString("en-US", options_year);
      }
    }, 7000);
  } else {
    localStorage.removeItem("clipperpageCheck", true);

    document.getElementById("star__delete__icon").style.display = "none";
    document.getElementById("yeen").style.display = "block";
    var user_id = localStorage.getItem("user_id");

    var second_user_id = localStorage.getItem("second_user_id");

    if (second_user_id != null) {
      user_id = second_user_id;
    }

    if (user_id) {
      const url = `${globalURl}/alreadyStored`;

      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          id: bgpage.word?.profile_link,
          user_id: user_id,
        })
      );

      xhr.onreadystatechange = function () {
        //Call a function when the state changes.
        if (xhr.readyState == 4 && xhr.status == 200) {
          res = JSON.parse(xhr.responseText);

          if (xhr.responseText != "400") {
            profile_check = 500;

            prev = res.data;

            name = localStorage.getItem("second_user_name");
            if (name != "null" && name != "") {
              document.getElementById(
                "savedUserMessage"
              ).innerText = `You're in ${name}'s Database`;
            } else {
              document.getElementById("savedUserMessage").innerText =
                "Records from Database";
            }

            var user_id = localStorage.getItem("user_id");
            var secondary_id = localStorage.getItem("second_user_id");
            if (!secondary_id) {
              var secondary_id = null;
            }
            if (secondary_id == user_id) {
              secondary_id = null;
            }
            var profile_link = bgpage.word.profile_link;
            const url = `${globalURl}/getCommentsCount`;

            var xhr5 = new XMLHttpRequest();
            xhr5.open("POST", url, true);
            xhr5.setRequestHeader("Content-Type", "application/json");
            xhr5.send(
              JSON.stringify({
                profile_link: profile_link,
                user_id: user_id,
                secondary_id: secondary_id,
              })
            );
            xhr5.onreadystatechange = function () {
              if (xhr5.readyState == 4 && xhr5.status == 200) {
                res = JSON.parse(xhr5.responseText);
                var count = res.count;
                if (count == 0) {
                  document.getElementById("comment_count").style.display =
                    "none";
                } else {
                  document.getElementById("comment_count").style.display =
                    "block";
                  document.getElementById("comment_count").innerHTML = count;
                }
              }
            };

            localStorage.setItem("prospect_id", prev.id);

            document.getElementById("star__delete__icon").style.display =
              "block";
            document.getElementById("yeen").style.display = "none";
            var deleteIcon = document.getElementById("star__delete__icon");
            deleteIcon.src = "Assets/img/star-yellow.png";

            console.log("here i am");

            try {
              console.log("http", http);

              prev.image = bgpage.word.img;
              imageprofileInterval = setTimeout(() => {
                eventSave();
                clearInterval(imageprofileInterval);
              }, 4000);
            } catch (err) {
              prev.image = bgpage.word.img;
              imageprofileInterval = setTimeout(() => {
                eventSave();
                clearInterval(imageprofileInterval);
              }, 6000);
            }

            document.getElementById("image").src = prev.image;
            document.getElementById("topTitleName").innerText = prev.name;
            document.getElementById("fname").value = prev.name;
            document.getElementById("description").value = prev.description;
            document.getElementById("company").value = prev.company;
            document.getElementById("about").value = prev.about;

            document.getElementById("notes").innerHTML = prev.messages;
            document.getElementById("client_messages").value = prev.notes;

            document.getElementById("strategy_date").value = prev.strategy_date;

            if (document.getElementById(prev.status)) {
              document.getElementById(prev.status).selected = true;
              var status_tag = document.getElementById("status");
              status_tag = status_tag[status_tag.selectedIndex].style.color;
              document.getElementById("status_color").style.backgroundColor =
                status_tag;
              // alert(status_tag);
              // document.getElementById('statusbg').style.backgroundColor = status_tag;
            }

            document.getElementById("profile_link").innerText =
              prev.profile_link;

            if (prev.discovery_call) {
              var dbDateDiscovery = prev.discovery_call;
              var dateDiscovery = new Date(dbDateDiscovery);
              var formattedDateDiscovery = dateDiscovery
                .toISOString()
                .slice(0, 10);
              document.getElementById("discovery_call").value =
                formattedDateDiscovery;
            }

            var dbDateUpdated = prev.updated_at;

            var dateUpdated = new Date(dbDateUpdated);

            var formattedDateUpdated = dateUpdated.toISOString().slice(0, 10);

            document.getElementById("updated_at").value = formattedDateUpdated;

            if (prev.endorsement == "Yes") {
              document.getElementById("endorsement_yes").checked = true;
            } else if (prev.endorsement == "No") {
              document.getElementById("endorsement_no").checked = true;
            }

            if (prev.priority == "A") {
              document.getElementById("priority_a").checked = true;
            } else if (prev.priority == "B") {
              document.getElementById("priority_b").checked = true;
            } else if (prev.priority == "C") {
              document.getElementById("priority_c").checked = true;
            } else if (prev.priority == "D") {
              document.getElementById("priority_d").checked = true;
            }

            document.getElementById("total_messages").value =
              prev.total_messages;
            document.getElementById("follow_up").value = prev.follow_up;
            document.getElementById("conversion").value = prev.conversion;
            // alert(prev.weekly_date);
            var today = new Date();
            var today = today.toISOString().substring(0, 10);

            document.getElementById("weekly_date").value = prev.weekly_date;
            document.getElementById("weekly_date").max = today;

            var today = new Date(prev.weekly_date);
            var today = today.toISOString().substring(0, 10);
            document.getElementById("weekly_date").value = today;
            document.getElementById("weekly_date").max = today;
            var weekly_source = today;
            var options = {
              month: "short",
            };
            var options_year = {
              year: "2-digit",
            };
            var today = new Date(weekly_source);

            //init date
            var date = new Date(weekly_source);

            document.getElementById("week_number").innerHTML =
              getWeekOfMonth(date);
            document.getElementById("week_number").innerHTML =
              "Week - Month" +
              ' <i class="far fa-calendar-alt clender_icons"></i>';

            document.getElementById("weekly_source").value =
              today.toLocaleDateString("en-US", options) +
              " Week " +
              getWeekOfMonth(date) +
              " -" +
              today.toLocaleDateString("en-US", options_year);
          } else {
            var today = new Date();
            var today = today.toISOString().substring(0, 10);

            document.getElementById("weekly_date").value = today;
            document.getElementById("weekly_date").max = today;

            var user_id = localStorage.getItem("user_id");
            var secondary_id = localStorage.getItem("second_user_id");
            if (!secondary_id) {
              var secondary_id = null;
            }
            if (secondary_id == user_id) {
              secondary_id = null;
            }
            var profile_link = bgpage.word.profile_link;
            const url = `${globalURl}/getCommentsCount`;

            var xhr5 = new XMLHttpRequest();
            xhr5.open("POST", url, true);
            xhr5.setRequestHeader("Content-Type", "application/json");
            xhr5.send(
              JSON.stringify({
                profile_link: profile_link,
                user_id: user_id,
                secondary_id: secondary_id,
              })
            );
            xhr5.onreadystatechange = function () {
              if (xhr5.readyState == 4 && xhr5.status == 200) {
                res = JSON.parse(xhr5.responseText);
                var count = res.count;
                if (count == 0) {
                  document.getElementById("comment_count").style.display =
                    "none";
                } else {
                  document.getElementById("comment_count").style.display =
                    "block";
                  document.getElementById("comment_count").innerHTML = count;
                }
              }
            };

            document.getElementById("star__delete__icon").style.display =
              "block";
            document.getElementById("yeen").style.display = "none";
            var starIcon = document.getElementById("star__delete__icon");
            starIcon.src = "Assets/img/star-black.png";
            // document.getElementById("yeen").innerHTML = `<img class="new_img_main_icon" id="star__delete__icon" src="Assets/img/star-black.png"
            // height="18px;" width="18px;">`;
            name = localStorage.getItem("second_user_name");
            if (name != "null" && name != "") {
              document.getElementById(
                "savedUserMessage"
              ).innerText = `You're in ${name}'s Database`;
            } else {
              document.getElementById("savedUserMessage").innerText =
                "Records from Database";
            }
          }
        }
      };
      var today = new Date();
      var today = today.toISOString().substring(0, 10);
      // document.getElementById("discovery_call").value = today;
      document.getElementById("weekly_date").value = today;
      document.getElementById("weekly_date").max = today;
      var weekly_source = today;
      var options = {
        month: "short",
      };
      var options_year = {
        year: "2-digit",
      };
      var today = new Date(weekly_source);

      // init date
      var date = new Date(weekly_source);

      // document.getElementById("week_number").innerHTML =(getWeekOfMonth(date));
      document.getElementById("week_number").innerHTML =
        "Week - Month" + ' <i class="far fa-calendar-alt clender_icons"></i>';

      document.getElementById("weekly_source").value =
        today.toLocaleDateString("en-US", options) +
        " Week " +
        getWeekOfMonth(date) +
        " -" +
        today.toLocaleDateString("en-US", options_year);

      removeLoader();
    }
  }
}

(function () {
  let isImageClicked = localStorage.getItem("isImageClicked");
  var modalProspectId = localStorage.getItem("modalProspectId");
  var modalProspectLink = localStorage.getItem("modalProspectLink");
  var prospectData = JSON.parse(localStorage.getItem("prospectData"));

  if (
    isImageClicked != null &&
    modalProspectId != null &&
    modalProspectLink != null
  ) {
    localStorage.removeItem("isImageClicked");
    localStorage.removeItem("modalProspectId");
    localStorage.removeItem("modalProspectLink");
    localStorage.removeItem("prospectData");

    bgpage.word = prospectData;

    profile_check = 500;

    let imageInterval = setInterval(() => {
      if (document.getElementById("image")) {
        document
          .getElementById("image")
          .setAttribute("src", prospectData.image);
        setTimeout(() => {
          clearInterval(imageInterval);
        }, 1000);
      }
    }, 500);
  }
})();

(function () {
  let isProspectCollabClicked = localStorage.getItem("isProspectCollabClicked");
  var prospectCollabData = JSON.parse(
    localStorage.getItem("prospectCollabData")
  );

  if (isProspectCollabClicked != null && prospectCollabData != null) {
    localStorage.removeItem("isProspectCollabClicked");
    localStorage.removeItem("prospectCollabData");

    bgpage.word = prospectCollabData;

    profile_check = 500;

    let imageInterval1 = setInterval(() => {
      if (document.getElementById("image")) {
        document
          .getElementById("image")
          .setAttribute("src", prospectCollabData.image);
        setTimeout(() => {
          clearInterval(imageInterval1);
        }, 1000);
      }
    }, 500);
  }
})();

(function () {
  var prospectCollabData = JSON.parse(localStorage.getItem("homeProspectData"));

  if (prospectCollabData != null) {
    localStorage.removeItem("homeProspectData");

    bgpage.word = prospectCollabData;

    profile_check = 500;

    let imageInterval1 = setInterval(() => {
      if (document.getElementById("image")) {
        document
          .getElementById("image")
          .setAttribute("src", prospectCollabData.image);
        setTimeout(() => {
          clearInterval(imageInterval1);
        }, 1000);
      }
    }, 500);
  }
})();

setInterval(() => {
  if (profile_check < 100) {
    let bgData = JSON.parse(localStorage.getItem("bgData"));

    if (bgData) {
      document.getElementById("results").style.display = "block";

      bgpage.word = bgData;

      let name = bgpage.word.name;
      let description = bgpage.word.description;
      let address = bgpage.word.address;
      let company = bgpage.word.company;
      let about = bgpage.word.about;
      let img = bgpage.word.img;
      let profile_link = bgpage.word.profile_link;
      let pipelineCheck = localStorage.getItem("pipeLineClick");

      if (pipelineCheck) {
        getAll();
        localStorage.removeItem("pipeLineClick");
      }

      if (!localStorage.getItem("user_id")) {
        document.querySelector(".upperBackBtn").style.visibility = "hidden";
        document.querySelector(".upperMessageBtn").style.visibility = "hidden";
      } else {
        document.querySelector(".upperBackBtn").style.visibility = "visible";
        document.querySelector(".upperMessageBtn").style.display = "visible";
      }
      document.getElementById("topTitleName").innerText = name;
      document.getElementById("fname").value = name;
      document.getElementById("description").value = description;
      document.getElementById("address").value = address;
      document.getElementById("company").value = company;
      document.getElementById("about").value = about;
      var copy_link = profile_link;

      document.getElementById("profile_link").innerText = copy_link;
      let image = document.getElementById("image");
      image.src = img;

      var status_tag = document.getElementById("status");
      status_tag = status_tag[status_tag.selectedIndex].style.color;
      document.getElementById("status_color").style.backgroundColor =
        status_tag;
    }
  }
}, 200);

(function () {
  var pipe = localStorage.getItem("pipeLineClick");
  setTimeout(() => {
    if (pipe) {
      localStorage.removeItem("pipeLineClick");
      document.querySelector(
        ".new-header-left-img"
      ).innerHTML = `<div class="loaderIcons"></div>
      `;
      document.querySelector(
        ".groupTopIcon"
      ).innerHTML = `<div class="loaderIcons" style="margin-right: 15px"></div>`;

      document.getElementById("results").style.display = "none";
      document.getElementById("list_table_view").style.display = "block";
      getAll();

      prev = bgpage.word;

      var user_id = localStorage.getItem("user_id");
      var secondary_id = localStorage.getItem("second_user_id");
      if (!secondary_id) {
        var secondary_id = null;
      }
      if (secondary_id == user_id) {
        secondary_id = null;
      }
      var profile_link = bgpage.word.profile_link;
      const url = `${globalURl}/getCommentsCount`;

      var xhr4 = new XMLHttpRequest();
      xhr4.open("POST", url, true);
      xhr4.setRequestHeader("Content-Type", "application/json");
      xhr4.send(
        JSON.stringify({
          profile_link: profile_link,
          user_id: user_id,
          secondary_id: secondary_id,
        })
      );
      xhr4.onreadystatechange = function () {
        if (xhr4.readyState == 4 && xhr4.status == 200) {
          res = JSON.parse(xhr4.responseText);
          var count = res.count;
          if (count == 0) {
            document.getElementById("comment_count").style.display = "none";
          } else {
            document.getElementById("comment_count").style.display = "block";
            document.getElementById("comment_count").innerHTML = count;
          }
        }
      };

      document.getElementById("topTitleName").innerText = prev.name;
      document.getElementById("fname").value = prev.name;
      document.getElementById("description").value = prev.description;
      document.getElementById("company").value = prev.company;
      document.getElementById("about").value = prev.about;

      var http = new XMLHttpRequest();

      var http = new XMLHttpRequest();

      http.open("HEAD", prev.image, false);
      http.send();
      w = document.getElementById("image");
      if (http.status != 200 || w.src.includes("user.png")) {
        prev.image = bgpage.word.img;
        imageprofilesecondInterval = setTimeout(() => {
          eventSave();
          clearInterval(imageprofilesecondInterval);
        }, 6000);
      } else {
      }
      document.getElementById("image").src = prev.img;

      document.getElementById("profile_link").innerText = prev.profile_link;

      document.getElementById("endorsement_yes").checked = true;

      document.getElementById("priority_a").checked = true;

      localStorage.setItem("prospect_id", prev.id);
    }
  }, 1);
})();

//////////////////// Event Listeners /////////////////////////////

if (document.getElementById("main__logo")) {
  document
    .getElementById("main__logo")
    .addEventListener("click", imgPageChange);
}

if (document.getElementById("shareLogo")) {
  document.getElementById("shareLogo").addEventListener("click", shareBackPage);
}

var groupInterval = setInterval(() => {
  if (document.querySelector(".group_top_icon")) {
    clearInterval(groupInterval);
    document.querySelectorAll(".group_top_icon").forEach((ele) => {
      ele.addEventListener("click", iconShareGroupChat);
    });
  }
}, 500);

if (document.getElementById("star__delete__icon")) {
  document
    .getElementById("star__delete__icon")
    .addEventListener("click", starDeleteProspect);
}

if (document.getElementById("request")) {
  document.getElementById("request").addEventListener("click", getRequest);
}
if (document.getElementById("view_profile")) {
  document.getElementById("view_profile").addEventListener("click", getProfile);
}
if (document.getElementById("view_all")) {
  document.getElementById("view_all").addEventListener("click", getAll);
}
if (document.getElementById("view_all_1")) {
  document.getElementById("view_all_1").addEventListener("click", getAll);
}
if (document.getElementById("go_back")) {
  document.getElementById("go_back").addEventListener("click", getProfile);
}
if (document.getElementById("loginBtn")) {
  document.getElementById("loginBtn").addEventListener("click", getLoginPage);
}

if (document.getElementById("logout")) {
  document.getElementById("logout").addEventListener("click", logout);
}
if (document.getElementById("logout1")) {
  document.getElementById("logout1").addEventListener("click", logout);
}
if (document.getElementById("admin_home")) {
  document.getElementById("admin_home").addEventListener("click", adminHome);
}
if (document.getElementById("users_listing")) {
  document
    .getElementById("users_listing")
    .addEventListener("click", usersListing);
}
if (document.getElementById("view_categories")) {
  document
    .getElementById("view_categories")
    .addEventListener("click", viewCategories);
}
if (document.getElementById("add_category")) {
  document
    .getElementById("add_category")
    .addEventListener("click", addCategory);
}
if (document.getElementById("category_submit")) {
  document
    .getElementById("category_submit")
    .addEventListener("click", categorySubmit);
}

/// Filters
if (document.getElementById("status_filter")) {
  document
    .getElementById("status_filter")
    .addEventListener("change", weekFilterChange);
}
if (document.getElementById("weekly_filter")) {
  document
    .getElementById("weekly_filter")
    .addEventListener("change", weekFilterChange);
}
if (document.getElementById("priority_filter")) {
  document
    .getElementById("priority_filter")
    .addEventListener("change", weekFilterChange);
}
if (document.getElementById("follow_up_filter")) {
  document
    .getElementById("follow_up_filter")
    .addEventListener("change", weekFilterChange);
}
if (document.getElementById("discovery_filter")) {
  document
    .getElementById("discovery_filter")
    .addEventListener("change", weekFilterChange);
}
if (document.getElementById("view_type")) {
  document
    .getElementById("view_type")
    .addEventListener("change", weekFilterChange);
}
if (document.getElementById("search_box")) {
  document
    .getElementById("search_box")
    .addEventListener("change", searchProspects);
}
/// Filters End ////

if (document.getElementById("weekly_date")) {
  document.getElementById("weekly_date").addEventListener("change", weekChange);
}
if (document.getElementById("client_messages")) {
  document
    .getElementById("client_messages")
    .addEventListener("input", eventSave);
}
if (document.getElementById("notes")) {
  document.getElementById("notes").addEventListener("input", eventSave);
}
if (document.getElementById("status")) {
  document.getElementById("status").addEventListener("change", statusEventSave);
}

if (document.getElementById("fname")) {
  document.getElementById("fname").addEventListener("keyup", eventSave);
}

if (document.getElementById("description")) {
  document.getElementById("description").addEventListener("keyup", eventSave);
}

if (document.getElementById("company")) {
  document.getElementById("company").addEventListener("keyup", eventSave);
}

if (document.getElementById("about")) {
  document.getElementById("about").addEventListener("keyup", eventSave);
}

if (document.getElementById("follow_up")) {
  document.getElementById("follow_up").addEventListener("change", eventSave);
}
if (document.getElementById("discovery_call")) {
  document
    .getElementById("discovery_call")
    .addEventListener("change", eventSave);
}
if (document.getElementById("strategy_date")) {
  document
    .getElementById("strategy_date")
    .addEventListener("change", eventSave);
}
if (document.getElementById("updated_at")) {
  document.getElementById("updated_at").addEventListener("change", eventSave);
}
if (document.getElementById("conversion")) {
  document.getElementById("conversion").addEventListener("change", eventSave);
}
if (document.getElementById("total_messages")) {
  document
    .getElementById("total_messages")
    .addEventListener("change", eventSave);
}
if (document.getElementById("endorsement_yes")) {
  document
    .getElementById("endorsement_yes")
    .addEventListener("change", eventSave);
}
if (document.getElementById("endorsement_no")) {
  document
    .getElementById("endorsement_no")
    .addEventListener("change", eventSave);
}
if (document.getElementById("priority_a")) {
  document.getElementById("priority_a").addEventListener("change", eventSave);
}
if (document.getElementById("priority_b")) {
  document.getElementById("priority_b").addEventListener("change", eventSave);
}
if (document.getElementById("priority_c")) {
  document.getElementById("priority_c").addEventListener("change", eventSave);
}
if (document.getElementById("priority_d")) {
  document.getElementById("priority_d").addEventListener("change", eventSave);
}
if (document.getElementById("about")) {
  document.getElementById("about").addEventListener("keyup", aboutEventSave);
}
if (document.getElementById("show_filters")) {
  document
    .getElementById("show_filters")
    .addEventListener("click", showFilters);
}
if (document.getElementById("share")) {
  document.getElementById("share").addEventListener("click", share);
}
if (document.getElementById("share_submit")) {
  document
    .getElementById("share_submit")
    .addEventListener("click", shareSubmit);

  document.getElementById("username").addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
      shareSubmit();
    }
  });
}

if (document.getElementById("editBtn")) {
  document.getElementById("editBtn").addEventListener("click", editData);
}

if (document.getElementById("get_all_databases")) {
  document
    .getElementById("get_all_databases")
    .addEventListener("click", getAllDatabases);
}
if (document.getElementById("username_login")) {
  document
    .getElementById("username_login")
    .addEventListener("keyup", enterPress);
}
if (document.getElementById("password_login")) {
  document
    .getElementById("password_login")
    .addEventListener("keyup", enterPress);
}
if (document.getElementById("username_register")) {
  document
    .getElementById("username_register")
    .addEventListener("keyup", enterPressRegister);
}
if (document.getElementById("password_register")) {
  document
    .getElementById("password_register")
    .addEventListener("keyup", enterPressRegister);
}
if (document.getElementById("confirm_password_register")) {
  document
    .getElementById("confirm_password_register")
    .addEventListener("keyup", enterPressRegister);
}
if (document.getElementById("view_comments")) {
  document
    .getElementById("view_comments")
    .addEventListener("click", viewComments);
}
if (document.getElementById("add_comment")) {
  document.getElementById("add_comment").addEventListener("click", addComment);
}
// if (document.getElementById('comment_box')) {
// 	document.getElementById('comment_box').addEventListener('keyup', addCommentKeyUp);
// }
if (document.getElementById("delete_prospect")) {
  document
    .getElementById("delete_prospect")
    .addEventListener("click", deleteProspect);
}
if (document.getElementById("image")) {
  document.getElementById("image").addEventListener("click", imageClicked);
}
if (document.getElementById("profileCopyBtn")) {
  document
    .getElementById("profileCopyBtn")
    .addEventListener("click", profileCopyFn);
}

/////////////// Event Listeners //////////////////////////////////

function starDeleteProspect() {
  var profile_link = document.getElementById("profile_link").innerText;
  var user_id = localStorage.getItem("user_id");
  var access_token = localStorage.getItem("access_token");
  var second_user_id = localStorage.getItem("second_user_id");

  if (access_token && user_id) {
    if (second_user_id != null) {
      user_id = second_user_id;
    }

    const url = `${globalURl}/alreadyStored`;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        id: profile_link,
        user_id: user_id,
      })
    );

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        if (xhr.responseText != "400") {
          deleteProspect();
          getname = localStorage.getItem("second_user_name");
          if (getname != "null" && getname != "") {
            document.getElementById(
              "savedUserMessage"
            ).innerText = `You're in ${getname}'s Database`;
          } else {
            document.getElementById("savedUserMessage").innerText =
              "Records from Database";
          }
        } else {
          getRequest();
          getname = localStorage.getItem("second_user_name");
          if (getname != "null" && getname != "") {
            document.getElementById(
              "savedUserMessage"
            ).innerText = `You're in ${getname}'s Database`;
          } else {
            document.getElementById("savedUserMessage").innerText =
              "Records from Database";
          }
        }
      }
    };
  } else {
    var myToast = Toastify({
      text: "Login to access",
      duration: 2000,
    });

    myToast.showToast();
  }
}

function iconShareGroupChat(e) {
  var group_id = e.currentTarget.getAttribute("data-group_id");
  localStorage.setItem("group_id", group_id);

  localStorage.setItem("group_id", group_id);
  localStorage.setItem("shared", true);
  window.location.href = "messagebox.html";
}

function imgPageChange() {
  var access_token = localStorage.getItem("access_token");
  var username = localStorage.getItem("username");

  if (access_token && username) {
    document.location.href = "home.html";
  }
}

function shareBackPage() {
  var back = localStorage.getItem("backpage");
  if (back) {
    document.location.href = "messagebox.html";
  } else {
    document.location.href = "popup.html";
  }
}

function aboutEventSave() {
  profile_check = 500;
  eventSave();
}

function profileCopyFn() {
  var profileInput = document.getElementById("profile_link");
  navigator.clipboard.writeText(profileInput.innerText);

  var myToast = Toastify({
    text: "Profile Link Copied",
    duration: 2000,
  });

  myToast.showToast();
}

function imageClicked() {
  var profile_link = document.getElementById("profile_link").innerText;

  let params = {
    active: true,
    currentWindow: true,
  };
  chrome.tabs.query(params, gotTab);

  function gotTab(tabs) {
    let msg = {
      txt: profile_link,
    };
    chrome.tabs.sendMessage(tabs[0].id, msg);
  }
}

// function addCommentKeyUp(event) {
// 	var comment = document.getElementById('comment_box').value

// 	if (event.keyCode === 13 && comment != '') {
// 		event.preventDefault();
// 		// document.getElementById("add_comment").click();
// 	}
// }

function deleteProspect() {
  document.getElementById("yeen").style.display = "block";
  document.getElementById("star__delete__icon").style.display = "none";

  const url = `${globalURl}/deleteProspect`;
  var user_id = localStorage.getItem("user_id");

  var second_user_id = localStorage.getItem("second_user_id");

  if (second_user_id != null) {
    user_id = second_user_id;
  }

  var profile_link = document.getElementById("profile_link").innerText;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      user_id: user_id,
      profile_link: profile_link,
    })
  );

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (xhr.responseText != "200") {
      } else {
        localStorage.removeItem("prospect_id");
        var deleteIcon = document.getElementById("star__delete__icon");
        deleteIcon.src = "Assets/img/star-black.png";
        document.getElementById("yeen").style.display = "none";
        document.getElementById("star__delete__icon").style.display = "block";
        getAll();
      }
    }
  };
}

function addComment() {
  var receiver = localStorage.getItem("commentID");
  receiver_id = JSON.parse(receiver);
  var access_token = localStorage.getItem("access_token");
  var user_id = localStorage.getItem("user_id");
  var prospect_id = localStorage.getItem("prospect_id");
  var text = document.getElementById("comment_box").value;
  var secondary_id = localStorage.getItem("second_user_id");

  if (access_token && user_id) {
    if (receiver_id.length > 0 && prospect_id) {
      var myToast = Toastify({
        text: "Message sent in DM",
        duration: 2000,
      });

      myToast.showToast();

      receiver_id.forEach((item) => {
        const url = `${globalURl}/send_message`;

        let xhr = new XMLHttpRequest();

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(
          JSON.stringify({
            user_id,
            receiver_id: item,
            prospect_id,
            text: text,
            replied_id: "",
          })
        );
      });
    }

    localStorage.setItem("commentID", JSON.stringify(commentArray));

    commentArray = [];

    if (document.getElementById("update_comment").style.display == "none") {
      const url = `${globalURl}/addComment`;
      var actual_id = localStorage.getItem("second_user_id");
      if (!actual_id) {
        actual_id = user_id;
      }
      var profile_link = document.getElementById("profile_link").innerText;
      var comment = document.getElementById("comment_box").value;
      document.getElementById("comment_box").value = "";

      if (comment.length != 0) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(
          JSON.stringify({
            user_id: user_id,
            actual_id: actual_id,
            profile_link: profile_link,
            comment: comment,
          })
        );
        xhr.onreadystatechange = function () {
          //Call a function when the state changes.
          if (xhr.readyState == 4 && xhr.status == 200) {
            // alert(xhr.responseText);
            let userData = JSON.parse(xhr.responseText);

            if (userData.status == "200") {
              viewComments();

              var user_id = localStorage.getItem("user_id");
              var secondary_id = localStorage.getItem("second_user_id");
              if (!secondary_id) {
                var secondary_id = null;
              }
              if (secondary_id == user_id) {
                secondary_id = null;
              }
              var profile_link =
                document.getElementById("profile_link").innerText;
              const url = `${globalURl}/getCommentsCount`;

              var xhr7 = new XMLHttpRequest();
              xhr7.open("POST", url, true);
              xhr7.setRequestHeader("Content-Type", "application/json");
              xhr7.send(
                JSON.stringify({
                  profile_link: profile_link,
                  user_id: user_id,
                  secondary_id: secondary_id,
                })
              );
              xhr7.onreadystatechange = function () {
                if (xhr7.readyState == 4 && xhr7.status == 200) {
                  res = JSON.parse(xhr7.responseText);
                  var count = res.count;
                  if (count == 0) {
                    document.getElementById("comment_count").style.display =
                      "none";
                  } else {
                    document.getElementById("comment_count").style.display =
                      "block";
                    document.getElementById("comment_count").innerHTML = count;
                  }
                }
              };
            } else {
            }
          }
        };
      }
    } else {
      let comment_id = localStorage.getItem("comment_id");
      let updatedComment = document.getElementById("comment_box").value;

      if (updatedComment != "") {
        const url = `${globalURl}/edit_comment`;

        let xhr = new XMLHttpRequest();

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(
          JSON.stringify({
            id: comment_id,
            comment: updatedComment,
          })
        );
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText);
            if (response.status == "Updated") {
              viewComments();
              localStorage.removeItem("comment_id");
            }
          }
        };
      }
    }

    commentArray = [];
  } else {
    var myToast = Toastify({
      text: "Login to access",
      duration: 2000,
    });

    myToast.showToast();
  }
}

function viewComments() {
  localStorage.setItem("commentID", JSON.stringify(commentArray));
  document.querySelector(".taggedUser").innerHTML = "";
  document.getElementById("comment_box").value = "";

  var access_token = localStorage.getItem("access_token");
  var user_id = localStorage.getItem("user_id");
  var secondary_id = localStorage.getItem("second_user_id");
  var username = localStorage.getItem("username");

  if (access_token && username) {
    document.getElementById("comment_box").disabled = false;

    setTimeout(() => {
      if (secondary_id == user_id) {
        secondary_id = null;
      }

      var profile_link = document.getElementById("profile_link").innerText;
      const url = `${globalURl}/getComments`;

      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          user_id: user_id,
          profile_link: profile_link,
          secondary_id: secondary_id,
        })
      );

      xhr.onreadystatechange = function () {
        //Call a function when the state changes.
        if (xhr.readyState == 4 && xhr.status == 200) {
          if (xhr.responseText != "400") {
            document.getElementById("comments_data").innerHTML = "";
            let comments = JSON.parse(xhr.responseText);

            if (comments.length > 0) {
              comments.map(function (obj, key) {
                let getDate = new Date().getDate();
                let getMonth = new Date().getMonth() + 1;
                let getYear = new Date().getFullYear();

                let currentDate = `${getYear}-${
                  getMonth < 10 ? "0" + getMonth : "" + getMonth
                }-${getDate < 10 ? "0" + getDate : "" + getDate}`;

                let dbDate = obj.created_at.slice(0, 10);

                const date1 = new Date(dbDate);
                const date2 = new Date(currentDate);

                const diffTime = Math.abs(date2 - date1);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                let msg = "";

                if (diffDays < 1) {
                  let getHours = new Date().getUTCHours();
                  let getMinutes = new Date().getUTCMinutes();
                  let getSeconds = new Date().getUTCSeconds();

                  let dbTime = obj.created_at.slice(11, 19);

                  let currentTime = `${
                    getHours < 10 ? "0" + getHours : "" + getHours
                  }:${getMinutes < 10 ? "0" + getMinutes : "" + getMinutes}:${
                    getSeconds < 10 ? "0" + getSeconds : "" + getSeconds
                  }`;

                  var valuestart = dbTime;
                  var valuestop = currentTime;

                  //create date format
                  var timeStart = new Date(
                    `${dbDate} ` + valuestart
                  ).getHours();
                  var timeEnd = new Date(
                    `${currentDate} ` + valuestop
                  ).getHours();

                  let hourDiff = "";

                  if (timeStart > timeEnd) {
                    hourDiff = timeStart - timeEnd;
                  } else {
                    hourDiff = timeEnd - timeStart;
                  }

                  if (hourDiff < 1) {
                    msg = "Less than an hour ago";
                  }

                  if (hourDiff >= 1 && hourDiff < 24) {
                    msg = `${hourDiff} hours ago`;
                  }
                } else {
                  msg = `${diffDays} days ago`;
                }

                row = `
                <div class="commentsContainer">
                  <img src="${obj.image}" alt="user pic"/>
                  <div class="popup_left">
                  <div class="upperDetails">
                      <p>${obj.name}</p>
                      <i class="far fa-ellipsis-h threeDotsMenu"></i>
                      <p class="timePara">${msg}</p>
                      </div>
                      <div class='menuBox' style="display: none">
                        <div class='editContainer'>
                          <i class="far fa-edit"></i>
                          <h1>Edit</h1>
                        </div>
                        <div class="deleteContainer">
                          <i class="far fa-trash"></i>
                          <h1>Delete</h1>
                        </div>
                      </div>
                      <div class="messageDiv">
                      <p class="msgPara" data-comment_id=${obj.id}>${obj.comment}</p>
                    </div>
                  </div>
                </div>`;

                document.getElementById("comments_data").innerHTML += row;
              });

              setTimeout(() => {
                document.querySelectorAll(".threeDotsMenu").forEach((ele) => {
                  ele.addEventListener("click", openThreeDotMenu);
                });
              }, 100);
            }
          }
        }
      };
      commentArray = [];
    }, 1000);
  } else {
    var myToast = Toastify({
      text: "Login to access",
      duration: 2000,
    });

    myToast.showToast();

    document.getElementById("comment_box").disabled = true;

    setTimeout(() => {
      document.getElementById("comments_data").innerHTML = "";
      document.getElementById("comments_data").innerHTML = "No Data to show";
    }, 1000);
  }
}

function openThreeDotMenu(e) {
  let currentMenuBox = e.currentTarget.parentElement.parentElement;

  setTimeout(() => {
    if (currentMenuBox.querySelector(".menuBox").style.display == "none") {
      document.querySelectorAll(".menuBox").forEach((ele) => {
        ele.style.display = "none";
      });
      currentMenuBox.querySelector(".menuBox").style.display = "block";
    } else {
      currentMenuBox.querySelector(".menuBox").style.display = "none";
    }
  }, 100);

  currentMenuBox
    .querySelector(".editContainer")
    .addEventListener("click", editComment);
  currentMenuBox
    .querySelector(".deleteContainer")
    .addEventListener("click", deleteComment);
}

function editComment(e) {
  document.querySelectorAll(".menuBox").forEach((ele) => {
    ele.style.display = "none";
  });

  let currentMenuBox = e.currentTarget.parentElement.parentElement;

  let commentPara = currentMenuBox.querySelector(".msgPara").innerText;

  let comment_id = currentMenuBox
    .querySelector(".msgPara")
    .getAttribute("data-comment_id");

  localStorage.setItem("comment_id", comment_id);

  document.getElementById("comment_box").value = commentPara;

  document.getElementById("add_comment").style.display = "none";
  document.getElementById("update_comment").style.display = "block";
  document.getElementById("cancel_comment").style.display = "block";

  document.getElementById("cancel_comment").addEventListener("click", () => {
    document.getElementById("add_comment").style.display = "block";
    document.getElementById("update_comment").style.display = "none";
    document.getElementById("cancel_comment").style.display = "none";
    document.getElementById("comment_box").value = "";
    localStorage.removeItem("comment_id");
    localStorage.setItem("commentID", JSON.stringify([]));
    commentArray = [];
    document.querySelector(".taggedUser").innerHTML = "";
  });

  document
    .getElementById("update_comment")
    .addEventListener("click", addComment);
}

function deleteComment(e) {
  document.querySelectorAll(".menuBox").forEach((ele) => {
    ele.style.display = "none";
  });

  let currentMenuBox = e.currentTarget.parentElement.parentElement;
  let comment_id = currentMenuBox
    .querySelector(".msgPara")
    .getAttribute("data-comment_id");

  const url = `${globalURl}/delete_comments/${comment_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText);

      if (response.status == "Deleted") {
        viewComments();
      }
    }
  };
}

function enterPressRegister(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("register_submit").click();
  }
}

function enterPress(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("login_submit").click();
  }
}

function statusEventSave() {
  var status = document.getElementById("status");
  status = this.options[this.selectedIndex].style.color;
  document.getElementById("status_color").style.backgroundColor = status;
  eventSave();
}

function getAllDatabases() {
  document.getElementById("get_all_message").style.display = "none";

  profile_check = 500;

  var username = localStorage.getItem("username");
  var access_token = localStorage.getItem("access_token");
  var user_id = localStorage.getItem("user_id");
  var profilePic = localStorage.getItem("profilePic");

  if (access_token && user_id) {
    if (document.getElementById("multi_database")) {
      const url1 = `${globalURl}/linkingids?user_id=` + username;
      var xhr1 = new XMLHttpRequest();
      xhr1.open("GET", url1, true);
      xhr1.setRequestHeader("Content-Type", "application/json");
      xhr1.send();

      xhr1.onreadystatechange = function () {
        //Call a function when the state changes.
        if (xhr1.readyState == 4 && xhr1.status == 200) {
          if (xhr1.responseText != "400") {
            var respon = xhr1.responseText;
            respon = JSON.parse(respon);
            var row =
              '<div style="width: 100%;display: flex; justify-content: center; margin-top: 20px;"><img src="logo.png" id="dbLogo" style="height: 50px; width: 50px"></div><div class="text-center" style="margin:5% !important"><h3>Databases</h3></div>';
            row +=
              `<div class="mt-2 text-center single_database" id="` +
              user_id +
              `" data-image=${profilePic} style="padding-bottom:2%; margin-top:5% !important; cursor:pointer"><p class="pl-2" style="margin-bottom:0"><strong>  - ` +
              username +
              `</strong> </p></div>`;
            document.getElementById("multi_database").innerHTML = row;

            var finalArr = respon.map(function (obj, key) {
              row =
                `<div class="mt-2 text-center single_database" id="` +
                obj.link_id +
                `" data-name=${obj.naming} data-image=${
                  obj.image != null ? obj.image : "./Assets/img/user.png"
                } style="padding-bottom:2%; margin-top:5% !important; cursor:pointer"><p class="pl-2" style="margin-bottom:0"><strong>  - ` +
                obj.user_id +
                `</strong> </p></div>`;
              // all1 += row;
              document.getElementById("multi_database").innerHTML += row;
            });

            var single_database =
              document.getElementsByClassName("single_database");
            for (var i = 0; i < single_database.length; i++) {
              single_database[i].addEventListener(
                "click",
                getSingleDatabase,
                false
              );
            }
            // document.getElementsByClassName('single_database').addEventListener('click', getSingleDatabase);

            document.getElementById("multi_database").style.display = "block";

            document.getElementById("results").style.display = "none";
            document.getElementById("list_table_view").style.display = "none";
          }
        }
      };
    }
  } else {
    var myToast = Toastify({
      text: "Login to access",
      duration: 2000,
    });

    myToast.showToast();
  }
}

function getSingleDatabase() {
  var yourToast = Toastify({
    text: "Database Changed",
    duration: 2000,
  });
  yourToast.showToast();
  setTimeout(() => {
    var user_id = this.getAttribute("id");
    var image = this.getAttribute("data-image");
    var name = this.getAttribute("data-name");
    document.getElementById("multi_database").style.display = "none";
    localStorage.setItem("second_user_id", user_id);
    localStorage.setItem("second_user_name", name);

    localStorage.setItem("secondUserPic", image);
    document.getElementById("profilePic").src = image;
    document.location.href = "home.html";
  }, 1500);
}

function shareSubmit() {
  var username = document.getElementById("username").value;
  var message = document.getElementById("message1");
  var user_id = localStorage.getItem("username");
  var link_id = localStorage.getItem("user_id");

  var re = /\S+@\S+\.\S+/;
  // return re.test(email);
  if (!re.test(username)) {
    message.innerText = "Email Format incorrect";
  } else {
    message.style.color = "green";
    message.innerText = "Waiting for response";

    const url =
      `${globalURl}/share?email=` +
      username +
      `&user_id=` +
      user_id +
      `&link_id=` +
      link_id;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();

    xhr.onreadystatechange = function () {
      //Call a function when the state changes.
      if (xhr.readyState == 4 && xhr.status == 200) {
        if (xhr.responseText != "400") {
          message.innerText = "Confirmation Email Sent Successful";
          setTimeout(function () {
            document.location.href = "popup.html";
          }, 3000);
        } else {
          message.style.color = "red";
          message.innerText = "No Such User Exists";
        }
      }
    };
  }
}

function share() {
  var access_token = localStorage.getItem("access_token");
  var user_id = localStorage.getItem("user_id");

  if (access_token && user_id) {
    document.location.href = "share.html";
  } else {
    var myToast = Toastify({
      text: "Login to access",
      duration: 2000,
    });

    myToast.showToast();
  }
}

function editData() {
  var access_token = localStorage.getItem("access_token");
  var user_id = localStorage.getItem("user_id");

  if (access_token && user_id) {
    let editBtn = document.getElementById("editBtn");

    if (editBtn.innerText === "Edit Info") {
      editBtn.innerText = "Save Info";
    } else {
      editBtn.innerText = "Edit Info";
    }

    profile_check = 500;

    var fname = document.getElementById("fname");
    var description = document.getElementById("description");
    var company = document.getElementById("company");
    var about = document.getElementById("about");

    if (
      fname.readOnly === true &&
      description.readOnly === true &&
      company.readOnly === true &&
      about.readOnly === true
    ) {
      fname.readOnly = false;
      description.readOnly = false;
      company.readOnly = false;
      about.readOnly = false;

      fname.classList.add("editableInputs");
      description.classList.add("editableInputs");
      company.classList.add("editableInputs");
      about.classList.add("editableTextArea");
    } else {
      fname.readOnly = true;
      description.readOnly = true;
      company.readOnly = true;
      about.readOnly = true;

      fname.classList.remove("editableInputs");
      description.classList.remove("editableInputs");
      company.classList.remove("editableInputs");
      about.classList.remove("editableTextArea");
    }
  } else {
    var myToast = Toastify({
      text: "Login to access",
      duration: 2000,
    });

    myToast.showToast();
  }
}

function showFilters() {
  elem = document.getElementById("new_filters");
  if (elem.style.display == "none") {
    elem.style.display = "block";
  } else {
    elem.style.display = "none";
  }
}

function weekFilterChange(e) {
  pageNo = 10;
  ArrayMaker();
}

function getWeekOfMonth(date) {
  let adjustedDate = date.getDate() + date.getDay();
  let prefixes = ["0", "1", "2", "3", "4", "5"];
  return parseInt(prefixes[0 | (adjustedDate / 8)]) + 1;
}

function weekChange(e) {
  var weekly_source = e.currentTarget.value;
  var options = {
    month: "short",
  };
  var options_year = {
    year: "2-digit",
  };
  var today = new Date(weekly_source);

  // init date
  var date = new Date(weekly_source);

  // document.getElementById("week_number").innerHTML =(getWeekOfMonth(date));
  document.getElementById("week_number").innerHTML =
    "Week - Month" + ' <i class="far fa-calendar-alt clender_icons"></i>';

  document.getElementById("weekly_source").value =
    today.toLocaleDateString("en-US", options) +
    " Week " +
    getWeekOfMonth(date) +
    " -" +
    today.toLocaleDateString("en-US", options_year);
  eventSave();
}

function showStatus(e) {
  // var check = document.getElementById('status').innerHTML;
  // alert(check);

  // if(check == 'Select' || check == '<option>null</option>'){

  apiCategories("status");

  // }
}

function categorySubmit() {
  var name = document.getElementById("category_name").value;
  var message = document.getElementById("message");
  message.style.color = "green";
  message.innerText = "Waiting for response";

  const url = `${globalURl}/addCategory`;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      name: name,
    })
  );

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (xhr.responseText != "400") {
        message.innerText = "Saved Successfully";
        setTimeout(function () {
          document.location.href = "admin.html";
        }, 2000);
      } else {
        message.style.color = "red";
        message.innerText = "Category Already Exists";
      }
    }
  };
}

function addCategory() {
  document.location.href = "add_category.html";
}

function viewCategories() {
  document.getElementById("message").style.display = "block";

  const url = `${globalURl}/getAllCategories`;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
  var all = "";
  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      arr = xhr.responseText;
      arr = JSON.parse(arr);

      // document.getElementById('users_listing').innerText = 'asd';

      var finalArray = arr.map(function (obj, key) {
        row =
          `<div class="mt-2 single_page" id="` +
          obj.id +
          `" style="padding-bottom:2%; cursor:pointer"><p class="single_profile pl-2" style="margin-bottom:0"><strong>  - ` +
          obj.name +
          `</strong> </p></div>`;
        all += row;
      });
    }
  };

  setTimeout(function () {
    // document.location.href = "users.html";
    document.getElementById("message").style.display = "none";

    document.getElementById("users").innerHTML = all;
    document.getElementById("options").style.display = "none";
    document.getElementById("users").style.display = "block";
  }, 3000);
}

function usersListing() {
  document.getElementById("message").style.display = "block";

  const url = `${globalURl}/getAllUsers`;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
  var all = "";
  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      arr = xhr.responseText;
      arr = JSON.parse(arr);

      // document.getElementById('users_listing').innerText = 'asd';

      var finalArray = arr.map(function (obj, key) {
        row =
          `<div class="mt-2 single_page" id="` +
          obj.id +
          `" style="padding-bottom:2%; cursor:pointer"><p class="single_profile pl-2" style="margin-bottom:0"><strong>  - ` +
          obj.username +
          `</strong> (` +
          obj.count +
          ` lead/s)</p></div>`;
        all += row;
      });

      // document.getElementById('api_return').style.display = 'none';
      // document.getElementById('results').style.display = 'none';
      // document.getElementById('getAll').style.display = 'block';
      // document.getElementById('getAllButtons').style.display = 'block';
      // var divs = document.getElementsByClassName('single_page');
      // for (i = 0; i < divs.length; ++i) {
      // 	var p_id = divs[i].id;

      //   document.getElementById(p_id).addEventListener('click', getSinglePage);
      // };
      // document.location.href = "users.html";
    }
  };

  setTimeout(function () {
    // document.location.href = "users.html";
    document.getElementById("message").style.display = "none";

    document.getElementById("users").innerHTML = all;
    document.getElementById("options").style.display = "none";
    document.getElementById("users").style.display = "block";
  }, 3000);
}

function adminHome() {
  const url = `${globalURl}/totalUsers`;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
  var all = 4;
  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      arr = xhr.responseText;
      arr = JSON.parse(arr);

      var finalArray = arr.map(function (obj, key) {
        row =
          `<div class="mt-2 single_page" id="` +
          obj.id +
          `" style="padding-bottom:2%; cursor:pointer"><p class="single_profile pl-2" style="margin-bottom:0"><strong>  - ` +
          obj.username +
          `</strong> (` +
          obj.count +
          ` lead/s)</p></div>`;
        all += row;
      });
    }
  };
  document.location.href = "admin.html";
  setTimeout(function () {
    document.getElementById("totalUsers").innerText = all;
  }, 1000);
}

function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("username");
  localStorage.removeItem("second_user_id");
  document.location.href = "login.html";
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

function getAll() {
  btn = document.getElementById("view_all_1");
  btn.disabled = true;
  let secondUserPic = localStorage.getItem("secondUserPic");
  if (secondUserPic != "") {
    document.getElementById("profilePicc").src = secondUserPic;
  } else {
    profilePic = localStorage.getItem("profilePicc");
    document.getElementById("profilePicc").src = profilePic;
  }
  getname = localStorage.getItem("second_user_name");
  if (getname != "null" && getname != "") {
    document.getElementById(
      "savedUserMessagee"
    ).innerText = `You're in ${getname}'s Database`;
  } else {
    document.getElementById("savedUserMessagee").innerText =
      "Records from Database";
  }

  profile_check = 500;

  document.getElementById("api_return").style.display = "none";
  document.getElementById("results").style.display = "none";
  document.getElementById("list_table_view").style.display = "block";
  document.getElementById("view_all_1").disabled = false;

  document.getElementById("getAll").style.display = "contents";
  document.getElementById("getAllButtons").style.display = "block";

  ArrayMaker();
}

function getAllById(user_id) {
  var user_id = user_id;

  var second_user_id = localStorage.getItem("second_user_id");

  if (second_user_id == null) {
    second_user_id = 0;
  }

  document.getElementById("view_type").checked = false;
  document.getElementById("pills-home").style.display = "none";
  document.getElementById("pills-profile").style.display = "block";

  const url = `${globalURl}/getAll/${user_id}/${second_user_id}`;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      arr = xhr.responseText;
      arr = JSON.parse(arr);
      document.getElementById("getAll").innerHTML = "";
      document.getElementById("list_table_view").style.display = "block";

      var finalArray = arr.map(function (obj, key) {
        row =
          `<div class="row m-0 tabs_two_main single_profile" id="` +
          obj.id +
          `">
				  <div class="tabs_cols_two_main_1">
					  <span class="left">
              ${obj.name != null ? obj.name : "No Name Added"}
            </span>
				  </div>
				  <div class="tabs_cols_two_main_1">
					  <span class="left">
					    <img src="${
                obj.image != null ? obj.image : "./Assets/img/user.png"
              }" class="tabs_two_imgs">
						</span>
					  <span class="right"><i class="far fa-comment-alt comment_icon"></i></span>
				  </div>
				  <div class="tabs_cols_two_main_1">

					  <span class="left">
              ${
                obj.description != null
                  ? obj.description
                  : "No Description Added"
              }
            </span>

				  </div>
				  <div class="tabs_cols_two_main_1">

					  <span class="left">
              ${obj.company != null ? obj.company : "No Company Added"}
            </span>

				  </div>
				  <div class="tabs_cols_two_main_1">
					  <span class="Address_msg">
              ${obj.address != null ? obj.address : "No Location Added"}
            </span>
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
              ${obj.follow_up != null ? obj.follow_up : "No Date Added"}
            </span>
				  </div>
			  		</div>`;
        document.getElementById("getAll").innerHTML += row;
      });

      // apiCategories('status_filter');
      apiWeekly("weekly_filter");
      document.getElementById("api_return").style.display = "none";
      document.getElementById("results").style.display = "none";
      document.getElementById("getAll").style.display = "contents";
      document.getElementById("getAllButtons").style.display = "block";

      var single_profile = document.getElementsByClassName("single_profile");
      for (var i = 0; i < single_profile.length; i++) {
        single_profile[i].addEventListener("click", getSinglePage, false);
      }
    }
  };
}

function getSinglePage(e) {
  document.getElementById("go_back").disabled = false;
  var clipper = localStorage.getItem("clipperpageCheck");
  if (clipper) {
    localStorage.removeItem("clipperpageCheck");
  }
  if (document.getElementById("list_table_view")) {
    document.getElementById("list_table_view").style.display = "none";
  }
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
            donot: "true",
          };
          chrome.tabs.sendMessage(tabs[0].id, msg);
        }
        profile_check = 500;

        var deleteIcon = document.getElementById("star__delete__icon");
        deleteIcon.src = "Assets/img/star-yellow.png";

        localStorage.setItem("prospect_id", res.user.id);

        getname = localStorage.getItem("second_user_name");
        if (getname != "null" && getname != "") {
          document.getElementById(
            "savedUserMessage"
          ).innerText = `You're in ${getname}'s Database`;
        } else {
          document.getElementById("savedUserMessage").innerText =
            "Records from Database";
        }

        document.getElementById("topTitleName").innerText = res.user.name;
        document.getElementById("fname").value = res.user.name;
        document.getElementById("description").value = res.user.description;
        document.getElementById("address").value = res.user.address;
        document.getElementById("company").value = res.user.company;
        document.getElementById("about").value = res.user.about;

        document.getElementById("strategy_date").value = res.user.strategy_date;
        let image = document.getElementById("image");

        variable = setTimeout(() => {
          if (
            image.src.includes("http") ||
            image.src.includes("Assets") ||
            image.src.includes("chrome-extension")
          ) {
            window.location.reload();
            eventSave();
          }

          clearInterval(variable);
        }, 5000);

        image.src = res.user.image;

        document.getElementById("profile_link").innerText =
          res.user.profile_link;

        // document.getElementById("notes").value = res.user.notes;
        document.getElementById("client_messages").innerHTML = res.user.notes;
        document.getElementById("notes").innerHTML = res.user.messages;

        if (document.getElementById(res.user.status)) {
          document.getElementById(res.user.status).selected = true;
          var status_tag = document.getElementById("status");
          status_tag = status_tag[status_tag.selectedIndex].style.color;
          document.getElementById("status_color").style.backgroundColor =
            status_tag;
        }

        if (res.endorsement == "Yes") {
          document.getElementById("endorsement_yes").checked = true;
        } else {
          document.getElementById("endorsement_no").checked = true;
        }

        if (res.priority == "A") {
          document.getElementById("priority_a").checked = true;
        } else if (res.priority == "B") {
          document.getElementById("priority_b").checked = true;
        } else if (res.priority == "C") {
          document.getElementById("priority_c").checked = true;
        } else if (res.priority == "D") {
          document.getElementById("priority_d").checked = true;
        }

        var user_id = localStorage.getItem("user_id");
        var secondary_id = localStorage.getItem("second_user_id");
        if (!secondary_id) {
          var secondary_id = null;
        }
        if (secondary_id == user_id) {
          secondary_id = null;
        }
        var profile_link = res.user.profile_link;
        const url = `${globalURl}/getCommentsCount`;

        var xhr6 = new XMLHttpRequest();
        xhr6.open("POST", url, true);
        xhr6.setRequestHeader("Content-Type", "application/json");
        xhr6.send(
          JSON.stringify({
            profile_link: profile_link,
            user_id: user_id,
            secondary_id: secondary_id,
          })
        );
        xhr6.onreadystatechange = function () {
          if (xhr6.readyState == 4 && xhr6.status == 200) {
            res = JSON.parse(xhr6.responseText);
            var count = res.count;
            if (count == 0) {
              document.getElementById("comment_count").style.display = "none";
            } else {
              document.getElementById("comment_count").style.display = "block";
              document.getElementById("comment_count").innerHTML = count;
            }
          }
        };

        var today = new Date(res.user.weekly_date);
        var today = today.toISOString().substring(0, 10);
        document.getElementById("weekly_date").value = today;
        document.getElementById("weekly_date").max = today;
        var weekly_source = today;
        var options = {
          month: "short",
        };
        var options_year = {
          year: "2-digit",
        };
        var today = new Date(weekly_source);

        //init date
        var date = new Date(weekly_source);

        // document.getElementById("week_number").innerHTML =(getWeekOfMonth(date));
        document.getElementById("week_number").innerHTML =
          "Week - Month" + ' <i class="far fa-calendar-alt clender_icons"></i>';

        document.getElementById("weekly_source").value =
          today.toLocaleDateString("en-US", options) +
          " Week " +
          getWeekOfMonth(date) +
          " -" +
          today.toLocaleDateString("en-US", options_year);

        if (res.user.discovery_call) {
          var dbDateDiscovery = res.user.discovery_call;
          var dateDiscovery = new Date(dbDateDiscovery);
          var formattedDateDiscovery = dateDiscovery.toISOString().slice(0, 10);
          document.getElementById("discovery_call").value =
            formattedDateDiscovery;
        }

        document.getElementById("updated_at").value = res.user.updated_at;
        document.getElementById("total_messages").value =
          res.user.total_messages;
        document.getElementById("follow_up").value = res.user.follow_up;

        document.getElementById("conversion").value = res.user.conversion;

        let sInterval = setInterval(() => {
          if (res.user.profile_link) {
            clearInterval(sInterval);
            document.getElementById("profile_link").innerText =
              res.user.profile_link;
          }
        }, 100);

        document.getElementById("api_return").style.display = "none";
        document.getElementById("getAll").style.display = "none";
        document.getElementById("getAllButtons").style.display = "none";
        document.getElementById("results").style.display = "block";
      } else {
        var starIcon = document.getElementById("star__delete__icon");
        starIcon.src = "Assets/img/star-black.png";

        getname = localStorage.getItem("second_user_name");
        if (getname != "null" && getname != "") {
          document.getElementById(
            "savedUserMessage"
          ).innerText = `You're in ${getname}'s Database`;
        } else {
          document.getElementById("savedUserMessage").innerText =
            "Records from Database";
        }
        var user_id = localStorage.getItem("user_id");
        var secondary_id = localStorage.getItem("second_user_id");
        if (!secondary_id) {
          var secondary_id = null;
        }
        if (secondary_id == user_id) {
          secondary_id = null;
        }

        var profile_link = res.user.profile_link;
        const url = `${globalURl}/getCommentsCount`;

        var xhr6 = new XMLHttpRequest();
        xhr6.open("POST", url, true);
        xhr6.setRequestHeader("Content-Type", "application/json");
        xhr6.send(
          JSON.stringify({
            profile_link: profile_link,
            user_id: user_id,
            secondary_id: secondary_id,
          })
        );
        xhr6.onreadystatechange = function () {
          if (xhr6.readyState == 4 && xhr6.status == 200) {
            res = JSON.parse(xhr6.responseText);
            var count = res.count;
            if (count == 0) {
              document.getElementById("comment_count").style.display = "none";
            } else {
              document.getElementById("comment_count").style.display = "block";
              document.getElementById("comment_count").innerHTML = count;
            }
          }
        };
      }
    }
  };
}

var date = new Date();
const monthNames = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
document.getElementById("week_number").innerHTML =
  "Week - Month" + ' <i class="far fa-calendar-alt clender_icons"></i>';
//get week number of date hgvh
function getWeekOfMonth(date) {
  let adjustedDate = date.getDate() + date.getDay();
  let prefixes = ["0", "1", "2", "3", "4", "5"];
  return parseInt(prefixes[0 | (adjustedDate / 7)]) + 1;
}

function getProfile() {
  document.getElementById("get_all_message").style.display = "none";
  document.getElementById("search_box").value = null;
  document.getElementById("yeen").style.display = "block";
  document.getElementById("star__delete__icon").style.display = "none";
  var clipper = localStorage.getItem("clipperpageCheck");
  var prospect = localStorage.getItem("prospect_id");
  if (clipper) {
    if (prospect) {
      window.location.href = "popup.html";
    }
  } else {
    var profile_link = bgpage.word.profile_link;
    var user_id = localStorage.getItem("user_id");

    var second_user_id = localStorage.getItem("second_user_id");

    if (second_user_id != null) {
      user_id = second_user_id;
    }

    const url = `${globalURl}/alreadyStored`;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        id: profile_link,
        user_id: user_id,
      })
    );

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        if (xhr.responseText != "400") {
          getname = localStorage.getItem("second_user_name");
          if (getname != "null" && getname != "") {
            document.getElementById(
              "savedUserMessage"
            ).innerText = `You're in ${getname}'s Database`;
          } else {
            document.getElementById("savedUserMessage").innerText =
              "Records from Database";
          }

          var deleteIcon = document.getElementById("star__delete__icon");
          deleteIcon.src = "Assets/img/star-yellow.png";
          document.getElementById("yeen").style.display = "none";
          document.getElementById("star__delete__icon").style.display = "block";

          var user_id = localStorage.getItem("user_id");
          var secondary_id = localStorage.getItem("second_user_id");
          if (!secondary_id) {
            var secondary_id = null;
          }
          if (secondary_id == user_id) {
            secondary_id = null;
          }
          var profile_link = bgpage.word.profile_link;
          const url = `${globalURl}/getCommentsCount`;

          var xhr5 = new XMLHttpRequest();
          xhr5.open("POST", url, true);
          xhr5.setRequestHeader("Content-Type", "application/json");
          xhr5.send(
            JSON.stringify({
              profile_link: profile_link,
              user_id: user_id,
              secondary_id: secondary_id,
            })
          );
          xhr5.onreadystatechange = function () {
            if (xhr5.readyState == 4 && xhr5.status == 200) {
              res = JSON.parse(xhr5.responseText);
              var count = res.count;
              if (count == 0) {
                document.getElementById("comment_count").style.display = "none";
              } else {
                document.getElementById("comment_count").style.display =
                  "block";
                document.getElementById("comment_count").innerHTML = count;
              }
            }
          };
        } else {
          var user_id = localStorage.getItem("user_id");
          var secondary_id = localStorage.getItem("second_user_id");
          if (!secondary_id) {
            var secondary_id = null;
          }
          if (secondary_id == user_id) {
            secondary_id = null;
          }
          var profile_link = bgpage.word.profile_link;
          const url = `${globalURl}/getCommentsCount`;

          var xhr5 = new XMLHttpRequest();
          xhr5.open("POST", url, true);
          xhr5.setRequestHeader("Content-Type", "application/json");
          xhr5.send(
            JSON.stringify({
              profile_link: profile_link,
              user_id: user_id,
              secondary_id: secondary_id,
            })
          );
          xhr5.onreadystatechange = function () {
            if (xhr5.readyState == 4 && xhr5.status == 200) {
              res = JSON.parse(xhr5.responseText);
              var count = res.count;
              if (count == 0) {
                document.getElementById("comment_count").style.display = "none";
              } else {
                document.getElementById("comment_count").style.display =
                  "block";
                document.getElementById("comment_count").innerHTML = count;
              }
            }
          };

          getname = localStorage.getItem("second_user_name");
          if (getname != "null" && getname != "") {
            document.getElementById(
              "savedUserMessage"
            ).innerText = `You're in ${getname}'s Database`;
          } else {
            document.getElementById("savedUserMessage").innerText =
              "Records from Database";
          }
          var deleteIcon = document.getElementById("star__delete__icon");
          deleteIcon.src = "Assets/img/star-black.png";
          document.getElementById("yeen").style.display = "none";
          document.getElementById("star__delete__icon").style.display = "block";
        }
      }
    };

    document.getElementById("api_return").style.display = "none";
    document.getElementById("getAll").style.display = "none";
    document.getElementById("getAllButtons").style.display = "none";
    document.getElementById("list_table_view").style.display = "none";
    document.getElementById("results").style.display = "block";
  }
}

function addLoader() {
  document.getElementById("results").style.display = "none";
  document.getElementById("loader").style.display = "block";
}

function removeLoader() {
  document.getElementById("results").style.display = "block";
  document.getElementById("loader").style.display = "none";
}

function getRequest() {
  document.getElementById("yeen").style.display = "block";
  document.getElementById("star__delete__icon").style.display = "none";

  if (document.getElementById("list_table_view")) {
    document.getElementById("list_table_view").style.display = "none";
  }

  let id = 0;
  // let title = bgpage.word.title;
  let name = document.getElementById("fname").value;

  document.getElementById("topTitleName").innerText = name;

  let description = document.getElementById("description").value;
  let address = document.getElementById("address").value;
  let company = document.getElementById("company").value;
  let about = document.getElementById("about").value;
  let profile_link = document.getElementById("profile_link").innerText;
  let img = document.getElementById("image").src;

  //   document.getElementById('name').innerText = res.name;
  // 	document.getElementById('fname').innerText = res.name;
  // document.getElementById('description').innerText = res.description;
  // document.getElementById('address').innerText = res.address;
  // document.getElementById('company').innerText = res.company;
  // document.getElementById('about').innerText = res.about;
  // let image = document.getElementById('image');
  // image.src = res.image;
  // var user_id = localStorage.getItem("secondary_user_id");
  // if(!user_id){
  var user_id = localStorage.getItem("user_id");

  var second_user_id = localStorage.getItem("second_user_id");

  if (second_user_id != null) {
    user_id = second_user_id;
  }
  // }
  var notes = document.getElementById("client_messages")
    ? document.getElementById("client_messages").innerHTML
    : "";
  var messages = document.getElementById("notes")
    ? document.getElementById("notes").innerHTML
    : "";
  var follow_up = document.getElementById("follow_up").value;
  var status = document.getElementById("status").value;
  var discovery_call = document.getElementById("discovery_call").value;
  let strategy_date = document.getElementById("strategy_date").value;
  var updated_at = document.getElementById("updated_at").value;
  var conversion = document.getElementById("conversion").value;
  var total_messages = document.getElementById("total_messages").value;
  var endorsement = null;
  if (document.querySelector('input[name="endorsement"]:checked')) {
    endorsement = document.querySelector(
      'input[name="endorsement"]:checked'
    ).value;
  }
  var priority = null;
  if (document.querySelector('input[name="priority"]:checked')) {
    priority = document.querySelector('input[name="priority"]:checked').value;
  }

  var weekly_date = document.getElementById("weekly_date").value;

  var weekSource = weekly_date;
  document.getElementById("weekly_source").value = weekSource;

  var options = {
    month: "short",
  };
  var options_year = {
    year: "2-digit",
  };
  var today = new Date(weekSource);

  // init date
  var date = new Date(weekSource);

  // document.getElementById("week_number").innerHTML =(getWeekOfMonth(date));
  document.getElementById("week_number").innerHTML =
    "Week - Month" + ' <i class="far fa-calendar-alt clender_icons"></i>';

  document.getElementById("weekly_source").value =
    today.toLocaleDateString("en-US", options) +
    " Week " +
    getWeekOfMonth(date) +
    " -" +
    today.toLocaleDateString("en-US", options_year);

  var weekly_source = document.getElementById("weekly_source").value;
  const imageUrl = img;

  (async () => {
    const response = await fetch(imageUrl);
    const imageBlob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const base64data = reader.result;
      var encodedString = btoa(base64data);
      var decodedString = atob(encodedString);
      img = decodedString;
    };
  })();
  var i = setInterval(() => {
    if (img != null) {
      const url = `${globalURl}/api-test`;

      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          id: id,
          name: name,
          description: description,
          address: address,
          company: company,
          about: about,
          img: img,
          user_id: user_id,
          notes: notes,
          messages: messages,
          weekly_date: weekly_date,
          status: status,
          discovery_call: discovery_call,
          updated_at: updated_at,
          conversion: conversion,
          total_messages: total_messages,
          endorsement: endorsement,
          priority: priority,
          profile_link: profile_link,
          weekly_source: weekly_source,
          strategy_date: strategy_date,
        })
      );

      xhr.onreadystatechange = function () {
        //Call a function when the state changes.
        if (xhr.readyState == 4 && xhr.status == 200) {
          let res = JSON.parse(xhr.responseText);

          if (res.status == 200) {
            localStorage.setItem("prospect_id", res.prospect_id);
            var deleteIcon = document.getElementById("star__delete__icon");
            deleteIcon.src = "Assets/img/star-yellow.png";
            document.getElementById("yeen").style.display = "none";
            document.getElementById("star__delete__icon").style.display =
              "block";
          }
        }
      };
      clearInterval(i);
    }
  }, 1500);
}

function apiCall(url, params = []) {
  // const url='https://linkedin.thefastech.com/getAll';
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
  var response = null;

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (xhr.responseText != "400") {
        res = JSON.parse(xhr.responseText);
        if (res.username == "admin1") {
          document.getElementById("admin_buttons").style.display = "block";
          document.getElementById("not_logged_in_buttons").style.display =
            "none";
          document.getElementById("logged_in_buttons").style.display = "none";
          document.getElementById("username").innerText =
            "Welcome, " + res.username;
        } else {
          if (document.getElementById("not_logged_in_buttons")) {
            document.getElementById("not_logged_in_buttons").style.display =
              "none";
          }
          if (document.getElementById("logged_in_buttons")) {
            document.getElementById("logged_in_buttons").style.display =
              "block";
          }
          if (document.getElementById("username")) {
            document.getElementById("username").innerText =
              "Welcome, " + res.username;
          }
        }
      } else {
        document.getElementById("not_logged_in_buttons").style.display =
          "block";
      }
    }
  };
}

function alreadyStored() {
  let id = bgpage.word.id;
  var user_id = localStorage.getItem("user_id");

  var second_user_id = localStorage.getItem("second_user_id");

  if (second_user_id != null) {
    user_id = second_user_id;
  }

  const url = `${globalURl}/alreadyStored`;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      id: id,
      user_id: user_id,
    })
  );

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      res = JSON.parse(xhr.responseText);
      if (xhr.responseText != "200") {
        // document.getElementById('alreadyStored').innerText = 'Already Stored';
        return xhr.responseText;
      } else {
        return null;
      }
    }
  };
}

function apiCategories(tag) {
  const url = `${globalURl}/getAllCategories`;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
  var all = '<option value="">Select</option>';
  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      arr = xhr.responseText;
      arr = JSON.parse(arr);

      var finalArray = arr.map(function (obj, key) {
        row = `<option>` + obj.name + `</option>`;
        all += row;
      });

      document.getElementById(tag).innerHTML = all;
    }
  };
}

function apiWeekly(tag) {
  // var user_id = localStorage.getItem("user_id");
  // const url = `${globalURl}/getFilterWeeks/` + user_id;
  // var xhr = new XMLHttpRequest();
  // xhr.open("GET", url, true);
  // xhr.setRequestHeader("Content-Type", "application/json");
  // xhr.send();
  // var all = '<option value="">Select</option>';
  // xhr.onreadystatechange = function () {
  //   Call a function when the state changes.
  //   if (xhr.readyState == 4 && xhr.status == 200) {
  //     arr = xhr.responseText;
  //     arr = JSON.parse(arr);
  //     var finalArray = arr.map(function (obj, key) {
  //       row = `<option>` + obj.weekly_source + `</option>`;
  //       all += row;
  //     });
  //     document.getElementById(tag).innerHTML = all;
  //   }
  // };
}

function filtersChange(
  user_id,
  category_id,
  weekly_source,
  priority,
  follow_up,
  discovery,
  view_type,
  search_box
) {
  const url =
    `${globalURl}/filters/?status=` +
    category_id +
    `&user_id=` +
    user_id +
    `&weekly=` +
    weekly_source +
    `&priority=` +
    priority +
    `&follow_up=` +
    follow_up +
    `&discovery=` +
    discovery +
    `&search_box=` +
    search_box +
    `&view_type=` +
    view_type;
  // const url = 'https://linkedin.thefastech.com/filters/?status=' + category_id + '&user_id=' + user_id + '&weekly=' + weekly_source + '&priority=' + priority + '&follow_up=' + follow_up + '&discovery=' + discovery + '&search_box=' + search_box + '&view_type=' + view_type;
  // const url = 'https://linkedin.thefastech.com/filters/?status=' + category_id + '&user_id=' + user_id + '&priority=' + priority + '&follow_up=' + follow_up + '&discovery=' + discovery + '&search_box=' + search_box + '&view_type=' + view_type;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
  var all = '<option value="">Select</option>';
  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      arr = xhr.responseText;
      arr = JSON.parse(arr);

      var count_arr = arr.length;

      document.getElementById("getAll").innerHTML = "";
      document.getElementById("getAllCanban").innerHTML = "";

      if (arr == "") {
        document.getElementById("get_all_message").style.display = "block";
      } else {
        document.getElementById("get_all_message").style.display = "none";

        if (!view_type) {
          var finalArray = arr.map(function (obj, key) {
            row =
              `<div class="row m-0 tabs_two_main single_page" id="` +
              obj.id +
              `">
				  <div class="tabs_cols_two_main_1">
					  <span class="left">` +
              obj.name +
              `</span>
				  </div>
				  <div class="tabs_cols_two_main_1 >
					  <span class="left">
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
				  <div class="tabs_cols_two_main_1">
					  <span class="Address_msg">` +
              obj.address +
              `</span>
				  </div>
				<div class="tabs_cols_two_main_1"
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
            document.getElementById("pills-profile").style.display = "block";
            document.getElementById("getAllCanban").style.display = "none";
          });
        } else {
          count_arr = count_arr * 100;

          arr = Object.keys(arr).map((key) => [arr[key]]);

          // document.getElementById('getAllCanban').style.width = count_arr +'%';
          // alert(count_arr * 50);

          var finalArray = arr.map(function (obj, key) {
            var finalArray1 = obj.map(function (obj1, key1) {
              var row = null;

              if (key != 0) {
                var margin = `<div class="slide-1 " style="width:230px !important">`;
              } else {
                var margin = `<div class="slide-1"style="width:230px !important">`;
              }
              row =
                margin +
                `<div class="row m-0">
	                                                <div class="col-12 p-1">
	                                                    <div class="item owl_items">
															${
                                obj1[0].status === null
                                  ? `<div style="color:#0e76a8 !important;" class="itms_btns my-2 bg-white">LinkedIn Campaign</div>`
                                  : ""
                              }
															${
                                obj1[0].status === "LinkedIn Campaign"
                                  ? `<div style="color:#0e76a8 !important;" class="itms_btns my-2 bg-white">${obj1[0].status}</div>`
                                  : ""
                              }
															${
                                obj1[0].status === "Talking/Replied"
                                  ? `<div style="color:#0e76a8 !important;" class="itms_btns my-2 bg-white">${obj1[0].status}</div>`
                                  : ""
                              }
															${
                                obj1[0].status === "Serious Conversations"
                                  ? `<div style="color:#FFA500 !important;" class="itms_btns my-2 bg-white">${obj1[0].status}</div>`
                                  : ""
                              }
															${
                                obj1[0].status === "Discovery Call Scheduled"
                                  ? `<div style="color:#FF0000 !important;" class="itms_btns my-2 bg-white">${obj1[0].status}</div>`
                                  : ""
                              }
															${
                                obj1[0].status === "Discovery Call Completed"
                                  ? `<div style="color:#FFCB05 !important;" class="itms_btns my-2 bg-white">${obj1[0].status}</div>`
                                  : ""
                              }
															${
                                obj1[0].status === "Boom"
                                  ? `<div style="color:#85bb65 !important;" class="itms_btns my-2 bg-white">${obj1[0].status}</div>`
                                  : ""
                              }
															${
                                obj1[0].status === "Lost"
                                  ? `<div style="color:#808080 !important;" class="itms_btns my-2 bg-white">${obj1[0].status}</div>`
                                  : ""
                              }
	                        `;

              var finalArray2 = obj1.map(function (obj2, key2) {
                row +=
                  `<div class="card banner_card_slider single_page text-center pt-1" id=` +
                  obj2.id +
                  `>
                              <div class="card-img">
                                <img class="item_imgs" src="${
                                  obj2.image != null
                                    ? obj2.image
                                    : "./Assets/img/user.png"
                                }" alt="">
                                      <span class="new-list-icon"><i class="far fa-comment-alt"></i></span>
                                                          </div>

                                                          <div class="card_body">
                                                              <h6 class="c_name">

                              ${obj2.name != null ? obj2.name : "No Name Added"}
                                                              </h6>
                                                              <p class="c_paragraph">

                              ${
                                obj2.company != null
                                  ? obj2.company
                                  : "No Company Added"
                              }

                                                              </p>
                                                              <h6 class="ceo_name">

                              ${
                                obj2.description != null
                                  ? obj2.description
                                  : "No Description Added"
                              }

                                                              </h6>
                                                              <h6 class="Location_name">
                                                                  Location
                                                              </h6>
                                                              <p class="location_paragraph">

                              ${
                                obj2.address != null
                                  ? obj2.address
                                  : "No Location Added"
                              }

                                                              </p>
                                                              <h6 class="Location_name">
                                                                  Status
                                                              </h6>
                                                              <p class="c_paragraph">

                              ${
                                obj2.status != null
                                  ? obj2.status
                                  : "No Status Added"
                              }
                                                              </p>
                                                              <h6 class="Location_name">
                                                                  Messages
                                                              </h6>
                                                              <p class="c_paragraph_box">
                              ${
                                obj2.notes != null
                                  ? obj2.notes
                                  : "No Messages Added"
                              }
                                                              </p>
                                                              <h6 class="Location_name">
                                                                  About Me
                                                              </h6>
                                                              <p class="c_paragraph">

                              ${
                                obj2.about != null
                                  ? obj2.about
                                  : "No About Added"
                              }

                                                              </p>
                                                              <h6 class="Location_name">
                                                                  Profile URL
                                                              </h6>
                                                              <p class="c_paragraph_url">

                              ${
                                obj2.profile_link != null
                                  ? obj2.profile_link
                                  : "No Profile Link Added"
                              }

                                                              </p>


                                                              <h6 class="Location_name">
                                                                  Follow up Date
                                                              </h6>
                                                              <p class="c_paragraph_date_calender">

                                                                  <span class="c-date">
                              ${
                                obj2.follow_up != null
                                  ? obj2.follow_up
                                  : "No Date Added"
                              }
                              </span>
                                                                  <span class="c-calender"><i class="far fa-calendar-alt down_arrow"></i></span>
                                                              </p>



                                                              <button class="btn btn-primary w-100 last_c_btn">MAKE CHANGES</button>

                                                          </div>

                                                      </div>`;
              });

              row += `</div>
                                            </div>


                                            </div>
                                        </div>`;

              document.getElementById("getAllCanban").innerHTML += row;
            });
          });
          document.getElementById("getAllCanban").style.display = "flex";
          document.getElementById("pills-profile").style.display = "none";
        }

        // apiCategories('status_filter');
        document.getElementById("api_return").style.display = "none";
        document.getElementById("results").style.display = "none";
        // document.getElementById('getAll').style.display = 'block';
        document.getElementById("getAllButtons").style.display = "block";
        var divs = document.getElementsByClassName("single_page");
        for (i = 0; i < divs.length; ++i) {
          var p_id = divs[i].id;

          document
            .getElementById(p_id)
            .addEventListener("click", getSinglePage);
        }
      }
    }
  };
}

function eventSave() {
  profile_check = 500;

  var access_token1 = localStorage.getItem("access_token");
  var user_id1 = localStorage.getItem("user_id");

  if (access_token1 && user_id1) {
    document
      .querySelector(".datePickerDiv")
      .classList.remove("openDatePickerDiv");

    var fname = document.getElementById("fname").value;

    document.getElementById("topTitleName").innerText = fname;

    var description = document.getElementById("description").value;
    var company = document.getElementById("company").value;
    let address = document.getElementById("address").value;
    var about = document.getElementById("about").value;
    var notes = document.getElementById("client_messages").value;
    var messages = document.getElementById("notes").innerHTML;
    var follow_up = document.getElementById("follow_up").value;
    var status = document.getElementById("status").value;
    var discovery_call = document.getElementById("discovery_call").value;
    var profile_image = document.getElementById("image").src;
    let strategy_date = document.getElementById("strategy_date").value;
    var updated_at = document.getElementById("updated_at").value;
    var conversion = document.getElementById("conversion").value;
    var total_messages = document.getElementById("total_messages").value;
    var endorsement = null;
    if (document.querySelector('input[name="endorsement"]:checked')) {
      endorsement = document.querySelector(
        'input[name="endorsement"]:checked'
      ).value;
    }
    var priority = null;
    if (document.querySelector('input[name="priority"]:checked')) {
      priority = document.querySelector('input[name="priority"]:checked').value;
    }

    var weekly_date = document.getElementById("weekly_date").value;
    var weekly_source = document.getElementById("weekly_source").value;
    // alert(weekly_source);
    var user_id = localStorage.getItem("user_id");

    var second_user_id = localStorage.getItem("second_user_id");

    if (second_user_id != null) {
      user_id = second_user_id;
    }
    var profile_link = document.getElementById("profile_link").innerText;

    const imageUrl = profile_image;

    (async () => {
      const response = await fetch(imageUrl);
      const imageBlob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(imageBlob);
      reader.onloadend = () => {
        const base64data = reader.result;
        var encodedString = btoa(base64data);
        var decodedString = atob(encodedString);
        profile_image = decodedString;
      };
    })();

    var i = setInterval(() => {
      if (profile_image != null) {
        const url = `${globalURl}/event-save`;

        var xhr1 = new XMLHttpRequest();
        xhr1.open("POST", url, true);
        xhr1.setRequestHeader("Content-Type", "application/json");
        xhr1.send(
          JSON.stringify({
            user_id: user_id,
            profile_image: profile_image,
            name: fname,
            description: description,
            company: company,
            about: about,
            address: address,
            notes: notes,
            messages: messages,
            follow_up: follow_up,
            status: status,
            discovery_call: discovery_call,
            updated_at: updated_at,
            conversion: conversion,
            total_messages: total_messages,
            endorsement: endorsement,
            priority: priority,
            profile_link: profile_link,
            weekly_date: weekly_date,
            weekly_source: weekly_source,
            strategy_date: strategy_date,
          })
        );

        xhr1.onreadystatechange = function () {
          //Call a function when the state changes.
          if (xhr1.readyState == 4 && xhr1.status == "200") {
          }
        };
        clearInterval(i);
      }
    }, 1500);
  } else {
    var myToast = Toastify({
      text: "Login to access",
      duration: 2000,
    });

    myToast.showToast();
  }
}

// ........modal code..........................................

!(function (d) {
  let date = new Date();
  let currentMonth = date.getMonth();

  var itemClassName = "carousel__photo";
  let slider_months = document.getElementsByClassName("slider_months");
  (items = d.getElementsByClassName(itemClassName)),
    (totalItems = items.length),
    (slide = currentMonth),
    (moving = true);

  function setInitialClasses() {
    items[currentMonth - 1].classList.add("prev");
    items[currentMonth].classList.add("active");
    items[currentMonth + 1].classList.add("next");
  }

  function setEventListeners() {
    var next = d.getElementsByClassName("carousel__button--next")[0],
      prev = d.getElementsByClassName("carousel__button--prev")[0];

    next.addEventListener("click", moveNext);
    prev.addEventListener("click", movePrev);
  }

  function disableInteraction() {
    moving = true;

    setTimeout(function () {
      moving = false;
    }, 500);
  }

  function moveCarouselTo(slide) {
    if (!moving) {
      disableInteraction();

      var newPrevious = slide - 1,
        newNext = slide + 1,
        oldPrevious = slide - 2,
        oldNext = slide + 2;

      if (totalItems - 1 > 3) {
        if (newPrevious <= 0) {
          oldPrevious = totalItems - 1;
        } else if (newNext >= totalItems - 1) {
          oldNext = 0;
        }

        if (slide === 0) {
          newPrevious = totalItems - 1;
          oldPrevious = totalItems - 2;
          oldNext = slide + 1;
        } else if (slide === totalItems - 1) {
          newPrevious = slide - 1;
          newNext = 0;
          oldNext = 1;
        }

        items[oldPrevious].className = itemClassName;
        items[oldNext].className = itemClassName;

        items[newPrevious].className = itemClassName + " prev";
        items[slide].className = itemClassName + " active";
        items[newNext].className = itemClassName + " next";
      }
    }
  }

  function moveNext() {
    if (!moving) {
      if (slide === totalItems - 1) {
        slide = 0;
      } else {
        slide++;
      }

      moveCarouselTo(slide);
    }

    if (slide === slider_months.length) {
      slide = slider_months.length;
      items[slide].className = itemClassName + "stopSlider";
    }
  }

  function movePrev() {
    if (!moving) {
      if (slide === 0) {
        slide = totalItems - 1;
      } else {
        slide--;
      }

      moveCarouselTo(slide);
    }
  }

  function initCarousel() {
    setInitialClasses();
    setEventListeners();

    moving = false;
  }

  initCarousel();
})(document);

//  first modal code......................................................

const modal = document.querySelector("#my-modal");
const modalBtn = document.querySelector("#modal-btn");
const closeBtn = document.querySelector(".off");

modalBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", outsideClick);

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

// second modal code...............................................

const popup = document.querySelector("#startChatModalOverlay");
const pBtn = document.querySelector("#modal-new-btn-2");
const closeBtn2 = document.querySelector(".startCancelBtn");

pBtn.addEventListener("click", openModal2);
closeBtn2.addEventListener("click", closeModal2);
window.addEventListener("click", outsideClick2);

function openModal2() {
  // popup.style.display = 'block';
  popup.style.transform = "scale(1)";
  popup.style.opacity = 1;
}

function closeModal2() {
  // popup.style.display = 'none';
  popup.style.transform = "scale(0)";
  popup.style.opacity = 0;
}

function outsideClick2(e) {
  if (e.target == popup) {
    // popup.style.display = 'none';
    popup.style.transform = "scale(0)";
    popup.style.opacity = 0;
  }
}

document.querySelectorAll(".resetBtn").forEach((item) => {
  item.addEventListener("click", (e) => {
    let parentEle = e.target.parentElement.parentElement;

    let bottomDropDownFields = parentEle.querySelector(".bottomDropDownFields");
    bottomDropDownFields.innerHTML = `
		<select class="selectFilter selectFilter1" id="statusFields" style="width: 99% !important; margin-top: 8px;">

			<option value="" selected>Select option</option>
			<option value="LinkedIn Campaign" >LinkedIn Campaign</option>
			<option value="Talking/Replied">Talking/Replied</option>
			<option value="Serious Conversations">Serious Conversations</option>
			<option value="Discovery Call Scheduled">Discovery Call Scheduled</option>
			<option value="Discovery Call Completed">Discovery Call Completed</option>
			<option value="Boom">Boom</option>
			<option value="Lost">Lost</option>

		</select>
		`;
  });
});

if (document.querySelector(".middleAddBtn")) {
  document
    .querySelector(".middleAddBtn")
    .addEventListener("click", addFilterDiv);
}

if (document.querySelector(".startApplyBtn")) {
  document
    .querySelector(".startApplyBtn")
    .addEventListener("click", ArrayMaker);
}

if (document.getElementById("weekApplyBtn")) {
  document.getElementById("weekApplyBtn").addEventListener("click", ArrayMaker);
}

if (document.getElementById("monthlyApplyBtn")) {
  document
    .getElementById("monthlyApplyBtn")
    .addEventListener("click", ArrayMaker);
}

if (document.querySelector(".selectFilter2")) {
  document
    .querySelector(".selectFilter2")
    .addEventListener("change", changeFieldData);
}

function changeFieldData() {
  let selectFilter2 = document.querySelector(".selectFilter2").selectedIndex;
  document.querySelectorAll(".selectFilter3").forEach((ele) => {
    ele.selectedIndex = selectFilter2;
  });
}

if (document.getElementById("monthlyCheckBox")) {
  document.getElementById("monthlyCheckBox").addEventListener("change", () => {
    if (document.getElementById("monthlyCheckBox").checked) {
      document.getElementById("weeklyForm").reset();
    } else {
      document.getElementById("yearlyForm").reset();
    }
  });
}

if (document.getElementById("CancelBtn1")) {
  document.getElementById("CancelBtn1").addEventListener("click", () => {
    closeModal();
    localStorage.setItem("clearWeeklyFilter", true);
    ArrayMaker();
    document.getElementById("weeklyForm").reset();
    document.getElementById("yearlyForm").reset();
  });
}

if (document.getElementById("CancelBtn2")) {
  document.getElementById("CancelBtn2").addEventListener("click", () => {
    closeModal();
    localStorage.setItem("clearWeeklyFilter", true);
    ArrayMaker();
    document.getElementById("weeklyForm").reset();
    document.getElementById("yearlyForm").reset();
  });
}

if (document.querySelector(".startCancelBtn")) {
  document.querySelector(".startCancelBtn").addEventListener("click", () => {
    closeModal2();
    getAll();
    document.querySelector(".filterBoxContainer2").innerHTML = "";
    document.getElementById("dropDown1Form").reset();
    document.getElementById("dropDown2Form").reset();
    document.querySelectorAll(".bottomDropDownFields").forEach((ele) => {
      ele.innerHTML = `
			<select class="selectFilter selectFilter1" id="statusFields" style="width: 99% !important; margin-top: 8px;">

				<option value="" selected>Select option</option>
				<option value="LinkedIn Campaign" >LinkedIn Campaign</option>
				<option value="Talking/Replied">Talking/Replied</option>
				<option value="Serious Conversations">Serious Conversations</option>
				<option value="Discovery Call Scheduled">Discovery Call Scheduled</option>
				<option value="Discovery Call Completed">Discovery Call Completed</option>
				<option value="Boom">Boom</option>
				<option value="Lost">Lost</option>

			</select>
			`;
    });
  });
}

setInterval(() => {
  document.querySelectorAll(".selectFilter4").forEach((item) => {
    item.addEventListener("change", showDropDowns);
  });
}, 200);

function showDropDowns(e) {
  let div = e.target.parentElement.parentElement;

  if (e.target.value == "status") {
    let bottomDropDownFields = div.querySelector(".bottomDropDownFields");
    bottomDropDownFields.innerHTML = `
		<select class="filterInputField selectFilter selectFilter1" id="statusFields" style="width: 99% !important; margin-top: 8px;">

			<option value="" selected>Select option</option>
			<option value="LinkedIn Campaign" >LinkedIn Campaign</option>
			<option value="Talking/Replied" >Talking/Replied</option>
			<option value="Serious Conversations">Serious Conversations</option>
			<option value="Discovery Call Scheduled">Discovery Call Scheduled</option>
			<option value="Discovery Call Completed">Discovery Call Completed</option>
			<option value="Boom">Boom</option>
			<option value="Lost">Lost</option>

		</select>
		`;
  }
  if (e.target.value == "priority") {
    let bottomDropDownFields = div.querySelector(".bottomDropDownFields");
    bottomDropDownFields.innerHTML = `
		<select class="filterInputField selectFilter selectFilter1" id="priorityFields" style="width: 99% !important; margin-top: 8px;">

		<option value="" selected>Select option</option>
			<option value="A">A</option>
			<option value="B">B</option>
			<option value="C">C</option>
			<option value="D">D</option>

		</select>
		`;
  }
  if (e.target.value == "conversion") {
    let bottomDropDownFields = div.querySelector(".bottomDropDownFields");
    bottomDropDownFields.innerHTML = `
		<select class="filterInputField selectFilter selectFilter1" style="width: 99% !important; margin-top: 8px;" id="conversionFields">

		<option value="" selected>Select option</option>
			<option value="New Job - Congrats">New Job - Congrats</option>
			<option value="Work Anniversary - Congrats">Work Anniversary - Congrats</option>
			<option value="Birthday - Congrats">Birthday - Congrats</option>
			<option value="Recently Viewed Profile">Recently Viewed Profile</option>
			<option value="Message Sequence - Connection Request">Message Sequence -
				Connection
				Request
			</option>
			<option value="Message Sequence - Welcome Message">Message Sequence - Welcome
				Message
			</option>
			<option value="Message Sequence - Follow Up">Message Sequence - Follow Up
			</option>
			<option value="Organic Outreach - Comments & Likes">Organic Outreach - Comments
				&
				Likes
			</option>
			<option value="Inbound">Inbound</option>
			<option value="Direct Outreach">Direct Outreach</option>

		</select>
		`;
  }
  if (e.target.value == "discovery_call") {
    let bottomDropDownFields = div.querySelector(".bottomDropDownFields");
    bottomDropDownFields.innerHTML = `
		<input type="date" class="filterInputField selectFilter1" id="discoveryField">
		`;
  }
  if (e.target.value == "follow_up") {
    let bottomDropDownFields = div.querySelector(".bottomDropDownFields");
    bottomDropDownFields.innerHTML = `
		<input type="date" class="filterInputField selectFilter1" id="followField">
		`;
  }
}

function searchProspects(e) {
  e.preventDefault();

  ArrayMaker();
}

var pageNo = 10;
var currentPage = 1;
var numberOfPages = 0;

document.querySelector("#first").addEventListener("click", () => {
  document.querySelector("#first").disabled = true;
  document.querySelector("#next").disabled = true;
  document.querySelector("#previous").disabled = true;
  document.querySelector("#last").disabled = true;

  currentPage = 1;
  pageNo = currentPage * 10;
  ArrayMaker();
});

document.querySelector("#next").addEventListener("click", () => {
  document.querySelector("#first").disabled = true;
  document.querySelector("#next").disabled = true;
  document.querySelector("#previous").disabled = true;
  document.querySelector("#last").disabled = true;

  currentPage = currentPage + 1;
  pageNo = currentPage * 10;

  if (currentPage >= numberOfPages) {
    currentPage = numberOfPages;
    pageNo = numberOfPages * 10;
  }
  ArrayMaker();
});

document.querySelector("#previous").addEventListener("click", () => {
  document.querySelector("#first").disabled = true;
  document.querySelector("#next").disabled = true;
  document.querySelector("#previous").disabled = true;
  document.querySelector("#last").disabled = true;

  currentPage = currentPage - 1;
  pageNo = currentPage * 10;
  if (currentPage === 0) {
    currentPage = 1;
    pageNo = 10;
  }
  ArrayMaker();
});

document.querySelector("#last").addEventListener("click", () => {
  document.querySelector("#first").disabled = true;
  document.querySelector("#next").disabled = true;
  document.querySelector("#previous").disabled = true;
  document.querySelector("#last").disabled = true;

  currentPage = numberOfPages;
  pageNo = currentPage * 10;
  ArrayMaker();
});

function ArrayMaker() {
  closeModal();
  closeModal2();

  let arr = [];
  let counter = 0;
  var user_id = localStorage.getItem("user_id");
  var second_user_id = localStorage.getItem("second_user_id");

  var select_fil = document.querySelectorAll(".selectFilter1");

  document.querySelectorAll(".selectFilter1").forEach((ele, i) => {
    // alert(i);
    if (i % 4 === 0) {
      let obj = {
        field0: select_fil[counter].value,
        field1: select_fil[counter + 1].value,
        field2: select_fil[counter + 2].value,
        field3: select_fil[counter + 3].value,
      };
      arr.push(obj);

      counter = counter + 4;

      // let convertDate = formatDate(obj.field0)
    }
  });

  globalArr = arr;

  let weekMonth = document.querySelector(".carousel__photo.active");

  let getWeekMonth = weekMonth.querySelector(".slider_months").innerText;

  let date = new Date();

  let weekYear = date.getFullYear();

  weekYear = weekYear.toString();

  weekYear = weekYear.slice(2, 4);

  let week = document.querySelectorAll(".weekName");

  let monthYear = document.querySelector(".imageDiv.active");

  let getMonthYear = monthYear.querySelector(
    ".slider_months_second_tab"
  ).innerText;

  getMonthYear = getMonthYear.slice(2, 4);

  let yearName = document.querySelectorAll(".yearName");

  let monthlyCheckBox = document.getElementById("monthlyCheckBox");

  let view = "";

  let weekArray = [];

  var search = document.getElementById("search_box").value;

  if (monthlyCheckBox.checked) {
    document.getElementById("weeklyForm").reset();

    yearName.forEach((ele) => {
      if (ele.checked === true) {
        let week1 = `${ele.value} Week 1 -${getMonthYear}`;
        let week2 = `${ele.value} Week 2 -${getMonthYear}`;
        let week3 = `${ele.value} Week 3 -${getMonthYear}`;
        let week4 = `${ele.value} Week 4 -${getMonthYear}`;
        let week5 = `${ele.value} Week 5 -${getMonthYear}`;
        weekArray.push(week1, week2, week3, week4, week5);
      }
    });
  } else {
    document.getElementById("yearlyForm").reset();

    week.forEach((ele) => {
      if (ele.checked === true) {
        weekArray.push(`${getWeekMonth} ${ele.value} -${weekYear}`);
      }
    });
  }
  let clearWeeklyFilter = localStorage.getItem("clearWeeklyFilter");

  if (clearWeeklyFilter) {
    localStorage.removeItem("clearWeeklyFilter");
    weekArray = [];
  }

  var view_type = document.getElementById("view_type").checked;

  if (view_type) {
    view = "canban";
  } else {
    view = "list";
  }

  let lists = [];

  let listIds = JSON.parse(localStorage.getItem("lists"));

  let currentUserlists = JSON.parse(localStorage.getItem("currentUserlists"));

  if (listIds) {
    listIds.map((obj) => {
      lists.push(obj.id);
    });
  } else {
    if (user_id == second_user_id || !second_user_id) {
      if (currentUserlists) {
        currentUserlists.map((obj) => {
          lists.push(obj.id);
        });
      }
    } else {
      lists = [];
    }
  }

  if (second_user_id != null) {
    user_id = second_user_id;
  }
  // var i = setTimeout(() => {
  const url = `${globalURl}/filters`;

  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      filters: arr,
      weekArray,
      view,
      search,
      user_id,
      second_user_id,
      lists,
      pageNo,
    })
  );

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      arr = JSON.parse(xhr.responseText);

      document.getElementById("getAll").innerHTML = "";
      document.getElementById("getAllCanban").innerHTML = "";
      document.getElementById("list_table_view").style.display = "block";
      document.querySelector(".paginationContainer").style.display = "flex";

      if (arr == 200) {
        document.getElementById("get_all_message").style.display = "block";
      } else {
        document.getElementById("get_all_message").style.display = "none";

        if (!view_type) {
          document.querySelector(".paginationContainer").style.display = "flex";

          if (arr.total_data) {
            numberOfPages = arr.total_data / 10;

            if (Number.isInteger(numberOfPages) === false) {
              numberOfPages = Math.floor(numberOfPages + 1);
            }
          }

          document.getElementById("next").disabled =
            currentPage === numberOfPages ? true : false;

          document.getElementById("previous").disabled =
            currentPage === 1 ? true : false;

          document.getElementById("first").disabled =
            currentPage === 1 ? true : false;

          document.getElementById("last").disabled =
            currentPage === numberOfPages ? true : false;

          arr != 200 &&
            arr.arr.map(function (obj, key) {
              row =
                `<div class="row m-0 tabs_two_main single_profile" id="` +
                obj.id +
                `">
							  <div class="tabs_cols_two_main_1">
								  <span class="left data_name">
                    ${obj.name != null ? obj.name : "No Name Added"}
                  </span>
							  </div>
							  <div class="tabs_cols_two_main_1">
                    <span class="left">
								        <img src="${
                          obj.image != null
                            ? obj.image
                            : "./Assets/img/user.png"
                        }" class="tabs_two_imgs">
										</span>
								  <span class="right"><i class="far fa-comment-alt comment_icon"></i></span>
							  </div>
							  <div class="tabs_cols_two_main_1">

								  <span class="left">
                    ${
                      obj.description != null
                        ? obj.description
                        : "No Description Added"
                    }
                  </span>

							  </div>

							  <div class="tabs_cols_two_main_1">

								  <span class="left">
                    ${obj.company != null ? obj.company : "No Company Added"}
                  </span>

							  </div>
							  <div class="tabs_cols_two_main_1"
									   >
								  <span class="Address_msg">
                    ${obj.address != null ? obj.address : "No Location Added"}
                  </span>
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
                    ${obj.follow_up != null ? obj.follow_up : "No Date Added"}
                  </span>
							  </div>
						  </div>`;
              document.getElementById("getAll").innerHTML += row;
              document.getElementById("pills-profile").style.display = "block";
              document.getElementById("getAllCanban").style.display = "none";
            });
        } else {
          document.querySelector(".paginationContainer").style.display = "none";

          var count_arr = count_arr * 100;
          var temporary = null;
          arr = Object.keys(arr).map((key) => [arr[key]]);
          var index_count = 0;

          if (arr.length == 0) {
            document.getElementById("get_all_message").style.display = "block";
          } else {
            document.getElementById("get_all_message").style.display = "none";
            var finalArray = arr.map(function (obj, key) {
              var finalArray1 = obj.map(function (obj1, key1) {
                var row = null;
                var link = obj1.length;

                if (key != 0) {
                  var margin = `<div class="slide-1 " style="width:230px !important">`;
                } else {
                  var margin = `<div class="slide-1"style="width:230px !important">`;
                }
                row =
                  margin +
                  `<div class="row m-0">
                                                    <div class="col-12 p-1">
                                                        <div class="item owl_items">
                                ${
                                  obj1[0].status === null
                                    ? `<div style="color:#0e76a8 !important;" class="itms_btns my-2 bg-white">LinkedIn Campaign</div>`
                                    : ""
                                }
                                ${
                                  obj1[0].status === "LinkedIn Campaign"
                                    ? `<div style="color:#0e76a8 !important;" class="itms_btns my-2 bg-white">${obj1[0].status} (${link})</div>`
                                    : ""
                                }
                                ${
                                  obj1[0].status === "Talking/Replied"
                                    ? `<div style="color:#0e76a8 !important;" class="itms_btns my-2 bg-white">${obj1[0].status} (${link})</div>`
                                    : ""
                                }
                                ${
                                  obj1[0].status === "Serious Conversations"
                                    ? `<div style="color:#FFA500 !important;" class="itms_btns my-2 bg-white">${obj1[0].status} (${link})</div>`
                                    : ""
                                }
                                ${
                                  obj1[0].status === "Discovery Call Scheduled"
                                    ? `<div style="color:#FF0000 !important;" class="itms_btns my-2 bg-white">${obj1[0].status} (${link})</div>`
                                    : ""
                                }
                                ${
                                  obj1[0].status === "Discovery Call Completed"
                                    ? `<div style="color:#FFCB05 !important;" class="itms_btns my-2 bg-white">${obj1[0].status} (${link})</div>`
                                    : ""
                                }
                                ${
                                  obj1[0].status === "Boom"
                                    ? `<div style="color:#85bb65 !important;" class="itms_btns my-2 bg-white">${obj1[0].status} (${link})</div>`
                                    : ""
                                }
                                ${
                                  obj1[0].status === "Lost"
                                    ? `<div style="color:#808080 !important;" class="itms_btns my-2 bg-white">${obj1[0].status} (${link})</div>`
                                    : ""
                                }
                            `;

                var finalArray2 = obj1.map(function (obj2, key2) {
                  row +=
                    `<div class="card banner_card_slider single_page text-center pt-1" id=` +
                    obj2.id +
                    `>
                    <div class="card-img">
                      <img class="item_imgs" src="${
                        obj2.image != null
                          ? obj2.image
                          : "./Assets/img/user.png"
                      }" alt="">
                            <span class="new-list-icon"><i class="far fa-comment-alt"></i></span>
                                                </div>

                                                <div class="card_body">
                                                    <h6 class="c_name">

                    ${obj2.name != null ? obj2.name : "No Name Added"}
                                                    </h6>
                                                    <p class="c_paragraph">

                    ${obj2.company != null ? obj2.company : "No Company Added"}

                                                    </p>
                                                    <h6 class="ceo_name">

                    ${
                      obj2.description != null
                        ? obj2.description
                        : "No Description Added"
                    }

                                                    </h6>
                                                    <h6 class="Location_name">
                                                        Location
                                                    </h6>
                                                    <p class="location_paragraph">

                    ${obj2.address != null ? obj2.address : "No Location Added"}

                                                    </p>
                                                    <h6 class="Location_name">
                                                        Status
                                                    </h6>
                                                    <p class="c_paragraph">

                    ${obj2.status != null ? obj2.status : "No Status Added"}
                                                    </p>
                                                    <h6 class="Location_name">
                                                        Messages
                                                    </h6>
                                                    <p class="c_paragraph_box">
                    ${obj2.notes != null ? obj2.notes : "No Messages Added"}
                                                    </p>
                                                    <h6 class="Location_name">
                                                        About Me
                                                    </h6>
                                                    <p class="c_paragraph">

                    ${obj2.about != null ? obj2.about : "No About Added"}

                                                    </p>
                                                    <h6 class="Location_name">
                                                        Profile URL
                                                    </h6>
                                                    <p class="c_paragraph_url">

                    ${
                      obj2.profile_link != null
                        ? obj2.profile_link
                        : "No Profile Link Added"
                    }

                                                    </p>


                                                    <h6 class="Location_name">
                                                        Follow up Date
                                                    </h6>
                                                    <p class="c_paragraph_date_calender">

                                                        <span class="c-date">
                    ${obj2.follow_up != null ? obj2.follow_up : "No Date Added"}
                    </span>
                                                        <span class="c-calender"><i class="far fa-calendar-alt down_arrow"></i></span>
                                                    </p>



                                                    <button class="btn btn-primary w-100 last_c_btn">MAKE CHANGES</button>

                                                </div>

                                            </div>`;
                });
                row += `</div>
                                              </div>


                                              </div>
                                          </div>`;

                document.getElementById("getAllCanban").innerHTML += row;
              });
            });
            document.getElementById("getAllCanban").style.display = "flex";
            document.getElementById("pills-home").style.display = "block";
            document.getElementById("pills-profile").style.display = "none";
          }
        }
      }
    }

    // apiCategories('status_filter');
    apiWeekly("weekly_filter");
    document.getElementById("api_return").style.display = "none";
    document.getElementById("results").style.display = "none";
    document.getElementById("getAll").style.display = "contents";
    document.getElementById("getAllButtons").style.display = "block";

    var single_profile = document.getElementsByClassName("single_profile");
    for (var i = 0; i < single_profile.length; i++) {
      single_profile[i].addEventListener("click", getSinglePage, false);
    }

    var single_profile = document.getElementsByClassName("single_page");
    for (var i = 0; i < single_profile.length; i++) {
      single_profile[i].addEventListener("click", getSinglePage, false);
    }

    let viewtype1 = document.getElementById("view_type");

    if (viewtype1.checked == true) {
      let listView = document.getElementById("items-container-1");
      listView.scroll(0, 0);
    } else {
      let listView = document.getElementById("items-container");
      listView.scroll(0, 0);
    }
  };
  clearInterval(i);
  // }, 1000);
}

function addFilterDiv() {
  var filterBoxContainer2 = document.querySelector(".filterBoxContainer2");

  filterBoxContainer2.innerHTML += `
				<div class='chatContent chatContent1'>
					<div class="activeFilterBox1">

						<select class="filterInputField selectFilter selectFilter1 selectFilter3">
							<option value="and" disabled selected>and</option>
							<option value="or" disabled>or</option>
						</select>

						<select class="filterInputField selectFilter selectFilter1 selectFilter4 selectFilter5">
							<option value="status" selected>Status</option>
							<option value="priority">Priority</option>
							<option value="conversion">Conversion messages</option>
							<option value="discovery_call">Discovery</option>
							<option value="follow_up">Follow</option>
						</select>

						<select class="filterInputField selectFilter selectFilter1" style="width: 100% !important;">
							<option value="=" selected>is</option>
							<option value="!=">is not</option>
							<option value="LIKE">contain</option>
							<option value="NOT LIKE">not contain</option>
						</select>

					</div>

					<div class="bottomDropDownFields">
						<select class="filterInputField selectFilter selectFilter1" id="statusFields" style="width: 99% !important; margin-top: 8px;">

							<option value="" selected>Select option</option>
							<option value="LinkedIn Campaign" >LinkedIn Campaign</option>
							<option value="Talking/Replied">Talking/Replied</option>
							<option value="Serious Conversations">Serious Conversations</option>
							<option value="Discovery Call Scheduled">Discovery Call Scheduled</option>
							<option value="Discovery Call Completed">Discovery Call Completed</option>
							<option value="Boom">Boom</option>
							<option value="Lost">Lost</option>

						</select>
					</div>

				<button type="button" id='deleteRow' class='deleteBtn'><i class="far fa-trash-alt"></i></button>
	`;

  document.querySelectorAll(".chatContent1").forEach((ele) => {
    let findSecondField = ele.querySelector(".selectFilter5");
    if (findSecondField.value == "status") {
      let bottomDropDownFields = ele.querySelector(".bottomDropDownFields");
      bottomDropDownFields.innerHTML = `
			<select class="filterInputField selectFilter selectFilter1" id="statusFields" style="width: 99% !important; margin-top: 8px;">

				<option value="" selected>Select option</option>
				<option value="LinkedIn Campaign" >LinkedIn Campaign</option>
				<option value="Talking/Replied">Talking/Replied</option>
				<option value="Serious Conversations">Serious Conversations</option>
				<option value="Discovery Call Scheduled">Discovery Call Scheduled</option>
				<option value="Discovery Call Completed">Discovery Call Completed</option>
				<option value="Boom">Boom</option>
				<option value="Lost">Lost</option>

			</select>
			`;
    }
    if (findSecondField.value == "priority") {
      let bottomDropDownFields = ele.querySelector(".bottomDropDownFields");
      bottomDropDownFields.innerHTML = `
			<select class="filterInputField selectFilter selectFilter1" id="priorityFields" style="width: 99% !important; margin-top: 8px;">

			<option value="" selected>Select option</option>
				<option value="A">A</option>
				<option value="B">B</option>
				<option value="C">C</option>
				<option value="D">D</option>

			</select>
			`;
    }
    if (findSecondField.value == "conversion") {
      let bottomDropDownFields = ele.querySelector(".bottomDropDownFields");
      bottomDropDownFields.innerHTML = `
			<select class="filterInputField selectFilter selectFilter1" style="width: 99% !important; margin-top: 8px;" id="conversionFields">

			<option value="" selected>Select option</option>
				<option value="New Job - Congrats">New Job - Congrats</option>
				<option value="Work Anniversary - Congrats">Work Anniversary - Congrats</option>
				<option value="Birthday - Congrats">Birthday - Congrats</option>
				<option value="Recently Viewed Profile">Recently Viewed Profile</option>
				<option value="Message Sequence - Connection Request">Message Sequence -
					Connection
					Request
				</option>
				<option value="Message Sequence - Welcome Message">Message Sequence - Welcome
					Message
				</option>
				<option value="Message Sequence - Follow Up">Message Sequence - Follow Up
				</option>
				<option value="Organic Outreach - Comments & Likes">Organic Outreach - Comments
					&
					Likes
				</option>
				<option value="Inbound">Inbound</option>
				<option value="Direct Outreach">Direct Outreach</option>

			</select>
			`;
    }
    if (findSecondField.value == "discovery_call") {
      let bottomDropDownFields = ele.querySelector(".bottomDropDownFields");
      bottomDropDownFields.innerHTML = `
			<input type="date" class="filterInputField selectFilter1" id="discoveryField">
			`;
    }
    if (findSecondField.value == "follow_up") {
      let bottomDropDownFields = ele.querySelector(".bottomDropDownFields");
      bottomDropDownFields.innerHTML = `
			<input type="date" class="filterInputField selectFilter1" id="followField">
			`;
    }
  });

  if (document.querySelector(".deleteBtn")) {
    document.querySelectorAll(".deleteBtn").forEach((ele) => {
      ele.addEventListener("click", deleteFilterDiv);
    });
  }

  changeFieldData();
}

function deleteFilterDiv(e) {
  let contentDiv1 = e.target.parentElement.parentElement;
  contentDiv1.remove();
}

// weekly and the monthly tabs slide code AW..............................................

let mydive = document.querySelector(".slider-2");
mydive.addEventListener("click", myFunction);

function myFunction() {
  const show = document.querySelector(".first-tabs-data");
  if (show.style.display == "none") {
    show.style.display = "block";
  } else {
    show.style.display = "none";
  }
}

let mydive2 = document.querySelector(".slider-2");
mydive2.addEventListener("click", myFunction2);

function myFunction2() {
  const show = document.querySelector(".second-tabs-data");
  if (show.style.display == "block") {
    show.style.display = "none";
  } else {
    show.style.display = "block";
  }
}

// third modal code AW...............................................

const popthird = document.querySelector("#my-new-modal-3");
const popthirdBtn = document.querySelector("#modal-new-btn-3");
const popthirdBtnclose = document.querySelector(".close");

if (document.querySelector("#modal-new-btn-3")) {
  popthirdBtn.addEventListener("click", openModal3);
}

if (document.querySelector(".close")) {
  popthirdBtnclose.addEventListener("click", closeModal3);
}

window.addEventListener("click", outsideClick3);

function openModal3() {
  popthird.style.display = "block";
}

function closeModal3() {
  popthird.style.display = "none";
}

function outsideClick3(e) {
  if (e.target == popthird) {
    popthird.style.display = "none";
  }
}

/// ...................................... Monthly slider AW....................................

!(function () {
  var itemClassNamenew = "imageDiv";
  let slider_monthsnew = document.getElementsByClassName(
    "slider_months_second_tab"
  );
  (itemsnew = document.getElementsByClassName(itemClassNamenew)),
    (totalItemsnew = itemsnew.length),
    (slidenew = 0),
    (movingnew = true);

  function setInitialClassesnew() {
    itemsnew[totalItemsnew - 1].classList.add("prev");
    itemsnew[0].classList.add("active");
    itemsnew[1].classList.add("next");
  }

  function setEventListenersnew() {
    var nextnew = document.getElementsByClassName("new_slide_arrow_first")[0],
      prevnew = document.getElementsByClassName("new_slide_arrow_second")[0];

    nextnew.addEventListener("click", moveNextnew);
    prevnew.addEventListener("click", movePrevnew);
  }

  function disableInteractionnew() {
    movingnew = true;

    setTimeout(function () {
      movingnew = false;
    }, 500);
  }

  function moveCarouselTonew(slidenew) {
    if (!movingnew) {
      disableInteractionnew();

      var newPreviousnew = slidenew - 1,
        newNextnew = slidenew + 1,
        oldPreviousnew = slidenew - 2,
        oldNextnew = slidenew + 2;

      if (totalItemsnew - 1 > 2) {
        if (newPreviousnew <= 0) {
          oldPreviousnew = totalItemsnew - 1;
        } else if (newNextnew >= totalItemsnew - 1) {
          oldNextnew = 0;
        }

        if (slidenew === 0) {
          newPreviousnew = totalItemsnew - 1;
          oldPreviousnew = totalItemsnew - 2;
          oldNextnew = slidenew + 1;
        } else if (slidenew === totalItemsnew - 1) {
          newPreviousnew = slidenew - 1;
          newNextnew = 0;
          oldNextnew = 1;
        }

        itemsnew[oldPreviousnew].className = itemClassNamenew;
        itemsnew[oldNextnew].className = itemClassNamenew;

        itemsnew[newPreviousnew].className = itemClassNamenew + " prev";
        itemsnew[slidenew].className = itemClassNamenew + " active";
        itemsnew[newNextnew].className = itemClassNamenew + " next";
      }
    }
  }

  function moveNextnew() {
    if (!movingnew) {
      if (slidenew === totalItemsnew - 1) {
        slidenew = 0;
      } else {
        slidenew++;
      }

      moveCarouselTonew(slidenew);
    }

    if (slidenew === slider_monthsnew.length) {
      slidenew = slider_monthsnew.length;
      itemsnew[slidenew].className = itemClassNamenew + "stopSlider";
    }
  }

  function movePrevnew() {
    if (!movingnew) {
      if (slidenew === 0) {
        slidenew = totalItemsnew - 1;
      } else {
        slidenew--;
      }

      moveCarouselTonew(slidenew);
    }
  }

  function initCarouselnew() {
    setInitialClassesnew();
    setEventListenersnew();

    movingnew = false;
  }

  initCarouselnew();
})();

document.getElementById("openDatePicker").addEventListener("click", () => {
  var access_token = localStorage.getItem("access_token");
  var user_id = localStorage.getItem("user_id");
  var prospect = localStorage.getItem("prospect_id");

  if (access_token && user_id && prospect) {
    document
      .querySelector(".datePickerDiv")
      .classList.toggle("openDatePickerDiv");
  } else {
    var myToast = Toastify({
      text: "Prospect not saved",
      duration: 2000,
    });

    myToast.showToast();
  }
});

if (document.getElementById("comment_btn")) {
  document
    .getElementById("comment_btn")
    .addEventListener("click", openProspectModal);
}

var prospectMsgModal = document.getElementById("prospectChatModal");

function openProspectModal() {
  prospectMsgModal.style.transform = "scale(1)";
  prospectMsgModal.style.opacity = 1;

  document.querySelector(".groupBoxContainer1").innerHTML = "";

  var user_id = localStorage.getItem("user_id");

  const url = `${globalURl}/check_groups/${user_id}/0`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.length > 0) {
        userData.map((item) => {
          document.querySelector(".groupBoxContainer1").innerHTML += `
            <div style="position: relative;width: calc(30% - 20px); margin: auto 15px;"">
            <div class="groupBox" data-group_id=${
              item.group_id
            } style="border-radius: 50%;
            padding: 5px;

            position: relative;">
              ${
                item.image
                  ? `<img src="${item.image}" class="userIconDemo" data-receiverid="32">`
                  : `<img src="./Assets/img/group-bg.png" class="userIconDemo" data-receiverid="32">`
              }


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

        document.querySelectorAll(".groupBox").forEach((element) => {
          element.addEventListener("click", activeUserChat);
        });
      } else {
        document.querySelector(".groupContainer").innerHTML = `
			<h1>No groups to show</h1>
	  	`;
      }
    }
  };
}

var optionChooseModal = document.getElementById("optionChooseModal");
var optionChooseFilterModal = document.getElementById(
  "optionChooseFilterModal"
);

function openOptionChooseModal() {
  optionChooseModal.style.transform = "scale(1)";
  optionChooseModal.style.opacity = 1;
}

if (document.getElementById("optionChooseModalCloseBtn")) {
  document
    .getElementById("optionChooseModalCloseBtn")
    .addEventListener("click", () => {
      optionChooseModal.style.transform = "scale(0)";
      optionChooseModal.style.opacity = 0;
    });
}

window.addEventListener("click", optionChooseModalClose);

function optionChooseModalClose(e) {
  if (e.target == optionChooseModal) {
    optionChooseModal.style.transform = "scale(0)";
    optionChooseModal.style.opacity = 0;
  }
  if (e.target == optionChooseFilterModal) {
    optionChooseFilterModal.style.transform = "scale(0)";
    optionChooseFilterModal.style.opacity = 0;
  }
}

function activeUserChat(e) {
  document.querySelectorAll(".groupBox").forEach((ele) => {
    ele.classList.remove("groupBoxClicked");
  });

  e.currentTarget.classList.add("groupBoxClicked");

  let group_id = e.currentTarget.getAttribute("data-group_id");

  localStorage.setItem("group_id", group_id);

  document.getElementById("shareInGroupsModal").style.transform = "scale(1)";
  document.getElementById("shareInGroupsModal").style.opacity = 1;
}

document
  .getElementById("shareInGroupsModalCloseBtn")
  .addEventListener("click", closeShareInGroupsModal);

function closeShareInGroupsModal() {
  document.getElementById("shareInGroupsModal").style.transform = "scale(0)";
  document.getElementById("shareInGroupsModal").style.opacity = 0;

  document.querySelectorAll(".groupBox").forEach((ele) => {
    ele.classList.remove("groupBoxClicked");
  });
}

document
  .getElementById("prospectModalCloseBtn")
  .addEventListener("click", prospectModalClose);

function prospectModalClose() {
  prospectMsgModal.style.transform = "scale(0)";
  prospectMsgModal.style.opacity = 0;

  document.querySelectorAll(".groupBox").forEach((element) => {
    element.classList.remove("groupBoxClicked");
  });
}

if (document.querySelector(".canban-item-4")) {
  document.querySelector(".canban-item-4").addEventListener("click", () => {
    window.location.href = "home.html";
  });
}

if (document.querySelector(".canban-item-3")) {
  document.querySelector(".canban-item-3").addEventListener("click", () => {
    localStorage.setItem("openchatbox", "yeen");
    window.location.href = "messagebox.html";
  });
}

if (document.getElementById("shareProspectBtn")) {
  document
    .getElementById("shareProspectBtn")
    .addEventListener("click", shareProspectData);
}

setTimeout(() => {
  if (document.getElementById("sharedm1")) {
    document.getElementById("sharedm1").addEventListener("click", () => {
      var element = document.getElementById("value1").value;
      localStorage.setItem("reciever_id", element);
      openDirectChat(element);
    });
  }
  if (document.getElementById("sharedm2")) {
    document.getElementById("sharedm2").addEventListener("click", () => {
      var element = document.getElementById("value2").value;
      localStorage.setItem("reciever_id", element);
      openDirectChat(element);
    });
  }
  if (document.getElementById("sharedm3")) {
    document.getElementById("sharedm3").addEventListener("click", () => {
      var element = document.getElementById("value3").value;
      localStorage.setItem("reciever_id", element);
      openDirectChat(element);
    });
  }
  if (document.getElementById("sharedm4")) {
    document.getElementById("sharedm4").addEventListener("click", () => {
      var element = document.getElementById("value4").value;
      localStorage.setItem("reciever_id", element);
      openDirectChat(element);
    });
  }
  if (document.getElementById("sharedm5")) {
    document.getElementById("sharedm5").addEventListener("click", () => {
      var element = document.getElementById("value5").value;
      localStorage.setItem("reciever_id", element);
      openDirectChat(element);
    });
  }
  if (document.getElementById("sharedm6")) {
    document.getElementById("sharedm6").addEventListener("click", () => {
      var element = document.getElementById("value6").value;
      localStorage.setItem("reciever_id", element);
      openDirectChat(element);
    });
  }
}, 1000);
function openDirectChat(element) {
  localStorage.setItem("isChatIcon", true);
  window.location.href = "messagebox.html";
}

function shareProspectData() {
  // openOptionChooseModal();
  var user_id = localStorage.getItem("user_id");
  var group_id = localStorage.getItem("group_id");
  var prospect_id = localStorage.getItem("prospect_id");

  if (prospect_id) {
    if (group_id) {
      prospectModalClose();

      const url = `${globalURl}/send_group_message`;

      let xhr = new XMLHttpRequest();

      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          user_id,
          group_id,
          prospect_id,
          text: "",
          shared: "no",
        })
      );

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let userData = JSON.parse(xhr.responseText);
          localStorage.removeItem("sub_group_id");
          localStorage.removeItem("subgroup_id");
          localStorage.setItem("shared", true);
          window.location.href = "messagebox.html";
        }
      };
    } else {
      var myToast = Toastify({
        text: "At least Select 1 Group",
        duration: 2000,
      });
      myToast.showToast();
    }
  } else {
    var myToast = Toastify({
      text: "Save prospect to proceed",
      duration: 2000,
    });
    myToast.showToast();
  }
}

setInterval(() => {
  if (document.getElementById("dbLogo")) {
    var dbLogo = document.getElementById("dbLogo");
    dbLogo.addEventListener("click", () => {
      window.location.reload();
    });
  }
}, 100);

let logoInterval = setInterval(() => {
  if (document.querySelector(".img__logo")) {
    // clearInterval(logoInterval)
    document.querySelector(".img__logo").addEventListener("click", gettohome);
  }
});
document.getElementById("comment_box").addEventListener("keyup", getMutuals);

function getMutuals() {
  let text = document.getElementById("comment_box").value;
  let lenght = 0;
  const myArray = text.split("@");

  let mutuals = text.includes("@");

  if (mutuals == true) {
    length_second = myArray[myArray.length - 1].length;
    if (length_second <= 15) {
      const myArray = text.split("@");
      length = myArray[myArray.length - 1].length;
      let value = text.slice(-1);

      if (value == "@" && length == 0) {
        var user_id = localStorage.getItem("user_id");
        const url1 = `${globalURl}/chats/` + user_id;
        var xhr1 = new XMLHttpRequest();
        xhr1.open("GET", url1, true);
        xhr1.setRequestHeader("Content-Type", "application/json");
        xhr1.send();

        xhr1.onreadystatechange = function () {
          //Call a function when the state changes.
          if (xhr1.readyState == 4 && xhr1.status == 200) {
            let userData = JSON.parse(xhr1.responseText);
            document.getElementById("myDropdown").innerHTML = "";

            userData.map((item, i, arr) => {
              var row =
                item.name != null
                  ? `<span data-id=${item.linked_to_id} data-email=${item.mutual} class="addtocomment" >${item.mutual}</span>`
                  : "";
              document.getElementById("myDropdown").innerHTML += row;
            });
            document.querySelectorAll(".addtocomment").forEach((ele) => {
              ele.addEventListener("click", addMemberToComment);
            });
          }
        };
        document.getElementById("myDropdown").style.display = "Block";
      }
      if (value != "@" && length > 0) {
        var user_id = localStorage.getItem("user_id");
        const url1 =
          `${globalURl}/addMemberComment/` +
          user_id +
          `/` +
          myArray[myArray.length - 1];
        var xhr1 = new XMLHttpRequest();
        xhr1.open("GET", url1, true);
        xhr1.setRequestHeader("Content-Type", "application/json");
        xhr1.send();

        xhr1.onreadystatechange = function () {
          //Call a function when the state changes.
          if (xhr1.readyState == 4 && xhr1.status == 200) {
            let userData = JSON.parse(xhr1.responseText);
            document.getElementById("myDropdown").innerHTML = "";

            userData.map((item, i, arr) => {
              var row =
                item.name != null
                  ? `<span data-id=${item.linked_to_id} data-email=${item.mutual} class="addtocomment" >${item.mutual}</span>`
                  : "";
              document.getElementById("myDropdown").innerHTML += row;
            });
            document.querySelectorAll(".addtocomment").forEach((ele) => {
              ele.addEventListener("click", addMemberToComment);
            });
          }
          document.getElementById("myDropdown").style.display = "Block";
        };
      }

      if (value != "@" && lenght == 0) {
        document.getElementById("myDropdown").style.display = "none";
        document.getElementById("myDropdown").innerHTML = "";
      }
    } else {
      document.getElementById("myDropdown").style.display = "none";
    }
  } else {
    document.getElementById("myDropdown").style.display = "none";
  }
}

function addMemberToComment(e) {
  var check = "false";
  var receiver_id = e.currentTarget.getAttribute("data-id");
  var prospect_id = localStorage.getItem("prospect_id");
  var email = e.currentTarget.getAttribute("data-email");

  if (!prospect_id) {
    var myToast = Toastify({
      text: "Save This Prospect To Start A Collaboration Chat",
      duration: 2000,
    });

    myToast.showToast();
  } else {
    msg = document.getElementById("comment_box").value;
    yeen = msg.split("@");
    yeen[yeen.length - 1] = email;
    let string = yeen.join("");

    let tagDiv = ` <span class='tag' data-id='${receiver_id}'>${
      yeen[yeen.length - 1]
    } <i class="fas fa-times tagIcon"></i></span>`;

    commentArray.forEach((item) => {
      if (item === receiver_id) {
        check = "true";
      }
      if (check == true) {
        commentArray.push(receiver_id);
        document.querySelector(".taggedUser").innerHTML += tagDiv;
      }
    });

    if (check == "false") {
      commentArray.push(receiver_id);
      document.querySelector(".taggedUser").innerHTML += tagDiv;
    }

    localStorage.setItem("commentID", JSON.stringify(commentArray));

    document.querySelectorAll(".tagIcon").forEach((ele, i) => {
      ele.addEventListener("click", deleteTag);
    });

    document.getElementById("comment_box").value = `${string} `;
    document.getElementById("myDropdown").style.display = "none";
  }
}

function deleteTag(e) {
  let receiver_id = e.target.parentElement.getAttribute("data-id");
  let tagRemove = JSON.parse(localStorage.getItem("commentID"));
  let userTags = document.getElementsByClassName("tag");

  if (tagRemove) {
    tagRemove.filter((obj, i) => {
      if (obj == receiver_id) {
        if (userTags[i].getAttribute("data-id") == receiver_id) {
          commentArray.splice(i, 1);
          tagRemove.splice(i, 1);
          e.target.parentElement.remove();
          localStorage.setItem("commentID", JSON.stringify(tagRemove));
        }
      }
    });
  }
}

function gettohome() {
  window.location.href = "home.html";
}

if (document.querySelector(".new-open-clender")) {
  document
    .querySelector(".new-open-clender")
    .addEventListener("click", openDataInCalendar);
}

function openDataInCalendar() {
  var access_token = localStorage.getItem("access_token");
  var user_id = localStorage.getItem("user_id");
  var prospect_id = localStorage.getItem("prospect_id");

  if (access_token && user_id) {
    if (prospect_id) {
      if (document.getElementById("follow_up").value) {
        let getProspectFollowUp = document.getElementById("follow_up").value;
        let getProspectMonth = Number(getProspectFollowUp.slice(5, 7));
        let getProspectDate = Number(getProspectFollowUp.slice(8, 10));
        let prospect_id = localStorage.getItem("prospect_id");
        // Follow Up Month

        if (getProspectFollowUp.slice(5, 7).includes("0")) {
          getProspectMonth = Number(getProspectFollowUp.slice(6, 7));
        } else {
          getProspectMonth = Number(getProspectFollowUp.slice(5, 7));
        }

        // Follow Up Date

        if (getProspectFollowUp.slice(9, 10) == "0") {
          getProspectDate = Number(getProspectFollowUp.slice(8, 10));
        }

        localStorage.setItem("prospectDate", getProspectDate);
        localStorage.setItem("prospectMonth", getProspectMonth);
        localStorage.setItem("prospect_id_calender", prospect_id);

        window.location.href = "calender.html";
      } else {
        var myToast = Toastify({
          text: "No follow-up date for this prospect",
          duration: 2000,
        });
        myToast.showToast();
      }
    } else {
      var myToast = Toastify({
        text: "Save prospect to proceed",
        duration: 2000,
      });

      myToast.showToast();
    }
  } else {
    var myToast = Toastify({
      text: "Login to access",
      duration: 2000,
    });

    myToast.showToast();
  }
}

if (document.querySelector(".modal-overlay")) {
  document.querySelector(".modal-overlay").addEventListener("click", () => {
    document.getElementById("comments_data").innerHTML = "";
    document.getElementById("comments_data").innerHTML =
      '<div class="loader1"></div>';
  });
}

let yInterval = setInterval(() => {
  var access_token = localStorage.getItem("access_token");
  var user_id = localStorage.getItem("user_id");

  if (access_token && user_id) {
    clearInterval(yInterval);
    document.getElementById("client_messages").disabled = false;
  } else {
    document.getElementById("client_messages").disabled = true;
  }
}, 100);

if (document.getElementById("listing")) {
  document.getElementById("listing").addEventListener("click", showListing);
}

function showListing() {
  localStorage.removeItem("editList");

  document.getElementById("optionChooseModal").style.transform = "scale(1)";
  document.getElementById("optionChooseModal").style.opacity = 1;

  let user_id = localStorage.getItem("user_id");
  let prospect_id = localStorage.getItem("prospect_id");

  var second_user_id = localStorage.getItem("second_user_id");

  if (second_user_id != null) {
    user_id = second_user_id;
  }

  const url = `${globalURl}/get_lists/${user_id}/${prospect_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText);

      let openChooseContainer = document.querySelector(".openChooseContainer");
      openChooseContainer.innerHTML = "";

      if (response) {
        response.data.length > 0
          ? response.data.map((obj) => {
              openChooseContainer.innerHTML += `
          <div class="listItemContainer" data-id=${obj.id} data-hex=${obj.hex} >
            <div class="listDelIcon" style="margin-right: 10px">
              <i class="fas fa-trash-alt trashIcon"></i>
            </div>
            <div class="listContentContainer" style="margin-right: 10px">
              <div class="listContent" style='color: ${obj.hex} !important;'>${
                obj.title?.length > 20
                  ? `${obj.title.slice(0, 30)}...`
                  : obj.title
              }</div>
              <input type="hidden" class="listDesc1" value="${
                obj.description != null ? obj.description : ""
              }"/>
              <div class="listToggleBox" ${
                obj.check != false ? `style='background-color: ${obj.hex}'` : ""
              }></div>
              </div>
              <i class="far fa-edit editIcon"></i>
          </div>
          `;
            })
          : (openChooseContainer.innerHTML = `<div class="noListMessage">No lists to show</div>`);

        document.querySelectorAll(".listContentContainer").forEach((ele) => {
          ele.addEventListener("click", checkOrUncheckedList);
        });

        document.querySelectorAll(".editIcon").forEach((ele) => {
          ele.addEventListener("click", updateEditLists);
        });
      }
    }
  };
}

function checkOrUncheckedList(e) {
  let listId = e.currentTarget.parentElement.getAttribute("data-id");
  let hex = e.currentTarget.parentElement.getAttribute("data-hex");
  let listToggleBox =
    e.currentTarget.parentElement.querySelector(".listToggleBox");

  let prospect_id = localStorage.getItem("prospect_id");
  let user_id = localStorage.getItem("user_id");

  var second_user_id = localStorage.getItem("second_user_id");

  if (second_user_id != null) {
    user_id = second_user_id;
  }

  const url = `${globalURl}/add_to_lists/${user_id}/${prospect_id}/${listId}`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText);

      if (response.status == "Added") {
        listToggleBox.style.backgroundColor = hex;

        var myToast = Toastify({
          text: "Prospect added to list",
          duration: 2000,
        });

        myToast.showToast();
      }

      if (response.status == "Deleted") {
        listToggleBox.style.backgroundColor = "#EAEAEA";

        var myToast = Toastify({
          text: "Prospect deleted from list",
          duration: 2000,
        });

        myToast.showToast();
      }
    }
  };
}

let modalInterval = setInterval(() => {
  if (document.querySelector(".createListBtn")) {
    clearInterval(modalInterval);
    document.querySelectorAll(".createListBtn").forEach((ele) => {
      ele.addEventListener("click", () => {
        document.getElementById("createListModal").style.transform = "scale(1)";
        document.getElementById("createListModal").style.opacity = 1;
        document.getElementById("listTitle").value = "";
        document.getElementById("listDesc").value = "";

        document.getElementById("createListHeading").style.display = "block";
        document.getElementById("updateListHeading").style.display = "none";

        document.querySelector(".createNewListBtn").style.display = "block";
        document.querySelector(".updateNewListBtn").style.display = "none";

        document.querySelectorAll(".colorTag").forEach((ele) => {
          ele.classList.remove("colorTagSelected");
        });
        document.querySelector(".colorTag").classList.add("colorTagSelected");
      });
    });
  }

  if (document.getElementById("createListModalCloseBtn")) {
    clearInterval(modalInterval);
    document
      .getElementById("createListModalCloseBtn")
      .addEventListener("click", () => {
        document.getElementById("createListModal").style.transform = "scale(0)";
        document.getElementById("createListModal").style.opacity = 0;
      });
  }

  if (document.querySelector(".colorTag")) {
    document.querySelectorAll(".colorTag").forEach((ele) => {
      ele.addEventListener("click", (e) => {
        document.querySelectorAll(".colorTag").forEach((ele1) => {
          ele1.classList.remove("colorTagSelected");
        });
        e.currentTarget.classList.add("colorTagSelected");
      });
    });
  }

  if (document.querySelector(".createNewListBtn")) {
    clearInterval(modalInterval);
    document
      .querySelector(".createNewListBtn")
      .addEventListener("click", createNewList);
  }

  if (document.querySelector(".updateNewListBtn")) {
    clearInterval(modalInterval);
    document
      .querySelector(".updateNewListBtn")
      .addEventListener("click", createNewList);
  }
}, 100);

function createNewList() {
  let title = document.getElementById("listTitle").value;
  let description = document.getElementById("listDesc").value;
  let hex = document
    .querySelector(".colorTagSelected")
    .getAttribute("data-color-value");
  let user_id = localStorage.getItem("user_id");

  if (!title) {
    var myToast = Toastify({
      text: "Please add the following field(s)",
      duration: 2000,
    });

    myToast.showToast();
  } else {
    document.getElementById("createListModal").style.transform = "scale(0)";
    document.getElementById("createListModal").style.opacity = 0;

    let editCheck = localStorage.getItem("editList");

    if (!editCheck) {
      var second_user_id = localStorage.getItem("second_user_id");

      if (second_user_id != null) {
        user_id = second_user_id;
      }

      const url = `${globalURl}/add_list`;

      const xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          user_id,
          title,
          description,
          hex,
        })
      );

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let response = JSON.parse(xhr.responseText);

          if (
            document.getElementById("list_table_view").style.display == "none"
          ) {
            var test = setInterval(() => {
              showListing();
              clearInterval(test);
            }, 300);
          }
          if (
            document.getElementById("list_table_view").style.display != "none"
          ) {
            filterLisiting();
          }
        }
      };
    }
    if (editCheck) {
      localStorage.removeItem("editList");

      let list_id = localStorage.getItem("list_id");

      const url = `${globalURl}/edit_list`;

      const xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          id: list_id,
          title,
          description,
          hex,
        })
      );

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let response = JSON.parse(xhr.responseText);

          if (response.status == "Updated") {
            showListing();
            localStorage.removeItem("list_id");
          }
        }
      };
    }
  }
}

function updateEditLists(e) {
  localStorage.setItem("editList", true);

  let currentList = e.currentTarget.parentElement;

  let list_id = currentList.getAttribute("data-id");

  let list_content = currentList.querySelector(".listContent").innerText;

  let listDesc = currentList.querySelector(".listDesc1").value;

  document.getElementById("listTitle").value = list_content;

  document.getElementById("listDesc").value = listDesc;

  localStorage.setItem("list_id", list_id);

  document.getElementById("createListModal").style.transform = "scale(1)";
  document.getElementById("createListModal").style.opacity = 1;

  document.getElementById("createListHeading").style.display = "none";
  document.getElementById("updateListHeading").style.display = "block";

  document.querySelector(".createNewListBtn").style.display = "none";
  document.querySelector(".updateNewListBtn").style.display = "block";

  document.querySelectorAll(".colorTag").forEach((ele) => {
    ele.classList.remove("colorTagSelected");
  });

  let colorHex = currentList.getAttribute("data-hex");

  document.querySelectorAll(".colorTag").forEach((ele) => {
    if (ele.getAttribute("data-color-value") == colorHex) {
      ele.classList.add("colorTagSelected");
    }
  });
}

let deleteListInterval = setInterval(() => {
  document.querySelectorAll(".listDelIcon").forEach((ele) => {
    ele.addEventListener("click", (e) => {
      let user_id = localStorage.getItem("user_id");
      let listId = e.currentTarget.parentElement.getAttribute("data-id");

      var second_user_id = localStorage.getItem("second_user_id");

      if (second_user_id != null) {
        user_id = second_user_id;
      }

      const url = `${globalURl}/delete_lists/${user_id}/${listId}`;

      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send();

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let response = JSON.parse(xhr.responseText);

          if (response.status == "Deleted") {
            showListing();
          }
        }
      };
    });
  });
}, 1000);

if (document.querySelector(".swipeRightContainer")) {
  document
    .querySelector(".swipeRightContainer")
    .addEventListener("click", swipeRightContainer);
}

let swipeArray = [0, 200, 400, 650];
let count = 0;

function swipeRightContainer() {
  let viewtype = document.getElementById("view_type");
  if (viewtype.checked == true) {
    count++;

    if (count == swipeArray.length) {
      count = swipeArray.length - 1;
    }

    let listView = document.getElementById("items-container-1");
    listView.scroll(swipeArray[count], 0);
  } else {
    count++;

    if (count == swipeArray.length) {
      count = swipeArray.length - 1;
    }

    let listView = document.getElementById("items-container");
    listView.scroll(swipeArray[count], 0);
  }
}

if (document.querySelector(".swipeLeftContainer")) {
  document
    .querySelector(".swipeLeftContainer")
    .addEventListener("click", swipeLeftContainer);
}

function swipeLeftContainer() {
  let viewtype = document.getElementById("view_type");

  if (viewtype.checked == true) {
    count--;

    let listView = document.getElementById("items-container-1");
    listView.scroll(swipeArray[count], 0);

    if (count <= 0) {
      count = 0;
    }
  } else {
    count--;

    let listView = document.getElementById("items-container");
    listView.scroll(swipeArray[count], 0);

    if (count <= 0) {
      count = 0;
    }
  }
}

function renderListItemInPiplines() {
  let user_id = localStorage.getItem("user_id");
  let prospect_id = localStorage.getItem("prospect_id");

  var second_user_id = localStorage.getItem("second_user_id");

  if (second_user_id != null) {
    user_id = second_user_id;
  }

  const url = `${globalURl}/get_lists/${user_id}/${prospect_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText);

      document.getElementById("listItemContainer").style.display = "flex";

      document.getElementById("listItemContainer").innerHTML = "";

      response.data?.length > 0
        ? response.data.slice(0, 4).map((obj) => {
            document.getElementById("listItemContainer").innerHTML += `
        <span class="text-right1" data-listId=${obj.id} data-hex=${
              obj.hex
            } style="background-color: ${obj.hex};">${
              obj.title.length > 6 ? `${obj.title.slice(0, 8)}...` : obj.title
            }</span>
        `;
          })
        : (document.getElementById("listItemContainer").innerHTML = `
        <span class="text-right1" style="background-color: #084DD1;">No list to show </span>
      `);
    }
  };
}

if (document.getElementById("listingModal")) {
  document
    .getElementById("listingModal")
    .addEventListener("click", filterLisiting);
}

function filterLisiting() {
  document.getElementById("optionChooseFilterModal").style.transform =
    "scale(1)";
  document.getElementById("optionChooseFilterModal").style.opacity = 1;

  let user_id = localStorage.getItem("user_id");
  let prospect_id = localStorage.getItem("prospect_id");

  var second_user_id = localStorage.getItem("second_user_id");

  if (second_user_id != null) {
    user_id = second_user_id;
  }

  const url = `${globalURl}/get_lists/${user_id}/${prospect_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText);

      let openChooseContainer = document.querySelector(
        ".openChooseFilterContainer"
      );
      openChooseContainer.innerHTML = "";

      if (response) {
        response.data?.length > 0
          ? response.data.map((obj) => {
              openChooseContainer.innerHTML += `
          <div class="listItemContainer" data-listId=${obj.id} >
            <div class="listDelIcon1">
              <i class="fas fa-trash-alt trashIcon1"></i>
            </div>
            <div class="listContentContainer1">
              <div class="listContent" style='color: #999 !important;'>${obj.title}</div>
              <div class="listToggleBox1" data-listId=${obj.id} data-hex=${obj.hex}></div>
            </div>
          </div>
          `;
            })
          : (openChooseContainer.innerHTML = `<div class="noListMessage">No lists to show</div>`);

        document.querySelectorAll(".listContentContainer1").forEach((ele) => {
          ele.addEventListener("click", checkFilterList);
        });

        let lists = JSON.parse(localStorage.getItem("lists"));
        if (!lists) {
          lists = JSON.parse(localStorage.getItem("currentUserlists"));
        }
        if (lists) {
          lists.map((obj) => {
            document.querySelectorAll(".listToggleBox1").forEach((ele) => {
              if (ele.getAttribute("data-listId") == obj.id) {
                ele.classList.add("listToggleBox1Checked");
              }
            });
          });
        }
      }
    }
  };
}

let listArr = [];
let updateSpanArr1 = [];
let globalCurrentUserList = [];

function checkFilterList(e) {
  document.getElementById("listItemContainer").style.display = "flex";

  e.currentTarget
    .querySelector(".listToggleBox1")
    .classList.toggle("listToggleBox1Checked");

  if (
    e.currentTarget
      .querySelector(".listToggleBox1")
      .className.includes("listToggleBox1Checked") == true
  ) {
    let listId = e.currentTarget
      .querySelector(".listToggleBox1Checked")
      .getAttribute("data-listId");
    let color = e.currentTarget
      .querySelector(".listToggleBox1Checked")
      .getAttribute("data-hex");
    let title = e.currentTarget.querySelector(".listContent").innerText;

    let user_id = localStorage.getItem("user_id");
    let second_user_id = localStorage.getItem("second_user_id");

    listArr.push({ id: listId, hex: color, title });

    if (user_id == second_user_id || !second_user_id) {
      globalCurrentUserList.push({ id: listId, hex: color, title, user_id });
      let newListArr1 = [...new Set(globalCurrentUserList)];
      localStorage.setItem("currentUserlists", JSON.stringify(newListArr1));
    }

    let newListArr = [...new Set(listArr)];

    localStorage.setItem("lists", JSON.stringify(newListArr));
  } else {
    let listId = e.currentTarget
      .querySelector(".listToggleBox1")
      .getAttribute("data-listId");

    listArr.filter((obj, i) => {
      if (obj.id == listId) {
        listArr.splice(i, 1);
        localStorage.setItem("lists", JSON.stringify(listArr));
      }
    });
  }
  let listLocal = JSON.parse(localStorage.getItem("lists"));

  document.getElementById("listItemContainer").innerHTML = "";

  listLocal?.length > 0 &&
    listLocal.slice(0, 4).map((obj) => {
      document.getElementById("listItemContainer").innerHTML += `
      <span class="text-right1" data-listId=${obj.id} data-hex=${
        obj.hex
      } style="background-color: ${obj.hex};">${
        obj.title.length > 6 ? `${obj.title.slice(0, 8)}...` : obj.title
      }</span>
    `;
    });
}

if (document.querySelector(".applyListBtn")) {
  document.querySelector(".applyListBtn").addEventListener("click", () => {
    document.getElementById("optionChooseFilterModal").style.transform =
      "scale(0)";
    document.getElementById("optionChooseFilterModal").style.opacity = 0;
    ArrayMaker();
  });
}

if (document.getElementById("listFilterReset")) {
  document.getElementById("listFilterReset").addEventListener("click", () => {
    localStorage.removeItem("lists");
    listArr = [];

    let user_id = localStorage.getItem("user_id");
    let second_user_id = localStorage.getItem("second_user_id");

    if (user_id == second_user_id || !second_user_id) {
      localStorage.removeItem("currentUserlists");
    }

    document.getElementById("listItemContainer").style.display = "none";
    document.querySelectorAll(".listToggleBox1").forEach((ele) => {
      ele.classList.remove("listToggleBox1Checked");
    });
  });
}

let listLocal = JSON.parse(localStorage.getItem("currentUserlists"));

if (listLocal?.length > 0) {
  document.getElementById("listItemContainer").style.display = "block";
  document.getElementById("listItemContainer").innerHTML = "";

  let second_user_id = localStorage.getItem("second_user_id");

  listLocal?.length > 0 &&
    listLocal.slice(0, 4).map((obj) => {
      if (second_user_id == obj.user_id || !second_user_id) {
        document.getElementById("listItemContainer").innerHTML += `
        <span class="text-right1" data-listId=${obj.id} data-hex=${
          obj.hex
        } style="background-color: ${obj.hex};">${
          obj.title.length > 6 ? `${obj.title.slice(0, 8)}...` : obj.title
        }</span>
      `;
      } else {
        document.getElementById("listItemContainer").style.display = "none";
        document.getElementById("listItemContainer").innerHTML = "";
        ArrayMaker();
      }

      let listToggleBoxInterval = setInterval(() => {
        if (document.querySelector(".listToggleBox1")) {
          clearInterval(listToggleBoxInterval);
          document.querySelectorAll(".listToggleBox1").forEach((ele) => {
            if (ele.getAttribute("data-listId") == obj.id) {
              ele.classList.add("listToggleBox1Checked");
            }
          });
        }
      }, 100);
    });
}

let deleteListInterval1 = setInterval(() => {
  document.querySelectorAll(".listDelIcon1").forEach((ele) => {
    ele.addEventListener("click", (e) => {
      let user_id = localStorage.getItem("user_id");

      var second_user_id = localStorage.getItem("second_user_id");

      if (second_user_id != null) {
        user_id = second_user_id;
      }

      let listId = e.currentTarget.parentElement.getAttribute("data-listId");

      const url = `${globalURl}/delete_lists/${user_id}/${listId}`;

      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send();

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let response = JSON.parse(xhr.responseText);

          if (response.status == "Deleted") {
            filterLisiting();
          }
        }
      };
    });
  });
}, 1000);

document
  .getElementById("shareInSubGroups")
  .addEventListener("click", shareInSubGroupsModal);

function shareInSubGroupsModal() {
  document.getElementById("shareInGroupsModal").style.transform = "scale(0)";
  document.getElementById("shareInGroupsModal").style.opacity = 0;

  document.getElementById("showSubGroupsModal").style.transform = "scale(1)";
  document.getElementById("showSubGroupsModal").style.opacity = 1;

  let user_id = localStorage.getItem("user_id");
  let group_id = localStorage.getItem("group_id");

  const url = `${globalURl}/get_sub_groups/${group_id}/${user_id}`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.length > 0) {
        document.querySelector(".subGroupBoxContainer").innerHTML = "";
        userData.map((item) => {
          document.querySelector(".subGroupBoxContainer").innerHTML += `
                <div style="position: relative;margin-left: 10px;">

                <div class="subGroupBox" data-sub-group_id=${
                  item.sub_group_id
                } style="cursor:pointer !important">
                <span class="tooltiptext"><span style="color:red">Name: </span>${
                  item.name
                }
                </span>

                 <img src="./Assets/img/user.png" class="userIconDemo" data-receiverid="32">


                  </div>
                  <div class="groupName" >${
                    item.name.length > 10
                      ? `${item.name.slice(0, 10)} ...`
                      : item.name
                  }</div>

                </div>
            `;
        });
        document.querySelectorAll(".subGroupBox").forEach((ele) => {
          ele.addEventListener("click", () => {
            localStorage.setItem(
              "sub_group_id",
              ele.getAttribute("data-sub-group_id")
            );
            shareProspectInSubGroup();
          });
        });
      } else {
        document.querySelector(".subGroupBoxContainer").innerHTML =
          "<h1 class='groupNullHeading'>No sub groups to show</h1>";
      }
    }
  };
}

document
  .getElementById("showSubGroupsModalCloseBtn")
  .addEventListener("click", showSubGroupsModalClose);

function showSubGroupsModalClose() {
  document.getElementById("showSubGroupsModal").style.transform = "scale(0)";
  document.getElementById("showSubGroupsModal").style.opacity = 0;

  document.querySelectorAll(".groupBox").forEach((ele) => {
    ele.classList.remove("groupBoxClicked");
  });
}

function shareProspectInSubGroup() {
  // openOptionChooseModal();
  var user_id = localStorage.getItem("user_id");
  var group_id = localStorage.getItem("group_id");
  var sub_group_id = localStorage.getItem("sub_group_id");
  localStorage.setItem("subgroup_id", sub_group_id);
  var prospect_id = localStorage.getItem("prospect_id");

  if (prospect_id) {
    if (sub_group_id) {
      prospectModalClose();

      const url = `${globalURl}/send_subgroup_message`;

      let xhr = new XMLHttpRequest();

      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          user_id,
          group_id,
          sub_group_id,
          prospect_id,
          text: "",
          shared: "no",
        })
      );

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let userData = JSON.parse(xhr.responseText);
          localStorage.setItem("shared", true);
          window.location.href = "messagebox.html";
        }
      };
    } else {
      var myToast = Toastify({
        text: "At least Select 1 Sub Group",
        duration: 2000,
      });
      myToast.showToast();
    }
  } else {
    var myToast = Toastify({
      text: "Save prospect to proceed",
      duration: 2000,
    });
    myToast.showToast();
  }
}

var i = setInterval(() => {
  database = localStorage.getItem("OpenShowDataBase");
  if (database) {
    localStorage.removeItem("OpenShowDataBase");
    getAllDatabases();
  }
  clearInterval(i);
}, 50);

if (document.getElementById("profilePicc")) {
  document.getElementById("profilePicc").addEventListener("click", () => {
    localStorage.setItem("OpenShowDataBase", true);
    window.location.href = "popup.html";
  });
}

setTimeout(() => {
  if (document.getElementById("loader").style.display == "block") {
    bgpage.word.loader = "yeen";
    window.location.href = "home.html";
  }
}, 7000);
setTimeout(() => {
  loader = localStorage.getItem("loader_check");
  if (loader) {
    if (document.getElementById("loader").style.display == "block") {
      document.getElementById("loader").style.display = "none";
    }
    if (!bgpage.word.loader || bgpage.word.loader == "yeen") {
      document.getElementById("go_back").disabled = true;
    } else {
      document.getElementById("go_back").disabled = false;
    }
    localStorage.removeItem("loader_check");
  }
}, 50);

if (document.getElementById("attachmentInp")) {
  document.getElementById("attachmentInp").addEventListener("change", (e) => {
    let attachmentImage = document.querySelector(".attachmentPhoto");

    attachmentImage.style.display = "block";
    attachmentImage.src = URL.createObjectURL(e.target.files[0]);
  });
}