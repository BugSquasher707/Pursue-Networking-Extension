// Message Chat Code ...............................................
new EmojiPicker({
  trigger: [
    {
      selector: ".emojiIcon",
      insertInto: "#send_message_div",
    },
  ],
  closeButton: true,
  specialButtons: "#084DD1",
});
var commentArray = [];




localStorage.removeItem("prospect_id");
localStorage.removeItem("isProspectCollabClicked1");
localStorage.removeItem("prospectCollabData1");
localStorage.removeItem("prospect_id1");
localStorage.removeItem("replied_id");
localStorage.removeItem("message_id");
localStorage.removeItem("nullGroupChat");
localStorage.removeItem('nullSubGroupChat')
localStorage.removeItem("dmNullChats");
localStorage.removeItem("group_name");
localStorage.removeItem("editGroupName");

// localStorage.removeItem('group_id');

let groupUsersArr = [];
let groupmembersArr = [];
let subgroupmembersArr = [];
let groupprospectsArr = [];
let SearchUserArray = [];
let tempVariable;



// Test URL

// const globalURl = "https://precious-ride.thefastech.com";

// Stable URL

const globalURl = "https://linkedin.thefastech.com";

// Test URL

// const globalURl = "https://testlinkedin.thefastech.com";

setTimeout(() => {
  if (document.getElementById("shardm1")) {
    document.getElementById("shardm1").addEventListener("click", () => {
      var element = document.getElementById("value1").value;
      localStorage.setItem("receiver_id", element);
      openChatBox();
    });
  }
  if (document.getElementById("shardm2")) {
    document.getElementById("shardm2").addEventListener("click", () => {
      var element = document.getElementById("value2").value;
      localStorage.setItem("receiver_id", element);
      openChatBox();
    });
  }
  if (document.getElementById("shardm3")) {
    document.getElementById("shardm3").addEventListener("click", () => {
      var element = document.getElementById("value3").value;
      localStorage.setItem("receiver_id", element);
      openChatBox();
    });
  }
}, 3000);

function topbaricons() {
  var user_id = localStorage.getItem("user_id");


  

  

  const url = `${globalURl}/getmembers/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  document.querySelector(".imgContainer").innerHTML = "";

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
			  <input type="hidden" id="value${z}" value="${item.linked_to_id}"></input>
        <div class="iconMsgPicContainer">
        ${item.total_notifications != 0
              ? `<div class="countNum1">${item.total_notifications}</div>`
              : ""
            }
          <img class="new-top-img" id="shardm${count}" src="${item.image}">
          <span class="tooltiptext">${item.username}</span>
          </div>
          `
            : "";

        document.querySelector(".imgContainer").innerHTML += row;
        style = style + 35;
        count = count + 1;
        z = z + 1;
      });
    }
  };
}

setTimeout(() => {
  openChatBox();
  openModal25();
  console.log("heress")
}, 500);

function openChatBox() {
  let isChatIcon = localStorage.getItem("isChatIcon");
  let receiver_id = localStorage.getItem("reciever_id");
  let user_id = localStorage.getItem("user_id");

  if (receiver_id) {
    document.getElementById("nullHeading").style.display = "none";
  }

  
    localStorage.removeItem("isChatIcon");
    var x = setInterval(() => {
      if (isChatIcon != null) {
        document.getElementById("groupIcon").disabled = true
        console.log(isChatIcon,'isChatIcon')
      document.getElementById("dmsIcon").src = "./Assets/img/selecteddms.svg";
      showNullMembersChats()
      document.getElementById("groupIcon").disabled = false

      localStorage.removeItem("isChatIcon")
    } else {
    
    }
      clearInterval(x)
    });
  

}

function showSharedProspectChat() {
  let isShared = localStorage.getItem("shared");
  let subgroup_id = localStorage.getItem("sub_group_id")
  console.log(subgroup_id,"subgroup_id")
  if (isShared) {
    
    localStorage.removeItem("shared");
    var i = setInterval(() => {
    x = document.getElementById("groupIcon");
    r = document.getElementById("dmsIcon");
  console.log(x.src, "src")
  
    x.src = "./Assets/img/selected_group.svg"
    r.src = "./Assets/img/notselectdms.svg"
  
  clearInterval(i)

}, 300)

    dynamicModalOpenP();
    var j = setInterval(() => {
    if(subgroup_id != null){
      localStorage.setItem("subgroup_id",subgroup_id)
      console.log("nullSubGroupChats")
      nullSubGroupChats();
      subgroup_id = localStorage.getItem("subgroup_id");
      document.getElementById("general_div").classList.remove("active")
      document.querySelectorAll(".subgroups_div").forEach((ele) => {
        constant = ele.getAttribute("date-subgroup_id")
        console.log(constant,"constant")
        if(subgroup_id == constant){
          ele.classList.add("active")
        }
        else{
          ele.classList.remove("active")
        }
      });


    }
    clearInterval(j)

  }, 1500)
  }
}

setTimeout(() => {
  getChats();
  
  showSharedProspectChat();
}, 100);

var i = setInterval(() => {
  openchat = localStorage.getItem("openchatbox");
  if(openchat == "yeen"){
    document.getElementById("dmsIcon").src = "./Assets/img/selecteddms.svg";
    fetchDmsInfo();
    localStorage.removeItem("openchatbox");
    clearInterval(i)
  }
  else{
    
  }
}, 500);

function receivedMessages() {
  var user_id = localStorage.getItem("user_id");

  var receiver_id = localStorage.getItem("receiver_id");

  let prospect_id = localStorage.getItem("prospect_id");

  const url = `${globalURl}/recieve_messages/${user_id}/${receiver_id}/${prospect_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      let userMessages = userData.data;

      let chatMessageContent = document.querySelector(".chatMessageContent");

      if (userMessages) {
        userMessages.map((obj, i) => {
          if (obj.sender_id == user_id) {
            let dbTime = obj.created_at;

            let newDate = new Date();

            let UTCDate = new Date(
              newDate.getUTCFullYear(),
              newDate.getUTCMonth(),
              newDate.getUTCDate(),
              newDate.getUTCHours(),
              newDate.getUTCMinutes(),
              newDate.getUTCSeconds(),
              newDate.getUTCMilliseconds()
            );

            let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

            let futureTime = Math.abs(
              (new Date(dbTime).getTime() / 1000).toFixed(0)
            );

            let TimeDifference = currentTime - futureTime;

            let days = Math.floor(TimeDifference / 86400);

            let hours = Math.floor(TimeDifference / 3600) % 24;

            let minutes = Math.floor(TimeDifference / 60) % 60;

            let seconds = Math.floor(TimeDifference % 60);

            let messageTimeString = "";

            if (days == 0) {
              if (hours == 0) {
                if (minutes == 0) {
                  if (seconds == 0) {
                    messageTimeString = `less than a second ago`;
                  } else {
                    messageTimeString =
                      seconds == 1
                        ? `${seconds} second ago`
                        : `${seconds} seconds ago`;
                  }
                } else {
                  messageTimeString =
                    minutes == 1
                      ? `${minutes} minute ago`
                      : `${minutes} minutes ago`;
                }
              } else {
                messageTimeString =
                  hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
              }
            } else {
              messageTimeString =
                days == 1 ? `${days} day ago` : `${days} days ago`;
            }

            let row = `
            <div style="position: relative; margin-bottom: 30px;">
              <div class='myMessageDiv'>

              <div class="imageNameContainer">
                
                    <span class="senderName">${obj.sender_name}</span>
                    <img src="${obj.sender_image}" class='messageImage'/>
                  
                  </div>

              <i class="far fa-ellipsis-v menuDMIcon"></i>

              <div class='menuBox' style="display: none">
                <div class='editContainer editDMContainer'>
                  <i class="far fa-edit"></i>
                  <h1>Edit</h1>
                </div>
                <div class="deleteContainer deleteDMContainer">
                  <i class="far fa-trash"></i>
                  <h1>Delete</h1>
                </div>
              </div>

              ${obj.replied_id != null
                ? `<div class="prospectReplyDiv">
                  <div class="prospectContentDiv style="${obj.reply_image == null ? "width: 100%;" : ""
                }" >
                    <h1>${obj.reply_msg != null
                  ? `<h1>${obj.reply_msg}</h1>`
                  : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                }</h1>
                  </div>
                  ${obj.reply_image != null
                  ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                  : ""
                }
                </div>`
                : ""
              }

                <i class="fas fa-reply myReplyIcon"></i>
                <div style="width: 100%">
                  <p class="messageTxt" data-replied_id=${obj.id}>${obj.text
              }</p>
                </div>
                <div class="timestampDiv" style="margin-top: 10px">
                  ${messageTimeString}
                </div>
              </div>
            </div>
          `;
            chatMessageContent.innerHTML += row;

            setTimeout(() => {
              document.querySelectorAll(".menuDMIcon").forEach((ele) => {
                ele?.addEventListener("click", openDmThreeDotMenu);
              });
            }, 100);

            setTimeout(() => {
              document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                ele.addEventListener("click", replyToMessageFn);
              });
            }, 100);
          } else {
            let dbTime = obj.created_at;

            let newDate = new Date();

            let UTCDate = new Date(
              newDate.getUTCFullYear(),
              newDate.getUTCMonth(),
              newDate.getUTCDate(),
              newDate.getUTCHours(),
              newDate.getUTCMinutes(),
              newDate.getUTCSeconds(),
              newDate.getUTCMilliseconds()
            );

            let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

            let futureTime = Math.abs(
              (new Date(dbTime).getTime() / 1000).toFixed(0)
            );

            let TimeDifference = currentTime - futureTime;

            let days = Math.floor(TimeDifference / 86400);

            let hours = Math.floor(TimeDifference / 3600) % 24;

            let minutes = Math.floor(TimeDifference / 60) % 60;

            let seconds = Math.floor(TimeDifference % 60);

            let messageTimeString = "";

            if (days == 0) {
              if (hours == 0) {
                if (minutes == 0) {
                  if (seconds == 0) {
                    messageTimeString = `less than a second ago`;
                  } else {
                    messageTimeString =
                      seconds == 1
                        ? `${seconds} second ago`
                        : `${seconds} seconds ago`;
                  }
                } else {
                  messageTimeString =
                    minutes == 1
                      ? `${minutes} minute ago`
                      : `${minutes} minutes ago`;
                }
              } else {
                messageTimeString =
                  hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
              }
            } else {
              messageTimeString =
                days == 1 ? `${days} day ago` : `${days} days ago`;
            }

            let row = `
            <div style="position: relative; margin-bottom: 30px;">
              <div class='userMessageDiv'>
              <div class="imageNameContainer1">
                
              <img src="${obj.sender_image}" class='messageImage'/>
              <span class="senderName">${obj.sender_name}</span>
                  
                  </div>
              ${obj.replied_id != null
                ? `<div class="prospectReplyDiv1">
                  <div class="prospectContentDiv" style="${obj.reply_image == null ? "width: 100%;" : ""
                }">
                    <h1>${obj.reply_msg != null
                  ? `<h1>${obj.reply_msg}</h1>`
                  : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                }</h1>
                  </div>
                  ${obj.reply_image != null
                  ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                  : ""
                }
                </div>`
                : ""
              }

                <i class="fas fa-reply replyIcon"></i>
                <div style="width: 100%"> 
                  <p class="messageTxt" data-replied_id=${obj.id}>${obj.text
              }</p>
                </div>
                <div class="timestampUserDiv" style="margin-top: 10px">
                  ${messageTimeString}
                </div>
              </div>
            </div>
          `;
            chatMessageContent.innerHTML += row;
          }

          chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
        });

        let replyInterval = setInterval(() => {
          if (document.querySelector(".replyIcon"))
            clearInterval(replyInterval);
          document.querySelectorAll(".replyIcon").forEach((item) => {
            item.addEventListener("click", replyToMessageFn);
          });
        }, 500);
      }
    }
  };
}

let leftBox__container = document.querySelector(".leftBox__container");

var userActive = null;

function getChats() {
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

      userActive = userData;

      leftBox__container.innerHTML += `
      

      <div class="dmsDiv"><img class="groupIcon" id="dmsIcon" src="./Assets/img/notselectdms.svg" alt="" style="width: 100%;
      margin: 0%;
      padding: 0%;
      background-color: white;" /> 
      </div>

      <div class="groupDiv"><img class="groupIcon" id="groupIcon" src="./Assets/img/notselectedGroup.svg" alt="" style="width: 100%;
      margin: 0%;
      padding: 0%;
      background-color: white;" /> 
      </div>
      `;

      // userData.map((item, i, arr) => {
      //   var row = `${item.image != null
      //       ? `<div style="position: relative;">
      //             <img src=${item.image} class='userIcon' data-receiverId=${item.linked_to_id
      //       } />
      //             ${item.total_notifications != 0
      //         ? `<div class="chatNotificationBox">${item.total_notifications}</div>`
      //         : ""
      //       }
      //         </div>`
      //       : `<div class="userIcon" data-receiverId=${item.linked_to_id}>
      //           <span>${item.letters}</span>
      //           ${item.total_notifications != 0
      //         ? `<div class="chatNotificationBox">${item.total_notifications}</div>`
      //         : ""
      //       }
      //         </div>`
      //     }
      //     `;

      //   leftBox__container.innerHTML += row;
      // });
    }
    document.querySelectorAll(".userIcon").forEach((element) => {
      element.addEventListener("click", activeUserChat);
    });


    if (document.querySelector(".groupDiv")) {
      document
        .querySelector(".groupDiv")
        .addEventListener("click", fetchGroupInfo);
    }

    if (document.querySelector(".dmsDiv")) {
      document
        .querySelector(".dmsDiv")
        .addEventListener("click", fetchDmsInfo);
    }
  };
}
if (document.querySelector("#open_add_group")) {
  document.querySelector("#open_add_group").addEventListener("click", openModal2);
}
// if (document.querySelector("#open_sub_group")) {
//   document.querySelector("#open_sub_group").addEventListener("click", openSubGroupMembersModal);
// }
function fetchGroupInfo() {
  localStorage.removeItem("sub_group_id");
  localStorage.removeItem("subgroup_id");
  localStorage.removeItem("group_id");

  localStorage.removeItem("prospect_id");
  localStorage.removeItem("dms");
  localStorage.removeItem("dmNullChats");
  localStorage.removeItem("reciever_id");



  document.getElementById("customScreenChattBox").style.display = "none"
  document.querySelector(".groupBoxContainer").style.display = null;
document.querySelector(".new-filter-row").style.display = "none"
document.getElementById("add_member_in_screen").style.display ="block"
  x = document.getElementById("groupIcon");
  r = document.getElementById("dmsIcon");
  console.log(x.src, "src")
  if (x.src.includes("/notselectedGroup")) {
    x.src = "./Assets/img/selected_group.svg"
    r.src = "./Assets/img/notselectdms.svg"
  } else {

  }

  document.getElementById("send_message_button").style.display = "block"
  document.getElementById("update_message_button").style.display = "none"
  document.getElementById("cancel_message_button").style.display = "none"
  document.querySelector(".groupBoxContainerListView").style.display = "none"

  

  document.getElementById("send_message_div").value = ""


  localStorage.removeItem("nullGroupChat");
  localStorage.removeItem("dmNullChats");
  localStorage.removeItem("sub_group_id");
  localStorage.removeItem("group_name");
  localStorage.removeItem("editGroupName");
  localStorage.removeItem("sub_group");
  localStorage.removeItem('nullSubGroupChat')

  // document.getElementById("subGroupNamePara").style.display = "none";

  // document.getElementById("sendMsgBtn").style.display = "none";
  // document.getElementById("sendGroupMsgBtn").style.display = "block";
  // document.getElementById("updateMsgBtn").style.display = "none";
  // document.getElementById("updateGroupMsgBtn").style.display = "none";
  // document.getElementById("cancelMsgBtn").style.display = "none";
  // document.getElementById("cancelGroupMsgBtn").style.display = "none";

  document.querySelector(".profileMainBox ").style.display = "none"

  document.querySelector(".rightBox").style.display = "none";
  document.querySelector(".groupContainer").style.display = "block";

  document.getElementById("noGroupHeading").style.display = "none";

  document.querySelector(".showBtnContainer").innerHTML = "";

  document.querySelectorAll(".userIcon").forEach((ele) => {
    ele.classList.remove("userClicked");
  });

  document.querySelector(".groupDiv").classList.add("groupDivClicked");

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

      groupUsersArr = userData.users;

      if (userData.length > 0) {
        document.querySelector(".groupBoxContainer").innerHTML = "";
        
        document.querySelector(".groupBoxContainer").style.paddingTop = "10px";

        document.getElementById("open_add_group").style.display = "block";

        
        userData.map((item) => {
          document.querySelector(".groupBoxContainer").innerHTML += `
                <div style="position: relative;">

                <div class="groupBox" data-group_id=${item.group_id}>
                ${item.notifications != 0
              ? `<span class="notify_icon">${item.notifications}</span> `
              : ""
            }

                <span class="tooltiptext"><span style="color:black">Name: </span>${item.name
            }
                <br> <span style="color:black">Total prospects: </span>${item.prospects
            }
            <br> <span style="color:black">Total Members: </span>${item.members_count
            }
                </span>

                ${item.members
              .slice(0, 4)
              .map((ele) => {
                if (item.image) {
                  return `<img src="${item.image}" class="userIconDemo" data-receiverid="32">`;
                } else {
                  return `<img src="./Assets/img/group-bg.png" class="userIconDemo" data-receiverid="32">`;
                }
              })
              .join("")}
                  
                  </div>
                  <div class="groupName" style="display: -webkit-box;
                  -webkit-line-clamp: 3;
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
        document.querySelectorAll(".groupBox").forEach((ele) => {
          ele.addEventListener("click", () => {
            localStorage.setItem("group_id", ele.getAttribute("data-group_id"));
            dynamicModalOpenP();
          });
        });

        // document.querySelectorAll(".deleteGroupBox").forEach((ele) => {
        //   ele.addEventListener("click", groupDeleteion);
        // });
        // document.querySelectorAll(".leaveGroupBox").forEach((ele) => {
        //   ele.addEventListener("click", groupleaveion);
        // });
      } else {
        document.querySelector(".groupBoxContainer").innerHTML = "";
        document.getElementById("noGroupHeading").style.display = "block";
        document.getElementById("open_add_group").style.display = "block";

      }
    }
  };
}

setInterval(() => {
  var modalUserList = document.querySelectorAll(".chatContent");

  if (modalUserList) {
    modalUserList.forEach((element) => {
      element.addEventListener("click", activeClassInject);
    });
  }
}, 100);

var modalContainer1 = document.querySelector(".startChatModalOverlay");

var modalContainer2 = document.querySelector(".startChatModalOverlay1");

if (document.querySelector(".addFriendIcon")) {
  document
    .querySelector(".addFriendIcon")
    .addEventListener("click", openModal1);
}

if (document.querySelector(".closeDiv")) {
  document.querySelector(".closeDiv").addEventListener("click", closeModal1);
}

if (document.querySelector(".addUser")) {
  document.querySelector(".addUser").addEventListener("click", openModal2);
}
if (document.querySelector(".styleSubGroup")) {
  document
    .querySelector(".styleSubGroup")
    .addEventListener("click", openModal100);
}

if (document.querySelector(".closeDiv1")) {
  document.querySelector(".closeDiv1").addEventListener("click", closeModal2);
}

function getUserMessages() {
  document.querySelector(".rightUperRight").innerHTML = "";
  document.querySelector(".rightUpperBox").style.display = "flex";
  document.querySelector(".chatMessageContent").style.display = "block";
  document.querySelector(".chatControlBtn").style.display = "block";

  var user_id = localStorage.getItem("user_id");

  var receiver_id = localStorage.getItem("receiver_id");

  const url = `${globalURl}/chating/${user_id}/${receiver_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userMessages = JSON.parse(xhr.responseText);

      if (userMessages) {
        if (userMessages.image != null) {
          document.querySelector(".rightUperLeft").style.width = "30px";
          document.querySelector(".rightUperLeft").style.height = "30px";
          document.querySelector(".rightUperLeft").style.border = "none";
        } else {
          document.querySelector(".rightUperLeft").style.width = "25px";
          document.querySelector(".rightUperLeft").style.height = "25px";
          document.querySelector(".rightUperLeft").style.border =
            "1px solid #999";
        }
        document.querySelector(".rightUperLeft").innerHTML = `
          ${userMessages.image != null
            ? `<img src=${userMessages.image} />`
            : `<i class='fas fa-user'></i>`
          }
        `;
        document.querySelector(".rightUperRight").innerHTML = `
                  <p id="userEmail">${userMessages.email}</p>
        `;
      }

      let chatMessageContent = document.querySelector(".chatMessageContent");
      chatMessageContent.innerHTML = "";
      if (userMessages.data) {
        userMessages.data.map((obj, i) => {
          if (obj.sender_id == user_id) {
            let dbTime = obj.created_at;

            let newDate = new Date();

            let UTCDate = new Date(
              newDate.getUTCFullYear(),
              newDate.getUTCMonth(),
              newDate.getUTCDate(),
              newDate.getUTCHours(),
              newDate.getUTCMinutes(),
              newDate.getUTCSeconds(),
              newDate.getUTCMilliseconds()
            );

            let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

            let futureTime = Math.abs(
              (new Date(dbTime).getTime() / 1000).toFixed(0)
            );

            let TimeDifference = currentTime - futureTime;

            let days = Math.floor(TimeDifference / 86400);

            let hours = Math.floor(TimeDifference / 3600) % 24;

            let minutes = Math.floor(TimeDifference / 60) % 60;

            let seconds = Math.floor(TimeDifference % 60);

            let messageTimeString = "";

            if (days == 0) {
              if (hours == 0) {
                if (minutes == 0) {
                  if (seconds == 0) {
                    messageTimeString = `less than a second ago`;
                  } else {
                    messageTimeString =
                      seconds == 1
                        ? `${seconds} second ago`
                        : `${seconds} seconds ago`;
                  }
                } else {
                  messageTimeString =
                    minutes == 1
                      ? `${minutes} minute ago`
                      : `${minutes} minutes ago`;
                }
              } else {
                messageTimeString =
                  hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
              }
            } else {
              messageTimeString =
                days == 1 ? `${days} day ago` : `${days} days ago`;
            }

            let row = `
            <div style="position: relative; margin-bottom: 30px;">
              <div class='myMessageDiv'>

              <div class="imageNameContainer">
                
              <span class="senderName">${obj.sender_name}</span>
              <img src="${obj.sender_image}" class='messageImage'/>
                  
                  </div>

              <i class="far fa-ellipsis-v menuDMIcon"></i>

              <div class='menuBox' style="display: none">
                <div class='editContainer editDMContainer'>
                  <i class="far fa-edit"></i>
                  <h1>Edit</h1>
                </div>
                <div class="deleteContainer deleteDMContainer">
                  <i class="far fa-trash"></i>
                  <h1>Delete</h1>
                </div>
              </div>

                ${obj.replied_id != null
                ? `<div class="prospectReplyDiv">
                    <div class="prospectContentDiv" style="${obj.reply_image == null ? "width: 100%;" : ""
                }">
                      <h1>${obj.reply_msg != null
                  ? `<h1>${obj.reply_msg}</h1>`
                  : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                }</h1>
                    </div>
                    ${obj.reply_image != null
                  ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                  : ""
                }
                  </div>`
                : ""
              }
                ${obj.prospect_id != null
                ? `<div class="prospectDiv" data-id=${obj.prospect_id} data-link=${obj.url}>
                  <img src=${obj.image} alt="model pic"/>
                  <div class="prospectContentDiv">
                    <h1>${obj.name}</h1>
                    <h2>${obj.company}</h2>
                  </div>
                </div>`
                : ""
              }

                <i class="fas fa-reply myReplyIcon"></i>
                <div style="width: 100%">
                  <p class="messageTxt" data-replied_id=${obj.id}>${obj.text
              }</p>
                </div>
                <div class="timestampDiv" style="margin-top: 10px">
                  ${messageTimeString}
                </div>
              </div>
            </div>
            `;
            chatMessageContent.innerHTML += row;

            setTimeout(() => {
              document.querySelectorAll(".menuDMIcon").forEach((ele) => {
                ele?.addEventListener("click", openDmThreeDotMenu);
              });
            }, 100);

            setTimeout(() => {
              document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                ele.addEventListener("click", replyToMessageFn);
              });
            }, 100);
          } else {
            let dbTime = obj.created_at;

            let newDate = new Date();

            let UTCDate = new Date(
              newDate.getUTCFullYear(),
              newDate.getUTCMonth(),
              newDate.getUTCDate(),
              newDate.getUTCHours(),
              newDate.getUTCMinutes(),
              newDate.getUTCSeconds(),
              newDate.getUTCMilliseconds()
            );

            let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

            let futureTime = Math.abs(
              (new Date(dbTime).getTime() / 1000).toFixed(0)
            );

            let TimeDifference = currentTime - futureTime;

            let days = Math.floor(TimeDifference / 86400);

            let hours = Math.floor(TimeDifference / 3600) % 24;

            let minutes = Math.floor(TimeDifference / 60) % 60;

            let seconds = Math.floor(TimeDifference % 60);

            let messageTimeString = "";

            if (days == 0) {
              if (hours == 0) {
                if (minutes == 0) {
                  if (seconds == 0) {
                    messageTimeString = `less than a second ago`;
                  } else {
                    messageTimeString =
                      seconds == 1
                        ? `${seconds} second ago`
                        : `${seconds} seconds ago`;
                  }
                } else {
                  messageTimeString =
                    minutes == 1
                      ? `${minutes} minute ago`
                      : `${minutes} minutes ago`;
                }
              } else {
                messageTimeString =
                  hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
              }
            } else {
              messageTimeString =
                days == 1 ? `${days} day ago` : `${days} days ago`;
            }

            let row = `
            <div style="position: relative; margin-bottom: 30px;">
              <div class='userMessageDiv'>
              <div class="imageNameContainer1">
                
              <img src="${obj.sender_image}" class='messageImage'/>
              <span class="senderName">${obj.sender_name}</span>
                  
                  </div>

              ${obj.replied_id != null
                ? `<div class="prospectReplyDiv">
                  <div class="prospectContentDiv" style="${obj.reply_image == null ? "width: 100%;" : ""
                }">
                    <h1>${obj.reply_msg != null
                  ? `<h1>${obj.reply_msg}</h1>`
                  : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                }</h1>
                  </div>
                  ${obj.reply_image != null
                  ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                  : ""
                }
                </div>`
                : ""
              }
              ${obj.prospect_id != null
                ? `<div class="prospectDiv1" data-id=${obj.prospect_id} data-link=${obj.url}>
                  <img src=${obj.image} alt="model pic"/>
                  <div class="prospectContentDiv">
                    <h1>${obj.name}</h1>
                    <h2>${obj.company}</h2>
                  </div>
                </div>`
                : ""
              }

                <i class="fas fa-reply replyIcon"></i>
                <div style="width: 100%">
                  <p class="messageTxt" data-replied_id=${obj.id}>${obj.text
              }</p>
                </div>
                <div class="timestampUserDiv" style="margin-top: 10px">
                  ${messageTimeString}
                </div>
              </div>
            </div>
            `;
            chatMessageContent.innerHTML += row;
          }

          chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
        });

        let prospectInterval1 = setInterval(() => {
          if (document.querySelector(".prospectDiv"))
            clearInterval(prospectInterval1);
          document.querySelectorAll(".prospectDiv").forEach((item) => {
            item.addEventListener("click", openProspectPage);
          });
        }, 500);

        let prospectInterval2 = setInterval(() => {
          if (document.querySelector(".prospectDiv1"))
            clearInterval(prospectInterval2);
          document.querySelectorAll(".prospectDiv1").forEach((item) => {
            item.addEventListener("click", openProspectPage);
          });
        }, 500);

        let replyInterval = setInterval(() => {
          if (document.querySelector(".replyIcon"))
            clearInterval(replyInterval);
          document.querySelectorAll(".replyIcon").forEach((item) => {
            item.addEventListener("click", replyToMessageFn);
          });
        }, 500);
      }
    }
  };
}

function replyToMessageFn(e) {
  document.querySelectorAll(".replyIcon").forEach((ele) => {
    ele.classList.remove("replyIconClicked");
  });

  document.querySelectorAll(".myReplyIcon").forEach((ele) => {
    ele.classList.remove("replyIconClicked");
  });

  e.currentTarget.classList.add("replyIconClicked");

  console.log(e.currentTarget);

  let replied_id = e.target.parentElement
    .querySelector(".messageTxt")
    .getAttribute("data-replied_id");

  localStorage.setItem("replied_id", replied_id);
}

function openProspectPage(e) {
  let prospect_link = e.currentTarget.getAttribute("data-link");

  let params = {
    active: true,
    currentWindow: true,
  };
  chrome.tabs.query(params, gotTab);

  function gotTab(tabs) {
    let msg = {
      txt: prospect_link,
    };
    chrome.tabs.sendMessage(tabs[0].id, msg);
  }
}

function activeUserChat(e) {
  localStorage.removeItem("group_id");
  localStorage.removeItem("replied_id");
  localStorage.removeItem("sub_group");

  var receiver_id = e.target.getAttribute("data-receiverId");

  localStorage.setItem("receiver_id", receiver_id);

  openChatDynamicModal();

  // getUserMessages();
}

function openChatDynamicModal() {
  document.getElementById("dynamicModalH1").innerText = "Prospects";

  document.getElementById("subGroupNamePara").style.display = "none";

  localStorage.removeItem("replied_id");


  dynamicModal.style.transform = "scale(1)";
  dynamicModal.style.opacity = 1;

  var user_id = localStorage.getItem("user_id");
  var receiver_id = localStorage.getItem("receiver_id");

  const url = `${globalURl}/chating_prospects/${user_id}/${receiver_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.data) {
        document.querySelector(".dynamicContainer").innerHTML = "";
        userData.data.map((ele) => {
          if (ele.prospect_data) {
            document.querySelector(".dynamicContainer").innerHTML += `
                <div class="prospectContentContainer">
                  <div class="prospectContent prospectChatContent1" data-prospect_id=${ele.prospect_id
              }>
                              
                    <img src=${ele.prospect_data.image} alt=""/>
      
                    <div>
                      <h1>${ele.prospect_data.name}</h1>
                      <h2>${ele.sender_name != null
                ? `By ${ele.sender_name} ${ele.database != null ? `from ${ele.database}` : ""
                }`
                : ""
              }</h2>
                    </div>
                    
                    ${ele.notifications != 0 && ele.notifications != null
                ? `<span>${ele.notifications}</span>`
                : ""
              }

                  </div>
                  <i class="fas fa-trash prospectDeleteIcon chatProspectDelete"></i>
                </div>
                  `;
          }
        });

        document.querySelector(".dynamicContainer").innerHTML += `
            <div class="prospectContent1 prospectNullChats">
                <h1>No Prospect Chats</h1>
                ${userData.null_notifications != 0 &&
            userData.null_notifications != null
            ? `<span>${userData.null_notifications}</span>`
            : ""
          }
            </div>
          `;

        document.querySelectorAll(".chatProspectDelete").forEach((ele) => {
          ele.addEventListener("click", chatProspectDelete);
        });

        document
          .querySelectorAll(".prospectChatContent1")
          .forEach((element) => {
            element.addEventListener("click", (e) => showProspectChatMember(e));
          });
      } else {
        document.querySelector(".dynamicContainer").innerHTML = `
              <div class="prospectContent1 prospectNullChats">
                  <h1>No Prospect Chats</h1>
                  ${userData.null_notifications != 0 &&
            userData.null_notifications != null
            ? `<span>${userData.null_notifications}</span>`
            : ""
          }
              </div>
              `;
      }
      document.querySelectorAll(".prospectNullChats").forEach((ele) => {
        ele.addEventListener("click", showNullMembersChats);
      });
    }
  };

  group_id = localStorage.getItem("group_id");
  if (group_id) {
    document.querySelector(".viewSubGroupBtn").style.display = "block";
    document.querySelector(".styleSubGroup").style.display = "block";
    document.getElementById("dynamicGroupName").style.display = "block";

  } else {
    document.querySelector(".viewSubGroupBtn").style.display = "none";
    document.querySelector(".styleSubGroup").style.display = "none";
    document.getElementById("dynamicGroupName").style.display = "none";


  }
}

function chatProspectDelete(e) {
  document.getElementById("sendMsgBtn").style.display = "block";
  document.getElementById("sendGroupMsgBtn").style.display = "none";
  document.getElementById("updateMsgBtn").style.display = "none";
  document.getElementById("updateGroupMsgBtn").style.display = "none";
  document.getElementById("cancelMsgBtn").style.display = "none";
  document.getElementById("cancelGroupMsgBtn").style.display = "none";
  document.getElementById("sendSubGroupMsgBtn").style.display = "none";
  document.getElementById("updateSubGroupMsgBtn").style.display = "none";
  document.getElementById("cancelSubGroupMsgBtn").style.display = "none";

  let currentProspect = e.currentTarget.parentElement;

  let user_id = localStorage.getItem("user_id");
  let second_user_id = localStorage.getItem("receiver_id");
  let prospect_id = currentProspect
    .querySelector(".prospectContent")
    .getAttribute("data-prospect_id");

  const url = `${globalURl}/delete_chat_prospect`;

  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      user_id,
      second_user_id,
      prospect_id,
    })
  );

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.status == "Deleted") {
        openChatDynamicModal();
      }
    }
  };
}

function showProspectChatMember(e) {
  localStorage.removeItem("nullGroupChat");
  localStorage.removeItem("dmNullChats");
  localStorage.removeItem("sub_group_id");
  localStorage.removeItem("group_name");
  localStorage.removeItem("editGroupName");
  localStorage.removeItem('nullSubGroupChat')

  document.getElementById("nullHeading").style.display = "none";
  document.querySelector(".dynamicContainer").innerHTML = "";
  prospectModalClose();
  dynamicModalClose();

  document.getElementById("nullHeading").style.display = "none";
  document.querySelector(".groupDiv").classList.remove("groupDivClicked");
  document.querySelector(".groupContainer").style.display = "none";
  document.querySelector(".rightBox").style.display = "block";
  document.querySelector(".rightProspectBox").style.display = "none";
  document.querySelector(".rightUpperBox").style.display = "block";
  document.querySelector(".chatMessageContent").innerHTML = "";
  document.querySelector(".chatMessageContent").style.height = "275px";
  document.getElementById("sendMsgBtn").style.display = "block";
  document.getElementById("sendGroupMsgBtn").style.display = "none";
  document.getElementById("sendSubGroupMsgBtn").style.display = "none";
  document.getElementById("msgInp").value = "";

  document.querySelector(".searchBoxContainer").style.display = "none";

  let prospectId = e.currentTarget.getAttribute("data-prospect_id");

  document.getElementById("prospectImage").src = "./Assets/img/user.png";
  document.getElementById("prospectName").innerText = "";
  document.getElementById("companyName").innerText = "";
  document.getElementById("descriptionName").innerText = "";
  document.getElementById("prospectImage").setAttribute("data-link", "");

  document.getElementById("msgInp").value = "";

  var user_id = localStorage.getItem("user_id");
  var receiver_id = localStorage.getItem("receiver_id");

  document.querySelectorAll(".userIcon").forEach((ele) => {
    ele.classList.remove("userClicked");

    if (ele.getAttribute("data-receiverid") == receiver_id) {
      document.querySelector(".leftBox__container").innerHTML = "";
      setTimeout(() => {
        getChats();
      }, 500);
    }
  });

  setTimeout(() => {
    let activeInterval = setInterval(() => {
      if (document.querySelector(".userIcon")) {
        clearInterval(activeInterval);
        document.querySelectorAll(".userIcon").forEach((item) => {
          if (item.getAttribute("data-receiverid") == receiver_id) {
            item.classList.add("userClicked");
          }
        });
      }
    }, 100);
  }, 500);

  const url = `${globalURl}/chat_prospects/${user_id}/${receiver_id}/${prospectId}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userMessages = JSON.parse(xhr.responseText);

      document.querySelector(".rightUperRight").innerHTML = "";
      document.querySelector(".rightUpperBox").style.display = "flex";
      document.querySelector(".chatMessageContent").style.display = "block";
      document.querySelector(".chatControlBtn").style.display = "block";

      localStorage.setItem("prospect_id", userMessages.prospect_data.id);

      if (userMessages) {
        if (userMessages.image != null) {
          document.querySelector(".rightUperLeft").style.width = "30px";
          document.querySelector(".rightUperLeft").style.height = "30px";
          document.querySelector(".rightUperLeft").style.border = "none";
        } else {
          document.querySelector(".rightUperLeft").style.width = "25px";
          document.querySelector(".rightUperLeft").style.height = "25px";
          document.querySelector(".rightUperLeft").style.border =
            "1px solid #999";
        }
        document.querySelector(".rightUperLeft").innerHTML = `
          ${userMessages.image != null
            ? `<img src=${userMessages.image} />`
            : `<i class='fas fa-user'></i>`
          }
        `;
        document.querySelector(".rightUperRight").innerHTML = `
                  <p id="userEmail">${userMessages.email}</p>
        `;
      }

      let chatMessageContent = document.querySelector(".chatMessageContent");
      chatMessageContent.innerHTML = "";
      if (userMessages.data) {
        chatMessageContent.innerHTML += `
          
          <div class="prospectTopDiv" data-id=${userMessages.prospect_data.id
          } data-link=${userMessages.prospect_data.profile_link}>
            <img src=${userMessages.prospect_data.image} alt="model pic"/>
            <div class="prospectContentDiv" style="width: 100%">
              <h1>${userMessages.prospect_data.name}</h1>
              <h2>${userMessages.prospect_data.company != null
            ? userMessages.prospect_data.company
            : "No company name"
          }</h2>
              <h3 class="dbMessageDM">${userMessages.sender_name != null
            ? `Clipper: ${userMessages.sender_name} ${userMessages.database != null
              ? `, Database: ${userMessages.database}`
              : ""
            }`
            : ""
          }</h3>
            </div>
          </div>`;

        userMessages.data.map((obj, i) => {
          if (obj.sender_id == user_id) {
            let dbTime = obj.created_at;

            let newDate = new Date();

            let UTCDate = new Date(
              newDate.getUTCFullYear(),
              newDate.getUTCMonth(),
              newDate.getUTCDate(),
              newDate.getUTCHours(),
              newDate.getUTCMinutes(),
              newDate.getUTCSeconds(),
              newDate.getUTCMilliseconds()
            );

            let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

            let futureTime = Math.abs(
              (new Date(dbTime).getTime() / 1000).toFixed(0)
            );

            let TimeDifference = currentTime - futureTime;

            let days = Math.floor(TimeDifference / 86400);

            let hours = Math.floor(TimeDifference / 3600) % 24;

            let minutes = Math.floor(TimeDifference / 60) % 60;

            let seconds = Math.floor(TimeDifference % 60);

            let messageTimeString = "";

            if (days == 0) {
              if (hours == 0) {
                if (minutes == 0) {
                  if (seconds == 0) {
                    messageTimeString = `less than a second ago`;
                  } else {
                    messageTimeString =
                      seconds == 1
                        ? `${seconds} second ago`
                        : `${seconds} seconds ago`;
                  }
                } else {
                  messageTimeString =
                    minutes == 1
                      ? `${minutes} minute ago`
                      : `${minutes} minutes ago`;
                }
              } else {
                messageTimeString =
                  hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
              }
            } else {
              messageTimeString =
                days == 1 ? `${days} day ago` : `${days} days ago`;
            }

            let row = `
            <div style="position: relative; margin-bottom: 30px;">
              <div class='myMessageDiv'>

              <div class="imageNameContainer">
                
              <span class="senderName">${obj.sender_name}</span>
              <img src="${obj.sender_image}" class='messageImage'/>
                  
                  </div>

              <i class="far fa-ellipsis-v menuDMIcon"></i>

              <div class='menuBox' style="display: none">
                <div class='editContainer editDMContainer'>
                  <i class="far fa-edit"></i>
                  <h1>Edit</h1>
                </div>
                <div class="deleteContainer deleteDMContainer">
                  <i class="far fa-trash"></i>
                  <h1>Delete</h1>
                </div>
              </div>

                ${obj.replied_id != null
                ? `<div class="prospectReplyDiv">
                    <div class="prospectContentDiv" style="${obj.reply_image == null ? "width: 100%;" : ""
                }">
                      <h1>${obj.reply_msg != null
                  ? `<h1>${obj.reply_msg}</h1>`
                  : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                }</h1>
                    </div>
                    ${obj.reply_image != null
                  ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                  : ""
                }
                  </div>`
                : ""
              }

                <i class="fas fa-reply myReplyIcon"></i>
                <div style="width: 100%">
                  <p class="messageTxt" data-replied_id=${obj.id}>${obj.text
              }</p>
                </div>
                <div class="timestampDiv" style="margin-top: 10px">
                  ${messageTimeString}
                </div>
              </div>
            </div>
            `;
            chatMessageContent.innerHTML += row;

            setTimeout(() => {
              document.querySelectorAll(".menuDMIcon").forEach((ele) => {
                ele?.addEventListener("click", openDmThreeDotMenu);
              });
            }, 100);

            setTimeout(() => {
              document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                ele.addEventListener("click", replyToMessageFn);
              });
            }, 100);
          } else {
            let dbTime = obj.created_at;

            let newDate = new Date();

            let UTCDate = new Date(
              newDate.getUTCFullYear(),
              newDate.getUTCMonth(),
              newDate.getUTCDate(),
              newDate.getUTCHours(),
              newDate.getUTCMinutes(),
              newDate.getUTCSeconds(),
              newDate.getUTCMilliseconds()
            );

            let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

            let futureTime = Math.abs(
              (new Date(dbTime).getTime() / 1000).toFixed(0)
            );

            let TimeDifference = currentTime - futureTime;

            let days = Math.floor(TimeDifference / 86400);

            let hours = Math.floor(TimeDifference / 3600) % 24;

            let minutes = Math.floor(TimeDifference / 60) % 60;

            let seconds = Math.floor(TimeDifference % 60);

            let messageTimeString = "";

            if (days == 0) {
              if (hours == 0) {
                if (minutes == 0) {
                  if (seconds == 0) {
                    messageTimeString = `less than a second ago`;
                  } else {
                    messageTimeString =
                      seconds == 1
                        ? `${seconds} second ago`
                        : `${seconds} seconds ago`;
                  }
                } else {
                  messageTimeString =
                    minutes == 1
                      ? `${minutes} minute ago`
                      : `${minutes} minutes ago`;
                }
              } else {
                messageTimeString =
                  hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
              }
            } else {
              messageTimeString =
                days == 1 ? `${days} day ago` : `${days} days ago`;
            }

            let row = `
            <div style="position: relative; margin-bottom: 30px;">
              <div class='userMessageDiv'>
              
              <div class="imageNameContainer1">
                
              <img src="${obj.sender_image}" class='messageImage'/>
              <span class="senderName">${obj.sender_name}</span>
                  
                  </div>

              ${obj.replied_id != null
                ? `<div class="prospectReplyDiv1">
                  <div class="prospectContentDiv" style="${obj.reply_image == null ? "width: 100%;" : ""
                }">
                    <h1>${obj.reply_msg != null
                  ? `<h1>${obj.reply_msg}</h1>`
                  : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                }</h1>
                  </div>
                  ${obj.reply_image != null
                  ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                  : ""
                }
                </div>`
                : ""
              }

                <i class="fas fa-reply replyIcon"></i>
                <div style="width: 100%">
                  <p class="messageTxt" data-replied_id=${obj.id}>${obj.text
              }</p>
                </div>
                <div class="timestampUserDiv" style="margin-top: 10px">
                  ${messageTimeString}
                </div>
              </div>
            </div>
            `;
            chatMessageContent.innerHTML += row;
          }

          chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
        });

        let prospectInterval1 = setInterval(() => {
          if (document.querySelector(".prospectTopDiv"))
            clearInterval(prospectInterval1);
          document.querySelectorAll(".prospectTopDiv").forEach((item) => {
            item.addEventListener("click", openProspectPage);
          });
        }, 500);

        let prospectInterval2 = setInterval(() => {
          if (document.querySelector(".prospectDiv1"))
            clearInterval(prospectInterval2);
          document.querySelectorAll(".prospectDiv1").forEach((item) => {
            item.addEventListener("click", openProspectPage);
          });
        }, 500);

        let replyInterval = setInterval(() => {
          if (document.querySelector(".replyIcon"))
            clearInterval(replyInterval);
          document.querySelectorAll(".replyIcon").forEach((item) => {
            item.addEventListener("click", replyToMessageFn);
          });
        }, 500);
      }
    }
  };
}

function showNullMembersChats() {
  document.querySelector(".social-btn-box").innerHTML = ``
  document.querySelector(".groupContainer").style.display = 'none';

  console.log('Dms')
  console.log("replied_id");
  document.querySelector(".rightBox").style.display ="none"

  document.querySelector(".prospect_edit-text-msg-box").style.display = "none"
  localStorage.removeItem("sub_group_id");
  localStorage.removeItem("subgroup_id");

  localStorage.removeItem("group_name");
  localStorage.removeItem("group_id");

  localStorage.removeItem("editGroupName");
  document.getElementById("Conversations_button").innerText = `Conversations`;

  // document.getElementById("sendMsgBtn").style.display = "block";
  document.getElementById("sendGroupMsgBtn").style.display = "none";
  document.getElementById("updateMsgBtn").style.display = "none";
  document.getElementById("updateGroupMsgBtn").style.display = "none";
  document.getElementById("cancelMsgBtn").style.display = "none";
  document.getElementById("cancelGroupMsgBtn").style.display = "none";
  document.getElementById("sendSubGroupMsgBtn").style.display = "none";
  document.getElementById("updateSubGroupMsgBtn").style.display = "none";
  document.getElementById("cancelSubGroupMsgBtn").style.display = "none";

  document.getElementById("nullHeading").style.display = "none";
  // document.querySelector(".dynamicContainer").innerHTML = "";
  prospectModalClose();
  dynamicModalClose();

  document.getElementById("nullHeading").style.display = "none";
  document.querySelector(".groupDiv").classList.remove("groupDivClicked");
  document.querySelector(".groupContainer").style.display = "none";
  // document.querySelector(".rightBox").style.display = "block";
  document.querySelector(".rightProspectBox").style.display = "none";
  // document.querySelector(".rightUpperBox").style.display = "block";
  document.querySelector(".chatMessageContent").innerHTML = "";
  document.querySelector(".chatMessageContent").style.height = "275px";
  // document.getElementById("sendMsgBtn").style.display = "block";
  document.getElementById("sendGroupMsgBtn").style.display = "none";
  document.getElementById("msgInp").value = "";

  document.querySelector(".searchBoxContainer").style.display = "none";

  var user_id = localStorage.getItem("user_id");
  var receiver_id = localStorage.getItem("reciever_id");

  // document.querySelectorAll(".userIcon").forEach((ele) => {
  //   ele.classList.remove("userClicked");

  //   if (ele.getAttribute("data-receiverid") == receiver_id) {
  //     document.querySelector(".leftBox__container").innerHTML = "";
  //     setTimeout(() => {
  //       getChats();
  //     }, 500);
  //   }
  // });

  // setTimeout(() => {
  //   let activeInterval = setInterval(() => {
  //     if (document.querySelector(".userIcon")) {
  //       clearInterval(activeInterval);
  //       document.querySelectorAll(".userIcon").forEach((item) => {
  //         if (item.getAttribute("data-receiverid") == receiver_id) {
  //           item.classList.add("userClicked");
  //         }
  //       });
  //     }
  //   }, 100);
  // }, 500);

  var url;
  prospect_id = localStorage.getItem("prospect_id")
  if(prospect_id != null){
    url = `${globalURl}/chat_prospects/${user_id}/${receiver_id}/${prospectId}`;
    document.getElementById("Conversations_button").classList.remove('btn-active');
    document.getElementById("showprospectsanother").classList.add('btn-active');
  }
  else{
     url = `${globalURl}/chating_null/${user_id}/${receiver_id}`;
     document.getElementById("Conversations_button").classList.add('btn-active');
    document.getElementById("showprospectsanother").classList.remove('btn-active');

  }


  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userMessages = JSON.parse(xhr.responseText);
      localStorage.setItem("dms",true);
      if(prospect_id != null){
        document.getElementById("Conversations_button").style.display = "block"
        let userData = JSON.parse(xhr.responseText);


        document.querySelector(".desigination").style.display = "block"
        document.getElementById("for_clipper").style.display = "block"
        document.getElementById("for_DB").style.display = "block"
        document.querySelector(".prospect_name_heading").style.marginTop ="0px"
  
  
        document.getElementById("customScreenChattBox").style.display = "block"
        document.getElementById("chatt-box-2").innerHTML = ``
        yeeen = document.getElementById("another-bottom-content-box");
  
        yeeen.scroll(0, yeeen.scrollHeight);
                document.getElementById("second_message_div").value = null;
  
  
        document.querySelector(".rightUperRight").style.height = "60px";
        // document.querySelector(".rightBox").style.display = "block";
        document.querySelector(".groupContainer").style.display = "none";
        document.querySelector(".rightUperRight").innerHTML = "";
        document.querySelector(".rightUpperBox").style.display = "none";
        // document.querySelector(".chatMessageContent").style.display = "block";
        // document.querySelector(".chatControlBtn").style.display = "block";
        document.getElementById("sendMsgBtn").style.display = "none";
        // document.getElementById("sendGroupMsgBtn").style.display = "block";
        document.getElementById("sendSubGroupMsgBtn").style.display = "none";
        document.querySelector(".rightProspectBox").style.display = "flex";
  
        document.querySelector(".chatMessageContent").style.height = "225px";
  
        let chatMessageContent = document.querySelector(".chatMessageContent");
        chatMessageContent.innerHTML = "";
  
        document.getElementById("prospect_image_heading").src =
          userData.prospect_data.image;
        document
          .getElementById("prospectImage")
          .setAttribute("data-link", userData.prospect_data.profile_link);
        document.querySelector(".prospect_name_heading").innerText =
          userData.prospect_data.name;
          document.querySelector(".prospect_name_heading").style.marginTop ="0px"
          document.getElementById("group_name_division").style.display = "none"
  
        if (userData.prospect_data.company) {
          document.querySelector(
            ".desigination"
          ).innerText = `(${userData.prospect_data.company})`;
        }
        
        
        
        document.querySelector(".desigination").style.display = "block"
        if(userData.sender_name){
          document.getElementById("for_clipper").style.display = "block"
          document.getElementById("for_clipper").innerHTML = `Clipper <span class="nameCliper" style="color: #ff0000">${userData.sender_name}</span>
          `;
        }
        
        if(userData.database){
          document.getElementById("for_DB").style.display = "block"
  
        document.getElementById("for_DB").innerHTML = `Database <span class="nameCliper" style="color: #ff0000">${userData.database}</span>
          `;
        }
        localStorage.setItem("isProspectCollabClicked1", true);
        localStorage.setItem(
          "prospectCollabData1",
          JSON.stringify(userData.prospect_data)
        );
        localStorage.setItem("prospect_id1", userData.prospect_data.id);
        localStorage.setItem("prospect_id", userData.prospect_data.id);
  
        if (userData.group_name) {
          localStorage.setItem("group_name", userData.group_name);
        }
  
        if (userData.admin == true) {
          document.getElementById("deleteBox").style.display = "flex";
        } else {
          document.getElementById("deleteBox").style.display = "none";
        }
  
        document.querySelector(".showBtnContainer").innerHTML = "";
        document.querySelector(".showBtnContainer").innerHTML = `
        <button id="showMembers">Members</button>
        <button id="showDirectBox">Group Chat</button>
        `;
       
  
        if (userData.data.length > 0) {
          localStorage.removeItem("lastDate")
          console.log("here is not")
          temp = "0"
          counting_days = 1
          userData.data.map((ele, i) => {
            if (ele.text != null) {
              if(ele.text != null){
                let dbTime = ele.created_at;
                let newDate = new Date();
                var ajjtareekh
              if( (newDate.getUTCMonth()+1) < 10 && newDate.getUTCDate() < 10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+'0'+newDate.getUTCDate();
              }
              else if( (newDate.getUTCMonth()+1) < 10 &&  newDate.getUTCDate() >=10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+newDate.getUTCDate();
              }
              else if( (newDate.getUTCMonth()+1) >= 10 &&  newDate.getUTCDate() < 10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+'0'+newDate.getUTCDate();
              }
              else{
                ajjtareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+newDate.getUTCDate();
              }

              var kalltareekh
              if( (newDate.getUTCMonth()+1) < 10 && (newDate.getUTCDate()-1) < 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+'0'+(newDate.getUTCDate()-1);
              }
              if( (newDate.getUTCMonth()+1) < 10 && (newDate.getUTCDate()-1) >= 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+(newDate.getUTCDate()-1);
              }
              if( (newDate.getUTCMonth()+1) >= 10 && (newDate.getUTCDate()-1) < 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+'0'+(newDate.getUTCDate()-1);
              }
              else{
                kalltareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+(newDate.getUTCDate()-1);
              }
          myDate = dbTime.split(" ");
          console.log(ajjtareekh,"ajj")
          console.log(kalltareekh,"kall")
          console.log(myDate[0],"DB")
          console.log(temp,"temp")

          localStorage.removeItem("lastDate")
          if(temp == myDate[0]){
                counting_days = counting_days + 1;
          }
          else{
            if(ajjtareekh == myDate[0]){
              document.getElementById("chatt-box-2").innerHTML += `<div class="date-Wraper position-relative mb-3">
              <div class="all-date">Today</div>
              </div>`;
              counting_days = counting_days + 1
            }
            else if (kalltareekh == myDate[0]) {
              document.getElementById("chatt-box-2").innerHTML += `<div class="date-Wraper position-relative mb-3">
              <div class="all-date">Yesterday</div>
              </div>`;
              counting_days = counting_days + 1
            }
            else {
              document.getElementById("chatt-box-2").innerHTML += `<div class="date-Wraper position-relative mb-3">
                <div class="all-date">${myDate[0]}</div>
                </div>`;
                counting_days = counting_days + 1;
            }
            
            temp = myDate[0];

          }
          localStorage.setItem("lastDate",temp)
      
                let UTCDate = new Date(
                  newDate.getUTCFullYear(),
                  newDate.getUTCMonth(),
                  newDate.getUTCDate(),
                  newDate.getUTCHours(),
                  newDate.getUTCMinutes(),
                  newDate.getUTCSeconds(),
                  newDate.getUTCMilliseconds()
                );
      
                let currentTime = Math.abs(
                  (UTCDate.getTime() / 1000).toFixed(0)
                );
      
                let futureTime = Math.abs(
                  (new Date(dbTime).getTime() / 1000).toFixed(0)
                );
      
                let TimeDifference = currentTime - futureTime;
      
                let days = Math.floor(TimeDifference / 86400);
      
                let hours = Math.floor(TimeDifference / 3600) % 24;
      
                let minutes = Math.floor(TimeDifference / 60) % 60;
      
                let seconds = Math.floor(TimeDifference % 60);
      
                let messageTimeString = "";
      
                if (days == 0) {
                  if (hours == 0) {
                    if (minutes == 0) {
                      if (seconds == 0) {
                        messageTimeString = `less than a second ago`;
                      } else {
                        messageTimeString =
                          seconds == 1
                            ? `${seconds} second ago`
                            : `${seconds} seconds ago`;
                      }
                    } else {
                      messageTimeString =
                        minutes == 1
                          ? `${minutes} minute ago`
                          : `${minutes} minutes ago`;
                    }
                  } else {
                    messageTimeString =
                      hours == 1
                        ? `${hours} hour ago`
                        : `${hours} hours ago`;
                  }
                } else {
                  messageTimeString =
                    days == 1 ? `${days} day ago` : `${days} days ago`;
                }
                let messageReplyTimeString = "";
      
                if(ele.reply_msg != null){
      
                  let dbTime = ele.reply_created_at;
      
                  let newDate = new Date();
        
                  let UTCDate = new Date(
                    newDate.getUTCFullYear(),
                    newDate.getUTCMonth(),
                    newDate.getUTCDate(),
                    newDate.getUTCHours(),
                    newDate.getUTCMinutes(),
                    newDate.getUTCSeconds(),
                    newDate.getUTCMilliseconds()
                  );
        
                  let currentTime = Math.abs(
                    (UTCDate.getTime() / 1000).toFixed(0)
                  );
        
                  let futureTime = Math.abs(
                    (new Date(dbTime).getTime() / 1000).toFixed(0)
                  );
        
                  let TimeDifference = currentTime - futureTime;
        
                  let days = Math.floor(TimeDifference / 86400);
        
                  let hours = Math.floor(TimeDifference / 3600) % 24;
        
                  let minutes = Math.floor(TimeDifference / 60) % 60;
        
                  let seconds = Math.floor(TimeDifference % 60);
        
        
                  if (days == 0) {
                    if (hours == 0) {
                      if (minutes == 0) {
                        if (seconds == 0) {
                          messageReplyTimeString = `less than a second ago`;
                        } else {
                          messageReplyTimeString =
                            seconds == 1
                              ? `${seconds} second ago`
                              : `${seconds} seconds ago`;
                        }
                      } else {
                        messageReplyTimeString =
                          minutes == 1
                            ? `${minutes} minute ago`
                            : `${minutes} minutes ago`;
                      }
                    } else {
                      messageReplyTimeString =
                        hours == 1
                          ? `${hours} hour ago`
                          : `${hours} hours ago`;
                    }
                  } else {
                    messageReplyTimeString =
                      days == 1 ? `${days} day ago` : `${days} days ago`;
                  }
      
                  console.log('reply_msg',messageReplyTimeString)
      
      
                }
      
      
                document.getElementById("chatt-box-2").innerHTML += `
      
                <div class="card my-2 rounded">
                <div class="card-body p-2 px-2 d-flex justify-content-between align-items-center">
                  <div class="row " style='width:365px'>
                    <div class="img-p">
                      <img src="${ele.sender_image}" alt="" class="img-fluid rounded-circle">
                    </div>
                    <div class="card-left-content-box">
                      <div class="font-weight-bold name-top" style="font-size: 12px">
                      ${ele.sender_name}
                        <span class="time" style="
                            padding-left: 15px;
                            font-size: 8px;
                            line-height: 10px;
                            color: #636363;
                            font-weight: 400;
                          ">${messageTimeString}</span>
                      </div>
                      <div class="msg-box-chat">${ele.text}</div>
                      <span class="updating_text" style="display:none">${ele.text}</span>
                      


                    </div>
                  </div>
                  <button class="border-0 bg-transparent f-10 pointer position-absolute dropdown-btn" style="top: 8px; right: 8px">
                          <i class="fas fa-ellipsis-v"></i>
                          <div class="dropdown-list">
                          <span data-replied_id=${ele.id} class="Dmsprospect_message_edit_button">Edit</span>
                          <span  data-replied_id=${ele.id} class="Dmsprospect_message_delete_button">Delete</span>
                          <span class="prospect_updating_text" style="display:none">${ele.text}</span>
                          </div>
                          </button>
                </div>
  
  
                ${
                  ele.reply_msg ? 
                  
                  `<div class="card card-child" style="background-color: #e6edfa;
                  width: calc(74% + 56px);
                  border-radius: 0;
                  transform: translate(36px, -8px);">
                  <div class="card-body p-0 m-0">
                    <div class="d-flex w-100" style="margin-left:20px">
                      <div class="img-p">
                        <img src="${ele.reply_image}" alt="" class="img-fluid rounded-circle" />
                      </div>
                      <div class="card-left-content-box bg-transparent" style="width: 135px">
                        <div class="font-weight-bold name-top" style="font-size: 10px">
                          ${ele.reply_username}
                          <span class="time" style="
                                padding-left: 8px;
                                font-size: 6px;
                                line-height: 8px;
                                color: #636363;
                                font-weight: 400;
                              ">${messageReplyTimeString}</span>
                        </div>
                        <div class="msg-box-chat" style="font-size: 7px">
                          ${ele.reply_msg}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`
                :
                ""
                }
      
                <div data-replied-id=${ele.id} class="reply-box_">⤣ Reply</div>
               </div>
      
      
      
      
      
                `
      
                document.querySelectorAll(".reply-box_").forEach((ele) => {
                  ele.addEventListener("click", (e) => {
                    // dynamicModalClose();
                    // showNullChats();
                    localStorage.removeItem("edit_id")
                    document.getElementById("second_message_div").value = null;
                    document.getElementById("second_update_message_button").style.display = "none";
                    document.getElementById("second_send_message_button").style.display = "block";
                    document.getElementById("second_cancel_message_button").style.display = "none";
                    let currentMessage = e.currentTarget
                    console.log(currentMessage);
                    let message_id = currentMessage.getAttribute("data-replied-id");
                    console.log(message_id);
                    localStorage.setItem("replied_id", message_id)
      
                    document.querySelector(".prospect_edit-text-msg-box").style.display = "block"
                    // document.getElementById("update_message_button").style.display = "block"
                    // document.getElementById("cancel_message_button").style.display = "block"
      
                    currentMessage = e.currentTarget.parentElement
                    console.log(currentMessage);
                    let message = currentMessage.querySelector(".prospect_updating_text").innerHTML;
                    console.log(message);
                     let name = currentMessage.querySelector(".font-weight-bold").innerText
                    // currentMessage = e.currentTarget.parentElement
      
      
                    document.querySelector(".prospect_name-edit-box").innerText = name
                    document.querySelector(".prospect_msg").innerHTML = message
      
                    // document.getElementById("send_message_div").value = message
      
                    console.log("Reply")
                  });
                });
  
                document.querySelectorAll(".Dmsprospect_message_edit_button").forEach((ele) => {
                  ele.addEventListener("click", (e) => {
                    // dynamicModalClose();
                    // showNullChats();
                    document.querySelector(".prospect_edit-text-msg-box").style.display ="none";
                    localStorage.removeItem("replied_id");
                    let currentMessage = e.currentTarget
                    console.log(currentMessage);
                    let message_id = currentMessage.getAttribute("data-replied_id");
                    console.log(message_id);
                    localStorage.setItem("edit_id", message_id)
      
                    document.getElementById("second_send_message_button").style.display = "none"
                    document.getElementById("second_update_message_button").style.display = "block"
                    document.getElementById("second_cancel_message_button").style.display = "block"
      
                    currentMessage = e.currentTarget.parentElement
                    console.log(currentMessage);
                    let message = currentMessage.querySelector(".prospect_updating_text").innerHTML;
                    console.log(message);
      
                    document.getElementById("second_message_div").value = message
      
                    console.log("edit")
                  });
                });
                document.querySelectorAll(".Dmsprospect_message_delete_button").forEach((ele) => {
                  ele.addEventListener("click", (e) => {
                    // dynamicModalClose();
                    // showNullChats();
                    let currentMessage = e.currentTarget
                    console.log(currentMessage);
                    let message_id = currentMessage.getAttribute("data-replied_id");
                    console.log(message_id);
      
                    MessageDeleteModal.style.transform = "scale(1)";
                    MessageDeleteModal.style.opacity = 1;
                    document.getElementById("temporary_buttons").innerHTML = `
                    <button id="closeIt" class="btn btn-light-new">Cancel</button>
                    <button data-replied_id=${message_id} id="confirmation_delete" class="btn btn-danger-new">Delete</button>
                    `
                    document.getElementById("confirmation_delete").addEventListener("click", () => {
                      deleteDmsMessage();
                    });
                    console.log("delete")
                  });
                });
              }
            }
          });
  
          // setTimeout(() => {
          //   document
          //     .getElementById("showMembers")
          //     .addEventListener("click", dynamicModalOpenM);
          //   document.getElementById("showprospectBox").addEventListener("click", () => {
          //     dynamicModal.style.transform = "scale(1)";
          //     dynamicModal.style.opacity = 1;
          //   });
          //   document.getElementById("showprospectsanother").addEventListener("click", () => {
          //     dynamicModal.style.transform = "scale(1)";
          //     dynamicModal.style.opacity = 1;
          //   });
          //   document
          //     .getElementById("showDirectBox")
          //     .addEventListener("click", showNullChats);
          // }, 100);
        }
        else{
          console.log("here it is")
          localStorage.removeItem("lastDate")
        }

        chatMessageContent = document.getElementById("bottom-content-box");

        chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
        chatMessageContent = document.getElementById("another-bottom-content-box");
  
        chatMessageContent.scroll(0, chatMessageContent.scrollHeight);



      }
      else{
        document.getElementById("Conversations_button").style.display = "none"

      document.getElementById("customScreenChattBox").style.display = "block"
      document.querySelector(".prospect_name_heading").innerText =
      userMessages.email;
      document.querySelector(".prospect_name_heading").style.marginTop ="17px"
      document
        .getElementById("prospectImage")
        .setAttribute("data-link", userMessages.image);
        document.getElementById("prospect_image_heading").src =
        userMessages.image;
        document.getElementById("group_name_division").style.display = "none"
        document.getElementById("prospect_subgroup_name").style.display = "none"
        document.getElementById("for_clipper").style.display = "none"
        document.getElementById("for_DB").style.display = "none"
        document.querySelector(".desigination").style.display = "none"
        document.getElementById("Screen_notify_img").style.display = "none"


      document.querySelector(".rightUperRight").innerHTML = "";
      document.querySelector(".rightUpperBox").style.display = "flex";
      document.querySelector(".chatMessageContent").style.display = "block";
      document.querySelector(".chatControlBtn").style.display = "block";

      if (userMessages) {
        if (userMessages.image != null) {
          document.getElementById("prospect_image_heading").src =
          userMessages.image;
        } else {
          
        }
        document.querySelector(".rightUperLeft").innerHTML = `
        ${userMessages.image != null
            ? `<img src=${userMessages.image} />`
            : `<i class='fas fa-user'></i>`
          }
      `;
        document.querySelector(".rightUperRight").innerHTML = `
                <p id="userEmail">${userMessages.email}</p>
      `;
      }

      let chatMessageContent = document.querySelector(".chatMessageContent");
      chatMessageContent.innerHTML = "";

      if (userMessages.data) {
        temp = null
        counting_days = 1;
        document.getElementById("chatt-box-2").innerHTML = ``
        userMessages.data.map((ele, i) => {
          if (ele.text != null) {
            if(ele.text != null){
              let dbTime = ele.created_at;
    
              let newDate = new Date();
              var ajjtareekh
              if( (newDate.getUTCMonth()+1) < 10 && newDate.getUTCDate() < 10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+'0'+newDate.getUTCDate();
              }
              else if( (newDate.getUTCMonth()+1) < 10 &&  newDate.getUTCDate() >=10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+newDate.getUTCDate();
              }
              else if( (newDate.getUTCMonth()+1) >= 10 &&  newDate.getUTCDate() < 10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+'0'+newDate.getUTCDate();
              }
              else{
                ajjtareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+newDate.getUTCDate();
              }

              var kalltareekh
              if( (newDate.getUTCMonth()+1) < 10 && (newDate.getUTCDate()-1) < 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+'0'+(newDate.getUTCDate()-1);
              }
              if( (newDate.getUTCMonth()+1) < 10 && (newDate.getUTCDate()-1) >= 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+(newDate.getUTCDate()-1);
              }
              if( (newDate.getUTCMonth()+1) >= 10 && (newDate.getUTCDate()-1) < 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+'0'+(newDate.getUTCDate()-1);
              }
              else{
                kalltareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+(newDate.getUTCDate()-1);
              }

          myDate = dbTime.split(" ");
          console.log(ajjtareekh,"ajj")
          console.log(kalltareekh,"kall")
          console.log(myDate[0],"DB")
          console.log(temp,"temp")

          localStorage.removeItem("lastDate")
          if(temp == myDate[0]){
                counting_days = counting_days + 1;
          }
          else{
            if(ajjtareekh == myDate[0]){
              document.getElementById("chatt-box-2").innerHTML += `<div class="date-Wraper position-relative mb-3">
              <div class="all-date">Today</div>
              </div>`;
              counting_days = counting_days + 1
            }
            else if (kalltareekh == myDate[0]) {
              document.getElementById("chatt-box-2").innerHTML += `<div class="date-Wraper position-relative mb-3">
              <div class="all-date">Yesterday</div>
              </div>`;
              counting_days = counting_days + 1
            }
            else {
              document.getElementById("chatt-box-2").innerHTML += `<div class="date-Wraper position-relative mb-3">
                <div class="all-date">${myDate[0]}</div>
                </div>`;
                counting_days = counting_days + 1;
            }
            
            temp = myDate[0];

          }
          localStorage.setItem("lastDate",temp)
    
              let UTCDate = new Date(
                newDate.getUTCFullYear(),
                newDate.getUTCMonth(),
                newDate.getUTCDate(),
                newDate.getUTCHours(),
                newDate.getUTCMinutes(),
                newDate.getUTCSeconds(),
                newDate.getUTCMilliseconds()
              );
    
              let currentTime = Math.abs(
                (UTCDate.getTime() / 1000).toFixed(0)
              );
    
              let futureTime = Math.abs(
                (new Date(dbTime).getTime() / 1000).toFixed(0)
              );
    
              let TimeDifference = currentTime - futureTime;
    
              let days = Math.floor(TimeDifference / 86400);
    
              let hours = Math.floor(TimeDifference / 3600) % 24;
    
              let minutes = Math.floor(TimeDifference / 60) % 60;
    
              let seconds = Math.floor(TimeDifference % 60);
    
              let messageTimeString = "";
    
              if (days == 0) {
                if (hours == 0) {
                  if (minutes == 0) {
                    if (seconds == 0) {
                      messageTimeString = `less than a second ago`;
                    } else {
                      messageTimeString =
                        seconds == 1
                          ? `${seconds} second ago`
                          : `${seconds} seconds ago`;
                    }
                  } else {
                    messageTimeString =
                      minutes == 1
                        ? `${minutes} minute ago`
                        : `${minutes} minutes ago`;
                  }
                } else {
                  messageTimeString =
                    hours == 1
                      ? `${hours} hour ago`
                      : `${hours} hours ago`;
                }
              } else {
                messageTimeString =
                  days == 1 ? `${days} day ago` : `${days} days ago`;
              }
              let messageReplyTimeString = "";
    
              if(ele.reply_msg != null){
    
                let dbTime = ele.reply_created_at;
    
                let newDate = new Date();
      
                let UTCDate = new Date(
                  newDate.getUTCFullYear(),
                  newDate.getUTCMonth(),
                  newDate.getUTCDate(),
                  newDate.getUTCHours(),
                  newDate.getUTCMinutes(),
                  newDate.getUTCSeconds(),
                  newDate.getUTCMilliseconds()
                );
      
                let currentTime = Math.abs(
                  (UTCDate.getTime() / 1000).toFixed(0)
                );
      
                let futureTime = Math.abs(
                  (new Date(dbTime).getTime() / 1000).toFixed(0)
                );
      
                let TimeDifference = currentTime - futureTime;
      
                let days = Math.floor(TimeDifference / 86400);
      
                let hours = Math.floor(TimeDifference / 3600) % 24;
      
                let minutes = Math.floor(TimeDifference / 60) % 60;
      
                let seconds = Math.floor(TimeDifference % 60);
      
      
                if (days == 0) {
                  if (hours == 0) {
                    if (minutes == 0) {
                      if (seconds == 0) {
                        messageReplyTimeString = `less than a second ago`;
                      } else {
                        messageReplyTimeString =
                          seconds == 1
                            ? `${seconds} second ago`
                            : `${seconds} seconds ago`;
                      }
                    } else {
                      messageReplyTimeString =
                        minutes == 1
                          ? `${minutes} minute ago`
                          : `${minutes} minutes ago`;
                    }
                  } else {
                    messageReplyTimeString =
                      hours == 1
                        ? `${hours} hour ago`
                        : `${hours} hours ago`;
                  }
                } else {
                  messageReplyTimeString =
                    days == 1 ? `${days} day ago` : `${days} days ago`;
                }
    
                console.log('reply_msg',messageReplyTimeString)
    
    
              }
    
    
              document.getElementById("chatt-box-2").innerHTML += `
    
              <div class="card my-2 rounded">
              <div class="card-body p-2 px-2 d-flex justify-content-between align-items-center">
                <div class="row " style='width:365px'>
                  <div class="img-p">
                    <img src="${ele.sender_image}" alt="" class="img-fluid rounded-circle">
                  </div>
                  <div class="card-left-content-box">
                    <div class="font-weight-bold name-top" style="font-size: 12px">
                    ${ele.sender_name}
                      <span class="time" style="
                          padding-left: 15px;
                          font-size: 8px;
                          line-height: 10px;
                          color: #636363;
                          font-weight: 400;
                        ">${messageTimeString}</span>
                    </div>
                    <div class="msg-box-chat">${ele.text}</div>
                    <span class="updating_text" style="display:none">${ele.text}</span>
    

                    ${ ele.name ? `
                    
                    <div class="screenprospects_shared_box" style="
position: relative;
">
<div class="row" style="
align-items: center;
justify-content: left;
flex-wrap: nowrap;
height: 65px;
padding-bottom: 5px;
">
<div class="" style="
   margin: auto 6px auto 21px;
   ">
   <img src="${ele.image}" alt="profile-img">
</div>
<div class="" style="transform: translateY(1px);">
<span style="font-size: 15px;left: 17%;top: 15%;display: block;font-weight: 700;">${ele.comment != null ? `${ele.comment.length > 25 ? `"${ele.comment.slice(0,25)}...."` : `"${ele.comment}"`}` : ``}
    </span>
   <h3 class="title" style="
      margin-bottom: 0;
    font-size: 12px;
    line-height: 10px;
    font-weight: 800;
      ">${ele.name}</h3>
   <p class="desc" style="
      width: 200px;
      font-size: 11px;
      ">${ele.company.length > 70 ? `${ele.company.slice(0,70)}....` : `${ele.company}`}</p>
</div>
</div>
<div class="social-btn-box" style="
position: absolute;
top: -3px;
right: 7px;
">
${ele.delete_status == 0 ? `<button data-id=${ele.temporary_id} data-title="View Prospect Chat"  class="opening_perspective" style="
border: 0;
background: none;
cursor:pointer;
">
<img class="new_class" style="width: 18px;
height: 18px;
object-fit: cover;
border-radius: 50%;" src="./Assets/img/chat_redirect.png">
</button> ` : ``}

<button data-url=${ele.url} data-title="View LinkedIn Profile" class="opening_background" style="
         border: 0;
         background: none;
         cursor:pointer;
         ">
         <img class="new_class" style="width: 18px;
         height: 18px;
         object-fit: cover;
         border-radius: 50%;" src="./Assets/img/open_prospect.svg">
      </button> 
      <a href="#modal-12" data-title="View Prospect" data-prospect-id=${ele.temporary_id} data-id=${ele.sender_id} data-url=${ele.url} class="opening_clipper" style="
      border: 0;
      background: none;
      cursor:pointer;
      ">
      <img class="new_class" style="width: 18px;
      height: 18px;
      object-fit: cover;
      border-radius: 50%;" src="./Assets/img/open_background.svg">
   </a>
</div>
</div> ` : `` }



                  </div>
                </div>
                ${ ele.name ? `
                <span class="prospect_updating_text" style="display:none">${ele.text}</span>

                <button class="border-0 bg-transparent f-10 pointer position-absolute dropdown-btn" style="top: 8px; right: 8px">
                        <i class="fas fa-ellipsis-v"></i>
                        <div class="dropdown-list">
                        <span  data-replied_id=${ele.id} class="Dmsprospect_message_delete_button">Delete</span>
                        </div>
                        </button>

                ` : `
                
                <button class="border-0 bg-transparent f-10 pointer position-absolute dropdown-btn" style="top: 8px; right: 8px">
                        <i class="fas fa-ellipsis-v"></i>
                        <div class="dropdown-list">
                        <span data-replied_id=${ele.id} class="Dmsprospect_message_edit_button">Edit</span>
                        <span  data-replied_id=${ele.id} class="Dmsprospect_message_delete_button">Delete</span>
                        <span class="prospect_updating_text" style="display:none">${ele.text}</span>
                        </div>
                        </button>
                `}
                
              </div>


              ${
                ele.reply_msg ? 
                
                `<div class="card card-child" style="background-color: #e6edfa;
                width: calc(74% + 56px);
                border-radius: 0;
                transform: translate(36px, -8px);">
                <div class="card-body p-0 m-0">
                  <div class="d-flex w-100" style="margin-left:20px">
                    <div class="img-p">
                      <img src="${ele.reply_image}" alt="" class="img-fluid rounded-circle" />
                    </div>
                    <div class="card-left-content-box bg-transparent" style="width: 135px">
                      <div class="font-weight-bold name-top" style="font-size: 10px">
                        ${ele.reply_username}
                        <span class="time" style="
                              padding-left: 8px;
                              font-size: 6px;
                              line-height: 8px;
                              color: #636363;
                              font-weight: 400;
                            ">${messageReplyTimeString}</span>
                      </div>
                      <div class="msg-box-chat" style="font-size: 7px">
                        ${ele.reply_msg}
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
              :
              ""
              }
    
              <div data-replied-id=${ele.id} class="reply-box_">⤣ Reply</div>
             </div>
    
    
    
    
    
    
    
    
    
    
              `
              document.querySelectorAll(".opening_perspective").forEach((ele) => {
                ele.addEventListener("click", (e) => {
                  let currentMessage = e.currentTarget
                  let message_id = currentMessage.getAttribute("data-id");
                  
                  localStorage.setItem("prospect_id",message_id);
                  showProspectChat();
                  
                  console.log("perspective")
                });
              });

              document.querySelectorAll(".opening_clipper").forEach((ele) => {
                ele.addEventListener("click", (e) => {


                  var profile_link = e.currentTarget.getAttribute("data-url");
              var user_id = e.currentTarget.getAttribute("data-id");
              var prospect_id = e.currentTarget.getAttribute("data-prospect-id");
              var sending_id = localStorage.getItem("user_id");


              const url = `${globalURl}/get_prospect_Data`;

                              let xhr = new XMLHttpRequest();

                              xhr.open("POST", url, true);
                              xhr.setRequestHeader("Content-Type", "application/json");
                              xhr.send(
                                JSON.stringify({
                                  prospect_id,
                                  user_id: sending_id,
                                })
                              );

                              xhr.onreadystatechange = function () {
                                if (xhr.readyState == 4 && xhr.status == 200) {
                                  let userData = JSON.parse(xhr.responseText);
                                  if (userData.data) {
                                    if(userData.data.prospect_status == "no"){
                                      document.getElementById("send_CRM").style.display = "none";
                                    }
                                    else{
                                      document.getElementById("send_CRM").style.display = "block";
                                      document.getElementById("prospect_status_image").value = userData.data.prospect_status_image;
                                      document.getElementById("prospect_status_name").value = userData.data.prospect_status_name;
                                    }
                                    document.querySelector(".prospect_name_heading_comment").innerText = userData.data.name
                                    document.getElementById("prospect_image_heading_comment").src = userData.data.image
                                    document.querySelector(".desigination_comment").innerText = `${userData.data.description.length > 30 ? `${userData.data.description.slice(0,30)}....` : `${userData.data.description}`}`;
                                    document.querySelector(".prospect_group_name_comment").innerText = userData.data.company
                                    document.querySelector(".prospect_subgroup_name_comment").innerText = userData.data.address
                                    document.querySelector(".prospect_subgroup_status_comment").innerText = userData.data.status
                                    document.querySelector(".notes_comment").innerText = `${userData.data.notes == null ? `Notes not added` : `${userData.data.notes}`}`  
                                  }
                                    
                                  
                                }
                              }




              localStorage.setItem("commentID", JSON.stringify(commentArray));
                document.querySelector(".taggedUser").innerHTML = "";
                document.getElementById("comment_box").value = "";
                document.getElementById("temporary_sender").value = user_id;
                document.getElementById("temporary_url").value = profile_link;
                document.getElementById("temporary_prospect_id").value = prospect_id;



                var access_token = localStorage.getItem("access_token");
                var username = localStorage.getItem("username");

                if (access_token && username) {
                  document.getElementById("comment_box").disabled = false;

                  setTimeout(() => {
                    const url = `${globalURl}/getComments`;

                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", url, true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(
                      JSON.stringify({
                        profile_link: profile_link,
                        secondary_id: user_id,
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
                  // var link = e.currentTarget.getAttribute("data-url");
                  // var prospect_id = e.currentTarget.getAttribute("data-id");
                  // user_id = 0;
                  // console.log(link, 'link')
                  // console.log(prospect_id, 'id')
                  // const url = `${globalURl}/get_prospect_Data`;
    
                  //   let xhr = new XMLHttpRequest();
    
                  //   xhr.open("POST", url, true);
                  //   xhr.setRequestHeader("Content-Type", "application/json");
                  //   xhr.send(
                  //     JSON.stringify({
                  //       link
                  //     })
                  //   );
    
                  //   xhr.onreadystatechange = function () {
                  //     if (xhr.readyState == 4 && xhr.status == 200) {
                  //       let userData = JSON.parse(xhr.responseText);
                  //       if (userData.data) {
                  //         localStorage.setItem("prospectData", JSON.stringify(userData.data));
                  //         localStorage.setItem("modalProspectId", prospect_id);
                  //         localStorage.setItem("modalProspectLink", link);
                  //         localStorage.setItem("isImageClicked", true);
                  //         window.location.replace("popup.html");
                  //       }
                          
                        
                  //     }
                  //   }
                });
              })
    
              document.querySelectorAll(".opening_background").forEach((ele) => {
                ele.addEventListener("click", (e) => {
                  let currentMessage = e.currentTarget
                  let message_id = currentMessage.getAttribute("data-url");
                  let params = {
                    active: true,
                    currentWindow: true,
                  };
                  chrome.tabs.query(params, gotTab);
          
                  function gotTab(tabs) {
                    let msg = {
                      txt: message_id,
                    };
                    chrome.tabs.sendMessage(tabs[0].id, msg);
                  }
                  console.log("background")
                });
              });
    
              document.querySelectorAll(".reply-box_").forEach((ele) => {
                ele.addEventListener("click", (e) => {
                  // dynamicModalClose();
                  // showNullChats();
                  localStorage.removeItem("edit_id")
                    document.getElementById("second_message_div").value = null;
                    document.getElementById("second_update_message_button").style.display = "none";
                    document.getElementById("second_send_message_button").style.display = "block";
                    document.getElementById("second_cancel_message_button").style.display = "none";
                  let currentMessage = e.currentTarget
                  console.log(currentMessage);
                  let message_id = currentMessage.getAttribute("data-replied-id");
                  console.log(message_id);
                  localStorage.setItem("replied_id", message_id)
    
                  document.querySelector(".prospect_edit-text-msg-box").style.display = "block"
                  // document.getElementById("update_message_button").style.display = "block"
                  // document.getElementById("cancel_message_button").style.display = "block"
    
                  currentMessage = e.currentTarget.parentElement
                  console.log(currentMessage);
                  let message = currentMessage.querySelector(".prospect_updating_text").innerHTML;
                  console.log(message);
                   let name = currentMessage.querySelector(".font-weight-bold").innerText
                  // currentMessage = e.currentTarget.parentElement
    
    
                  document.querySelector(".prospect_name-edit-box").innerText = name
                  document.querySelector(".prospect_msg").innerHTML = message
    
                  // document.getElementById("send_message_div").value = message
    
                  console.log("Reply")
                });
              });

              document.querySelectorAll(".Dmsprospect_message_edit_button").forEach((ele) => {
                ele.addEventListener("click", (e) => {
                  // dynamicModalClose();
                  // showNullChats();
                  document.querySelector(".prospect_edit-text-msg-box").style.display ="none";
                  localStorage.removeItem("replied_id");
                  let currentMessage = e.currentTarget
                  console.log(currentMessage);
                  let message_id = currentMessage.getAttribute("data-replied_id");
                  console.log(message_id);
                  localStorage.setItem("edit_id", message_id)
    
                  document.getElementById("second_send_message_button").style.display = "none"
                  document.getElementById("second_update_message_button").style.display = "block"
                  document.getElementById("second_cancel_message_button").style.display = "block"
    
                  currentMessage = e.currentTarget.parentElement
                  console.log(currentMessage);
                  let message = currentMessage.querySelector(".prospect_updating_text").innerHTML;
                  console.log(message);
    
                  document.getElementById("second_message_div").value = message
    
                  console.log("edit")
                });
              });
              document.querySelectorAll(".Dmsprospect_message_delete_button").forEach((ele) => {
                ele.addEventListener("click", (e) => {
                  // dynamicModalClose();
                  // showNullChats();
                  let currentMessage = e.currentTarget
                  console.log(currentMessage);
                  let message_id = currentMessage.getAttribute("data-replied_id");
                  console.log(message_id);
    
                  MessageDeleteModal.style.transform = "scale(1)";
                  MessageDeleteModal.style.opacity = 1;
                  document.getElementById("temporary_buttons").innerHTML = `
                  <button id="closeIt" class="btn btn-light-new">Cancel</button>
                  <button data-replied_id=${message_id} id="confirmation_delete" class="btn btn-danger-new">Delete</button>
                  `
                  if (document.getElementById("closeIt")) {
                    document
                      .getElementById("closeIt")
                      .addEventListener("click", closeSubGroupModal);
                  }
                  document.getElementById("confirmation_delete").addEventListener("click", () => {
                    deleteDmsMessage();
                  });
                  console.log("delete")
                });
              });
    
    
    
              // document.querySelectorAll(".message_edit_button").forEach((ele) => {
              //   ele.addEventListener("click", (e) => {
              //     // dynamicModalClose();
              //     // showNullChats();
              //     document.querySelector(".edit-text-msg-box").style.display ="none";
              //     localStorage.removeItem("replied_id");
              //     let currentMessage = e.currentTarget
              //     console.log(currentMessage);
              //     let message_id = currentMessage.getAttribute("data-replied_id");
              //     console.log(message_id);
              //     localStorage.setItem("edit_id", message_id)
    
              //     document.getElementById("send_message_button").style.display = "none"
              //     document.getElementById("update_message_button").style.display = "block"
              //     document.getElementById("cancel_message_button").style.display = "block"
    
              //     currentMessage = e.currentTarget.parentElement
              //     console.log(currentMessage);
              //     let message = currentMessage.querySelector(".updating_text").innerHTML;
              //     console.log(message);
    
              //     document.getElementById("send_message_div").value = message
    
              //     console.log("edit")
              //   });
              // });
    
    
    
              // document.querySelectorAll(".message_delete_button").forEach((ele) => {
              //   ele.addEventListener("click", (e) => {
              //     dynamicModalClose();
              //     showNullChats();
              //     let currentMessage = e.currentTarget
              //     console.log(currentMessage);
              //     let message_id = currentMessage.getAttribute("data-replied_id");
              //     console.log(message_id);
    
              //     MessageDeleteModal.style.transform = "scale(1)";
              //     MessageDeleteModal.style.opacity = 1;
              //     document.getElementById("temporary_buttons").innerHTML = `
              //     <button class="btn btn-light-new">Cancel</button>
              //     <button data-replied_id=${message_id} id="confirmation_delete" class="btn btn-danger-new">Delete</button>
              //     `
              //     document.getElementById("confirmation_delete").addEventListener("click", () => {
              //       deleteGroupMessage();
              //     });
              //     console.log("delete")
              //   });
              // });
            }
          }
        });

        
      }
      else{
        localStorage.removeItem("lastDate")
      }

      document.querySelector(".dynamicContainer").innerHTML = ``
      groupprospectsArr = [];
      document.getElementById("showprospectBox").innerText = "Prospect:" + userMessages.total_prospect
      document.getElementById("showprospectsanother").innerText = "Prospect:" + userMessages.total_prospect
      if (userMessages.prospects) {
        localStorage.removeItem("prospects_data")
        userMessages.prospects.map((ele) => {
          let prospect = {
            "id": ele.prospect_id,
            "name": ele.prospect_data.name,
            "image": ele.prospect_data.image,
            "sender_name": ele.sender_name,
            "database": ele.database,
            "notification": ele.notifications,
          }
          groupprospectsArr.push(prospect);
          console.log(groupmembersArr);
          console.log(prospect);
          if (ele.prospect_data) {
            
            document.querySelector(".dynamicContainer").innerHTML += `
  
                  <div class="prospectContentContainer">
                    <div class="prospectContent" data-prospect_id=${ele.prospect_id
              }>
                                
                      <img src=${ele.prospect_data.image ? `${ele.prospect_data.image}` : `.Assets/img/user.png`} alt=""/>
              
                      <div>
                        <h1>${ele.prospect_data.name}</h1>
                        <h2>${ele.sender_name != null
                ? `By ${ele.sender_name} ${ele.database != null
                  ? `from ${ele.database}`
                  : ""
                }`
                : ""
              }
                        </h2>
                      </div>
              
                      ${ele.notifications != 0 && ele.notifications != null
                ? `<span>${ele.notifications}</span>`
                : ""
              }
  
                    </div>
                    <i class="fas fa-trash prospectDeleteIcon groupProspectDelete"></i>
                    </div>
                    `;
          }
        });



        document.querySelectorAll(".groupProspectDelete").forEach((ele) => {
          ele.addEventListener("click", groupProspectDelete);
        });

        document.querySelectorAll(".prospectContent").forEach((element) => {
          element.addEventListener("click" , () => { 
            var console = element.getAttribute("data-prospect_id")
            localStorage.setItem("prospect_id",console);
            showProspectChat();
        });
      })
        localStorage.setItem("prospects_data", JSON.stringify(groupprospectsArr))
        groupprospectsArr = [];
      } else {

      }

      chatMessageContent = document.getElementById("bottom-content-box");

      chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
      chatMessageContent = document.getElementById("another-bottom-content-box");

      chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
    }

      
    }
  };
}

function activeClassInject(e) {
  check = Number(e.currentTarget.getAttribute("date-linkedId"));
  console.log(check,"check");
  if(SearchUserArray.indexOf(check) !== -1){
    SearchUserArray.splice(SearchUserArray.indexOf(check), 1)
  }
  console.log("here",SearchUserArray)
  e.currentTarget.classList.toggle("chatContentH1DotActive");
}

function openModal1() {
  modalContainer1.style.transform = "scale(1)";
  modalContainer1.style.opacity = 1;
}

function openModal2() {

  modalContainer2.style.transform = "scale(1)";
  modalContainer2.style.opacity = 1;
  // document.querySelector(".startChartBtn1").innerText = "Create Group";
}
function openModal100() {
  localStorage.setItem("sub_group", true);
  dynamicModalClose();
  modalContainer2.style.transform = "scale(1)";
  modalContainer2.style.opacity = 1;

  document.querySelector(".startChartBtn1").innerText = "Add Sub Group";
  var mainContentContainer = document.querySelector(".mainContentContainer1");

  mainContentContainer.innerHTML = ``;

  document.getElementById("groupName").value = "";

  var user_id = localStorage.getItem("user_id");
  var group_id = localStorage.getItem("group_id");

  const url = `${globalURl}/group_members/${user_id}/${group_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.length != 0) {
        userData.map((item, i, arr) => {
          var row = `
            <div class="chatContent" date-linkedId=${item.linked_to_id}>
                              
              <div class="defaultIcon" style='${item.image != null
              ? "border: none; margin-left: 10px"
              : "border: 1px solid #999"
            }'>
              ${item.image != null
              ? `<img src=${item.image} />`
              : `<i class='fas fa-user'></i>`
            }
                  
              </div>
  
              <h1 class="userEmail">${item.email}</h1>
  
              <div class="dotCircle"></div>
                  
            </div>`;
          mainContentContainer.innerHTML += row;
        });
      } else {
        mainContentContainer.innerHTML = `
            <div class="chatContent">
  
              <h1 class="userEmail" >Add Members to create group</h1>
                  
            </div>`;
      }
    }
  };
}
function openModal25() {
  var back = localStorage.getItem("backpage");
  if (back != null) {
    modalContainer2.style.transform = "scale(1)";
    modalContainer2.style.opacity = 1;
    localStorage.removeItem("backpage");

    var mainContentContainer = document.querySelector(".mainContentContainer1");


    var user_id = localStorage.getItem("user_id");

    const url = `${globalURl}/chats/${user_id}`;

    let xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let userData = JSON.parse(xhr.responseText);

        if (userData.length != 0) {
          userData.map((item, i, arr) => {
            var row = `
            <div class="chatContent" date-linkedId=${item.linked_to_id}>
                              
              <div class="defaultIcon" style='${item.image != null
                ? "border: none; margin-left: 10px"
                : "border: 1px solid #999"
              }'>
              ${item.image != null
                ? `<img src=${item.image} />`
                : `<i class='fas fa-user'></i>`
              }
                  
              </div>
  
              <h1 class="userEmail">${item.email}</h1>
  
              <div class="dotCircle"></div>
                  
            </div>`;
            mainContentContainer.innerHTML += row;
          });
        } else {
          mainContentContainer.innerHTML = `
            <div class="chatContent">
  
              <h1 class="userEmail" >Add Members to create group</h1>
                  
            </div>`;
        }
      }
    };


    document
      .getElementById("add_member2")
      .addEventListener("click", addmemberpage);
  }
}

function closeModal1() {
  SearchUserArray = [];
  modalContainer1.style.transform = "scale(0)";
  modalContainer1.style.opacity = 0;
}

function closeModal2() {
  var mainContentContainer = document.querySelector(".mainContentContainer1");
  mainContentContainer.innerHTML = ``
  modalContainer2.style.transform = "scale(0)";
  modalContainer2.style.opacity = 0;
  document.querySelector('#groupAvatar').src = "./Assets/img/group-bg.png"
}
if (document.getElementById("home_btn")) {
  document
    .getElementById("home_btn")
    .addEventListener("click", redirectHomePage);
}

function redirectHomePage() {
  document.location.href = "home.html";
}

if (document.getElementById("profile_btn")) {
  document
    .getElementById("profile_btn")
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
    window.location.reload();
    document.location.href = "popup.html";
  }
}

if (document.getElementById("sendMsgBtn")) {
  document.getElementById("sendMsgBtn").addEventListener("click", sendMessage);
}

function sendMessage(e) {
  document.querySelectorAll(".menuBox").forEach((ele) => {
    ele.style.display = "none";
  });

  let msgInp = document.getElementById("second_message_div");

  var user_id = localStorage.getItem("user_id");
  var receiver_id = localStorage.getItem("reciever_id");
  var replied_id = localStorage.getItem("replied_id");
  var prospect_id = localStorage.getItem("prospect_id");

  if (msgInp.value !== "") {
    if (document.getElementById("updateMsgBtn").style.display == "none") {
      const url = `${globalURl}/send_message`;

      let xhr = new XMLHttpRequest();

      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          user_id,
          receiver_id,
          text: msgInp.value,
          replied_id,
          prospect_id,
        })
      );

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let userMessages = JSON.parse(xhr.responseText);
          document.getElementById("second_message_div").value = ""
          
          let chatMessageContent = document.querySelector(
            ".chatMessageContent"
          );

          if (userMessages.length > 0) {
            userMessages.map((ele, i) => {
              if (ele.text != null) {
                if(ele.text != null){
                  let dbTime = ele.created_at;
        
                  temp = localStorage.getItem("lastDate")
                let newDate = new Date();

                var ajjtareekh
              if( (newDate.getUTCMonth()+1) < 10 && newDate.getUTCDate() < 10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+'0'+newDate.getUTCDate();
              }
              else if( (newDate.getUTCMonth()+1) < 10 &&  newDate.getUTCDate() >=10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+newDate.getUTCDate();
              }
              else if( (newDate.getUTCMonth()+1) >= 10 &&  newDate.getUTCDate() < 10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+'0'+newDate.getUTCDate();
              }
              else{
                ajjtareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+newDate.getUTCDate();
              }

              var kalltareekh
              if( (newDate.getUTCMonth()+1) < 10 && (newDate.getUTCDate()-1) < 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+'0'+(newDate.getUTCDate()-1);
              }
              if( (newDate.getUTCMonth()+1) < 10 && (newDate.getUTCDate()-1) >= 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+(newDate.getUTCDate()-1);
              }
              if( (newDate.getUTCMonth()+1) >= 10 && (newDate.getUTCDate()-1) < 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+'0'+(newDate.getUTCDate()-1);
              }
              else{
                kalltareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+(newDate.getUTCDate()-1);
              }
          myDate = dbTime.split(" ");
          console.log(ajjtareekh,"ajj")
          console.log(kalltareekh,"kall")
          console.log(myDate[0],"DB")
          console.log(temp,"temp")

          if(temp == myDate[0]){
                counting_days = counting_days + 1;
          }
          else{
            localStorage.removeItem("lastDate")
            if(ajjtareekh == myDate[0]){
              document.getElementById("chatt-box-2").innerHTML += `<div class="date-Wraper position-relative mb-3">
              <div class="all-date">Today</div>
              </div>`;
              counting_days = counting_days + 1
            }
            else if (kalltareekh == myDate[0]) {
              document.getElementById("chatt-box-2").innerHTML += `<div class="date-Wraper position-relative mb-3">
              <div class="all-date">Yesterday</div>
              </div>`;
              counting_days = counting_days + 1
            }
            else {
              document.getElementById("chatt-box-2").innerHTML += `<div class="date-Wraper position-relative mb-3">
                <div class="all-date">${myDate[0]}</div>
                </div>`;
                counting_days = counting_days + 1;
            }
            
            temp = myDate[0];

            localStorage.setItem("lastDate",temp)
            

          }
        
                  let UTCDate = new Date(
                    newDate.getUTCFullYear(),
                    newDate.getUTCMonth(),
                    newDate.getUTCDate(),
                    newDate.getUTCHours(),
                    newDate.getUTCMinutes(),
                    newDate.getUTCSeconds(),
                    newDate.getUTCMilliseconds()
                  );
        
                  let currentTime = Math.abs(
                    (UTCDate.getTime() / 1000).toFixed(0)
                  );
        
                  let futureTime = Math.abs(
                    (new Date(dbTime).getTime() / 1000).toFixed(0)
                  );
        
                  let TimeDifference = currentTime - futureTime;
        
                  let days = Math.floor(TimeDifference / 86400);
        
                  let hours = Math.floor(TimeDifference / 3600) % 24;
        
                  let minutes = Math.floor(TimeDifference / 60) % 60;
        
                  let seconds = Math.floor(TimeDifference % 60);
        
                  let messageTimeString = "";
        
                  if (days == 0) {
                    if (hours == 0) {
                      if (minutes == 0) {
                        if (seconds == 0) {
                          messageTimeString = `less than a second ago`;
                        } else {
                          messageTimeString =
                            seconds == 1
                              ? `${seconds} second ago`
                              : `${seconds} seconds ago`;
                        }
                      } else {
                        messageTimeString =
                          minutes == 1
                            ? `${minutes} minute ago`
                            : `${minutes} minutes ago`;
                      }
                    } else {
                      messageTimeString =
                        hours == 1
                          ? `${hours} hour ago`
                          : `${hours} hours ago`;
                    }
                  } else {
                    messageTimeString =
                      days == 1 ? `${days} day ago` : `${days} days ago`;
                  }
                  let messageReplyTimeString = "";
        
                  if(ele.reply_msg != null){
        
                    let dbTime = ele.reply_created_at;
        
                    let newDate = new Date();
          
                    let UTCDate = new Date(
                      newDate.getUTCFullYear(),
                      newDate.getUTCMonth(),
                      newDate.getUTCDate(),
                      newDate.getUTCHours(),
                      newDate.getUTCMinutes(),
                      newDate.getUTCSeconds(),
                      newDate.getUTCMilliseconds()
                    );
          
                    let currentTime = Math.abs(
                      (UTCDate.getTime() / 1000).toFixed(0)
                    );
          
                    let futureTime = Math.abs(
                      (new Date(dbTime).getTime() / 1000).toFixed(0)
                    );
          
                    let TimeDifference = currentTime - futureTime;
          
                    let days = Math.floor(TimeDifference / 86400);
          
                    let hours = Math.floor(TimeDifference / 3600) % 24;
          
                    let minutes = Math.floor(TimeDifference / 60) % 60;
          
                    let seconds = Math.floor(TimeDifference % 60);
          
          
                    if (days == 0) {
                      if (hours == 0) {
                        if (minutes == 0) {
                          if (seconds == 0) {
                            messageReplyTimeString = `less than a second ago`;
                          } else {
                            messageReplyTimeString =
                              seconds == 1
                                ? `${seconds} second ago`
                                : `${seconds} seconds ago`;
                          }
                        } else {
                          messageReplyTimeString =
                            minutes == 1
                              ? `${minutes} minute ago`
                              : `${minutes} minutes ago`;
                        }
                      } else {
                        messageReplyTimeString =
                          hours == 1
                            ? `${hours} hour ago`
                            : `${hours} hours ago`;
                      }
                    } else {
                      messageReplyTimeString =
                        days == 1 ? `${days} day ago` : `${days} days ago`;
                    }
        
                    console.log('reply_msg',messageReplyTimeString)
        
        
                  }
        
        
                  document.getElementById("chatt-box-2").innerHTML += `
        
                  <div class="card my-2 rounded">
              <div class="card-body p-2 px-2 d-flex justify-content-between align-items-center">
                <div class="row " style='width:365px'>
                  <div class="img-p">
                    <img src="${ele.sender_image}" alt="" class="img-fluid rounded-circle">
                  </div>
                  <div class="card-left-content-box">
                    <div class="font-weight-bold name-top" style="font-size: 12px">
                    ${ele.sender_name}
                      <span class="time" style="
                          padding-left: 15px;
                          font-size: 8px;
                          line-height: 10px;
                          color: #636363;
                          font-weight: 400;
                        ">${messageTimeString}</span>
                    </div>
                    <div class="msg-box-chat">${ele.text}</div>
                    <span class="updating_text" style="display:none">${ele.text}</span>
    
                  </div>
                </div>
                <button class="border-0 bg-transparent f-10 pointer position-absolute dropdown-btn" style="top: 8px; right: 8px">
                        <i class="fas fa-ellipsis-v"></i>
                        <div class="dropdown-list">
                        <span data-replied_id=${ele.id} class="Dmsprospect_message_edit_button">Edit</span>
                        <span  data-replied_id=${ele.id} class="Dmsprospect_message_delete_button">Delete</span>
                        <span class="prospect_updating_text" style="display:none">${ele.text}</span>
                        </div>
                        </button>
              </div>


              ${
                ele.reply_msg ? 
                
                `<div class="card card-child" style="background-color: #e6edfa;
                width: calc(74% + 56px);
                border-radius: 0;
                transform: translate(36px, -8px);">
                <div class="card-body p-0 m-0">
                  <div class="d-flex w-100" style="margin-left:20px">
                    <div class="img-p">
                      <img src="${ele.reply_image}" alt="" class="img-fluid rounded-circle" />
                    </div>
                    <div class="card-left-content-box bg-transparent" style="width: 135px">
                      <div class="font-weight-bold name-top" style="font-size: 10px">
                        ${ele.reply_username}
                        <span class="time" style="
                              padding-left: 8px;
                              font-size: 6px;
                              line-height: 8px;
                              color: #636363;
                              font-weight: 400;
                            ">${messageReplyTimeString}</span>
                      </div>
                      <div class="msg-box-chat" style="font-size: 7px">
                        ${ele.reply_msg}
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
              :
              ""
              }
    
              <div data-replied-id=${ele.id} class="reply-box_">⤣ Reply</div>
             </div>
        
        
        
        
        
                  `
                  document.querySelectorAll(".opening_perspective").forEach((ele) => {
                    ele.addEventListener("click", (e) => {
                      let currentMessage = e.currentTarget
                      let message_id = currentMessage.getAttribute("data-id");
                      
                      localStorage.setItem("prospect_id",message_id);
                      showProspectChat();
                      
                      console.log("perspective")
                    });
                  });

                  document.querySelectorAll(".opening_clipper").forEach((ele) => {
                    ele.addEventListener("click", (e) => {
    
    
                  var profile_link = e.currentTarget.getAttribute("data-url");
                  var user_id = e.currentTarget.getAttribute("data-id");
                  var sending_id = localStorage.getItem("user_id");
                  var prospect_id = e.currentTarget.getAttribute("data-prospect-id");
                            
                  const url = `${globalURl}/get_prospect_Data`;

                    let xhr = new XMLHttpRequest();

                    xhr.open("POST", url, true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(
                      JSON.stringify({
                        prospect_id,
                        user_id: sending_id,
                      })
                    );

                    xhr.onreadystatechange = function () {
                      if (xhr.readyState == 4 && xhr.status == 200) {
                        let userData = JSON.parse(xhr.responseText);
                        if (userData.data) {
                          if(userData.data.prospect_status == "no"){
                            document.getElementById("send_CRM").style.display = "none";
                          }
                          else{
                            document.getElementById("send_CRM").style.display = "block";
                            document.getElementById("prospect_status_image").value = userData.data.prospect_status_image;
                            document.getElementById("prospect_status_name").value = userData.data.prospect_status_name;;

                          }
                          document.querySelector(".prospect_name_heading_comment").innerText = userData.data.name
                          document.getElementById("prospect_image_heading_comment").src = userData.data.image
                          document.querySelector(".desigination_comment").innerText = `${userData.data.description.length > 30 ? `${userData.data.description.slice(0,30)}....` : `${userData.data.description}`}`;
                          document.querySelector(".prospect_group_name_comment").innerText = userData.data.company
                          document.querySelector(".prospect_subgroup_name_comment").innerText = userData.data.address
                          document.querySelector(".prospect_subgroup_status_comment").innerText = userData.data.status
                          document.querySelector(".notes_comment").innerText = `${userData.data.notes == null ? `Notes not added` : `${userData.data.notes}`}`  
                        }
                          
                        
                      }
                    }
    
                  localStorage.setItem("commentID", JSON.stringify(commentArray));
                    document.querySelector(".taggedUser").innerHTML = "";
                    document.getElementById("comment_box").value = "";
                    document.getElementById("temporary_sender").value = user_id;
                    document.getElementById("temporary_url").value = profile_link;
                    document.getElementById("temporary_prospect_id").value = prospect_id;

    
    
                    var access_token = localStorage.getItem("access_token");
                    var username = localStorage.getItem("username");
    
                    if (access_token && username) {
                      document.getElementById("comment_box").disabled = false;
    
                      setTimeout(() => {
                        const url = `${globalURl}/getComments`;
    
                        var xhr = new XMLHttpRequest();
                        xhr.open("POST", url, true);
                        xhr.setRequestHeader("Content-Type", "application/json");
                        xhr.send(
                          JSON.stringify({
                            profile_link: profile_link,
                            secondary_id: user_id,
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
                      // var link = e.currentTarget.getAttribute("data-url");
                      // var prospect_id = e.currentTarget.getAttribute("data-id");
                      // user_id = 0;
                      // console.log(link, 'link')
                      // console.log(prospect_id, 'id')
                      // const url = `${globalURl}/get_prospect_Data`;
        
                      //   let xhr = new XMLHttpRequest();
        
                      //   xhr.open("POST", url, true);
                      //   xhr.setRequestHeader("Content-Type", "application/json");
                      //   xhr.send(
                      //     JSON.stringify({
                      //       link
                      //     })
                      //   );
        
                      //   xhr.onreadystatechange = function () {
                      //     if (xhr.readyState == 4 && xhr.status == 200) {
                      //       let userData = JSON.parse(xhr.responseText);
                      //       if (userData.data) {
                      //         localStorage.setItem("prospectData", JSON.stringify(userData.data));
                      //         localStorage.setItem("modalProspectId", prospect_id);
                      //         localStorage.setItem("modalProspectLink", link);
                      //         localStorage.setItem("isImageClicked", true);
                      //         window.location.replace("popup.html");
                      //       }
                              
                            
                      //     }
                      //   }
                    });
                  })
        
                  document.querySelectorAll(".opening_background").forEach((ele) => {
                    ele.addEventListener("click", (e) => {
                      let currentMessage = e.currentTarget
                      let message_id = currentMessage.getAttribute("data-url");
                      let params = {
                        active: true,
                        currentWindow: true,
                      };
                      chrome.tabs.query(params, gotTab);
              
                      function gotTab(tabs) {
                        let msg = {
                          txt: message_id,
                        };
                        chrome.tabs.sendMessage(tabs[0].id, msg);
                      }
                      console.log("background")
                    });
                  });
        
                  document.querySelectorAll(".reply-box_").forEach((ele) => {
                    ele.addEventListener("click", (e) => {
                      // dynamicModalClose();
                      // showNullChats();
                      localStorage.removeItem("edit_id")
                    document.getElementById("second_message_div").value = null;
                    document.getElementById("second_update_message_button").style.display = "none";
                    document.getElementById("second_send_message_button").style.display = "block";
                    document.getElementById("second_cancel_message_button").style.display = "none";
                      let currentMessage = e.currentTarget
                      console.log(currentMessage);
                      let message_id = currentMessage.getAttribute("data-replied-id");
                      console.log(message_id);
                      localStorage.setItem("replied_id", message_id)
        
                      document.querySelector(".prospect_edit-text-msg-box").style.display = "block"
                      // document.getElementById("update_message_button").style.display = "block"
                      // document.getElementById("cancel_message_button").style.display = "block"
        
                      currentMessage = e.currentTarget.parentElement
                      console.log(currentMessage);
                      let message = currentMessage.querySelector(".prospect_updating_text").innerHTML;
                      console.log(message);
                       let name = currentMessage.querySelector(".font-weight-bold").innerText
                      // currentMessage = e.currentTarget.parentElement
        
        
                      document.querySelector(".prospect_name-edit-box").innerText = name
                      document.querySelector(".prospect_msg").innerHTML = message
        
                      // document.getElementById("send_message_div").value = message
        
                      console.log("Reply")
                    });
                  });

                  document.querySelectorAll(".Dmsprospect_message_edit_button").forEach((ele) => {
                    ele.addEventListener("click", (e) => {
                      // dynamicModalClose();
                      // showNullChats();
                      document.querySelector(".prospect_edit-text-msg-box").style.display ="none";
                      localStorage.removeItem("replied_id");
                      let currentMessage = e.currentTarget
                      console.log(currentMessage);
                      let message_id = currentMessage.getAttribute("data-replied_id");
                      console.log(message_id);
                      localStorage.setItem("edit_id", message_id)
        
                      document.getElementById("second_send_message_button").style.display = "none"
                      document.getElementById("second_update_message_button").style.display = "block"
                      document.getElementById("second_cancel_message_button").style.display = "block"
        
                      currentMessage = e.currentTarget.parentElement
                      console.log(currentMessage);
                      let message = currentMessage.querySelector(".prospect_updating_text").innerHTML;
                      console.log(message);
        
                      document.getElementById("second_message_div").value = message
        
                      console.log("edit")
                    });
                  });


                  document.querySelectorAll(".Dmsprospect_message_delete_button").forEach((ele) => {
                    ele.addEventListener("click", (e) => {
                      // dynamicModalClose();
                      // showNullChats();
                      let currentMessage = e.currentTarget
                      console.log(currentMessage);
                      let message_id = currentMessage.getAttribute("data-replied_id");
                      console.log(message_id);
        
                      MessageDeleteModal.style.transform = "scale(1)";
                      MessageDeleteModal.style.opacity = 1;
                      document.getElementById("temporary_buttons").innerHTML = `
                      <button id="closeIt" class="btn btn-light-new">Cancel</button>
                      <button data-replied_id=${message_id} id="confirmation_delete" class="btn btn-danger-new">Delete</button>
                      `
                      if (document.getElementById("closeIt")) {
                        document
                          .getElementById("closeIt")
                          .addEventListener("click", closeSubGroupModal);
                      }
                      document.getElementById("confirmation_delete").addEventListener("click", () => {
                        deleteDmsMessage();
                      });
                      console.log("delete")
                    });
                  });
        
        
        
                  // document.querySelectorAll(".message_edit_button").forEach((ele) => {
                  //   ele.addEventListener("click", (e) => {
                  //     // dynamicModalClose();
                  //     // showNullChats();
                  //     document.querySelector(".edit-text-msg-box").style.display ="none";
                  //     localStorage.removeItem("replied_id");
                  //     let currentMessage = e.currentTarget
                  //     console.log(currentMessage);
                  //     let message_id = currentMessage.getAttribute("data-replied_id");
                  //     console.log(message_id);
                  //     localStorage.setItem("edit_id", message_id)
        
                  //     document.getElementById("send_message_button").style.display = "none"
                  //     document.getElementById("update_message_button").style.display = "block"
                  //     document.getElementById("cancel_message_button").style.display = "block"
        
                  //     currentMessage = e.currentTarget.parentElement
                  //     console.log(currentMessage);
                  //     let message = currentMessage.querySelector(".updating_text").innerHTML;
                  //     console.log(message);
        
                  //     document.getElementById("send_message_div").value = message
        
                  //     console.log("edit")
                  //   });
                  // });
        
        
        
                  // document.querySelectorAll(".message_delete_button").forEach((ele) => {
                  //   ele.addEventListener("click", (e) => {
                  //     dynamicModalClose();
                  //     showNullChats();
                  //     let currentMessage = e.currentTarget
                  //     console.log(currentMessage);
                  //     let message_id = currentMessage.getAttribute("data-replied_id");
                  //     console.log(message_id);
        
                  //     MessageDeleteModal.style.transform = "scale(1)";
                  //     MessageDeleteModal.style.opacity = 1;
                  //     document.getElementById("temporary_buttons").innerHTML = `
                  //     <button class="btn btn-light-new">Cancel</button>
                  //     <button data-replied_id=${message_id} id="confirmation_delete" class="btn btn-danger-new">Delete</button>
                  //     `
                  //     document.getElementById("confirmation_delete").addEventListener("click", () => {
                  //       deleteGroupMessage();
                  //     });
                  //     console.log("delete")
                  //   });
                  // });
                }
              }
            });
            chatMessageContent = document.getElementById("another-bottom-content-box");

              chatMessageContent.scroll(0, chatMessageContent.scrollHeight);

            let replyInterval = setInterval(() => {
              if (document.querySelector(".replyIcon"))
                clearInterval(replyInterval);
              document.querySelectorAll(".replyIcon").forEach((item) => {
                item.addEventListener("click", replyToMessageFn);
              });
            }, 500);
          }
          document.querySelector(".prospect_edit-text-msg-box").style.display = "none";
          localStorage.removeItem("replied_id")
          msgInp.value = "";

          replied_id = "";
          localStorage.removeItem("replied_id");

          let replyInterval = setInterval(() => {
            if (document.querySelector(".replyIcon")) {
              clearInterval(replyInterval);
              document.querySelectorAll(".replyIcon").forEach((ele) => {
                ele.classList.remove("replyIconClicked");
              });
            }

            if (document.querySelector(".myReplyIcon")) {
              document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                ele.classList.remove("replyIconClicked");
              });
            }
          });
        }
      };
    } else {
      document.getElementById("sendMsgBtn").style.display = "block";
      document.getElementById("updateMsgBtn").style.display = "none";
      document.getElementById("cancelMsgBtn").style.display = "none";
      document.getElementById("sendGroupMsgBtn").style.display = "none";
      document.getElementById("updateGroupMsgBtn").style.display = "none";
      document.getElementById("cancelGroupMsgBtn").style.display = "none";
      document.getElementById("sendSubGroupMsgBtn").style.display = "none";
      document.getElementById("updateSubGroupMsgBtn").style.display = "none";
      document.getElementById("cancelSubGroupMsgBtn").style.display = "none";

      let message_id = localStorage.getItem("message_id");
      let updatedMessage = document.getElementById("msgInp").value;

      const url = `${globalURl}/edit_single_chat`;

      let xhr = new XMLHttpRequest();

      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          id: message_id,
          text: updatedMessage,
        })
      );

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let response = JSON.parse(xhr.responseText);
          localStorage.removeItem("message_id");
          if (response.status == "Updated") {
            let dmNullChats = localStorage.getItem("dmNullChats");

            let url = "";

            if (dmNullChats) {
              url = `${globalURl}/chating_null/${user_id}/${receiver_id}`;

              let xhr = new XMLHttpRequest();

              xhr.open("GET", url, true);
              xhr.setRequestHeader("Content-Type", "application/json");
              xhr.send();

              xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                  let userMessages = JSON.parse(xhr.responseText);

                  if (userMessages) {
                    document.querySelector(".rightUperLeft").innerHTML = `
                    ${userMessages.image != null
                        ? `<img src=${userMessages.image} />`
                        : `<i class='fas fa-user'></i>`
                      }
                  `;
                    document.querySelector(".rightUperRight").innerHTML = `
                            <p id="userEmail">${userMessages.email}</p>
                  `;
                  }

                  let chatMessageContent = document.querySelector(
                    ".chatMessageContent"
                  );
                  chatMessageContent.innerHTML = "";

                  userMessages.data.map((obj, i) => {
                    if (obj.sender_id == user_id) {
                      let dbTime = obj.created_at;

                      let newDate = new Date();

                      let UTCDate = new Date(
                        newDate.getUTCFullYear(),
                        newDate.getUTCMonth(),
                        newDate.getUTCDate(),
                        newDate.getUTCHours(),
                        newDate.getUTCMinutes(),
                        newDate.getUTCSeconds(),
                        newDate.getUTCMilliseconds()
                      );

                      let currentTime = Math.abs(
                        (UTCDate.getTime() / 1000).toFixed(0)
                      );

                      let futureTime = Math.abs(
                        (new Date(dbTime).getTime() / 1000).toFixed(0)
                      );

                      let TimeDifference = currentTime - futureTime;

                      let days = Math.floor(TimeDifference / 86400);

                      let hours = Math.floor(TimeDifference / 3600) % 24;

                      let minutes = Math.floor(TimeDifference / 60) % 60;

                      let seconds = Math.floor(TimeDifference % 60);

                      let messageTimeString = "";

                      if (days == 0) {
                        if (hours == 0) {
                          if (minutes == 0) {
                            if (seconds == 0) {
                              messageTimeString = `less than a second ago`;
                            } else {
                              messageTimeString =
                                seconds == 1
                                  ? `${seconds} second ago`
                                  : `${seconds} seconds ago`;
                            }
                          } else {
                            messageTimeString =
                              minutes == 1
                                ? `${minutes} minute ago`
                                : `${minutes} minutes ago`;
                          }
                        } else {
                          messageTimeString =
                            hours == 1
                              ? `${hours} hour ago`
                              : `${hours} hours ago`;
                        }
                      } else {
                        messageTimeString =
                          days == 1 ? `${days} day ago` : `${days} days ago`;
                      }

                      let row = `
                    <div style="position: relative; margin-bottom: 30px;">
                      <div class='myMessageDiv'>

                      <div class="imageNameContainer">
                
                      <span class="senderName">${obj.sender_name}</span>
                      <img src="${obj.sender_image}" class='messageImage'/>
                  
                  </div>

                      <i class="far fa-ellipsis-v menuDMIcon"></i>

                          <div class='menuBox' style="display: none">
                            <div class='editContainer editDMContainer'>
                              <i class="far fa-edit"></i>
                              <h1>Edit</h1>
                            </div>
                            <div class="deleteContainer deleteDMContainer">
                              <i class="far fa-trash"></i>
                              <h1>Delete</h1>
                            </div>
                          </div>

                        ${obj.replied_id != null
                          ? `<div class="prospectReplyDiv">
                            <div class="prospectContentDiv" style="${obj.reply_image == null ? "width: 100%;" : ""
                          }">
                            ${obj.reply_msg != null
                            ? `<h1>${obj.reply_msg}</h1>`
                            : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                          }
                            </div>
                            ${obj.reply_image != null
                            ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                            : ""
                          }
                          </div>`
                          : ""
                        }

                        <i class="fas fa-reply myReplyIcon"></i>
                        <div style="width: 100%">
                          <p class="messageTxt" data-replied_id=${obj.id}>${obj.text
                        }</p>
                        </div>
                        <div class="timestampDiv" style="margin-top: 10px">
                          ${messageTimeString}
                        </div>
                      </div>
                    </div>
                    `;
                      chatMessageContent.innerHTML += row;

                      setTimeout(() => {
                        document
                          .querySelectorAll(".menuDMIcon")
                          .forEach((ele) => {
                            ele?.addEventListener("click", openDmThreeDotMenu);
                          });
                      }, 100);

                      setTimeout(() => {
                        document
                          .querySelectorAll(".myReplyIcon")
                          .forEach((ele) => {
                            ele.addEventListener("click", replyToMessageFn);
                          });
                      }, 100);
                    } else {
                      let dbTime = obj.created_at;

                      let newDate = new Date();

                      let UTCDate = new Date(
                        newDate.getUTCFullYear(),
                        newDate.getUTCMonth(),
                        newDate.getUTCDate(),
                        newDate.getUTCHours(),
                        newDate.getUTCMinutes(),
                        newDate.getUTCSeconds(),
                        newDate.getUTCMilliseconds()
                      );

                      let currentTime = Math.abs(
                        (UTCDate.getTime() / 1000).toFixed(0)
                      );

                      let futureTime = Math.abs(
                        (new Date(dbTime).getTime() / 1000).toFixed(0)
                      );

                      let TimeDifference = currentTime - futureTime;

                      let days = Math.floor(TimeDifference / 86400);

                      let hours = Math.floor(TimeDifference / 3600) % 24;

                      let minutes = Math.floor(TimeDifference / 60) % 60;

                      let seconds = Math.floor(TimeDifference % 60);

                      let messageTimeString = "";

                      if (days == 0) {
                        if (hours == 0) {
                          if (minutes == 0) {
                            if (seconds == 0) {
                              messageTimeString = `less than a second ago`;
                            } else {
                              messageTimeString =
                                seconds == 1
                                  ? `${seconds} second ago`
                                  : `${seconds} seconds ago`;
                            }
                          } else {
                            messageTimeString =
                              minutes == 1
                                ? `${minutes} minute ago`
                                : `${minutes} minutes ago`;
                          }
                        } else {
                          messageTimeString =
                            hours == 1
                              ? `${hours} hour ago`
                              : `${hours} hours ago`;
                        }
                      } else {
                        messageTimeString =
                          days == 1 ? `${days} day ago` : `${days} days ago`;
                      }

                      let row = `
                    <div style="position: relative; margin-bottom: 30px;">
                      <div class='userMessageDiv'>

                      <div class="imageNameContainer1">
                
                      <img src="${obj.sender_image}" class='messageImage'/>
                      <span class="senderName">${obj.sender_name}</span>
                  
                  </div>

                      ${obj.replied_id != null
                          ? `<div class="prospectReplyDiv1">
                          <div class="prospectContentDiv" style="${obj.reply_image == null ? "width: 100%;" : ""
                          }">
                            <h1>${obj.reply_msg != null
                            ? `<h1>${obj.reply_msg}</h1>`
                            : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                          }</h1>
                          </div>
                          ${obj.reply_image != null
                            ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                            : ""
                          }
                        </div>`
                          : ""
                        }

                        <i class="fas fa-reply replyIcon"></i>
                        <div style="width: 100%">
                          <p class="messageTxt" data-replied_id=${obj.id}>${obj.text
                        }</p>
                        </div>
                        <div class="timestampUserDiv" style="margin-top: 10px">
                          ${messageTimeString}
                        </div>
                      </div>
                    </div>
                    `;
                      chatMessageContent.innerHTML += row;
                    }

                    chatMessageContent.scroll(
                      0,
                      chatMessageContent.scrollHeight
                    );
                  });

                  let replyInterval = setInterval(() => {
                    if (document.querySelector(".replyIcon"))
                      clearInterval(replyInterval);
                    document.querySelectorAll(".replyIcon").forEach((item) => {
                      item.addEventListener("click", replyToMessageFn);
                    });
                  }, 500);
                }
              };
            } else {
              url = `${globalURl}/chat_prospects/${user_id}/${receiver_id}/${prospect_id}`;
              let xhr = new XMLHttpRequest();

              xhr.open("GET", url, true);
              xhr.setRequestHeader("Content-Type", "application/json");
              xhr.send();

              xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                  let userMessages = JSON.parse(xhr.responseText);

                  document.getElementById("sendMsgBtn").style.display = "block";
                  document.getElementById("updateMsgBtn").style.display =
                    "none";
                  document.getElementById("cancelMsgBtn").style.display =
                    "none";
                  document.getElementById("msgInp").value = "";

                  if (userMessages) {
                    document.querySelector(".rightUperLeft").innerHTML = `
                      ${userMessages.image != null
                        ? `<img src=${userMessages.image} />`
                        : `<i class='fas fa-user'></i>`
                      }
                    `;
                    document.querySelector(".rightUperRight").innerHTML = `
                              <p id="userEmail">${userMessages.email}</p>
                    `;
                  }

                  let chatMessageContent = document.querySelector(
                    ".chatMessageContent"
                  );
                  chatMessageContent.innerHTML = "";
                  if (userMessages.data.length > 0) {
                    chatMessageContent.innerHTML += `
                      
                      <div class="prospectTopDiv" data-id=${userMessages.prospect_data.id
                      } data-link=${userMessages.prospect_data.profile_link}>
                        <img src=${userMessages.prospect_data.image
                      } alt="model pic"/>
                        <div class="prospectContentDiv">
                          <h1>${userMessages.prospect_data.name}</h1>
                          <h2>${userMessages.prospect_data.company != null
                        ? userMessages.prospect_data.company
                        : "No company name"
                      }</h2>
                        </div>
                      </div>`;

                    userMessages.data.map((obj, i) => {
                      if (obj.sender_id == user_id) {
                        let dbTime = obj.created_at;

                        let newDate = new Date();

                        let UTCDate = new Date(
                          newDate.getUTCFullYear(),
                          newDate.getUTCMonth(),
                          newDate.getUTCDate(),
                          newDate.getUTCHours(),
                          newDate.getUTCMinutes(),
                          newDate.getUTCSeconds(),
                          newDate.getUTCMilliseconds()
                        );

                        let currentTime = Math.abs(
                          (UTCDate.getTime() / 1000).toFixed(0)
                        );

                        let futureTime = Math.abs(
                          (new Date(dbTime).getTime() / 1000).toFixed(0)
                        );

                        let TimeDifference = currentTime - futureTime;

                        let days = Math.floor(TimeDifference / 86400);

                        let hours = Math.floor(TimeDifference / 3600) % 24;

                        let minutes = Math.floor(TimeDifference / 60) % 60;

                        let seconds = Math.floor(TimeDifference % 60);

                        let messageTimeString = "";

                        if (days == 0) {
                          if (hours == 0) {
                            if (minutes == 0) {
                              if (seconds == 0) {
                                messageTimeString = `less than a second ago`;
                              } else {
                                messageTimeString =
                                  seconds == 1
                                    ? `${seconds} second ago`
                                    : `${seconds} seconds ago`;
                              }
                            } else {
                              messageTimeString =
                                minutes == 1
                                  ? `${minutes} minute ago`
                                  : `${minutes} minutes ago`;
                            }
                          } else {
                            messageTimeString =
                              hours == 1
                                ? `${hours} hour ago`
                                : `${hours} hours ago`;
                          }
                        } else {
                          messageTimeString =
                            days == 1 ? `${days} day ago` : `${days} days ago`;
                        }

                        let row = `
                        <div style="position: relative; margin-bottom: 30px;">
                          <div class='myMessageDiv'>
                          
                          <div class="imageNameContainer">
                
                          <span class="senderName">${obj.sender_name}</span>
                    <img src="${obj.sender_image}" class='messageImage'/>
                        
                        </div>

                          <i class="far fa-ellipsis-v menuDMIcon"></i>
      
                          <div class='menuBox' style="display: none">
                            <div class='editContainer editDMContainer'>
                              <i class="far fa-edit"></i>
                              <h1>Edit</h1>
                            </div>
                            <div class="deleteContainer deleteDMContainer">
                              <i class="far fa-trash"></i>
                              <h1>Delete</h1>
                            </div>
                          </div>
      
                            ${obj.replied_id != null
                            ? `<div class="prospectReplyDiv">
                                <div class="prospectContentDiv" style="${obj.reply_image == null ? "width: 100%;" : ""
                            }">
                                  <h1>${obj.reply_msg != null
                              ? `<h1>${obj.reply_msg}</h1>`
                              : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                            }</h1>
                                </div>
                                ${obj.reply_image != null
                              ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                              : ""
                            }
                              </div>`
                            : ""
                          }
      
                            <i class="fas fa-reply myReplyIcon"></i>
                            <div style="width: 100%">
                              <p class="messageTxt" data-replied_id=${obj.id}>${obj.text
                          }</p>
                            </div>
                            <div class="timestampDiv" style="margin-top: 10px">
                              ${messageTimeString}
                            </div>
                          </div>
                        </div>
                        `;
                        chatMessageContent.innerHTML += row;

                        setTimeout(() => {
                          document
                            .querySelectorAll(".menuDMIcon")
                            .forEach((ele) => {
                              ele?.addEventListener(
                                "click",
                                openDmThreeDotMenu
                              );
                            });
                        }, 100);

                        setTimeout(() => {
                          document
                            .querySelectorAll(".myReplyIcon")
                            .forEach((ele) => {
                              ele.addEventListener("click", replyToMessageFn);
                            });
                        }, 100);
                      } else {
                        let dbTime = obj.created_at;

                        let newDate = new Date();

                        let UTCDate = new Date(
                          newDate.getUTCFullYear(),
                          newDate.getUTCMonth(),
                          newDate.getUTCDate(),
                          newDate.getUTCHours(),
                          newDate.getUTCMinutes(),
                          newDate.getUTCSeconds(),
                          newDate.getUTCMilliseconds()
                        );

                        let currentTime = Math.abs(
                          (UTCDate.getTime() / 1000).toFixed(0)
                        );

                        let futureTime = Math.abs(
                          (new Date(dbTime).getTime() / 1000).toFixed(0)
                        );

                        let TimeDifference = currentTime - futureTime;

                        let days = Math.floor(TimeDifference / 86400);

                        let hours = Math.floor(TimeDifference / 3600) % 24;

                        let minutes = Math.floor(TimeDifference / 60) % 60;

                        let seconds = Math.floor(TimeDifference % 60);

                        let messageTimeString = "";

                        if (days == 0) {
                          if (hours == 0) {
                            if (minutes == 0) {
                              if (seconds == 0) {
                                messageTimeString = `less than a second ago`;
                              } else {
                                messageTimeString =
                                  seconds == 1
                                    ? `${seconds} second ago`
                                    : `${seconds} seconds ago`;
                              }
                            } else {
                              messageTimeString =
                                minutes == 1
                                  ? `${minutes} minute ago`
                                  : `${minutes} minutes ago`;
                            }
                          } else {
                            messageTimeString =
                              hours == 1
                                ? `${hours} hour ago`
                                : `${hours} hours ago`;
                          }
                        } else {
                          messageTimeString =
                            days == 1 ? `${days} day ago` : `${days} days ago`;
                        }

                        let row = `
                        <div style="position: relative; margin-bottom: 30px;">
                          <div class='userMessageDiv'>

                          <div class="imageNameContainer1">
                
                          <img src="${obj.sender_image}" class='messageImage'/>
                          <span class="senderName">${obj.sender_name}</span>
                          
                          </div>

                          ${obj.replied_id != null
                            ? `<div class="prospectReplyDiv1">
                              <div class="prospectContentDiv" style="${obj.reply_image == null ? "width: 100%;" : ""
                            }">
                                <h1>${obj.reply_msg != null
                              ? `<h1>${obj.reply_msg}</h1>`
                              : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                            }</h1>
                              </div>
                              ${obj.reply_image != null
                              ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                              : ""
                            }
                            </div>`
                            : ""
                          }
      
                            <i class="fas fa-reply replyIcon"></i>
                            <div style="width: 100%">
                              <p class="messageTxt" data-replied_id=${obj.id}>${obj.text
                          }</p>
                            </div>
                            <div class="timestampUserDiv" style="margin-top: 10px">
                              ${messageTimeString}
                            </div>
                          </div>
                        </div>
                        `;
                        chatMessageContent.innerHTML += row;
                      }

                      chatMessageContent.scroll(
                        0,
                        chatMessageContent.scrollHeight
                      );
                    });

                    let prospectInterval1 = setInterval(() => {
                      if (document.querySelector(".prospectTopDiv"))
                        clearInterval(prospectInterval1);
                      document
                        .querySelectorAll(".prospectTopDiv")
                        .forEach((item) => {
                          item.addEventListener("click", openProspectPage);
                        });
                    }, 500);

                    let prospectInterval2 = setInterval(() => {
                      if (document.querySelector(".prospectDiv1"))
                        clearInterval(prospectInterval2);
                      document
                        .querySelectorAll(".prospectDiv1")
                        .forEach((item) => {
                          item.addEventListener("click", openProspectPage);
                        });
                    }, 500);

                    let replyInterval = setInterval(() => {
                      if (document.querySelector(".replyIcon"))
                        clearInterval(replyInterval);
                      document
                        .querySelectorAll(".replyIcon")
                        .forEach((item) => {
                          item.addEventListener("click", replyToMessageFn);
                        });
                    }, 500);
                  }
                  else{
                    localStorage.removeItem("lastDate")
                  }
                }
              };
            }
          }
        }
      };
    }
  }
}

function openDmThreeDotMenu(e) {
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
    .addEventListener("click", editDmMessage);
  currentMenuBox
    .querySelector(".deleteContainer")
    .addEventListener("click", deleteDmMessage);
}

function editDmMessage(e) {
  document.querySelectorAll(".menuBox").forEach((ele) => {
    ele.style.display = "none";
  });

  let currentMessage = e.currentTarget.parentElement.parentElement;

  let message_id = currentMessage
    .querySelector(".messageTxt")
    .getAttribute("data-replied_id");
  let messageText = currentMessage.querySelector(".messageTxt").innerText;

  localStorage.setItem("message_id", message_id);

  document.getElementById("msgInp").value = messageText;

  document.getElementById("sendMsgBtn").style.display = "none";
  document.getElementById("updateMsgBtn").style.display = "block";
  document.getElementById("cancelMsgBtn").style.display = "block";
}

document.getElementById("cancelMsgBtn").addEventListener("click", () => {
  document.getElementById("sendMsgBtn").style.display = "block";
  document.getElementById("updateMsgBtn").style.display = "none";
  document.getElementById("cancelMsgBtn").style.display = "none";
  document.getElementById("msgInp").value = "";
  localStorage.removeItem("message_id");
});

document.getElementById("updateMsgBtn").addEventListener("click", sendMessage);

function deleteDmMessage(e) {
  document.querySelectorAll(".menuBox").forEach((ele) => {
    ele.style.display = "none";
  });

  let currentMessage = e.currentTarget.parentElement.parentElement;
  let message_id = currentMessage
    .querySelector(".messageTxt")
    .getAttribute("data-replied_id");

  let user_id = localStorage.getItem("user_id");
  let receiver_id = localStorage.getItem("receiver_id");
  let prospectId = localStorage.getItem("prospect_id");

  const url = `${globalURl}/delete_single_chat/${message_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.status == "Deleted") {
        const url = `${globalURl}/chat_prospects/${user_id}/${receiver_id}/${prospectId}`;

        let xhr = new XMLHttpRequest();

        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();

        xhr.onreadystatechange = function () {

          if (xhr.readyState == 4 && xhr.status == 200) {
            let userMessages = JSON.parse(xhr.responseText);

            if (userMessages) {
              document.querySelector(".rightUperLeft").innerHTML = `
                ${userMessages.image != null
                  ? `<img src=${userMessages.image} />`
                  : `<i class='fas fa-user'></i>`
                }
              `;
              document.querySelector(".rightUperRight").innerHTML = `
                        <p id="userEmail">${userMessages.email}</p>
              `;
            }

            let chatMessageContent = document.querySelector(
              ".chatMessageContent"
            );
            chatMessageContent.innerHTML = "";
            if (userMessages.data) {
              chatMessageContent.innerHTML += `
                
                <div class="prospectTopDiv" data-id=${userMessages.prospect_data.id
                } data-link=${userMessages.prospect_data.profile_link}>
                  <img src=${userMessages.prospect_data.image} alt="model pic"/>
                  <div class="prospectContentDiv">
                    <h1>${userMessages.prospect_data.name}</h1>
                    <h2>${userMessages.prospect_data.company != null
                  ? userMessages.prospect_data.company
                  : "No company name"
                }</h2>
                  </div>
                </div>`;

              userMessages.data.map((obj, i) => {
                if (obj.sender_id == user_id) {
                  let dbTime = obj.created_at;

                  let newDate = new Date();

                  let UTCDate = new Date(
                    newDate.getUTCFullYear(),
                    newDate.getUTCMonth(),
                    newDate.getUTCDate(),
                    newDate.getUTCHours(),
                    newDate.getUTCMinutes(),
                    newDate.getUTCSeconds(),
                    newDate.getUTCMilliseconds()
                  );

                  let currentTime = Math.abs(
                    (UTCDate.getTime() / 1000).toFixed(0)
                  );

                  let futureTime = Math.abs(
                    (new Date(dbTime).getTime() / 1000).toFixed(0)
                  );

                  let TimeDifference = currentTime - futureTime;

                  let days = Math.floor(TimeDifference / 86400);

                  let hours = Math.floor(TimeDifference / 3600) % 24;

                  let minutes = Math.floor(TimeDifference / 60) % 60;

                  let seconds = Math.floor(TimeDifference % 60);

                  let messageTimeString = "";

                  if (days == 0) {
                    if (hours == 0) {
                      if (minutes == 0) {
                        if (seconds == 0) {
                          messageTimeString = `less than a second ago`;
                        } else {
                          messageTimeString =
                            seconds == 1
                              ? `${seconds} second ago`
                              : `${seconds} seconds ago`;
                        }
                      } else {
                        messageTimeString =
                          minutes == 1
                            ? `${minutes} minute ago`
                            : `${minutes} minutes ago`;
                      }
                    } else {
                      messageTimeString =
                        hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                    }
                  } else {
                    messageTimeString =
                      days == 1 ? `${days} day ago` : `${days} days ago`;
                  }

                  let row = `
                  <div style="position: relative; margin-bottom: 30px;">
                    <div class='myMessageDiv'>

                    <div class="imageNameContainer">
                
                    <span class="senderName">${obj.sender_name}</span>
                    <img src="${obj.sender_image}" class='messageImage'/>
                  
                  </div>

                    <i class="far fa-ellipsis-v menuDMIcon"></i>

                    <div class='menuBox' style="display: none">
                      <div class='editContainer editDMContainer'>
                        <i class="far fa-edit"></i>
                        <h1>Edit</h1>
                      </div>
                      <div class="deleteContainer deleteDMContainer">
                        <i class="far fa-trash"></i>
                        <h1>Delete</h1>
                      </div>
                    </div>

                      ${obj.replied_id != null
                      ? `<div class="prospectReplyDiv">
                          <div class="prospectContentDiv" style="${obj.reply_image == null ? "width: 100%;" : ""
                      }">
                            <h1>${obj.reply_msg != null
                        ? `<h1>${obj.reply_msg}</h1>`
                        : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                      }</h1>
                          </div>
                          ${obj.reply_image != null
                        ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                        : ""
                      }
                        </div>`
                      : ""
                    }

                      <i class="fas fa-reply myReplyIcon"></i>
                      <div style="width: 100%">
                        <p class="messageTxt" data-replied_id=${obj.id}>${obj.text
                    }</p>
                      </div>
                      <div class="timestampDiv" style="margin-top: 10px">
                        ${messageTimeString}
                      </div>
                    </div>
                  </div>
                  `;
                  chatMessageContent.innerHTML += row;

                  setTimeout(() => {
                    document.querySelectorAll(".menuDMIcon").forEach((ele) => {
                      ele?.addEventListener("click", openDmThreeDotMenu);
                    });
                  }, 100);

                  setTimeout(() => {
                    document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                      ele.addEventListener("click", replyToMessageFn);
                    });
                  }, 100);
                } else {
                  let dbTime = obj.created_at;

                  let newDate = new Date();

                  let UTCDate = new Date(
                    newDate.getUTCFullYear(),
                    newDate.getUTCMonth(),
                    newDate.getUTCDate(),
                    newDate.getUTCHours(),
                    newDate.getUTCMinutes(),
                    newDate.getUTCSeconds(),
                    newDate.getUTCMilliseconds()
                  );

                  let currentTime = Math.abs(
                    (UTCDate.getTime() / 1000).toFixed(0)
                  );

                  let futureTime = Math.abs(
                    (new Date(dbTime).getTime() / 1000).toFixed(0)
                  );

                  let TimeDifference = currentTime - futureTime;

                  let days = Math.floor(TimeDifference / 86400);

                  let hours = Math.floor(TimeDifference / 3600) % 24;

                  let minutes = Math.floor(TimeDifference / 60) % 60;

                  let seconds = Math.floor(TimeDifference % 60);

                  let messageTimeString = "";

                  if (days == 0) {
                    if (hours == 0) {
                      if (minutes == 0) {
                        if (seconds == 0) {
                          messageTimeString = `less than a second ago`;
                        } else {
                          messageTimeString =
                            seconds == 1
                              ? `${seconds} second ago`
                              : `${seconds} seconds ago`;
                        }
                      } else {
                        messageTimeString =
                          minutes == 1
                            ? `${minutes} minute ago`
                            : `${minutes} minutes ago`;
                      }
                    } else {
                      messageTimeString =
                        hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                    }
                  } else {
                    messageTimeString =
                      days == 1 ? `${days} day ago` : `${days} days ago`;
                  }

                  let row = `
                  <div style="position: relative; margin-bottom: 30px;">
                    <div class='userMessageDiv'>

                    <div class="imageNameContainer1">
                
                    <img src="${obj.sender_image}" class='messageImage'/>
                    <span class="senderName">${obj.sender_name}</span>
                  
                  </div>

                    ${obj.replied_id != null
                      ? `<div class="prospectReplyDiv1">
                        <div class="prospectContentDiv" style="${obj.reply_image == null ? "width: 100%;" : ""
                      }">
                          <h1>${obj.reply_msg != null
                        ? `<h1>${obj.reply_msg}</h1>`
                        : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                      }</h1>
                        </div>
                        ${obj.reply_image != null
                        ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                        : ""
                      }
                      </div>`
                      : ""
                    }

                      <i class="fas fa-reply replyIcon"></i>
                      <div style="width: 100%">
                        <p class="messageTxt" data-replied_id=${obj.id}>${obj.text
                    }</p>
                      </div>
                      <div class="timestampUserDiv" style="margin-top: 10px">
                        ${messageTimeString}
                      </div>
                    </div>
                  </div>
                  `;
                  chatMessageContent.innerHTML += row;
                }

                chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
              });

              let prospectInterval1 = setInterval(() => {
                if (document.querySelector(".prospectTopDiv"))
                  clearInterval(prospectInterval1);
                document.querySelectorAll(".prospectTopDiv").forEach((item) => {
                  item.addEventListener("click", openProspectPage);
                });
              }, 500);

              let prospectInterval2 = setInterval(() => {
                if (document.querySelector(".prospectDiv1"))
                  clearInterval(prospectInterval2);
                document.querySelectorAll(".prospectDiv1").forEach((item) => {
                  item.addEventListener("click", openProspectPage);
                });
              }, 500);

              let replyInterval = setInterval(() => {
                if (document.querySelector(".replyIcon"))
                  clearInterval(replyInterval);
                document.querySelectorAll(".replyIcon").forEach((item) => {
                  item.addEventListener("click", replyToMessageFn);
                });
              }, 500);
            }
          }
        };
      }
    }
  };
}

if (document.querySelector("#open_add_group")) {
  document.querySelector("#open_add_group").addEventListener("click", () => {
    localStorage.removeItem("sub_group");
    document.getElementById("adding_image_div").style.display = "block";
    document.getElementById("get_description").style.display = "none";
    document.getElementById("topic_div").style.display = "none";

    document.getElementById("whole_container").style.marginTop = "0px";
    openModal2();

    var mainContentContainer = document.querySelector(".mainContentContainer1");

    mainContentContainer.innerHTML = ``;
    // document.getElementById("topic_div").style.display = "block"
    document.getElementById("group_heading").innerText = "Group Name";


    var user_id = localStorage.getItem("user_id");

    const url = `${globalURl}/chats/${user_id}`;

    let xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let userData = JSON.parse(xhr.responseText);

        if (userData.length != 0) {
          userData.map((item, i, arr) => {
            var row = `
            <div class="chatContent" date-linkedId=${item.linked_to_id}>
                              
              <div class="defaultIcon" style='${item.image != null
                ? "border: none; margin-left: 10px"
                : "border: 1px solid #999"
              }'>
              ${item.image != null
                ? `<img src=${item.image} />`
                : `<i class='fas fa-user'></i>`
              }
                  
              </div>
  
              <h1 class="userEmail">${item.email}</h1>
  
              <div class="dotCircle"></div>
                  
            </div>`;
            mainContentContainer.innerHTML += row;
          });
        } else {
          mainContentContainer.innerHTML = `
            <div class="chatContent">
  
              <h1 class="userEmail" >Add Members to create group</h1>
                  
            </div>`;
        }
      }
    };
  });

  document
    .getElementById("add_member2")
    .addEventListener("click", addmemberpage);
}

if (document.querySelector(".startChartBtn1")) {
  document
    .querySelector(".startChartBtn1")
    .addEventListener("click", openNameModal);
}

let nameModal = document.getElementById("nameModal");

if (document.getElementById("editBox")) {
  document.getElementById("editBox").addEventListener("click", () => {
    localStorage.setItem("editGroupName", true);
    openNameModal();
  });
}

function openNameModal() {
  let userArray = [];

  document.querySelectorAll(".chatContentH1DotActive").forEach((item) => {
    userArray.push(Number(item.getAttribute("date-linkedId")));
  });
  sub_group = localStorage.getItem("sub_group");
  if (sub_group) {
    document.querySelector(".createGroupBtn").style.display = "block";
    document.querySelector(".updateGroupBtn").style.display = "none";
    document.querySelector(".createGroupBtn").innerText = "Create Subgroup";
    console.log(userArray.length)
    if (userArray.length < 1 || document.getElementById("groupName").value == "") {
      var myToast = Toastify({
        text: "Fill in required fields",
        duration: 2000,
      });

      myToast.showToast();
    } else {
      
      sendGroupInfo()

    }
  } else {
    let editGroupName = localStorage.getItem("editGroupName");
    let group_name = localStorage.getItem("group_name");

    if (editGroupName) {
      localStorage.removeItem("editGroupName");

      nameModal.style.transform = "scale(1)";
      nameModal.style.opacity = 1;

      document.getElementById("groupName").value = group_name;

      document.querySelector(".createGroupBtn").style.display = "none";
      document.querySelector(".updateGroupBtn").style.display = "block";
      document.querySelector(".createGroupBtn").innerText = "Create Group";
    } else {
      document.querySelector(".createGroupBtn").style.display = "block";
      document.querySelector(".updateGroupBtn").style.display = "none";
      if (userArray.length >= 1) {
        value = document.getElementById("groupName").value
        if (document.getElementById("groupName").value != "" && userArray.length >= 1 && value.length <= 80) {
          sendGroupInfo()          
        }
        else {
          var myToast = Toastify({
            text: "Fill in required fields",
            duration: 2000,
          });
          myToast.showToast();
        }
        // nameModal.style.transform = "scale(1)";
        // nameModal.style.opacity = 1;
        document.querySelector(".createGroupBtn").innerText = "Create Group";
      } else {
        var myToast = Toastify({
          text: "Fill in required fields",
          duration: 2000,
        });

        myToast.showToast();
      }
    }
  }
}

if (document.querySelector(".updateGroupBtn")) {
  document
    .querySelector(".updateGroupBtn")
    .addEventListener("click", updateGroupName);
}

function updateGroupName() {
  let group_name = document.getElementById("group_edit_name").value;
  let group_id = localStorage.getItem("group_id");

  if (group_name != "") {
    const url = `${globalURl}/edit_group_name`;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        id: group_id,
        name: group_name,
      })
    );

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let userData = JSON.parse(xhr.responseText);

        if (userData.status == "Updated") {
          localStorage.setItem("group_name", group_name);

          var myToast = Toastify({
            text: "Group name changed successfully",
            duration: 2000,
          });

          myToast.showToast();

          // nameModal.style.transform = "scale(0)";
          // nameModal.style.opacity = 0;
          // document.getElementById(
          //   "groupNamePara"
          // ).innerHTML = `<span style='color: #084DD1;'>Group Name: </span>${userData.name.length > 10
          //   ? `${userData.name.slice()} ...`
          //   : userData.name
          // }`;
          document.getElementById("nameofgroups").innerText = userData.name?.length > 15 ? `${userData.name.slice(0, 15)}...` : userData.name;
          document.getElementById("group_setting_name").innerText = userData.name?.length > 15 ? `${userData.name.slice(0, 15)}...` : userData.name;
          document.getElementById("group_setting_name_sub").innerText = userData.name
          document.getElementById("group_name_in_settings").innerText = userData.name

          document.getElementById("groupName").value = "";
          btn = document.getElementById('save_changes');
          btn.disabled = false;
          btn.innerText = 'Save Changes'
          document.getElementById('edit-group-name-modal').style.display = "none";
          settingModl.style.transform = "scale(0)"
          settingModl.style.opacity = 0;
        }
      }
    };
  } else {
    var myToast = Toastify({
      text: "Group must have a name",
      duration: 2000,
    });

    myToast.showToast();
    btn = document.getElementById('save_changes');
          btn.disabled = false;
          btn.innerText = 'Save Changes'
  }
}


function updateSubbGroupName() {
  let group_name = document.getElementById("sub_group_edit_name").value;
  let group_id = localStorage.getItem("subgroup_id");

  if (group_name != "") {
    const url = `${globalURl}/edit_sub_group_name`;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        id: group_id,
        name: group_name,
      })
    );

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let userData = JSON.parse(xhr.responseText);

        if (userData.status == "Updated") {
          localStorage.setItem("Subgroup_name", group_name);

          var myToast = Toastify({
            text: "Group name changed successfully",
            duration: 2000,
          });

          myToast.showToast();

          // nameModal.style.transform = "scale(0)";
          // nameModal.style.opacity = 0;
          // document.getElementById(
          //   "groupNamePara"
          // ).innerHTML = `<span style='color: #084DD1;'>Group Name: </span>${userData.name.length > 10
          //   ? `${userData.name.slice()} ...`
          //   : userData.name
          // }`;
          document.getElementById("subgroup_setting_name").innerText = userData.name?.length > 15 ? `${userData.name.slice(0, 15)}...` : userData.name;
          document.getElementById("subgroup_name").innerText = userData.name?.length > 20 ? `${userData.name.slice(0, 15)}...` : userData.name;
          document.getElementById("Subgroup_group_setting_name_sub").innerText = userData.name
          document.getElementById("heading_group").innerText = userData.name?.length > 15 ? `${userData.name.slice(0, 15)}...` : userData.name;
          
          document.getElementById("Subgroup_group_name_in_settings").innerText = userData.name

          document.getElementById("sub_group_edit_name").value = "";
          btn = document.getElementById('subgroup_save_changes');
          btn.disabled = false;
          btn.innerText = 'Save Changes'
          document.getElementById('subgroup_edit-group-name-modal').style.display = "none";
          SubgroupsettingModl.style.transform = "scale(0)"
          SubgroupsettingModl.style.opacity = 0
        }
      }
    };
  } else {
    var myToast = Toastify({
      text: "SubGroup must have a name",
      duration: 2000,
    });

    myToast.showToast();
    btn = document.getElementById('subgroup_save_changes');
          btn.disabled = false;
          btn.innerText = 'Save Changes'
  }
}


function updateSubbGroupTopic() {
  let group_name = document.getElementById("group_edit_topic").value;
  let group_id = localStorage.getItem("subgroup_id");

  if (group_name != "") {
    const url = `${globalURl}/edit_sub_group_name`;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        id: group_id,
        topic: group_name,
      })
    );

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let userData = JSON.parse(xhr.responseText);

        if (userData.status == "Updated") {
          // localStorage.setItem("Subgroup_name", group_name);
          // document.getElementById("subgroup_edit-group-name-modal").style.display = "none";
          

          var myToast = Toastify({
            text: "Subgroup Topic changed successfully",
            duration: 2000,
          });

          myToast.showToast();

          // nameModal.style.transform = "scale(0)";
          // nameModal.style.opacity = 0;
          // document.getElementById(
          //   "groupNamePara"
          // ).innerHTML = `<span style='color: #084DD1;'>Group Name: </span>${userData.name.length > 10
          //   ? `${userData.name.slice()} ...`
          //   : userData.name
          // }`;
          // document.getElementById("subgroup_setting_name").innerText = userData.name?.length > 15 ? `${userData.name.slice(0, 15)}...` : userData.name;
          // document.getElementById("subgroup_name").innerText = userData.name?.length > 15 ? `${userData.name.slice(0, 15)}...` : userData.name;
          document.getElementById("subgroup_group_setting_topic").innerText = userData.name
          document.getElementById("nameofgroup").innerText = userData.name 

          // document.getElementById("heading_group").innerText = userData.name?.length > 15 ? `${userData.name.slice(0, 15)}...` : userData.name;
          
          // document.getElementById("Subgroup_group_name_in_settings").innerText = userData.name

          document.getElementById("group_edit_topic").value = "";
          btn = document.getElementById('subgroup_save_changes');
          btn.disabled = false;
          btn.innerText = 'Save Changes'
          document.getElementById('subgroup_edit-group-name-modal').style.display = "none";
          SubgroupsettingModl.style.transform = "scale(0)";
          SubgroupsettingModl.style.opacity = 0;
        }
      }
    };
  } else {
    var myToast = Toastify({
      text: "SubGroup must have a name",
      duration: 2000,
    });

    myToast.showToast();
    btn = document.getElementById('subgroup_save_changes');
          btn.disabled = false;
          btn.innerText = 'Save Changes'
  }
}




function updateGroupDescription() {
  let group_name = document.getElementById("group_edit_description").value;
  let group_id = localStorage.getItem("group_id");

  if (group_name != "") {
    const url = `${globalURl}/edit_group_name`;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        id: group_id,
        description: group_name,
      })
    );

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let userData = JSON.parse(xhr.responseText);

        if (userData.status == "Updated") {

          var myToast = Toastify({
            text: "Group Description changed successfully",
            duration: 2000,
          });

          myToast.showToast();

          // nameModal.style.transform = "scale(0)";
          // nameModal.style.opacity = 0;
          // document.getElementById(
          //   "groupNamePara"
          // ).innerHTML = `<span style='color: #084DD1;'>Group Name: </span>${userData.name.length > 10
          //   ? `${userData.name.slice()} ...`
          //   : userData.name
          // }`;

          subgroup_id = localStorage.getItem("subgroup_id")
          if(subgroup_id != null){

          }else{
            document.getElementById("description").innerText = userData.name
          }
          document.getElementById("group_setting_description").innerText = userData.name
          document.getElementById("group_edit_description").value = "";
          btn = document.getElementById('save_changes');
          btn.disabled = false;
          btn.innerText = 'Save Changes'
          document.getElementById('edit-group-name-modal').style.display = "none";
        }
      }
    };
  } else {
    var myToast = Toastify({
      text: "Group must have a Description",
      duration: 2000,
    });

    myToast.showToast();

    btn = document.getElementById('save_changes');
          btn.disabled = false;
          btn.innerText = 'Save Changes'
  }
}


function updateSubGroupDescription() {
  let group_name = document.getElementById("subgroup_edit_description").value;
  let group_id = localStorage.getItem("subgroup_id");

  if (group_name != "") {
    const url = `${globalURl}/edit_sub_group_name`;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        id: group_id,
        description: group_name,
      })
    );

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let userData = JSON.parse(xhr.responseText);

        if (userData.status == "Updated") {

          var myToast = Toastify({
            text: "SubGroup Description changed successfully",
            duration: 2000,
          });

          myToast.showToast();

          // nameModal.style.transform = "scale(0)";
          // nameModal.style.opacity = 0;
          // document.getElementById(
          //   "groupNamePara"
          // ).innerHTML = `<span style='color: #084DD1;'>Group Name: </span>${userData.name.length > 10
          //   ? `${userData.name.slice()} ...`
          //   : userData.name
          // }`;


          document.getElementById("Subgroup_group_setting_description").innerText = userData.name
          document.getElementById("description").innerText = userData.name
          // document.getElementById("group_edit_description").value = "";
          btn = document.getElementById('subgroup_save_changes');
          btn.disabled = false;
          btn.innerText = 'Save Changes'
          document.getElementById('subgroup_edit-group-name-modal').style.display = "none";
          SubgroupsettingModl.style.transform = "scale(0)"
          SubgroupsettingModl.style.opacity = 0

        }
      }
    };
  } else {
    var myToast = Toastify({
      text: "Group must have a Description",
      duration: 2000,
    });

    myToast.showToast();

    btn = document.getElementById('subgroup_save_changes');
          btn.disabled = false;
          btn.innerText = 'Save Changes'
  }
}







function updateGroupTopic() {
  let group_name = document.getElementById("group_edit_topic").value;
  let group_id = localStorage.getItem("group_id");

  if (group_name != "") {
    const url = `${globalURl}/edit_group_name`;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        id: group_id,
        topic: group_name,
      })
    );

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let userData = JSON.parse(xhr.responseText);

        if (userData.status == "Updated") {

          var myToast = Toastify({
            text: "Group Topic changed successfully",
            duration: 2000,
          });

          myToast.showToast();

          // nameModal.style.transform = "scale(0)";
          // nameModal.style.opacity = 0;
          // document.getElementById(
          //   "groupNamePara"
          // ).innerHTML = `<span style='color: #084DD1;'>Group Name: </span>${userData.name.length > 10
          //   ? `${userData.name.slice()} ...`
          //   : userData.name
          // }`;


          document.getElementById("group_setting_topic").innerText = userData.name
          document.getElementById("nameofgroup").innerText = userData.name
          document.getElementById("group_edit_topic").value = "";
          btn = document.getElementById('save_changes');
          btn.disabled = false;
          btn.innerText = 'Save Changes'
          document.getElementById('edit-group-name-modal').style.display = "none";
        }
      }
    };
  } else {
    var myToast = Toastify({
      text: "Group must have a Topic",
      duration: 2000,
    });

    myToast.showToast();
    btn = document.getElementById('save_changes');
          btn.disabled = false;
          btn.innerText = 'Save Changes'
  }
}











if (document.getElementById("deleteBox")) {
  document.getElementById("deleteBox").addEventListener("click", () => {
    if (localStorage.getItem("sub_group_id")) {
      subGroupDeleteion();
    } else {
      groupDeleteion();
    }
  });
}

function groupDeleteion(e) {
  let group_id = "";
  user_id = localStorage.getItem("user_id")
  if (localStorage.getItem("group_id")) {
    group_id = localStorage.getItem("group_id");
  } else {
    group_id = e.currentTarget.parentElement
      .querySelector(".groupBox")
      .getAttribute("data-group_id");
  }

  const url = `${globalURl}/delete_sub_group/${group_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  // document.querySelector(".imgContainer").innerHTML = "";

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if ((userData.status = "Deleted")) {
        document.getElementById("settingModal").style.transform = "scale(0)";
        document.getElementById("settingModal").style.opacity = "0";
        var myToast = Toastify({
          text: "Group deleted successfully",
          duration: 2000,
        });

        myToast.showToast();

        fetchGroupInfo();
      }
    }
  };
}

if (document.getElementById("nameModalCloseBtn")) {
  document.getElementById("nameModalCloseBtn").addEventListener("click", () => {
    nameModal.style.transform = "scale(0)";
    nameModal.style.opacity = 0;
  });
}

if (document.querySelector(".createGroupBtn")) {
  document
    .querySelector(".createGroupBtn")
    .addEventListener("click", sendGroupInfo);
}
// if (document.querySelector("#thumbnail")) {
//   document.querySelector("#thumbnail").addEventListener("onchange", () => {
//     var file = $(this).get(0).files;
//     var reader = new FileReader();
//     console.log(reader.readAsDataURL(file[0]));
//   });

// }

function sendGroupInfo() {
  let userArray = [];
  btn = document.querySelector('.startChartBtn1');
  btn.disabled = true;
  btn.innerText = 'Creating...'
  document.querySelectorAll(".chatContentH1DotActive").forEach((item) => {
    userArray.push(Number(item.getAttribute("date-linkedId")));
  });
  sub_group = localStorage.getItem("sub_group");
  if (sub_group) {
    if (userArray.length >= 1) {
      let groupName = document.getElementById("groupName").value;
      console.log(groupName);
      if (groupName != "") {

        let description = document.getElementById("discrpition").value;
        let topic = document.getElementById("topic").value;

        // nameModal.style.transform = "scale(0)";
        // nameModal.style.opacity = 0;


        //Claudinary API
        let imageFile = document.getElementById('profile_image_icon').files[0];

        const data = new FormData()
        data.append("file", imageFile)
        data.append("upload_preset", "group_images")
        data.append("cloud_name", "fastech")
        fetch("https://api.cloudinary.com/v1_1/fastech/image/upload", {
          method: "post",
          body: data
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            savedImage = data.url;

          })
          .catch(err => {
            console.log(err)
          })


        localStorage.removeItem("replied_id");

        document.getElementById("nullHeading").style.display = "none";

        document.querySelector(".groupDiv").classList.remove("groupDivClicked");

        document.querySelectorAll(".userIcon").forEach((ele) => {
          ele.classList.remove("userClicked");
        });

        document.getElementById("sendMsgBtn").style.display = "none";
        document.getElementById("sendGroupMsgBtn").style.display = "none";
        document.getElementById("sendSubGroupMsgBtn").style.display = "block";

        document.querySelector(".rightUperRight").innerHTML = "";

        var user_id = localStorage.getItem("user_id");
        var group_id = localStorage.getItem("group_id");

        var x = setInterval(() => {

          const url = `${globalURl}/create_sub_group`;

          let xhr = new XMLHttpRequest();

          xhr.open("POST", url, true);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(
            JSON.stringify({
              user_id,
              members: userArray,
              groupName,
              description,
              group_id,
              savedImage,
              topic,
            })
          );

          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
              modalContainer2.style.transform = "scale(0)";
              modalContainer2.style.opacity = 0;
              var mainContentContainer = document.querySelector(".mainContentContainer1");
              mainContentContainer.innerHTML = ``
              document.getElementById("discrpition").value = "";
              document.getElementById("groupName").value = "";
              document.getElementById("topic").value = "";

              btn.disabled = false;
              btn.innerText = 'Create'
              dynamicModalOpenP()
              // let userMessages = JSON.parse(xhr.responseText);
              //  groupUsersArr = [];

              // userMessages.data?.map((obj) => {
              //   groupUsersArr.push(obj.email);
              // });

              // localStorage.removeItem("sub_group");

              // document.getElementById("editBox").style.display = "none";
              // document.getElementById("subGroupEditBox").style.display = "flex";

              // localStorage.setItem("group_id", userMessages.group_id);
              // localStorage.setItem("group_name", userMessages.group_name);
              // localStorage.setItem("sub_group_name", userMessages.sub_group_name);

              // closeModal2();

              // document.getElementById("prospectImage").src =
              //   "./Assets/img/user.png";
              // document.getElementById("prospectName").innerText =
              //   "No Prospect Added";
              // document.getElementById("companyName").innerText = "";
              // document.getElementById("descriptionName").innerText = "";
              // document.getElementById("dbNameMessage").innerText = "";
              // document.getElementById("dbNameMessagesecond").innerText = "";

              // document
              //   .getElementById("prospectImage")
              //   .setAttribute("data-link", "");
              // document.getElementById(
              //   "groupNamePara"
              // ).innerHTML = `<span style='color: #084DD1;'>Group Name: </span>${userMessages.group_name?.length > 10
              //   ? `${userMessages.group_name.slice()} ...`
              //   : userMessages.group_name
              // }`;

              // document.getElementById("subGroupNamePara").style.display = "block";

              // document.getElementById(
              //   "subGroupNamePara"
              // ).innerHTML = `<span style='color: #084DD1;'>Sub Group Name: </span>${userMessages.sub_group_name?.length > 10
              //   ? `${userMessages.sub_group_name.slice()} ...`
              //   : userMessages.sub_group_name
              // }`;

              // document.querySelector(".rightBox").style.display = "block";
              // document.querySelector(".groupContainer").style.display = "none";
              // document.querySelector(".chatMessageContent").style.display =
              //   "block";
              // document.querySelector(".chatControlBtn").style.display = "block";

              // document.querySelector(".rightUpperBox").style.display = "none";
              // document.querySelector(".rightProspectBox").style.display = "flex";
              // document.querySelector(".chatMessageContent").style.height =
              //   "225px";

              // if (userMessages.admin == true) {
              //   document.getElementById("deleteBox").style.display = "flex";
              // } else {
              //   document.getElementById("deleteBox").style.display = "none";
              // }

              // let chatMessageContent = document.querySelector(
              //   ".chatMessageContent"
              // );

              // chatMessageContent.innerHTML = "";

              // document.querySelector(".showBtnContainer").innerHTML = "";
              // document.querySelector(".showBtnContainer").innerHTML = `
              // <button id="showMembers">Members</button>
              // <button id="showSubGroupProspectBox">Prospects</button>
              // <button id="showSubGroupDirectBox">Group Chat</button>
              // `;

              // localStorage.setItem("sub_group_id", userMessages.sub_group_id);

              // if (userMessages.data) {
              //   userMessages.data.slice(0, 4).map((obj, i) => {
              //     document.querySelector(".dynamicContainer").innerHTML += `
              //     <div class="chatContent">

              //       <img src="./Assets/img/user.png" alt="">

              //       <h1>${obj.email}</h1>

              //     </div>
              //       `;
              //   });

              //   document.getElementById("groupName").value = "";
              // }

              // setTimeout(() => {
              //   document
              //     .getElementById("showMembers")
              //     .addEventListener("click", dynamicModalOpenM);
              //   document
              //     .getElementById("showSubGroupProspectBox")
              //     .addEventListener("click", openSubGroupMembersModal);
              //   document
              //     .getElementById("showSubGroupDirectBox")
              //     .addEventListener("click", nullSubGroupChats);
              // }, 100);
            }
          };
          clearInterval(x)

        }, 1000);
      } else {
        var myToast = Toastify({
          text: "Please add Sub group name",
          duration: 2000,
        });

        myToast.showToast();
        document.getElementById("discrpition").value = "";
              document.getElementById("groupName").value = "";
              btn.disabled = false;
              btn.innerText = 'Create'
      }
    }
  } else {
    if (userArray.length >= 1) {
      let groupName = document.getElementById("groupName").value;
      // let description = document.getElementById("discrpition").value;
      // let topic = document.getElementById("topic").value;

      console.log(groupName);
      if (groupName != "") {
        var blobFile = document.getElementById('profile_image_icon').files[0];
        // let group_image = document.getElementById("group_image").value;
        console.log(blobFile);


        nameModal.style.transform = "scale(0)";
        nameModal.style.opacity = 0;

        localStorage.removeItem("replied_id");

        document.getElementById("nullHeading").style.display = "none";

        document.querySelector(".groupDiv").classList.remove("groupDivClicked");

        document.querySelectorAll(".userIcon").forEach((ele) => {
          ele.classList.remove("userClicked");
        });

        // document.getElementById("sendMsgBtn").style.display = "none";
        // document.getElementById("sendGroupMsgBtn").style.display = "block";
        // document.getElementById("sendSubGroupMsgBtn").style.display = "none";

        document.querySelector(".rightUperRight").innerHTML = "";

        // Cloudinary API Call

        let imageFile = document.getElementById('profile_image_icon').files[0];
        if(imageFile){
        console.log(document.getElementById('profile_image_icon').files)
        const data = new FormData()
        data.append("file", imageFile)
        data.append("upload_preset", "group_images")
        data.append("cloud_name", "fastech")
        fetch("https://api.cloudinary.com/v1_1/fastech/image/upload", {
          method: "post",
          body: data
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            savedImage = data.url;
            document.getElementById('profile_image_icon').files[0] = null;

          })
          .catch(err => {
            console.log(err)
          })
        }
        else{
          savedImage = "./Assets/img/notselectedGroup.svg"
        }


        var user_id = localStorage.getItem("user_id");

        var x = setInterval(() => {


          const url = `${globalURl}/create_group`;

          let xhr = new XMLHttpRequest();

          xhr.open("POST", url, true);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(
            JSON.stringify({
              user_id,
              members: userArray,
              groupName,
              savedImage,
            })
          );

          xhr.onreadystatechange = function () {

            if (xhr.readyState == 4 && xhr.status == 200) {
              document.getElementById("discrpition").value = "";
              document.getElementById("groupName").value = "";
              document.getElementById("topic").value = "";
              var mainContentContainer = document.querySelector(".mainContentContainer1");
              mainContentContainer.innerHTML = ``
              fetchGroupInfo()
              modalContainer2.style.transform = "scale(0)";
              modalContainer2.style.opacity = 0;
              document.querySelector('#groupAvatar').src = "./Assets/img/group-bg.png"
              document.getElementById("discrpition").value = "";
              document.getElementById("groupName").value = "";
              document.getElementById("topic").value = "";
              btn.disabled = false;
              btn.innerText = 'Create'
              //   fetchGroupInfo()
              //   let userMessages = JSON.parse(xhr.responseText);
              //   groupUsersArr = [];

              //   userMessages.data?.map((obj) => {
              //     groupUsersArr.push(obj.email);
              //   });

              //   document.getElementById("editBox").style.display = "flex";
              //   document.getElementById("subGroupEditBox").style.display = "none";

              //   localStorage.setItem("group_id", userMessages.group_id);
              //   localStorage.setItem("group_name", userMessages.group_name);
              //   closeModal2();

              //   document.getElementById("prospectImage").src =
              //     "./Assets/img/user.png";
              //   document.getElementById("prospectName").innerText =
              //     "No Prospect Added";
              //   document.getElementById("companyName").innerText = "";
              //   document.getElementById("descriptionName").innerText = "";
              //   document.getElementById("dbNameMessage").innerText = "";
              //   document.getElementById("dbNameMessagesecond").innerText = "";

              //   document
              //     .getElementById("prospectImage")
              //     .setAttribute("data-link", "");
              //   document.getElementById(
              //     "groupNamePara"
              //   ).innerHTML = `<span style='color: #084DD1;'>Group Name: </span>${userMessages.group_name.length > 10
              //     ? `${userMessages.group_name.slice()} ...`
              //     : userMessages.group_name
              //   }`;

              //   document.querySelector(".rightBox").style.display = "block";
              //   document.querySelector(".groupContainer").style.display = "none";
              //   document.querySelector(".chatMessageContent").style.display =
              //     "block";
              //   document.querySelector(".chatControlBtn").style.display = "block";

              //   document.querySelector(".rightUpperBox").style.display = "none";
              //   document.querySelector(".rightProspectBox").style.display = "flex";
              //   document.querySelector(".chatMessageContent").style.height =
              //     "240px";

              //   document.querySelector(".showBtnContainer").innerHTML = "";
              //   document.querySelector(".showBtnContainer").innerHTML = `
              //   <button id="showMembers">Members</button>
              //   <button id="showDirectBox">Group Chat</button>
              //   `;

              //   if (userMessages.admin == true) {
              //     document.getElementById("deleteBox").style.display = "flex";
              //   } else {
              //     document.getElementById("deleteBox").style.display = "none";
              //   }

              //   let chatMessageContent = document.querySelector(
              //     ".chatMessageContent"
              //   );

              //   if (userMessages.data) {
              //     chatMessageContent.innerHTML = "";
              //     userMessages.data.slice(0, 4).map((obj, i) => {
              //       document.querySelector(".dynamicContainer").innerHTML += `
              //   <div class="chatContent">

              //     <img src="./Assets/img/user.png" alt="">

              //     <h1>${obj.email}</h1>

              //   </div>
              //     `;
              //     });

              //     document.getElementById("groupName").value = "";
              //   }

              //   setTimeout(() => {


              //     document
              //       .getElementById("showMembers")
              //       .addEventListener("click", dynamicModalOpenM);

              //     document.getElementById("showprospectBox").addEventListener("click", () => {
              //       dynamicModal.style.transform = "scale(1)";
              //       dynamicModal.style.opacity = 1;
              //     });
              //     document
              //       .getElementById("showDirectBox")
              //       .addEventListener("click", showNullChats);
              //   }, 100);
            }
          };

          clearInterval(x)

        }, 1000);

      } else {
        var myToast = Toastify({
          text: "Please add group name",
          duration: 2000,
        });

        myToast.showToast();
      }




    }
  }


}

// Group Message Button

if (document.getElementById("msgInp")) {
  document.getElementById("msgInp").addEventListener("keyup", checkForm);
}

function checkForm(e) {
  if (e.keyCode == 13) {
    if (document.getElementById("sendMsgBtn").style.display != "none") {
      sendMessage();
    }
    if (document.getElementById("sendGroupMsgBtn").style.display != "none") {
      sendGroupMessage();
    }
    if (document.getElementById("sendSubGroupMsgBtn").style.display != "none") {
      send_sub_group_message();
    }
  }
}

if (document.getElementById("sendGroupMsgBtn")) {
  document
    .getElementById("sendGroupMsgBtn")
    .addEventListener("click", (e) => sendGroupMessage(e));
}

function sendGroupMessage(e) {
  document.querySelectorAll(".menuBox").forEach((ele) => {
    ele.style.display = "none";
  });

  let msgInp = document.getElementById("msgInp");

  var user_id = localStorage.getItem("user_id");
  var group_id = localStorage.getItem("group_id");
  var prospect_id = localStorage.getItem("prospect_id");
  var replied_id = localStorage.getItem("replied_id");

  if (msgInp.value !== "") {
    if (document.getElementById("updateGroupMsgBtn").style.display == "none") {
      const url = `${globalURl}/send_group_message`;

      let xhr = new XMLHttpRequest();

      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          user_id,
          group_id,
          prospect_id,
          text: msgInp.value,
          replied_id,
        })
      );

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let userMessages = JSON.parse(xhr.responseText);

          let chatMessageContent = document.querySelector(
            ".chatMessageContent"
          );

          if (userMessages.data.length > 0) {
            document.getElementById("sendGroupMsgBtn").style.display = "block";
            document.getElementById("updateGroupMsgBtn").style.display = "none";
            document.getElementById("cancelGroupMsgBtn").style.display = "none";
            document.getElementById("msgInp").value = "";

            userMessages.data.map((obj, i) => {
              if (obj.sender_id == user_id) {
                let dbTime = obj.created_at;

                let newDate = new Date();

                let UTCDate = new Date(
                  newDate.getUTCFullYear(),
                  newDate.getUTCMonth(),
                  newDate.getUTCDate(),
                  newDate.getUTCHours(),
                  newDate.getUTCMinutes(),
                  newDate.getUTCSeconds(),
                  newDate.getUTCMilliseconds()
                );

                let currentTime = Math.abs(
                  (UTCDate.getTime() / 1000).toFixed(0)
                );

                let futureTime = Math.abs(
                  (new Date(dbTime).getTime() / 1000).toFixed(0)
                );

                let TimeDifference = currentTime - futureTime;

                let days = Math.floor(TimeDifference / 86400);

                let hours = Math.floor(TimeDifference / 3600) % 24;

                let minutes = Math.floor(TimeDifference / 60) % 60;

                let seconds = Math.floor(TimeDifference % 60);

                let messageTimeString = "";

                if (days == 0) {
                  if (hours == 0) {
                    if (minutes == 0) {
                      if (seconds == 0) {
                        messageTimeString = `less than a second ago`;
                      } else {
                        messageTimeString =
                          seconds == 1
                            ? `${seconds} second ago`
                            : `${seconds} seconds ago`;
                      }
                    } else {
                      messageTimeString =
                        minutes == 1
                          ? `${minutes} minute ago`
                          : `${minutes} minutes ago`;
                    }
                  } else {
                    messageTimeString =
                      hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                  }
                } else {
                  messageTimeString =
                    days == 1 ? `${days} day ago` : `${days} days ago`;
                }

                let row = `
                <div class='senderMsgContainer'>
                    
                <div class='myMessageDiv'>
                
                <div class="imageNameContainer">
                
                    <span class="senderName">${obj.username}</span>
                    <img src="${obj.image}" class='messageImage'/>
                  
                  </div>
                  <i class="far fa-ellipsis-v menuGroupIcon"></i>
  
                    <div class='menuBox' style="display: none">
                      <div class='editContainer editGroupContainer'>
                        <i class="far fa-edit"></i>
                        <h1>Edit</h1>
                      </div>
                      <div class="deleteContainer deleteGroupContainer">
                        <i class="far fa-trash"></i>
                        <h1>Delete</h1>
                      </div>
                    </div>
                      ${obj.replied_id != null
                    ? `<div class="prospectReplyDiv">
                          <div class="prospectContentDiv">
                            <h1>${obj.reply_msg != null
                      ? `<h1>${obj.reply_msg}</h1>`
                      : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                    }</h1>
                          </div>
                          ${obj.reply_image != null
                      ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                      : ""
                    }
                        </div>`
                    : ""
                  }
  
                      <i class="fas fa-reply myReplyIcon"></i>
  
                      <p class="messageTxt" data-replied_id=${obj.id}>${obj.text
                  }</p>
                      <div class="timestampDiv">
                        ${messageTimeString}
                      </div>
                    </div>
  
                </div>
                `;
                chatMessageContent.innerHTML += row;

                setTimeout(() => {
                  document.querySelectorAll(".menuGroupIcon").forEach((ele) => {
                    ele?.addEventListener("click", openGroupThreeDotMenu);
                  });
                }, 100);

                setTimeout(() => {
                  document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                    ele.addEventListener("click", replyToMessageFn);
                  });
                }, 100);
              } else {
                let dbTime = obj.created_at;

                let newDate = new Date();

                let UTCDate = new Date(
                  newDate.getUTCFullYear(),
                  newDate.getUTCMonth(),
                  newDate.getUTCDate(),
                  newDate.getUTCHours(),
                  newDate.getUTCMinutes(),
                  newDate.getUTCSeconds(),
                  newDate.getUTCMilliseconds()
                );

                let currentTime = Math.abs(
                  (UTCDate.getTime() / 1000).toFixed(0)
                );

                let futureTime = Math.abs(
                  (new Date(dbTime).getTime() / 1000).toFixed(0)
                );

                let TimeDifference = currentTime - futureTime;

                let days = Math.floor(TimeDifference / 86400);

                let hours = Math.floor(TimeDifference / 3600) % 24;

                let minutes = Math.floor(TimeDifference / 60) % 60;

                let seconds = Math.floor(TimeDifference % 60);

                let messageTimeString = "";

                if (days == 0) {
                  if (hours == 0) {
                    if (minutes == 0) {
                      if (seconds == 0) {
                        messageTimeString = `less than a second ago`;
                      } else {
                        messageTimeString =
                          seconds == 1
                            ? `${seconds} second ago`
                            : `${seconds} seconds ago`;
                      }
                    } else {
                      messageTimeString =
                        minutes == 1
                          ? `${minutes} minute ago`
                          : `${minutes} minutes ago`;
                    }
                  } else {
                    messageTimeString =
                      hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                  }
                } else {
                  messageTimeString =
                    days == 1 ? `${days} day ago` : `${days} days ago`;
                }

                let row = `
                  <div class="groupUserMsgContainer">
                  
                  
                  <div class='userMessageDiv'>
                  
                  <div class="imageNameContainer1">
                  <img src="${obj.image}" class='messageImage'/>
                      <span class="groupUserName">${obj.username}</span>
                    </div>
  
                    ${obj.replied_id != null
                    ? `<div class="prospectReplyDiv1">
                        <div class="prospectContentDiv" style="${obj.reply_image == null ? "width: 100%;" : ""
                    }">
                          <h1>${obj.reply_msg != null
                      ? `<h1>${obj.reply_msg}</h1>`
                      : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                    }</h1>
                          </div>
                          ${obj.reply_image != null
                      ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                      : ""
                    }
                      </div>`
                    : ""
                  }
  
                      <i class="fas fa-reply replyIcon"></i>
                      
                      <p class="messageTxt" data-replied_id=${obj.id}>${obj.text
                  }</p>
                  
                <div class="timestampUserDiv">
                  ${messageTimeString}
                </div>
  
                    </div>
                    
                  </div>
                `;
                chatMessageContent.innerHTML += row;

                setTimeout(() => {
                  document.querySelectorAll(".replyIcon").forEach((ele) => {
                    ele.addEventListener("click", replyToMessageFn);
                  });
                }, 100);
              }

              chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
            });
          }
          msgInp.value = "";

          replied_id = "";
          localStorage.removeItem("replied_id");

          let replyInterval = setInterval(() => {
            if (document.querySelector(".replyIcon")) {
              clearInterval(replyInterval);
              document.querySelectorAll(".replyIcon").forEach((ele) => {
                ele.classList.remove("replyIconClicked");
              });
            }
            if (document.querySelector(".myReplyIcon")) {
              clearInterval(replyInterval);
              document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                ele.classList.remove("replyIconClicked");
              });
            }
          });
        }
      };
    } else {
      document.getElementById("sendMsgBtn").style.display = "none";
      document.getElementById("updateMsgBtn").style.display = "none";
      document.getElementById("cancelMsgBtn").style.display = "none";
      document.getElementById("sendGroupMsgBtn").style.display = "block";
      document.getElementById("updateGroupMsgBtn").style.display = "none";
      document.getElementById("cancelGroupMsgBtn").style.display = "none";
      document.getElementById("sendSubGroupMsgBtn").style.display = "none";
      document.getElementById("updateSubGroupMsgBtn").style.display = "none";
      document.getElementById("cancelSubGroupMsgBtn").style.display = "none";

      let message_id = localStorage.getItem("message_id");
      let updatedMessage = document.getElementById("msgInp").value;

      const url = `${globalURl}/edit_single_group_chat`;

      let xhr = new XMLHttpRequest();

      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          id: message_id,
          text: updatedMessage,
        })
      );

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let response = JSON.parse(xhr.responseText);
          localStorage.removeItem("message_id");
          if (response.status == "Updated") {
            document.getElementById("msgInp").value = "";

            let nullGroupChat = localStorage.getItem("nullGroupChat");

            let url = "";

            if (nullGroupChat) {
              url = `${globalURl}/null_chats/${group_id}/${user_id}`;
            } else {
              url = `${globalURl}/chat_filter/${group_id}/${prospect_id}/${user_id}`;
            }

            let xhr = new XMLHttpRequest();

            xhr.open("GET", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();

            xhr.onreadystatechange = function () {
              if (xhr.readyState == 4 && xhr.status == 200) {
                let userData = JSON?.parse(xhr.responseText);

                if (userData.group_name) {
                  localStorage.setItem("group_name", userData.group_name);
                }

                if (userData.admin == true) {
                  document.getElementById("deleteBox").style.display = "flex";
                } else {
                  document.getElementById("deleteBox").style.display = "none";
                }

                if (userData.data) {
                  let chatMessageContent = document.querySelector(
                    ".chatMessageContent"
                  );
                  chatMessageContent.innerHTML = "";

                  userData.data.map((obj, i) => {
                    if (obj.text != null) {
                      if (obj.sender_id == user_id) {
                        let dbTime = obj.created_at;

                        let newDate = new Date();

                        let UTCDate = new Date(
                          newDate.getUTCFullYear(),
                          newDate.getUTCMonth(),
                          newDate.getUTCDate(),
                          newDate.getUTCHours(),
                          newDate.getUTCMinutes(),
                          newDate.getUTCSeconds(),
                          newDate.getUTCMilliseconds()
                        );

                        let currentTime = Math.abs(
                          (UTCDate.getTime() / 1000).toFixed(0)
                        );

                        let futureTime = Math.abs(
                          (new Date(dbTime).getTime() / 1000).toFixed(0)
                        );

                        let TimeDifference = currentTime - futureTime;

                        let days = Math.floor(TimeDifference / 86400);

                        let hours = Math.floor(TimeDifference / 3600) % 24;

                        let minutes = Math.floor(TimeDifference / 60) % 60;

                        let seconds = Math.floor(TimeDifference % 60);

                        let messageTimeString = "";

                        if (days == 0) {
                          if (hours == 0) {
                            if (minutes == 0) {
                              if (seconds == 0) {
                                messageTimeString = `less than a second ago`;
                              } else {
                                messageTimeString =
                                  seconds == 1
                                    ? `${seconds} second ago`
                                    : `${seconds} seconds ago`;
                              }
                            } else {
                              messageTimeString =
                                minutes == 1
                                  ? `${minutes} minute ago`
                                  : `${minutes} minutes ago`;
                            }
                          } else {
                            messageTimeString =
                              hours == 1
                                ? `${hours} hour ago`
                                : `${hours} hours ago`;
                          }
                        } else {
                          messageTimeString =
                            days == 1 ? `${days} day ago` : `${days} days ago`;
                        }

                        let row = `
                          <div class='senderMsgContainer'>
                          
                          <div class='myMessageDiv'>
                          
                          <div class="imageNameContainer">
                          
                              <span class="senderName">${obj.username}</span>
                              <img src="${obj.image}" class='messageImage'/>
                            
                            </div>
                            <i class="far fa-ellipsis-v menuGroupIcon"></i>
  
                          <div class='menuBox' style="display: none">
                            <div class='editContainer editGroupContainer'>
                              <i class="far fa-edit"></i>
                              <h1>Edit</h1>
                            </div>
                            <div class="deleteContainer deleteGroupContainer">
                              <i class="far fa-trash"></i>
                              <h1>Delete</h1>
                            </div>
                          </div>
                                ${obj.replied_id != null
                            ? `<div class="prospectReplyDiv">
                                    <div class="prospectContentDiv" style="${obj.reply_image == null
                              ? "width: 100%;"
                              : ""
                            }">
                                      <h1>${obj.reply_msg != null
                              ? `<h1>${obj.reply_msg}</h1>`
                              : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                            }</h1>
                                    </div>
                                    ${obj.reply_image != null
                              ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                              : ""
                            }
                                  </div>`
                            : ""
                          }
  
                                <i class="fas fa-reply myReplyIcon"></i>
  
                                <p class="messageTxt" data-replied_id=${obj.id
                          }>${obj.text}</p>
                                <div class="timestampDiv">
                                  ${messageTimeString}
                                </div>
                              </div>
  
                          </div>
                        `;
                        chatMessageContent.innerHTML += row;

                        setTimeout(() => {
                          document
                            .querySelectorAll(".menuGroupIcon")
                            .forEach((ele) => {
                              ele?.addEventListener(
                                "click",
                                openGroupThreeDotMenu
                              );
                            });
                        }, 100);

                        setTimeout(() => {
                          document
                            .querySelectorAll(".myReplyIcon")
                            .forEach((ele) => {
                              ele?.addEventListener("click", replyToMessageFn);
                            });
                        }, 100);
                      } else {
                        let dbTime = obj.created_at;

                        let newDate = new Date();

                        let UTCDate = new Date(
                          newDate.getUTCFullYear(),
                          newDate.getUTCMonth(),
                          newDate.getUTCDate(),
                          newDate.getUTCHours(),
                          newDate.getUTCMinutes(),
                          newDate.getUTCSeconds(),
                          newDate.getUTCMilliseconds()
                        );

                        let currentTime = Math.abs(
                          (UTCDate.getTime() / 1000).toFixed(0)
                        );

                        let futureTime = Math.abs(
                          (new Date(dbTime).getTime() / 1000).toFixed(0)
                        );

                        let TimeDifference = currentTime - futureTime;

                        let days = Math.floor(TimeDifference / 86400);

                        let hours = Math.floor(TimeDifference / 3600) % 24;

                        let minutes = Math.floor(TimeDifference / 60) % 60;

                        let seconds = Math.floor(TimeDifference % 60);

                        let messageTimeString = "";

                        if (days == 0) {
                          if (hours == 0) {
                            if (minutes == 0) {
                              if (seconds == 0) {
                                messageTimeString = `less than a second ago`;
                              } else {
                                messageTimeString =
                                  seconds == 1
                                    ? `${seconds} second ago`
                                    : `${seconds} seconds ago`;
                              }
                            } else {
                              messageTimeString =
                                minutes == 1
                                  ? `${minutes} minute ago`
                                  : `${minutes} minutes ago`;
                            }
                          } else {
                            messageTimeString =
                              hours == 1
                                ? `${hours} hour ago`
                                : `${hours} hours ago`;
                          }
                        } else {
                          messageTimeString =
                            days == 1 ? `${days} day ago` : `${days} days ago`;
                        }

                        let row = `
                          <div class="groupUserMsgContainer">
                          
                          
                          <div class='userMessageDiv'>
                          <div class="imageNameContainer1">
                          <img src="${obj.image}" class='messageImage'/>
                            <span class="groupUserName">${obj.username}</span>
                          </div>
                          
                            ${obj.replied_id != null
                            ? `<div class="prospectReplyDiv1">
                                <div class="prospectContentDiv" style="${obj.reply_image == null ? "width: 100%;" : ""
                            }">
                                  <h1>${obj.reply_msg != null
                              ? `<h1>${obj.reply_msg}</h1>`
                              : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                            }</h1>
                                </div>
                                ${obj.reply_image != null
                              ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                              : ""
                            }
                              </div>`
                            : ""
                          }
                            
                              <i class="fas fa-reply replyIcon"></i>
                              
                              <p class="messageTxt" data-replied_id=${obj.id}>${obj.text
                          }</p>
                        
                              <div class="timestampUserDiv">
                                ${messageTimeString}
                              </div>
                            </div>
  
                          </div>
                        `;
                        chatMessageContent.innerHTML += row;

                        setTimeout(() => {
                          document
                            .querySelectorAll(".replyIcon")
                            .forEach((ele) => {
                              ele.addEventListener("click", replyToMessageFn);
                            });
                        }, 100);
                      }

                      chatMessageContent.scroll(
                        0,
                        chatMessageContent.scrollHeight
                      );
                    }
                  });
                }
              }
            };
          }
        }
      };
    }
  }
}

// Modal 3 (Setting)

if (document.querySelector(".settingIcon")) {
  document
    .querySelector(".settingIcon")
    .addEventListener("click", openSettingModal);
}

var settingModal = document.getElementById("settingModal");

function openSettingModal() {
  settingModal.style.transform = "scale(1)";
  settingModal.style.opacity = 1;
}

document
  .getElementById("settingModalCloseBtn")
  .addEventListener("click", prospectModalClose);

function prospectModalClose() {
  settingModal.style.transform = "scale(0)";
  settingModal.style.opacity = 0;
}

// Modal 4 (dynamic modal)

if (document.getElementById("membersBox")) {
  document
    .getElementById("membersBox")
    .addEventListener("click", dynamicModalOpenM);
}

if (document.getElementById("prospectBox")) {
  document.getElementById("prospectBox").addEventListener("click", () => {
    if (localStorage.getItem("sub_group_id")) {
      openSubGroupMembersModal();
    } else {
      dynamicModalOpenP();
    }
  });
}

if (document.getElementById("showprospectDiv")) {
  document
    .getElementById("showprospectDiv")
    .addEventListener("click", dynamicModalOpenP);
}

var dynamicModal = document.getElementById("dynamicModal");

function dynamicModalOpenM() {
  document.getElementById("dynamicModalH1").innerText = "Members";

  document.querySelector(".dynamicContainer").innerHTML = "";

  dynamicModal.style.transform = "scale(1)";
  dynamicModal.style.opacity = 1;

  groupUsersArr.map((ele) => {
    document.querySelector(".dynamicContainer").innerHTML += `
        <div class="chatContent">
                    
          <i class="fas fa-users"></i>

          <h1>${ele}</h1>

        </div>
        `;
  });
}

function dynamicModalOpenP() {
  SearchUserArray = [];
  localStorage.removeItem("edit_id")
  document.getElementById("send_message_div").value = null
  document.getElementById("send_message_button").style.display = 'block'
  document.getElementById("update_message_button").style.display = 'none'
  document.getElementById("cancel_message_button").style.display = 'none'
  document.getElementById("customScreenChattBox").style.display = "none"
  localStorage.removeItem("dms");
  localStorage.removeItem("dmNullChats");
  document.querySelector(".groupContainer").style.display = "none";
  console.log('here');
  document.querySelector(".dynamicContainer").innerHTML = "";

  document.getElementById("dynamicModalH1").innerText = "Prospects";
document.getElementById("opening_description_here").style.display = "none"
  localStorage.removeItem("replied_id");
  localStorage.removeItem("subgroup_id");

  document.querySelector(".rightBox ").style.display = "none"
  document.querySelector(".profileMainBox ").style.display = "block"

  // document.querySelector(".dynamicContainer").style.display = "block"
  document.querySelector(".groupContainer ").style.display = "none"
  document.querySelector(".groupBoxContainerListView").style.display = "none"


  // dynamicModal.style.transform = "scale(1)";
  // dynamicModal.style.opacity = 1;

  var group_id = localStorage.getItem("group_id");
  var user_id = localStorage.getItem("user_id");

  const url = `${globalURl}/get_group_prospects/${group_id}/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);
      localStorage.removeItem("prospects_data");
      localStorage.removeItem("group_members");
      if(userData.admin_id == user_id){
          document.getElementById("Delete_current_group").style.display = "block"
      }else{
        document.getElementById("Delete_current_group").style.display = "none"
      }
      document.getElementById("showprospectBox").style.color = "#084dd1"
      document.getElementById("subgroup_notify_img_second").style.display = "none";
      document.getElementById("notify_img_second").style.display = "block";
      document.getElementById("showprospectBox").innerText = "Prospect:" + userData.total_prospect
      document.getElementById("showprospectsanother").innerText = "Prospect:" + userData.total_prospect
      document.getElementById("opening_members").innerText = "Members " + userData.total_members

      
      document.getElementById('nameofgroup').innerText = ``;
      document.getElementById('nameofgroups').innerText = userData.group_name
      document.getElementById('group_setting_name').innerText = userData.group_name
      document.getElementById('group_name_in_settings').innerText = userData.group_name;
      document.getElementById('group_setting_name_sub').innerText = userData.group_name;
      document.getElementById('admin_name').innerText = userData.admin;
      document.getElementById('created_at_date').innerText = 'created this group on ' + userData.month;
      document.getElementById('created_by').innerText = userData.admin + " on "+ userData.month + ",2022";
      document.getElementById('description').innerText = ``;
      document.getElementById('subgroup_setting_topic').innerText = userData.groups_topic;
      document.getElementById('group_setting_description').innerText = userData.groups_description;
      document.getElementById('subgroup_name').innerText = "#General";
      document.getElementById('heading_group').innerText = "#General";
      


      localStorage.setItem("admin", userData.admin);

      if (userData.groups_image) {
        document.getElementById('group_chat_icon').src = userData.groups_image;
        document.getElementById('image_group').src = userData.groups_image;

      }
      else {
        document.getElementById('image_group').src = "./Assets/img/group-bg.png";
        document.getElementById('group_chat_icon').src = "./Assets/img/group-bg.png";

      }
      if (userData.data) {
        localStorage.removeItem("prospects_data")
        userData.data.map((ele) => {
          let prospect = {
            "id": ele.prospect_id,
            "name": ele.prospect_data.name,
            "image": ele.prospect_data.image,
            "sender_name": ele.sender_name,
            "database": ele.database,
            "notification": ele.notifications,
          }
          groupprospectsArr.push(prospect);
          console.log(groupmembersArr);
          console.log(prospect);
          if (ele.prospect_data) {

            
            document.querySelector(".dynamicContainer").innerHTML += `
  
                  <div class="prospectContentContainer">
                    <div class="prospectContent" data-prospect_id=${ele.prospect_id
              }>
                                
                      <img src=${ele.prospect_data.image ? `${ele.prospect_data.image}` : `./Assets/img/user.png`} alt=""/>
              
                      <div>
                        <h1>${ele.prospect_data.name}</h1>
                        <h2>${ele.sender_name != null
                ? `By ${ele.sender_name} ${ele.database != null
                  ? `from ${ele.database}`
                  : ""
                }`
                : ""
              }
                        </h2>
                      </div>
              
                      ${ele.notifications != 0 && ele.notifications != null
                ? `<span>${ele.notifications}</span>`
                : ""
              }
  
                    </div>
                    <i class="fas fa-trash prospectDeleteIcon groupProspectDelete"></i>
                    </div>
                    `;
          }
        });



        document.querySelectorAll(".groupProspectDelete").forEach((ele) => {
          ele.addEventListener("click", groupProspectDelete);
        });

        document.querySelectorAll(".prospectContent").forEach((element) => {
          element.addEventListener("click" , () => { 
            var console = element.getAttribute("data-prospect_id")
            localStorage.setItem("prospect_id",console);
            showProspectChat();
        });
      })
        localStorage.setItem("prospects_data", JSON.stringify(groupprospectsArr))
        groupprospectsArr = [];
      } else {

      }
      var temp
      var counting_days = 1
      if (userData.messages) {
        document.getElementById("new_chat_box").innerHTML = '';
        

        userData.messages.length > 0 && userData?.messages.map((ele) => {
          if(ele.text != null){
          let dbTime = ele.created_at;
          
          let newDate = new Date();
          var ajjtareekh
              if( (newDate.getUTCMonth()+1) < 10 && newDate.getUTCDate() < 10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+'0'+newDate.getUTCDate();
              }
              else if( (newDate.getUTCMonth()+1) < 10 &&  newDate.getUTCDate() >=10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+newDate.getUTCDate();
              }
              else if( (newDate.getUTCMonth()+1) >= 10 &&  newDate.getUTCDate() < 10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+'0'+newDate.getUTCDate();
              }
              else{
                ajjtareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+newDate.getUTCDate();
              }

              var kalltareekh
              if( (newDate.getUTCMonth()+1) < 10 && (newDate.getUTCDate()-1) < 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+'0'+(newDate.getUTCDate()-1);
              }
              if( (newDate.getUTCMonth()+1) < 10 && (newDate.getUTCDate()-1) >= 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+(newDate.getUTCDate()-1);
              }
              if( (newDate.getUTCMonth()+1) >= 10 && (newDate.getUTCDate()-1) < 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+'0'+(newDate.getUTCDate()-1);
              }
              else{
                kalltareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+(newDate.getUTCDate()-1);
              }
          myDate = dbTime.split(" ");
          console.log(ajjtareekh,"ajj")
          console.log(kalltareekh,"kall")
          console.log(myDate[0],"DB")
          console.log(temp,"temp")

          localStorage.removeItem("lastDate")
          if(temp == myDate[0]){
                counting_days = counting_days + 1;
          }
          else{
            if(ajjtareekh == myDate[0]){
              document.getElementById("new_chat_box").innerHTML += `<div class="date-Wraper position-relative mb-3">
              <div class="today-date">Today</div>
              </div>`;
              counting_days = counting_days + 1
            }
            else if (kalltareekh == myDate[0]) {
              document.getElementById("new_chat_box").innerHTML += `<div class="date-Wraper position-relative mb-3">
              <div class="today-date">Yesterday</div>
              </div>`;
              counting_days = counting_days + 1
            }
            else {
              document.getElementById("new_chat_box").innerHTML += `<div class="date-Wraper position-relative mb-3">
                <div class="today-date">${myDate[0]}</div>
                </div>`;
                counting_days = counting_days + 1;
            }
            
            temp = myDate[0];

          }
          localStorage.setItem("lastDate",temp)


          

          let UTCDate = new Date(
            newDate.getUTCFullYear(),
            newDate.getUTCMonth(),
            newDate.getUTCDate(),
            newDate.getUTCHours(),
            newDate.getUTCMinutes(),
            newDate.getUTCSeconds(),
            newDate.getUTCMilliseconds()
          );

          let currentTime = Math.abs(
            (UTCDate.getTime() / 1000).toFixed(0)
          );

          let futureTime = Math.abs(
            (new Date(dbTime).getTime() / 1000).toFixed(0)
          );

          let TimeDifference = currentTime - futureTime;

          let days = Math.floor(TimeDifference / 86400);

          let hours = Math.floor(TimeDifference / 3600) % 24;

          let minutes = Math.floor(TimeDifference / 60) % 60;

          let seconds = Math.floor(TimeDifference % 60);

          let messageTimeString = "";

          if (days == 0) {
            if (hours == 0) {
              if (minutes == 0) {
                if (seconds == 0) {
                  messageTimeString = `a second ago`;
                } else {
                  messageTimeString =
                    seconds == 1
                      ? `${seconds} second ago`
                      : `${seconds} seconds ago`;
                }
              } else {
                messageTimeString =
                  minutes == 1
                    ? `${minutes} minute ago`
                    : `${minutes} minutes ago`;
              }
            } else {
              messageTimeString =
                hours == 1
                  ? `${hours} hour ago`
                  : `${hours} hours ago`;
            }
          } else {
            messageTimeString =
              days == 1 ? `${days} day ago` : `${days} days ago`;
          }
          let messageReplyTimeString = "";

          if(ele.reply_msg != null){

            let dbTime = ele.reply_created_at;

            let newDate = new Date();
  
            let UTCDate = new Date(
              newDate.getUTCFullYear(),
              newDate.getUTCMonth(),
              newDate.getUTCDate(),
              newDate.getUTCHours(),
              newDate.getUTCMinutes(),
              newDate.getUTCSeconds(),
              newDate.getUTCMilliseconds()
            );
  
            let currentTime = Math.abs(
              (UTCDate.getTime() / 1000).toFixed(0)
            );
  
            let futureTime = Math.abs(
              (new Date(dbTime).getTime() / 1000).toFixed(0)
            );
  
            let TimeDifference = currentTime - futureTime;
  
            let days = Math.floor(TimeDifference / 86400);
  
            let hours = Math.floor(TimeDifference / 3600) % 24;
  
            let minutes = Math.floor(TimeDifference / 60) % 60;
  
            let seconds = Math.floor(TimeDifference % 60);
  
  
            if (days == 0) {
              if (hours == 0) {
                if (minutes == 0) {
                  if (seconds == 0) {
                    messageReplyTimeString = `a second ago`;
                  } else {
                    messageReplyTimeString =
                      seconds == 1
                        ? `${seconds} second ago`
                        : `${seconds} seconds ago`;
                  }
                } else {
                  messageReplyTimeString =
                    minutes == 1
                      ? `${minutes} minute ago`
                      : `${minutes} minutes ago`;
                }
              } else {
                messageReplyTimeString =
                  hours == 1
                    ? `${hours} hour ago`
                    : `${hours} hours ago`;
              }
            } else {
              messageReplyTimeString =
                days == 1 ? `${days} day ago` : `${days} days ago`;
            }

            console.log('reply_msg',messageReplyTimeString)


          }


          document.getElementById("new_chat_box").innerHTML += `
          <div class="card my-2 rounded">
                    <div
                      class="card-body p-2 px-2 d-flex justify-content-between align-items-center"
                    >
                      <div class="row">
                        <div class="img-p">
                          <img
                            src="${ele.image}"
                            alt=""
                            class="img-fluid rounded-circle"
                          />
                        </div>
                        <div class="card-left-content-box">
                          <div
                            class="font-weight-bold name-top"
                            style="font-size: 12px"
                          >
                          <span class='nameIssue' title='${ele.username}'>
                          ${ele.username}
                          </span>
                            <span
                              class="time"
                              style="
                                padding-left: 15px;
                                font-size: 8px;
                                line-height: 10px;
                                color: #636363;
                                font-weight: 400;
                              "
                              >${messageTimeString}</span
                            >
                          </div>
                          <div class="msg-box-chat">
                          ${ele.text}
                          </div>
                          
                    ${ ele.name ? `
                    
                          <div class="prospects_shared_box" style="
   position: relative;
   ">
   <div class="row" style="
      align-items: center;
      justify-content: left;
      flex-wrap: nowrap;
      height: 36px;
      padding-bottom: 5px;
      ">
      <div class="" style="
         margin: auto 6px auto 21px;
         ">
         <img src="${ele.prospect_image}" alt="profile-img">
      </div>
      <div class="">
         <h3 class="title" style="
            margin-bottom: 0;
            font-size: 9px;
            line-height: 10px;
            font-weight: 800;
            margin-top: 4px;
            ">${ele.name.length > 12 ? `${ele.name.slice(0,12)}....` : `${ele.name}`}</h3>
         <p class="desc" style="
            width: 127px;
            font-size: 10px;
            ">${ele.description.length > 15 ? `${ele.description.slice(0,15)}....` : `${ele.description}`}</p>
      </div>
   </div>
   <div class="social-btn-box" style="
      position: absolute;
      top: -3px;
      right: 7px;
      ">
      ${ele.delete_status == 0 ? `<button data-id=${ele.temporary_id} data-title="View Prospect Chat"  class="opening_perspective" style="
      border: 0;
      background: none;
      cursor:pointer;
      ">
      <img class="new_class" style="width: 18px;
      height: 18px;
      object-fit: cover;
      border-radius: 50%;" src="./Assets/img/chat_redirect.png">
   </button> ` : ``}
      
      <button data-url=${ele.url} data-title="View LinkedIn Profile"  class="opening_background" style="
         border: 0;
         background: none;
         cursor:pointer;
         ">
         <img class="new_class" style="width: 14px;
         height: 14px;
         object-fit: cover;
         border-radius: 50%;" src="./Assets/img/open_prospect.svg">
      </button>                        
      <a href="#modal-12" data-title="View Prospect" data-prospect-id=${ele.temporary_id} data-id=${ele.sender_id} data-url=${ele.url} class="opening_clipper" style="
         border: 0;
         background: none;
         cursor:pointer;
         ">
         <img class="new_class" style="width: 14px;
         height: 14px;
         object-fit: cover;
         border-radius: 50%;" src="./Assets/img/open_background.svg">
      </a>
   </div>
</div> ` : `` }


                        </div>
                      </div>
                      ${ ele.name ? `
                      <span class="updating_text" style="display:none">${ele.text}</span> <button
                      class="border-0 bg-transparent f-10 pointer position-absolute dropdown-btn"
                       style="top: 8px; right: 8px" >
                       <i class="fas fa-ellipsis-v"></i>
                       <div class='dropdown-list'>
                       <span data-replied_id=${ele.id} class="message_delete_button">Delete</span>
                       </div>
                       </button>
                      ` : `<button
                      class="border-0 bg-transparent f-10 pointer position-absolute dropdown-btn"
                       style="top: 8px; right: 8px" >
                       <i class="fas fa-ellipsis-v"></i>
                       <div class='dropdown-list'>
                       <span data-replied_id=${ele.id} class="message_edit_button">Edit</span>
                       <span data-replied_id=${ele.id} class="message_delete_button">Delete</span>
                       <span class="updating_text" style="display:none">${ele.text}</span>
                       </div>
                       </button>` }
                      
                    </div>
                    ${
                      ele.reply_msg ? 
                      
                      `<div class="card card-child">
                      <div class="card-body p-0 m-0">
                        <div class="d-flex w-100" style="justify-content: space-evenly">
                          <div class="img-p">
                            <img src="${ele.reply_image}" alt="" class="img-fluid rounded-circle" />
                          </div>
                          <div class="card-left-content-box bg-transparent" style="width: 135px">
                            <div class="font-weight-bold name-top" style="font-size: 10px">
                              ${ele.reply_username}
                              <span class="time" style="
                                    padding-left: 8px;
                                    font-size: 6px;
                                    line-height: 8px;
                                    color: #636363;
                                    font-weight: 400;
                                  ">${messageReplyTimeString}</span>
                            </div>
                            <div class="msg-box-chat" style="font-size: 7px">
                              ${ele.reply_msg}
                            </div>
                          </div>
                        </div>
                        
                      </div>
                    </div>`
                    :
                    ""
                    }
                    
                    
                    <div data-replied_id=${ele.id} class="reply-box">&#x2923; Reply</div>
                  </div>
          `
          document.querySelectorAll(".opening_perspective").forEach((ele) => {
            ele.addEventListener("click", (e) => {
              let currentMessage = e.currentTarget
              let message_id = currentMessage.getAttribute("data-id");
              
              localStorage.setItem("prospect_id",message_id);
              showProspectChat();
              
              console.log("perspective")
            });
          });

          document.querySelectorAll(".opening_clipper").forEach((ele) => {
            ele.addEventListener("click", (e) => {

                            var profile_link = e.currentTarget.getAttribute("data-url");
                            var user_id = e.currentTarget.getAttribute("data-id");
                            var prospect_id = e.currentTarget.getAttribute("data-prospect-id");
                            var sending_id = localStorage.getItem("user_id");
                            const url = `${globalURl}/get_prospect_Data`;

                              let xhr = new XMLHttpRequest();

                              xhr.open("POST", url, true);
                              xhr.setRequestHeader("Content-Type", "application/json");
                              xhr.send(
                                JSON.stringify({
                                  prospect_id,
                                  user_id: sending_id,
                                })
                              );

                              xhr.onreadystatechange = function () {
                                if (xhr.readyState == 4 && xhr.status == 200) {
                                  let userData = JSON.parse(xhr.responseText);
                                  if (userData.data) {
                                    if(userData.data.prospect_status == "no"){
                                      document.getElementById("send_CRM").style.display = "none";
                                    }
                                    else{
                                      document.getElementById("send_CRM").style.display = "block";
                                      document.getElementById("prospect_status_image").value = userData.data.prospect_status_image;
                                      document.getElementById("prospect_status_name").value = userData.data.prospect_status_name;;

                                    }
                                    
                                    document.querySelector(".prospect_name_heading_comment").innerText = userData.data.name
                                    document.getElementById("prospect_image_heading_comment").src = userData.data.image
                                    document.querySelector(".desigination_comment").innerText = `${userData.data.description.length > 30 ? `${userData.data.description.slice(0,30)}....` : `${userData.data.description}`}`;
                                    document.querySelector(".prospect_group_name_comment").innerText = userData.data.company
                                    document.querySelector(".prospect_subgroup_name_comment").innerText = userData.data.address
                                    document.querySelector(".prospect_subgroup_status_comment").innerText = userData.data.status
                                    document.querySelector(".notes_comment").innerText = `${userData.data.notes == null ? `Notes not added` : `${userData.data.notes}`}`  
                                  }
                                    
                                  
                                }
                              }
              

              



              localStorage.setItem("commentID", JSON.stringify(commentArray));
                document.querySelector(".taggedUser").innerHTML = "";
                document.getElementById("comment_box").value = "";
                document.getElementById("temporary_sender").value = user_id;
                document.getElementById("temporary_prospect_id").value = prospect_id;
                document.getElementById("temporary_url").value = profile_link;


                var access_token = localStorage.getItem("access_token");
                var username = localStorage.getItem("username");

                if (access_token && username) {
                  document.getElementById("comment_box").disabled = false;

                  setTimeout(() => {
                    const url = `${globalURl}/getComments`;

                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", url, true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(
                      JSON.stringify({
                        profile_link: profile_link,
                        secondary_id: user_id,
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


                            

              
            });
          });

          document.querySelectorAll(".opening_background").forEach((ele) => {
            ele.addEventListener("click", (e) => {
              let currentMessage = e.currentTarget
              let message_id = currentMessage.getAttribute("data-url");
              let params = {
                active: true,
                currentWindow: true,
              };
              chrome.tabs.query(params, gotTab);
      
              function gotTab(tabs) {
                let msg = {
                  txt: message_id,
                };
                chrome.tabs.sendMessage(tabs[0].id, msg);
              }
              console.log("background")
            });
          });

          document.querySelectorAll(".reply-box").forEach((ele) => {
            ele.addEventListener("click", (e) => {
              // dynamicModalClose();
              // showNullChats();
              localStorage.removeItem("edit_id");
              document.getElementById("send_message_div").value = null;
              document.getElementById("send_message_button").style.display = "block";
              document.getElementById("update_message_button").style.display = "none";
              document.getElementById("cancel_message_button").style.display = "none";

              let currentMessage = e.currentTarget
              console.log(currentMessage);
              let message_id = currentMessage.getAttribute("data-replied_id");
              console.log(message_id);
              localStorage.setItem("replied_id", message_id)

              document.querySelector(".edit-text-msg-box").style.display = "block"
              // document.getElementById("update_message_button").style.display = "block"
              // document.getElementById("cancel_message_button").style.display = "block"

              currentMessage = e.currentTarget.parentElement
              console.log(currentMessage);
              let message = currentMessage.querySelector(".updating_text").innerHTML;
              console.log(message);
               let name = currentMessage.querySelector(".font-weight-bold").innerText
              // currentMessage = e.currentTarget.parentElement


              document.querySelector(".name-edit-box").innerText = name
              document.querySelector(".msg").innerHTML = message

              // document.getElementById("send_message_div").value = message

              console.log("Reply")
            });
          });



          document.querySelectorAll(".message_edit_button").forEach((ele) => {
            ele.addEventListener("click", (e) => {
              // dynamicModalClose();
              // showNullChats();
              document.querySelector(".edit-text-msg-box").style.display ="none";
              localStorage.removeItem("replied_id");
              let currentMessage = e.currentTarget
              console.log(currentMessage);
              let message_id = currentMessage.getAttribute("data-replied_id");
              console.log(message_id);
              localStorage.setItem("edit_id", message_id)

              document.getElementById("send_message_button").style.display = "none"
              document.getElementById("update_message_button").style.display = "block"
              document.getElementById("cancel_message_button").style.display = "block"

              currentMessage = e.currentTarget.parentElement
              console.log(currentMessage);
              let message = currentMessage.querySelector(".updating_text").innerHTML;
              console.log(message);

              document.getElementById("send_message_div").value = message

              console.log("edit")
            });
          });



          document.querySelectorAll(".message_delete_button").forEach((ele) => {
            ele.addEventListener("click", (e) => {
              // dynamicModalClose();
              // showNullChats();
              let currentMessage = e.currentTarget
              console.log(currentMessage);
              let message_id = currentMessage.getAttribute("data-replied_id");
              console.log(message_id);

              MessageDeleteModal.style.transform = "scale(1)";
              MessageDeleteModal.style.opacity = 1;
              document.getElementById("temporary_buttons").innerHTML = `
              <button id="closeIt" class="btn btn-light-new">Cancel</button>
              <button data-replied_id=${message_id} id="confirmation_delete" class="btn btn-danger-new">Delete</button>
              `
              if (document.getElementById("closeIt")) {
                document
                  .getElementById("closeIt")
                  .addEventListener("click", closeSubGroupModal);
              }
              document.getElementById("confirmation_delete").addEventListener("click", () => {
                deleteGroupMessage();
              });
              console.log("delete")
            });
          });
        }
        });
      }
      else {
        localStorage.removeItem("lastDate")
        console.log("nothing")

        document.getElementById("new_chat_box").innerHTML = ``
        // here
        // let newDate = new Date();
        // var ajjtareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+'0'+newDate.getUTCDate();
        // localStorage.setItem("lastDate",ajjtareekh);



      }
      document.getElementById("bottom-content-box").scroll(0,document.getElementById("new_chat_box").scrollHeight);
      document.getElementById("view_members").innerHTML = ``
      groupmembersArr = [];
      var count = 1
      if (userData.users) {
        document.getElementById("notify_img_second").innerHTML = ``;
        userData.users.length > 0 && userData?.users.map((ele) => {
          let member = {
            "id": ele.id,
            "name": ele.name,
            "image": ele.image,
          }
          if(count <= 3){
            document.getElementById("notify_img_second").innerHTML += `   <a href="#"><img src="${ele.image}" alt="" /></a>`
          }
          count = count + 1;
          groupmembersArr.push(member);
          console.log(groupmembersArr);
          console.log(member);

          if (userData.admin == ele.name) {
            document.getElementById("view_members").innerHTML += `
            <div class="chatContent" >
            <div
              class="defaultIcon"
              style="border: none; margin-left: 10px"
            >
              <img
                src="${ele.image}"
              />
            </div>
  
            <h1 class="userEmail">
            ${ele.name} <br />
              <span class="role">Admin</span>
            </h1>
  
            <button
              class="border-0 bg-transparent f-10 pointer position-absolute on_hover-Child_show"
              style="right: 3.5%"
            >
              <i class="fas fa-ellipsis-v"></i>
              <div class="dropdown-list_another"
              
              >
                        <span  class="Add_admin_button">Make Admin</span>
                        <span  class="Add_admin_button">Remove</span>

                        </div>
            </button>
          </div>
            `
          } else {
            document.getElementById("view_members").innerHTML += `
            <div class="chatContent" >
            <div
              class="defaultIcon"
              style="border: none; margin-left: 10px"
            >
              <img
                src="${ele.image}"
              />
            </div>
  
            <h1 class="userEmail">
            ${ele.name} <br />
              <span class="role">Member</span>
            </h1>
  
            <button
              class="border-0 bg-transparent f-10 pointer position-absolute on_hover-Child_show"
              style="right: 3.5%"
            >
              <i class="fas fa-ellipsis-v"></i>
              <div class="dropdown-list_another">
              <span  class="Add_admin_button">Make Admin</span>
              <span date-remove_id=${ele.id}  class="Remove_member_button">Remove</span>
                        </div>
            </button>
          </div>
            `
            var i = setInterval(() => {

            document.querySelectorAll(".Remove_member_button").forEach((ele) => {
              ele.addEventListener("click", (e) => {

                  console.log("hi");
                localStorage.removeItem("replied_id");
                let currentMessage = e.currentTarget
                console.log(currentMessage);
                let message_id = currentMessage.getAttribute("date-remove_id");
                console.log(message_id);

                
                  const url = `${globalURl}/remove_members_to_group`;
              
                  let xhr = new XMLHttpRequest();
              
                  xhr.open("POST", url, true);
                  xhr.setRequestHeader("Content-Type", "application/json");
                  xhr.send(
                    JSON.stringify({
                      group_id,
                      message_id,
                      user_id,
                    })
                  );
              
                  xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                      let userData = JSON.parse(xhr.responseText);
              
                      if (userData.status == "Removed") {
                        
                        dynamicModalOpenP()
              
                      }
                      else {
                        
                      }
              
              
              
                    }
                  };
              
            


              })
            })
            clearInterval(i)
          }, 200)

          }

        });
        

      }
      localStorage.setItem("group_members", JSON.stringify(groupmembersArr));
      document.getElementById("listOfSubGroups").innerHTML = `<li id="general_div" class="general_div active">
      <a href="#">#General</a>
    </li>`
    var i = setInterval(() => {
      general = document.getElementById("general_div")
      if(general){
        general.addEventListener("click", () => {
          localStorage.removeItem("replied_id")
          document.querySelector('.edit-text-msg-box').style.display = "none";
          console.log('this')
          general.classList.add('active');
          let = menuElements = document.querySelectorAll(".subgroups_div")
              for (var i = 0; i < menuElements.length; i++) {
                menuElements[i].classList.remove('active');
              }
              localStorage.removeItem('subgroup_id')
              dynamicModalOpenP()
        });

      }
      


      clearInterval(i)

    }, 200)
    
    

    
      if (userData.subgroups_data != "400") {
        userData.subgroups_data && userData?.subgroups_data.map((ele) => {
          document.getElementById("listOfSubGroups").innerHTML += `
                    <li class="subgroups_div position-relative" date-subgroup_id="${ele.sub_group_id}" >
                      <a href="#">#${ele.name} ${ele.notifications > 0 ? ` <span class="notifications_span" style="background: red;
                      color: #fff;
                      display: inline-block;
                      position: absolute;
                      right: 0;
                      top: 5px;
                      font-size: 10px;
                      width: 22px;
                      text-align: center;
                      border-radius: 20px;
                      height: 13px; 
                      line-height: 13px;">${ele.notifications}</span>` : `` }</a>
                      <span class='custom_toltip '># ${ele.name}</span>
                    </li>
          `

          document.querySelectorAll(".subgroups_div").forEach((ele) => {
            ele.addEventListener("click", (e) => {
              console.log('sub group')
              localStorage.removeItem("replied_id")
              document.querySelector('.edit-text-msg-box').style.display = "none";
              // dynamicModalClose();
              // showNullChats();
              let = menuElements = document.querySelectorAll(".subgroups_div")
              for (var i = 0; i < menuElements.length; i++) {
                menuElements[i].classList.remove('active');
              }
              localStorage.removeItem('subgroup_id')
              document.querySelector(".general_div").classList.remove('active')

              let subgroupcheck = e.currentTarget
              currentSubGroup = subgroupcheck.closest('li');
              if(subgroupcheck.getElementsByClassName("notifications_span")[0]){
                tempVariable = subgroupcheck.getElementsByClassName("notifications_span")[0];
              }
              currentSubGroup.classList.add("active");
              let subgroup_id = currentSubGroup.getAttribute('date-subgroup_id');
              localStorage.setItem('subgroup_id',subgroup_id)
              nullSubGroupChats()
              
            });
          });




        });
      }
      else{

      }

      document.querySelectorAll(".prospectContent1").forEach((ele) => {
        ele.addEventListener("click", () => {
          dynamicModalClose();
          showNullChats();
        });
      });
    }
  };
  group_id = localStorage.getItem("group_id");

  getAllMembers();
  // if (group_id) {
  //   document.querySelector(".viewSubGroupBtn").style.display = "block";
  //   document.querySelector(".styleSubGroup").style.display = "block";
  //   document.getElementById("dynamicGroupName").style.display = "block";

  // } else {
  //   document.querySelector(".viewSubGroupBtn").style.display = "none";
  //   document.querySelector(".styleSubGroup").style.display = "none";
  //   document.getElementById("dynamicGroupName").style.display = "none";


  // }
}

function groupProspectDelete(e) {
  let currentProspect = e.currentTarget.parentElement;
  let sub_group_id = localStorage.getItem("subgroup_id");
  let user_id = localStorage.getItem("user_id")
  let group_id = localStorage.getItem("group_id");
  let second_user_id = localStorage.getItem("reciever_id")
  let prospect_id = currentProspect
    .querySelector(".prospectContent")
    .getAttribute("data-prospect_id");

  const url = `${globalURl}/delete_group_prospect`;

  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      prospect_id,
      group_id,
      sub_group_id,
      second_user_id,
      user_id,
    })
  );

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.status == "Deleted") {
      if(second_user_id == null){
        if(sub_group_id == null){
          dynamicModalOpenP();
        }
        else{
          nullSubGroupChats();
        }
      }
      else{
        localStorage.removeItem("prospect_id")
        showNullMembersChats()
      }
      }
    }
  };
}

document
  .getElementById("dynamicModalCloseBtn")
  .addEventListener("click", dynamicModalClose);

function dynamicModalClose() {
  dynamicModal.style.transform = "scale(0)";
  dynamicModal.style.opacity = 0;

  document.getElementById("nullHeading").style.display = "flex";

  if (document.querySelector(".rightProspectBox").style.display == "flex") {
    document.getElementById("nullHeading").style.display = "none";
  }
  if (document.querySelector(".rightUpperBox").style.display == "flex") {
    document.getElementById("nullHeading").style.display = "none";
  }

  document.querySelectorAll(".userIcon").forEach((ele) => {
    ele.classList.remove("userClicked");
  });
}

function showProspectChat(e) {
  // prospect_id = e.currentTarget.getAttribute("data-prospect_id");
  
    prospectId = localStorage.getItem("prospect_id");
    localStorage.removeItem("replied_id")
  document.getElementById("second_update_message_button").style.display = "none"
  document.getElementById("second_cancel_message_button").style.display = "none"
  document.getElementById("second_send_message_button").style.display = "block"
  localStorage.removeItem("edit_id");
  localStorage.removeItem("nullGroupChat");
  localStorage.removeItem("group_name");
  localStorage.removeItem("editGroupName");
  localStorage.removeItem("sub_group_id");
  prospectId = localStorage.getItem("prospect_id");


  localStorage.removeItem("sub_group_name");
  localStorage.removeItem('nullSubGroupChat')
  document.querySelector(".profileMainBox").style.display = "none"
  
  document.getElementById("subGroupNamePara").style.display = "none";

  // document.querySelector(".dynamicContainer").innerHTML = "";
  // prospectModalClose();
  dynamicModalClose();

  document.getElementById("nullHeading").style.display = "none";
// if(prospect_id){
//   prospectId = prospect_id;

// }else{
//   prospectId = 
// }
//   console.log(prospectId);

  document.getElementById("prospectImage").src = "./Assets/img/user.png";
  document.getElementById("prospectName").innerText = "";
  document.getElementById("companyName").innerText = "";
  document.getElementById("descriptionName").innerText = "";
  document.getElementById("prospectImage").setAttribute("data-link", "");

  document.querySelector(".groupDiv").classList.remove("groupDivClicked");

  document.getElementById("msgInp").value = "";

  document.getElementById("editBox").style.display = "flex";
  document.getElementById("subGroupEditBox").style.display = "none";

  var user_id = localStorage.getItem("user_id");
  var group_id = localStorage.getItem("group_id");
  var sub_group_id = localStorage.getItem("subgroup_id");
  var reciever_id = localStorage.getItem("reciever_id");

  var url
  if(group_id == null) {
    url = `${globalURl}/chat_prospects/${user_id}/${reciever_id}/${prospectId}`;
    document.getElementById("Conversations_button").classList.remove('btn-active');
    document.getElementById("showprospectsanother").classList.add('btn-active');
  }else{
    if(sub_group_id != null) {
      url = `${globalURl}/sub_group_chat_filter/${group_id}/${sub_group_id}/${prospectId}/${user_id}`;
      document.getElementById("Conversations_button").classList.remove('btn-active');
    document.getElementById("showprospectsanother").classList.add('btn-active');
    document.getElementById("Screen_notify_img").style.display = "block"
    document.getElementById("Screen_notify_img").innerHTML = document.getElementById("subgroup_notify_img_second").innerHTML
    // document.getElementById("Conversations_button").innerText = 'groups';

     }else{
        url = `${globalURl}/chat_filter/${group_id}/${prospectId}/${user_id}`;
        document.getElementById("Conversations_button").classList.remove('btn-active');
    document.getElementById("showprospectsanother").classList.add('btn-active');
    document.getElementById("Screen_notify_img").style.display = "block"
    document.getElementById("Screen_notify_img").innerHTML = document.getElementById("notify_img_second").innerHTML
    // document.getElementById("Conversations_button").innerText = 'groo';
   
     }
  }
  



  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);
      console.log(userData);
      if(group_id != null){

      document.getElementById("customScreenChattBox").style.display = "block"
      document.getElementById("chatt-box-2").innerHTML = ``
      yeeen = document.getElementById("another-bottom-content-box");

      yeeen.scroll(0, yeeen.scrollHeight);
              document.getElementById("second_message_div").value = null;

      groupUsersArr = userData.users;
   


      document.querySelector(".rightUperRight").style.height = "60px";
      // document.querySelector(".rightBox").style.display = "block";
      document.querySelector(".groupContainer").style.display = "none";
      document.querySelector(".rightUperRight").innerHTML = "";
      document.querySelector(".rightUpperBox").style.display = "none";
      // document.querySelector(".chatMessageContent").style.display = "block";
      // document.querySelector(".chatControlBtn").style.display = "block";
      document.getElementById("sendMsgBtn").style.display = "none";
      // document.getElementById("sendGroupMsgBtn").style.display = "block";
      document.getElementById("sendSubGroupMsgBtn").style.display = "none";
      document.querySelector(".rightProspectBox").style.display = "flex";

      document.querySelector(".chatMessageContent").style.height = "225px";

      let chatMessageContent = document.querySelector(".chatMessageContent");
      chatMessageContent.innerHTML = "";

      document.getElementById("prospect_image_heading").src =
        userData.prospect_data.image;
      document
        .getElementById("prospectImage")
        .setAttribute("data-link", userData.prospect_data.profile_link);
      document.querySelector(".prospect_name_heading").innerText =
        userData.prospect_data.name;
        document.querySelector(".prospect_name_heading").style.marginTop ="0px"
        document.getElementById("group_name_division").style.display = "block"

      if (userData.prospect_data.company) {
        document.querySelector(
          ".desigination"
        ).innerText = `(${userData.prospect_data.company})`;
      }
      document.querySelector(".social-btn-box").innerHTML = ``
      document.querySelector(".social-btn-box").innerHTML = `
      <button data-url=${userData.prospect_data.profile_link} data-title="View LinkedIn Profile" class="opening_background_screen" style="
         border: 0;
         background: none;
         cursor:pointer;
         ">
                  <img class="new_class" style="width: 20px;
         height: 20px;
         object-fit: cover;
         border-radius: 50%;" src="./Assets/img/open_prospect.svg">
                </button>
                <a href="#modal-12" data-title="View Prospect" data-prospect-id=${userData.prospect_data.id} data-id=${userData.actuals_id} data-url=${userData.prospect_data.profile_link}
                  class="opening_clipper_screen" style="
         border: 0;
         background: none;
         cursor:pointer;
         ">
                  <img class="new_class" style="width: 20px;
         height: 20px;
         object-fit: cover;
         border-radius: 50%;" src="./Assets/img/open_background.svg">
                </a>
      `
      document.querySelectorAll(".opening_clipper_screen").forEach((ele) => {
        ele.addEventListener("click", (e) => {

          var profile_link = e.currentTarget.getAttribute("data-url");
          var user_id = e.currentTarget.getAttribute("data-id");
          var prospect_id = e.currentTarget.getAttribute("data-prospect-id");
          var sending_id = localStorage.getItem("user_id");
          const url = `${globalURl}/get_prospect_Data`;

            let xhr = new XMLHttpRequest();

            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(
              JSON.stringify({
                prospect_id,
                user_id: sending_id,
              })
            );

            xhr.onreadystatechange = function () {
              if (xhr.readyState == 4 && xhr.status == 200) {
                let userData = JSON.parse(xhr.responseText);

                if (userData.data) {
                  if(userData.data.prospect_status == "no"){
                    document.getElementById("send_CRM").style.display = "none";
                  }
                  else{
                    document.getElementById("send_CRM").style.display = "block";
                    document.getElementById("prospect_status_image").value = userData.data.prospect_status_image;
                    document.getElementById("prospect_status_name").value = userData.data.prospect_status_name;;
                    document.getElementById("temporary_sender").value = userData.data.user_id;
                    user_id = userData.data.user_id
                  }
                  
                  document.querySelector(".prospect_name_heading_comment").innerText = userData.data.name
                  document.getElementById("prospect_image_heading_comment").src = userData.data.image
                  document.querySelector(".desigination_comment").innerText = `${userData.data.description.length > 30 ? `${userData.data.description.slice(0,30)}....` : `${userData.data.description}`}`;
                  document.querySelector(".prospect_group_name_comment").innerText = userData.data.company
                  document.querySelector(".prospect_subgroup_name_comment").innerText = userData.data.address
                  document.querySelector(".prospect_subgroup_status_comment").innerText = userData.data.status
                  document.querySelector(".notes_comment").innerText = `${userData.data.notes == null ? `Notes not added` : `${userData.data.notes}`}`  
                }
                  
                
              }
            }






localStorage.setItem("commentID", JSON.stringify(commentArray));
document.querySelector(".taggedUser").innerHTML = "";
document.getElementById("comment_box").value = "";
document.getElementById("temporary_prospect_id").value = prospect_id;
document.getElementById("temporary_url").value = profile_link;


var access_token = localStorage.getItem("access_token");
var username = localStorage.getItem("username");

if (access_token && username) {
document.getElementById("comment_box").disabled = false;

setTimeout(() => {
  const url = `${globalURl}/getComments`;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      profile_link: profile_link,
      secondary_id: user_id,
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


          


                        

          
        });
      });

      document.querySelectorAll(".opening_background_screen").forEach((ele) => {
        ele.addEventListener("click", (e) => {
          let currentMessage = e.currentTarget
          let message_id = currentMessage.getAttribute("data-url");
          let params = {
            active: true,
            currentWindow: true,
          };
          chrome.tabs.query(params, gotTab);
  
          function gotTab(tabs) {
            let msg = {
              txt: message_id,
            };
            chrome.tabs.sendMessage(tabs[0].id, msg);
          }
          console.log("background")
        });
      });

      document.getElementById("chatt-box-2").scroll(0,document.getElementById("chatt-box-2").scrollHeight);




      document.getElementById("descriptionName").innerText =
        userData.prospect_data.description.slice(0, 45) + "...";
      document.querySelector(
        ".prospect_group_name"
      ).innerText = `${userData.group_name.length > 30
        ? `${userData.group_name.slice(0,30)} ...`
        : userData.group_name
      }`;
      if(sub_group_id != null){
        document.getElementById("prospect_subgroup_name").style.display = "block"
        document.querySelector(
          ".prospect_subgroup_name"
        ).innerText = `${userData.sub_group_name.length > 10
          ? `${userData.sub_group_name.slice()} ...`
          : userData.sub_group_name
        }`;
      }
      else{
        document.getElementById("prospect_subgroup_name").style.display = "none"

      }
      if(!userData.sub_group_name){
      document.getElementById("Conversations_button").innerText = `${userData.group_name.length > 10
        ? `${userData.group_name.slice(0, 10)} ...`
        : userData.group_name
      }`;
     }else{
      document.getElementById("Conversations_button").innerText = userData.group_name.slice(0,5) + ` > ` + userData.sub_group_name.slice(0,5);
     }
     document.getElementById("Conversations_button").style.display = "block"
      document.getElementById("for_clipper").style.display = "block"
      document.querySelector(".desigination").style.display = "block"

      document.getElementById("for_clipper").innerHTML = `Clipper <span class="nameCliper" style="color: #ff0000">${userData.sender_name}</span>
        `;
      if(userData.database){
        document.getElementById("for_DB").style.display = "block"

      document.getElementById("for_DB").innerHTML = `Database <span class="nameCliper" style="color: #ff0000">${userData.database}</span>
        `;
      }
      localStorage.setItem("isProspectCollabClicked1", true);
      localStorage.setItem(
        "prospectCollabData1",
        JSON.stringify(userData.prospect_data)
      );
      localStorage.setItem("prospect_id1", userData.prospect_data.id);
      localStorage.setItem("prospect_id", userData.prospect_data.id);

      if (userData.group_name) {
        localStorage.setItem("group_name", userData.group_name);
      }

      if (userData.admin == true) {
        document.getElementById("deleteBox").style.display = "flex";
      } else {
        document.getElementById("deleteBox").style.display = "none";
      }

      document.querySelector(".showBtnContainer").innerHTML = "";
      document.querySelector(".showBtnContainer").innerHTML = `
      <button id="showMembers">Members</button>
      <button id="showDirectBox">Group Chat</button>
      `;
     

      if (userData.data) {
        temp = "0"
        counting_days = 1
        userData.data.map((ele, i) => {
          if (ele.text != null) {
            if(ele.text != null){
              let dbTime = ele.created_at;
    
              let newDate = new Date();
              var ajjtareekh
              if( (newDate.getUTCMonth()+1) < 10 && newDate.getUTCDate() < 10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+'0'+newDate.getUTCDate();
              }
              else if( (newDate.getUTCMonth()+1) < 10 &&  newDate.getUTCDate() >=10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+newDate.getUTCDate();
              }
              else if( (newDate.getUTCMonth()+1) >= 10 &&  newDate.getUTCDate() < 10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+'0'+newDate.getUTCDate();
              }
              else{
                ajjtareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+newDate.getUTCDate();
              }

              var kalltareekh
              if( (newDate.getUTCMonth()+1) < 10 && (newDate.getUTCDate()-1) < 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+'0'+(newDate.getUTCDate()-1);
              }
              if( (newDate.getUTCMonth()+1) < 10 && (newDate.getUTCDate()-1) >= 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+(newDate.getUTCDate()-1);
              }
              if( (newDate.getUTCMonth()+1) >= 10 && (newDate.getUTCDate()-1) < 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+'0'+(newDate.getUTCDate()-1);
              }
              else{
                kalltareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+(newDate.getUTCDate()-1);
              }
          myDate = dbTime.split(" ");
          console.log(ajjtareekh,"ajj")
          console.log(kalltareekh,"kall")
          console.log(myDate[0],"DB")
          console.log(temp,"temp")

          localStorage.removeItem("lastDate")
          if(temp == myDate[0]){
                counting_days = counting_days + 1;
          }
          else{
            if(ajjtareekh == myDate[0]){
              document.getElementById("chatt-box-2").innerHTML += `<div class="date-Wraper position-relative mb-3">
              <div class="all-date">Today</div>
              </div>`;
              counting_days = counting_days + 1
            }
            else if (kalltareekh == myDate[0]) {
              document.getElementById("chatt-box-2").innerHTML += `<div class="date-Wraper position-relative mb-3">
              <div class="all-date">Yesterday</div>
              </div>`;
              counting_days = counting_days + 1
            }
            else {
              document.getElementById("chatt-box-2").innerHTML += `<div class="date-Wraper position-relative mb-3">
                <div class="all-date">${myDate[0]}</div>
                </div>`;
                counting_days = counting_days + 1;
            }
            
            temp = myDate[0];

          }
          localStorage.setItem("lastDate",temp)
    
              let UTCDate = new Date(
                newDate.getUTCFullYear(),
                newDate.getUTCMonth(),
                newDate.getUTCDate(),
                newDate.getUTCHours(),
                newDate.getUTCMinutes(),
                newDate.getUTCSeconds(),
                newDate.getUTCMilliseconds()
              );
    
              let currentTime = Math.abs(
                (UTCDate.getTime() / 1000).toFixed(0)
              );
    
              let futureTime = Math.abs(
                (new Date(dbTime).getTime() / 1000).toFixed(0)
              );
    
              let TimeDifference = currentTime - futureTime;
    
              let days = Math.floor(TimeDifference / 86400);
    
              let hours = Math.floor(TimeDifference / 3600) % 24;
    
              let minutes = Math.floor(TimeDifference / 60) % 60;
    
              let seconds = Math.floor(TimeDifference % 60);
    
              let messageTimeString = "";
    
              if (days == 0) {
                if (hours == 0) {
                  if (minutes == 0) {
                    if (seconds == 0) {
                      messageTimeString = `less than a second ago`;
                    } else {
                      messageTimeString =
                        seconds == 1
                          ? `${seconds} second ago`
                          : `${seconds} seconds ago`;
                    }
                  } else {
                    messageTimeString =
                      minutes == 1
                        ? `${minutes} minute ago`
                        : `${minutes} minutes ago`;
                  }
                } else {
                  messageTimeString =
                    hours == 1
                      ? `${hours} hour ago`
                      : `${hours} hours ago`;
                }
              } else {
                messageTimeString =
                  days == 1 ? `${days} day ago` : `${days} days ago`;
              }
              let messageReplyTimeString = "";
    
              if(ele.reply_msg != null){
    
                let dbTime = ele.reply_created_at;
    
                let newDate = new Date();
      
                let UTCDate = new Date(
                  newDate.getUTCFullYear(),
                  newDate.getUTCMonth(),
                  newDate.getUTCDate(),
                  newDate.getUTCHours(),
                  newDate.getUTCMinutes(),
                  newDate.getUTCSeconds(),
                  newDate.getUTCMilliseconds()
                );
      
                let currentTime = Math.abs(
                  (UTCDate.getTime() / 1000).toFixed(0)
                );
      
                let futureTime = Math.abs(
                  (new Date(dbTime).getTime() / 1000).toFixed(0)
                );
      
                let TimeDifference = currentTime - futureTime;
      
                let days = Math.floor(TimeDifference / 86400);
      
                let hours = Math.floor(TimeDifference / 3600) % 24;
      
                let minutes = Math.floor(TimeDifference / 60) % 60;
      
                let seconds = Math.floor(TimeDifference % 60);
      
      
                if (days == 0) {
                  if (hours == 0) {
                    if (minutes == 0) {
                      if (seconds == 0) {
                        messageReplyTimeString = `less than a second ago`;
                      } else {
                        messageReplyTimeString =
                          seconds == 1
                            ? `${seconds} second ago`
                            : `${seconds} seconds ago`;
                      }
                    } else {
                      messageReplyTimeString =
                        minutes == 1
                          ? `${minutes} minute ago`
                          : `${minutes} minutes ago`;
                    }
                  } else {
                    messageReplyTimeString =
                      hours == 1
                        ? `${hours} hour ago`
                        : `${hours} hours ago`;
                  }
                } else {
                  messageReplyTimeString =
                    days == 1 ? `${days} day ago` : `${days} days ago`;
                }
    
                console.log('reply_msg',messageReplyTimeString)
    
    
              }
    
    
              document.getElementById("chatt-box-2").innerHTML += `
    
              <div class="card my-2 rounded">
              <div class="card-body p-2 px-2 d-flex justify-content-between align-items-center">
                <div class="row " style='width:365px'>
                  <div class="img-p">
                    <img src="${ele.image}" alt="" class="img-fluid rounded-circle">
                  </div>
                  <div class="card-left-content-box">
                    <div class="font-weight-bold name-top" style="font-size: 12px">
                    ${ele.username}
                      <span class="time" style="
                          padding-left: 15px;
                          font-size: 8px;
                          line-height: 10px;
                          color: #636363;
                          font-weight: 400;
                        ">${messageTimeString}</span>
                    </div>
                    <div class="msg-box-chat">${ele.text}</div>
                    <span class="updating_text" style="display:none">${ele.text}</span>
    
                  </div>
                </div>
                <button class="border-0 bg-transparent f-10 pointer position-absolute dropdown-btn" style="top: 8px; right: 8px">
                        <i class="fas fa-ellipsis-v"></i>
                        <div class="dropdown-list">
                        <span data-replied_id=${ele.id} class="prospect_message_edit_button">Edit</span>
                        <span  data-replied_id=${ele.id} class="prospect_message_delete_button">Delete</span>
                        <span class="prospect_updating_text" style="display:none">${ele.text}</span>
                        </div>
                        </button>
              </div>


              ${
                ele.reply_msg ? 
                
                `<div class="card card-child" style="background-color: #e6edfa;
                width: calc(74% + 56px);
                border-radius: 0;
                transform: translate(36px, -8px);">
                <div class="card-body p-0 m-0">
                  <div class="d-flex w-100" style="margin-left:20px">
                    <div class="img-p">
                      <img src="${ele.reply_image}" alt="" class="img-fluid rounded-circle" />
                    </div>
                    <div class="card-left-content-box bg-transparent" style="width: 135px">
                      <div class="font-weight-bold name-top" style="font-size: 10px">
                        ${ele.reply_username}
                        <span class="time" style="
                              padding-left: 8px;
                              font-size: 6px;
                              line-height: 8px;
                              color: #636363;
                              font-weight: 400;
                            ">${messageReplyTimeString}</span>
                      </div>
                      <div class="msg-box-chat" style="font-size: 7px">
                        ${ele.reply_msg}
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
              :
              ""
              }
    
              <div data-replied-id=${ele.id} class="reply-box_">⤣ Reply</div>
             </div>
    
    
    
    
    
              `
    
              document.querySelectorAll(".reply-box_").forEach((ele) => {
                ele.addEventListener("click", (e) => {
                  // dynamicModalClose();
                  // showNullChats();
                  localStorage.removeItem("edit_id");
              document.getElementById("second_message_div").value = null;
              document.getElementById("second_send_message_button").style.display = "block";
              document.getElementById("second_update_message_button").style.display = "none";
              document.getElementById("second_cancel_message_button").style.display = "none";
                  let currentMessage = e.currentTarget
                  console.log(currentMessage);
                  let message_id = currentMessage.getAttribute("data-replied-id");
                  console.log(message_id);
                  localStorage.setItem("replied_id", message_id)
    
                  document.querySelector(".prospect_edit-text-msg-box").style.display = "block"
                  // document.getElementById("update_message_button").style.display = "block"
                  // document.getElementById("cancel_message_button").style.display = "block"
    
                  currentMessage = e.currentTarget.parentElement
                  console.log(currentMessage);
                  let message = currentMessage.querySelector(".prospect_updating_text").innerHTML;
                  console.log(message);
                   let name = currentMessage.querySelector(".font-weight-bold").innerText
                  // currentMessage = e.currentTarget.parentElement
    
    
                  document.querySelector(".prospect_name-edit-box").innerText = name
                  document.querySelector(".prospect_msg").innerHTML = message
    
                  // document.getElementById("send_message_div").value = message
    
                  console.log("Reply")
                });
              });
    
    
    
              document.querySelectorAll(".prospect_message_edit_button").forEach((ele) => {
                ele.addEventListener("click", (e) => {
                  // dynamicModalClose();
                  // showNullChats();
                  document.querySelector(".prospect_edit-text-msg-box").style.display ="none";
                  localStorage.removeItem("replied_id");
                  let currentMessage = e.currentTarget
                  console.log(currentMessage);
                  let message_id = currentMessage.getAttribute("data-replied_id");
                  console.log(message_id);
                  localStorage.setItem("edit_id", message_id)
    
                  document.getElementById("second_send_message_button").style.display = "none"
                  document.getElementById("second_update_message_button").style.display = "block"
                  document.getElementById("second_cancel_message_button").style.display = "block"
    
                  currentMessage = e.currentTarget.parentElement
                  console.log(currentMessage);
                  let message = currentMessage.querySelector(".prospect_updating_text").innerHTML;
                  console.log(message);
    
                  document.getElementById("second_message_div").value = message
    
                  console.log("edit")
                });
              });
    
    
    
              document.querySelectorAll(".prospect_message_delete_button").forEach((ele) => {
                ele.addEventListener("click", (e) => {
                  // dynamicModalClose();
                  // showNullChats();
                  let currentMessage = e.currentTarget
                  console.log(currentMessage);
                  let message_id = currentMessage.getAttribute("data-replied_id");
                  console.log(message_id);
    
                  MessageDeleteModal.style.transform = "scale(1)";
                  MessageDeleteModal.style.opacity = 1;
                  document.getElementById("temporary_buttons").innerHTML = `
                  <button id="closeIt" class="btn btn-light-new">Cancel</button>
                  <button data-replied_id=${message_id} id="confirmation_delete" class="btn btn-danger-new">Delete</button>
                  `
                  if (document.getElementById("closeIt")) {
                    document
                      .getElementById("closeIt")
                      .addEventListener("click", closeSubGroupModal);
                  }
                  document.getElementById("confirmation_delete").addEventListener("click", () => {
                    deleteGroupMessage();
                  });
                  console.log("delete")
                });
              });
            }
          }
        });

        setTimeout(() => {
          document
            .getElementById("showMembers")
            .addEventListener("click", dynamicModalOpenM);
          document.getElementById("showprospectBox").addEventListener("click", () => {
            dynamicModal.style.transform = "scale(1)";
            dynamicModal.style.opacity = 1;
          });
          document.getElementById("showprospectsanother").addEventListener("click", () => {
            dynamicModal.style.transform = "scale(1)";
            dynamicModal.style.opacity = 1;
          });
          document
            .getElementById("showDirectBox")
            .addEventListener("click", showNullChats);
        }, 100);
      }
      else{
        console.log("no Data")

        localStorage.removeItem("lastDate")
      }
      chatMessageContent = document.getElementById("bottom-content-box");

      chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
      chatMessageContent = document.getElementById("another-bottom-content-box");

      chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
    }

    else{
      document.getElementById("Conversations_button").style.display = "block"
      if(document.getElementById("Conversations_button").innerText == "Conversations"){
        document.getElementById("Conversations_button").innerText = document.querySelector(".prospect_name_heading").innerText
      }

      document.querySelector(".desigination").style.display = "block"
      document.getElementById("for_clipper").style.display = "block"
      document.getElementById("for_DB").style.display = "block"
      document.querySelector(".prospect_name_heading").style.marginTop ="0px"


      document.getElementById("customScreenChattBox").style.display = "block"
      document.getElementById("chatt-box-2").innerHTML = ``
      yeeen = document.getElementById("another-bottom-content-box");

      yeeen.scroll(0, yeeen.scrollHeight);
              document.getElementById("second_message_div").value = null;

      groupUsersArr = userData.users;

      document.querySelector(".rightUperRight").style.height = "60px";
      // document.querySelector(".rightBox").style.display = "block";
      document.querySelector(".groupContainer").style.display = "none";
      document.querySelector(".rightUperRight").innerHTML = "";
      document.querySelector(".rightUpperBox").style.display = "none";
      // document.querySelector(".chatMessageContent").style.display = "block";
      // document.querySelector(".chatControlBtn").style.display = "block";
      document.getElementById("sendMsgBtn").style.display = "none";
      // document.getElementById("sendGroupMsgBtn").style.display = "block";
      document.getElementById("sendSubGroupMsgBtn").style.display = "none";
      document.querySelector(".rightProspectBox").style.display = "flex";

      document.querySelector(".chatMessageContent").style.height = "225px";

      let chatMessageContent = document.querySelector(".chatMessageContent");
      chatMessageContent.innerHTML = "";

      document.getElementById("prospect_image_heading").src =
        userData.prospect_data.image;
      document
        .getElementById("prospectImage")
        .setAttribute("data-link", userData.prospect_data.profile_link);
      document.querySelector(".prospect_name_heading").innerText =
        userData.prospect_data.name;
        document.querySelector(".prospect_name_heading").style.marginTop ="0px"
        document.getElementById("group_name_division").style.display = "none"

      if (userData.prospect_data.company) {
        document.querySelector(
          ".desigination"
        ).innerText = `(${userData.prospect_data.company})`;
      }
      document.querySelector(".social-btn-box").innerHTML = ``
      document.querySelector(".social-btn-box").innerHTML = `
      <button data-url=${userData.prospect_data.profile_link} data-title="View LinkedIn Profile" class="opening_background_screen" style="
         border: 0;
         background: none;
         cursor:pointer;
         ">
                  <img class="new_class" style="width: 20px;
         height: 20px;
         object-fit: cover;
         border-radius: 50%;" src="./Assets/img/open_prospect.svg">
                </button>
                <a href="#modal-12" data-title="View Prospect" data-prospect-id=${userData.prospect_data.id} data-id=${userData.actuals_id} data-url=${userData.prospect_data.profile_link}
                  class="opening_clipper_screen" style="
         border: 0;
         background: none;
         cursor:pointer;
         ">
                  <img class="new_class" style="width: 20px;
         height: 20px;
         object-fit: cover;
         border-radius: 50%;" src="./Assets/img/open_background.svg">
                </a>
      `

      document.querySelectorAll(".opening_clipper_screen").forEach((ele) => {
        ele.addEventListener("click", (e) => {

                        var profile_link = e.currentTarget.getAttribute("data-url");
                        var user_id = e.currentTarget.getAttribute("data-id");
                        var prospect_id = e.currentTarget.getAttribute("data-prospect-id");
                        var sending_id = localStorage.getItem("user_id");

                        const url = `${globalURl}/get_prospect_Data`;

                          let xhr = new XMLHttpRequest();

                          xhr.open("POST", url, true);
                          xhr.setRequestHeader("Content-Type", "application/json");
                          xhr.send(
                            JSON.stringify({
                              prospect_id,
                              user_id: sending_id,
                            })
                          );

                          xhr.onreadystatechange = function () {
                            if (xhr.readyState == 4 && xhr.status == 200) {
                              let userData = JSON.parse(xhr.responseText);
                              if (userData.data) {
                                if(userData.data.prospect_status == "no"){
                                  document.getElementById("send_CRM").style.display = "none";
                                }
                                else{
                                  document.getElementById("send_CRM").style.display = "block";
                                  document.getElementById("prospect_status_image").value = userData.data.prospect_status_image;
                                  document.getElementById("prospect_status_name").value = userData.data.prospect_status_name;;
                                  document.getElementById("temporary_sender").value = userData.data.user_id;
                                  user_id = userData.data.user_id
                                }
                                document.querySelector(".prospect_name_heading_comment").innerText = userData.data.name
                                document.getElementById("prospect_image_heading_comment").src = userData.data.image
                                document.querySelector(".desigination_comment").innerText = `${userData.data.description.length > 30 ? `${userData.data.description.slice(0,30)}....` : `${userData.data.description}`}`;
                                document.querySelector(".prospect_group_name_comment").innerText = userData.data.company
                                document.querySelector(".prospect_subgroup_name_comment").innerText = userData.data.address
                                document.querySelector(".prospect_subgroup_status_comment").innerText = userData.data.status
                                document.querySelector(".notes_comment").innerText = `${userData.data.notes == null ? `Notes not added` : `${userData.data.notes}`}`  
                              }
                                
                              
                            }
                          }
          

          



          localStorage.setItem("commentID", JSON.stringify(commentArray));
            document.querySelector(".taggedUser").innerHTML = "";
            document.getElementById("comment_box").value = "";
            document.getElementById("temporary_url").value = profile_link;
            document.getElementById("temporary_prospect_id").value = prospect_id;



            var access_token = localStorage.getItem("access_token");
            var username = localStorage.getItem("username");

            if (access_token && username) {
              document.getElementById("comment_box").disabled = false;

              setTimeout(() => {
                const url = `${globalURl}/getComments`;

                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(
                  JSON.stringify({
                    profile_link: profile_link,
                    secondary_id: user_id,
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


                        

          
        });
      });

      document.querySelectorAll(".opening_background_screen").forEach((ele) => {
        ele.addEventListener("click", (e) => {
          let currentMessage = e.currentTarget
          let message_id = currentMessage.getAttribute("data-url");
          let params = {
            active: true,
            currentWindow: true,
          };
          chrome.tabs.query(params, gotTab);
  
          function gotTab(tabs) {
            let msg = {
              txt: message_id,
            };
            chrome.tabs.sendMessage(tabs[0].id, msg);
          }
          console.log("background")
        });
      });
      
      
      document.querySelector(".desigination").style.display = "block"
      if(userData.sender_name){
        document.getElementById("for_clipper").style.display = "block"
        document.getElementById("for_clipper").innerHTML = `Clipper <span class="nameCliper" style="color: #ff0000">${userData.sender_name}</span>
        `;
      }
      
      if(userData.database){
        document.getElementById("for_DB").style.display = "block"

      document.getElementById("for_DB").innerHTML = `Database <span class="nameCliper" style="color: #ff0000">${userData.database}</span>
        `;
      }
      localStorage.setItem("isProspectCollabClicked1", true);
      localStorage.setItem(
        "prospectCollabData1",
        JSON.stringify(userData.prospect_data)
      );
      localStorage.setItem("prospect_id1", userData.prospect_data.id);
      localStorage.setItem("prospect_id", userData.prospect_data.id);

      if (userData.group_name) {
        localStorage.setItem("group_name", userData.group_name);
      }

      if (userData.admin == true) {
        document.getElementById("deleteBox").style.display = "flex";
      } else {
        document.getElementById("deleteBox").style.display = "none";
      }

      document.querySelector(".showBtnContainer").innerHTML = "";
      document.querySelector(".showBtnContainer").innerHTML = `
      <button id="showMembers">Members</button>
      <button id="showDirectBox">Group Chat</button>
      `;
     

      if (userData.data.length > 0) {
        console.log("yes data")

        var temp
      var counting_days = 1
        userData.data.map((ele, i) => {
          if (ele.text != null) {
            if(ele.text != null){
              let dbTime = ele.created_at;
    
              let newDate = new Date();
              var ajjtareekh
              if( (newDate.getUTCMonth()+1) < 10 && newDate.getUTCDate() < 10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+'0'+newDate.getUTCDate();
              }
              else if( (newDate.getUTCMonth()+1) < 10 &&  newDate.getUTCDate() >=10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+newDate.getUTCDate();
              }
              else if( (newDate.getUTCMonth()+1) >= 10 &&  newDate.getUTCDate() < 10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+'0'+newDate.getUTCDate();
              }
              else{
                ajjtareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+newDate.getUTCDate();
              }

              var kalltareekh
              if( (newDate.getUTCMonth()+1) < 10 && (newDate.getUTCDate()-1) < 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+'0'+(newDate.getUTCDate()-1);
              }
              if( (newDate.getUTCMonth()+1) < 10 && (newDate.getUTCDate()-1) >= 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+(newDate.getUTCDate()-1);
              }
              if( (newDate.getUTCMonth()+1) >= 10 && (newDate.getUTCDate()-1) < 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+'0'+(newDate.getUTCDate()-1);
              }
              else{
                kalltareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+(newDate.getUTCDate()-1);
              }
          myDate = dbTime.split(" ");
          console.log(ajjtareekh,"ajj")
          console.log(kalltareekh,"kall")
          console.log(myDate[0],"DB")
          console.log(temp,"temp")

          localStorage.removeItem("lastDate")
          if(temp == myDate[0]){
                counting_days = counting_days + 1;
          }
          else{
            if(ajjtareekh == myDate[0]){
              document.getElementById("chatt-box-2").innerHTML += `<div class="date-Wraper position-relative mb-3">
              <div class="all-date">Today</div>
              </div>`;
              counting_days = counting_days + 1
            }
            else if (kalltareekh == myDate[0]) {
              document.getElementById("chatt-box-2").innerHTML += `<div class="date-Wraper position-relative mb-3">
              <div class="all-date">Yesterday</div>
              </div>`;
              counting_days = counting_days + 1
            }
            else {
              document.getElementById("chatt-box-2").innerHTML += `<div class="date-Wraper position-relative mb-3">
                <div class="all-date">${myDate[0]}</div>
                </div>`;
                counting_days = counting_days + 1;
            }
            
            temp = myDate[0];

          }
          localStorage.setItem("lastDate",temp)
    
              let UTCDate = new Date(
                newDate.getUTCFullYear(),
                newDate.getUTCMonth(),
                newDate.getUTCDate(),
                newDate.getUTCHours(),
                newDate.getUTCMinutes(),
                newDate.getUTCSeconds(),
                newDate.getUTCMilliseconds()
              );
    
              let currentTime = Math.abs(
                (UTCDate.getTime() / 1000).toFixed(0)
              );
    
              let futureTime = Math.abs(
                (new Date(dbTime).getTime() / 1000).toFixed(0)
              );
    
              let TimeDifference = currentTime - futureTime;
    
              let days = Math.floor(TimeDifference / 86400);
    
              let hours = Math.floor(TimeDifference / 3600) % 24;
    
              let minutes = Math.floor(TimeDifference / 60) % 60;
    
              let seconds = Math.floor(TimeDifference % 60);
    
              let messageTimeString = "";
    
              if (days == 0) {
                if (hours == 0) {
                  if (minutes == 0) {
                    if (seconds == 0) {
                      messageTimeString = `less than a second ago`;
                    } else {
                      messageTimeString =
                        seconds == 1
                          ? `${seconds} second ago`
                          : `${seconds} seconds ago`;
                    }
                  } else {
                    messageTimeString =
                      minutes == 1
                        ? `${minutes} minute ago`
                        : `${minutes} minutes ago`;
                  }
                } else {
                  messageTimeString =
                    hours == 1
                      ? `${hours} hour ago`
                      : `${hours} hours ago`;
                }
              } else {
                messageTimeString =
                  days == 1 ? `${days} day ago` : `${days} days ago`;
              }
              let messageReplyTimeString = "";
    
              if(ele.reply_msg != null){
    
                let dbTime = ele.reply_created_at;
    
                let newDate = new Date();
      
                let UTCDate = new Date(
                  newDate.getUTCFullYear(),
                  newDate.getUTCMonth(),
                  newDate.getUTCDate(),
                  newDate.getUTCHours(),
                  newDate.getUTCMinutes(),
                  newDate.getUTCSeconds(),
                  newDate.getUTCMilliseconds()
                );
      
                let currentTime = Math.abs(
                  (UTCDate.getTime() / 1000).toFixed(0)
                );
      
                let futureTime = Math.abs(
                  (new Date(dbTime).getTime() / 1000).toFixed(0)
                );
      
                let TimeDifference = currentTime - futureTime;
      
                let days = Math.floor(TimeDifference / 86400);
      
                let hours = Math.floor(TimeDifference / 3600) % 24;
      
                let minutes = Math.floor(TimeDifference / 60) % 60;
      
                let seconds = Math.floor(TimeDifference % 60);
      
      
                if (days == 0) {
                  if (hours == 0) {
                    if (minutes == 0) {
                      if (seconds == 0) {
                        messageReplyTimeString = `less than a second ago`;
                      } else {
                        messageReplyTimeString =
                          seconds == 1
                            ? `${seconds} second ago`
                            : `${seconds} seconds ago`;
                      }
                    } else {
                      messageReplyTimeString =
                        minutes == 1
                          ? `${minutes} minute ago`
                          : `${minutes} minutes ago`;
                    }
                  } else {
                    messageReplyTimeString =
                      hours == 1
                        ? `${hours} hour ago`
                        : `${hours} hours ago`;
                  }
                } else {
                  messageReplyTimeString =
                    days == 1 ? `${days} day ago` : `${days} days ago`;
                }
    
                console.log('reply_msg',messageReplyTimeString)
    
    
              }
    
    
              document.getElementById("chatt-box-2").innerHTML += `
    
              <div class="card my-2 rounded">
              <div class="card-body p-2 px-2 d-flex justify-content-between align-items-center">
                <div class="row " style='width:365px'>
                  <div class="img-p">
                    <img src="${ele.sender_image}" alt="" class="img-fluid rounded-circle">
                  </div>
                  <div class="card-left-content-box">
                    <div class="font-weight-bold name-top" style="font-size: 12px">
                    ${ele.sender_name}
                      <span class="time" style="
                          padding-left: 15px;
                          font-size: 8px;
                          line-height: 10px;
                          color: #636363;
                          font-weight: 400;
                        ">${messageTimeString}</span>
                    </div>
                    <div class="msg-box-chat">${ele.text}</div>
                    <span class="updating_text" style="display:none">${ele.text}</span>
    
                  </div>
                </div>
                <button class="border-0 bg-transparent f-10 pointer position-absolute dropdown-btn" style="top: 8px; right: 8px">
                        <i class="fas fa-ellipsis-v"></i>
                        <div class="dropdown-list">
                        <span data-replied_id=${ele.id} class="Dmsprospect_message_edit_button">Edit</span>
                        <span  data-replied_id=${ele.id} class="Dmsprospect_message_delete_button">Delete</span>
                        <span class="prospect_updating_text" style="display:none">${ele.text}</span>
                        </div>
                        </button>
              </div>


              ${
                ele.reply_msg ? 
                
                `<div class="card card-child" style="background-color: #e6edfa;
                width: calc(74% + 56px);
                border-radius: 0;
                transform: translate(36px, -8px);">
                <div class="card-body p-0 m-0">
                  <div class="d-flex w-100" style="margin-left:20px">
                    <div class="img-p">
                      <img src="${ele.reply_image}" alt="" class="img-fluid rounded-circle" />
                    </div>
                    <div class="card-left-content-box bg-transparent" style="width: 135px">
                      <div class="font-weight-bold name-top" style="font-size: 10px">
                        ${ele.reply_username}
                        <span class="time" style="
                              padding-left: 8px;
                              font-size: 6px;
                              line-height: 8px;
                              color: #636363;
                              font-weight: 400;
                            ">${messageReplyTimeString}</span>
                      </div>
                      <div class="msg-box-chat" style="font-size: 7px">
                        ${ele.reply_msg}
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
              :
              ""
              }
    
              <div data-replied-id=${ele.id} class="reply-box_">⤣ Reply</div>
             </div>
    
    
    
    
    
              `
    
              document.querySelectorAll(".reply-box_").forEach((ele) => {
                ele.addEventListener("click", (e) => {
                  // dynamicModalClose();
                  // showNullChats();
                  localStorage.removeItem("edit_id")
                    document.getElementById("second_message_div").value = null;
                    document.getElementById("second_update_message_button").style.display = "none";
                    document.getElementById("second_send_message_button").style.display = "block";
                    document.getElementById("second_cancel_message_button").style.display = "none";
                  let currentMessage = e.currentTarget
                  console.log(currentMessage);
                  let message_id = currentMessage.getAttribute("data-replied-id");
                  console.log(message_id);
                  localStorage.setItem("replied_id", message_id)
    
                  document.querySelector(".prospect_edit-text-msg-box").style.display = "block"
                  // document.getElementById("update_message_button").style.display = "block"
                  // document.getElementById("cancel_message_button").style.display = "block"
    
                  currentMessage = e.currentTarget.parentElement
                  console.log(currentMessage);
                  let message = currentMessage.querySelector(".prospect_updating_text").innerHTML;
                  console.log(message);
                   let name = currentMessage.querySelector(".font-weight-bold").innerText
                  // currentMessage = e.currentTarget.parentElement
    
    
                  document.querySelector(".prospect_name-edit-box").innerText = name
                  document.querySelector(".prospect_msg").innerHTML = message
    
                  // document.getElementById("send_message_div").value = message
    
                  console.log("Reply")
                });
              });

              document.querySelectorAll(".Dmsprospect_message_edit_button").forEach((ele) => {
                ele.addEventListener("click", (e) => {
                  // dynamicModalClose();
                  // showNullChats();
                  document.querySelector(".prospect_edit-text-msg-box").style.display ="none";
                  localStorage.removeItem("replied_id");
                  let currentMessage = e.currentTarget
                  console.log(currentMessage);
                  let message_id = currentMessage.getAttribute("data-replied_id");
                  console.log(message_id);
                  localStorage.setItem("edit_id", message_id)
    
                  document.getElementById("second_send_message_button").style.display = "none"
                  document.getElementById("second_update_message_button").style.display = "block"
                  document.getElementById("second_cancel_message_button").style.display = "block"
    
                  currentMessage = e.currentTarget.parentElement
                  console.log(currentMessage);
                  let message = currentMessage.querySelector(".prospect_updating_text").innerHTML;
                  console.log(message);
    
                  document.getElementById("second_message_div").value = message
    
                  console.log("edit")
                });
              });
              document.querySelectorAll(".Dmsprospect_message_delete_button").forEach((ele) => {
                ele.addEventListener("click", (e) => {
                  // dynamicModalClose();
                  // showNullChats();
                  let currentMessage = e.currentTarget
                  console.log(currentMessage);
                  let message_id = currentMessage.getAttribute("data-replied_id");
                  console.log(message_id);
    
                  MessageDeleteModal.style.transform = "scale(1)";
                  MessageDeleteModal.style.opacity = 1;
                  document.getElementById("temporary_buttons").innerHTML = `
                  <button id="closeIt" class="btn btn-light-new">Cancel</button>
                  <button data-replied_id=${message_id} id="confirmation_delete" class="btn btn-danger-new">Delete</button>
                  `
                  if (document.getElementById("closeIt")) {
                    document
                      .getElementById("closeIt")
                      .addEventListener("click", closeSubGroupModal);
                  }
                  document.getElementById("confirmation_delete").addEventListener("click", () => {
                    deleteDmsMessage();
                  });
                  console.log("delete")
                });
              });
            }
          }
        });

        setTimeout(() => {
          document
            .getElementById("showMembers")
            .addEventListener("click", dynamicModalOpenM);
          document.getElementById("showprospectBox").addEventListener("click", () => {
            dynamicModal.style.transform = "scale(1)";
            dynamicModal.style.opacity = 1;
          });
          document.getElementById("showprospectsanother").addEventListener("click", () => {
            dynamicModal.style.transform = "scale(1)";
            dynamicModal.style.opacity = 1;
          });
          document
            .getElementById("showDirectBox")
            .addEventListener("click", showNullChats);
        }, 100);
      }
      else{
        console.log("no data")
        localStorage.removeItem("lastDate")
      }

      chatMessageContent = document.getElementById("bottom-content-box");

              chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
              chatMessageContent = document.getElementById("another-bottom-content-box");

              chatMessageContent.scroll(0, chatMessageContent.scrollHeight);



    }
      
      
    }
  };
}



if (document.querySelector(".general_div")) {
  document.querySelector(".general_div").addEventListener("click", () => {
    console.log('here');
    dynamicModalOpenP()
  });
}



if (document.getElementById("DMBox")) {
  document.getElementById("DMBox").addEventListener("click", () => {
    if (localStorage.getItem("sub_group_id")) {
      nullSubGroupChats();
    } else {
      showNullChats();
    }
  });
}

function openGroupThreeDotMenu(e) {
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
    .addEventListener("click", editGroupMessage);
  currentMenuBox
    .querySelector(".deleteContainer")
    .addEventListener("click", deleteGroupMessage);
}

function editGroupMessage(e) {
  document.querySelectorAll(".menuBox").forEach((ele) => {
    ele.style.display = "none";
  });

  let currentMessage = e.currentTarget.parentElement.parentElement;

  let message_id = currentMessage
    .querySelector(".messageTxt")
    .getAttribute("data-replied_id");
  let messageText = currentMessage.querySelector(".messageTxt").innerText;

  localStorage.setItem("message_id", message_id);

  document.getElementById("msgInp").value = messageText;

  document.getElementById("sendGroupMsgBtn").style.display = "none";
  document.getElementById("updateGroupMsgBtn").style.display = "block";
  document.getElementById("cancelGroupMsgBtn").style.display = "block";
}

document.getElementById("cancelGroupMsgBtn").addEventListener("click", () => {
  document.getElementById("sendGroupMsgBtn").style.display = "block";
  document.getElementById("updateGroupMsgBtn").style.display = "none";
  document.getElementById("cancelGroupMsgBtn").style.display = "none";
  document.getElementById("msgInp").value = "";
  localStorage.removeItem("message_id");
});

document
  .getElementById("updateGroupMsgBtn")
  .addEventListener("click", sendGroupMessage);

function deleteGroupMessage(e) {
  // document.querySelectorAll(".menuBox").forEach((ele) => {
  //   ele.style.display = "none";
  // });
  localStorage.removeItem("edit_id")
  document.getElementById("send_message_div").value = null
  document.getElementById("send_message_button").style.display = 'block'
  document.getElementById("update_message_button").style.display = 'none'
  document.getElementById("cancel_message_button").style.display = 'none'

  let message_id = document.getElementById("confirmation_delete").getAttribute("data-replied_id");
  var subgroup_id = localStorage.getItem("subgroup_id")
  const url = `${globalURl}/delete_single_group_chat/${message_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.status == "Deleted") {
        var user_id = localStorage.getItem("user_id");
        var group_id = localStorage.getItem("group_id");

        let url = "";
  prospect_id = localStorage.getItem("prospect_id")
  if(prospect_id){
  MessageDeleteModal.style.transform = "scale(0)";
                  MessageDeleteModal.style.opacity = 0;
  showProspectChat()
  }else{
  if(subgroup_id){
    url = `${globalURl}/get_sub_group_messages/${group_id}/${subgroup_id}/${user_id}`;
  
    
  
    
  }else{
    url = `${globalURl}/null_chats/${group_id}/${user_id}`;
    
  
  }

}


        let xhr = new XMLHttpRequest();

        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();

        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
            let userData = JSON.parse(xhr.responseText);

            document.querySelector(".edit-text-msg-box").style.display ="none";
            localStorage.removeItem("replied_id");
            document.getElementById("new_chat_box").innerHTML = ``
            if (userData.data) {
              

              var temp
              var counting_days = 1
              userData.data.map((obj, i) => {
                if (obj.text != null) {
                  let dbTime = obj.created_at;

                  let newDate = new Date();

                  var ajjtareekh
              if( (newDate.getUTCMonth()+1) < 10 && newDate.getUTCDate() < 10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+'0'+newDate.getUTCDate();
              }
              else if( (newDate.getUTCMonth()+1) < 10 &&  newDate.getUTCDate() >=10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+newDate.getUTCDate();
              }
              else if( (newDate.getUTCMonth()+1) >= 10 &&  newDate.getUTCDate() < 10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+'0'+newDate.getUTCDate();
              }
              else{
                ajjtareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+newDate.getUTCDate();
              }

              var kalltareekh
              if( (newDate.getUTCMonth()+1) < 10 && (newDate.getUTCDate()-1) < 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+'0'+(newDate.getUTCDate()-1);
              }
              if( (newDate.getUTCMonth()+1) < 10 && (newDate.getUTCDate()-1) >= 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+(newDate.getUTCDate()-1);
              }
              if( (newDate.getUTCMonth()+1) >= 10 && (newDate.getUTCDate()-1) < 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+'0'+(newDate.getUTCDate()-1);
              }
              else{
                kalltareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+(newDate.getUTCDate()-1);
              }
                  myDate = dbTime.split(" ");
                  console.log(ajjtareekh,"ajj")
                  console.log(kalltareekh,"kall")
                  console.log(myDate[0],"DB")
                  console.log(temp,"temp")
        
        
                  if(temp == myDate[0]){
                        counting_days = counting_days + 1;
                  }
                  else{
                    if(ajjtareekh == myDate[0]){
                      document.getElementById("new_chat_box").innerHTML += `<div class="date-Wraper position-relative mb-3">
                      <div class="today-date">Today</div>
                      </div>`;
                      counting_days = counting_days + 1
                    }
                    else if (kalltareekh == myDate[0]) {
                      document.getElementById("new_chat_box").innerHTML += `<div class="date-Wraper position-relative mb-3">
                      <div class="today-date">Yesterday</div>
                      </div>`;
                      counting_days = counting_days + 1
                    }
                    else {
                      document.getElementById("new_chat_box").innerHTML += `<div class="date-Wraper position-relative mb-3">
                        <div class="today-date">${myDate[0]}</div>
                        </div>`;
                        counting_days = counting_days + 1;
                    }
                    
                    temp = myDate[0];
        
                  }

                  let UTCDate = new Date(
                    newDate.getUTCFullYear(),
                    newDate.getUTCMonth(),
                    newDate.getUTCDate(),
                    newDate.getUTCHours(),
                    newDate.getUTCMinutes(),
                    newDate.getUTCSeconds(),
                    newDate.getUTCMilliseconds()
                  );

                  let currentTime = Math.abs(
                    (UTCDate.getTime() / 1000).toFixed(0)
                  );

                  let futureTime = Math.abs(
                    (new Date(dbTime).getTime() / 1000).toFixed(0)
                  );

                  let TimeDifference = currentTime - futureTime;

                  let days = Math.floor(TimeDifference / 86400);

                  let hours = Math.floor(TimeDifference / 3600) % 24;

                  let minutes = Math.floor(TimeDifference / 60) % 60;

                  let seconds = Math.floor(TimeDifference % 60);

                  let messageTimeString = "";

                  if (days == 0) {
                    if (hours == 0) {
                      if (minutes == 0) {
                        if (seconds == 0) {
                          messageTimeString = `less than a second ago`;
                        } else {
                          messageTimeString =
                            seconds == 1
                              ? `${seconds} second ago`
                              : `${seconds} seconds ago`;
                        }
                      } else {
                        messageTimeString =
                          minutes == 1
                            ? `${minutes} minute ago`
                            : `${minutes} minutes ago`;
                      }
                    } else {
                      messageTimeString =
                        hours == 1
                          ? `${hours} hour ago`
                          : `${hours} hours ago`;
                    }
                  } else {
                    messageTimeString =
                      days == 1 ? `${days} day ago` : `${days} days ago`;
                  }

                  // let row = ``;
                  // chatMessageContent.innerHTML += row;
                  let messageReplyTimeString = "";

                  if(obj.reply_msg != null){
        
                    let dbTime = obj.reply_created_at;
        
                    let newDate = new Date();
          
                    let UTCDate = new Date(
                      newDate.getUTCFullYear(),
                      newDate.getUTCMonth(),
                      newDate.getUTCDate(),
                      newDate.getUTCHours(),
                      newDate.getUTCMinutes(),
                      newDate.getUTCSeconds(),
                      newDate.getUTCMilliseconds()
                    );
          
                    let currentTime = Math.abs(
                      (UTCDate.getTime() / 1000).toFixed(0)
                    );
          
                    let futureTime = Math.abs(
                      (new Date(dbTime).getTime() / 1000).toFixed(0)
                    );
          
                    let TimeDifference = currentTime - futureTime;
          
                    let days = Math.floor(TimeDifference / 86400);
          
                    let hours = Math.floor(TimeDifference / 3600) % 24;
          
                    let minutes = Math.floor(TimeDifference / 60) % 60;
          
                    let seconds = Math.floor(TimeDifference % 60);
          
          
                    if (days == 0) {
                      if (hours == 0) {
                        if (minutes == 0) {
                          if (seconds == 0) {
                            messageReplyTimeString = `less than a second ago`;
                          } else {
                            messageReplyTimeString =
                              seconds == 1
                                ? `${seconds} second ago`
                                : `${seconds} seconds ago`;
                          }
                        } else {
                          messageReplyTimeString =
                            minutes == 1
                              ? `${minutes} minute ago`
                              : `${minutes} minutes ago`;
                        }
                      } else {
                        messageReplyTimeString =
                          hours == 1
                            ? `${hours} hour ago`
                            : `${hours} hours ago`;
                      }
                    } else {
                      messageReplyTimeString =
                        days == 1 ? `${days} day ago` : `${days} days ago`;
                    }
        
                    console.log('reply_msg',messageReplyTimeString)
        
        
                  }

                  document.getElementById("new_chat_box").innerHTML += `
                    <div class="card my-2 rounded">
                              <div
                                class="card-body p-2 px-2 d-flex justify-content-between align-items-center"
                              >
                                <div class="row">
                                  <div class="img-p">
                                    <img
                                      src="${obj.image}"
                                      alt=""
                                      class="img-fluid rounded-circle"
                                    />
                                  </div>
                                  <div class="card-left-content-box">
                                    <div
                                      class="font-weight-bold name-top"
                                      style="font-size: 12px"
                                    >
                                    <span class='nameIssue' title='${obj.username}'>
                          ${obj.username}
                          </span>
                                      <span
                                        class="time"
                                        style="
                                          padding-left: 15px;
                                          font-size: 8px;
                                          line-height: 10px;
                                          color: #636363;
                                          font-weight: 400;
                                        "
                                        >${messageTimeString}</span
                                      >
                                    </div>
                                    <div class="msg-box-chat">
                                    ${obj.text}
                                    </div>


                                    ${ obj.name ? `
                    
                                    <div class="prospects_shared_box" style="
             position: relative;
             ">
             <div class="row" style="
                align-items: center;
                justify-content: left;
                flex-wrap: nowrap;
                height: 36px;
                padding-bottom: 5px;
                ">
                <div class="" style="
                   margin: auto 6px auto 21px;
                   ">
                   <img src="${obj.prospect_image}" alt="profile-img">
                </div>
                <div class="">
                   <h3 class="title" style="
                      margin-bottom: 0;
                      font-size: 9px;
                      line-height: 10px;
                      font-weight: 800;
                      margin-top: 4px;
                      ">${obj.name.length > 12 ? `${obj.name.slice(0,12)}....` : `${obj.name}`}</h3>
                   <p class="desc" style="
                      width: 127px;
                      font-size: 10px;
                      ">${obj.description.length > 15 ? `${obj.description.slice(0,15)}....` : `${obj.description}`}</p>
                </div>
             </div>
             <div class="social-btn-box" style="
                position: absolute;
                top: -3px;
                right: 7px;
                ">
                ${obj.delete_status == 0 ?`<button data-id=${obj.temporary_id} data-title="View Prospect Chat"  class="opening_perspective" style="
                border: 0;
                background: none;
                cursor:pointer;
                ">
                <img class="new_class" style="width: 18px;
                height: 18px;
                object-fit: cover;
                border-radius: 50%;" src="./Assets/img/chat_redirect.png">
             </button>`: ``}
                
                <button data-url=${obj.url} data-title="View LinkedIn Profile" class="opening_background" style="
                   border: 0;
                   background: none;
                   cursor:pointer;
                   ">
                   <img class="new_class" style="width: 14px;
                   height: 14px;
                   object-fit: cover;
                   border-radius: 50%;" src="./Assets/img/open_prospect.svg">
                </button>                        
                <a href="#modal-12" data-title="View Prospect" data-prospect-id=${obj.temporary_id} data-id=${obj.sender_id} data-url=${obj.url} class="opening_clipper" style="
                   border: 0;
                   background: none;
                   cursor:pointer;
                   ">
                   <img class="new_class" style="width: 14px;
                   height: 14px;
                   object-fit: cover;
                   border-radius: 50%;" src="./Assets/img/open_background.svg">
                </a>
             </div>
          </div> ` : `` }        
                                  </div>
                                </div>
                                ${ obj.name ? `<span class="updating_text" style="display:none">${obj.text}</span>
                                <button
                      class="border-0 bg-transparent f-10 pointer position-absolute dropdown-btn"
                       style="top: 8px; right: 8px" >
                       <i class="fas fa-ellipsis-v"></i>
                       <div class='dropdown-list'>
                       <span data-replied_id=${obj.id} class="message_delete_button">Delete</span>
                       </div>
                       </button>
                                ` : `<button
                      class="border-0 bg-transparent f-10 pointer position-absolute dropdown-btn"
                       style="top: 8px; right: 8px" >
                       <i class="fas fa-ellipsis-v"></i>
                       <div class='dropdown-list'>
                       <span data-replied_id=${obj.id} class="message_edit_button">Edit</span>
                       <span data-replied_id=${obj.id} class="message_delete_button">Delete</span>
                       <span class="updating_text" style="display:none">${obj.text}</span>
                       </div>
                       </button>` }
                              </div>

                              ${
                                obj.reply_msg ? 
                                
                                `<div class="card card-child">
                                <div class="card-body p-0 m-0">
                                  <div class="d-flex w-100" style="justify-content: space-evenly">
                                    <div class="img-p">
                                      <img src="${obj.reply_image}" alt="" class="img-fluid rounded-circle" />
                                    </div>
                                    <div class="card-left-content-box bg-transparent" style="width: 135px">
                                      <div class="font-weight-bold name-top" style="font-size: 10px">
                                        ${obj.reply_username}
                                        <span class="time" style="
                                              padding-left: 8px;
                                              font-size: 6px;
                                              line-height: 8px;
                                              color: #636363;
                                              font-weight: 400;
                                            ">${messageReplyTimeString}</span>
                                      </div>
                                      <div class="msg-box-chat" style="font-size: 7px">
                                        ${obj.reply_msg}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>`
                              :
                              ""
                              }
                                
                              <div data-replied_id=${obj.id} class="reply-box">&#x2923; Reply</div>
                            </div>
                    `

                    
                    document.querySelectorAll(".opening_perspective").forEach((ele) => {
                      ele.addEventListener("click", (e) => {
                        let currentMessage = e.currentTarget
                        let message_id = currentMessage.getAttribute("data-id");
                        
                        localStorage.setItem("prospect_id",message_id);
                        showProspectChat();
                        
                        console.log("perspective")
                      });
                    });

                    document.querySelectorAll(".opening_clipper").forEach((ele) => {
                      ele.addEventListener("click", (e) => {
          
                                      var profile_link = e.currentTarget.getAttribute("data-url");
                                      var user_id = e.currentTarget.getAttribute("data-id");
                                      var prospect_id = e.currentTarget.getAttribute("data-prospect-id");
                                      var sending_id = localStorage.getItem("user_id");

                                      const url = `${globalURl}/get_prospect_Data`;
          
                                        let xhr = new XMLHttpRequest();
          
                                        xhr.open("POST", url, true);
                                        xhr.setRequestHeader("Content-Type", "application/json");
                                        xhr.send(
                                          JSON.stringify({
                                            prospect_id,
                                            user_id: sending_id,
                                          })
                                        );
          
                                        xhr.onreadystatechange = function () {
                                          if (xhr.readyState == 4 && xhr.status == 200) {
                                            let userData = JSON.parse(xhr.responseText);
                                            if (userData.data) {
                                              if(userData.data.prospect_status == "no"){
                                                document.getElementById("send_CRM").style.display = "none";
                                              }
                                              else{
                                                document.getElementById("send_CRM").style.display = "block";
                                                document.getElementById("prospect_status_image").value = userData.data.prospect_status_image;
                                                document.getElementById("prospect_status_name").value = userData.data.prospect_status_name;;
          
                                              }
                                              document.querySelector(".prospect_name_heading_comment").innerText = userData.data.name
                                              document.getElementById("prospect_image_heading_comment").src = userData.data.image
                                              document.querySelector(".desigination_comment").innerText = `${userData.data.description.length > 30 ? `${userData.data.description.slice(0,30)}....` : `${userData.data.description}`}`;
                                              document.querySelector(".prospect_group_name_comment").innerText = userData.data.company
                                              document.querySelector(".prospect_subgroup_name_comment").innerText = userData.data.address
                                              document.querySelector(".prospect_subgroup_status_comment").innerText = userData.data.status
                                              document.querySelector(".notes_comment").innerText = `${userData.data.notes == null ? `Notes not added` : `${userData.data.notes}`}`  
                                            }
                                              
                                            
                                          }
                                        }
                        
          
                        
          
          
          
                        localStorage.setItem("commentID", JSON.stringify(commentArray));
                          document.querySelector(".taggedUser").innerHTML = "";
                          document.getElementById("comment_box").value = "";
                          document.getElementById("temporary_sender").value = user_id;
                          document.getElementById("temporary_url").value = profile_link;
                          document.getElementById("temporary_prospect_id").value = prospect_id;

          
          
                          var access_token = localStorage.getItem("access_token");
                          var username = localStorage.getItem("username");
          
                          if (access_token && username) {
                            document.getElementById("comment_box").disabled = false;
          
                            setTimeout(() => {
                              const url = `${globalURl}/getComments`;
          
                              var xhr = new XMLHttpRequest();
                              xhr.open("POST", url, true);
                              xhr.setRequestHeader("Content-Type", "application/json");
                              xhr.send(
                                JSON.stringify({
                                  profile_link: profile_link,
                                  secondary_id: user_id,
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
          
          
                                      
          
                        
                      });
                    });

                    document.querySelectorAll(".opening_background").forEach((ele) => {
                      ele.addEventListener("click", (e) => {
                        let currentMessage = e.currentTarget
                        let message_id = currentMessage.getAttribute("data-url");
                        let params = {
                          active: true,
                          currentWindow: true,
                        };
                        chrome.tabs.query(params, gotTab);
                
                        function gotTab(tabs) {
                          let msg = {
                            txt: message_id,
                          };
                          chrome.tabs.sendMessage(tabs[0].id, msg);
                        }
                        console.log("background")
                      });
                    });





                    document.querySelectorAll(".reply-box").forEach((ele) => {
                      ele.addEventListener("click", (e) => {
                        // dynamicModalClose();
                        // showNullChats();
                        localStorage.removeItem("edit_id");
              document.getElementById("send_message_div").value = null;
              document.getElementById("send_message_button").style.display = "block";
              document.getElementById("update_message_button").style.display = "none";
              document.getElementById("cancel_message_button").style.display = "none";
                        let currentMessage = e.currentTarget
                        console.log(currentMessage);
                        let message_id = currentMessage.getAttribute("data-replied_id");
                        console.log(message_id);
                        localStorage.setItem("replied_id", message_id)
          
                        document.querySelector(".edit-text-msg-box").style.display = "block"
                        // document.getElementById("update_message_button").style.display = "block"
                        // document.getElementById("cancel_message_button").style.display = "block"
          
                        currentMessage = e.currentTarget.parentElement
                        console.log(currentMessage);
                        let message = currentMessage.querySelector(".updating_text").innerHTML;
                        console.log(message);
                         let name = currentMessage.querySelector(".font-weight-bold").innerText
                        // currentMessage = e.currentTarget.parentElement
          
          
                        document.querySelector(".name-edit-box").innerText = name
                        document.querySelector(".msg").innerHTML = message
          
                        // document.getElementById("send_message_div").value = message
          
                        console.log("Reply")
                      });
                    });
                  document.querySelectorAll(".message_edit_button").forEach((ele) => {
                    ele.addEventListener("click", (e) => {
                      // dynamicModalClose();
                      // showNullChats();
                      document.querySelector(".edit-text-msg-box").style.display ="none";
                      localStorage.removeItem("replied_id");
                      let currentMessage = e.currentTarget
                      console.log(currentMessage);
                      let message_id = currentMessage.getAttribute("data-replied_id");
                      console.log(message_id);
                      localStorage.setItem("edit_id", message_id)

                      document.getElementById("send_message_button").style.display = "none"
                      document.getElementById("update_message_button").style.display = "block"
                      document.getElementById("cancel_message_button").style.display = "block"

                      currentMessage = e.currentTarget.parentElement
                      console.log(currentMessage);
                      let message = currentMessage.querySelector(".updating_text").innerHTML;
                      console.log(message);

                      document.getElementById("send_message_div").value = message

                      console.log("edit")
                    });
                  });


                  document.querySelectorAll(".message_delete_button").forEach((ele) => {
                    ele.addEventListener("click", (e) => {
                      // dynamicModalClose();
                      // showNullChats();
                      let currentMessage = e.currentTarget
                      console.log(currentMessage);
                      let message_id = currentMessage.getAttribute("data-replied_id");
                      console.log(message_id);

                      MessageDeleteModal.style.transform = "scale(1)";
                      MessageDeleteModal.style.opacity = 1;
                      document.getElementById("temporary_buttons").innerHTML = `
                        <button id="closeIt" class="btn btn-light">Cancel</button>
                        <button data-replied_id=${message_id} id="confirmation_delete" class="btn btn-danger-new">Delete</button>
                        `
                        if (document.getElementById("closeIt")) {
                          document
                            .getElementById("closeIt")
                            .addEventListener("click", closeSubGroupModal);
                        }
                      document.getElementById("confirmation_delete").addEventListener("click", () => {
                        deleteGroupMessage();
                      });
                      console.log("delete")
                    });
                  });
                  

                  MessageDeleteModal.style.transform = "scale(0)";
                  MessageDeleteModal.style.opacity = 0;


                  // setTimeout(() => {
                  //   document
                  //     .querySelectorAll(".menuGroupIcon")
                  //     .forEach((ele) => {
                  //       ele?.addEventListener("click", openGroupThreeDotMenu);
                  //     });
                  // }, 100);

                  // setTimeout(() => {
                  //   document
                  //     .querySelectorAll(".myReplyIcon")
                  //     .forEach((ele) => {
                  //       ele?.addEventListener("click", replyToMessageFn);
                  //     });
                  // }, 100);


                }
              });
            }
            else{
              document.getElementById("new_chat_box").innerHTML = `<div class="date-Wraper position-relative mb-3">
              <div class="today-date">Today</div>
            </div>`;
            MessageDeleteModal.style.transform = "scale(0)";
                  MessageDeleteModal.style.opacity = 0;
            }

          }
        };
      }
    }
  };
}

function showNullChats() {

  localStorage.removeItem("edit_id");


  // prospectModalClose();
  // dynamicModalClose();

  // localStorage.removeItem("prospect_id");

  // document.getElementById("nullHeading").style.display = "none";

  // document.getElementById("prospectImage").src = "./Assets/img/user.png";
  // document.getElementById("prospectName").innerText = "No Prospect Added";
  // document.getElementById("companyName").innerText = "";
  // document.getElementById("descriptionName").innerText = "";
  // document.getElementById("dbNameMessage").innerText = "";
  // document.getElementById("dbNameMessagesecond").innerText = "";
  // document.getElementById("prospectImage").setAttribute("data-link", "");

  // document.querySelector(".groupDiv").classList.remove("groupDivClicked");

  // document.getElementById("msgInp").value = "";

  // document.getElementById("editBox").style.display = "flex";
  // document.getElementById("subGroupEditBox").style.display = "none";

  var user_id = localStorage.getItem("user_id");
  var group_id = localStorage.getItem("group_id");

  const url = `${globalURl}/null_chats/${group_id}/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);
      document.querySelector(".edit-text-msg-box").style.display ="none";
      localStorage.removeItem("replied_id");
      // groupUsersArr = userData.users;

      // document.querySelector(".rightUperRight").style.height = "60px";
      // document.querySelector(".rightBox").style.display = "block";
      // document.querySelector(".groupContainer").style.display = "none";
      // document.querySelector(".rightUperRight").innerHTML = "";
      // document.querySelector(".rightUpperBox").style.display = "none";
      // document.querySelector(".chatMessageContent").style.display = "block";
      // document.querySelector(".chatControlBtn").style.display = "block";
      // document.getElementById("sendMsgBtn").style.display = "none";
      // document.getElementById("sendGroupMsgBtn").style.display = "block";
      // document.getElementById("sendSubGroupMsgBtn").style.display = "none";
      // document.querySelector(".rightProspectBox").style.display = "flex";

      // document.querySelector(".chatMessageContent").style.height = "240px";

      // document.getElementById(
      //   "groupNamePara"
      // ).innerHTML = `<span style='color: #084DD1;'>Group Name: </span>${userData.group_name.length > 10
      //   ? `${userData.group_name.slice()} ...`
      //   : userData.group_name
      // }`;
      // document.getElementById("dbNameMessage").innerText = `${userData.sender_name != null
      //   ? `Clipper: ${userData.sender_name} ${userData.database != null ? ` Database: ${userData.database}` : ""
      //   }`
      //   : ""
      //   }`;

      let chatMessageContent = document.getElementById("new_chat_box");
      chatMessageContent.innerHTML = "";

      // if (userData.group_name) {
      //   localStorage.setItem("group_name", userData.group_name);
      // }

      // if (userData.admin == true) {
      //   document.getElementById("deleteBox").style.display = "flex";
      // } else {
      //   document.getElementById("deleteBox").style.display = "none";
      // }

      // document.querySelector(".showBtnContainer").innerHTML = "";
      // document.querySelector(".showBtnContainer").innerHTML = `
      // <button id="showMembers">Members</button>
      // <button id="showDirectBox">Group Chat</button>
      // `;

      if (userData.data) {
        var temp
        var counting_days = 1
        


        userData.data.map((obj, i) => {
          if (obj.text != null) {
            let dbTime = obj.created_at;

            let newDate = new Date();

            var ajjtareekh
              if( (newDate.getUTCMonth()+1) < 10 && newDate.getUTCDate() < 10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+'0'+newDate.getUTCDate();
              }
              else if( (newDate.getUTCMonth()+1) < 10 &&  newDate.getUTCDate() >=10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+newDate.getUTCDate();
              }
              else if( (newDate.getUTCMonth()+1) >= 10 &&  newDate.getUTCDate() < 10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+'0'+newDate.getUTCDate();
              }
              else{
                ajjtareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+newDate.getUTCDate();
              }

              var kalltareekh
              if( (newDate.getUTCMonth()+1) < 10 && (newDate.getUTCDate()-1) < 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+'0'+(newDate.getUTCDate()-1);
              }
              if( (newDate.getUTCMonth()+1) < 10 && (newDate.getUTCDate()-1) >= 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+(newDate.getUTCDate()-1);
              }
              if( (newDate.getUTCMonth()+1) >= 10 && (newDate.getUTCDate()-1) < 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+'0'+(newDate.getUTCDate()-1);
              }
              else{
                kalltareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+(newDate.getUTCDate()-1);
              }
          myDate = dbTime.split(" ");
          console.log(ajjtareekh,"ajj")
          console.log(kalltareekh,"kall")
          console.log(myDate[0],"DB")
          console.log(temp,"temp")


          if(temp == myDate[0]){
                counting_days = counting_days + 1;
          }
          else{
            if(ajjtareekh == myDate[0]){
              document.getElementById("new_chat_box").innerHTML += `<div class="date-Wraper position-relative mb-3">
              <div class="today-date">Today</div>
              </div>`;
              counting_days = counting_days + 1
            }
            else if (kalltareekh == myDate[0]) {
              document.getElementById("new_chat_box").innerHTML += `<div class="date-Wraper position-relative mb-3">
              <div class="today-date">Yesterday</div>
              </div>`;
              counting_days = counting_days + 1
            }
            else {
              document.getElementById("new_chat_box").innerHTML += `<div class="date-Wraper position-relative mb-3">
                <div class="today-date">${myDate[0]}</div>
                </div>`;
                counting_days = counting_days + 1;
            }
            
            temp = myDate[0];

          }

            let UTCDate = new Date(
              newDate.getUTCFullYear(),
              newDate.getUTCMonth(),
              newDate.getUTCDate(),
              newDate.getUTCHours(),
              newDate.getUTCMinutes(),
              newDate.getUTCSeconds(),
              newDate.getUTCMilliseconds()
            );

            let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

            let futureTime = Math.abs(
              (new Date(dbTime).getTime() / 1000).toFixed(0)
            );

            let TimeDifference = currentTime - futureTime;

            let days = Math.floor(TimeDifference / 86400);

            let hours = Math.floor(TimeDifference / 3600) % 24;

            let minutes = Math.floor(TimeDifference / 60) % 60;

            let seconds = Math.floor(TimeDifference % 60);

            let messageTimeString = "";

            if (days <= 0) {
              if (hours == 0) {
                if (minutes == 0) {
                  if (seconds == 0) {
                    messageTimeString = `less than a second ago`;
                  } else {
                    messageTimeString =
                      seconds == 1
                        ? `${seconds} second ago`
                        : `${seconds} seconds ago`;
                  }
                } else {
                  messageTimeString =
                    minutes == 1
                      ? `${minutes} minute ago`
                      : `${minutes} minutes ago`;
                }
              } else {
                messageTimeString =
                  hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
              }
            } else {
              messageTimeString =
                days == 1 ? `${days} day ago` : `${days} days ago`;
            }

            let messageReplyTimeString = "";

          if(obj.reply_msg != null){

            let dbTime = obj.reply_created_at;

            let newDate = new Date();
  
            let UTCDate = new Date(
              newDate.getUTCFullYear(),
              newDate.getUTCMonth(),
              newDate.getUTCDate(),
              newDate.getUTCHours(),
              newDate.getUTCMinutes(),
              newDate.getUTCSeconds(),
              newDate.getUTCMilliseconds()
            );
  
            let currentTime = Math.abs(
              (UTCDate.getTime() / 1000).toFixed(0)
            );
  
            let futureTime = Math.abs(
              (new Date(dbTime).getTime() / 1000).toFixed(0)
            );
  
            let TimeDifference = currentTime - futureTime;
  
            let days = Math.floor(TimeDifference / 86400);
  
            let hours = Math.floor(TimeDifference / 3600) % 24;
  
            let minutes = Math.floor(TimeDifference / 60) % 60;
  
            let seconds = Math.floor(TimeDifference % 60);
  
  
            if (days == 0) {
              if (hours == 0) {
                if (minutes == 0) {
                  if (seconds == 0) {
                    messageReplyTimeString = `less than a second ago`;
                  } else {
                    messageReplyTimeString =
                      seconds == 1
                        ? `${seconds} second ago`
                        : `${seconds} seconds ago`;
                  }
                } else {
                  messageReplyTimeString =
                    minutes == 1
                      ? `${minutes} minute ago`
                      : `${minutes} minutes ago`;
                }
              } else {
                messageReplyTimeString =
                  hours == 1
                    ? `${hours} hour ago`
                    : `${hours} hours ago`;
              }
            } else {
              messageReplyTimeString =
                days == 1 ? `${days} day ago` : `${days} days ago`;
            }

            console.log('reply_msg',messageReplyTimeString)


          }

            let row = `
              <div class="card my-2 rounded">
                              <div
                                class="card-body p-2 px-2 d-flex justify-content-between align-items-center"
                              >
                                <div class="row">
                                  <div class="img-p">
                                    <img
                                      src="${obj.image}"
                                      alt=""
                                      class="img-fluid rounded-circle"
                                    />
                                  </div>
                                  <div class="card-left-content-box">
                                    <div
                                      class="font-weight-bold name-top"
                                      style="font-size: 12px"
                                    >
                                    <span class='nameIssue' title='${obj.username}'>
                          ${obj.username}
                          </span>
                                      <span
                                        class="time"
                                        style="
                                          padding-left: 15px;
                                          font-size: 8px;
                                          line-height: 10px;
                                          color: #636363;
                                          font-weight: 400;
                                        "
                                        >${messageTimeString}</span
                                      >
                                    </div>
                                    <div class="msg-box-chat">
                                    ${obj.text}
                                    </div>
                                    ${ obj.name ? `
                    
                          <div class="prospects_shared_box" style="
   position: relative;
   ">
   <div class="row" style="
      align-items: center;
      justify-content: left;
      flex-wrap: nowrap;
      height: 36px;
      padding-bottom: 5px;
      ">
      <div class="" style="
         margin: auto 6px auto 21px;
         ">
         <img src="${obj.prospect_image}" alt="profile-img">
      </div>
      <div class="">
         <h3 class="title" style="
            margin-bottom: 0;
            font-size: 9px;
            line-height: 10px;
            font-weight: 800;
            margin-top: 4px;
            ">${obj.name.length > 12 ? `${obj.name.slice(0,12)}....` : `${obj.name}`}</h3>
         <p class="desc" style="
            width: 127px;
            font-size: 10px;
            ">${obj.description.length > 15 ? `${obj.description.slice(0,15)}....` : `${obj.description}`}</p>
      </div>
   </div>
   <div class="social-btn-box" style="
      position: absolute;
      top: -3px;
      right: 7px;
      ">
      ${obj.delete_status == 0 ? `
      
      <button data-id=${obj.temporary_id} data-title="View Prospect Chat"  class="opening_perspective" style="
         border: 0;
         background: none;
         cursor:pointer;
         ">
         <img class="new_class" style="width: 18px;
         height: 18px;
         object-fit: cover;
         border-radius: 50%;" src="./Assets/img/chat_redirect.png">
      </button>
      ` : ``}
      
      <button data-url=${obj.url}  data-title="View LinkedIn Profile" class="opening_background" style="
         border: 0;
         background: none;
         cursor:pointer;
         ">
         <img class="new_class" style="width: 14px;
         height: 14px;
         object-fit: cover;
         border-radius: 50%;" src="./Assets/img/open_prospect.svg">
      </button>                        
      <a href="#modal-12" data-title="View Prospect" data-prospect-id=${obj.temporary_id} data-id=${obj.sender_id} data-url=${obj.url} class="opening_clipper" style="
         border: 0;
         background: none;
         cursor:pointer;
         ">
         <img class="new_class" style="width: 14px;
         height: 14px;
         object-fit: cover;
         border-radius: 50%;" src="./Assets/img/open_background.svg">
      </a>
   </div>
</div> ` : `` }
                                  </div>
                                </div>

                                ${ obj.name ? `
                                <span class="updating_text" style="display:none">${obj.text}</span>   
                                <button
                      class="border-0 bg-transparent f-10 pointer position-absolute dropdown-btn"
                       style="top: 8px; right: 8px" >
                       <i class="fas fa-ellipsis-v"></i>
                       <div class='dropdown-list'>
                       <span data-replied_id=${obj.id} class="message_delete_button">Delete</span>
                       </div>
                       </button>
                                ` : `<button
                      class="border-0 bg-transparent f-10 pointer position-absolute dropdown-btn"
                       style="top: 8px; right: 8px" >
                       <i class="fas fa-ellipsis-v"></i>
                       <div class='dropdown-list'>
                       <span data-replied_id=${obj.id} class="message_edit_button">Edit</span>
                       <span data-replied_id=${obj.id} class="message_delete_button">Delete</span>
                       <span class="updating_text" style="display:none">${obj.text}</span>
                       </div>
                       </button>` }
                              </div>

                    ${
                      obj.reply_msg ? 
                      
                      `<div class="card card-child">
                      <div class="card-body p-0 m-0">
                        <div class="d-flex w-100" style="justify-content: space-evenly">
                          <div class="img-p">
                            <img src="${obj.reply_image}" alt="" class="img-fluid rounded-circle" />
                          </div>
                          <div class="card-left-content-box bg-transparent" style="width: 135px">
                            <div class="font-weight-bold name-top" style="font-size: 10px">
                              ${obj.reply_username}
                              <span class="time" style="
                                    padding-left: 8px;
                                    font-size: 6px;
                                    line-height: 8px;
                                    color: #636363;
                                    font-weight: 400;
                                  ">${messageReplyTimeString}</span>
                            </div>
                            <div class="msg-box-chat" style="font-size: 7px">
                              ${obj.reply_msg}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>`
                    :
                    ""
                    }
                      
                    <div data-replied_id=${obj.id} class="reply-box">&#x2923; Reply</div>
                  </div>                    
              `;
            chatMessageContent.innerHTML += row;


            document.querySelectorAll(".opening_perspective").forEach((ele) => {
              ele.addEventListener("click", (e) => {
                let currentMessage = e.currentTarget
                let message_id = currentMessage.getAttribute("data-id");
                
                localStorage.setItem("prospect_id",message_id);
                showProspectChat();
                
                console.log("perspective")
              });
            });
            document.querySelectorAll(".opening_clipper").forEach((ele) => {
              ele.addEventListener("click", (e) => {
  
                              var profile_link = e.currentTarget.getAttribute("data-url");
                              var user_id = e.currentTarget.getAttribute("data-id");
                              var prospect_id = e.currentTarget.getAttribute("data-prospect-id");
                              var sending_id = localStorage.getItem("user_id");

                              const url = `${globalURl}/get_prospect_Data`;
  
                                let xhr = new XMLHttpRequest();
  
                                xhr.open("POST", url, true);
                                xhr.setRequestHeader("Content-Type", "application/json");
                                xhr.send(
                                  JSON.stringify({
                                    prospect_id,
                                    user_id: sending_id,
                                  })
                                );
  
                                xhr.onreadystatechange = function () {
                                  if (xhr.readyState == 4 && xhr.status == 200) {
                                    let userData = JSON.parse(xhr.responseText);
                                    if (userData.data) {
                                      if(userData.data.prospect_status == "no"){
                                        document.getElementById("send_CRM").style.display = "none";
                                      }
                                      else{
                                        document.getElementById("send_CRM").style.display = "block";
                                        document.getElementById("prospect_status_image").value = userData.data.prospect_status_image;
                                        document.getElementById("prospect_status_name").value = userData.data.prospect_status_name;
                                      }
                                      document.querySelector(".prospect_name_heading_comment").innerText = userData.data.name
                                      document.getElementById("prospect_image_heading_comment").src = userData.data.image
                                      document.querySelector(".desigination_comment").innerText = `${userData.data.description.length > 30 ? `${userData.data.description.slice(0,30)}....` : `${userData.data.description}`}`;
                                      document.querySelector(".prospect_group_name_comment").innerText = userData.data.company
                                      document.querySelector(".prospect_subgroup_name_comment").innerText = userData.data.address
                                      document.querySelector(".prospect_subgroup_status_comment").innerText = userData.data.status
                                      document.querySelector(".notes_comment").innerText = `${userData.data.notes == null ? `Notes not added` : `${userData.data.notes}`}`  
                                    }
                                      
                                    
                                  }
                                }
                
  
                
  
  
  
                localStorage.setItem("commentID", JSON.stringify(commentArray));
                  document.querySelector(".taggedUser").innerHTML = "";
                  document.getElementById("comment_box").value = "";
                  document.getElementById("temporary_sender").value = user_id;
                  document.getElementById("temporary_url").value = profile_link;
                  document.getElementById("temporary_prospect_id").value = prospect_id;

  
  
                  var access_token = localStorage.getItem("access_token");
                  var username = localStorage.getItem("username");
  
                  if (access_token && username) {
                    document.getElementById("comment_box").disabled = false;
  
                    setTimeout(() => {
                      const url = `${globalURl}/getComments`;
  
                      var xhr = new XMLHttpRequest();
                      xhr.open("POST", url, true);
                      xhr.setRequestHeader("Content-Type", "application/json");
                      xhr.send(
                        JSON.stringify({
                          profile_link: profile_link,
                          secondary_id: user_id,
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
  
  
                              
  
                
              });
            });
  
            document.querySelectorAll(".opening_background").forEach((ele) => {
              ele.addEventListener("click", (e) => {
                let currentMessage = e.currentTarget
                let message_id = currentMessage.getAttribute("data-url");
                let params = {
                  active: true,
                  currentWindow: true,
                };
                chrome.tabs.query(params, gotTab);
        
                function gotTab(tabs) {
                  let msg = {
                    txt: message_id,
                  };
                  chrome.tabs.sendMessage(tabs[0].id, msg);
                }
                console.log("background")
              });
            });



            document.querySelectorAll(".reply-box").forEach((ele) => {
              ele.addEventListener("click", (e) => {
                // dynamicModalClose();
                // showNullChats();
                localStorage.removeItem("edit_id");
              document.getElementById("send_message_div").value = null;
              document.getElementById("send_message_button").style.display = "block";
              document.getElementById("update_message_button").style.display = "none";
              document.getElementById("cancel_message_button").style.display = "none";
                let currentMessage = e.currentTarget
                console.log(currentMessage);
                let message_id = currentMessage.getAttribute("data-replied_id");
                console.log(message_id);
                localStorage.setItem("replied_id", message_id)
  
                document.querySelector(".edit-text-msg-box").style.display = "block"
                // document.getElementById("update_message_button").style.display = "block"
                // document.getElementById("cancel_message_button").style.display = "block"
  
                currentMessage = e.currentTarget.parentElement
                console.log(currentMessage);
                let message = currentMessage.querySelector(".updating_text").innerHTML;
                console.log(message);
                 let name = currentMessage.querySelector(".font-weight-bold").innerText
                // currentMessage = e.currentTarget.parentElement
  
  
                document.querySelector(".name-edit-box").innerText = name
                document.querySelector(".msg").innerHTML = message
  
                // document.getElementById("send_message_div").value = message
  
                console.log("Reply")
              });
            });


            document.querySelectorAll(".message_edit_button").forEach((ele) => {
              ele.addEventListener("click", (e) => {
                // dynamicModalClose();
                // showNullChats();
                document.querySelector(".edit-text-msg-box").style.display ="none";
                localStorage.removeItem("replied_id");
                let currentMessage = e.currentTarget
                console.log(currentMessage);
                let message_id = currentMessage.getAttribute("data-replied_id");
                console.log(message_id);
                localStorage.setItem("edit_id", message_id)

                document.getElementById("send_message_button").style.display = "none"
                document.getElementById("update_message_button").style.display = "block"
                document.getElementById("cancel_message_button").style.display = "block"

                currentMessage = e.currentTarget.parentElement
                console.log(currentMessage);
                let message = currentMessage.querySelector(".updating_text").innerHTML;
                console.log(message);

                document.getElementById("send_message_div").value = message

                console.log("delete")
              });
            });



            document.querySelectorAll(".message_delete_button").forEach((ele) => {
              ele.addEventListener("click", (e) => {
                // dynamicModalClose();
                // showNullChats();
                let currentMessage = e.currentTarget
                console.log(currentMessage);
                let message_id = currentMessage.getAttribute("data-replied_id");
                console.log(message_id);

                MessageDeleteModal.style.transform = "scale(1)";
                MessageDeleteModal.style.opacity = 1;
                document.getElementById("temporary_buttons").innerHTML = `
                  <button id="closeIt" class="btn btn-light">Cancel</button>
                  <button data-replied_id=${message_id} id="confirmation_delete" class="btn btn-danger-new">Delete</button>
                  `
                  if (document.getElementById("closeIt")) {
                    document
                      .getElementById("closeIt")
                      .addEventListener("click", closeSubGroupModal);
                  }
                document.getElementById("confirmation_delete").addEventListener("click", () => {
                  deleteGroupMessage();
                });
                console.log("delete")
              });
            });

            // setTimeout(() => {
            //   document.querySelectorAll(".menuGroupIcon").forEach((ele) => {
            //     ele?.addEventListener("click", openGroupThreeDotMenu);
            //   });
            // }, 100);

            // setTimeout(() => {
            //   document.querySelectorAll(".myReplyIcon").forEach((ele) => {
            //     ele.addEventListener("click", replyToMessageFn);
            //   });
            // }, 100);



            document.getElementById("send_message_div").value = ''
            document.getElementById("send_message_button").style.display = "block"
            document.getElementById("update_message_button").style.display = "none"
            document.getElementById("cancel_message_button").style.display = "none"


            // chatMessageContent.scroll(0, chatMessageContent.scrollHeight);



          }
        });
      }
      else{
        chatMessageContent.innerHTML = `<div class="date-Wraper position-relative mb-3">
        <div class="today-date">Today</div>
      </div>`;
      document.getElementById("send_message_div").value = ''
            document.getElementById("send_message_button").style.display = "block"
            document.getElementById("update_message_button").style.display = "none"
            document.getElementById("cancel_message_button").style.display = "none"
      }


      setTimeout(() => {
        document
          .getElementById("showMembers")
          .addEventListener("click", dynamicModalOpenM);
        
        document
          .getElementById("showDirectBox")
          .addEventListener("click", showNullChats);
      }, 100);
    }
  };
}

function addmemberpage() {
  localStorage.setItem("backpage", true);
  document.location.href = "share.html";
}

if (document.getElementById("img__logo")) {
  document.getElementById("img__logo").addEventListener("click", () => {
    window.location.href = "home.html";
  });
}

// if (document.getElementById("prospectName")) {
//   document.getElementById("prospectName").addEventListener("click", () => {
//     if (
//       document.getElementById("prospectName").innerText != "No Prospect Added"
//     ) {
//       let prospect_link = document
//         .querySelector("#prospectImage")
//         .getAttribute("data-link");

//       let params = {
//         active: true,
//         currentWindow: true,
//       };
//       chrome.tabs.query(params, gotTab);

//       function gotTab(tabs) {
//         let msg = {
//           txt: prospect_link,
//         };
//         chrome.tabs.sendMessage(tabs[0].id, msg);

//         localStorage.removeItem("isProspectCollabClicked1");
//         localStorage.removeItem("prospectCollabData1");
//         localStorage.removeItem("prospect_id1");
//       }
//     }
//   });
// }

if (document.getElementById("prospectImage")) {
  document.getElementById("prospectImage").addEventListener("click", () => {
    if (
      document.getElementById("prospectName").innerText != "No Prospect Added"
    ) {
      let prospect_link = document
        .querySelector("#prospectImage")
        .getAttribute("data-link");

      let params = {
        active: true,
        currentWindow: true,
      };
      chrome.tabs.query(params, gotTab);

      function gotTab(tabs) {
        let msg = {
          txt: prospect_link,
        };
        chrome.tabs.sendMessage(tabs[0].id, msg);

        localStorage.removeItem("isProspectCollabClicked1");
        localStorage.removeItem("prospectCollabData1");
        localStorage.removeItem("prospect_id1");
      }
    }
  });
}

if (document.getElementById("search_box")) {
  document.getElementById("search_box").addEventListener("keyup", searchData);
}

function searchData(e) {
  let inpValue = e.target.value;

  let user_id = localStorage.getItem("user_id");

  if (inpValue) {
    document.querySelector(".searchBoxContainer").style.display = "block";

    let url = `${globalURl}/addMemberComment/${user_id}/${inpValue}`;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();

    xhr.onreadystatechange = function () {
      //Call a function when the state changes.
      if (xhr.readyState == 4 && xhr.status == 200) {
        const userData = JSON.parse(xhr.responseText);

        let colorArr = [
          "row1TimeSpecial1",
          "row1TimeSpecial2",
          "row1TimeSpecial3",
        ];

        if (userData.length > 0) {
          document.querySelector(".userContainer").innerHTML = "";
          userData.map((item, i) => {
            document.querySelector(".userContainer").innerHTML += `
              <p class='searchUser ${colorArr[Math.floor(Math.random() * (2 - 0 + 1) + 0)]
              }' data-linked_to_id=${item.linked_to_id}>${item.mutual}</p>
              `;
          });
        } else {
          document.querySelector(".userContainer").innerHTML = `
            <div class="userTitle" style="color: red; ">No User Found</div>
          `;
        }
        document.querySelectorAll(".searchUser").forEach((ele) => {
          ele.addEventListener("click", showProspectData);
        });
      }
    };

    document.querySelector(".prospectContainer").innerHTML = `
      <div class='loader'></div>
    `;

    setTimeout(() => {
      let url1 = `${globalURl}/search_calender/${user_id}/${inpValue}`;
      var xhr1 = new XMLHttpRequest();
      xhr1.open("GET", url1, true);
      xhr1.setRequestHeader("Content-Type", "application/json");
      xhr1.send();

      xhr1.onreadystatechange = function () {
        //Call a function when the state changes.
        if (xhr1.readyState == 4 && xhr1.status == 200) {
          const userData1 = JSON.parse(xhr1.responseText);
          if (userData1.data.length > 0) {
            let colorArr = [
              "row1TimeSpecial1",
              "row1TimeSpecial2",
              "row1TimeSpecial3",
            ];
            document.querySelector(".prospectContainer").innerHTML = "";
            userData1.data.map((item1, i) => {
              document.querySelector(".prospectContainer").innerHTML += `
                      <p class='searchProspect ${colorArr[Math.floor(Math.random() * (2 - 0 + 1) + 0)]
                }' data-id=${item1.id}>${item1.name}</p>
                      `;
            });
            document.querySelectorAll(".searchProspect").forEach((ele) => {
              ele.addEventListener("click", goToCliperPage);
            });
          } else {
            document.querySelector(".prospectContainer").innerHTML = `
                    <div class="userTitle" style="color: red; ">No Prospect Found</div>
                  `;
          }
        }
      };
    }, 1000);
  } else {
    document.querySelector(".searchBoxContainer").style.display = "none";
  }
}

function showProspectData(e) {
  localStorage.removeItem("replied_id");
  document.querySelector(".searchBoxContainer").style.display = "none";


  let receiver_id = e.target.getAttribute("data-linked_to_id");
  localStorage.setItem("receiver_id", receiver_id);

  document.querySelectorAll(".userIcon").forEach((ele) => {
    ele.classList.remove("userClicked");
    if (ele.getAttribute("data-receiverId") == receiver_id) {
      ele.classList.add("userClicked");
      document.getElementById("search_box").value = "";
      document.querySelector(".rightProspectBox").style.display = "none";
      document.querySelector(".chatMessageContent").style.height = "280px";
      document.querySelector("#nullHeading").style.display = "none";
      openChatDynamicModal();
    }
  });
}

function goToCliperPage(e) {
  let prospect_id = e.target.getAttribute("data-id");
  let user_id = localStorage.getItem("user_id");

  const url = `${globalURl}/get_prospectData/${prospect_id}/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.data) {
        localStorage.setItem("prospectData", JSON.stringify(userData.data));
        let link = userData.data.profile_link;

        let params = {
          active: true,
          currentWindow: true,
        };
        chrome.tabs.query(params, gotTab);

        function gotTab(tabs) {
          let msg = {
            txt: link,
          };
          chrome.tabs.sendMessage(tabs[0].id, msg);
          localStorage.setItem("modalProspectId", prospect_id);
          localStorage.setItem("modalProspectLink", link);
          localStorage.setItem("isImageClicked", true);
          window.location.replace("popup.html");
        }
      }
    }
  };
}

function groupleaveion() {
  let group_id = "";


  group_id = localStorage.getItem("group_id");

  user_id = localStorage.getItem("user_id");

  const url = `${globalURl}/leave_group/${group_id}/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if ((userData.status = "Deleted")) {
        document.getElementById("settingModal").style.transform = "scale(0)";
        document.getElementById("settingModal").style.opacity = "0";
        var myToast = Toastify({
          text: "Group left successfully",
          duration: 2000,
        });

        myToast.showToast();
        localStorage.removeItem("group_id")

        settingModl.style.transform = "scale(0)";
        settingModl.style.opacity = 0;

        fetchGroupInfo();
      }
    }
  };
}

function groupdeleteion() {
  let group_id = "";


  group_id = localStorage.getItem("group_id");

  user_id = localStorage.getItem("user_id");

  const url = `${globalURl}/delete_group/${group_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if ((userData.status = "Deleted")) {
        document.getElementById("settingModal").style.transform = "scale(0)";
        document.getElementById("settingModal").style.opacity = "0";
        var myToast = Toastify({
          text: "Group Deleted successfully",
          duration: 2000,
        });

        myToast.showToast();
        localStorage.removeItem("group_id")
        localStorage.removeItem("subgroup_id")
        localStorage.removeItem("prospect_id")


        settingModl.style.transform = "scale(0)";
        settingModl.style.opacity = 0;

        fetchGroupInfo();
      }
    }
  };
}

if (document.querySelector(".viewSubGroupBtn")) {
  document
    .querySelector(".viewSubGroupBtn")
    .addEventListener("click", openSubGroupModal);
}

if (document.getElementById("MessageDeleteModalCloseBtn")) {
  document
    .getElementById("MessageDeleteModalCloseBtn")
    .addEventListener("click", closeSubGroupModal);
}
if (document.getElementById("closeIt")) {
  document
    .getElementById("closeIt")
    .addEventListener("click", closeSubGroupModal);
}

function openSubGroupModal() {
  localStorage.removeItem("sub_group");

  document.getElementById("subGroupModal").style.transform = "scale(1)";
  document.getElementById("subGroupModal").style.opacity = 1;

  var user_id = localStorage.getItem("user_id");
  var group_id = localStorage.getItem("group_id");

  const url = `${globalURl}/get_sub_groups/${group_id}/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.length > 0) {
        document.querySelector(".subGroupContainer").innerHTML = "";
        userData.map((item) => {
          document.querySelector(".subGroupContainer").innerHTML += `
                <div style="position: relative;margin-left: 10px;">

                <div class="subGroupBox" data-sub_group_id=${item.sub_group_id}>
                <span class="tooltiptext"><span style="color:red">Name: </span>${item.name
            }
                </span>

                ${item.members
              .slice(0, 4)
              .map((ele) => {
                return `<img src="${ele}" class="userIconDemo" data-receiverid="32">`;
              })
              .join("")}
                  
                  ${item.notifications != 0
              ? `<div class="notificationBox">${item.notifications}</div> `
              : ""
            }

                  </div>
                  <div class="groupName">${item.name.length > 10
              ? `${item.name.slice(0, 10)} ...`
              : item.name
            }</div>
                  ${item.admin != false
              ? `<div class="deleteSubGroupBox"><i class="fas fa-trash subGroupDeleteIcon"></i></div>`
              : ""
            }
                  <div class="leaveSubGroupBox"><i class="fas fa-user-minus"></i></div>
                </div>
            `;
        });
        document.querySelectorAll(".subGroupBox").forEach((ele) => {
          ele.addEventListener("click", () => {
            localStorage.setItem(
              "sub_group_id",
              ele.getAttribute("data-sub_group_id")
            );
            openSubGroupMembersModal();
          });
        });

        document.querySelectorAll(".deleteSubGroupBox").forEach((ele) => {
          ele.addEventListener("click", subGroupDeleteion);
        });
        document.querySelectorAll(".leaveSubGroupBox").forEach((ele) => {
          ele.addEventListener("click", subGroupleaveion);
        });
      } else {
        document.querySelector(".subGroupContainer").innerHTML =
          "<h1 class='groupNullHeading'>No sub groups to show</h1>";
      }
    }
  };
}

function subGroupDeleteion(e) {
  let sub_group_id = "";

  if (localStorage.getItem("sub_group_id")) {
    sub_group_id = localStorage.getItem("sub_group_id");
  } else {
    sub_group_id = e.currentTarget.parentElement
      .querySelector(".subGroupBox")
      .getAttribute("data-sub_group_id");
  }

  const url = `${globalURl}/delete_sub_group/${sub_group_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if ((userData.status = "Deleted")) {
        document.getElementById("settingModal").style.transform = "scale(0)";
        document.getElementById("settingModal").style.opacity = "0";

        document.getElementById("subGroupModal").style.transform = "scale(0)";
        document.getElementById("subGroupModal").style.opacity = "0";

        var myToast = Toastify({
          text: "Sub Group deleted successfully",
          duration: 2000,
        });

        myToast.showToast();

        openSubGroupModal();

        document.getElementById("nullHeading").style.display = "flex";

        document.querySelector(".rightProspectBox").style.display = "none";
        document.querySelector(".rightUpperBox").style.display = "none";
        document.querySelector(".chatMessageContent").style.display = "none";
        document.querySelector(".chatControlBtn").style.display = "none";
        document.querySelector(".groupContainer").style.display = "none";
      }
    }
  };
}

function subGroupleaveion(e) {
  let sub_group_id = "";

  if (localStorage.getItem("subgroup_id")) {
    sub_group_id = localStorage.getItem("subgroup_id");
  } 

  let user_id = localStorage.getItem("user_id");

  const url = `${globalURl}/leave_sub_group/${sub_group_id}/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if ((userData.status = "Deleted")) {
        document.getElementById("SubgroupsettingModl").style.transform = "scale(0)";
        document.getElementById("SubgroupsettingModl").style.opacity = "0";
        var myToast = Toastify({
          text: "SubGroup left successfully",
          duration: 2000,
        });
        myToast.showToast();

        dynamicModalOpenP();
      }
    }
  };
}
function subGroupdeleteion(e) {
  let sub_group_id = "";

  if (localStorage.getItem("subgroup_id")) {
    sub_group_id = localStorage.getItem("subgroup_id");
  } 

  let user_id = localStorage.getItem("user_id");

  const url = `${globalURl}/leave_sub_group/${sub_group_id}/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if ((userData.status = "Deleted")) {
        document.getElementById("SubgroupsettingModl").style.transform = "scale(0)";
        document.getElementById("SubgroupsettingModl").style.opacity = "0";
        var myToast = Toastify({
          text: "SubGroup deleted successfully",
          duration: 2000,
        });
        myToast.showToast();

        dynamicModalOpenP();
      }
    }
  };
}

function closeSubGroupModal() {
  document.getElementById("MessageDeleteModal").style.transform = "scale(0)";
  document.getElementById("MessageDeleteModal").style.opacity = 0;
}

function openSubGroupMembersModal() {
  document.getElementById("subGroupMembersModal").style.transform = "scale(1)";
  document.getElementById("subGroupMembersModal").style.opacity = 1;

  var group_id = localStorage.getItem("group_id");
  var user_id = localStorage.getItem("user_id");
  var sub_group_id = localStorage.getItem("sub_group_id");

  const url = `${globalURl}/get_sub_group_prospects/${group_id}/${sub_group_id}/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.data?.length > 0) {
        document.querySelector(".subGroupMembersModalContainer").innerHTML = "";
        userData.data.map((ele) => {
          if (ele.prospect_data) {
            document.querySelector(
              ".subGroupMembersModalContainer"
            ).innerHTML += `
  
                  <div class="prospectContentContainer">
                    <div class="prospectContent subGroupProspect" data-prospect_id=${ele.prospect_id
              }>
                                
                      <img src=${ele.prospect_data.image} alt=""/>
              
                      <div>
                        <h1>${ele.prospect_data.name}</h1>
                        <h2>${ele.sender_name != null
                ? `By ${ele.sender_name} ${ele.database != null
                  ? `from ${ele.database}`
                  : ""
                }`
                : ""
              }
                        </h2>
                      </div>
              
                      ${ele.notifications != 0 && ele.notifications != null
                ? `<span>${ele.notifications}</span>`
                : ""
              }
  
                    </div>
                    <i class="fas fa-trash prospectDeleteIcon subGroupProspectDelete"></i>
                    </div>
                    `;
          }
        });

        document.querySelector(".subGroupMembersModalContainer").innerHTML += `
              <div class="prospectContent1 subGroupProspectContent1">
                  <h1>No Prospect Chats</h1>
                  ${userData.non_prospect_notifications != 0 &&
            userData.non_prospect_notifications != null
            ? `<span>${userData.non_prospect_notifications}</span>`
            : ""
          }
              </div>
            `;

        document.querySelectorAll(".subGroupProspectDelete").forEach((ele) => {
          ele.addEventListener("click", subGroupProspectDelete);
        });

        document.querySelectorAll(".subGroupProspect").forEach((element) => {
          element.addEventListener("click", showSubGroupProspectChat);
        });
      } else {
        document.querySelector(".subGroupMembersModalContainer").innerHTML = "";
        document.querySelector(".subGroupMembersModalContainer").innerHTML = `
                <div class="prospectContent1 subGroupProspectContent1">
                    <h1>No Prospect Chats</h1>
                    ${userData.non_prospect_notifications != 0 &&
            userData.non_prospect_notifications != null
            ? `<span>${userData.non_prospect_notifications}</span>`
            : ""
          }
                </div>
                `;
      }
      document.querySelectorAll(".subGroupProspectContent1").forEach((ele) => {
        ele.addEventListener("click", () => {
          nullSubGroupChats();
        });
      });
    }
  };
}

function showSubGroupProspectChat(e) {
  document.querySelector(".prospect_edit-text-msg-box").style.display ="none";
  localStorage.removeItem("replied_id");
  localStorage.removeItem("nullGroupChat");
  localStorage.removeItem("group_name");
  localStorage.removeItem("editGroupName");
  localStorage.removeItem('nullSubGroupChat')

  document.querySelector(".dynamicContainer").innerHTML = "";

  prospectModalClose();
  dynamicModalClose();
  closeSubGroupModal();

  document.getElementById("subGroupMembersModal").style.transform = "scale(0)";
  document.getElementById("subGroupMembersModal").style.opacity = 0;

  document.getElementById("nullHeading").style.display = "none";

  let prospectId = e.currentTarget.getAttribute("data-prospect_id");

  document.getElementById("prospectImage").src = "./Assets/img/user.png";
  document.getElementById("prospectName").innerText = "";
  document.getElementById("companyName").innerText = "";
  document.getElementById("descriptionName").innerText = "";
  document.getElementById("prospectImage").setAttribute("data-link", "");

  document.querySelector(".groupDiv").classList.remove("groupDivClicked");

  document.getElementById("msgInp").value = "";

  document.getElementById("editBox").style.display = "none";
  document.getElementById("subGroupEditBox").style.display = "flex";

  var user_id = localStorage.getItem("user_id");
  var group_id = localStorage.getItem("group_id");
  var sub_group_id = localStorage.getItem("sub_group_id");

  const url = `${globalURl}/sub_group_chat_filter/${group_id}/${sub_group_id}/${prospectId}/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      groupUsersArr = userData.users;

      document.querySelector(".rightUperRight").style.height = "60px";
      document.querySelector(".rightBox").style.display = "block";
      document.querySelector(".groupContainer").style.display = "none";
      document.querySelector(".rightUperRight").innerHTML = "";
      document.querySelector(".rightUpperBox").style.display = "none";
      document.querySelector(".chatMessageContent").style.display = "block";
      document.querySelector(".chatControlBtn").style.display = "block";
      document.getElementById("sendMsgBtn").style.display = "none";
      document.getElementById("sendGroupMsgBtn").style.display = "none";
      document.getElementById("sendSubGroupMsgBtn").style.display = "block";
      document.querySelector(".rightProspectBox").style.display = "flex";

      document.querySelector(".chatMessageContent").style.height = "215px";

      let chatMessageContent = document.querySelector(".chatMessageContent");

      document.getElementById("prospectImage").src =
        userData.prospect_data.image;
      document
        .getElementById("prospectImage")
        .setAttribute("data-link", userData.prospect_data.profile_link);
      document.getElementById("prospectName").innerText =
        userData.prospect_data.name;
      if (userData.prospect_data.company) {
        document.getElementById(
          "companyName"
        ).innerText = `(${userData.prospect_data.company})`;
      }
      document.getElementById("descriptionName").innerText =
        userData.prospect_data.description.slice(0, 45) + "...";
      document.getElementById(
        "groupNamePara"
      ).innerHTML = `<span style='color: #084DD1;'>Group Name: </span>${userData.group_name.length > 10
        ? `${userData.group_name.slice()} ...`
        : userData.group_name
      }`;

      document.getElementById("subGroupNamePara").style.display = "block";

      document.getElementById(
        "subGroupNamePara"
      ).innerHTML = `<span style='color: #084DD1;'>Sub Group Name: </span>${userData.sub_group_name?.length > 10
        ? `${userData.sub_group_name.slice()} ...`
        : userData.sub_group_name
      }`;

      document.getElementById("dbNameMessage").innerText = `${userData.sender_name != null ? `Clipper: ${userData.sender_name}` : ""
        }`;

      document.getElementById("dbNameMessagesecond").innerText = `${userData.database != null ? `Database: ${userData.database}` : ""
        }`;

      localStorage.setItem("isProspectCollabClicked1", true);
      localStorage.setItem(
        "prospectCollabData1",
        JSON.stringify(userData.prospect_data)
      );
      localStorage.setItem("prospect_id1", userData.prospect_data.id);
      localStorage.setItem("prospect_id", userData.prospect_data.id);

      if (userData.group_name) {
        localStorage.setItem("group_name", userData.group_name);
      }

      if (userData.sub_group_name) {
        localStorage.setItem("sub_group_name", userData.sub_group_name);
      }

      if (userData.admin == true) {
        document.getElementById("deleteBox").innerText = "Delete Sub Group";
        document.getElementById("deleteBox").style.display = "flex";
      } else {
        document.getElementById("deleteBox").innerText = "Delete Group";
        document.getElementById("deleteBox").style.display = "none";
      }

      document.querySelector(".showBtnContainer").innerHTML = "";
      document.querySelector(".showBtnContainer").innerHTML = `
      <button id="showMembers">Members</button>
      <button id="showSubGroupProspectBox">Prospects</button>
      <button id="showSubGroupDirectBox">Group Chat</button>
      `;

      if (userData.data) {
        chatMessageContent.innerHTML = "";
        userData.data.map((obj, i) => {
          if (obj.text != null) {
            if (obj.sender_id == user_id) {
              let dbTime = obj.created_at;

              let newDate = new Date();

              let UTCDate = new Date(
                newDate.getUTCFullYear(),
                newDate.getUTCMonth(),
                newDate.getUTCDate(),
                newDate.getUTCHours(),
                newDate.getUTCMinutes(),
                newDate.getUTCSeconds(),
                newDate.getUTCMilliseconds()
              );

              let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

              let futureTime = Math.abs(
                (new Date(dbTime).getTime() / 1000).toFixed(0)
              );

              let TimeDifference = currentTime - futureTime;

              let days = Math.floor(TimeDifference / 86400);

              let hours = Math.floor(TimeDifference / 3600) % 24;

              let minutes = Math.floor(TimeDifference / 60) % 60;

              let seconds = Math.floor(TimeDifference % 60);

              let messageTimeString = "";

              if (days == 0) {
                if (hours == 0) {
                  if (minutes == 0) {
                    if (seconds == 0) {
                      messageTimeString = `less than a second ago`;
                    } else {
                      messageTimeString =
                        seconds == 1
                          ? `${seconds} second ago`
                          : `${seconds} seconds ago`;
                    }
                  } else {
                    messageTimeString =
                      minutes == 1
                        ? `${minutes} minute ago`
                        : `${minutes} minutes ago`;
                  }
                } else {
                  messageTimeString =
                    hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                }
              } else {
                messageTimeString =
                  days == 1 ? `${days} day ago` : `${days} days ago`;
              }

              let row = `
                  <div class='senderMsgContainer'>
                  
                  <div class='myMessageDiv'>
                  
                  <div class="imageNameContainer">
                  
                      <span class="senderName">${obj.username}</span>
                      <img src="${obj.image}" class='messageImage'/>
                    
                    </div>
                    <i class="far fa-ellipsis-v menuGroupIcon"></i>

                  <div class='menuBox' style="display: none">
                    <div class='editContainer editSubGroupContainer'>
                      <i class="far fa-edit"></i>
                      <h1>Edit</h1>
                    </div>
                    <div class="deleteContainer deleteSubGroupContainer">
                      <i class="far fa-trash"></i>
                      <h1>Delete</h1>
                    </div>
                  </div>
                        ${obj.replied_id != null
                  ? `<div class="prospectReplyDiv">
                            <div class="prospectContentDiv" style="${obj.reply_image == null ? "width: 100%;" : ""
                  }">
                              <h1>${obj.reply_msg != null
                    ? `<h1>${obj.reply_msg}</h1>`
                    : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                  }</h1>
                            </div>
                            ${obj.reply_image != null
                    ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                    : ""
                  }
                          </div>`
                  : ""
                }

                        <i class="fas fa-reply myReplyIcon"></i>

                        <p class="messageTxt" data-replied_id=${obj.id}>${obj.text
                }</p>
                        <div class="timestampDiv">
                          ${messageTimeString}
                        </div>
                      </div>

                  </div>
                `;
              chatMessageContent.innerHTML += row;

              setTimeout(() => {
                document.querySelectorAll(".menuGroupIcon").forEach((ele) => {
                  ele?.addEventListener("click", openSubGroupThreeDotMenu);
                });
              }, 100);

              setTimeout(() => {
                document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                  ele?.addEventListener("click", replyToMessageFn);
                });
              }, 100);
            } else {
              let dbTime = obj.created_at;

              let newDate = new Date();

              let UTCDate = new Date(
                newDate.getUTCFullYear(),
                newDate.getUTCMonth(),
                newDate.getUTCDate(),
                newDate.getUTCHours(),
                newDate.getUTCMinutes(),
                newDate.getUTCSeconds(),
                newDate.getUTCMilliseconds()
              );

              let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

              let futureTime = Math.abs(
                (new Date(dbTime).getTime() / 1000).toFixed(0)
              );

              let TimeDifference = currentTime - futureTime;

              let days = Math.floor(TimeDifference / 86400);

              let hours = Math.floor(TimeDifference / 3600) % 24;

              let minutes = Math.floor(TimeDifference / 60) % 60;

              let seconds = Math.floor(TimeDifference % 60);

              let messageTimeString = "";

              if (days == 0) {
                if (hours == 0) {
                  if (minutes == 0) {
                    if (seconds == 0) {
                      messageTimeString = `less than a second ago`;
                    } else {
                      messageTimeString =
                        seconds == 1
                          ? `${seconds} second ago`
                          : `${seconds} seconds ago`;
                    }
                  } else {
                    messageTimeString =
                      minutes == 1
                        ? `${minutes} minute ago`
                        : `${minutes} minutes ago`;
                  }
                } else {
                  messageTimeString =
                    hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                }
              } else {
                messageTimeString =
                  days == 1 ? `${days} day ago` : `${days} days ago`;
              }

              let row = `
                  <div class="groupUserMsgContainer">
                  
                  
                  <div class='userMessageDiv'>
                  <div class="imageNameContainer1">
                  <img src="${obj.image}" class='messageImage'/>
                    <span class="groupUserName">${obj.username}</span>
                  </div>
                  
                    ${obj.replied_id != null
                  ? `<div class="prospectReplyDiv1">
                        <div class="prospectContentDiv" style="${obj.reply_image == null ? "width: 100%;" : ""
                  }">

                          <h1>${obj.reply_msg != null
                    ? `<h1>${obj.reply_msg}</h1>`
                    : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                  }</h1>
                        </div>
                        ${obj.reply_image != null
                    ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                    : ""
                  }
                      </div>`
                  : ""
                }
                    
                      <i class="fas fa-reply replyIcon"></i>
                      
                      <p class="messageTxt" data-replied_id=${obj.id}>${obj.text
                }</p>
                
                      <div class="timestampUserDiv">
                        ${messageTimeString}
                      </div>
                    </div>

                  </div>
                `;
              chatMessageContent.innerHTML += row;

              setTimeout(() => {
                document.querySelectorAll(".replyIcon").forEach((ele) => {
                  ele.addEventListener("click", replyToMessageFn);
                });
              }, 100);
            }

            chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
          }
        });
      }

      setTimeout(() => {
        document
          .getElementById("showMembers")
          .addEventListener("click", dynamicModalOpenM);
        document
          .getElementById("showSubGroupProspectBox")
          .addEventListener("click", openSubGroupMembersModal);
        document
          .getElementById("showSubGroupDirectBox")
          .addEventListener("click", nullSubGroupChats);
      }, 100);
    }
  };
}

function nullSubGroupChats() {
  SearchUserArray = [];
  document.getElementById("customScreenChattBox").style.display = "none"
  document.querySelector(".profileMainBox").style.display = "block";
  console.log("SUBGROUP")
  localStorage.removeItem("nullGroupChat");


  
  localStorage.removeItem("editGroupName");
  localStorage.setItem('nullSubGroupChat', true)

  prospectModalClose();
  dynamicModalClose();
  closeSubGroupModal();

  document.getElementById("subGroupMembersModal").style.transform = "scale(0)";
  document.getElementById("subGroupMembersModal").style.opacity = 0;

  localStorage.removeItem("prospect_id");

  document.getElementById("nullHeading").style.display = "none";

  document.getElementById("prospectImage").src = "./Assets/img/user.png";
  document.getElementById("prospectName").innerText = "No Prospect Added";
  document.getElementById("companyName").innerText = "";
  document.getElementById("descriptionName").innerText = "";
  document.getElementById("dbNameMessage").innerText = "";
  document.getElementById("dbNameMessagesecond").innerText = "";
  document.getElementById("prospectImage").setAttribute("data-link", "");

  document.getElementById("editBox").style.display = "none";
  document.getElementById("subGroupEditBox").style.display = "flex";

  document.querySelector(".groupDiv").classList.remove("groupDivClicked");
  document.getElementById("msgInp").value = "";

  var sub_group_id = localStorage.getItem("subgroup_id");
  var user_id = localStorage.getItem("user_id");
  var group_id = localStorage.getItem("group_id");

  const url = `${globalURl}/get_sub_group_messages/${group_id}/${sub_group_id}/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON?.parse(xhr.responseText);
      if(userData.adminis == "yes"){
        document.getElementById("Subgroup_delete_current_group").style.display = "block"
      }
      else{
        document.getElementById("Subgroup_delete_current_group").style.display = "none"
      }
      document.getElementById('subgroup_name').innerHTML =  userData.sub_group_name?.length > 15 ? `#${userData.sub_group_name.slice(0, 15)}...` : `#${userData.sub_group_name}` + ` <i class="fas fa-sort-down"></i>`
      console.log(tempVariable)
      if(tempVariable){
        if(userData.totalNotifications > 0){
          tempVariable.innerText = userData.totalNotifications
        }
        else{
          tempVariable.remove()
        }
      }
      tempVariable = null
      prospecting = userData.totalNotifications - userData.non_prospect_notifications
      if(prospecting > 0){
        document.getElementById("showprospectBox").style.color = "red"
      }
      else{
        document.getElementById("showprospectBox").style.color = "#084dd1"
      }
      
      // document.getElementById('nameofgroup').innerHTML = `${userData.sub_group_topic.length > 10 ? `${userData.sub_group_topic.slice(0,10)}` : `${userData.sub_group_topic}`}` 
       document.getElementById('nameofgroup').innerHTML = userData.sub_group_topic

      document.getElementById('heading_group').innerHTML = userData.sub_group_name?.length > 20 ? `${userData.sub_group_name.slice(0, 20)}...` : userData.sub_group_name
      localStorage.removeItem("Subgroup_name");
      localStorage.setItem("Subgroup_name",userData.sub_group_name?.length > 15 ? `${userData.sub_group_name.slice(0, 15)}...` : userData.sub_group_name)
      document.getElementById("opening_description_here").style.display = "block"
      document.getElementById('admin_name').innerHTML = userData.admin

      
      document.getElementById('created_at_date').innerHTML = " created this subgroup on " + userData.month

      
      document.getElementById('description').innerHTML = `${userData.sub_group_description ? `${userData.sub_group_description}` : `"No description added"`}`
      
      document.getElementById('subgroup_group_setting_topic').innerText = userData.sub_group_topic


      document.getElementById("notify_img_second").style.display = "none";
  document.getElementById("subgroup_notify_img_second").style.display = "block";
  
      document.querySelector(".rightUperRight").style.height = "60px";
      document.querySelector(".rightBox").style.display = "none";
      document.querySelector(".groupContainer").style.display = "none";
      document.querySelector(".rightUperRight").innerHTML = "";
      document.querySelector(".rightUpperBox").style.display = "none";
      document.querySelector(".chatMessageContent").style.display = "block";
      document.querySelector(".chatControlBtn").style.display = "block";
      document.getElementById("sendMsgBtn").style.display = "none";
      document.getElementById("sendGroupMsgBtn").style.display = "none";
      document.getElementById("sendSubGroupMsgBtn").style.display = "block";
      document.querySelector(".rightProspectBox").style.display = "flex";

      document.querySelector(".chatMessageContent").style.height = "240px";

      groupUsersArr = userData.users;

      // if (userData.admin == true) {
      //   document.getElementById("deleteBox").innerText = "Delete Sub Group";
      //   document.getElementById("deleteBox").style.display = "flex";
      // } else {
      //   document.getElementById("deleteBox").innerText = "Delete Group";
      //   document.getElementById("deleteBox").style.display = "none";
      // }

      document.getElementById(
        "groupNamePara"
      ).innerHTML = `<span style='color: #084DD1;'>Group Name: </span>${userData.group_name?.length > 10
        ? `${userData.group_name.slice()} ...`
        : userData.group_name
      } `;

      document.getElementById("subGroupNamePara").style.display = "block";

      document.getElementById(
        "subGroupNamePara"
      ).innerHTML = `<span style='color: #084DD1;'>Sub Group Name: </span>${userData.sub_group_name?.length > 10
        ? `${userData.sub_group_name.slice()} ...`
        : userData.sub_group_name
      }`;

      if (userData.group_name) {
        localStorage.setItem("group_name", userData.group_name);
      }

      if (userData.sub_group_name) {
        localStorage.setItem("sub_group_name", userData.sub_group_name);
      }
      document.getElementById("subgroup_setting_name").innerText =  userData.sub_group_name?.length > 15 ? `${userData.sub_group_name.slice(0, 15)}...` : userData.sub_group_name; 
      document.getElementById("Subgroup_group_setting_name_sub").innerText =  userData.sub_group_name;
      document.getElementById("Subgroup_group_setting_description").innerText =  userData.sub_group_description;
      document.getElementById("Subgroup_created_by").innerText =  userData.admin +" on " + userData.month + ",2022";
      document.getElementById("Subgroup_group_name_in_settings").innerText =  userData.sub_group_name;

      document.getElementById("Subgroup_opening_members").innerText = "Members "+ userData.users_count
      
      
      

      document.querySelector(".showBtnContainer").innerHTML = "";
      document.querySelector(".showBtnContainer").innerHTML = `
      <button id="showMembers">Members</button>
      <button id="showSubGroupProspectBox">Prospects</button>
      <button id="showSubGroupDirectBox">Group Chat</button>
      `;

      if (userData.data) {
        var temp
        var counting_days = 1
        document.getElementById("new_chat_box").innerHTML = '';
        
        userData.data?.map((obj, i) => {
          if (obj.text != null) {
            localStorage.removeItem("lastDate")
              let dbTime = obj.created_at;

              let newDate = new Date();

              var ajjtareekh
              if( (newDate.getUTCMonth()+1) < 10 && newDate.getUTCDate() < 10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+'0'+newDate.getUTCDate();
              }
              else if( (newDate.getUTCMonth()+1) < 10 &&  newDate.getUTCDate() >=10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+newDate.getUTCDate();
              }
              else if( (newDate.getUTCMonth()+1) >= 10 &&  newDate.getUTCDate() < 10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+'0'+newDate.getUTCDate();
              }
              else{
                ajjtareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+newDate.getUTCDate();
              }

              var kalltareekh
              if( (newDate.getUTCMonth()+1) < 10 && (newDate.getUTCDate()-1) < 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+'0'+(newDate.getUTCDate()-1);
              }
              if( (newDate.getUTCMonth()+1) < 10 && (newDate.getUTCDate()-1) >= 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+(newDate.getUTCDate()-1);
              }
              if( (newDate.getUTCMonth()+1) >= 10 && (newDate.getUTCDate()-1) < 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+'0'+(newDate.getUTCDate()-1);
              }
              else{
                kalltareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+(newDate.getUTCDate()-1);
              }
          myDate = dbTime.split(" ");
          console.log(ajjtareekh,"ajj")
          console.log(kalltareekh,"kall")
          console.log(myDate[0],"DB")
          console.log(temp,"temp")

          if(temp == myDate[0]){
                counting_days = counting_days + 1;
          }
          else{
            if(ajjtareekh == myDate[0]){
              document.getElementById("new_chat_box").innerHTML += `<div class="date-Wraper position-relative mb-3">
              <div class="today-date">Today</div>
              </div>`;
              counting_days = counting_days + 1
            }
            else if (kalltareekh == myDate[0]) {
              document.getElementById("new_chat_box").innerHTML += `<div class="date-Wraper position-relative mb-3">
              <div class="today-date">Yesterday</div>
              </div>`;
              counting_days = counting_days + 1
            }
            else {
              document.getElementById("new_chat_box").innerHTML += `<div class="date-Wraper position-relative mb-3">
                <div class="today-date">${myDate[0]}</div>
                </div>`;
                counting_days = counting_days + 1;
            }
            
            temp = myDate[0];

          }
          localStorage.setItem("lastDate",temp)

              let UTCDate = new Date(
                newDate.getUTCFullYear(),
                newDate.getUTCMonth(),
                newDate.getUTCDate(),
                newDate.getUTCHours(),
                newDate.getUTCMinutes(),
                newDate.getUTCSeconds(),
                newDate.getUTCMilliseconds()
              );

              let currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

              let futureTime = Math.abs(
                (new Date(dbTime).getTime() / 1000).toFixed(0)
              );

              let TimeDifference = currentTime - futureTime;

              let days = Math.floor(TimeDifference / 86400);

              let hours = Math.floor(TimeDifference / 3600) % 24;

              let minutes = Math.floor(TimeDifference / 60) % 60;

              let seconds = Math.floor(TimeDifference % 60);

              let messageTimeString = "";

              if (days == 0) {
                if (hours == 0) {
                  if (minutes == 0) {
                    if (seconds == 0) {
                      messageTimeString = `less than a second ago`;
                    } else {
                      messageTimeString =
                        seconds == 1
                          ? `${seconds} second ago`
                          : `${seconds} seconds ago`;
                    }
                  } else {
                    messageTimeString =
                      minutes == 1
                        ? `${minutes} minute ago`
                        : `${minutes} minutes ago`;
                  }
                } else {
                  messageTimeString =
                    hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                }
              } else {
                messageTimeString =
                  days == 1 ? `${days} day ago` : `${days} days ago`;
              }

              let messageReplyTimeString = "";

          if(obj.reply_msg != null){

            let dbTime = obj.reply_created_at;

            let newDate = new Date();
  
            let UTCDate = new Date(
              newDate.getUTCFullYear(),
              newDate.getUTCMonth(),
              newDate.getUTCDate(),
              newDate.getUTCHours(),
              newDate.getUTCMinutes(),
              newDate.getUTCSeconds(),
              newDate.getUTCMilliseconds()
            );
  
            let currentTime = Math.abs(
              (UTCDate.getTime() / 1000).toFixed(0)
            );
  
            let futureTime = Math.abs(
              (new Date(dbTime).getTime() / 1000).toFixed(0)
            );
  
            let TimeDifference = currentTime - futureTime;
  
            let days = Math.floor(TimeDifference / 86400);
  
            let hours = Math.floor(TimeDifference / 3600) % 24;
  
            let minutes = Math.floor(TimeDifference / 60) % 60;
  
            let seconds = Math.floor(TimeDifference % 60);
  
  
            if (days == 0) {
              if (hours == 0) {
                if (minutes == 0) {
                  if (seconds == 0) {
                    messageReplyTimeString = `less than a second ago`;
                  } else {
                    messageReplyTimeString =
                      seconds == 1
                        ? `${seconds} second ago`
                        : `${seconds} seconds ago`;
                  }
                } else {
                  messageReplyTimeString =
                    minutes == 1
                      ? `${minutes} minute ago`
                      : `${minutes} minutes ago`;
                }
              } else {
                messageReplyTimeString =
                  hours == 1
                    ? `${hours} hour ago`
                    : `${hours} hours ago`;
              }
            } else {
              messageReplyTimeString =
                days == 1 ? `${days} day ago` : `${days} days ago`;
            }

            console.log('reply_msg',messageReplyTimeString)


          }
          document.getElementById("new_chat_box").innerHTML += `
          <div class="card my-2 rounded">
                    <div
                      class="card-body p-2 px-2 d-flex justify-content-between align-items-center"
                    >
                      <div class="row">
                        <div class="img-p">
                          <img
                            src="${obj.image}"
                            alt=""
                            class="img-fluid rounded-circle"
                          />
                        </div>
                        <div class="card-left-content-box">
                          <div
                            class="font-weight-bold name-top"
                            style="font-size: 12px"
                          >
                          <span class='nameIssue' title='${obj.username}'>
                          ${obj.username}
                          </span>
                            <span
                              class="time"
                              style="
                                padding-left: 15px;
                                font-size: 8px;
                                line-height: 10px;
                                color: #636363;
                                font-weight: 400;
                              "
                              >${messageTimeString}</span
                            >
                          </div>
                          <div class="msg-box-chat">
                          ${obj.text}
                          </div>



                          ${ obj.name ? `
                    
                          <div class="prospects_shared_box" style="
   position: relative;
   ">
   <div class="row" style="
      align-items: center;
      justify-content: left;
      flex-wrap: nowrap;
      height: 36px;
      padding-bottom: 5px;
      ">
      <div class="" style="
         margin: auto 6px auto 21px;
         ">
         <img src="${obj.prospect_image}" alt="profile-img">
      </div>
      <div class="">
         <h3 class="title" style="
            margin-bottom: 0;
            font-size: 9px;
            line-height: 10px;
            font-weight: 800;
            margin-top: 4px;
            ">${obj.name.length > 12 ? `${obj.name.slice(0,12)}....` : `${obj.name}`}</h3>
         <p class="desc" style="
            width: 127px;
            font-size: 10px;
            ">${obj.description.length > 15 ? `${obj.description.slice(0,15)}....` : `${obj.description}`}</p>
      </div>
   </div>
   <div class="social-btn-box" style="
      position: absolute;
      top: -3px;
      right: 7px;
      ">
      ${obj.delete_status == 0 ? `
      <button data-id=${obj.temporary_id} data-title="View Prospect Chat"  class="opening_perspective" style="
      border: 0;
      background: none;
      cursor:pointer;
      ">
      <img class="new_class" style="width: 18px;
      height: 18px;
      object-fit: cover;
      border-radius: 50%;" src="./Assets/img/chat_redirect.png">
   </button>
      ` : ``}
      
      
      <button data-url=${obj.url} data-title="View LinkedIn Profile" class="opening_background" style="
         border: 0;
         background: none;
         cursor:pointer;
         ">
         <img class="new_class" style="width: 14px;
         height: 14px;
         object-fit: cover;
         border-radius: 50%;" src="./Assets/img/open_prospect.svg">
      </button>
      <a href="#modal-12" data-title="View Prospect" data-prospect-id=${obj.temporary_id} data-id=${obj.sender_id} data-url=${obj.url} class="opening_clipper" style="
         border: 0;
         background: none;
         cursor:pointer;
         ">
         <img class="new_class" style="width: 14px;
         height: 14px;
         object-fit: cover;
         border-radius: 50%;" src="./Assets/img/open_background.svg">
      </a>
   </div>
</div> ` : `` }




                        </div>
                      </div>
                      ${ obj.name ? `
                      <span class="updating_text" style="display:none">${obj.text}</span> 

                      <button
                      class="border-0 bg-transparent f-10 pointer position-absolute dropdown-btn"
                       style="top: 8px; right: 8px" >
                       <i class="fas fa-ellipsis-v"></i>
                       <div class='dropdown-list'>
                       <span data-replied_id=${obj.id} class="message_delete_button">Delete</span>
                       </div>
                       </button>
                      ` : `<button
                      class="border-0 bg-transparent f-10 pointer position-absolute dropdown-btn"
                       style="top: 8px; right: 8px" >
                       <i class="fas fa-ellipsis-v"></i>
                       <div class='dropdown-list'>
                       <span data-replied_id=${obj.id} class="message_edit_button">Edit</span>
                       <span data-replied_id=${obj.id} class="message_delete_button">Delete</span>
                       <span class="updating_text" style="display:none">${obj.text}</span>
                       </div>
                       </button>` }
                    </div>
                    ${
                      obj.reply_msg ? 
                      
                      `<div class="card card-child">
                      <div class="card-body p-0 m-0">
                        <div class="d-flex w-100" style="justify-content: space-evenly">
                          <div class="img-p">
                            <img src="${obj.reply_image}" alt="" class="img-fluid rounded-circle" />
                          </div>
                          <div class="card-left-content-box bg-transparent" style="width: 135px">
                            <div class="font-weight-bold name-top" style="font-size: 10px">
                              ${obj.reply_username}
                              <span class="time" style="
                                    padding-left: 8px;
                                    font-size: 6px;
                                    line-height: 8px;
                                    color: #636363;
                                    font-weight: 400;
                                  ">${messageReplyTimeString}</span>
                            </div>
                            <div class="msg-box-chat" style="font-size: 7px">
                              ${obj.reply_msg}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>`
                    :
                    ""
                    }
                      
                    <div data-replied_id=${obj.id} class="reply-box">&#x2923; Reply</div>
                  </div>
          `
          document.querySelectorAll(".opening_perspective").forEach((ele) => {
            ele.addEventListener("click", (e) => {
              let currentMessage = e.currentTarget
              let message_id = currentMessage.getAttribute("data-id");
              
              localStorage.setItem("prospect_id",message_id);
              showProspectChat();
              
              console.log("perspective")
            });
          });
          document.querySelectorAll(".opening_clipper").forEach((ele) => {
            ele.addEventListener("click", (e) => {

                            var profile_link = e.currentTarget.getAttribute("data-url");
                            var user_id = e.currentTarget.getAttribute("data-id");
                            var prospect_id = e.currentTarget.getAttribute("data-prospect-id");
                            var sending_id = localStorage.getItem("user_id");

                            const url = `${globalURl}/get_prospect_Data`;

                              let xhr = new XMLHttpRequest();

                              xhr.open("POST", url, true);
                              xhr.setRequestHeader("Content-Type", "application/json");
                              xhr.send(
                                JSON.stringify({
                                  prospect_id,
                                  user_id: sending_id,
                                })
                              );

                              xhr.onreadystatechange = function () {
                                if (xhr.readyState == 4 && xhr.status == 200) {
                                  let userData = JSON.parse(xhr.responseText);
                                  if (userData.data) {
                                    if(userData.data.prospect_status == "no"){
                                      document.getElementById("send_CRM").style.display = "none";
                                    }
                                    else{
                                      document.getElementById("send_CRM").style.display = "block";
                                      document.getElementById("prospect_status_image").value = userData.data.prospect_status_image;
                                      document.getElementById("prospect_status_name").value = userData.data.prospect_status_name;;
                                    }
                                    document.querySelector(".prospect_name_heading_comment").innerText = userData.data.name
                                    document.getElementById("prospect_image_heading_comment").src = userData.data.image
                                    document.querySelector(".desigination_comment").innerText = `${userData.data.description.length > 30 ? `${userData.data.description.slice(0,30)}....` : `${userData.data.description}`}`;
                                    document.querySelector(".prospect_group_name_comment").innerText = userData.data.company
                                    document.querySelector(".prospect_subgroup_name_comment").innerText = userData.data.address
                                    document.querySelector(".prospect_subgroup_status_comment").innerText = userData.data.status
                                    document.querySelector(".notes_comment").innerText = `${userData.data.notes == null ? `Notes not added` : `${userData.data.notes}`}`  
                                  }
                                    
                                  
                                }
                              }
              

              



              localStorage.setItem("commentID", JSON.stringify(commentArray));
                document.querySelector(".taggedUser").innerHTML = "";
                document.getElementById("comment_box").value = "";
                document.getElementById("temporary_sender").value = user_id;
                document.getElementById("temporary_url").value = profile_link;
                document.getElementById("temporary_prospect_id").value = prospect_id;


                var access_token = localStorage.getItem("access_token");
                var username = localStorage.getItem("username");

                if (access_token && username) {
                  document.getElementById("comment_box").disabled = false;

                  setTimeout(() => {
                    const url = `${globalURl}/getComments`;

                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", url, true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(
                      JSON.stringify({
                        profile_link: profile_link,
                        secondary_id: user_id,
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


                            

              
            });
          });

          document.querySelectorAll(".opening_background").forEach((ele) => {
            ele.addEventListener("click", (e) => {
              let currentMessage = e.currentTarget
              let message_id = currentMessage.getAttribute("data-url");
              let params = {
                active: true,
                currentWindow: true,
              };
              chrome.tabs.query(params, gotTab);
      
              function gotTab(tabs) {
                let msg = {
                  txt: message_id,
                };
                chrome.tabs.sendMessage(tabs[0].id, msg);
              }
              console.log("background")
            });
          });
          document.querySelectorAll(".reply-box").forEach((ele) => {
            ele.addEventListener("click", (e) => {
              // dynamicModalClose();
              // showNullChats();
              localStorage.removeItem("edit_id");
              document.getElementById("send_message_div").value = null;
              document.getElementById("send_message_button").style.display = "block";
              document.getElementById("update_message_button").style.display = "none";
              document.getElementById("cancel_message_button").style.display = "none";
              let currentMessage = e.currentTarget
              console.log(currentMessage);
              let message_id = currentMessage.getAttribute("data-replied_id");
              console.log(message_id);
              localStorage.setItem("replied_id", message_id)

              document.querySelector(".edit-text-msg-box").style.display = "block"
              // document.getElementById("update_message_button").style.display = "block"
              // document.getElementById("cancel_message_button").style.display = "block"

              currentMessage = e.currentTarget.parentElement
              console.log(currentMessage);
              let message = currentMessage.querySelector(".updating_text").innerHTML;
              console.log(message);
               let name = currentMessage.querySelector(".font-weight-bold").innerText
              // currentMessage = e.currentTarget.parentElement


              document.querySelector(".name-edit-box").innerText = name
              document.querySelector(".msg").innerHTML = message

              // document.getElementById("send_message_div").value = message

              console.log("Reply")
            });
          });

          document.querySelectorAll(".message_edit_button").forEach((ele) => {
            ele.addEventListener("click", (e) => {
              // dynamicModalClose();
              // showNullChats();
              document.querySelector(".edit-text-msg-box").style.display ="none";
              localStorage.removeItem("replied_id");
              let currentMessage = e.currentTarget
              console.log(currentMessage);
              let message_id = currentMessage.getAttribute("data-replied_id");
              console.log(message_id);
              localStorage.setItem("edit_id", message_id)

              document.getElementById("send_message_button").style.display = "none"
              document.getElementById("update_message_button").style.display = "block"
              document.getElementById("cancel_message_button").style.display = "block"

              currentMessage = e.currentTarget.parentElement
              console.log(currentMessage);
              let message = currentMessage.querySelector(".updating_text").innerHTML;
              console.log(message);

              document.getElementById("send_message_div").value = message

              console.log("edit")
            });
          });


          document.querySelectorAll(".message_delete_button").forEach((ele) => {
            ele.addEventListener("click", (e) => {
              // dynamicModalClose();
              // showNullChats();
              let currentMessage = e.currentTarget
              console.log(currentMessage);
              let message_id = currentMessage.getAttribute("data-replied_id");
              console.log(message_id);

              MessageDeleteModal.style.transform = "scale(1)";
              MessageDeleteModal.style.opacity = 1;
              document.getElementById("temporary_buttons").innerHTML = `
              <button id="closeIt" class="btn btn-light-new">Cancel</button>
              <button data-replied_id=${message_id} id="confirmation_delete" class="btn btn-danger-new">Delete</button>
              `
              if (document.getElementById("closeIt")) {
                document
                  .getElementById("closeIt")
                  .addEventListener("click", closeSubGroupModal);
              }
              document.getElementById("confirmation_delete").addEventListener("click", () => {
                deleteGroupMessage();
              });
              console.log("delete")
            });
          });


          document.getElementById("send_message_div").value = ''
          document.getElementById("send_message_button").style.display = "block"
          document.getElementById("update_message_button").style.display = "none"
          document.getElementById("cancel_message_button").style.display = "none"
    
             

            // chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
          }
        });
      }
      else{
        localStorage.removeItem("lastDate")
        console.log("nothing in sub")
        document.getElementById("new_chat_box").innerHTML = ``
        // here
        // let newDate = new Date();
        // var ajjtareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+'0'+newDate.getUTCDate();
        // localStorage.setItem("lastDate",ajjtareekh);



        
      }


      document.getElementById("bottom-content-box").scroll(0,document.getElementById("new_chat_box").scrollHeight);

      document.getElementById("subgroup_view_members").innerHTML = ``
      document.getElementById("subgroup_notify_img_second").innerHTML = ``
      var count = 1;
      subgroupmembersArr = [];
      if (userData.users) {
        
        userData.users.length > 0 && userData?.users.map((ele) => {
          if(count <= 3){
            document.getElementById("subgroup_notify_img_second").innerHTML += ` <a href="#"><img src="${ele.image}" alt="" /></a>`
          }
          count = count + 1;
          let member = {
            "id": ele.id,
            "name": ele.name,
            "image": ele.image,
          }
          subgroupmembersArr.push(member);
          console.log(subgroupmembersArr);
          console.log(member);

          if (userData.admin == ele.name) {
            document.getElementById("subgroup_view_members").innerHTML += `
            <div class="chatContent" >
            <div
              class="defaultIcon"
              style="border: none; margin-left: 10px"
            >
              <img
                src="${ele.image}"
              />
            </div>
  
            <h1 class="userEmail">
            ${ele.name} <br />
              <span class="role">Admin</span>
            </h1>
  
            <button
              class="border-0 bg-transparent f-10 pointer position-absolute on_hover-Child_show"
              style="right: 3.5%"
            >
              <i class="fas fa-ellipsis-v"></i>
              <div class="dropdown-list_another"
              
              >
                        <span  class="Add_admin_button">Make Admin</span>
                        <span  class="Remove_submember_button">Remove</span>

                        </div>
            </button>
          </div>
            `
          } else {
            document.getElementById("subgroup_view_members").innerHTML += `
            <div class="chatContent" >
            <div
              class="defaultIcon"
              style="border: none; margin-left: 10px"
            >
              <img
                src="${ele.image}"
              />
            </div>
  
            <h1 class="userEmail">
            ${ele.name} <br />
              <span class="role">Member</span>
            </h1>
  
            <button
              class="border-0 bg-transparent f-10 pointer position-absolute on_hover-Child_show"
              style="right: 3.5%"
            >
              <i class="fas fa-ellipsis-v"></i>
              <div class="dropdown-list_another">
              <span  class="Add_admin_button">Make Admin</span>
              <span date-remove_id=${ele.id}  class="Remove_submember_button">Remove</span>
                        </div>
            </button>
          </div>
            `

            var i = setInterval(() => {

              document.querySelectorAll(".Remove_submember_button").forEach((ele) => {
                ele.addEventListener("click", (e) => {
                  console.log('in remove It')

                    console.log("hi");
                  localStorage.removeItem("replied_id");
                  group_id = localStorage.getItem("group_id");
                  user_id = localStorage.getItem("user_id");
                  subgroup_id = localStorage.getItem("subgroup_id")
                  let currentMessage = e.currentTarget
                  console.log(currentMessage);
                  let message_id = currentMessage.getAttribute("date-remove_id");
                  console.log(message_id);
  
                  
                    const url = `${globalURl}/remove_members_to_subgroup`;
                
                    let xhr = new XMLHttpRequest();
                
                    xhr.open("POST", url, true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(
                      JSON.stringify({
                        group_id,
                        message_id,
                        user_id,
                        subgroup_id,
                      })
                    );
                
                    xhr.onreadystatechange = function () {
                      if (xhr.readyState == 4 && xhr.status == 200) {
                        let userData = JSON.parse(xhr.responseText);
                
                        if (userData.status == "Removed") {
                          console.log('in removed It')

                          nullSubGroupChats()
                
                        }
                        else {
                          
                        }
                
                
                
                      }
                    };
                
              
  
  
                })
              })
              clearInterval(i)
            }, 300)

          }

        });

      }
      localStorage.removeItem("subgroupmembersArr")
      localStorage.setItem("subgroupmembersArr", JSON.stringify(subgroupmembersArr));

      // groupmembersArr = [];
      // if (userData.users) {
      //   document.getElementById("view_members").innerHTML = ``
      //   userData.users.length > 0 && userData?.users.map((ele) => {
      //     let member = {
      //       "name": ele.name,
      //       "image": ele.image,
      //     }
      //     groupmembersArr.push(member);
      //     console.log(groupmembersArr);
      //     console.log(member);

      //     if (userData.admin == ele.name) {
      //       document.getElementById("view_members").innerHTML += `
      //       <div class="chatContent" date-linkedid="3">
      //       <div
      //         class="defaultIcon"
      //         style="border: none; margin-left: 10px"
      //       >
      //         <img
      //           src="${ele.image}"
      //         />
      //       </div>
  
      //       <h1 class="userEmail">
      //       ${ele.name} <br />
      //         <span class="role">Admin</span>
      //       </h1>
  
      //       <button
      //         class="border-0 bg-transparent f-10 pointer position-absolute"
      //         style="right: 3.5%"
      //       >
      //         <i class="fas fa-ellipsis-v"></i>
      //       </button>
      //     </div>
      //       `
      //     } else {
      //       document.getElementById("view_members").innerHTML += `
      //       <div class="chatContent" date-linkedid="3">
      //       <div
      //         class="defaultIcon"
      //         style="border: none; margin-left: 10px"
      //       >
      //         <img
      //           src="${ele.image}"
      //         />
      //       </div>
  
      //       <h1 class="userEmail">
      //       ${ele.name} <br />
      //         <span class="role">Member</span>
      //       </h1>
  
      //       <button
      //         class="border-0 bg-transparent f-10 pointer position-absolute"
      //         style="right: 3.5%"
      //       >
      //         <i class="fas fa-ellipsis-v"></i>
      //       </button>
      //     </div>
      //       `
      //     }

      //   });

      // }






      document.querySelector(".dynamicContainer").innerHTML = ``
      groupprospectsArr = [];
      document.getElementById("showprospectBox").innerText = "Prospect:" + userData.total_prospect
      document.getElementById("showprospectsanother").innerText = "Prospect:" + userData.total_prospect
      if (userData.prospects) {
        localStorage.removeItem("prospects_data")
        userData.prospects.map((ele) => {
          let prospect = {
            "id": ele.prospect_id,
            "name": ele.prospect_data.name,
            "image": ele.prospect_data.image,
            "sender_name": ele.sender_name,
            "database": ele.database,
            "notification": ele.notifications,
          }
          groupprospectsArr.push(prospect);
          console.log(groupmembersArr);
          console.log(prospect);
          if (ele.prospect_data) {               
            document.querySelector(".dynamicContainer").innerHTML += `
  
                  <div class="prospectContentContainer">
                    <div class="prospectContent" data-prospect_id=${ele.prospect_id
              }>
                                
                      <img src=${ele.prospect_data.image ? `${ele.prospect_data.image}` : `./Assets/img/user.png`} alt=""/>
              
                      <div>
                        <h1>${ele.prospect_data.name}</h1>
                        <h2>${ele.sender_name != null
                ? `By ${ele.sender_name} ${ele.database != null
                  ? `from ${ele.database}`
                  : ""
                }`
                : ""
              }
                        </h2>
                      </div>
              
                      ${ele.notifications != 0 && ele.notifications != null
                ? `<span>${ele.notifications}</span>`
                : ""
              }
  
                    </div>
                    <i class="fas fa-trash prospectDeleteIcon groupProspectDelete"></i>
                    </div>
                    `;
          }
        });



        document.querySelectorAll(".groupProspectDelete").forEach((ele) => {
          ele.addEventListener("click", groupProspectDelete);
        });

        document.querySelectorAll(".prospectContent").forEach((element) => {
          element.addEventListener("click" , () => { 
            var console = element.getAttribute("data-prospect_id")
            localStorage.setItem("prospect_id",console);
            showProspectChat();
        });
      })
        localStorage.setItem("prospects_data", JSON.stringify(groupprospectsArr))
        groupprospectsArr = [];
      } else {

      }
      getAllMembers()

      
    }
  };
}

function subGroupProspectDelete(e) {
  let currentProspect = e.currentTarget.parentElement;

  let group_id = localStorage.getItem("group_id");
  let sub_group_id = localStorage.getItem("subgroup_id");
  let prospect_id = currentProspect
    .querySelector(".prospectContent")
    .getAttribute("data-prospect_id");

  const url = `${globalURl}/delete_group_prospect`;

  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      prospect_id,
      group_id,
      sub_group_id
    })
  );

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.status == "Deleted") {
        openSubGroupMembersModal();
      }
    }
  };
}

if (document.getElementById("subGroupMembersModalCloseBtn")) {
  document
    .getElementById("subGroupMembersModalCloseBtn")
    .addEventListener("click", closeSubGroupMembersModal);
}

function closeSubGroupMembersModal() {
  document.getElementById("subGroupMembersModal").style.transform = "scale(0)";
  document.getElementById("subGroupMembersModal").style.opacity = 0;
}

if (document.getElementById("sendSubGroupMsgBtn")) {
  document
    .getElementById("sendSubGroupMsgBtn")
    .addEventListener("click", send_sub_group_message);
}

function send_sub_group_message() {
  document.querySelectorAll(".menuBox").forEach((ele) => {
    ele.style.display = "none";
  });

  let msgInp = document.getElementById("msgInp");

  if (msgInp.value !== "") {
    if (
      document.getElementById("updateSubGroupMsgBtn").style.display == "none"
    ) {
      var user_id = localStorage.getItem("user_id");
      var group_id = localStorage.getItem("group_id");
      var prospect_id = localStorage.getItem("prospect_id");
      var replied_id = localStorage.getItem("replied_id");
      var sub_group_id = localStorage.getItem("sub_group_id");

      const url = `${globalURl}/send_subgroup_message`;

      let xhr = new XMLHttpRequest();

      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          user_id,
          group_id,
          prospect_id,
          sub_group_id,
          text: msgInp.value,
          replied_id,
        })
      );

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let userMessages = JSON.parse(xhr.responseText);
          document.querySelector(".prospect_edit-text-msg-box").style.display ="none";
  localStorage.removeItem("replied_id");

          let chatMessageContent = document.querySelector(
            ".chatMessageContent"
          );

          if (userMessages.data.length > 0) {
            document.getElementById("sendMsgBtn").style.display = "none";
            document.getElementById("sendGroupMsgBtn").style.display = "none";
            document.getElementById("sendSubGroupMsgBtn").style.display =
              "block";
            document.getElementById("updateSubGroupMsgBtn").style.display =
              "none";
            document.getElementById("cancelSubGroupMsgBtn").style.display =
              "none";
            document.getElementById("msgInp").value = "";

            userMessages.data.map((obj, i) => {
              if (obj.sender_id == user_id) {
                let dbTime = obj.created_at;

                let newDate = new Date();

                let UTCDate = new Date(
                  newDate.getUTCFullYear(),
                  newDate.getUTCMonth(),
                  newDate.getUTCDate(),
                  newDate.getUTCHours(),
                  newDate.getUTCMinutes(),
                  newDate.getUTCSeconds(),
                  newDate.getUTCMilliseconds()
                );

                let currentTime = Math.abs(
                  (UTCDate.getTime() / 1000).toFixed(0)
                );

                let futureTime = Math.abs(
                  (new Date(dbTime).getTime() / 1000).toFixed(0)
                );

                let TimeDifference = currentTime - futureTime;

                let days = Math.floor(TimeDifference / 86400);

                let hours = Math.floor(TimeDifference / 3600) % 24;

                let minutes = Math.floor(TimeDifference / 60) % 60;

                let seconds = Math.floor(TimeDifference % 60);

                let messageTimeString = "";

                if (days <= 0) {
                  if (hours == 0) {
                    if (minutes == 0) {
                      if (seconds == 0) {
                        messageTimeString = `less than a second ago`;
                      } else {
                        messageTimeString =
                          seconds == 1
                            ? `${seconds} second ago`
                            : `${seconds} seconds ago`;
                      }
                    } else {
                      messageTimeString =
                        minutes == 1
                          ? `${minutes} minute ago`
                          : `${minutes} minutes ago`;
                    }
                  } else {
                    messageTimeString =
                      hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                  }
                } else {
                  messageTimeString =
                    days == 1 ? `${days} day ago` : `${days} days ago`;
                }

                let row = `
                <div class='senderMsgContainer'>
                    
                <div class='myMessageDiv'>
                
                <div class="imageNameContainer">
                
                    <span class="senderName">${obj.username}</span>
                    <img src="${obj.image}" class='messageImage'/>
                  
                  </div>
                  <i class="far fa-ellipsis-v menuGroupIcon"></i>
  
                    <div class='menuBox' style="display: none">
                      <div class='editContainer editSubGroupContainer'>
                        <i class="far fa-edit"></i>
                        <h1>Edit</h1>
                      </div>
                      <div class="deleteContainer deleteSubGroupContainer">
                        <i class="far fa-trash"></i>
                        <h1>Delete</h1>
                      </div>
                    </div>
                      ${obj.replied_id != null
                    ? `<div class="prospectReplyDiv">
                          <div class="prospectContentDiv">
                            <h1>${obj.reply_msg != null
                      ? `<h1>${obj.reply_msg}</h1>`
                      : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                    }</h1>
                          </div>
                          ${obj.reply_image != null
                      ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                      : ""
                    }
                        </div>`
                    : ""
                  }
  
                      <i class="fas fa-reply myReplyIcon"></i>
  
                      <p class="messageTxt" data-replied_id=${obj.id}>${obj.text
                  }</p>
                      <div class="timestampDiv">
                        ${messageTimeString}
                      </div>
                    </div>
  
                </div>
                `;
                chatMessageContent.innerHTML += row;

                setTimeout(() => {
                  document.querySelectorAll(".menuGroupIcon").forEach((ele) => {
                    ele?.addEventListener("click", openSubGroupThreeDotMenu);
                  });
                }, 100);

                setTimeout(() => {
                  document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                    ele.addEventListener("click", replyToMessageFn);
                  });
                }, 100);
              } else {
                let dbTime = "";
                let newDate = "";
                let UTCDate = "";
                let currentTime = "";
                let futureTime = "";
                let TimeDifference = "";
                let days = "";
                let hours = "";
                let minutes = "";
                let seconds = "";
                let messageTimeString = "";

                newDate = new Date();

                dbTime = obj.created_at;

                UTCDate = new Date(
                  newDate.getUTCFullYear(),
                  newDate.getUTCMonth(),
                  newDate.getUTCDate(),
                  newDate.getUTCHours(),
                  newDate.getUTCMinutes(),
                  newDate.getUTCSeconds(),
                  newDate.getUTCMilliseconds()
                );

                currentTime = Math.abs((UTCDate.getTime() / 1000).toFixed(0));

                futureTime = Math.abs(
                  (new Date(dbTime).getTime() / 1000).toFixed(0)
                );

                TimeDifference = currentTime - futureTime;

                days = Math.floor(TimeDifference / 86400);

                hours = Math.floor(TimeDifference / 3600) % 24;

                minutes = Math.floor(TimeDifference / 60) % 60;

                seconds = Math.floor(TimeDifference % 60);

                if (days <= 0) {
                  if (hours == 0) {
                    if (minutes == 0) {
                      if (seconds == 0) {
                        messageTimeString = `less than a second ago`;
                      } else {
                        messageTimeString =
                          seconds == 1
                            ? `${seconds} second ago`
                            : `${seconds} seconds ago`;
                      }
                    } else {
                      messageTimeString =
                        minutes == 1
                          ? `${minutes} minute ago`
                          : `${minutes} minutes ago`;
                    }
                  } else {
                    messageTimeString =
                      hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                  }
                } else {
                  messageTimeString =
                    days == 1 ? `${days} day ago` : `${days} days ago`;
                }

                let row = `
                  <div class="groupUserMsgContainer">
                  
                  
                  <div class='userMessageDiv'>
                  
                  <div class="imageNameContainer1">
                  <img src="${obj.image}" class='messageImage'/>
                      <span class="groupUserName">${obj.username}</span>
                    </div>
  
                    ${obj.replied_id != null
                    ? `<div class="prospectReplyDiv1">
                        <div class="prospectContentDiv" style="${obj.reply_image == null ? "width: 100%;" : ""
                    }">
                          <h1>${obj.reply_msg != null
                      ? `<h1>${obj.reply_msg}</h1>`
                      : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                    }</h1>
                          </div>
                          ${obj.reply_image != null
                      ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                      : ""
                    }
                      </div>`
                    : ""
                  }
  
                      <i class="fas fa-reply replyIcon"></i>
                      
                      <p class="messageTxt" data-replied_id=${obj.id}>${obj.text
                  }</p>
                  
                <div class="timestampUserDiv">
                  ${messageTimeString}
                </div>
  
                    </div>
                    
                  </div>
                `;
                chatMessageContent.innerHTML += row;

                setTimeout(() => {
                  document.querySelectorAll(".replyIcon").forEach((ele) => {
                    ele.addEventListener("click", replyToMessageFn);
                  });
                }, 100);
              }

              chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
            });
          }
          msgInp.value = "";

          replied_id = "";
          localStorage.removeItem("replied_id");

          let replyInterval = setInterval(() => {
            if (document.querySelector(".replyIcon")) {
              clearInterval(replyInterval);
              document.querySelectorAll(".replyIcon").forEach((ele) => {
                ele.classList.remove("replyIconClicked");
              });
            }
            if (document.querySelector(".myReplyIcon")) {
              clearInterval(replyInterval);
              document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                ele.classList.remove("replyIconClicked");
              });
            }
          });
        }
      };
    } else {
      document.getElementById("sendMsgBtn").style.display = "none";
      document.getElementById("updateMsgBtn").style.display = "none";
      document.getElementById("cancelMsgBtn").style.display = "none";
      document.getElementById("sendGroupMsgBtn").style.display = "block";
      document.getElementById("updateGroupMsgBtn").style.display = "none";
      document.getElementById("cancelGroupMsgBtn").style.display = "none";
      document.getElementById("sendSubGroupMsgBtn").style.display = "none";
      document.getElementById("updateSubGroupMsgBtn").style.display = "none";
      document.getElementById("cancelSubGroupMsgBtn").style.display = "none";

      let message_id = localStorage.getItem("message_id");
      let updatedMessage = document.getElementById("msgInp").value;

      const url = `${globalURl}/edit_single_group_chat`;

      let xhr = new XMLHttpRequest();

      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          id: message_id,
          text: updatedMessage,
        })
      );

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let response = JSON.parse(xhr.responseText);
          localStorage.removeItem("message_id");
          if (response.status == "Updated") {
            document.getElementById("msgInp").value = "";

            let nullSubGroupChat = localStorage.getItem("nullSubGroupChat");

            var user_id = localStorage.getItem("user_id");
            var group_id = localStorage.getItem("group_id");
            var sub_group_id = localStorage.getItem("sub_group_id");
            var prospect_id = localStorage.getItem("prospect_id");

            let url = "";

            if (nullSubGroupChat) {
              url = `${globalURl}/get_sub_group_messages/${group_id}/${sub_group_id}/${user_id}`;
            } else {
              url = `${globalURl}/sub_group_chat_filter/${group_id}/${sub_group_id}/${prospect_id}/${user_id}`;
            }

            let xhr = new XMLHttpRequest();

            xhr.open("GET", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();

            xhr.onreadystatechange = function () {
              if (xhr.readyState == 4 && xhr.status == 200) {
                let userData = JSON?.parse(xhr.responseText);

                if (userData.group_name) {
                  localStorage.setItem("group_name", userData.group_name);
                }

                if (userData.sub_group_name) {
                  localStorage.setItem("sub_group_name", userData.sub_group_name);
                }

                document.getElementById(
                  "groupNamePara"
                ).innerHTML = `<span style='color: #084DD1;'>Group Name: </span>${userData.group_name?.length > 10
                  ? `${userData.group_name.slice()} ...`
                  : userData.group_name
                } `;

                document.getElementById("subGroupNamePara").style.display = "block";

                document.getElementById(
                  "subGroupNamePara"
                ).innerHTML = `<span style='color: #084DD1;'>Sub Group Name: </span>${userData.sub_group_name?.length > 10
                  ? `${userData.sub_group_name.slice()} ...`
                  : userData.sub_group_name
                }`;

                if (userData.admin == true) {
                  document.getElementById("deleteBox").innerText = "Delete Sub Group";
                  document.getElementById("deleteBox").style.display = "flex";
                } else {
                  document.getElementById("deleteBox").innerText = "Delete Group";
                  document.getElementById("deleteBox").style.display = "none";
                }

                if (userData.data) {
                  let chatMessageContent = document.querySelector(
                    ".chatMessageContent"
                  );
                  chatMessageContent.innerHTML = "";

                  userData.data.map((obj, i) => {
                    if (obj.text != null) {
                      if (obj.sender_id == user_id) {
                        let dbTime = obj.created_at;

                        let newDate = new Date();

                        let UTCDate = new Date(
                          newDate.getUTCFullYear(),
                          newDate.getUTCMonth(),
                          newDate.getUTCDate(),
                          newDate.getUTCHours(),
                          newDate.getUTCMinutes(),
                          newDate.getUTCSeconds(),
                          newDate.getUTCMilliseconds()
                        );

                        let currentTime = Math.abs(
                          (UTCDate.getTime() / 1000).toFixed(0)
                        );

                        let futureTime = Math.abs(
                          (new Date(dbTime).getTime() / 1000).toFixed(0)
                        );

                        let TimeDifference = currentTime - futureTime;

                        let days = Math.floor(TimeDifference / 86400);

                        let hours = Math.floor(TimeDifference / 3600) % 24;

                        let minutes = Math.floor(TimeDifference / 60) % 60;

                        let seconds = Math.floor(TimeDifference % 60);

                        let messageTimeString = "";

                        if (days == 0) {
                          if (hours == 0) {
                            if (minutes == 0) {
                              if (seconds == 0) {
                                messageTimeString = `less than a second ago`;
                              } else {
                                messageTimeString =
                                  seconds == 1
                                    ? `${seconds} second ago`
                                    : `${seconds} seconds ago`;
                              }
                            } else {
                              messageTimeString =
                                minutes == 1
                                  ? `${minutes} minute ago`
                                  : `${minutes} minutes ago`;
                            }
                          } else {
                            messageTimeString =
                              hours == 1
                                ? `${hours} hour ago`
                                : `${hours} hours ago`;
                          }
                        } else {
                          messageTimeString =
                            days == 1 ? `${days} day ago` : `${days} days ago`;
                        }

                        let row = `
                          <div class='senderMsgContainer'>

                          <div class='myMessageDiv'>

                          <div class="imageNameContainer">

                              <span class="senderName">${obj.username}</span>
                              <img src="${obj.image}" class='messageImage'/>

                            </div>
                            <i class="far fa-ellipsis-v menuGroupIcon"></i>

                          <div class='menuBox' style="display: none">
                            <div class='editContainer editSubGroupContainer'>
                              <i class="far fa-edit"></i>
                              <h1>Edit</h1>
                            </div>
                            <div class="deleteContainer deleteSubGroupContainer">
                              <i class="far fa-trash"></i>
                              <h1>Delete</h1>
                            </div>
                          </div>
                                ${obj.replied_id != null
                            ? `<div class="prospectReplyDiv">
                                    <div class="prospectContentDiv" style="${obj.reply_image == null
                              ? "width: 100%;"
                              : ""
                            }">
                                      <h1>${obj.reply_msg != null
                              ? `<h1>${obj.reply_msg}</h1>`
                              : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                            }</h1>
                                    </div>
                                    ${obj.reply_image != null
                              ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                              : ""
                            }
                                  </div>`
                            : ""
                          }

                                <i class="fas fa-reply myReplyIcon"></i>

                                <p class="messageTxt" data-replied_id=${obj.id
                          }>${obj.text}</p>
                                <div class="timestampDiv">
                                  ${messageTimeString}
                                </div>
                              </div>

                          </div>
                        `;
                        chatMessageContent.innerHTML += row;

                        setTimeout(() => {
                          document
                            .querySelectorAll(".menuGroupIcon")
                            .forEach((ele) => {
                              ele?.addEventListener(
                                "click",
                                openGroupThreeDotMenu
                              );
                            });
                        }, 100);

                        setTimeout(() => {
                          document
                            .querySelectorAll(".myReplyIcon")
                            .forEach((ele) => {
                              ele?.addEventListener("click", replyToMessageFn);
                            });
                        }, 100);
                      } else {
                        let dbTime = obj.created_at;

                        let newDate = new Date();

                        let UTCDate = new Date(
                          newDate.getUTCFullYear(),
                          newDate.getUTCMonth(),
                          newDate.getUTCDate(),
                          newDate.getUTCHours(),
                          newDate.getUTCMinutes(),
                          newDate.getUTCSeconds(),
                          newDate.getUTCMilliseconds()
                        );

                        let currentTime = Math.abs(
                          (UTCDate.getTime() / 1000).toFixed(0)
                        );

                        let futureTime = Math.abs(
                          (new Date(dbTime).getTime() / 1000).toFixed(0)
                        );

                        let TimeDifference = currentTime - futureTime;

                        let days = Math.floor(TimeDifference / 86400);

                        let hours = Math.floor(TimeDifference / 3600) % 24;

                        let minutes = Math.floor(TimeDifference / 60) % 60;

                        let seconds = Math.floor(TimeDifference % 60);

                        let messageTimeString = "";

                        if (days == 0) {
                          if (hours == 0) {
                            if (minutes == 0) {
                              if (seconds == 0) {
                                messageTimeString = `less than a second ago`;
                              } else {
                                messageTimeString =
                                  seconds == 1
                                    ? `${seconds} second ago`
                                    : `${seconds} seconds ago`;
                              }
                            } else {
                              messageTimeString =
                                minutes == 1
                                  ? `${minutes} minute ago`
                                  : `${minutes} minutes ago`;
                            }
                          } else {
                            messageTimeString =
                              hours == 1
                                ? `${hours} hour ago`
                                : `${hours} hours ago`;
                          }
                        } else {
                          messageTimeString =
                            days == 1 ? `${days} day ago` : `${days} days ago`;
                        }

                        let row = `
                          <div class="groupUserMsgContainer">

                          <div class='userMessageDiv'>
                          <div class="imageNameContainer1">
                          <img src="${obj.image}" class='messageImage'/>
                            <span class="groupUserName">${obj.username}</span>
                          </div>

                            ${obj.replied_id != null
                            ? `<div class="prospectReplyDiv1">
                                <div class="prospectContentDiv" style="${obj.reply_image == null ? "width: 100%;" : ""
                            }">
                                  <h1>${obj.reply_msg != null
                              ? `<h1>${obj.reply_msg}</h1>`
                              : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                            }</h1>
                                </div>
                                ${obj.reply_image != null
                              ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                              : ""
                            }
                              </div>`
                            : ""
                          }

                              <i class="fas fa-reply replyIcon"></i>

                              <p class="messageTxt" data-replied_id=${obj.id}>${obj.text
                          }</p>

                              <div class="timestampUserDiv">
                                ${messageTimeString}
                              </div>
                            </div>

                          </div>
                        `;
                        chatMessageContent.innerHTML += row;

                        setTimeout(() => {
                          document
                            .querySelectorAll(".replyIcon")
                            .forEach((ele) => {
                              ele.addEventListener("click", replyToMessageFn);
                            });
                        }, 100);
                      }

                      chatMessageContent.scroll(
                        0,
                        chatMessageContent.scrollHeight
                      );
                    }
                  });
                }
              }
            };
          }
        }
      };
    }
  }
}

if (document.getElementById("subGroupEditBox")) {
  document
    .getElementById("subGroupEditBox")
    .addEventListener("click", openSubGroupNameModal);
}

function openSubGroupNameModal() {
  document.getElementById("subGroupNameModal").style.transform = "scale(1)";
  document.getElementById("subGroupNameModal").style.opacity = "1";
}

if (document.getElementById("subGroupNameModalCloseBtn")) {
  document
    .getElementById("subGroupNameModalCloseBtn")
    .addEventListener("click", closeSubGroupNameModal);
}

function closeSubGroupNameModal() {
  document.getElementById("subGroupNameModal").style.transform = "scale(0)";
  document.getElementById("subGroupNameModal").style.opacity = "0";
}

if (document.querySelector(".createSubGroupBtn")) {
  document
    .querySelector(".createSubGroupBtn")
    .addEventListener("click", updateSubGroupName);
}

function updateSubGroupName() {
  let sub_group_name = document.getElementById("subGroupName").value;
  let sub_group_id = localStorage.getItem("sub_group_id");

  if (sub_group_name != "") {
    const url = `${globalURl}/edit_sub_group_name`;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        id: sub_group_id,
        name: sub_group_name,
      })
    );

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let userData = JSON.parse(xhr.responseText);

        if (userData.status == "Updated") {
          localStorage.setItem("sub_group_name", sub_group_name);

          var myToast = Toastify({
            text: "Sub Group name changed successfully",
            duration: 2000,
          });

          myToast.showToast();

          closeSubGroupNameModal();

          document.getElementById(
            "subGroupNamePara"
          ).innerHTML = `<span style='color: #084DD1;'>Sub Group Name: </span>${userData.name?.length > 10
            ? `${userData.name.slice()} ...`
            : userData.name
          }`;

          document.getElementById("subGroupName").value = "";
        }
      }
    };
  } else {
    var myToast = Toastify({
      text: "Sub Group must have a name",
      duration: 2000,
    });

    myToast.showToast();
  }
}

function openSubGroupThreeDotMenu(e) {
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
    .querySelector(".editSubGroupContainer")
    .addEventListener("click", editSubGroupMessage);
  currentMenuBox
    .querySelector(".deleteSubGroupContainer")
    .addEventListener("click", deleteSubGroupMessage);
}

function editSubGroupMessage(e) {
  document.querySelectorAll(".menuBox").forEach((ele) => {
    ele.style.display = "none";
  });

  let currentMessage = e.currentTarget.parentElement.parentElement;

  let message_id = currentMessage
    .querySelector(".messageTxt")
    .getAttribute("data-replied_id");
  let messageText = currentMessage.querySelector(".messageTxt").innerText;

  localStorage.setItem("message_id", message_id);

  document.getElementById("msgInp").value = messageText;

  document.getElementById("sendMsgBtn").style.display = "none";
  document.getElementById("updateMsgBtn").style.display = "none";
  document.getElementById("cancelMsgBtn").style.display = "none";

  document.getElementById("sendGroupMsgBtn").style.display = "none";
  document.getElementById("updateGroupMsgBtn").style.display = "none";
  document.getElementById("cancelGroupMsgBtn").style.display = "none";

  document.getElementById("sendSubGroupMsgBtn").style.display = "none";
  document.getElementById("updateSubGroupMsgBtn").style.display = "block";
  document.getElementById("cancelSubGroupMsgBtn").style.display = "block";
}

document
  .getElementById("cancelSubGroupMsgBtn")
  .addEventListener("click", () => {
    document.getElementById("sendMsgBtn").style.display = "none";
    document.getElementById("updateMsgBtn").style.display = "none";
    document.getElementById("cancelMsgBtn").style.display = "none";

    document.getElementById("sendGroupMsgBtn").style.display = "none";
    document.getElementById("updateGroupMsgBtn").style.display = "none";
    document.getElementById("cancelGroupMsgBtn").style.display = "none";

    document.getElementById("sendSubGroupMsgBtn").style.display = "block";
    document.getElementById("updateSubGroupMsgBtn").style.display = "none";
    document.getElementById("cancelSubGroupMsgBtn").style.display = "none";
    document.getElementById("msgInp").value = "";
    localStorage.removeItem("message_id");
  });

document
  .getElementById("updateSubGroupMsgBtn")
  .addEventListener("click", send_sub_group_message);

function deleteSubGroupMessage(e) {
  document.querySelectorAll(".menuBox").forEach((ele) => {
    ele.style.display = "none";
  });

  let currentMessage = e.currentTarget.parentElement.parentElement;

  let message_id = currentMessage
    .querySelector(".messageTxt")
    .getAttribute("data-replied_id");

  const url = `${globalURl}/delete_single_group_chat/${message_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.status == "Deleted") {
        let nullSubGroupChat = localStorage.getItem("nullSubGroupChat");

        var user_id = localStorage.getItem("user_id");
        var group_id = localStorage.getItem("group_id");
        var sub_group_id = localStorage.getItem("sub_group_id");
        var prospect_id = localStorage.getItem("prospect_id");

        let url = "";

        if (nullSubGroupChat) {
          url = `${globalURl}/get_sub_group_messages/${group_id}/${sub_group_id}/${user_id}`;
        } else {
          url = `${globalURl}/sub_group_chat_filter/${group_id}/${sub_group_id}/${prospect_id}/${user_id}`;
        }

        let xhr = new XMLHttpRequest();

        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();

        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
            let userData = JSON.parse(xhr.responseText);

            if (userData.group_name) {
              localStorage.setItem("group_name", userData.group_name);
            }

            if (userData.sub_group_name) {
              localStorage.setItem("sub_group_name", userData.sub_group_name);
            }

            document.getElementById(
              "groupNamePara"
            ).innerHTML = `<span style='color: #084DD1;'>Group Name: </span>${userData.group_name?.length > 10
              ? `${userData.group_name.slice()} ...`
              : userData.group_name
            } `;

            document.getElementById("subGroupNamePara").style.display = "block";

            document.getElementById(
              "subGroupNamePara"
            ).innerHTML = `<span style='color: #084DD1;'>Sub Group Name: </span>${userData.sub_group_name?.length > 10
              ? `${userData.sub_group_name.slice()} ...`
              : userData.sub_group_name
            }`;

            if (userData.admin == true) {
              document.getElementById("deleteBox").innerText = "Delete Sub Group";
              document.getElementById("deleteBox").style.display = "flex";
            } else {
              document.getElementById("deleteBox").innerText = "Delete Group";
              document.getElementById("deleteBox").style.display = "none";
            }

            if (userData.data) {
              let chatMessageContent = document.querySelector(
                ".chatMessageContent"
              );
              chatMessageContent.innerHTML = "";

              userData.data.map((obj, i) => {
                if (obj.text != null) {
                  if (obj.sender_id == user_id) {
                    let dbTime = obj.created_at;

                    let newDate = new Date();

                    let UTCDate = new Date(
                      newDate.getUTCFullYear(),
                      newDate.getUTCMonth(),
                      newDate.getUTCDate(),
                      newDate.getUTCHours(),
                      newDate.getUTCMinutes(),
                      newDate.getUTCSeconds(),
                      newDate.getUTCMilliseconds()
                    );

                    let currentTime = Math.abs(
                      (UTCDate.getTime() / 1000).toFixed(0)
                    );

                    let futureTime = Math.abs(
                      (new Date(dbTime).getTime() / 1000).toFixed(0)
                    );

                    let TimeDifference = currentTime - futureTime;

                    let days = Math.floor(TimeDifference / 86400);

                    let hours = Math.floor(TimeDifference / 3600) % 24;

                    let minutes = Math.floor(TimeDifference / 60) % 60;

                    let seconds = Math.floor(TimeDifference % 60);

                    let messageTimeString = "";

                    if (days == 0) {
                      if (hours == 0) {
                        if (minutes == 0) {
                          if (seconds == 0) {
                            messageTimeString = `less than a second ago`;
                          } else {
                            messageTimeString =
                              seconds == 1
                                ? `${seconds} second ago`
                                : `${seconds} seconds ago`;
                          }
                        } else {
                          messageTimeString =
                            minutes == 1
                              ? `${minutes} minute ago`
                              : `${minutes} minutes ago`;
                        }
                      } else {
                        messageTimeString =
                          hours == 1
                            ? `${hours} hour ago`
                            : `${hours} hours ago`;
                      }
                    } else {
                      messageTimeString =
                        days == 1 ? `${days} day ago` : `${days} days ago`;
                    }

                    let row = `
                        <div class='senderMsgContainer'>
                        
                        <div class='myMessageDiv'>
                        
                        <div class="imageNameContainer">
                        
                            <span class="senderName">${obj.username}</span>
                            <img src="${obj.image}" class='messageImage'/>
                          
                          </div>
                          <i class="far fa-ellipsis-v menuGroupIcon"></i>

                        <div class='menuBox' style="display: none">
                          <div class='editContainer editSubGroupContainer'>
                            <i class="far fa-edit"></i>
                            <h1>Edit</h1>
                          </div>
                          <div class="deleteContainer deleteSubGroupContainer">
                            <i class="far fa-trash"></i>
                            <h1>Delete</h1>
                          </div>
                        </div>
                              ${obj.replied_id != null
                        ? `<div class="prospectReplyDiv">
                                  <div class="prospectContentDiv" style="${obj.reply_image == null
                          ? "width: 100%;"
                          : ""
                        }">

                                    <h1>${obj.reply_msg != null
                          ? `<h1>${obj.reply_msg}</h1>`
                          : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                        }</h1>
                                  </div>
                                  ${obj.reply_image != null
                          ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                          : ""
                        }
                                </div>`
                        : ""
                      }

                              <i class="fas fa-reply myReplyIcon"></i>

                              <p class="messageTxt" data-replied_id=${obj.id}>${obj.text
                      }</p>
                              <div class="timestampDiv">
                                ${messageTimeString}
                              </div>
                            </div>

                        </div>
                      `;
                    chatMessageContent.innerHTML += row;

                    setTimeout(() => {
                      document
                        .querySelectorAll(".menuGroupIcon")
                        .forEach((ele) => {
                          ele?.addEventListener("click", openGroupThreeDotMenu);
                        });
                    }, 100);

                    setTimeout(() => {
                      document
                        .querySelectorAll(".myReplyIcon")
                        .forEach((ele) => {
                          ele?.addEventListener("click", replyToMessageFn);
                        });
                    }, 100);
                  } else {
                    let dbTime = obj.created_at;

                    let newDate = new Date();

                    let UTCDate = new Date(
                      newDate.getUTCFullYear(),
                      newDate.getUTCMonth(),
                      newDate.getUTCDate(),
                      newDate.getUTCHours(),
                      newDate.getUTCMinutes(),
                      newDate.getUTCSeconds(),
                      newDate.getUTCMilliseconds()
                    );

                    let currentTime = Math.abs(
                      (UTCDate.getTime() / 1000).toFixed(0)
                    );

                    let futureTime = Math.abs(
                      (new Date(dbTime).getTime() / 1000).toFixed(0)
                    );

                    let TimeDifference = currentTime - futureTime;

                    let days = Math.floor(TimeDifference / 86400);

                    let hours = Math.floor(TimeDifference / 3600) % 24;

                    let minutes = Math.floor(TimeDifference / 60) % 60;

                    let seconds = Math.floor(TimeDifference % 60);

                    let messageTimeString = "";

                    if (days == 0) {
                      if (hours == 0) {
                        if (minutes == 0) {
                          if (seconds == 0) {
                            messageTimeString = `less than a second ago`;
                          } else {
                            messageTimeString =
                              seconds == 1
                                ? `${seconds} second ago`
                                : `${seconds} seconds ago`;
                          }
                        } else {
                          messageTimeString =
                            minutes == 1
                              ? `${minutes} minute ago`
                              : `${minutes} minutes ago`;
                        }
                      } else {
                        messageTimeString =
                          hours == 1
                            ? `${hours} hour ago`
                            : `${hours} hours ago`;
                      }
                    } else {
                      messageTimeString =
                        days == 1 ? `${days} day ago` : `${days} days ago`;
                    }

                    let row = `
                        <div class="groupUserMsgContainer">
                        
                        
                        <div class='userMessageDiv'>
                        <div class="imageNameContainer1">
                        <img src="${obj.image}" class='messageImage'/>
                          <span class="groupUserName">${obj.username}</span>
                        </div>
                        
                          ${obj.replied_id != null
                        ? `<div class="prospectReplyDiv1">
                              <div class="prospectContentDiv" style="${obj.reply_image == null ? "width: 100%;" : ""
                        }">
                                <h1>${obj.reply_msg != null
                          ? `<h1>${obj.reply_msg}</h1>`
                          : '<h1 style="font-style: italic; font-weight: 400; color: #555; width: auto;"><i class="fas fa-ban blockIcon"></i>The message was deleted</h1>'
                        }</h1>
                              </div>
                              ${obj.reply_image != null
                          ? `<img src="${obj.reply_image}" class="replyImage1"/>`
                          : ""
                        }
                            </div>`
                        : ""
                      }
                          
                            <i class="fas fa-reply replyIcon"></i>
                            
                            <p class="messageTxt" data-replied_id=${obj.id}>${obj.text
                      }</p>
                      
                            <div class="timestampUserDiv">
                              ${messageTimeString}
                            </div>
                          </div>

                        </div>
                      `;
                    chatMessageContent.innerHTML += row;

                    setTimeout(() => {
                      document.querySelectorAll(".replyIcon").forEach((ele) => {
                        ele.addEventListener("click", replyToMessageFn);
                      });
                    }, 100);
                  }

                  chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
                }
              });
            }
          }
        };
      }
    }
  };
}

if (document.getElementById("showprospectBox")) {
  document.getElementById("showprospectBox").addEventListener("click", () => {
    dynamicModal.style.transform = "scale(1)";
    dynamicModal.style.opacity = 1;
  });
}
if (document.getElementById("showprospectsanother")) {
  document.getElementById("showprospectsanother").addEventListener("click", () => {
    localStorage.removeItem("replied_id");
    document.querySelector(".prospect_edit-text-msg-box").style.display = "none"
    dynamicModal.style.transform = "scale(1)";
    dynamicModal.style.opacity = 1;
  });
}


if (document.getElementById("settingsModal")) {
  document.getElementById("settingsModal").addEventListener("click", () => {
    settingModl.style.transform = "scale(1)";
    settingModl.style.opacity = 1;
  });
}
if (document.getElementById("subgroup_name")) {
  document.getElementById("subgroup_name").addEventListener("click", () => {
    subgroup_id = localStorage.getItem("subgroup_id")
    if(subgroup_id != null){
      SubgroupsettingModl.style.transform = "scale(1)";
      SubgroupsettingModl.style.opacity = 1;
    }
    
  });
}
if (document.getElementById("subgroup_notify_img_second")) {
  document.getElementById("subgroup_notify_img_second").addEventListener("click", () => {
    subgroup_id = localStorage.getItem("subgroup_id")
    if(subgroup_id != null){  
      SubgroupsettingModl.style.transform = "scale(1)";
      SubgroupsettingModl.style.opacity = 1;
    }
    
  });
}

if (document.getElementById("SubgroupsettingModlCloseBtn")) {
  document.getElementById("SubgroupsettingModlCloseBtn").addEventListener("click", () => {
    subgroup_id = localStorage.getItem("subgroup_id")
    if(subgroup_id != null){
      SubgroupsettingModl.style.transform = "scale(0)";
      SubgroupsettingModl.style.opacity = 0;
    }
    else{

    }
    
  });
}




document
  .getElementById("settingmodlCloseBtn")
  .addEventListener("click", settingmodlClose);



function settingmodlClose() {
  settingModl.style.transform = "scale(0)";
  settingModl.style.opacity = 0;
}

// for tabs

function Tabs() {
  var bindAll = function () {
    var menuElements = document.querySelectorAll('[data-tab]');
    for (var i = 0; i < menuElements.length; i++) {
      menuElements[i].addEventListener('click', change, false);
    }
  }

  var clear = function () {
    var menuElements = document.querySelectorAll('[data-tab]');
    for (var i = 0; i < menuElements.length; i++) {
      menuElements[i].classList.remove('active');
      var id = menuElements[i].getAttribute('data-tab');
      document.getElementById(id).classList.remove('active');
    }
  }

  var change = function (e) {
    clear();
    e.target.classList.add('active');
    var id = e.currentTarget.getAttribute('data-tab');
    document.getElementById(id).classList.add('active');
  }

  bindAll();
}

var connectTabs = new Tabs();

document
  .getElementById("send_message_button")
  .addEventListener("click", send_group_messages);

  document
  .getElementById("second_send_message_button")
  .addEventListener("click", () => {

    group_id = localStorage.getItem("group_id")
    if(group_id != null){
      // replied_id = localStorage.getItem("replied_id")
      send_group_messages();
    }
    else{
      sendMessage();
    }


  });
function send_group_messages() {

  let msgInp
  var prospect_id = localStorage.getItem("prospect_id");
if(prospect_id){
  msgInp = document.getElementById("second_message_div");

}else{
  msgInp = document.getElementById("send_message_div");
}


  var user_id = localStorage.getItem("user_id");
  var replied_id = localStorage.getItem("replied_id");
  var prospect_id = localStorage.getItem("prospect_id");
  var group_id = localStorage.getItem("group_id");
  let sub_group_id = localStorage.getItem("subgroup_id");
  let xhr = new XMLHttpRequest();



  if (msgInp.value !== "") {
    console.log('mesage');

    if (document.getElementById("updateMsgBtn").style.display == "none") {
      if(sub_group_id){

        const url = `${globalURl}/send_subgroup_message`;


      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          user_id,
          group_id,
          sub_group_id: sub_group_id,
          text: msgInp.value,
          replied_id,
          prospect_id,
        })
      );
      }else{
        const url = `${globalURl}/send_group_message`;

  
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(
          JSON.stringify({
            user_id,
            group_id,
            text: msgInp.value,
            replied_id,
            prospect_id,
          })
        );
      }
      

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let userMessages = JSON.parse(xhr.responseText);
          localStorage.removeItem("replied_id");
          document.querySelector(".prospect_edit-text-msg-box").style.display ="none";


          if (userMessages.data.length > 0) {
            console.log("yes Data")

            document.getElementById("sendGroupMsgBtn").style.display = "block";
            document.getElementById("updateGroupMsgBtn").style.display = "none";
            document.getElementById("cancelGroupMsgBtn").style.display = "none";
            document.getElementById("msgInp").value = "";
            counting_days = 1
            userMessages.data.map((obj, i) => {
            if(obj.prospect_id == null){

              if (obj.sender_id == user_id) {
                let dbTime = obj.created_at;
                temp = localStorage.getItem("lastDate")
                let newDate = new Date();

                var ajjtareekh
              if( (newDate.getUTCMonth()+1) < 10 && newDate.getUTCDate() < 10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+'0'+newDate.getUTCDate();
              }
              else if( (newDate.getUTCMonth()+1) < 10 &&  newDate.getUTCDate() >=10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+newDate.getUTCDate();
              }
              else if( (newDate.getUTCMonth()+1) >= 10 &&  newDate.getUTCDate() < 10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+'0'+newDate.getUTCDate();
              }
              else{
                ajjtareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+newDate.getUTCDate();
              }

              var kalltareekh
              if( (newDate.getUTCMonth()+1) < 10 && (newDate.getUTCDate()-1) < 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+'0'+(newDate.getUTCDate()-1);
              }
              if( (newDate.getUTCMonth()+1) < 10 && (newDate.getUTCDate()-1) >= 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+(newDate.getUTCDate()-1);
              }
              if( (newDate.getUTCMonth()+1) >= 10 && (newDate.getUTCDate()-1) < 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+'0'+(newDate.getUTCDate()-1);
              }
              else{
                kalltareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+(newDate.getUTCDate()-1);
              }
          myDate = dbTime.split(" ");
          console.log(ajjtareekh,"ajj")
          console.log(kalltareekh,"kall")
          console.log(myDate[0],"DB")
          console.log(temp,"temp")

          if(temp == myDate[0]){
                counting_days = counting_days + 1;
          }
          else{
            localStorage.removeItem("lastDate")
            if(ajjtareekh == myDate[0]){
              document.getElementById("new_chat_box").innerHTML += `<div class="date-Wraper position-relative mb-3">
              <div class="today-date">Today</div>
              </div>`;
              counting_days = counting_days + 1
            }
            else if (kalltareekh == myDate[0]) {
              document.getElementById("new_chat_box").innerHTML += `<div class="date-Wraper position-relative mb-3">
              <div class="all-date">Yesterday</div>
              </div>`;
              counting_days = counting_days + 1
            }
            else {
              document.getElementById("new_chat_box").innerHTML += `<div class="date-Wraper position-relative mb-3">
                <div class="all-date">${myDate[0]}</div>
                </div>`;
                counting_days = counting_days + 1;
            }
            
            temp = myDate[0];

            localStorage.setItem("lastDate",temp)
            

          }

                let UTCDate = new Date(
                  newDate.getUTCFullYear(),
                  newDate.getUTCMonth(),
                  newDate.getUTCDate(),
                  newDate.getUTCHours(),
                  newDate.getUTCMinutes(),
                  newDate.getUTCSeconds(),
                  newDate.getUTCMilliseconds()
                );

                let currentTime = Math.abs(
                  (UTCDate.getTime() / 1000).toFixed(0)
                );


                let futureTime = Math.abs(
                  (new Date(dbTime).getTime() / 1000).toFixed(0)
                );

                let TimeDifference = currentTime - futureTime;

                let days = Math.floor(TimeDifference / 86400);

                let hours = Math.floor(TimeDifference / 3600) % 24;

                let minutes = Math.floor(TimeDifference / 60) % 60;

                let seconds = Math.floor(TimeDifference % 60);

                let messageTimeString = "";

                if (days <= 0) {
                  if (hours == 0) {
                    if (minutes == 0) {
                      if (seconds == 0) {
                        messageTimeString = `seconds ago`;
                      } else {
                        messageTimeString =
                          seconds == 1
                            ? `${seconds} second ago`
                            : `${seconds} seconds ago`;
                      }
                    } else {
                      messageTimeString =
                        minutes == 1
                          ? `${minutes} minute ago`
                          : `${minutes} minutes ago`;
                    }
                  } else {
                    messageTimeString =
                      hours == 1 ? `${hours} hour ago` : `${hours} hours ago`;
                  }
                } else {
                  messageTimeString =
                    days == 1 ? `${days} day ago` : `${days} days ago`;
                }

                let messageReplyTimeString = "";

           if(obj.reply_msg != null){

            let dbTime = obj.reply_created_at;

            let newDate = new Date();
  
            let UTCDate = new Date(
              newDate.getUTCFullYear(),
              newDate.getUTCMonth(),
              newDate.getUTCDate(),
              newDate.getUTCHours(),
              newDate.getUTCMinutes(),
              newDate.getUTCSeconds(),
              newDate.getUTCMilliseconds()
            );
  
            let currentTime = Math.abs(
              (UTCDate.getTime() / 1000).toFixed(0)
            );
  
            let futureTime = Math.abs(
              (new Date(dbTime).getTime() / 1000).toFixed(0)
            );
  
            let TimeDifference = currentTime - futureTime;
  
            let days = Math.floor(TimeDifference / 86400);
  
            let hours = Math.floor(TimeDifference / 3600) % 24;
  
            let minutes = Math.floor(TimeDifference / 60) % 60;
  
            let seconds = Math.floor(TimeDifference % 60);
  
  
            if (days <= 0) {
              if (hours == 0) {
                if (minutes == 0) {
                  if (seconds == 0) {
                    messageReplyTimeString = `less than a second ago`;
                  } else {
                    messageReplyTimeString =
                      seconds == 1
                        ? `${seconds} second ago`
                        : `${seconds} seconds ago`;
                  }
                } else {
                  messageReplyTimeString =
                    minutes == 1
                      ? `${minutes} minute ago`
                      : `${minutes} minutes ago`;
                }
              } else {
                messageReplyTimeString =
                  hours == 1
                    ? `${hours} hour ago`
                    : `${hours} hours ago`;
              }
            } else {
              messageReplyTimeString =
                days == 1 ? `${days} day ago` : `${days} days ago`;
            }

            console.log('reply_msg',messageReplyTimeString)


           }

                let row = `
                
                
                
                <div class="card my-2 rounded">
                          <div
                            class="card-body p-2 px-2 d-flex justify-content-between align-items-center"
                          >
                            <div class="row">
                              <div class="img-p">
                                <img
                                  src="${obj.image}"
                                  alt=""
                                  class="img-fluid rounded-circle"
                                />
                              </div>
                              <div class="card-left-content-box">
                                <div
                                  class="font-weight-bold name-top"
                                  style="font-size: 12px"
                                >
                                ${obj.username}
                                  <span
                                    class="time"
                                    style="
                                      padding-left: 15px;
                                      font-size: 8px;
                                      line-height: 10px;
                                      color: #636363;
                                      font-weight: 400;
                                    "
                                    >${messageTimeString}</span
                                  >
                                </div>
                                <div class="msg-box-chat">
                                ${obj.text}
                                </div>
                              </div>
                            </div>
                            <button
                                 class="border-0 bg-transparent f-10 pointer position-absolute dropdown-btn"
                                  style="top: 8px; right: 8px" >
                                  <i class="fas fa-ellipsis-v"></i>
                                  <div class='dropdown-list'>
                                  <span data-replied_id=${obj.id} class="message_edit_button">Edit</span>
                                  <span data-replied_id=${obj.id} class="message_delete_button">Delete</span>
                                  <span class="updating_text" style="display:none">${obj.text}</span>
                                  </div>
                                  </button>
                          </div>
                          ${
                            obj.reply_msg ? 
                            
                            `<div class="card card-child">
                            <div class="card-body p-0 m-0">
                              <div class="d-flex w-100" style="justify-content: space-evenly">
                                <div class="img-p">
                                  <img src="${obj.reply_image}" alt="" class="img-fluid rounded-circle" />
                                </div>
                                <div class="card-left-content-box bg-transparent" style="width: 135px">
                                  <div class="font-weight-bold name-top" style="font-size: 10px">
                                    ${obj.reply_username}
                                    <span class="time" style="
                                          padding-left: 8px;
                                          font-size: 6px;
                                          line-height: 8px;
                                          color: #636363;
                                          font-weight: 400;
                                        ">${messageReplyTimeString}</span>
                                  </div>
                                  <div class="msg-box-chat" style="font-size: 7px">
                                    ${obj.reply_msg}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>`
                          :
                          ""
                          }
                            
                          <div data-replied_id=${obj.id} class="reply-box">&#x2923; Reply</div>
                        </div>                `



                  ;


                document.getElementById("new_chat_box").innerHTML += row;


                document.querySelectorAll(".opening_perspective").forEach((ele) => {
                  ele.addEventListener("click", (e) => {
                    let currentMessage = e.currentTarget
                    let message_id = currentMessage.getAttribute("data-id");
                    
                    localStorage.setItem("prospect_id",message_id);
                    showProspectChat();
                    
                    console.log("perspective")
                  });
                });
                document.querySelectorAll(".opening_clipper").forEach((ele) => {
                  ele.addEventListener("click", (e) => {
      
                                  var profile_link = e.currentTarget.getAttribute("data-url");
                                  var user_id = e.currentTarget.getAttribute("data-id");
                                  var prospect_id = e.currentTarget.getAttribute("data-prospect-id");
                                  var sending_id = localStorage.getItem("user_id");

                                  const url = `${globalURl}/get_prospect_Data`;
      
                                    let xhr = new XMLHttpRequest();
      
                                    xhr.open("POST", url, true);
                                    xhr.setRequestHeader("Content-Type", "application/json");
                                    xhr.send(
                                      JSON.stringify({
                                        prospect_id,
                                        user_id: sending_id,
                                      })
                                    );
      
                                    xhr.onreadystatechange = function () {
                                      if (xhr.readyState == 4 && xhr.status == 200) {
                                        let userData = JSON.parse(xhr.responseText);
                                        if (userData.data) {
                                          if(userData.data.prospect_status == "no"){
                                            document.getElementById("send_CRM").style.display = "none";
                                          }
                                          else{
                                            document.getElementById("send_CRM").style.display = "block";
                                            document.getElementById("prospect_status_image").value = userData.data.prospect_status_image;
                                            document.getElementById("prospect_status_name").value = userData.data.prospect_status_name;
                                          }
                                          document.querySelector(".prospect_name_heading_comment").innerText = userData.data.name
                                          document.getElementById("prospect_image_heading_comment").src = userData.data.image
                                          document.querySelector(".desigination_comment").innerText = `${userData.data.description.length > 30 ? `${userData.data.description.slice(0,30)}....` : `${userData.data.description}`}`;
                                          document.querySelector(".prospect_group_name_comment").innerText = userData.data.company
                                          document.querySelector(".prospect_subgroup_name_comment").innerText = userData.data.address
                                          document.querySelector(".prospect_subgroup_status_comment").innerText = userData.data.status
                                          document.querySelector(".notes_comment").innerText = `${userData.data.notes == null ? `Notes not added` : `${userData.data.notes}`}`  
                                        }
                                          
                                        
                                      }
                                    }
                    
      
                    
      
      
      
                    localStorage.setItem("commentID", JSON.stringify(commentArray));
                      document.querySelector(".taggedUser").innerHTML = "";
                      document.getElementById("comment_box").value = "";
                      document.getElementById("temporary_sender").value = user_id;
                      document.getElementById("temporary_url").value = profile_link;
                      document.getElementById("temporary_prospect_id").value = prospect_id;

      
      
                      var access_token = localStorage.getItem("access_token");
                      var username = localStorage.getItem("username");
      
                      if (access_token && username) {
                        document.getElementById("comment_box").disabled = false;
      
                        setTimeout(() => {
                          const url = `${globalURl}/getComments`;
      
                          var xhr = new XMLHttpRequest();
                          xhr.open("POST", url, true);
                          xhr.setRequestHeader("Content-Type", "application/json");
                          xhr.send(
                            JSON.stringify({
                              profile_link: profile_link,
                              secondary_id: user_id,
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
      
      
                                  
      
                    
                  });
                });
                document.querySelectorAll(".opening_background").forEach((ele) => {
                  ele.addEventListener("click", (e) => {
                    let currentMessage = e.currentTarget
                    let message_id = currentMessage.getAttribute("data-url");
                    let params = {
                      active: true,
                      currentWindow: true,
                    };
                    chrome.tabs.query(params, gotTab);
            
                    function gotTab(tabs) {
                      let msg = {
                        txt: message_id,
                      };
                      chrome.tabs.sendMessage(tabs[0].id, msg);
                    }
                    console.log("background")
                  });
                });

                document.querySelectorAll(".reply-box").forEach((ele) => {
                  ele.addEventListener("click", (e) => {
                    // dynamicModalClose();
                    // showNullChats();
                    localStorage.removeItem("edit_id");
              document.getElementById("send_message_div").value = null;
              document.getElementById("send_message_button").style.display = "block";
              document.getElementById("update_message_button").style.display = "none";
              document.getElementById("cancel_message_button").style.display = "none";
                    let currentMessage = e.currentTarget
                    console.log(currentMessage);
                    let message_id = currentMessage.getAttribute("data-replied_id");
                    console.log(message_id);
                    localStorage.setItem("replied_id", message_id)
      
                    document.querySelector(".edit-text-msg-box").style.display = "block"
                    // document.getElementById("update_message_button").style.display = "block"
                    // document.getElementById("cancel_message_button").style.display = "block"
      
                    currentMessage = e.currentTarget.parentElement
                    console.log(currentMessage);
                    let message = currentMessage.querySelector(".updating_text").innerHTML;
                    console.log(message);
                     let name = currentMessage.querySelector(".font-weight-bold").innerText
                    // currentMessage = e.currentTarget.parentElement
      
      
                    document.querySelector(".name-edit-box").innerText = name
                    document.querySelector(".msg").innerHTML = message
      
                    // document.getElementById("send_message_div").value = message
      
                    console.log("Reply")
                  });
                });
                document.querySelectorAll(".message_edit_button").forEach((ele) => {
                  ele.addEventListener("click", (e) => {
                    // dynamicModalClose();
                    // showNullChats();
                    document.querySelector(".edit-text-msg-box").style.display ="none";
                    localStorage.removeItem("replied_id");
                    let currentMessage = e.currentTarget
                    console.log(currentMessage);
                    let message_id = currentMessage.getAttribute("data-replied_id");
                    console.log(message_id);
                    localStorage.setItem("edit_id", message_id)

                    document.getElementById("send_message_button").style.display = "none"
                    document.getElementById("update_message_button").style.display = "block"
                    document.getElementById("cancel_message_button").style.display = "block"

                    currentMessage = e.currentTarget.parentElement
                    console.log(currentMessage);
                    let message = currentMessage.querySelector(".updating_text").innerHTML;
                    console.log(message);

                    document.getElementById("send_message_div").value = message

                    console.log("edit")
                  });
                });

                document.querySelectorAll(".message_delete_button").forEach((ele) => {
                  ele.addEventListener("click", (e) => {
                    // dynamicModalClose();
                    // showNullChats();
                    let currentMessage = e.currentTarget
                    console.log(currentMessage);
                    let message_id = currentMessage.getAttribute("data-replied_id");
                    console.log(message_id);

                    MessageDeleteModal.style.transform = "scale(1)";
                    MessageDeleteModal.style.opacity = 1;
                    document.getElementById("temporary_buttons").innerHTML = `
                    <button id="closeIt" class="btn btn-light">Cancel</button>
                    <button data-replied_id=${message_id} id="confirmation_delete" class="btn btn-danger-new">Delete</button>
                    `
                    if (document.getElementById("closeIt")) {
                      document
                        .getElementById("closeIt")
                        .addEventListener("click", closeSubGroupModal);
                    }
                    document.getElementById("confirmation_delete").addEventListener("click", () => {
                      deleteGroupMessage();
                    });
                    console.log("delete")
                  });
                });
                // setTimeout(() => {
                //   document.querySelectorAll(".menuGroupIcon").forEach((ele) => {
                //     ele?.addEventListener("click", openGroupThreeDotMenu);
                //   });
                // }, 100);

                // setTimeout(() => {
                //   document.querySelectorAll(".myReplyIcon").forEach((ele) => {
                //     ele.addEventListener("click", replyToMessageFn);
                //   });
                // }, 100);

                document.querySelector(".edit-text-msg-box").style.display ="none"


              }
            }
            else{
              if(obj.text != null){
                let dbTime = obj.created_at;
      
                temp = localStorage.getItem("lastDate")
                let newDate = new Date();

                var ajjtareekh
              if( (newDate.getUTCMonth()+1) < 10 && newDate.getUTCDate() < 10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+'0'+newDate.getUTCDate();
              }
              else if( (newDate.getUTCMonth()+1) < 10 &&  newDate.getUTCDate() >=10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+newDate.getUTCDate();
              }
              else if( (newDate.getUTCMonth()+1) >= 10 &&  newDate.getUTCDate() < 10){
                ajjtareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+'0'+newDate.getUTCDate();
              }
              else{
                ajjtareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+newDate.getUTCDate();
              }

              var kalltareekh
              if( (newDate.getUTCMonth()+1) < 10 && (newDate.getUTCDate()-1) < 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+'0'+(newDate.getUTCDate()-1);
              }
              if( (newDate.getUTCMonth()+1) < 10 && (newDate.getUTCDate()-1) >= 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+'0'+(newDate.getUTCMonth()+1)+'-'+(newDate.getUTCDate()-1);
              }
              if( (newDate.getUTCMonth()+1) >= 10 && (newDate.getUTCDate()-1) < 10){
                kalltareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+'0'+(newDate.getUTCDate()-1);
              }
              else{
                kalltareekh = newDate.getUTCFullYear()+'-'+(newDate.getUTCMonth()+1)+'-'+(newDate.getUTCDate()-1);
              }
          myDate = dbTime.split(" ");
          console.log(ajjtareekh,"ajj")
          console.log(kalltareekh,"kall")
          console.log(myDate[0],"DB")
          console.log(temp,"temp")

          if(temp == myDate[0]){
                counting_days = counting_days + 1;
          }
          else{
            localStorage.removeItem("lastDate")
            if(ajjtareekh == myDate[0]){
              document.getElementById("chatt-box-2").innerHTML += `<div class="date-Wraper position-relative mb-3">
              <div class="all-date">Today</div>
              </div>`;
              counting_days = counting_days + 1
            }
            else if (kalltareekh == myDate[0]) {
              document.getElementById("chatt-box-2").innerHTML += `<div class="date-Wraper position-relative mb-3">
              <div class="all-date">Yesterday</div>
              </div>`;
              counting_days = counting_days + 1
            }
            else {
              document.getElementById("chatt-box-2").innerHTML += `<div class="date-Wraper position-relative mb-3">
                <div class="all-date">${myDate[0]}</div>
                </div>`;
                counting_days = counting_days + 1;
            }
            
            temp = myDate[0];

            localStorage.setItem("lastDate",temp)
            

          }
      
                let UTCDate = new Date(
                  newDate.getUTCFullYear(),
                  newDate.getUTCMonth(),
                  newDate.getUTCDate(),
                  newDate.getUTCHours(),
                  newDate.getUTCMinutes(),
                  newDate.getUTCSeconds(),
                  newDate.getUTCMilliseconds()
                );
      
                let currentTime = Math.abs(
                  (UTCDate.getTime() / 1000).toFixed(0)
                );
      
                let futureTime = Math.abs(
                  (new Date(dbTime).getTime() / 1000).toFixed(0)
                );
      
                let TimeDifference = currentTime - futureTime;
      
                let days = Math.floor(TimeDifference / 86400);
      
                let hours = Math.floor(TimeDifference / 3600) % 24;
      
                let minutes = Math.floor(TimeDifference / 60) % 60;
      
                let seconds = Math.floor(TimeDifference % 60);
      
                let messageTimeString = "";
      
                if (days == 0) {
                  if (hours == 0) {
                    if (minutes == 0) {
                      if (seconds == 0) {
                        messageTimeString = `less than a second ago`;
                      } else {
                        messageTimeString =
                          seconds == 1
                            ? `${seconds} second ago`
                            : `${seconds} seconds ago`;
                      }
                    } else {
                      messageTimeString =
                        minutes == 1
                          ? `${minutes} minute ago`
                          : `${minutes} minutes ago`;
                    }
                  } else {
                    messageTimeString =
                      hours == 1
                        ? `${hours} hour ago`
                        : `${hours} hours ago`;
                  }
                } else {
                  messageTimeString =
                    days == 1 ? `${days} day ago` : `${days} days ago`;
                }
                let messageReplyTimeString = "";
      
                if(obj.reply_msg != null){
      
                  let dbTime = obj.reply_created_at;
      
                  let newDate = new Date();
        
                  let UTCDate = new Date(
                    newDate.getUTCFullYear(),
                    newDate.getUTCMonth(),
                    newDate.getUTCDate(),
                    newDate.getUTCHours(),
                    newDate.getUTCMinutes(),
                    newDate.getUTCSeconds(),
                    newDate.getUTCMilliseconds()
                  );
        
                  let currentTime = Math.abs(
                    (UTCDate.getTime() / 1000).toFixed(0)
                  );
        
                  let futureTime = Math.abs(
                    (new Date(dbTime).getTime() / 1000).toFixed(0)
                  );
        
                  let TimeDifference = currentTime - futureTime;
        
                  let days = Math.floor(TimeDifference / 86400);
        
                  let hours = Math.floor(TimeDifference / 3600) % 24;
        
                  let minutes = Math.floor(TimeDifference / 60) % 60;
        
                  let seconds = Math.floor(TimeDifference % 60);
        
        
                  if (days == 0) {
                    if (hours == 0) {
                      if (minutes == 0) {
                        if (seconds == 0) {
                          messageReplyTimeString = `less than a second ago`;
                        } else {
                          messageReplyTimeString =
                            seconds == 1
                              ? `${seconds} second ago`
                              : `${seconds} seconds ago`;
                        }
                      } else {
                        messageReplyTimeString =
                          minutes == 1
                            ? `${minutes} minute ago`
                            : `${minutes} minutes ago`;
                      }
                    } else {
                      messageReplyTimeString =
                        hours == 1
                          ? `${hours} hour ago`
                          : `${hours} hours ago`;
                    }
                  } else {
                    messageReplyTimeString =
                      days == 1 ? `${days} day ago` : `${days} days ago`;
                  }
      
                  console.log('reply_msg',messageReplyTimeString)
      
      
                }
      
      
                document.getElementById("chatt-box-2").innerHTML += `
      
                <div class="card my-2 rounded">
              <div class="card-body p-2 px-2 d-flex justify-content-between align-items-center">
                <div class="row " style='width:365px'>
                  <div class="img-p">
                    <img src="${obj.image}" alt="" class="img-fluid rounded-circle">
                  </div>
                  <div class="card-left-content-box">
                    <div class="font-weight-bold name-top" style="font-size: 12px">
                    ${obj.username}
                      <span class="time" style="
                          padding-left: 15px;
                          font-size: 8px;
                          line-height: 10px;
                          color: #636363;
                          font-weight: 400;
                        ">${messageTimeString}</span>
                    </div>
                    <div class="msg-box-chat">${obj.text}</div>
                    <span class="updating_text" style="display:none">${obj.text}</span>
    
                  </div>
                </div>
                <button class="border-0 bg-transparent f-10 pointer position-absolute dropdown-btn" style="top: 8px; right: 8px">
                        <i class="fas fa-ellipsis-v"></i>
                        <div class="dropdown-list">
                        <span data-replied_id=${obj.id} class="prospect_message_edit_button">Edit</span>
                        <span  data-replied_id=${obj.id} class="prospect_message_delete_button">Delete</span>
                        <span class="prospect_updating_text" style="display:none">${obj.text}</span>
                        </div>
                        </button>
              </div>


              ${
                obj.reply_msg ? 
                
                `<div class="card card-child" style="background-color: #e6edfa;
                width: calc(74% + 56px);
                border-radius: 0;
                transform: translate(36px, -8px);">
                <div class="card-body p-0 m-0">
                  <div class="d-flex w-100" style="margin-left:20px">
                    <div class="img-p">
                      <img src="${obj.reply_image}" alt="" class="img-fluid rounded-circle" />
                    </div>
                    <div class="card-left-content-box bg-transparent" style="width: 135px">
                      <div class="font-weight-bold name-top" style="font-size: 10px">
                        ${obj.reply_username}
                        <span class="time" style="
                              padding-left: 8px;
                              font-size: 6px;
                              line-height: 8px;
                              color: #636363;
                              font-weight: 400;
                            ">${messageReplyTimeString}</span>
                      </div>
                      <div class="msg-box-chat" style="font-size: 7px">
                        ${obj.reply_msg}
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
              :
              ""
              }
    
              <div data-replied-id=${obj.id} class="reply-box_">⤣ Reply</div>
             </div>
      
      
      
      
      
                `
                document.querySelectorAll(".opening_perspective").forEach((ele) => {
                  ele.addEventListener("click", (e) => {
                    let currentMessage = e.currentTarget
                    let message_id = currentMessage.getAttribute("data-id");
                    
                    localStorage.setItem("prospect_id",message_id);
                    showProspectChat();
                    
                    console.log("perspective")
                  });
                });
                document.querySelectorAll(".reply-box_").forEach((ele) => {
                  ele.addEventListener("click", (e) => {
                    // dynamicModalClose();
                    // showNullChats();
                    localStorage.removeItem("edit_id")
                    document.getElementById("second_message_div").value = null;
                    document.getElementById("second_update_message_button").style.display = "none";
                    document.getElementById("second_send_message_button").style.display = "block";
                    document.getElementById("second_cancel_message_button").style.display = "none";

                    let currentMessage = e.currentTarget
                    console.log(currentMessage);
                    let message_id = currentMessage.getAttribute("data-replied-id");
                    console.log(message_id);
                    localStorage.setItem("replied_id", message_id)
      
                    document.querySelector(".prospect_edit-text-msg-box").style.display = "block"
                    // document.getElementById("update_message_button").style.display = "block"
                    // document.getElementById("cancel_message_button").style.display = "block"
      
                    currentMessage = e.currentTarget.parentElement
                    console.log(currentMessage);
                    let message = currentMessage.querySelector(".prospect_updating_text").innerHTML;
                    console.log(message);
                     let name = currentMessage.querySelector(".font-weight-bold").innerText
                    // currentMessage = e.currentTarget.parentElement
      
      
                    document.querySelector(".prospect_name-edit-box").innerText = name
                    document.querySelector(".prospect_msg").innerHTML = message
      
                    // document.getElementById("send_message_div").value = message
      
                    console.log("Reply")
                  });
                });
      
      
      
                document.querySelectorAll(".prospect_message_edit_button").forEach((ele) => {
                  ele.addEventListener("click", (e) => {
                    // dynamicModalClose();
                    // showNullChats();
                    document.querySelector(".prospect_edit-text-msg-box").style.display ="none";
                    localStorage.removeItem("replied_id");
                    let currentMessage = e.currentTarget
                    console.log(currentMessage);
                    let message_id = currentMessage.getAttribute("data-replied_id");
                    console.log(message_id);
                    localStorage.setItem("edit_id", message_id)
      
                    document.getElementById("second_send_message_button").style.display = "none"
                    document.getElementById("second_update_message_button").style.display = "block"
                    document.getElementById("second_cancel_message_button").style.display = "block"
      
                    currentMessage = e.currentTarget.parentElement
                    console.log(currentMessage);
                    let message = currentMessage.querySelector(".prospect_updating_text").innerHTML;
                    console.log(message);
      
                    document.getElementById("second_message_div").value = message
      
                    console.log("edit")
                  });
                });
      
      
      
                document.querySelectorAll(".prospect_message_delete_button").forEach((ele) => {
                  ele.addEventListener("click", (e) => {
                    // dynamicModalClose();
                    // showNullChats();
                    let currentMessage = e.currentTarget
                    console.log(currentMessage);
                    let message_id = currentMessage.getAttribute("data-replied_id");
                    console.log(message_id);
      
                    MessageDeleteModal.style.transform = "scale(1)";
                    MessageDeleteModal.style.opacity = 1;
                    document.getElementById("temporary_buttons").innerHTML = `
                    <button id="closeIt" class="btn btn-light-new">Cancel</button>
                    <button data-replied_id=${message_id} id="confirmation_delete" class="btn btn-danger-new">Delete</button>
                    `
                    if (document.getElementById("closeIt")) {
                      document
                        .getElementById("closeIt")
                        .addEventListener("click", closeSubGroupModal);
                    }
                    document.getElementById("confirmation_delete").addEventListener("click", () => {
                      deleteGroupMessage();
                    });
                    console.log("delete")
                  });
                });
              }




            }
              chatMessageContent = document.getElementById("bottom-content-box");

              chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
              document.getElementById("send_message_div").value = null;
              chatMessageContent = document.getElementById("another-bottom-content-box");

              chatMessageContent.scroll(0, chatMessageContent.scrollHeight);
              document.getElementById("second_message_div").value = null;
            });
          }
          else{
            console.log("no Data")

            localStorage.removeItem("lastDate")
          }

        }
      }
    }
  }

}



if (document.getElementById("find_members")) {
  document.getElementById("find_members").addEventListener("keyup", () => {
    let group_members = JSON.parse(localStorage.getItem("group_members"));
    let value = document.getElementById("find_members").value;
    console.log(value);
    if (group_members.length > 0) {
      group_members.length > 0 && group_members?.map((ele) => {
        console.log(ele.name.includes(value))
        if (ele.name.includes(value)) {
          if (ele.name == localStorage.getItem("admin")) {
            document.getElementById("view_members").innerHTML = `
            <div class="chatContent" >
            <div
              class="defaultIcon"
              style="border: none; margin-left: 10px"
            >
              <img
                src="${ele.image}"
              />
            </div>
  
            <h1 class="userEmail">
            ${ele.name} <br />
              <span class="role">Admin</span>
            </h1>
  
            <button
              class="border-0 bg-transparent f-10 pointer position-absolute on_hover-Child_show"
              style="right: 3.5%"
            >
              <i class="fas fa-ellipsis-v"></i>
              <div class="dropdown-list_another"
              
              >
                        <span  class="Add_admin_button">Make Admin</span>
                        <span  class="Add_admin_button">Remove</span>

                        </div>
            </button>
          </div>
            `
            var i = setInterval(() => {

              document.querySelectorAll(".Remove_member_button").forEach((ele) => {
                ele.addEventListener("click", (e) => {
  
                    console.log("hi");
                  localStorage.removeItem("replied_id");
                  group_id = localStorage.getItem("group_id");
                  user_id = localStorage.getItem("user_id");
                  let currentMessage = e.currentTarget
                  console.log(currentMessage);
                  let message_id = currentMessage.getAttribute("date-remove_id");
                  console.log(message_id);
  
                  
                    const url = `${globalURl}/remove_members_to_group`;
                
                    let xhr = new XMLHttpRequest();
                
                    xhr.open("POST", url, true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(
                      JSON.stringify({
                        group_id,
                        message_id,
                        user_id,
                      })
                    );
                
                    xhr.onreadystatechange = function () {
                      if (xhr.readyState == 4 && xhr.status == 200) {
                        let userData = JSON.parse(xhr.responseText);
                
                        if (userData.status == "Removed") {
                          
                          dynamicModalOpenP()
                
                        }
                        else {
                          
                        }
                
                
                
                      }
                    };
                
              
  
  
                })
              })
              clearInterval(i)
            }, 300)
          }
          else {
            document.getElementById("view_members").innerHTML = `
            <div class="chatContent" >
            <div
              class="defaultIcon"
              style="border: none; margin-left: 10px"
            >
              <img
                src="${ele.image}"
              />
            </div>
  
            <h1 class="userEmail">
            ${ele.name} <br />
              <span class="role">Member</span>
            </h1>
  
            <button
              class="border-0 bg-transparent f-10 pointer position-absolute on_hover-Child_show"
              style="right: 3.5%"
            >
              <i class="fas fa-ellipsis-v"></i>
              <div class="dropdown-list_another">
              <span  class="Add_admin_button">Make Admin</span>
              <span date-remove_id=${ele.id}  class="Remove_member_button">Remove</span>
                        </div>
            </button>
          </div>
            `
            var i = setInterval(() => {

              document.querySelectorAll(".Remove_member_button").forEach((ele) => {
                ele.addEventListener("click", (e) => {
  
                    console.log("hi");
                  localStorage.removeItem("replied_id");
                  group_id = localStorage.getItem("group_id");
                  user_id = localStorage.getItem("user_id");
                  let currentMessage = e.currentTarget
                  console.log(currentMessage);
                  let message_id = currentMessage.getAttribute("date-remove_id");
                  console.log(message_id);
  
                  
                    const url = `${globalURl}/remove_members_to_group`;
                
                    let xhr = new XMLHttpRequest();
                
                    xhr.open("POST", url, true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(
                      JSON.stringify({
                        group_id,
                        message_id,
                        user_id,
                      })
                    );
                
                    xhr.onreadystatechange = function () {
                      if (xhr.readyState == 4 && xhr.status == 200) {
                        let userData = JSON.parse(xhr.responseText);
                
                        if (userData.status == "Removed") {
                          
                          dynamicModalOpenP()
                
                        }
                        else {
                          
                        }
                
                
                
                      }
                    };
                
              
  
  
                })
              })
              clearInterval(i)
            }, 200)
          }
          
        }
      });
    }
    if (value === '') {
      document.getElementById("view_members").innerHTML = ``
      group_members.length > 0 && group_members?.map((ele) => {
        console.log(ele.name.includes(value))
        if (ele.name == localStorage.getItem("admin")) {
          console.log('admin')

          document.getElementById("view_members").innerHTML += `
          <div class="chatContent" >
          <div
            class="defaultIcon"
            style="border: none; margin-left: 10px"
          >
            <img
              src="${ele.image}"
            />
          </div>

          <h1 class="userEmail">
          ${ele.name} <br />
            <span class="role">Admin</span>
          </h1>

          <button
            class="border-0 bg-transparent f-10 pointer position-absolute on_hover-Child_show"
            style="right: 3.5%"
          >
            <i class="fas fa-ellipsis-v"></i>
            <div class="dropdown-list_another"
            
            >
                      <span  class="Add_admin_button">Make Admin</span>
                      <span  class="Add_admin_button">Remove</span>

                      </div>
          </button>
        </div>
            `
            var i = setInterval(() => {

              document.querySelectorAll(".Remove_member_button").forEach((ele) => {
                ele.addEventListener("click", (e) => {
  
                    console.log("hi");
                  localStorage.removeItem("replied_id");
                  group_id = localStorage.getItem("group_id");
                  user_id = localStorage.getItem("user_id");
                  let currentMessage = e.currentTarget
                  console.log(currentMessage);
                  let message_id = currentMessage.getAttribute("date-remove_id");
                  console.log(message_id);
  
                  
                    const url = `${globalURl}/remove_members_to_group`;
                
                    let xhr = new XMLHttpRequest();
                
                    xhr.open("POST", url, true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(
                      JSON.stringify({
                        group_id,
                        message_id,
                        user_id,
                      })
                    );
                
                    xhr.onreadystatechange = function () {
                      if (xhr.readyState == 4 && xhr.status == 200) {
                        let userData = JSON.parse(xhr.responseText);
                
                        if (userData.status == "Removed") {
                          
                          dynamicModalOpenP()
                
                        }
                        else {
                          
                        }
                
                
                
                      }
                    };
                
              
  
  
                })
              })
              clearInterval(i)
            }, 200)
        }
        else {
          console.log('not admin')
          document.getElementById("view_members").innerHTML += `
          <div class="chatContent" >
          <div
            class="defaultIcon"
            style="border: none; margin-left: 10px"
          >
            <img
              src="${ele.image}"
            />
          </div>

          <h1 class="userEmail">
          ${ele.name} <br />
            <span class="role">Member</span>
          </h1>

          <button
            class="border-0 bg-transparent f-10 pointer position-absolute on_hover-Child_show"
            style="right: 3.5%"
          >
            <i class="fas fa-ellipsis-v"></i>
            <div class="dropdown-list_another">
            <span  class="Add_admin_button">Make Admin</span>
            <span date-remove_id=${ele.id}  class="Remove_member_button">Remove</span>
                      </div>
          </button>
        </div>
              `
              var i = setInterval(() => {

                document.querySelectorAll(".Remove_member_button").forEach((ele) => {
                  ele.addEventListener("click", (e) => {
    
                      console.log("hi");
                    localStorage.removeItem("replied_id");
                    group_id = localStorage.getItem("group_id");
                    user_id = localStorage.getItem("user_id");
                    let currentMessage = e.currentTarget
                    console.log(currentMessage);
                    let message_id = currentMessage.getAttribute("date-remove_id");
                    console.log(message_id);
    
                    
                      const url = `${globalURl}/remove_members_to_group`;
                  
                      let xhr = new XMLHttpRequest();
                  
                      xhr.open("POST", url, true);
                      xhr.setRequestHeader("Content-Type", "application/json");
                      xhr.send(
                        JSON.stringify({
                          group_id,
                          message_id,
                          user_id,
                        })
                      );
                  
                      xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                          let userData = JSON.parse(xhr.responseText);
                  
                          if (userData.status == "Removed") {
                            
                            dynamicModalOpenP()
                  
                          }
                          else {
                            
                          }
                  
                  
                  
                        }
                      };
                  
                
    
    
                  })
                })
                clearInterval(i)
              }, 200)

        }
        

      });
    }



  });

}





if (document.getElementById("Subgroup_find_members")) {
  document.getElementById("Subgroup_find_members").addEventListener("keyup", () => {
    let group_members = JSON.parse(localStorage.getItem("subgroupmembersArr"));
    let value = document.getElementById("Subgroup_find_members").value;
    console.log(value);
    if (group_members.length > 0) {
      group_members.length > 0 && group_members?.map((ele) => {
        console.log(ele.name.includes(value))
        if (ele.name.includes(value)) {
          console.log('found It')
          if (ele.name == localStorage.getItem("admin")) {
            document.getElementById("subgroup_view_members").innerHTML = `
            <div class="chatContent" >
            <div
              class="defaultIcon"
              style="border: none; margin-left: 10px"
            >
              <img
                src="${ele.image}"
              />
            </div>
  
            <h1 class="userEmail">
            ${ele.name} <br />
              <span class="role">Admin</span>
            </h1>
  
            <button
              class="border-0 bg-transparent f-10 pointer position-absolute on_hover-Child_show"
              style="right: 3.5%"
            >
              <i class="fas fa-ellipsis-v"></i>
              <div class="dropdown-list_another"
              
              >
                        <span  class="Add_admin_button">Make Admin</span>
                        <span  class="Remove_submember_button">Remove</span>

                        </div>
            </button>
          </div>
            `
            var i = setInterval(() => {

              document.querySelectorAll(".Remove_submember_button").forEach((ele) => {
                ele.addEventListener("click", (e) => {
                  console.log('in remove It')

                    console.log("hi");
                  localStorage.removeItem("replied_id");
                  group_id = localStorage.getItem("group_id");
                  user_id = localStorage.getItem("user_id");
                  subgroup_id = localStorage.getItem("subgroup_id")

                  let currentMessage = e.currentTarget
                  console.log(currentMessage);
                  let message_id = currentMessage.getAttribute("date-remove_id");
                  console.log(message_id);
  
                  
                    const url = `${globalURl}/remove_members_to_subgroup`;
                
                    let xhr = new XMLHttpRequest();
                
                    xhr.open("POST", url, true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(
                      JSON.stringify({
                        group_id,
                        message_id,
                        user_id,
                        subgroup_id,
                      })
                    );
                
                    xhr.onreadystatechange = function () {
                      if (xhr.readyState == 4 && xhr.status == 200) {
                        let userData = JSON.parse(xhr.responseText);
                
                        if (userData.status == "Removed") {
                          console.log('in removed It')

                          nullSubGroupChats()
                
                        }
                        else {
                          
                        }
                
                
                
                      }
                    };
                
              
  
  
                })
              })
              clearInterval(i)
            }, 300)
          }
          else {
            document.getElementById("subgroup_view_members").innerHTML = `
            <div class="chatContent" >
            <div
              class="defaultIcon"
              style="border: none; margin-left: 10px"
            >
              <img
                src="${ele.image}"
              />
            </div>
  
            <h1 class="userEmail">
            ${ele.name} <br />
              <span class="role">Member</span>
            </h1>
  
            <button
              class="border-0 bg-transparent f-10 pointer position-absolute on_hover-Child_show"
              style="right: 3.5%"
            >
              <i class="fas fa-ellipsis-v"></i>
              <div class="dropdown-list_another">
              <span  class="Add_admin_button">Make Admin</span>
              <span date-remove_id=${ele.id}  class="Remove_submember_button">Remove</span>
                        </div>
            </button>
          </div>
            `
            var i = setInterval(() => {

              document.querySelectorAll(".Remove_submember_button").forEach((ele) => {
                ele.addEventListener("click", (e) => {
  
                    console.log("remove it");
                  localStorage.removeItem("replied_id");
                  group_id = localStorage.getItem("group_id");
                  user_id = localStorage.getItem("user_id");
                  subgroup_id = localStorage.getItem("subgroup_id")

                  let currentMessage = e.currentTarget
                  console.log(currentMessage);
                  let message_id = currentMessage.getAttribute("date-remove_id");
                  console.log(message_id);
  
                  
                    const url = `${globalURl}/remove_members_to_subgroup`;
                
                    let xhr = new XMLHttpRequest();
                
                    xhr.open("POST", url, true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(
                      JSON.stringify({
                        group_id,
                        message_id,
                        user_id,
                        subgroup_id,
                      })
                    );
                
                    xhr.onreadystatechange = function () {
                      if (xhr.readyState == 4 && xhr.status == 200) {
                        let userData = JSON.parse(xhr.responseText);
                
                        if (userData.status == "Removed") {
                          console.log('in removed It')

                          nullSubGroupChats()
                
                        }
                        else {
                          
                        }
                
                
                
                      }
                    };
                
              
  
  
                })
              })
              clearInterval(i)
            }, 200)
          }
          
        }
      });
    }
    if (value === '') {
      document.getElementById("subgroup_view_members").innerHTML = ``
      group_members.length > 0 && group_members?.map((ele) => {
        console.log(ele.name.includes(value))
        if (ele.name == localStorage.getItem("admin")) {
          console.log('found  It')

          console.log('admin')

          document.getElementById("subgroup_view_members").innerHTML += `
          <div class="chatContent" >
          <div
            class="defaultIcon"
            style="border: none; margin-left: 10px"
          >
            <img
              src="${ele.image}"
            />
          </div>

          <h1 class="userEmail">
          ${ele.name} <br />
            <span class="role">Admin</span>
          </h1>

          <button
            class="border-0 bg-transparent f-10 pointer position-absolute on_hover-Child_show"
            style="right: 3.5%"
          >
            <i class="fas fa-ellipsis-v"></i>
            <div class="dropdown-list_another"
            
            >
                      <span  class="Add_admin_button">Make Admin</span>
                      <span  class="Remove_submember_button">Remove</span>

                      </div>
          </button>
        </div>
            `
            var i = setInterval(() => {

              document.querySelectorAll(".Remove_submember_button").forEach((ele) => {
                ele.addEventListener("click", (e) => {
  
                    console.log("remove it");
                  localStorage.removeItem("replied_id");
                  group_id = localStorage.getItem("group_id");
                  user_id = localStorage.getItem("user_id");
                  subgroup_id = localStorage.getItem("subgroup_id")

                  let currentMessage = e.currentTarget
                  console.log(currentMessage);
                  let message_id = currentMessage.getAttribute("date-remove_id");
                  console.log(message_id);
  
                  
                    const url = `${globalURl}/remove_members_to_subgroup`;
                
                    let xhr = new XMLHttpRequest();
                
                    xhr.open("POST", url, true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(
                      JSON.stringify({
                        group_id,
                        message_id,
                        user_id,
                        subgroup_id,
                      })
                    );
                
                    xhr.onreadystatechange = function () {
                      if (xhr.readyState == 4 && xhr.status == 200) {
                        let userData = JSON.parse(xhr.responseText);
                
                        if (userData.status == "Removed") {
                          
                          nullSubGroupChats()
                
                        }
                        else {
                          
                        }
                
                
                
                      }
                    };
                
              
  
  
                })
              })
              clearInterval(i)
            }, 200)
        }
        else {
          console.log('not admin')
          document.getElementById("subgroup_view_members").innerHTML += `
          <div class="chatContent" >
          <div
            class="defaultIcon"
            style="border: none; margin-left: 10px"
          >
            <img
              src="${ele.image}"
            />
          </div>

          <h1 class="userEmail">
          ${ele.name} <br />
            <span class="role">Member</span>
          </h1>

          <button
            class="border-0 bg-transparent f-10 pointer position-absolute on_hover-Child_show"
            style="right: 3.5%"
          >
            <i class="fas fa-ellipsis-v"></i>
            <div class="dropdown-list_another">
            <span  class="Add_admin_button">Make Admin</span>
            <span date-remove_id=${ele.id}  class="Remove_submember_button">Remove</span>
                      </div>
          </button>
        </div>
              `
              var i = setInterval(() => {

                document.querySelectorAll(".Remove_submember_button").forEach((ele) => {
                  ele.addEventListener("click", (e) => {
    
                      console.log("in rmeove it");
                    localStorage.removeItem("replied_id");
                    group_id = localStorage.getItem("group_id");
                    user_id = localStorage.getItem("user_id");
                    subgroup_id = localStorage.getItem("subgroup_id")

                    let currentMessage = e.currentTarget
                    console.log(currentMessage);
                    let message_id = currentMessage.getAttribute("date-remove_id");
                    console.log(message_id);
    
                    
                      const url = `${globalURl}/remove_members_to_subgroup`;
                  
                      let xhr = new XMLHttpRequest();
                  
                      xhr.open("POST", url, true);
                      xhr.setRequestHeader("Content-Type", "application/json");
                      xhr.send(
                        JSON.stringify({
                          group_id,
                          message_id,
                          user_id,
                          subgroup_id,
                        })
                      );
                  
                      xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                          let userData = JSON.parse(xhr.responseText);
                  
                          if (userData.status == "Removed") {
                            console.log('in removed It')
                            nullSubGroupChats()
                  
                          }
                          else {
                            
                          }
                  
                  
                  
                        }
                      };
                  
                
    
    
                  })
                })
                clearInterval(i)
              }, 300)

        }
        

      });
    }



  });

}









if (document.getElementById("search_prospects")) {
  document.getElementById("search_prospects").addEventListener("keyup", () => {
    document.querySelector(".dynamicContainer").innerHTML = ``
    let group_members = JSON.parse(localStorage.getItem("prospects_data"));
    let value = document.getElementById("search_prospects").value;
    console.log(value);
    if (group_members.length > 0) {
      group_members.length > 0 && group_members?.map((ele) => {
        console.log(ele.name.includes(value))
        if (ele.name.includes(value)) {

          document.querySelector(".dynamicContainer").innerHTML += `
  
          <div class="prospectContentContainer">
            <div class="prospectContent" data-prospect_id=${ele.id
            }>
                        
              <img src=${ele.image} alt=""/>
      
              <div>
                <h1>${ele.name}</h1>
                <h2>${ele.sender_name != null
              ? `By ${ele.sender_name} ${ele.database != null
                ? `from ${ele.database}`
                : ""
              }`
              : ""
            }
                </h2>
              </div>
      
              ${ele.notification != 0 && ele.notification != null
              ? `<span>${ele.notification}</span>`
              : ""
            }

            </div>
            <i class="fas fa-trash prospectDeleteIcon groupProspectDelete"></i>
            </div>
            `
            ;
        }
      });
      document.querySelectorAll(".groupProspectDelete").forEach((ele) => {
        ele.addEventListener("click", groupProspectDelete);
      });

      document.querySelectorAll(".prospectContent").forEach((element) => {
        element.addEventListener("click" , () => { 
          var console = element.getAttribute("data-prospect_id")
          localStorage.setItem("prospect_id",console);
          showProspectChat();
        });
        })
    }
    if (value === '') {
      document.querySelector(".dynamicContainer").innerHTML = ``
      group_members.length > 0 && group_members?.map((ele) => {
        console.log(ele.name.includes(value))
        document.querySelector(".dynamicContainer").innerHTML += `
  
        <div class="prospectContentContainer">
          <div class="prospectContent" data-prospect_id=${ele.id
          }>
                      
            <img src=${ele.image} alt=""/>
    
            <div>
              <h1>${ele.name}</h1>
              <h2>${ele.sender_name != null
            ? `By ${ele.sender_name} ${ele.database != null
              ? `from ${ele.database}`
              : ""
            }`
            : ""
          }
              </h2>
            </div>
    
            ${ele.notification != 0 && ele.notification != null
            ? `<span>${ele.notification}</span>`
            : ""
          }

          </div>
          <i class="fas fa-trash prospectDeleteIcon groupProspectDelete"></i>
          </div>
          `;

      });
      document.querySelectorAll(".groupProspectDelete").forEach((ele) => {
        ele.addEventListener("click", groupProspectDelete);
      });

      document.querySelectorAll(".prospectContent").forEach((element) => {
        element.addEventListener("click" , () => { 
          var console = element.getAttribute("data-prospect_id")
          localStorage.setItem("prospect_id",console);
          showProspectChat();
        });
        })
    }



  });

}






if (document.querySelector("#open_sub_group")) {
  document.querySelector("#open_sub_group").addEventListener("click", () => {
    localStorage.setItem("sub_group", true)
    document.getElementById("group_heading").innerText = "Sub Group Name"
    document.getElementById("topic_div").style.display = "block"
    document.getElementById("get_description").style.display = "block"
    document.getElementById("adding_image_div").style.display = "none";
    document.getElementById("whole_container").style.marginTop = "19px";


    openModal2();

    var mainContentContainer = document.querySelector(".mainContentContainer1");

    mainContentContainer.innerHTML = ``;

    var user_id = localStorage.getItem("user_id");
    var group_id = localStorage.getItem("group_id");


    const url = `${globalURl}/group_members_chats/${user_id}/${group_id}`;

    let xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let userData = JSON.parse(xhr.responseText);

        if (userData.length != 0) {
          userData.map((item, i, arr) => {
            var row = `
            <div class="chatContent" date-linkedId=${item.linked_to_id}>
                              
              <div class="defaultIcon" style='${item.image != null
                ? "border: none; margin-left: 10px"
                : "border: 1px solid #999"
              }'>
              ${item.image != null
                ? `<img src=${item.image} />`
                : `<i class='fas fa-user'></i>`
              }
                  
              </div>
  
              <h1 class="userEmail">${item.email}</h1>
  
              <div class="dotCircle"></div>
                  
            </div>`;
            mainContentContainer.innerHTML += row;
          });
        } else {
          mainContentContainer.innerHTML = `
            <div class="chatContent">
  
              <h1 class="userEmail" >Add Members to create group</h1>
                  
            </div>`;
        }
      }
    };
  });

  document
    .getElementById("add_member2")
    .addEventListener("click", addmemberpage);
}
// edit group name modal 

// document.querySelectorAll('.edit_btn').forEach((btnSimple) => {
//   btnSimple.addEventListener("click", () => {
//     console.log('first')
//     document.getElementById('edit-group-name-modal').style.display = "block";
//   });
// })

document.querySelectorAll('.edit-group-close-btn').forEach((btnSimple) => {
  btnSimple.addEventListener("click", () => {
    console.log('first')
    document.getElementById('edit-group-name-modal').style.display = "none";
  });
})


if (document.getElementById("edit_btn_group_name")) {
  document.getElementById("edit_btn_group_name").addEventListener("click", () => {
    document.getElementById('edit-group-name-modal').style.display = "block";
    document.getElementById('edit_modal_heading').innerText = "Rename this Group"

    group_name = document.getElementById('group_setting_name_sub').innerText
    document.getElementById("edit_modal_div").innerHTML = `
    <label  for="group-name-input">Group name</label>
                  <input type="text" id="group_edit_name" value="${group_name}"  placeholder="#Pursue-Networking">
                  <small class="">Name must be lowercase, without spaces or periods, and can't be longer than 80 characters.</small>
    `
  })
}
document.querySelectorAll('.edit-group-close-btn').forEach((btnSimple) => {
  btnSimple.addEventListener("click", () => {
    console.log('first')
    document.getElementById('edit-group-name-modal').style.display = "none";
  });
})
document.querySelectorAll('.subgroup_edit-group-close-btn').forEach((btnSimple) => {
  btnSimple.addEventListener("click", () => {
    console.log('first')
    document.getElementById('subgroup_edit-group-name-modal').style.display = "none";
  });
})

if (document.getElementById("Subgroup_edit_btn_group_name")) {
  document.getElementById("Subgroup_edit_btn_group_name").addEventListener("click", () => {
    document.getElementById('subgroup_edit-group-name-modal').style.display = "block";
    document.getElementById('subgroup_edit_modal_heading').innerText = "Rename this Sub Group"

    group_name = document.getElementById('Subgroup_group_setting_name_sub').innerText
    document.getElementById("subgroup_edit_modal_div").innerHTML = `
    <label  for="group-name-input">Sub Group name</label>
                  <input type="text" id="sub_group_edit_name" value="${group_name}"  placeholder="">
                  <small class="">Name must be lowercase, without spaces or periods, and can't be longer than 80 characters.</small>
    `
  })
}
if (document.getElementById("Subgroup_second_group_edit")) {
  document.getElementById("Subgroup_second_group_edit").addEventListener("click", () => {
    document.getElementById('subgroup_edit-group-name-modal').style.display = "block";
    document.getElementById('subgroup_edit_modal_heading').innerText = "Rename this Group"

    group_name = document.getElementById('Subgroup_group_setting_name_sub').innerText
    document.getElementById("subgroup_edit_modal_div").innerHTML = `
    <label  for="group-name-input">Group name</label>
                  <input type="text" id="sub_group_edit_name" value="${group_name}"  placeholder="">
                  <small class="">Name must be lowercase, without spaces or periods, and can't be longer than 80 characters.</small>
    `
  })
}







if (document.getElementById("second_group_edit")) {
  document.getElementById("second_group_edit").addEventListener("click", () => {
    document.getElementById('edit-group-name-modal').style.display = "block";
    document.getElementById('edit_modal_heading').innerText = "Rename this Group"

    group_name = document.getElementById('group_setting_name_sub').innerText
    document.getElementById("edit_modal_div").innerHTML = `
    <label  for="group-name-input">Group name</label>
                  <input type="text" id="group_edit_name" value="${group_name}"  placeholder="#Pursue-Networking">
                  <small class="">Name must be lowercase, without spaces or periods, and can't be longer than 80 characters.</small>
    `
  })
}








if (document.getElementById("Subgroup_edit_btn_group_topic")) {
  document.getElementById("Subgroup_edit_btn_group_topic").addEventListener("click", () => {
    document.getElementById('subgroup_edit_modal_heading').innerText = "Edit Topic"

    document.getElementById('subgroup_edit-group-name-modal').style.display = "block";
    group_name = document.getElementById('subgroup_group_setting_topic').innerText
    document.getElementById("subgroup_edit_modal_div").innerHTML = `
                  <textarea type="text" id="group_edit_topic" value="${group_name}"  placeholder="Add a topic">${group_name} </textarea>
                  <small class="">Let people know what testing-teams is focused on right now (ex, a project milestone). Topics are always visible in the header.</small>
    `
  })
}


if (document.getElementById("edit_btn_group_description")) {
  document.getElementById("edit_btn_group_description").addEventListener("click", () => {
    document.getElementById('edit-group-name-modal').style.display = "block";
    document.getElementById('edit_modal_heading').innerText = "Edit Description"
    group_name = document.getElementById('group_setting_description').innerText
    document.getElementById("edit_modal_div").innerHTML = `
                  <textarea type="text" id="group_edit_description" value="${group_name}"  placeholder="Add a description">${group_name} </textarea>
                  <small class="">Let people know what this channel is for.</small>
    `
  })
}

if (document.getElementById("opening_description_here")) {
  document.getElementById("opening_description_here").addEventListener("click", () => {
    console.log("hereee")
    subgroup_id = localStorage.getItem("subgroup_id")
    if(subgroup_id != null){
      
      SubgroupsettingModl.style.transform = "scale(1)";
      SubgroupsettingModl.style.opacity = 1;
      document.getElementById('subgroup_edit-group-name-modal').style.display = "block";
      document.getElementById('subgroup_edit_modal_heading').innerText = "Edit Description"
      group_name = document.getElementById('Subgroup_group_setting_description').innerText
      document.getElementById("subgroup_edit_modal_div").innerHTML = `
                    <textarea type="text" id="subgroup_edit_description" value="${group_name}"  placeholder="Add a description">${group_name} </textarea>
                    <small class="">Let people know what this channel is for.</small>
      `
    }
    else{
      settingModl.style.transform = "scale(1)";
      settingModl.style.opacity = 1;
      document.getElementById('edit-group-name-modal').style.display = "block";

      document.getElementById('edit_modal_heading').innerText = "Edit Description"
    group_name = document.getElementById('group_setting_description').innerText
    document.getElementById("edit_modal_div").innerHTML = `
                  <textarea type="text" id="group_edit_description" value="${group_name}"  placeholder="Add a description">${group_name} </textarea>
                  <small class="">Let people know what this channel is for.</small>
    `
    }
    

    
  })
}


if (document.getElementById("Subgroup_edit_btn_group_description")) {
  document.getElementById("Subgroup_edit_btn_group_description").addEventListener("click", () => {
    document.getElementById('subgroup_edit-group-name-modal').style.display = "block";
    document.getElementById('subgroup_edit_modal_heading').innerText = "Edit Description"
    group_name = document.getElementById('Subgroup_group_setting_description').innerText
    document.getElementById("subgroup_edit_modal_div").innerHTML = `
                  <textarea type="text" id="subgroup_edit_description" value="${group_name}"  placeholder="Add a description">${group_name} </textarea>
                  <small class="">Let people know what this channel is for.</small>
    `
  })
}


if (document.getElementById("save_changes")) {
  document.getElementById("save_changes").addEventListener("click", () => {
    btn = document.getElementById('save_changes');
    btn.disabled = true;
    btn.innerText = 'Saving Data'
    let check = document.getElementById('edit_modal_heading').innerText;
    if (check == "Edit Description") {
      updateGroupDescription()
    }

    if (check == "Rename this Group") {
      updateGroupName()
    }

    if (check == "Edit Topic") {
      updateGroupTopic()
    }

  })
}
if (document.getElementById("subgroup_save_changes")) {
  document.getElementById("subgroup_save_changes").addEventListener("click", () => {
    btn = document.getElementById('subgroup_save_changes');
    btn.disabled = true;
    btn.innerText = 'Saving Data'
    let check = document.getElementById('subgroup_edit_modal_heading').innerText;
    if (check == "Edit Description") {
      updateSubGroupDescription()
    }

    if (check == "Rename this Sub Group") {
      updateSubbGroupName()
    }
    if (check == "Edit Topic") {
      updateSubbGroupTopic()
    }

    

  })
}



if (document.getElementById("AddTheMembers")) {
  document.getElementById("AddTheMembers").addEventListener("click", () => {
    document.getElementById("subGroupModal").style.transform = "scale(1)";
    document.getElementById("subGroupModal").style.opacity = 1;
  })
}
if (document.getElementById("add_member_in_chat")) {
  document.getElementById("add_member_in_chat").addEventListener("click", () => {
    document.getElementById("subGroupModal").style.transform = "scale(1)";
    document.getElementById("subGroupModal").style.opacity = 1;
  })
}
if (document.getElementById("add_member_in_screen")) {
  document.getElementById("add_member_in_screen").addEventListener("click", () => {
    document.getElementById("subGroupModal").style.transform = "scale(1)";
    document.getElementById("subGroupModal").style.opacity = 1;
  })
}
if (document.getElementById("AddMemberSecond")) {
  document.getElementById("AddMemberSecond").addEventListener("click", () => {
    document.getElementById("subGroupModal").style.transform = "scale(1)";
    document.getElementById("subGroupModal").style.opacity = 1;
  })
}

if (document.getElementById("subGroupModalCloseBtn")) {
  document
    .getElementById("subGroupModalCloseBtn")
    .addEventListener("click", closeAddMeemberModal);
}


if (document.getElementById("second_update_message_button")) {
  document
    .getElementById("second_update_message_button")
    .addEventListener("click", updating_message);
}
if (document.getElementById("update_message_button")) {
  document
    .getElementById("update_message_button")
    .addEventListener("click", updating_message);
}
if (document.getElementById("cancel_message_button")) {
  document
    .getElementById("cancel_message_button")
    .addEventListener("click", cancel_message_button);
}

if (document.getElementById("second_cancel_message_button")) {
  document
    .getElementById("second_cancel_message_button")
    .addEventListener("click", cancel_message_button);
}

function cancel_message_button() {
  document.getElementById("send_message_div").value = ''
  document.getElementById("send_message_button").style.display = "block"
  document.getElementById("update_message_button").style.display = "none"
  document.getElementById("cancel_message_button").style.display = "none"
  localStorage.removeItem("edit_id");

  document.getElementById("second_message_div").value = ''
  document.getElementById("second_send_message_button").style.display = "block"
  document.getElementById("second_update_message_button").style.display = "none"
  document.getElementById("second_cancel_message_button").style.display = "none"
  localStorage.removeItem("edit_id");
}
function updating_message() {
  var user_id = localStorage.getItem("user_id");
  var edit_id = localStorage.getItem("edit_id");
  prospect_id = localStorage.getItem("prospect_id");
  dmNullChats = localStorage.getItem("dms");
  if(dmNullChats){
    dms_updating()
  }else{
  
if(prospect_id != null){
  var updatedMessage = document.getElementById("second_message_div").value
}else{
  var updatedMessage = document.getElementById("send_message_div").value
}
  
  var subgroup_id = localStorage.getItem("subgroup_id")

  if(updatedMessage != ""){
  const url = `${globalURl}/edit_single_group_chat`;

  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      id: edit_id,
      text: updatedMessage,
    })
  );
    if(prospect_id){
      showProspectChat()
    }
    else{
      if(subgroup_id){
        nullSubGroupChats()
      }
      else
      {
        showNullChats()
      
      }
    }

}
else{
  var myToast = Toastify({
    text: "No Text Added",
    duration: 2000,
  });
  myToast.showToast();
}
}

}

function closeAddMeemberModal() {
  document.getElementById("subGroupModal").style.transform = "scale(0)";
  document.getElementById("subGroupModal").style.opacity = 0;
}


function fetchDmsInfo() {


  // const urls = `  http://api.linkedin.com/v1/people/C4D03AQHL-9J7Z-aSgw/https://media-exp2.licdn.com/dms/image/C4D03AQFEingXMw7osA/profile-displayphoto-shrink_800_800/0/1566099548392?e=1663200000&v=beta&t=u-1jtJ2aTeSveWTcQMMp2uNZE6ccuZgnJazZHsyVVCc
  // `;
  // let res = new XMLHttpRequest();

  // res.open("GET", urls, true);
  // res.setRequestHeader("Content-Type", "application/json");
  // res.send();
  localStorage.removeItem("sub_group_id");
  localStorage.removeItem("subgroup_id");
  localStorage.removeItem("group_id");

  document.getElementById("customScreenChattBox").style.display = "none"
  document.querySelector(".new-filter-row").style.display = null

  document.getElementById("add_member_in_screen").style.display ="none"
  document.querySelector(".groupContainer").style.display = "block";

  x = document.getElementById("dmsIcon");
  r = document.getElementById("groupIcon");
  console.log(x.src, "x");
  if (x.src.includes("/notselectdms")) {
    x.src = "./Assets/img/selecteddms.svg"
    r.src = "./Assets/img/notselectedGroup.svg"
  } else {

  }
console.log(document.getElementById("axes").checked)
  document.querySelector(".rightBox").style.display = "none";
  if(document.getElementById("axes").checked == false){
    document.querySelector(".groupBoxContainer").style.display = "none";
    document.querySelector(".groupBoxContainerListView").style.display = "block"
  }
  else{
    document.querySelector(".groupBoxContainer").style.display = null;
    document.querySelector(".groupBoxContainerListView").style.display = "none"
  }
  

  document.querySelector(".groupBoxContainer").style.paddingTop = "31px";

  document.getElementById("open_add_group").style.display = "none";


  localStorage.removeItem("nullGroupChat");
  localStorage.removeItem("dmNullChats");
  localStorage.removeItem("sub_group_id");
  localStorage.removeItem("prospect_id");

  localStorage.removeItem("group_name");
  localStorage.removeItem("editGroupName");
  localStorage.removeItem("sub_group");
  localStorage.removeItem('nullSubGroupChat')

  // document.getElementById("subGroupNamePara").style.display = "none";

  // document.getElementById("sendMsgBtn").style.display = "none";
  // document.getElementById("sendGroupMsgBtn").style.display = "block";
  // document.getElementById("updateMsgBtn").style.display = "none";
  // document.getElementById("updateGroupMsgBtn").style.display = "none";
  // document.getElementById("cancelMsgBtn").style.display = "none";
  // document.getElementById("cancelGroupMsgBtn").style.display = "none";

  document.querySelector(".profileMainBox ").style.display = "none"

  // document.querySelector(".rightBox").style.display = "none";
  // document.querySelector(".groupContainer").style.display = "block";

  document.getElementById("noGroupHeading").style.display = "none";

  document.querySelector(".showBtnContainer").innerHTML = "";

  document.querySelectorAll(".userIcon").forEach((ele) => {
    ele.classList.remove("userClicked");
  });

  document.querySelector(".groupDiv").classList.add("groupDivClicked");

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
        document.querySelector(".groupBoxContainer").innerHTML = `
        
    `;
        userData.map((item) => {


          var http = new XMLHttpRequest();

               http.open('HEAD', item.image, false);
               http.send();
              //  console.log(http)
               if(http.status != 200){
                console.log("test")

                const url = `${globalURl}/photo_updator_default/${item.linked_to_id}`;

                let xhr = new XMLHttpRequest();
            
                xhr.open("GET", url, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send();



               }


          document.querySelector(".groupBoxContainer").innerHTML += `
          
                <div style="position: relative;">
                <div class="groupBox" data-reciever_id=${item.linked_to_id}>
                ${item.total_notifications != 0
              ? `<span class="notify_icon">${item.total_notifications}</span> `
              : ""
            }

                <span class="tooltiptext"><span style="color:black">Name: </span>${item.mutual
            }</span>

                
                  <img src="${item.image}" class="userIconDemo" data-receiverid="32">;
                
                
                  
                  </div>
                  <div class="groupName">${item.name.length > 10
              ? `${item.mutual.slice(0, 10)} ...`
              : item.name
            }</div>
                  
                  
                </div>
            `;
        });
        document.querySelectorAll(".groupBox").forEach((ele) => {
          ele.addEventListener("click", () => {
            localStorage.setItem("reciever_id", ele.getAttribute("data-reciever_id"));
            // dynamicModalOpenP();
            showNullMembersChats()
          });
        });


        document.querySelector(".groupBoxContainerListView").innerHTML = ``
        userData.map((item) => {
          document.querySelector(".groupBoxContainerListView").innerHTML += `


          <div class="card-list-box" data-reciever_id=${item.linked_to_id}>
            <div class="img active">
              <img
                src="${item.image}"
                alt="">
            </div>
            <div class="content">
              <h5 class="name">${item.mutual
              }</h5>
              <p class="detail"></p>
            </div>

            ${item.total_notifications != 0
              ? ` <div class="badge">${item.total_notifications}</div> `
              : ""
            }

           
          </div>
          
                
                  
            `;
        });
        document.querySelectorAll(".card-list-box").forEach((ele) => {
          ele.addEventListener("click", () => {
            localStorage.setItem("reciever_id", ele.getAttribute("data-reciever_id"));
            // dynamicModalOpenP();
            showNullMembersChats()
          });
        });



        // document.querySelectorAll(".deleteGroupBox").forEach((ele) => {
        //   ele.addEventListener("click", groupDeleteion);
        // });
        // document.querySelectorAll(".leaveGroupBox").forEach((ele) => {
        //   ele.addEventListener("click", groupleaveion);
        // });

        getAllGroupsSubgroups()



      } else {
        document.querySelector(".groupBoxContainer").innerHTML = "";
        document.getElementById("noGroupHeading").style.display = "block";
      }
    }
  };


}



function getAllMembers() {
  var user_id = localStorage.getItem("user_id");

  var subgroup_id = localStorage.getItem("subgroup_id");
  var group_id = localStorage.getItem("group_id");
  let xhr = new XMLHttpRequest();

  if(subgroup_id == null){
    const url = `${globalURl}/chats/${user_id}`;

    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
  }
  else{
    const url = `${globalURl}/get_group_members`;

    

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        group_id,
        user_id,
      })
    );

  }


  

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      userActive = userData;

      // leftBox__container.innerHTML += `
      // <div class="notificationDiv"><img class="groupIcon" id="notificationsIcon" src="./Assets/img/Component 43 – 11.svg" alt="" style="width: 100%;
      // margin: 0%;
      // padding: 0%;
      // background-color: white;" /> 
      // </div>

      // <div class="dmsDiv"><img class="groupIcon" id="dmsIcon" src="./Assets/img/notselectdms.svg" alt="" style="width: 100%;
      // margin: 0%;
      // padding: 0%;
      // background-color: white;" /> 
      // </div>

      // <div class="groupDiv"><img class="groupIcon" id="groupIcon" src="./Assets/img/notselectedGroup.svg" alt="" style="width: 100%;
      // margin: 0%;
      // padding: 0%;
      // background-color: white;" /> 
      // </div>
      // `;
      if(subgroup_id == null){

      document.getElementById('add_member_container').innerHTML = ``
      document.getElementById("add_members_heading").innerText = "Add Members to General"
      userData.map((item, i, arr) => {
        var row = `
        <div class="chatContent" date-linkedId=${item.linked_to_id}>
                  <div class="defaultIcon" style="border: none; margin-left: 10px">
                  <img src="${item.image}">
                      
                  </div>
      
                  <h1 class="userEmail">${item.name}</h1>
      
                  <div class="dotCircle"></div>
                      
                </div>
        
        `;

        document.getElementById('add_member_container').innerHTML += row;
      });
    }
    else{
      document.getElementById('add_member_container').innerHTML = ``
      document.getElementById("add_members_heading").innerText = "Add Members to " + localStorage.getItem("Subgroup_name")

      userData.map((item, i, arr) => {
        var row = `
        <div class="chatContent" date-linkedId=${item.id}>
                  <div class="defaultIcon" style="border: none; margin-left: 10px">
                  <img src="${item.image}">
                      
                  </div>
      
                  <h1 class="userEmail">${item.name}</h1>
      
                  <div class="dotCircle"></div>
                      
                </div>
        
        `;

        document.getElementById('add_member_container').innerHTML += row;
      });
    }
    }
  };
}



if (document.querySelector(".AddingMember")) {
  document
    .querySelector(".AddingMember")
    .addEventListener("click", querySelector);
}

if (document.getElementById("Leave_current_group")) {
  document
    .getElementById("Leave_current_group")
    .addEventListener("click", groupleaveion);
}
if (document.getElementById("Delete_current_group")) {
  document
    .getElementById("Delete_current_group")
    .addEventListener("click", groupdeleteion);
}
if (document.getElementById("Subgroup_Leave_current_group")) {
  document
    .getElementById("Subgroup_Leave_current_group")
    .addEventListener("click", subGroupleaveion);
}
if (document.getElementById("Subgroup_delete_current_group")) {
  document
    .getElementById("Subgroup_delete_current_group")
    .addEventListener("click", subGroupdeleteion);
}
function querySelector() {
  let userArray = [];
  group_id = localStorage.getItem('group_id')
  user_id = localStorage.getItem('user_id')
  subgroup_id = localStorage.getItem("subgroup_id")
  if(subgroup_id == null)
  {

  document.querySelectorAll(".chatContentH1DotActive").forEach((item) => {
    userArray.push(Number(item.getAttribute("date-linkedId")));
  });
  if(userArray.length == 0){
    userArray = SearchUserArray;
  }
  console.log(userArray,"Array")
  if (userArray.length > 0) {

    const url = `${globalURl}/add_members_to_group`;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        group_id,
        userArray,
        user_id,
      })
    );

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let userData = JSON.parse(xhr.responseText);

        if (userData.status == "Added") {


          // document.getElementById("view_members").innerHTML = ``
          // groupmembersArr = [];
          // if (userData.members) {

          //   userData.members.length > 0 && userData?.members.map((ele) => {
          //     let member = {
          //       "name": ele.name,
          //       "image": ele.image,
          //     }
          //     groupmembersArr.push(member);
          //     console.log(groupmembersArr);
          //     console.log(member);

          //     if (userData.admin == ele.name) {
          //       document.getElementById("view_members").innerHTML += `
          //       <div class="chatContent" date-linkedid="3">
          //       <div
          //         class="defaultIcon"
          //         style="border: none; margin-left: 10px"
          //       >
          //         <img
          //           src="${ele.image}"
          //         />
          //       </div>
      
          //       <h1 class="userEmail">
          //       ${ele.name} <br />
          //         <span class="role">Admin</span>
          //       </h1>
      
          //       <button
          //         class="border-0 bg-transparent f-10 pointer position-absolute"
          //         style="right: 3.5%"
          //       >
          //         <i class="fas fa-ellipsis-v"></i>
          //       </button>
          //     </div>
          //       `
          //     } else {
          //       document.getElementById("view_members").innerHTML += `
          //       <div class="chatContent" date-linkedid="3">
          //       <div
          //         class="defaultIcon"
          //         style="border: none; margin-left: 10px"
          //       >
          //         <img
          //           src="${ele.image}"
          //         />
          //       </div>
      
          //       <h1 class="userEmail">
          //       ${ele.name} <br />
          //         <span class="role">Member</span>
          //       </h1>
      
          //       <button
          //         class="border-0 bg-transparent f-10 pointer position-absolute"
          //         style="right: 3.5%"
          //       >
          //         <i class="fas fa-ellipsis-v"></i>
          //       </button>
          //     </div>
          //       `
          //     }

          //   });

          // }

          var myToast = Toastify({
            text: "Successfully Added",
            duration: 2000,
          });
          myToast.showToast();

          localStorage.removeItem("group_members");
          localStorage.setItem("group_members", JSON.stringify(groupmembersArr));
          document.getElementById("subGroupModal").style.transform = "scale(0)";
          document.getElementById("subGroupModal").style.opacity = 0;
          SearchUserArray = [];

          if(subgroup_id != null){
            nullSubGroupChats()
          }
          else{
            dynamicModalOpenP()
          }

        }
        else {
          var myToast = Toastify({
            text: "This User Is Already In The Group",
            duration: 2000,
          });
          myToast.showToast();
        }



      }
    };


  } else {
    var myToast = Toastify({
      text: "At least Select 1 Members",
      duration: 2000,
    });

    myToast.showToast();
  }


  console.log("add member")
}

else{

  document.querySelectorAll(".chatContentH1DotActive").forEach((item) => {
    userArray.push(Number(item.getAttribute("date-linkedId")));
  });

  if (userArray.length > 0) {

    const url = `${globalURl}/add_members_to_group`;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        group_id,
        userArray,
        user_id,
        subgroup_id,
      })
    );

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let userData = JSON.parse(xhr.responseText);

        if (userData.status == "Added") {
          


          // document.getElementById("view_members").innerHTML = ``
          // groupmembersArr = [];
          // if (userData.members) {

          //   userData.members.length > 0 && userData?.members.map((ele) => {
          //     let member = {
          //       "name": ele.name,
          //       "image": ele.image,
          //     }
          //     groupmembersArr.push(member);
          //     console.log(groupmembersArr);
          //     console.log(member);

          //     if (userData.admin == ele.name) {
          //       document.getElementById("view_members").innerHTML += `
          //       <div class="chatContent" date-linkedid="3">
          //       <div
          //         class="defaultIcon"
          //         style="border: none; margin-left: 10px"
          //       >
          //         <img
          //           src="${ele.image}"
          //         />
          //       </div>
      
          //       <h1 class="userEmail">
          //       ${ele.name} <br />
          //         <span class="role">Admin</span>
          //       </h1>
      
          //       <button
          //         class="border-0 bg-transparent f-10 pointer position-absolute"
          //         style="right: 3.5%"
          //       >
          //         <i class="fas fa-ellipsis-v"></i>
          //       </button>
          //     </div>
          //       `
          //     } else {
          //       document.getElementById("view_members").innerHTML += `
          //       <div class="chatContent" date-linkedid="3">
          //       <div
          //         class="defaultIcon"
          //         style="border: none; margin-left: 10px"
          //       >
          //         <img
          //           src="${ele.image}"
          //         />
          //       </div>
      
          //       <h1 class="userEmail">
          //       ${ele.name} <br />
          //         <span class="role">Member</span>
          //       </h1>
      
          //       <button
          //         class="border-0 bg-transparent f-10 pointer position-absolute"
          //         style="right: 3.5%"
          //       >
          //         <i class="fas fa-ellipsis-v"></i>
          //       </button>
          //     </div>
          //       `
          //     }

          //   });

          // }

          var myToast = Toastify({
            text: "Successfully Added",
            duration: 2000,
          });
          myToast.showToast();

          localStorage.removeItem("group_members");
          localStorage.setItem("group_members", JSON.stringify(groupmembersArr));
          document.getElementById("subGroupModal").style.transform = "scale(0)";
          document.getElementById("subGroupModal").style.opacity = 0;

          if(subgroup_id != null){
            nullSubGroupChats()
          }
          else{
            dynamicModalOpenP()
          }

        }
        else {
          var myToast = Toastify({
            text: "This User Is Already In The Group",
            duration: 2000,
          });
          myToast.showToast();
        }



      }
    };


  } else {
    var myToast = Toastify({
      text: "At least Select 1 Members",
      duration: 2000,
    });

    myToast.showToast();
  }


  console.log("add member")



}

}


if (document.getElementById("notify_img_second")) {
  document.getElementById("notify_img_second").addEventListener("click", () => {
    document.getElementById("opening_members").classList.add('active');
    document.getElementById("MembersDiv").classList.add('active');
    document.getElementById("opening_about").classList.remove('active');
    document.getElementById("AboutDiv").classList.remove('active');



    settingModl.style.transform = "scale(1)";
    settingModl.style.opacity = 1;
  });
}

if (document.getElementById("subgroup_notify_img_second")) {
  document.getElementById("subgroup_notify_img_second").addEventListener("click", () => {
    document.getElementById("Subgroup_opening_members").classList.add('active');
    document.getElementById("Subgroup_MembersDiv").classList.add('active');
    document.getElementById("Subgroup_opening_about").classList.remove('active');
    document.getElementById("Subgroup_AboutDiv").classList.remove('active');
    SubgroupsettingModl.style.transform = "scale(1)";
    SubgroupsettingModl.style.opacity = 1;
  });
}
if (document.getElementById("Screen_notify_img")) {
  document.getElementById("Screen_notify_img").addEventListener("click", () => {
    subgroup_id = localStorage.getItem("subgroup_id")
    if(subgroup_id){
      document.getElementById("Subgroup_opening_members").classList.add('active');
      document.getElementById("Subgroup_MembersDiv").classList.add('active');
      document.getElementById("Subgroup_opening_about").classList.remove('active');
      document.getElementById("Subgroup_AboutDiv").classList.remove('active');
      SubgroupsettingModl.style.transform = "scale(1)";
      SubgroupsettingModl.style.opacity = 1;
    }
    else{
      document.getElementById("opening_members").classList.add('active');
      document.getElementById("MembersDiv").classList.add('active');
      document.getElementById("opening_about").classList.remove('active');
      document.getElementById("AboutDiv").classList.remove('active');
      settingModl.style.transform = "scale(1)";
      settingModl.style.opacity = 1;
    }
    
  });
}


if (document.getElementById("profile_image_icon")) {
  document.getElementById("profile_image_icon").addEventListener("input", addimage);
}
function addimage(){
  let imageFile = document.getElementById('profile_image_icon').files[0];
  document.querySelector('#groupAvatar').src = URL.createObjectURL(imageFile)

}

if (document.getElementById("profile_image_icon-main")) {
  document.getElementById("profile_image_icon-main").addEventListener("input", UpdateGroupImage);
}
function UpdateGroupImage(){
  let imageFile = document.getElementById('profile_image_icon-main').files[0];
  document.querySelector('#group_chat_icon').src = URL.createObjectURL(imageFile)
  let group_id = localStorage.getItem("group_id");

// Claudinary API 

const data = new FormData()
        data.append("file", imageFile)
        data.append("upload_preset", "group_images")
        data.append("cloud_name", "fastech")
        fetch("https://api.cloudinary.com/v1_1/fastech/image/upload", {
          method: "post",
          body: data
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            savedImage = data.url;

          })
          .catch(err => {
            console.log(err)
          })


  var i = setInterval(() => {
  
    const url = `${globalURl}/edit_group_name`;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        id: group_id,
        image: savedImage,
      })
    );

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let userData = JSON.parse(xhr.responseText);

        if (userData.status == "Updated") {

          var myToast = Toastify({
            text: "Group Image changed successfully",
            duration: 2000,
          });

          myToast.showToast();
          document.getElementById("image_group").src = userData.name;
          
        }
      }
      
    };
    clearInterval(i)
    
  }, 2000)
  



}
if (document.querySelector(".edit-text-msg-box")) {
  document.querySelector(".edit-text-msg-box").addEventListener("click", remove_reply_box);
}

function remove_reply_box(){
  document.querySelector(".edit-text-msg-box").style.display ="none";
  localStorage.removeItem("replied_id");
}
if (document.querySelector(".prospect_edit-text-msg-box")) {
  document.querySelector(".prospect_edit-text-msg-box").addEventListener("click", prospect_remove_reply_box);
}
function prospect_remove_reply_box(){
  document.querySelector(".prospect_edit-text-msg-box").style.display ="none";
  localStorage.removeItem("replied_id");
}
if (document.getElementById("Conversations_button")) {
  document.getElementById("Conversations_button").addEventListener("click", () => {
    group_id = localStorage.getItem("group_id")
    if(group_id != null){

      conversation_button()
    }
    else{
      localStorage.removeItem("prospect_id")
      localStorage.removeItem("edit_id")
      document.getElementById("second_message_div").value = null
      document.getElementById("second_send_message_button").style.display = "block"
      document.getElementById("second_update_message_button").style.display = "none"
      document.getElementById("second_cancel_message_button").style.display = "none"


      

      showNullMembersChats()
    }
  });
}




function conversation_button(){
  localStorage.removeItem("replied_id")
  localStorage.removeItem("prospect_id");
  document.querySelector(".edit-text-msg-box").style.display = "none"
  document.querySelector(".prospect_edit-text-msg-box").style.display = "none"
  document.getElementById("customScreenChattBox").style.display = "none"
  document.querySelector(".profileMainBox").style.display = "block"

  localStorage.removeItem("edit_id")
  document.getElementById("send_message_div").value = null
  document.getElementById("send_message_button").style.display = 'block'
  document.getElementById("update_message_button").style.display = 'none'
  document.getElementById("cancel_message_button").style.display = 'none'

}
function dms_updating(){
  localStorage.removeItem("replied_id");

      document.querySelector(".prospect_edit-text-msg-box").style.display = "none"
      let message_id = localStorage.getItem("edit_id");
      let updatedMessage = document.getElementById("second_message_div").value;

      const url = `${globalURl}/edit_single_chat`;

      let xhr = new XMLHttpRequest();

      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          id: message_id,
          text: updatedMessage,
        })
      );
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let response = JSON.parse(xhr.responseText);
          localStorage.removeItem("message_id");
          if (response.status == "Updated") {
            document.getElementById("second_update_message_button").style.display = "none"
            document.getElementById("second_cancel_message_button").style.display = "none"
            document.getElementById("second_send_message_button").style.display = "block"
            document.getElementById("second_message_div").value = ""
            showNullMembersChats()
          }
        }
      }


}
function deleteDmsMessage(){
  localStorage.removeItem("replied_id");

    document.querySelector(".prospect_edit-text-msg-box").style.display = "none"
  let message_id = document.getElementById("confirmation_delete").getAttribute("data-replied_id");
  const url = `${globalURl}/delete_single_chat/${message_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.status == "Deleted") {
        MessageDeleteModal.style.transform = "scale(0)";
        MessageDeleteModal.style.opacity = 0;
        showNullMembersChats() 
      }
    }
  }
}


if (document.getElementById("find_members")) {
  document.getElementById("find_members").addEventListener("keyup", () => {})
}
function tensors(){
  console.log("hi")
}

if (document.getElementById("changing_view")) {
  document.getElementById("changing_view").addEventListener("click", () => {
    x = document.getElementById("axes")
    if(x.checked == true){
      console.log(document.querySelector(".groupBoxContainer").style.display)
      document.querySelector(".groupBoxContainerListView").style.display = "block";
      document.querySelector(".groupBoxContainer").style.display = "none"

    }
    else{
      console.log(document.querySelector(".groupBoxContainer").style.display)
      document.querySelector(".groupBoxContainerListView").style.display = "none";
      document.querySelector(".groupBoxContainer").style.display = null
    }

  })
}

function getAllGroupsSubgroups(){

  user_id = localStorage.getItem("user_id");
  const url = `${globalURl}/get_all_groups_subgroups`;

  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      user_id,
      
    })
  );


  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      document.getElementById("select1").innerHTML = ``
      document.getElementById("select1").innerHTML = `
        <option value="" class='SelectOption'></option>
        `
      
      userData.groups.map((item) => {
        document.getElementById("select1").innerHTML += `
        <option value="${item.id}" class='SelectOption'>${item.name}</option>
        `
      });

      document.getElementById("select2").innerHTML = ``
      



      
    }
  };

}


if (document.getElementById("select1")) {
  document.getElementById("select1").addEventListener("change", () => {
    // console.log(document.getElementById("select1").value)

    group_id = document.getElementById("select1").value;
    console.log(document.getElementById("select2").value)
    user_id = localStorage.getItem("user_id")
    const url = `${globalURl}/get_filtered_members`;

    let xhr = new XMLHttpRequest();
    if(group_id.length > 0)
    {
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        group_id,
        user_id
      })
    );

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let userData = JSON.parse(xhr.responseText);
        if(userData.subgroup_data.length > 0)
        {
        userData.subgroup_data.map((item) => {
          document.getElementById("select2").innerHTML += `
          <option value="${item.id}" class='SelectOption'>${item.name}</option>
          `
        });
      }

      if(userData.members.length > 0)
      {
        document.querySelector(".groupBoxContainer").innerHTML = ``
      userData.members.map((item) => {


        document.querySelector(".groupBoxContainer").innerHTML += `
          
                <div style="position: relative;">
                <div class="groupBox" data-reciever_id=${item.member_id}>
                ${item.total_notifications != 0
              ? `<span class="notify_icon">${item.total_notifications}</span> `
              : ""
            }

                <span class="tooltiptext"><span style="color:black">Name: </span>${item.member_name
            }</span>

                
                  <img src="${item.member_image}" class="userIconDemo" data-receiverid="32">;
                
                
                  
                  </div>
                  <div class="groupName">${item.member_name.length > 10
              ? `${item.member_name.slice(0, 10)} ...`
              : item.member_name
            }</div>
                  
                  
                </div>
            `;
        
      });
      document.querySelectorAll(".groupBox").forEach((ele) => {
        ele.addEventListener("click", () => {
          localStorage.setItem("reciever_id", ele.getAttribute("data-reciever_id"));
          // dynamicModalOpenP();
          showNullMembersChats()
        });
      });

      document.getElementById("select2").innerHTML = ``
      document.getElementById("select2").innerHTML = `<option value="" class='SelectOption'>General</option>`
      userData.subgroup_data.map((item) => {
        document.getElementById("select2").innerHTML += `
        <option value="${item.id}" class='SelectOption'>${item.name}</option>
        `
      });

      document.querySelector(".groupBoxContainerListView").innerHTML = ``

      userData.members.map((item) => {


        document.querySelector(".groupBoxContainerListView").innerHTML += `


          <div class="card-list-box" data-reciever_id=${item.member_id}>
            <div class="img active">
              <img
                src="${item.member_image}"
                alt="">
            </div>
            <div class="content">
              <h5 class="name">${item.member_name
              }</h5>
              <p class="detail"></p>
            </div>

            ${item.total_notifications != 0
              ? ` <div class="badge">${item.total_notifications}</div> `
              : ""
            }

           
          </div>
          
                
                  
            `;
        
      });
      document.querySelectorAll(".card-list-box").forEach((ele) => {
        ele.addEventListener("click", () => {
          localStorage.setItem("reciever_id", ele.getAttribute("data-reciever_id"));
          // dynamicModalOpenP();
          showNullMembersChats()
        });
      });
      }


      }
    }
  }
  else{
    fetchDmsInfo();
  }



  })
}




if (document.getElementById("select2")) {
  document.getElementById("select2").addEventListener("change", () => {
    // console.log(document.getElementById("select1").value)

    group_id = document.getElementById("select1").value;
    subgroup_id = document.getElementById("select2").value
    user_id = localStorage.getItem("user_id")
    const url = `${globalURl}/get_filtered_members`;

    let xhr = new XMLHttpRequest();
  
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        group_id,
        user_id,
        subgroup_id
      })
    );

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let userData = JSON.parse(xhr.responseText);
        

      if(userData.members.length > 0)
      {
        document.querySelector(".groupBoxContainer").innerHTML = ``
      userData.members.map((item) => {


        document.querySelector(".groupBoxContainer").innerHTML += `
          
                <div style="position: relative;">
                <div class="groupBox" data-reciever_id=${item.member_id}>
                ${item.total_notifications != 0
              ? `<span class="notify_icon">${item.total_notifications}</span> `
              : ""
            }

                <span class="tooltiptext"><span style="color:black">Name: </span>${item.member_name
            }</span>

                
                  <img src="${item.member_image}" class="userIconDemo" data-receiverid="32">;
                
                
                  
                  </div>
                  <div class="groupName">${item.member_name.length > 10
              ? `${item.member_name.slice(0, 10)} ...`
              : item.member_name
            }</div>
                  
                  
                </div>
            `;
        
      });
      document.querySelectorAll(".groupBox").forEach((ele) => {
        ele.addEventListener("click", () => {
          localStorage.setItem("reciever_id", ele.getAttribute("data-reciever_id"));
          // dynamicModalOpenP();
          showNullMembersChats()
        });
      });

      

      document.querySelector(".groupBoxContainerListView").innerHTML = ``

      userData.members.map((item) => {


        document.querySelector(".groupBoxContainerListView").innerHTML += `


          <div class="card-list-box" data-reciever_id=${item.member_id}>
            <div class="img active">
              <img
                src="${item.member_image}"
                alt="">
            </div>
            <div class="content">
              <h5 class="name">${item.member_name
              }</h5>
              <p class="detail"></p>
            </div>

            ${item.total_notifications != 0
              ? ` <div class="badge">${item.total_notifications}</div> `
              : ""
            }

           
          </div>
          
                
                  
            `;
        
      });
      document.querySelectorAll(".card-list-box").forEach((ele) => {
        ele.addEventListener("click", () => {
          localStorage.setItem("reciever_id", ele.getAttribute("data-reciever_id"));
          // dynamicModalOpenP();
          showNullMembersChats()
        });
      });
    }


      }
    };



  })
}

if (document.getElementById("searching_members_to_add")) {
  document.getElementById("searching_members_to_add").addEventListener("keyup", () => {
    let tempArray = []
    console.log("searching")
    document.querySelectorAll(".chatContentH1DotActive").forEach((item) => {
      tempArray.push(Number(item.getAttribute("date-linkedId")));
    });
    for(i = 0;i <= tempArray.length - 1;i++){
      console.log(SearchUserArray.indexOf(tempArray[i]))
      if(SearchUserArray.indexOf(tempArray[i]) !== -1 ){

      }else{
        SearchUserArray.push(tempArray[i]);
      }
    }
    // for(i = 0;i <= SearchUserArray.length - 1;i++){
    //   console.log(tempArray.indexOf(SearchUserArray[i]))
    //   if(tempArray.indexOf(SearchUserArray[i]) !== -1 ){

    //   }else{
    //     SearchUserArray.splice(i, 1)
    //   }
    // }
    
    console.log(SearchUserArray,"Search")
    user_id = localStorage.getItem("user_id")
    value = document.getElementById("searching_members_to_add").value
    console.log(value);
    group_id = localStorage.getItem("group_id");
    subgroup_id = localStorage.getItem("subgroup_id");

  const url = `${globalURl}/searching_group_members`;

  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      user_id,
      value,
      group_id,
      subgroup_id
    })
  );

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);
      if(subgroup_id){

        document.getElementById('add_member_container').innerHTML = ``
        userData.map((item, i, arr) => {
          if(SearchUserArray.indexOf(item.id) !== -1){
            var row = `
          <div class="chatContent chatContentH1DotActive" date-linkedId=${item.id}>
                    <div class="defaultIcon" style="border: none; margin-left: 10px">
                    <img src="${item.image}">
                        
                    </div>
        
                    <h1 class="userEmail">${item.name}</h1>
        
                    <div class="dotCircle"></div>
                        
                  </div>
          
          `;
  
          document.getElementById('add_member_container').innerHTML += row;
          }
          else{

            var row = `
          <div class="chatContent" date-linkedId=${item.id}>
                    <div class="defaultIcon" style="border: none; margin-left: 10px">
                    <img src="${item.image}">
                        
                    </div>
        
                    <h1 class="userEmail">${item.name}</h1>
        
                    <div class="dotCircle"></div>
                        
                  </div>
          
          `;
  
          document.getElementById('add_member_container').innerHTML += row;
          }
          
        });
      }
      else
      {
      document.getElementById('add_member_container').innerHTML = ``
      userData.map((item, i, arr) => {
        

          if(item.name){
              if(SearchUserArray.indexOf(item.linked_to_id) !== -1){
              var row = `
              <div class="chatContent chatContentH1DotActive" date-linkedId=${item.linked_to_id}>
                        <div class="defaultIcon" style="border: none; margin-left: 10px">
                        <img src="${item.image}">
                            
                        </div>
            
                        <h1 class="userEmail">${item.name}</h1>
            
                        <div class="dotCircle"></div>
                            
                      </div>
              
              `;
      
              document.getElementById('add_member_container').innerHTML += row;
            }
            else{
              var row = `
              <div class="chatContent" date-linkedId=${item.linked_to_id}>
                        <div class="defaultIcon" style="border: none; margin-left: 10px">
                        <img src="${item.image}">
                            
                        </div>
            
                        <h1 class="userEmail">${item.name}</h1>
            
                        <div class="dotCircle"></div>
                            
                      </div>
              
              `;
      
              document.getElementById('add_member_container').innerHTML += row;
            }
        }

        
      });
    }

      

    }
  };





  });
}




if (document.getElementById("searching_members_to_create")) {
  document.getElementById("searching_members_to_create").addEventListener("keyup", () => {
    var mainContentContainer = document.querySelector(".mainContentContainer1");

    console.log("searching")
    user_id = localStorage.getItem("user_id")
    value = document.getElementById("searching_members_to_create").value
    console.log(value);
    group_id = localStorage.getItem("group_id");
    subgroup_id = localStorage.getItem("subgroup_id");
    if(group_id){
      subgroup_id = group_id;
    }
  const url = `${globalURl}/searching_group_members`;

  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      user_id,
      value,
      group_id,
      subgroup_id
    })
  );

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);
      if(subgroup_id){
        mainContentContainer.innerHTML = ``
        userData.map((item, i, arr) => {
          var row = `
          <div class="chatContent" date-linkedId=${item.id}>
                    <div class="defaultIcon" style="border: none; margin-left: 10px">
                    <img src="${item.image}">
                        
                    </div>
        
                    <h1 class="userEmail">${item.name}</h1>
        
                    <div class="dotCircle"></div>
                        
                  </div>
          
          `;
  
          mainContentContainer.innerHTML += row;
        });
      }
      else
      {
        mainContentContainer.innerHTML = ``
      userData.map((item, i, arr) => {
        if(item.name){
        var row = `
        <div class="chatContent" date-linkedId=${item.linked_to_id}>
                  <div class="defaultIcon" style="border: none; margin-left: 10px">
                  <img src="${item.image}">
                      
                  </div>
      
                  <h1 class="userEmail">${item.name}</h1>
      
                  <div class="dotCircle"></div>
                      
                </div>
        
        `;

        mainContentContainer.innerHTML += row;
      }
      });
    }

      

    }
  };





  });
}

if (document.getElementById("screenaddimageInput")) {
  document.getElementById("screenaddimageInput").addEventListener("change", () => {
    console.log("sending Image")
    document.getElementById("second_message_div").value = null
    let imageFile = document.getElementById('screenaddimageInput').files[0];
    const data = new FormData()
        data.append("file", imageFile)
        data.append("upload_preset", "group_images")
        data.append("cloud_name", "fastech")
        fetch("https://api.cloudinary.com/v1_1/fastech/image/upload", {
          method: "post",
          body: data
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            savedImage = data.url;

          })
          .catch(err => {
            console.log(err)
          })

          var i = setInterval(() => {
          document.getElementById("second_message_div").value = `<a href="${savedImage}" target="blank"><img style="min-height: 78px;
          max-width: 100%;cursor:pointer" src="${savedImage}"> </a>`;
          document.getElementById('screenaddimageInput').files = null;
          clearInterval(i)

          }, 1000)




  })
}


if (document.getElementById("addimageInput")) {
  document.getElementById("addimageInput").addEventListener("change", () => {
    console.log("sending Image")
    document.getElementById("send_message_div").value = null
    let imageFile = document.getElementById('addimageInput').files[0];
    const data = new FormData()
        data.append("file", imageFile)
        data.append("upload_preset", "group_images")
        data.append("cloud_name", "fastech")
        fetch("https://api.cloudinary.com/v1_1/fastech/image/upload", {
          method: "post",
          body: data
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            savedImage = data.url;

          })
          .catch(err => {
            console.log(err)
          })

          var i = setInterval(() => {
          document.getElementById("send_message_div").value = `<a href="${savedImage}" target="blank"><img  style="min-height: 70px;
          width: auto;
          cursor: pointer;
          max-height: 85px;" src="${savedImage}"> </a>`;
          document.getElementById('addimageInput').files = null;
          clearInterval(i)

          }, 1000)




  })
}


if (document.getElementById("addFileInput")) {
  document.getElementById("addFileInput").addEventListener("change", () => {
    console.log("file send")
    document.getElementById("send_message_div").value = null
    let imageFile = document.getElementById('addFileInput').files[0];
    const data = new FormData()
        data.append("file", imageFile)
        data.append("upload_preset", "group_images")
        data.append("cloud_name", "fastech")
        fetch("https://api.cloudinary.com/v1_1/fastech/image/upload", {
          method: "post",
          body: data
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            savedImage = data.url;

          })
          .catch(err => {
            console.log(err)
          })

          var i = setInterval(() => {
          document.getElementById("send_message_div").value = `<a href="https://precious-ride.thefastech.com/download/${savedImage}" target="blank">${savedImage}</a>`;
          document.getElementById('addFileInput').files = null;
          clearInterval(i)

          }, 1000)




  })
}


if (document.getElementById("screenaddFileInput")) {
  document.getElementById("screenaddFileInput").addEventListener("change", () => {
    console.log("Second file send")
    document.getElementById("second_message_div").value = null
    let imageFile = document.getElementById('screenaddFileInput').files[0];
    const data = new FormData()
        data.append("file", imageFile)
        data.append("upload_preset", "group_images")
        data.append("cloud_name", "fastech")
        fetch("https://api.cloudinary.com/v1_1/fastech/image/upload", {
          method: "post",
          body: data
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            savedImage = data.url;

          })
          .catch(err => {
            console.log(err)
          })

          var i = setInterval(() => {
          document.getElementById("second_message_div").value = `<a href="https://precious-ride.thefastech.com/download/${savedImage}" target="blank">${savedImage}</a>`;
          document.getElementById('screenaddFileInput').files = null;
          clearInterval(i)

          }, 1000)




  })
}
window.addEventListener("click", () => 
{
  document.getElementById("dynamicModalll").style.transform = "scale(0)"
  document.getElementById("dynamicModalll").style.opacity = 0
}

)

if (document.getElementById("add_comment")) {
  document.getElementById("add_comment").addEventListener("click", addComment);
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

    localStorage.setItem("commentID", JSON.stringify(commentArray));

    commentArray = [];

    if (document.getElementById("update_comment").style.display == "none") {
      const url = `${globalURl}/addComment`;
      var actual_id = document.getElementById("temporary_sender").value
      if (!actual_id) {
        actual_id = user_id;
      }
      var profile_link = document.getElementById("temporary_url").value;
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

              localStorage.setItem("commentID", JSON.stringify(commentArray));
                document.querySelector(".taggedUser").innerHTML = "";
                document.getElementById("comment_box").value = "";
                user_id = document.getElementById("temporary_sender").value 
                profile_link = document.getElementById("temporary_url").value 


                var access_token = localStorage.getItem("access_token");
                var username = localStorage.getItem("username");

                if (access_token && username) {
                  document.getElementById("comment_box").disabled = false;

                  setTimeout(() => {
                    const url = `${globalURl}/getComments`;

                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", url, true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(
                      JSON.stringify({
                        profile_link: profile_link,
                        secondary_id: user_id,
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


            } else {
            }
          }
        };
      }
    } else {
      let comment_id = localStorage.getItem("comment_id");
      let updatedComment = document.getElementById("comment_box").value;
      document.getElementById("update_comment").style.display = "none";
      document.getElementById("cancel_comment").style.display = "none";
      document.getElementById("add_comment").style.display = "block";


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



                localStorage.setItem("commentID", JSON.stringify(commentArray));
                document.querySelector(".taggedUser").innerHTML = "";
                document.getElementById("comment_box").value = "";
                user_id = document.getElementById("temporary_sender").value 
                profile_link = document.getElementById("temporary_url").value 


                var access_token = localStorage.getItem("access_token");
                var username = localStorage.getItem("username");

                if (access_token && username) {
                  document.getElementById("comment_box").disabled = false;

                  setTimeout(() => {
                    const url = `${globalURl}/getComments`;

                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", url, true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(
                      JSON.stringify({
                        profile_link: profile_link,
                        secondary_id: user_id,
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
        
        document.getElementById("update_comment").style.display = "none";
        document.getElementById("cancel_comment").style.display = "none";
        document.getElementById("add_comment").style.display = "block";
        document.getElementById("comment_box").value = null;

        localStorage.setItem("commentID", JSON.stringify(commentArray));
        document.querySelector(".taggedUser").innerHTML = "";
        document.getElementById("comment_box").value = "";
        user_id = document.getElementById("temporary_sender").value 
        profile_link = document.getElementById("temporary_url").value 


        var access_token = localStorage.getItem("access_token");
        var username = localStorage.getItem("username");

        if (access_token && username) {
          document.getElementById("comment_box").disabled = false;

          setTimeout(() => {
            const url = `${globalURl}/getComments`;

            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(
              JSON.stringify({
                profile_link: profile_link,
                secondary_id: user_id,
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

              localStorage.removeItem("comment_id");



      }
    }
  };
}

document.getElementById("send_message_div").addEventListener("keypress", function(event) {
  if(document.getElementById("send_message_button").style.display == "block"){
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("send_message_button").click();
    }
  }
  
});


document.getElementById("second_message_div").addEventListener("keypress", function(event) {
  if(document.getElementById("second_send_message_button").style.display == "block"){
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("second_send_message_button").click();
    }
  }
  
});



if (document.getElementById("send_CRM")) {
  document.getElementById("send_CRM").addEventListener("click", () => {
   

    var myToast = Toastify({
      text: "Database Changed",
      duration: 2000,
    });

    myToast.showToast();

    prospect_id = document.getElementById("temporary_prospect_id").value;
    link = document.getElementById("temporary_url").value;

    let params = {
      active: true,
      currentWindow: true,
    };
    chrome.tabs.query(params, gotTab);
    function gotTab(tabs) {
    let msg = {
      txt: link,
    };
    chrome.tabs.sendMessage(tabs[0].id, msg);
  }
  localStorage.setItem("modalProspectId", prospect_id);
    localStorage.setItem("modalProspectLink", link);
    localStorage.setItem("isImageClicked", true);
    naming = localStorage.getItem("user_id")
    const url = `${globalURl}/get_prospect_Data`;
  
                                let xhr = new XMLHttpRequest();
  
                                xhr.open("POST", url, true);
                                xhr.setRequestHeader("Content-Type", "application/json");
                                xhr.send(
                                  JSON.stringify({
                                    prospect_id,
                                    user_id: naming,
                                  })
                                );
  
                                xhr.onreadystatechange = function () {
                                  if (xhr.readyState == 4 && xhr.status == 200) {
                                    let userData = JSON.parse(xhr.responseText);
                                    if (userData.data) {
                                      user_name = document.getElementById("prospect_status_name").value;
                                      user_image = document.getElementById("prospect_status_image").value;
                                      user_idd = document.getElementById("temporary_sender").value;

                                      localStorage.setItem("prospectData", JSON.stringify(userData.data));
                                      localStorage.setItem("secondUserPic",user_image)
                                      localStorage.setItem("second_user_id",user_idd)
                                      localStorage.setItem("second_user_name",user_name)
                                      window.location.replace("popup.html");
                                    }
                                      
                                    
                                  }
                                }




    
  });
}
