// Get Calender Data

setTimeout(() => {
  getMonthlyCalendarData();
  getWeeklyCalendarData();
  updateMonthlySlideWeekDates();
  updateWeeklySlideWeekDates();
  updateDatesDailySlider2();
  topbaricons();
}, 100);

// Test URL

// const globalURl = "https://precious-ride.thefastech.com";

// Stable URL

const globalURl = "https://linkedin.thefastech.com";

// Test URL

// const globalURl = "https://testlinkedin.thefastech.com";

(function () {
  let isCalendarOpen = localStorage.getItem("isCalendarOpen");
  if (isCalendarOpen != null) {
    localStorage.removeItem("isCalendarOpen");
    document.querySelector(".monthlyScreen").style.display = "none";
    document.querySelector(".weeklyScreen").style.display = "none";
    document.querySelector(".dailyScreen").style.display = "block";
    document.querySelectorAll(".slideBtn").forEach((ele) => {
      ele.classList.remove("activeSlideBtn");
    });
    document.querySelector(".dailyBtn").classList.add("activeSlideBtn");
  }
})();

// Slider (Monthly, Weekly, Daily) Code

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
  if(secondUserPic != "")
  {
    document.getElementById("profilePic").src = secondUserPic
  }
  else
  {
    profilePic = localStorage.getItem("profilePic");
    document.getElementById("profilePic").src = profilePic
  }
  name = localStorage.getItem("second_user_name")
  if(name != "null" && name != "")
  {
    document.getElementById("savedUserMessage").innerText =
    `You're in ${name}'s Database`;
  }
  else
  {
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
			  <input type="hidden" id="value${z}" value="${item.linked_to_id}"></input>
        <div class="iconMsgPicContainer">
        ${
          item.total_notifications != 0
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

      if(userData.users.length > 3){

        document.querySelector(
          ".imgContainer"
        ).innerHTML += `<span class='showMembersAll'><i class="fas fa-eye"></i></span>`;
  
        document
          .querySelector(".showMembersAll")
          .addEventListener("click", () => {
            document.querySelector(".membersContainer").innerHTML = ''

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
  
                if(userData.length > 0 ){
                  userData.map((item, i, arr) => {
                    var row = `
                      <div class="prospectContent memberDiv" data-member_id=${
                        item.linked_to_id
                      }>
                                  
                        <img src=${item.image} alt=""/>
          
                        <h1>${item.mutual}</h1>
    
                      </div>
                    `;
    
                    document.querySelector('.membersContainer').innerHTML += row;
                  });
                }
                else{
                  document.querySelector('.membersContainer').innerHTML = `
                    <div class="prospectContent">
                                    
                      <h1>No Chat Memebers</h1>
  
                    </div>
                  `
                }
              }
            };
          });
          
          setInterval(() => {
            if(document.querySelector('.memberDiv')){
              document.querySelectorAll('.memberDiv').forEach(ele => {
                ele.addEventListener('click', (e) => {
                  let receiver_id = ele.getAttribute('data-member_id')
                  localStorage.setItem("reciever_id", receiver_id);
                  openDirectChat();
                })
              })
            }
          }, 100)
  
  
        document
          .querySelector("#membersDynamicModalCloseBtn")
          .addEventListener("click", () => {
            document.getElementById("membersDynamicModal").style.transform =
              "scale(0)";
            document.getElementById("membersDynamicModal").style.opacity = 0;
          });
  
        }

      document.getElementById("middleNav").style.marginTop = "0px";

      if (userData.groups != 200) {

        if (userData.groups.length > 3) {
          document
            .querySelectorAll(".new_header_right_imgs")
            .forEach((ele) => {
              ele.innerHTML = `<span class='showGroupsAll'><i class="fas fa-eye"></i></span>`;
            });
          
          setTimeout(() => {
            document.querySelectorAll(".showGroupsAll").forEach((ele) => {
              ele.addEventListener("click", () => {
                document.querySelector(".groupDynamicContainer").innerHTML = "";

                document.getElementById(
                  "groupsDynamicModal"
                ).style.transform = "scale(1)";
                document.getElementById(
                  "groupsDynamicModal"
                ).style.opacity = 1;

                document.getElementById('groupsDynamicModalH1').innerText = 'Groups'

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
                          <div class="groupBox groupChats" data-group_id=${item.group_id}>
                           <img src="${item.image}" class="userIconDemo" data-receiverid="32">
                            
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
          }, 100)
          

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
          document.querySelector(".new_header_right_imgs").innerHTML += `
        <div class="smallgroupBox" data-group_id=${item.group_id}>
        <span class="tooltiptext">${item.group_name.length > 8 ? `${item.group_name.slice(0,8)}...` : `${item.group_name}`}</span>
        ${
          item.notifications != 0
            ? `<div class="countNum">${item.notifications}</div>`
            : ""
        }
          <img src="${item.group_image}" class="smalluserIconDemo" data-receiverid="32">
            
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

document.querySelectorAll(".slideBtn").forEach((ele) => {
  ele.addEventListener("click", activeSlideBtn);
});

function activeSlideBtn(e) {
  for (
    let index = 0;
    index < e.currentTarget.parentNode.children.length;
    index++
  ) {
    e.currentTarget.parentNode.children[index].classList.remove(
      "activeSlideBtn"
    );

    if (e.currentTarget.innerText == "Monthly") {
      document.querySelector(".monthlyScreen").style.display = "block";
      document.querySelector(".weeklyScreen").style.display = "none";
      document.querySelector(".dailyScreen").style.display = "none";

      document.querySelector(".monthlyBtn").classList.add("activeSlideBtn");
      document.querySelector(".weeklyBtn").classList.remove("activeSlideBtn");
      document.querySelector(".dailyBtn").classList.remove("activeSlideBtn");

      getMonthlyCalendarData();
    }
    if (e.currentTarget.innerText == "Weekly") {
      document.querySelector(".monthlyScreen").style.display = "none";
      document.querySelector(".weeklyScreen").style.display = "block";
      document.querySelector(".dailyScreen").style.display = "none";

      document.querySelector(".monthlyBtn").classList.remove("activeSlideBtn");
      document.querySelector(".weeklyBtn").classList.add("activeSlideBtn");
      document.querySelector(".dailyBtn").classList.remove("activeSlideBtn");

      getWeeklyCalendarData();
    }
    if (e.currentTarget.innerText == "Daily") {
      document.querySelector(".monthlyScreen").style.display = "none";
      document.querySelector(".weeklyScreen").style.display = "none";
      document.querySelector(".dailyScreen").style.display = "block";

      document.querySelector(".monthlyBtn").classList.remove("activeSlideBtn");
      document.querySelector(".weeklyBtn").classList.remove("activeSlideBtn");
      document.querySelector(".dailyBtn").classList.add("activeSlideBtn");

      getDailyCalendarData();
    }
  }
}

//Monthly Slider

let monthlyArr = [
  "0",
  "-100",
  "-200",
  "-300",
  "-400",
  "-500",
  "-600",
  "-700",
  "-800",
  "-900",
  "-1000",
  "-1100",
];

let currentMonth = new Date().getMonth();
let currentDate = new Date().getDate();

let monthlyCounter = currentMonth;
let monthlySliderContainer = document.getElementById("slider1");

monthlySliderContainer.style.left = `${monthlyArr[currentMonth]}%`;

document
  .querySelector(".monthlySlider_prev")
  .addEventListener("click", monthlySlider_prev);
document
  .querySelector(".monthlySlider_next")
  .addEventListener("click", monthlySlider_next);

function monthlySlider_prev() {
  monthlyCounter--;
  monthlySliderContainer.style.left = `${monthlyArr[monthlyCounter]}%`;

  if (monthlyCounter <= 0) {
    monthlyCounter = 0;
  }

  getMonthlyCalendarData();
}

function monthlySlider_next() {
  monthlyCounter++;
  monthlySliderContainer.style.left = `${monthlyArr[monthlyCounter]}%`;

  if (monthlyCounter == monthlyArr.length) {
    monthlyCounter = monthlyArr.length - 1;
  }

  getMonthlyCalendarData();
}

// Update Monthly Slider Week Dates

function updateMonthlySlideWeekDates() {
  let getMonthNumber = monthlyCounter;

  let getCurrentYear = new Date().getFullYear();

  let lastDay = new Date(getCurrentYear, getMonthNumber + 1, 0).getDate();

  let monthlyWeekArray = [];

  let dt = new Date();

  let dayOfWeek = 1;

  let firstDayOfWeek = new Date();

  let diff = dayOfWeek >= 1 ? dayOfWeek : 6 - dayOfWeek;

  firstDayOfWeek.setMonth(getMonthNumber);
  firstDayOfWeek.setDate(1 - diff);

  var firstday = new Date(dt.setDate(dt.getDate() - dt.getDay())).toUTCString();


  for (let date = 1; date <= lastDay; date++) {
    let fullDate = new Date(getCurrentYear, getMonthNumber, date);

    let shortDay = new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
    }).format(fullDate);

    monthlyWeekArray.push({
      day: shortDay,
      date: date < 10 ? "0" + date : "" + date,
    });
  }

  if (monthlyWeekArray[0].day != "Mon" && getMonthNumber == 0) {
    monthlyWeekArray.unshift(
      { day: "Mon", date: "27" },
      { day: "Tue", date: "28" },
      { day: "Wed", date: "29" },
      { day: "Thu", date: "30" },
      { day: "Fri", date: "31" }
    );

    monthlyWeekArray.push(
      { day: "Tue", date: "01" },
      { day: "Wed", date: "02" },
      { day: "Thu", date: "03" },
      { day: "Fri", date: "04" },
      { day: "Sat", date: "05" },
      { day: "Sun", date: "06" }
    );
  }

  if (monthlyWeekArray[0].day != "Mon" && getMonthNumber == 1) {
    monthlyWeekArray.unshift({ day: "Mon", date: "31" });

    monthlyWeekArray.push(
      { day: "Tue", date: "01" },
      { day: "Wed", date: "02" },
      { day: "Thu", date: "03" },
      { day: "Fri", date: "04" },
      { day: "Sat", date: "05" },
      { day: "Sun", date: "06" }
    );
  }

  if (monthlyWeekArray[0].day != "Mon" && getMonthNumber == 2) {
    monthlyWeekArray.unshift({ day: "Mon", date: "28" });

    monthlyWeekArray.push(
      { day: "Fri", date: "01" },
      { day: "Sat", date: "02" },
      { day: "Sun", date: "03" }
    );
  }

  if (monthlyWeekArray[0].day != "Mon" && getMonthNumber == 3) {
    monthlyWeekArray.unshift(
      { day: "Mon", date: "28" },
      { day: "Tue", date: "29" },
      { day: "Wed", date: "30" },
      { day: "Thu", date: "31" }
    );

    monthlyWeekArray.push({ day: "Sun", date: "01" });
  }

  if (monthlyWeekArray[0].day != "Mon" && getMonthNumber == 4) {
    monthlyWeekArray.unshift(
      { day: "Mon", date: "25" },
      { day: "Tue", date: "26" },
      { day: "Wed", date: "27" },
      { day: "Thu", date: "28" },
      { day: "Fri", date: "29" },
      { day: "Sat", date: "30" }
    );

    monthlyWeekArray.push(
      { day: "Wed", date: "01" },
      { day: "Thu", date: "02" },
      { day: "Fri", date: "03" },
      { day: "Sat", date: "04" },
      { day: "Sun", date: "05" }
    );
  }

  if (monthlyWeekArray[0].day != "Mon" && getMonthNumber == 5) {
    monthlyWeekArray.unshift(
      { day: "Mon", date: "30" },
      { day: "Tue", date: "31" }
    );

    monthlyWeekArray.push(
      { day: "Fri", date: "01" },
      { day: "Sat", date: "02" },
      { day: "Sun", date: "03" }
    );
  }

  if (monthlyWeekArray[0].day != "Mon" && getMonthNumber == 6) {
    monthlyWeekArray.unshift(
      { day: "Mon", date: "27" },
      { day: "Tue", date: "28" },
      { day: "Wed", date: "29" },
      { day: "Thu", date: "30" }
    );
  }

  if (getMonthNumber == 7) {
    monthlyWeekArray.push(
      { day: "Thu", date: "01" },
      { day: "Fri", date: "02" },
      { day: "Sat", date: "03" },
      { day: "Sun", date: "04" }
    );
  }

  if (monthlyWeekArray[0].day != "Mon" && getMonthNumber == 8) {
    monthlyWeekArray.unshift(
      { day: "Mon", date: "29" },
      { day: "Tue", date: "30" },
      { day: "Wed", date: "31" }
    );

    monthlyWeekArray.push(
      { day: "Sat", date: "01" },
      { day: "Sun", date: "02" }
    );
  }

  if (monthlyWeekArray[0].day != "Mon" && getMonthNumber == 9) {
    monthlyWeekArray.unshift(
      { day: "Mon", date: "26" },
      { day: "Tue", date: "27" },
      { day: "Wed", date: "28" },
      { day: "Thu", date: "29" },
      { day: "Fri", date: "30" }
    );

    monthlyWeekArray.push(
      { day: "Tue", date: "01" },
      { day: "Wed", date: "02" },
      { day: "Thu", date: "03" },
      { day: "Fri", date: "04" },
      { day: "Sat", date: "05" },
      { day: "Sun", date: "06" }
    );
  }

  if (monthlyWeekArray[0].day != "Mon" && getMonthNumber == 10) {
    monthlyWeekArray.unshift({ day: "Mon", date: "31" });

    monthlyWeekArray.push(
      { day: "Thu", date: "01" },
      { day: "Fri", date: "02" },
      { day: "Sat", date: "03" },
      { day: "Sun", date: "04" }
    );
  }

  if (monthlyWeekArray[0].day != "Mon" && getMonthNumber == 11) {
    monthlyWeekArray.unshift(
      { day: "Mon", date: "28" },
      { day: "Tue", date: "29" },
      { day: "Wed", date: "30" }
    );

    monthlyWeekArray.push({ day: "Sun", date: "01" });
  }

  let monthlyWeek1 = document.querySelector(".monthlyWeek1");
  let monthlyWeek2 = document.querySelector(".monthlyWeek2");
  let monthlyWeek3 = document.querySelector(".monthlyWeek3");
  let monthlyWeek4 = document.querySelector(".monthlyWeek4");
  let monthlyWeek5 = document.querySelector(".monthlyWeek5");
  let monthlyWeek6 = document.querySelector(".monthlyWeek6");

  monthlyWeek1.innerHTML = "";
  monthlyWeek2.innerHTML = "";
  monthlyWeek3.innerHTML = "";
  monthlyWeek4.innerHTML = "";
  monthlyWeek5.innerHTML = "";
  monthlyWeek6.innerHTML = "";

  let week1Days = monthlyWeekArray.slice(0, 7);
  let week2Days = monthlyWeekArray.slice(7, 14);
  let week3Days = monthlyWeekArray.slice(14, 21);
  let week4Days = monthlyWeekArray.slice(21, 28);
  let week5Days = monthlyWeekArray.slice(28, 35);
  let week6Days = monthlyWeekArray.slice(35, 42);

  if (week6Days.length > 0) {
    document.querySelector(".monthlyWeekContainer6").style.display = "flex";
  } else {
    document.querySelector(".monthlyWeekContainer6").style.display = "none";
  }

  week1Days.map((item) => {
    monthlyWeek1.innerHTML += `
            <div class="row">
                <div class="daysDateContainer monthlySilderDate" >
                    ${
                      item.day != "Sat" && item.day != "Sun"
                        ? `<div class="daysDiv">${item.day}</div>`
                        : `<div class="daysDiv daysDiv1">${item.day}</div>`
                    }
                    ${
                      item.day != "Sat" && item.day != "Sun"
                        ? `<div class="datesDiv">${item.date}</div>`
                        : `<div class="datesDiv daysDiv1">${item.date}</div>`
                    }
                </div>
                <div class="row1"></div>
                <div class='countContainer'></div>
            </div>
            `;
  });

  week2Days.map((item) => {
    monthlyWeek2.innerHTML += `
            <div class="row">
                <div class="daysDateContainer monthlySilderDate" >
                    ${
                      item.day != "Sat" && item.day != "Sun"
                        ? `<div class="daysDiv">${item.day}</div>`
                        : `<div class="daysDiv daysDiv1">${item.day}</div>`
                    }
                    ${
                      item.day != "Sat" && item.day != "Sun"
                        ? `<div class="datesDiv">${item.date}</div>`
                        : `<div class="datesDiv daysDiv1">${item.date}</div>`
                    }
                </div>
                <div class="row1"></div>
                <div class='countContainer'></div>
            </div>
            `;
  });

  week3Days.map((item) => {
    monthlyWeek3.innerHTML += `
            <div class="row">
                <div class="daysDateContainer monthlySilderDate" >
                    ${
                      item.day != "Sat" && item.day != "Sun"
                        ? `<div class="daysDiv">${item.day}</div>`
                        : `<div class="daysDiv daysDiv1">${item.day}</div>`
                    }
                    ${
                      item.day != "Sat" && item.day != "Sun"
                        ? `<div class="datesDiv">${item.date}</div>`
                        : `<div class="datesDiv daysDiv1">${item.date}</div>`
                    }
                </div>
                <div class="row1"></div>
                <div class='countContainer'></div>
            </div>
            `;
  });

  week4Days.map((item) => {
    monthlyWeek4.innerHTML += `
            <div class="row">
                <div class="daysDateContainer monthlySilderDate" >
                    ${
                      item.day != "Sat" && item.day != "Sun"
                        ? `<div class="daysDiv">${item.day}</div>`
                        : `<div class="daysDiv daysDiv1">${item.day}</div>`
                    }
                    ${
                      item.day != "Sat" && item.day != "Sun"
                        ? `<div class="datesDiv">${item.date}</div>`
                        : `<div class="datesDiv daysDiv1">${item.date}</div>`
                    }
                </div>
                <div class="row1"></div>
                <div class='countContainer'></div>
            </div>
            `;
  });

  week5Days.map((item) => {
    monthlyWeek5.innerHTML += `
            <div class="row">
                <div class="daysDateContainer monthlySilderDate" >
                    ${
                      item.day != "Sat" && item.day != "Sun"
                        ? `<div class="daysDiv">${item.day}</div>`
                        : `<div class="daysDiv daysDiv1">${item.day}</div>`
                    }
                    ${
                      item.day != "Sat" && item.day != "Sun"
                        ? `<div class="datesDiv">${item.date}</div>`
                        : `<div class="datesDiv daysDiv1">${item.date}</div>`
                    }
                </div>
                <div class="row1"></div>
                <div class='countContainer'></div>
            </div>
            `;
  });

  week6Days.map((item) => {
    monthlyWeek6.innerHTML += `
            <div class="row">
                <div class="daysDateContainer monthlySilderDate" >
                    ${
                      item.day != "Sat" && item.day != "Sun"
                        ? `<div class="daysDiv">${item.day}</div>`
                        : `<div class="daysDiv daysDiv1">${item.day}</div>`
                    }
                    ${
                      item.day != "Sat" && item.day != "Sun"
                        ? `<div class="datesDiv">${item.date}</div>`
                        : `<div class="datesDiv daysDiv1">${item.date}</div>`
                    }
                </div>
                <div class="row1"></div>
                <div class='countContainer'></div>
            </div>
            `;
  });
}

// Weekly Slider 1

let weeklyMonthArr = [
  "0",
  "-100",
  "-200",
  "-300",
  "-400",
  "-500",
  "-600",
  "-700",
  "-800",
  "-900",
  "-1000",
  "-1100",
];
let weeklyMonthCounter = currentMonth;
let weeklySliderContainer1 = document.getElementById("slider2");

weeklySliderContainer1.style.left = `${weeklyMonthArr[currentMonth]}%`;

document
  .querySelector(".weeklySlider_prev1")
  .addEventListener("click", weeklySlider_prev1);
document
  .querySelector(".weeklySlider_next1")
  .addEventListener("click", weeklySlider_next1);

function weeklySlider_prev1() {
  weeklyMonthCounter--;
  weeklySliderContainer1.style.left = `${weeklyMonthArr[weeklyMonthCounter]}%`;

  if (weeklyMonthCounter <= 0) {
    weeklyMonthCounter = 0;
  }

  getWeeklyCalendarData();
}

function weeklySlider_next1() {
  weeklyMonthCounter++;
  weeklySliderContainer1.style.left = `${weeklyMonthArr[weeklyMonthCounter]}%`;

  if (weeklyMonthCounter == weeklyMonthArr.length) {
    weeklyMonthCounter = weeklyMonthArr.length - 1;
  }

  getWeeklyCalendarData();
}

// Weekly Slider 2

let weeklyWeekArr = ["0", "-100", "-200", "-300", "-400", "-500"];
let weeklyWeekCounter = 0;
let weeklySliderContainer2 = document.getElementById("slider3");

let weekSlide1Global = [];
let weekSlide2Global = [];
let weekSlide3Global = [];
let weekSlide4Global = [];
let weekSlide5Global = [];

for (let i = 1; i <= 7; i++) {
  weekSlide1Global.push(i);
}
for (let i = 8; i <= 14; i++) {
  weekSlide2Global.push(i);
}
for (let i = 15; i <= 21; i++) {
  weekSlide3Global.push(i);
}
for (let i = 22; i <= 28; i++) {
  weekSlide4Global.push(i);
}

for (let i = 29; i <= 31; i++) {
  weekSlide5Global.push(i);
}

let filterWeekSlide1Global = weekSlide1Global.filter((item) => {
  return item == currentDate;
});

let filterWeekSlide2Global = weekSlide2Global.filter((item) => {
  return item == currentDate;
});

let filterWeekSlide3Global = weekSlide3Global.filter((item) => {
  return item == currentDate;
});

let filterWeekSlide4Global = weekSlide4Global.filter((item) => {
  return item == currentDate;
});

let filterWeekSlide5Global = weekSlide5Global.filter((item) => {
  return item == currentDate;
});

if (filterWeekSlide1Global.length > 0) {
  document.querySelector(".weekContainer1").style.display = "block";
  document.querySelector(".weekContainer2").style.display = "none";
  document.querySelector(".weekContainer3").style.display = "none";
  document.querySelector(".weekContainer4").style.display = "none";
  document.querySelector(".weekContainer5").style.display = "none";
  document.querySelector(".weeklyWeekContainer6").style.display = "none";

  document.getElementById("slider3").style = `${weeklyWeekArr[0]}%`;
  weeklyWeekCounter = 0;
}

if (filterWeekSlide2Global.length > 0) {
  document.querySelector(".weekContainer1").style.display = "none";
  document.querySelector(".weekContainer2").style.display = "block";
  document.querySelector(".weekContainer3").style.display = "none";
  document.querySelector(".weekContainer4").style.display = "none";
  document.querySelector(".weekContainer5").style.display = "none";
  document.querySelector(".weeklyWeekContainer6").style.display = "none";

  document.getElementById("slider3").style.left = `${weeklyWeekArr[1]}%`;
  weeklyWeekCounter = 1;
}

if (filterWeekSlide3Global.length > 0) {
  document.querySelector(".weekContainer1").style.display = "none";
  document.querySelector(".weekContainer2").style.display = "none";
  document.querySelector(".weekContainer3").style.display = "block";
  document.querySelector(".weekContainer4").style.display = "none";
  document.querySelector(".weekContainer5").style.display = "none";
  document.querySelector(".weeklyWeekContainer6").style.display = "none";

  document.getElementById("slider3").style.left = `${weeklyWeekArr[2]}%`;
  weeklyWeekCounter = 2;
}

if (filterWeekSlide4Global.length > 0) {
  document.querySelector(".weekContainer1").style.display = "none";
  document.querySelector(".weekContainer2").style.display = "none";
  document.querySelector(".weekContainer3").style.display = "none";
  document.querySelector(".weekContainer4").style.display = "block";
  document.querySelector(".weekContainer5").style.display = "none";
  document.querySelector(".weeklyWeekContainer6").style.display = "none";

  document.getElementById("slider3").style.left = `${weeklyWeekArr[3]}%`;
  weeklyWeekCounter = 3;
}

if (filterWeekSlide5Global.length > 0) {
  document.querySelector(".weekContainer1").style.display = "none";
  document.querySelector(".weekContainer2").style.display = "none";
  document.querySelector(".weekContainer3").style.display = "none";
  document.querySelector(".weekContainer4").style.display = "none";
  document.querySelector(".weekContainer5").style.display = "none";
  document.querySelector(".weekContainer5").style.display = "block";
  document.querySelector(".weeklyWeekContainer6").style.display = "none";

  document.getElementById("slider3").style.left = `${weeklyWeekArr[4]}%`;
  weeklyWeekCounter = 4;
}

document
  .querySelector(".weeklySlider_prev2")
  .addEventListener("click", weeklySlider_prev2);
document
  .querySelector(".weeklySlider_next2")
  .addEventListener("click", weeklySlider_next2);

function weeklySlider_prev2() {
  weeklyWeekCounter--;
  weeklySliderContainer2.style.left = `${weeklyWeekArr[weeklyWeekCounter]}%`;

  if (weeklyWeekCounter <= 0) {
    weeklyWeekCounter = 0;
  }

  checkWeeksDiv();
}

function weeklySlider_next2() {
  weeklyWeekCounter++;
  weeklySliderContainer2.style.left = `${weeklyWeekArr[weeklyWeekCounter]}%`;

  if (weeklyWeekCounter == weeklyWeekArr.length) {
    weeklyWeekCounter = weeklyWeekArr.length - 1;
  }

  checkWeeksDiv();
}

// Update Weekly Slider Week Dates

function updateWeeklySlideWeekDates() {
  let getMonthNumber = weeklyMonthCounter;

  let getCurrentYear = new Date().getFullYear();

  let lastDay = new Date(getCurrentYear, getMonthNumber + 1, 0).getDate();

  let weeklyWeekArray = [];

  for (let date = 1; date <= lastDay; date++) {
    let fullDate = new Date(getCurrentYear, getMonthNumber, date);

    let shortDay = new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
    }).format(fullDate);

    weeklyWeekArray.push({
      day: shortDay,
      date: date < 10 ? "0" + date : "" + date,
    });
  }

  if (weeklyWeekArray[0].day != "Mon" && getMonthNumber == 0) {
    weeklyWeekArray.unshift(
      { day: "Mon", date: "27" },
      { day: "Tue", date: "28" },
      { day: "Wed", date: "29" },
      { day: "Thu", date: "30" },
      { day: "Fri", date: "31" }
    );

    weeklyWeekArray.push(
      { day: "Tue", date: "01" },
      { day: "Wed", date: "02" },
      { day: "Thu", date: "03" },
      { day: "Fri", date: "04" },
      { day: "Sat", date: "05" },
      { day: "Sun", date: "06" }
    );
  }

  if (weeklyWeekArray[0].day != "Mon" && getMonthNumber == 1) {
    weeklyWeekArray.unshift({ day: "Mon", date: "31" });

    weeklyWeekArray.push(
      { day: "Tue", date: "01" },
      { day: "Wed", date: "02" },
      { day: "Thu", date: "03" },
      { day: "Fri", date: "04" },
      { day: "Sat", date: "05" },
      { day: "Sun", date: "06" }
    );
  }

  if (weeklyWeekArray[0].day != "Mon" && getMonthNumber == 2) {
    weeklyWeekArray.unshift({ day: "Mon", date: "28" });

    weeklyWeekArray.push(
      { day: "Fri", date: "01" },
      { day: "Sat", date: "02" },
      { day: "Sun", date: "03" }
    );
  }

  if (weeklyWeekArray[0].day != "Mon" && getMonthNumber == 3) {
    weeklyWeekArray.unshift(
      { day: "Mon", date: "28" },
      { day: "Tue", date: "29" },
      { day: "Wed", date: "30" },
      { day: "Thu", date: "31" }
    );

    weeklyWeekArray.push({ day: "Sun", date: "01" });
  }

  if (weeklyWeekArray[0].day != "Mon" && getMonthNumber == 4) {
    weeklyWeekArray.unshift(
      { day: "Mon", date: "25" },
      { day: "Tue", date: "26" },
      { day: "Wed", date: "27" },
      { day: "Thu", date: "28" },
      { day: "Fri", date: "29" },
      { day: "Sat", date: "30" }
    );

    weeklyWeekArray.push(
      { day: "Wed", date: "01" },
      { day: "Thu", date: "02" },
      { day: "Fri", date: "03" },
      { day: "Sat", date: "04" },
      { day: "Sun", date: "05" }
    );
  }

  if (weeklyWeekArray[0].day != "Mon" && getMonthNumber == 5) {
    weeklyWeekArray.unshift(
      { day: "Mon", date: "30" },
      { day: "Tue", date: "31" }
    );

    weeklyWeekArray.push(
      { day: "Fri", date: "01" },
      { day: "Sat", date: "02" },
      { day: "Sun", date: "03" }
    );
  }

  if (weeklyWeekArray[0].day != "Mon" && getMonthNumber == 6) {
    weeklyWeekArray.unshift(
      { day: "Mon", date: "27" },
      { day: "Tue", date: "28" },
      { day: "Wed", date: "29" },
      { day: "Thu", date: "30" }
    );
  }

  if (getMonthNumber == 7) {
    weeklyWeekArray.push(
      { day: "Thu", date: "01" },
      { day: "Fri", date: "02" },
      { day: "Sat", date: "03" },
      { day: "Sun", date: "04" }
    );
  }

  if (weeklyWeekArray[0].day != "Mon" && getMonthNumber == 8) {
    weeklyWeekArray.unshift(
      { day: "Mon", date: "29" },
      { day: "Tue", date: "30" },
      { day: "Wed", date: "31" }
    );

    weeklyWeekArray.push(
      { day: "Sat", date: "01" },
      { day: "Sun", date: "02" }
    );
  }

  if (weeklyWeekArray[0].day != "Mon" && getMonthNumber == 9) {
    weeklyWeekArray.unshift(
      { day: "Mon", date: "26" },
      { day: "Tue", date: "27" },
      { day: "Wed", date: "28" },
      { day: "Thu", date: "29" },
      { day: "Fri", date: "30" }
    );

    weeklyWeekArray.push(
      { day: "Tue", date: "01" },
      { day: "Wed", date: "02" },
      { day: "Thu", date: "03" },
      { day: "Fri", date: "04" },
      { day: "Sat", date: "05" },
      { day: "Sun", date: "06" }
    );
  }

  if (weeklyWeekArray[0].day != "Mon" && getMonthNumber == 10) {
    weeklyWeekArray.unshift({ day: "Mon", date: "31" });

    weeklyWeekArray.push(
      { day: "Thu", date: "01" },
      { day: "Fri", date: "02" },
      { day: "Sat", date: "03" },
      { day: "Sun", date: "04" }
    );
  }

  if (weeklyWeekArray[0].day != "Mon" && getMonthNumber == 11) {
    weeklyWeekArray.unshift(
      { day: "Mon", date: "28" },
      { day: "Tue", date: "29" },
      { day: "Wed", date: "30" }
    );

    weeklyWeekArray.push({ day: "Sun", date: "01" });
  }

  let weeklyWeek1 = document.querySelector(".weeklyWeek1");
  let weeklyWeek2 = document.querySelector(".weeklyWeek2");
  let weeklyWeek3 = document.querySelector(".weeklyWeek3");
  let weeklyWeek4 = document.querySelector(".weeklyWeek4");
  let weeklyWeek5 = document.querySelector(".weeklyWeek5");
  let weeklyWeek6 = document.querySelector(".weeklyWeek6");

  weeklyWeek1.innerHTML = "";
  weeklyWeek2.innerHTML = "";
  weeklyWeek3.innerHTML = "";
  weeklyWeek4.innerHTML = "";
  weeklyWeek5.innerHTML = "";
  weeklyWeek6.innerHTML = "";

  let week1Days = weeklyWeekArray.slice(0, 7);
  let week2Days = weeklyWeekArray.slice(7, 14);
  let week3Days = weeklyWeekArray.slice(14, 21);
  let week4Days = weeklyWeekArray.slice(21, 28);
  let week5Days = weeklyWeekArray.slice(28, 35);
  let week6Days = weeklyWeekArray.slice(35, 42);

  if (week6Days.length > 0) {
    weeklyWeek6.innerHTML = "";
  } else {
    weeklyWeek6.innerHTML = `
      <h1 class="week6Heading">No Week 6 Data</h1>
    `;
  }

  week1Days.map((item) => {
    weeklyWeek1.innerHTML += `
            <div class="weekRow1">
                <div class="daysDateContainer" >
                    ${
                      item.day != "Sat" && item.day != "Sun"
                        ? `<div class="daysDiv">${item.day}</div>`
                        : `<div class="daysDiv daysDiv1">${item.day}</div>`
                    }
                    ${
                      item.day != "Sat" && item.day != "Sun"
                        ? `<div class="datesDiv">${item.date}</div>`
                        : `<div class="datesDiv daysDiv1">${item.date}</div>`
                    }
                </div>
                <div class="row1"></div>
                <div class='countContainer'></div>
            </div>
            `;
  });

  week2Days.map((item) => {
    weeklyWeek2.innerHTML += `
            <div class="weekRow1">
                <div class="daysDateContainer monthlySilderDate" >
                    ${
                      item.day != "Sat" && item.day != "Sun"
                        ? `<div class="daysDiv">${item.day}</div>`
                        : `<div class="daysDiv daysDiv1">${item.day}</div>`
                    }
                    ${
                      item.day != "Sat" && item.day != "Sun"
                        ? `<div class="datesDiv">${item.date}</div>`
                        : `<div class="datesDiv daysDiv1">${item.date}</div>`
                    }
                </div>
                <div class="row1"></div>
                <div class='countContainer'></div>
            </div>
            `;
  });

  week3Days.map((item) => {
    weeklyWeek3.innerHTML += `
            <div class="weekRow1">
                <div class="daysDateContainer monthlySilderDate" >
                    ${
                      item.day != "Sat" && item.day != "Sun"
                        ? `<div class="daysDiv">${item.day}</div>`
                        : `<div class="daysDiv daysDiv1">${item.day}</div>`
                    }
                    ${
                      item.day != "Sat" && item.day != "Sun"
                        ? `<div class="datesDiv">${item.date}</div>`
                        : `<div class="datesDiv daysDiv1">${item.date}</div>`
                    }
                </div>
                <div class="row1"></div>
                <div class='countContainer'></div>
            </div>
            `;
  });

  week4Days.map((item) => {
    weeklyWeek4.innerHTML += `
            <div class="weekRow1">
                <div class="daysDateContainer monthlySilderDate" >
                    ${
                      item.day != "Sat" && item.day != "Sun"
                        ? `<div class="daysDiv">${item.day}</div>`
                        : `<div class="daysDiv daysDiv1">${item.day}</div>`
                    }
                    ${
                      item.day != "Sat" && item.day != "Sun"
                        ? `<div class="datesDiv">${item.date}</div>`
                        : `<div class="datesDiv daysDiv1">${item.date}</div>`
                    }
                </div>
                <div class="row1"></div>
                <div class='countContainer'></div>
            </div>
            `;
  });

  week5Days.map((item) => {
    weeklyWeek5.innerHTML += `
            <div class="weekRow1">
                <div class="daysDateContainer monthlySilderDate" >
                    ${
                      item.day != "Sat" && item.day != "Sun"
                        ? `<div class="daysDiv">${item.day}</div>`
                        : `<div class="daysDiv daysDiv1">${item.day}</div>`
                    }
                    ${
                      item.day != "Sat" && item.day != "Sun"
                        ? `<div class="datesDiv">${item.date}</div>`
                        : `<div class="datesDiv daysDiv1">${item.date}</div>`
                    }
                </div>
                <div class="row1"></div>
                <div class='countContainer'></div>
            </div>
            `;
  });

  week6Days.map((item) => {
    weeklyWeek6.innerHTML += `
            <div class="weekRow1">
                <div class="daysDateContainer monthlySilderDate" >
                    ${
                      item.day != "Sat" && item.day != "Sun"
                        ? `<div class="daysDiv">${item.day}</div>`
                        : `<div class="daysDiv daysDiv1">${item.day}</div>`
                    }
                    ${
                      item.day != "Sat" && item.day != "Sun"
                        ? `<div class="datesDiv">${item.date}</div>`
                        : `<div class="datesDiv daysDiv1">${item.date}</div>`
                    }
                </div>
                <div class="row1"></div>
                <div class='countContainer'></div>
            </div>
            `;
  });
}

// Week Number Checker

function checkWeeksDiv() {
  getWeeklyCalendarData();

  let getWeekNumber = weeklyWeekCounter;

  if (getWeekNumber == 0) {
    document.querySelector(".weekContainer1").style.display = "block";
    document.querySelector(".weekContainer2").style.display = "none";
    document.querySelector(".weekContainer3").style.display = "none";
    document.querySelector(".weekContainer4").style.display = "none";
    document.querySelector(".weekContainer5").style.display = "none";
    document.querySelector(".weeklyweeklyWeekContainer6").style.display = "none";
  }

  if (getWeekNumber == 1) {
    document.querySelector(".weekContainer1").style.display = "none";
    document.querySelector(".weekContainer2").style.display = "block";
    document.querySelector(".weekContainer3").style.display = "none";
    document.querySelector(".weekContainer4").style.display = "none";
    document.querySelector(".weekContainer5").style.display = "none";
    document.querySelector(".weeklyWeekContainer6").style.display = "none";
  }

  if (getWeekNumber == 2) {
    document.querySelector(".weekContainer1").style.display = "none";
    document.querySelector(".weekContainer2").style.display = "none";
    document.querySelector(".weekContainer3").style.display = "block";
    document.querySelector(".weekContainer4").style.display = "none";
    document.querySelector(".weekContainer5").style.display = "none";
    document.querySelector(".weeklyWeekContainer6").style.display = "none";
  }

  if (getWeekNumber == 3) {
    document.querySelector(".weekContainer1").style.display = "none";
    document.querySelector(".weekContainer2").style.display = "none";
    document.querySelector(".weekContainer3").style.display = "none";
    document.querySelector(".weekContainer4").style.display = "block";
    document.querySelector(".weekContainer5").style.display = "none";
    document.querySelector(".weeklyWeekContainer6").style.display = "none";
  }

  if (getWeekNumber == 4) {
    document.querySelector(".weekContainer1").style.display = "none";
    document.querySelector(".weekContainer2").style.display = "none";
    document.querySelector(".weekContainer3").style.display = "none";
    document.querySelector(".weekContainer4").style.display = "none";
    document.querySelector(".weekContainer5").style.display = "block";
    document.querySelector(".weeklyWeekContainer6").style.display = "none";
  }

  if (getWeekNumber == 5) {
    document.querySelector(".weekContainer1").style.display = "none";
    document.querySelector(".weekContainer2").style.display = "none";
    document.querySelector(".weekContainer3").style.display = "none";
    document.querySelector(".weekContainer4").style.display = "none";
    document.querySelector(".weekContainer5").style.display = "none";
    document.querySelector(".weeklyWeekContainer6").style.display = "block";
  }

}

// Daily Slider 1 && Daily Slider 2

let dailyMonthArr = [
  "0",
  "-100",
  "-200",
  "-300",
  "-400",
  "-500",
  "-600",
  "-700",
  "-800",
  "-900",
  "-1000",
  "-1100",
];
let dailyMonthCounter = currentMonth;
let dailySliderContainer1 = document.getElementById("slider4");

let getMonthNumber1 = dailyMonthCounter;
let getCurrentYear1 = new Date().getFullYear();
let lastDay1 = new Date(getCurrentYear1, getMonthNumber1 + 1, 0).getDate();

let dailyDateArr = [];

for (let i = 0; i < `${lastDay1}00`; i = i + 100) {
  dailyDateArr.push(`-${i}`);
}

dailySliderContainer1.style.left = `${dailyMonthArr[currentMonth]}%`;

document
  .querySelector(".dailySlider_prev1")
  .addEventListener("click", dailySlider_prev1);
document
  .querySelector(".dailySlider_next1")
  .addEventListener("click", dailySlider_next1);

function dailySlider_prev1() {
  dailyMonthCounter--;
  dailySliderContainer1.style.left = `${dailyMonthArr[dailyMonthCounter]}%`;

  if (dailyMonthCounter <= 0) {
    dailyMonthCounter = 0;
  }

  let getMonthNumber2 = dailyMonthCounter;
  let getCurrentYear2 = new Date().getFullYear();
  let lastDay2 = new Date(getCurrentYear2, getMonthNumber2 + 1, 0).getDate();

  dailyDateArr = [];

  for (let i = 0; i < `${lastDay2}00`; i = i + 100) {
    dailyDateArr.push(`-${i}`);
  }

  dailyDateCounter = lastDay2 - 1

  document.getElementById("slider5").style.left = `${dailyDateArr[dailyDateCounter]}%`;

  getDailyCalendarData();
}

function dailySlider_next1() {
  dailyMonthCounter++;
  dailySliderContainer1.style.left = `${dailyMonthArr[dailyMonthCounter]}%`;

  if (dailyMonthCounter == dailyMonthArr.length) {
    dailyMonthCounter = dailyMonthArr.length - 1;
  }
  
  let getMonthNumber2 = dailyMonthCounter;
  let getCurrentYear2 = new Date().getFullYear();
  let lastDay2 = new Date(getCurrentYear2, getMonthNumber2 + 1, 0).getDate();

  dailyDateArr = [];  

  for (let i = 0; i < `${lastDay2}00`; i = i + 100) {
    dailyDateArr.push(`-${i}`);
  }

  dailyDateCounter = lastDay2 - 1

  document.getElementById("slider5").style.left = `${dailyDateArr[dailyDateCounter]}%`;

  getDailyCalendarData();
}

let dailyDateCounter = 0;

if (currentDate == 1) {
  dailyDateCounter = 0;
}

let dailySliderContainer2 = document.getElementById("slider5");

// dailySliderContainer2.style.left = `${dailyDateArr[dailyDateCounter]}%`;

document
  .querySelector(".dailySlider_prev2")
  .addEventListener("click", dailySlider_prev2);
document
  .querySelector(".dailySlider_next2")
  .addEventListener("click", dailySlider_next2);

function dailySlider_prev2() {
  dailyDateCounter--;
  dailySliderContainer2.style.left = `${dailyDateArr[dailyDateCounter]}%`;

  if (dailyDateCounter <= 0) {
    dailyDateCounter = 0;
  }

  getDailyCalendarData();
}

function dailySlider_next2() {
  dailyDateCounter++;
  dailySliderContainer2.style.left = `${dailyDateArr[dailyDateCounter]}%`;

  if (dailyDateCounter == dailyDateArr.length) {
    dailyDateCounter = dailyDateArr.length - 1;
  }

  getDailyCalendarData();
}

// Update Daily Slider Dates

function updateDatesDailySlider2() {
  let getMonthNumber = dailyMonthCounter;

  let getCurrentYear = new Date().getFullYear();

  let lastDay = new Date(getCurrentYear, getMonthNumber + 1, 0).getDate();
  let dailyDatesArray = [];

  for (let date = 1; date <= lastDay; date++) {
    let fullDate = new Date(getCurrentYear, getMonthNumber, date);

    let shortDay = new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
    }).format(fullDate);

    dailyDatesArray.push({
      day: shortDay,
      date: date < 10 ? "0" + date : "" + date,
    });
  }

  let dailySlide2carousel4 = document.getElementById("slider5");

  dailySlide2carousel4.innerHTML = "";

  dailyDatesArray.map((item) => {
    dailySlide2carousel4.innerHTML += `
        <div class="sliderItem1"><div class="dateItem">${item.day} - ${item.date}</div></div>
      `;
  });
}

// Rediect To Home Page

if (document.querySelector(".home_btn")) {
  document.querySelectorAll(".home_btn").forEach((ele) => {
    ele.addEventListener("click", redirectHomePage);
  });
}

function redirectHomePage() {
  document.location.href = "home.html";
}

// Rediect To Profile Page

if (document.getElementById("profile_btn")) {
  document
    .getElementById("profile_btn")
    .addEventListener("click", redirectProfilePage);
}

if (document.querySelector(".img__logo")) {
  document.querySelector(".img__logo").addEventListener("click", gotohome);
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

// Rediect To Message Chat Page

if (document.querySelector(".msgDiv")) {
  document
    .querySelector(".msgDiv")
    .addEventListener("click", redirectMessageChatPage);
}

function redirectMessageChatPage() {
  localStorage.setItem("openchatbox","yeen");
  window.location.reload();
  document.location.href = "messagebox.html";
}

// Display Monthly Calender Data

function getMonthlyCalendarData() {
  updateMonthlySlideWeekDates();

  document.querySelectorAll(".row1").forEach((ele) => {
    ele.innerHTML = ``;
    ele.classList.remove("row1OtherDays");
    ele.classList.remove("row1TwoDays");
  });

  let monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let month = monthArr[monthlyCounter];

  var user_id = localStorage.getItem("user_id");

  var second_user_id = localStorage.getItem("second_user_id");

  if (second_user_id != null) {
    user_id = second_user_id;
  }

  const url = `${globalURl}/calender/${user_id}/${month}/`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      let weekDayArr1 = [];
      let weekDayArr2 = [];
      let weekDayArr3 = [];
      let weekDayArr4 = [];
      let weekDayArr5 = [];
      let weekDayArr6 = [];

      let week1Section = document.querySelector('.week1Section')
      let week2Section = document.querySelector('.week2Section')
      let week3Section = document.querySelector('.week3Section')
      let week4Section = document.querySelector('.week4Section')
      let week5Section = document.querySelector('.week5Section')
      let week6Section = document.querySelector('.week6Section')

      week1Section.querySelectorAll(".row").forEach((ele) => {
        weekDayArr1.push(ele);
      });

      week2Section.querySelectorAll(".row").forEach((ele) => {
        weekDayArr2.push(ele);
      });

      week3Section.querySelectorAll(".row").forEach((ele) => {
        weekDayArr3.push(ele);
      });

      week4Section.querySelectorAll(".row").forEach((ele) => {
        weekDayArr4.push(ele);
      });

      week5Section.querySelectorAll(".row").forEach((ele) => {
        weekDayArr5.push(ele);
      });

      week6Section.querySelectorAll(".row").forEach((ele) => {
        weekDayArr6.push(ele);
      });
    
      let week1Day = weekDayArr1;
      let week2Day = weekDayArr2;
      let week3Day = weekDayArr3;
      let week4Day = weekDayArr4;
      let week5Day = weekDayArr5;
      let week6Day = weekDayArr6;

      userData.data.map((item) => {
        let dbProsDate = item.follow_up_date.slice(8, 10);

        if(item.week_number == 'WEEK 1'){
          week1Day.map((dayItem) => {
            let datesDiv = dayItem.querySelector(".datesDiv");
            if (dbProsDate == datesDiv.innerText) {
              let highlightedDiv = dayItem.querySelector(".row1");
              highlightedDiv.innerHTML = "";
              highlightedDiv.innerHTML = `
                              <h5 data-id=${item.prospect_data.id}>${item.prospect_data.name}</h5>
                          `;
              if (item.day_name == "Sat" || item.day_name == "Sun") {
                highlightedDiv.classList.add("row1TwoDays");
              } else {
                highlightedDiv.classList.add("row1OtherDays");
              }
            }
          });
        }

        if(item.week_number == 'WEEK 2'){
          week2Day.map((dayItem) => {
            let datesDiv = dayItem.querySelector(".datesDiv");
            if (dbProsDate == datesDiv.innerText) {
              let highlightedDiv = dayItem.querySelector(".row1");
              highlightedDiv.innerHTML = "";
              highlightedDiv.innerHTML = `
                              <h5 data-id=${item.prospect_data.id}>${item.prospect_data.name}</h5>
                          `;
              if (item.day_name == "Sat" || item.day_name == "Sun") {
                highlightedDiv.classList.add("row1TwoDays");
              } else {
                highlightedDiv.classList.add("row1OtherDays");
              }
            }
          });
        }

        if(item.week_number == 'WEEK 3'){
          week3Day.map((dayItem) => {
            let datesDiv = dayItem.querySelector(".datesDiv");
            if (dbProsDate == datesDiv.innerText) {
              let highlightedDiv = dayItem.querySelector(".row1");
              highlightedDiv.innerHTML = "";
              highlightedDiv.innerHTML = `
                              <h5 data-id=${item.prospect_data.id}>${item.prospect_data.name}</h5>
                          `;
              if (item.day_name == "Sat" || item.day_name == "Sun") {
                highlightedDiv.classList.add("row1TwoDays");
              } else {
                highlightedDiv.classList.add("row1OtherDays");
              }
            }
          });
        }
        if(item.week_number == 'WEEK 4'){
          week4Day.map((dayItem) => {
            let datesDiv = dayItem.querySelector(".datesDiv");
            if (dbProsDate == datesDiv.innerText) {
              let highlightedDiv = dayItem.querySelector(".row1");
              highlightedDiv.innerHTML = "";
              highlightedDiv.innerHTML = `
                              <h5 data-id=${item.prospect_data.id}>${item.prospect_data.name}</h5>
                          `;
              if (item.day_name == "Sat" || item.day_name == "Sun") {
                highlightedDiv.classList.add("row1TwoDays");
              } else {
                highlightedDiv.classList.add("row1OtherDays");
              }
            }
          });
        }
        if(item.week_number == 'WEEK 5'){
          week5Day.map((dayItem) => {
            let datesDiv = dayItem.querySelector(".datesDiv");
            if (dbProsDate == datesDiv.innerText) {
              let highlightedDiv = dayItem.querySelector(".row1");
              highlightedDiv.innerHTML = "";
              highlightedDiv.innerHTML = `
                              <h5 data-id=${item.prospect_data.id}>${item.prospect_data.name}</h5>
                          `;
              if (item.day_name == "Sat" || item.day_name == "Sun") {
                highlightedDiv.classList.add("row1TwoDays");
              } else {
                highlightedDiv.classList.add("row1OtherDays");
              }
            }
          });
        }

        if(item.week_number == 'WEEK 6'){
          week6Day.map((dayItem) => {
            let datesDiv = dayItem.querySelector(".datesDiv");
            if (dbProsDate == datesDiv.innerText) {
              let highlightedDiv = dayItem.querySelector(".row1");
              highlightedDiv.innerHTML = "";
              highlightedDiv.innerHTML = `
                              <h5 data-id=${item.prospect_data.id}>${item.prospect_data.name}</h5>
                          `;
              if (item.day_name == "Sat" || item.day_name == "Sun") {
                highlightedDiv.classList.add("row1TwoDays");
              } else {
                highlightedDiv.classList.add("row1OtherDays");
              }
            }
          });
        }
      });

      userData.count.map((item) => {
        let dbProsDate = item.follow_up_date.slice(8, 10);
        week1Day.map((dayItem) => {
          let datesDiv = dayItem.querySelector(".datesDiv");
          if (dbProsDate == datesDiv.innerText) {
            if (item.count != 0) {
              dayItem.querySelector(".countContainer").innerHTML = `
                            <div class='countBox monthCountBox' data-count=${item.count}>${item.count}+</div>`;
            }
          }
        });
        week2Day.map((dayItem) => {
          let datesDiv = dayItem.querySelector(".datesDiv");
          if (dbProsDate == datesDiv.innerText) {
            if (item.count != 0) {
              dayItem.querySelector(".countContainer").innerHTML = `
                            <div class='countBox monthCountBox' data-count=${item.count}>${item.count}+</div>`;
            }
          }
        });
        week3Day.map((dayItem) => {
          let datesDiv = dayItem.querySelector(".datesDiv");
          if (dbProsDate == datesDiv.innerText) {
            if (item.count != 0) {
              dayItem.querySelector(".countContainer").innerHTML = `
                            <div class='countBox monthCountBox' data-count=${item.count}>${item.count}+</div>`;
            }
          }
        });
        week4Day.map((dayItem) => {
          let datesDiv = dayItem.querySelector(".datesDiv");
          if (dbProsDate == datesDiv.innerText) {
            if (item.count != 0) {
              dayItem.querySelector(".countContainer").innerHTML = `
                            <div class='countBox monthCountBox' data-count=${item.count}>${item.count}+</div>`;
            }
          }
        });
        week5Day.map((dayItem) => {
          let datesDiv = dayItem.querySelector(".datesDiv");
          if (dbProsDate == datesDiv.innerText) {
            if (item.count != 0) {
              dayItem.querySelector(".countContainer").innerHTML = `
                            <div class='countBox monthCountBox' data-count=${item.count}>${item.count}+</div>`;
            }
          }
        });
        week5Day.map((dayItem) => {
          let datesDiv = dayItem.querySelector(".datesDiv");
          if (dbProsDate == datesDiv.innerText) {
            if (item.count != 0) {
              dayItem.querySelector(".countContainer").innerHTML = `
                            <div class='countBox monthCountBox' data-count=${item.count}>${item.count}+</div>`;
            }
          }
        });
      });

      document.querySelectorAll(".monthCountBox").forEach((ele) => {
        if (ele.closest(".row")) {
          ele.closest(".row").querySelector(".row1").style.width = "63.5%";
        }
        ele.addEventListener("click", listingMonthlyProspects);
      });
    }
  };
}

// View Prospects on Monthly slider

function listingMonthlyProspects(e) {
  document.querySelector(".monthlyScreen").style.display = "none";
  document.querySelector(".weeklyScreen").style.display = "none";
  document.querySelector(".dailyScreen").style.display = "block";

  document.querySelectorAll(".slideBtn").forEach((ele) => {
    ele.classList.remove("activeSlideBtn");
  });

  document
    .getElementsByClassName("slideBtn")[2]
    .classList.add("activeSlideBtn");

  let user_id = localStorage.getItem("user_id");

  let monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let activeMonth = monthArr[monthlyCounter];

  dailyMonthCounter = monthlyCounter;
  document.getElementById(
    "slider4"
  ).style.left = `${monthlyArr[monthlyCounter]}%`;

  let currentDate =
    e.currentTarget.parentElement.parentElement.querySelector(
      ".datesDiv"
    ).innerText;

  updateDatesDailySlider2();

  document.getElementById("slider5").style.left = `${
    dailyDateArr[currentDate - 1]
  }%`;
  dailyDateCounter = currentDate - 1;

  var second_user_id = localStorage.getItem("second_user_id");

  if (second_user_id != null) {
    user_id = second_user_id;
  }

  const url = `${globalURl}/daily_calender/${user_id}/${activeMonth}/${currentDate}/`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);


      document.getElementById("dailyRightSection").innerHTML = "";

      let classArr = [
        "row1TimeSpecial1",
        "row1TimeSpecial2",
        "row1TimeSpecial3",
      ];

      userData.data.map((item, i) => {
        document.getElementById("dailyRightSection").innerHTML += `
                <div class="dailyTimeRow1">

                    <div class="row1 row1Time ${classArr[i]}">
                        <img src=${item.image} />

                        <h5 data-id=${item.id}>${item.name}</h5>

                    </div>

                </div>
                `;
      });
    }
  };
}

// Display Weekly Calender Data

function getWeeklyCalendarData() {
  updateWeeklySlideWeekDates();

  document.querySelectorAll(".row1").forEach((ele) => {
    ele.innerHTML = ``;
    ele.classList.remove("row1OtherDays");
    ele.classList.remove("row1TwoDays");
  });

  let monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let month = monthArr[weeklyMonthCounter];

  let getWeekNumber = weeklyWeekCounter;

  var week = "";

  if (getWeekNumber == 0) {
    week = 1;
  }
  if (getWeekNumber == 1) {
    week = 2;
  }
  if (getWeekNumber == 2) {
    week = 3;
  }
  if (getWeekNumber == 3) {
    week = 4;
  }
  if (getWeekNumber == 4) {
    week = 5;
  }
  if (getWeekNumber == 5) {
    week = 6;
  }

  var user_id = localStorage.getItem("user_id");

  var second_user_id = localStorage.getItem("second_user_id");


  if (second_user_id != null) {
    user_id = second_user_id;
  }

  const url = `${globalURl}/weekly_calender/${user_id}/${month}/${week}/`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      let weekDayArr = [];

      document.querySelectorAll(".weekRow1").forEach((ele) => {
        weekDayArr.push(ele);
      });

      let week1Day = weekDayArr.slice(0, 7);
      let week2Day = weekDayArr.slice(7, 14);
      let week3Day = weekDayArr.slice(14, 21);
      let week4Day = weekDayArr.slice(21, 28);
      let week5Day = weekDayArr.slice(28, 35);
      let week6Day = weekDayArr.slice(35, 42);

      userData.data.map((item) => {
        let dbProsDate = item.follow_up_date.slice(8, 10);
        if (week == 1) {
          week1Day.map((dayItem) => {
            let datesDiv = dayItem.querySelector(".datesDiv");
            if (dbProsDate == datesDiv.innerText) {
              let highlightedDiv = dayItem.querySelector(".row1");
              highlightedDiv.innerHTML = "";
              highlightedDiv.innerHTML = `
                                <h5 data-id=${item.prospect_data.id}>${item.prospect_data.name}</h5>
                            `;
              if (item.day_name == "Sat" || item.day_name == "Sun") {
                highlightedDiv.classList.add("row1TwoDays");
              } else {
                highlightedDiv.classList.add("row1OtherDays");
              }
            }
          });
        }
        if (week == 2) {
          week2Day.map((dayItem) => {
            let datesDiv = dayItem.querySelector(".datesDiv");
            if (dbProsDate == datesDiv.innerText) {
              let highlightedDiv = dayItem.querySelector(".row1");
              highlightedDiv.innerHTML = "";
              highlightedDiv.innerHTML = `
                                <h5 data-id=${item.prospect_data.id}>${item.prospect_data.name}</h5>
                            `;
              if (item.day_name == "Sat" || item.day_name == "Sun") {
                highlightedDiv.classList.add("row1TwoDays");
              } else {
                highlightedDiv.classList.add("row1OtherDays");
              }
            }
          });
        }
        if (week == 3) {
          week3Day.map((dayItem) => {
            let datesDiv = dayItem.querySelector(".datesDiv");
            if (dbProsDate == datesDiv.innerText) {
              let highlightedDiv = dayItem.querySelector(".row1");
              highlightedDiv.innerHTML = "";
              highlightedDiv.innerHTML = `
                                <h5 data-id=${item.prospect_data.id}>${item.prospect_data.name}</h5>
                            `;
              if (item.day_name == "Sat" || item.day_name == "Sun") {
                highlightedDiv.classList.add("row1TwoDays");
              } else {
                highlightedDiv.classList.add("row1OtherDays");
              }
            }
          });
        }
        if (week == 4) {
          week4Day.map((dayItem) => {
            let datesDiv = dayItem.querySelector(".datesDiv");
            if (dbProsDate == datesDiv.innerText) {
              let highlightedDiv = dayItem.querySelector(".row1");
              highlightedDiv.innerHTML = "";
              highlightedDiv.innerHTML = `
                                <h5 data-id=${item.prospect_data.id}>${item.prospect_data.name}</h5>
                            `;
              if (item.day_name == "Sat" || item.day_name == "Sun") {
                highlightedDiv.classList.add("row1TwoDays");
              } else {
                highlightedDiv.classList.add("row1OtherDays");
              }
            }
          });
        }
        if (week == 5) {
          week5Day.map((dayItem) => {
            let datesDiv = dayItem.querySelector(".datesDiv");
            if (dbProsDate == datesDiv.innerText) {
              let highlightedDiv = dayItem.querySelector(".row1");
              highlightedDiv.innerHTML = "";
              highlightedDiv.innerHTML = `
                                <h5 data-id=${item.prospect_data.id}>${item.prospect_data.name}</h5>
                            `;
              if (item.day_name == "Sat" || item.day_name == "Sun") {
                highlightedDiv.classList.add("row1TwoDays");
              } else {
                highlightedDiv.classList.add("row1OtherDays");
              }
            }
          });
        }
        if (week == 6) {
          week6Day.map((dayItem) => {
            let datesDiv = dayItem.querySelector(".datesDiv");
            if (dbProsDate == datesDiv.innerText) {
              let highlightedDiv = dayItem.querySelector(".row1");
              highlightedDiv.innerHTML = "";
              highlightedDiv.innerHTML = `
                                <h5 data-id=${item.prospect_data.id}>${item.prospect_data.name}</h5>
                            `;
              if (item.day_name == "Sat" || item.day_name == "Sun") {
                highlightedDiv.classList.add("row1TwoDays");
              } else {
                highlightedDiv.classList.add("row1OtherDays");
              }
            }
          });
        }
      });

      userData.count.map((item) => {
        let dbProsDate = item.follow_up_date.slice(8, 10);
        if (week == 1) {
          week1Day.map((dayItem) => {
            let datesDiv = dayItem.querySelector(".datesDiv");
            if (dbProsDate == datesDiv.innerText) {
              if (item.count != 0) {
                dayItem.querySelector(".countContainer").innerHTML = `
                                <div class='countBox weekCountBox' data-count=${item.count}>${item.count}+</div>`;
              }
            }
          });
        }
        if (week == 2) {
          week2Day.map((dayItem) => {
            let datesDiv = dayItem.querySelector(".datesDiv");
            if (dbProsDate == datesDiv.innerText) {
              if (item.count != 0) {
                dayItem.querySelector(".countContainer").innerHTML = `
                                <div class='countBox weekCountBox' data-count=${item.count}>${item.count}+</div>`;
              }
            }
          });
        }
        if (week == 3) {
          week3Day.map((dayItem) => {
            let datesDiv = dayItem.querySelector(".datesDiv");
            if (dbProsDate == datesDiv.innerText) {
              if (item.count != 0) {
                dayItem.querySelector(".countContainer").innerHTML = `
                                <div class='countBox weekCountBox' data-count=${item.count}>${item.count}+</div>`;
              }
            }
          });
        }
        if (week == 4) {
          week4Day.map((dayItem) => {
            let datesDiv = dayItem.querySelector(".datesDiv");
            if (dbProsDate == datesDiv.innerText) {
              if (item.count != 0) {
                dayItem.querySelector(".countContainer").innerHTML = `
                                <div class='countBox weekCountBox' data-count=${item.count}>${item.count}+</div>`;
              }
            }
          });
        }
        if (week == 5) {
          week5Day.map((dayItem) => {
            let datesDiv = dayItem.querySelector(".datesDiv");
            if (dbProsDate == datesDiv.innerText) {
              if (item.count != 0) {
                dayItem.querySelector(".countContainer").innerHTML = `
                                <div class='countBox weekCountBox' data-count=${item.count}>${item.count}+</div>`;
              }
            }
          });
        }
        if (week == 6) {
          week6Day.map((dayItem) => {
            let datesDiv = dayItem.querySelector(".datesDiv");
            if (dbProsDate == datesDiv.innerText) {
              if (item.count != 0) {
                dayItem.querySelector(".countContainer").innerHTML = `
                                <div class='countBox weekCountBox' data-count=${item.count}>${item.count}+</div>`;
              }
            }
          });
        }
      });
    }
    document.querySelectorAll(".weekCountBox").forEach((ele) => {
      let weekRow1 = ele.closest(".weekRow1");

      if (weekRow1) {
        if (weekRow1 != null) {
          weekRow1.querySelector(".row1").style.width = "63.5%";
        }
      }

      ele.addEventListener("click", listingWeeklyProspects);
    });
  };
}

// View Weekly Prospects

function listingWeeklyProspects(e) {
  document.querySelector(".monthlyScreen").style.display = "none";
  document.querySelector(".weeklyScreen").style.display = "none";
  document.querySelector(".dailyScreen").style.display = "block";

  document.querySelectorAll(".slideBtn").forEach((ele) => {
    ele.classList.remove("activeSlideBtn");
  });

  document
    .getElementsByClassName("slideBtn")[2]
    .classList.add("activeSlideBtn");

  let user_id = localStorage.getItem("user_id");

  let monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let activeMonth = monthArr[weeklyMonthCounter];

  dailyMonthCounter = weeklyMonthCounter;
  document.getElementById(
    "slider4"
  ).style.left = `${weeklyMonthArr[weeklyMonthCounter]}%`;

  let currentDate =
    e.currentTarget.parentElement.parentElement.querySelector(
      ".datesDiv"
    ).innerText;

  updateDatesDailySlider2();

  document.getElementById("slider5").style.left = `${
    dailyDateArr[currentDate - 1]
  }%`;
  dailyDateCounter = currentDate - 1;

  var second_user_id = localStorage.getItem("second_user_id");

  if (second_user_id != null) {
    user_id = second_user_id;
  }

  const url = `${globalURl}/daily_calender/${user_id}/${activeMonth}/${currentDate}/`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);


      document.getElementById("dailyRightSection").innerHTML = "";

      let classArr = [
        "row1TimeSpecial1",
        "row1TimeSpecial2",
        "row1TimeSpecial3",
      ];

      userData.data.map((item, i) => {
        document.getElementById("dailyRightSection").innerHTML += `
                <div class="dailyTimeRow1">

                    <div class="row1 row1Time ${classArr[i]}">
                        <img src=${item.image} />

                        <h5 data-id=${item.id}>${item.name}</h5>

                    </div>

                </div>
                `;
      });
    }
  };
}

// Display Daily Calender Data

function getDailyCalendarData() {

  setTimeout(() => {
    
    updateDatesDailySlider2();
  
    document.querySelectorAll(".row1").forEach((ele) => {
      ele.innerHTML = ``;
      ele.classList.remove("row1OtherDays");
      ele.classList.remove("row1TwoDays");
    });
  
    let user_id = localStorage.getItem("user_id");
    let monthArr = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  
    let activeMonth = monthArr[dailyMonthCounter];
  
    let sliderContainer = document.getElementById("slider5");

    let getActiveDate =
      sliderContainer.getElementsByClassName("sliderItem1")[dailyDateCounter];

    let activeDate = getActiveDate.querySelector(".dateItem").innerText;
    let currentDate = activeDate.slice(6, 8);
  
    var second_user_id = localStorage.getItem("second_user_id");
  
    if (second_user_id != null) {
      user_id = second_user_id;
    }

    console.log(currentDate);
  
    const url = `${globalURl}/daily_calender/${user_id}/${activeMonth}/${currentDate}/`;
  
    let xhr = new XMLHttpRequest();
  
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let userData = JSON.parse(xhr.responseText);
        
        document.getElementById("dailyRightSection").innerHTML = "";
        
        let classArr = [
          "row1TimeSpecial1",
          "row1TimeSpecial2",
          "row1TimeSpecial3",
        ];
        
        if(userData.data.length > 0){

          userData.data.map((item, i) => {
            document.getElementById("dailyRightSection").innerHTML += `
                    <div class="dailyTimeRow1">
    
                        <div class="row1 row1Time ${classArr[i]}">
                            <img src=${item.image} />
    
                            <h5 data-id=${item.id}>${item.name}</h5>
    
                        </div>
    
                    </div>
                    `;
          });
        }
        if(userData.data.length == 0){
          document.getElementById("dailyRightSection").innerHTML = `
           <div style="width: 100%; height: 40vh; font-size: 14px; font-weight: 600; color: red; display: flex; justify-content: center; align-items: center;"> No Such Records... </div>
          `
        }
      }
    };
  }, 300);
}

// View Prospect Data Modal

setInterval(() => {
  if (document.querySelector(".row1TwoDays")) {
    document.querySelectorAll(".row1TwoDays").forEach((ele) => {
      ele.addEventListener("click", dynamicModalOpen);
    });
  }

  if (document.querySelector(".row1OtherDays")) {
    document.querySelectorAll(".row1OtherDays").forEach((ele) => {
      ele.addEventListener("click", dynamicModalOpen);
    });
  }

  if (document.querySelector(".row1Time")) {
    document.querySelectorAll(".row1Time").forEach((ele) => {
      ele.addEventListener("click", dynamicModalOpen);
    });
  }
}, 100);

var dynamicModal = document.getElementById("dynamicModal");

function dynamicModalOpen(e) {
  if (
    document
      .querySelector(".datePickerDiv")
      .classList.toggle("openDatePickerDiv") == true
  ) {
    document
      .querySelector(".datePickerDiv")
      .classList.toggle("openDatePickerDiv");
  }

  dynamicModal.style.transform = "scale(1)";
  dynamicModal.style.opacity = 1;

  let getId = ''

  let prospect_id_calender = localStorage.getItem('prospect_id_calender')

  if(prospect_id_calender){
    localStorage.removeItem('prospect_id_calender')
    getId = prospect_id_calender
  }
  else{
    getId = e.currentTarget.querySelector("h5").getAttribute("data-id")
  }

  let user_id = localStorage.getItem("user_id");

  const url = `${globalURl}/get_prospectData/${getId}/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.data) {
        localStorage.setItem("prospectData", JSON.stringify(userData.data));

        let followDate = userData.data.follow_up.slice(8, 10)
        let followMonth = userData.data.follow_up.slice(5, 7)
        let followYear = userData.data.follow_up.slice(0, 4)

        let imageContainer = document.querySelector(".imageContainer");

        imageContainer.innerHTML = `<img class="onClickLink" data-link=${userData.data.profile_link} data-id=${getId} src=${userData.data.image} />`;

        document.getElementById("prospectName").innerText = userData.data.name;
        document.getElementById("workExp").innerText =
          userData.data.description;
        document.getElementById("companyName").innerText =
          userData.data.company;
        document.getElementById("follow_up").value = userData.data.follow_up;
        document.getElementById("follow_up_print").innerText = followMonth + '-' + followDate + '-' + followYear
        document.getElementById("profile_url").value =
          userData.data.profile_link;
      }
      document.querySelectorAll(".onClickLink").forEach((ele) => {
        ele.addEventListener("click", openprofile);
      });
    }
  };
}

function openprofile(e) {
  var link = e.currentTarget.getAttribute("data-link");
  var prospect_id = e.currentTarget.getAttribute("data-id");

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

window.addEventListener("click", outsideClick);

function outsideClick(e) {
  if (e.target == dynamicModal) {
    dynamicModalClose();
    localStorage.removeItem("prospectData");
  }
}

function dynamicModalClose() {
  dynamicModal.style.transform = "scale(0)";
  dynamicModal.style.opacity = 0;

  document
    .querySelector(".datePickerDiv")
    .classList.remove("openDatePickerDiv");
}
document.getElementById("openDatePicker").addEventListener("click", () => {
  document
    .querySelector(".datePickerDiv")
    .classList.toggle("openDatePickerDiv");
});
if (document.getElementById("follow_up")) {
  document.getElementById("follow_up").addEventListener("change", eventSave);
}

function eventSave() {
  profile_check = 500;
  var follow_up = document.getElementById("follow_up").value;
  var profile_link = document.getElementById("profile_url").value;

  var user_id = localStorage.getItem("user_id");
  var second_user_id = localStorage.getItem("second_user_id");
  if (second_user_id != null) {
    user_id = second_user_id;
  }

  const url = `${globalURl}/event-save`;

  var xhr1 = new XMLHttpRequest();
  xhr1.open("POST", url, true);
  xhr1.setRequestHeader("Content-Type", "application/json");
  xhr1.send(
    JSON.stringify({
      user_id: user_id,
      follow_up: follow_up,
      profile_link: profile_link,
      calender_status: 1,
    })
  );
  xhr1.onreadystatechange = function () {

    if (xhr1.readyState == 4 && xhr1.status == "200") {
      getMonthlyCalendarData();
      getWeeklyCalendarData();
      getDailyCalendarData();
      dynamicModalClose();
    }
  };
}

if (document.getElementById("search_box")) {
  document
    .getElementById("search_box")
    .addEventListener("keyup", searchBoxFilter);
}

function searchBoxFilter(e) {
  var user_id = localStorage.getItem("user_id");
  var searchVal = e.target.value;

  document.querySelector(".searchBoxContainer").innerHTML = "";

  if (searchVal) {
    document.querySelector(".searchBoxContainer").style.display = "block";

    document.querySelector(".searchBoxContainer").innerHTML = `
      <div class='loader'></div>
    `;

    setTimeout(() => {
      const url = `${globalURl}/search_calender/${user_id}/${searchVal}`;
  
      var xhr1 = new XMLHttpRequest();
      xhr1.open("GET", url, true);
      xhr1.setRequestHeader("Content-Type", "application/json");
      xhr1.send();
      xhr1.onreadystatechange = function () {
        if (xhr1.readyState == 4 && xhr1.status == "200") {
          const userData = JSON.parse(xhr1.responseText);
  
          let colorArr = [
            "row1TimeSpecial1",
            "row1TimeSpecial2",
            "row1TimeSpecial3",
          ];
  
          if (userData.data.length > 0) {
            document.querySelector(".searchBoxContainer").innerHTML = "";
            userData.data.map((item, i) => {
              document.querySelector(".searchBoxContainer").innerHTML += `
              <p class='searchProspect ${
                colorArr[Math.floor(Math.random() * (2 - 0 + 1) + 0)]
              }' data-id=${item.id} data-follow-date=${item.follow_up}>${
                item.name
              }</p>
              `;
            });
            document.querySelectorAll(".searchProspect").forEach((ele) => {
              ele.addEventListener("click", showProspectData);
            });
          } else {
              document.querySelector(".searchBoxContainer").innerHTML = `
                <div class="userTitle" style="color: red; ">No Prospect Found</div>
              `;
          }
        }
      };
    }, 1000)
    
  } else {
    document.querySelector(".searchBoxContainer").style.display = "none";
  }
}

function showProspectData(e) {
  document.querySelector(".searchBoxContainer").style.display = "none";

  document.getElementById("search_box").value = "";

  let getProspectFollowUp = e.currentTarget.getAttribute("data-follow-date");
  let getProspectMonth = Number(getProspectFollowUp.slice(5, 7));
  let getProspectDate = Number(getProspectFollowUp.slice(8, 10));

  // Follow Up Month

  if (getProspectFollowUp.slice(5, 7).includes("0")) {
    getProspectMonth = Number(getProspectFollowUp.slice(6, 7));
  }

  // Follow Up Date

  if (getProspectFollowUp.slice(8, 10).includes("0")) {
    getProspectDate = Number(getProspectFollowUp.slice(9, 10));
  }

  // Monthly Screen

  if (document.querySelector(".activeSlideBtn").innerText === "Monthly") {
    let monthSliderDiv = document.getElementById("slider1");

    if (getProspectMonth == 1) {
      monthSliderDiv.style.left = `${monthlyArr[0]}%`;
      monthlyCounter = 0;
    }

    if (getProspectMonth == 12) {
      monthSliderDiv.style.left = `${monthlyArr[11]}%`;
      monthlyCounter = 11;
    }

    if (getProspectMonth != 1 && getProspectMonth != 12) {
      monthSliderDiv.style.left = `${monthlyArr[getProspectMonth - 1]}%`;
      monthlyCounter = getProspectMonth - 1;
    }

    getMonthlyCalendarData();
  }

  // Weekly Screen

  if (document.querySelector(".activeSlideBtn").innerText === "Weekly") {
    // Monthly Code

    let weeklyMonthSliderDiv = document.getElementById("slider2");


    if (getProspectMonth == 1) {
      weeklyMonthSliderDiv.style.left = `${weeklyMonthArr[0]}%`;
      weeklyMonthCounter = 0;
    }

    if (getProspectMonth == 12) {
      weeklyMonthSliderDiv.style.left = `${weeklyMonthArr[11]}%`;
      weeklyMonthCounter = 11;
    }

    if (getProspectMonth != 1 && getProspectMonth != 12) {
      weeklyMonthSliderDiv.style.left = `${
        weeklyMonthArr[getProspectMonth - 1]
      }%`;
      weeklyMonthCounter = getProspectMonth - 1;
    }

    // Weekly Code

    let weekSlide1 = [];
    let weekSlide2 = [];
    let weekSlide3 = [];
    let weekSlide4 = [];
    let weekSlide5 = [];

    for (let i = 1; i <= 7; i++) {
      weekSlide1.push(i);
    }
    for (let i = 8; i <= 14; i++) {
      weekSlide2.push(i);
    }
    for (let i = 15; i <= 21; i++) {
      weekSlide3.push(i);
    }
    for (let i = 22; i <= 28; i++) {
      weekSlide4.push(i);
    }
    for (let i = 29; i <= 31; i++) {
      weekSlide5.push(i);
    }

    let filterWeekSlide1 = weekSlide1.filter((item) => {
      return item == getProspectDate;
    });

    let filterWeekSlide2 = weekSlide2.filter((item) => {
      return item == getProspectDate;
    });

    let filterWeekSlide3 = weekSlide3.filter((item) => {
      return item == getProspectDate;
    });

    let filterWeekSlide4 = weekSlide4.filter((item) => {
      return item == getProspectDate;
    });

    let filterWeekSlide5 = weekSlide5.filter((item) => {
      return item == getProspectDate;
    });

    if (filterWeekSlide1.length > 0) {
      document.querySelector(".weekContainer1").style.display = "block";
      document.querySelector(".weekContainer2").style.display = "none";
      document.querySelector(".weekContainer3").style.display = "none";
      document.querySelector(".weekContainer4").style.display = "none";
      document.querySelector(".weekContainer5").style.display = "none";
      document.querySelector(".weeklyWeekContainer6").style.display = "none";

      document.getElementById("slider3").style = `${weeklyWeekArr[0]}%`;
      weeklyWeekCounter = 0;
    }

    if (filterWeekSlide2.length > 0) {
      document.querySelector(".weekContainer1").style.display = "none";
      document.querySelector(".weekContainer2").style.display = "block";
      document.querySelector(".weekContainer3").style.display = "none";
      document.querySelector(".weekContainer4").style.display = "none";
      document.querySelector(".weekContainer5").style.display = "none";
      document.querySelector(".weeklyWeekContainer6").style.display = "none";

      document.getElementById("slider3").style.left = `${weeklyWeekArr[1]}%`;
      weeklyWeekCounter = 1;
    }

    if (filterWeekSlide3.length > 0) {
      document.querySelector(".weekContainer1").style.display = "none";
      document.querySelector(".weekContainer2").style.display = "none";
      document.querySelector(".weekContainer3").style.display = "block";
      document.querySelector(".weekContainer4").style.display = "none";
      document.querySelector(".weekContainer5").style.display = "none";
      document.querySelector(".weeklyWeekContainer6").style.display = "none";

      document.getElementById("slider3").style.left = `${weeklyWeekArr[2]}%`;
      weeklyWeekCounter = 2;
    }

    if (filterWeekSlide4.length > 0) {
      document.querySelector(".weekContainer1").style.display = "none";
      document.querySelector(".weekContainer2").style.display = "none";
      document.querySelector(".weekContainer3").style.display = "none";
      document.querySelector(".weekContainer4").style.display = "block";
      document.querySelector(".weekContainer5").style.display = "none";
      document.querySelector(".weeklyWeekContainer6").style.display = "none";

      document.getElementById("slider3").style.left = `${weeklyWeekArr[3]}%`;
      weeklyWeekCounter = 3;
    }

    if (filterWeekSlide5.length > 0) {
      document.querySelector(".weekContainer1").style.display = "none";
      document.querySelector(".weekContainer2").style.display = "none";
      document.querySelector(".weekContainer3").style.display = "none";
      document.querySelector(".weekContainer4").style.display = "none";
      document.querySelector(".weekContainer5").style.display = "block";
      document.querySelector(".weeklyWeekContainer6").style.display = "none";

      document.getElementById("slider3").style.left = `${weeklyWeekArr[4]}%`;
      weeklyWeekCounter = 4;
    }

    getWeeklyCalendarData();
  }

  // Daily Screen

  if (document.querySelector(".activeSlideBtn").innerText === "Daily") {
    // Monthly Code

    let monthSliderDiv = document.getElementById("slider4");

    if (getProspectMonth == 1) {
      monthSliderDiv.style.left = `${dailyMonthArr[0]}%`;
      dailyMonthCounter = 0;
    }

    if (getProspectMonth == 12) {
      monthSliderDiv.style.left = `${dailyMonthArr[11]}%`;
      dailyMonthCounter = 11;
    }

    if (getProspectMonth != 1 && getProspectMonth != 12) {
      monthSliderDiv.style.left = `${dailyMonthArr[getProspectMonth - 1]}%`;
      dailyMonthCounter = getProspectMonth - 1;
    }

    // Daily Code

    if (getProspectDate >= 31) {
      document.getElementById("slider5").style.left = `${
        dailyDateArr[dailyDateArr.length - 1]
      }%`;
      dailyDateCounter = dailyDateArr.length - 1;
    }
    if (getProspectDate === 1) {
      document.getElementById("slider5").style.left = `${dailyDateArr[0]}%`;
      dailyDateCounter = 0;
    }
    if (getProspectDate > 1 && getProspectDate < 31) {
      document.getElementById("slider5").style.left = `${
        dailyDateArr[getProspectDate - 1]
      }%`;
      dailyDateCounter = getProspectDate - 1;
    }
    getDailyCalendarData();
  }

  dynamicModal.style.transform = "scale(1)";
  dynamicModal.style.opacity = 1;

  let getId = e.currentTarget.getAttribute("data-id");

  let user_id = localStorage.getItem("user_id");

  const url = `${globalURl}/get_prospectData/${getId}/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);

      if (userData.data) {
        localStorage.setItem("prospectData", JSON.stringify(userData.data));

        let followDate = userData.data.follow_up.slice(8, 10)
        let followMonth = userData.data.follow_up.slice(5, 7)
        let followYear = userData.data.follow_up.slice(0, 4)

        let imageContainer = document.querySelector(".imageContainer");

        imageContainer.innerHTML = `<img class="onClickLink" data-link=${userData.data.profile_link} data-id=${getId} src=${userData.data.image} />`;

        document.getElementById("prospectName").innerText = userData.data.name;
        document.getElementById("workExp").innerText =
          userData.data.description;
        document.getElementById("companyName").innerText =
          userData.data.company;

        document.getElementById("follow_up").value = userData.data.follow_up;
        document.getElementById("follow_up_print").innerText = document.getElementById("follow_up_print").innerText = followMonth + '-' + followDate + '-' + followYear;
        document.getElementById("profile_url").value =
          userData.data.profile_link;
      }
      document.querySelectorAll(".onClickLink").forEach((ele) => {
        ele.addEventListener("click", openprofile);
      });
    }
  };
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
function gotohome() {
  window.location.href = "home.html";
}

let prospectDate = Number(localStorage.getItem("prospectDate"));
let prospectMonth = Number(localStorage.getItem("prospectMonth"));

setTimeout(() => {
  if (prospectDate && prospectMonth) {
    localStorage.removeItem("prospectDate");
    localStorage.removeItem("prospectMonth");
  
    document.querySelector(".monthlyBtn").classList.remove("activeSlideBtn");
    document.querySelector(".weeklyBtn").classList.remove("activeSlideBtn");
    document.querySelector(".dailyBtn").classList.add("activeSlideBtn");
  
    document.querySelector(".monthlyScreen").style.display = "none";
    document.querySelector(".weeklyScreen").style.display = "none";
    document.querySelector(".dailyScreen").style.display = "block";

    // Monthly Code
  
    let monthSliderDiv = document.getElementById("slider4");
  
    if (prospectMonth == 1) {
      monthSliderDiv.style.left = `${dailyMonthArr[0]}%`;
      dailyMonthCounter = 0;
    }
  
    if (prospectMonth == 12) {
      monthSliderDiv.style.left = `${dailyMonthArr[11]}%`;
      dailyMonthCounter = 11;
    }
  
    if (prospectMonth != 1 && prospectMonth != 12) {
      monthSliderDiv.style.left = `${dailyMonthArr[prospectMonth - 1]}%`;
      dailyMonthCounter = prospectMonth - 1;
    }
  
    // Daily Code
  
    if (dailyMonthCounter == dailyMonthArr.length) {
      dailyMonthCounter = dailyMonthArr.length - 1;
    }
    
    let getMonthNumber2 = dailyMonthCounter;
    let getCurrentYear2 = new Date().getFullYear();
    let lastDay2 = new Date(getCurrentYear2, getMonthNumber2 + 1, 0).getDate();
  
    dailyDateArr = [];

    for (let i = 0; i < `${lastDay2}00`; i = i + 100) {
      dailyDateArr.push(`-${i}`);
    }
  
    dailyDateCounter = lastDay2 - 1

    if (prospectDate == 31) {
      document.getElementById("slider5").style.left = `${
        dailyDateArr[dailyDateArr.length - 1]
      }%`;
      dailyDateCounter = dailyDateArr.length - 1;
    }
    if (prospectDate === 1) {
      document.getElementById("slider5").style.left = `${dailyDateArr[0]}%`;
      dailyDateCounter = 0;

    }
    if (prospectDate > 1 && prospectDate < 31) {
      document.getElementById("slider5").style.left = `${
        dailyDateArr[prospectDate - 1]
      }%`;
      dailyDateCounter = prospectDate - 1;
    }
    
    getDailyCalendarData();
    dynamicModalOpen();
  }
}, 200);

if (document.getElementById("profilePic")) {
  document.getElementById("profilePic").addEventListener("click", () => {
    localStorage.setItem("OpenShowDataBase",true)
    window.location.href = "popup.html";

  });
}

