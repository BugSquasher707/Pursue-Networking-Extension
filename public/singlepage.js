const globalURl = "https://linkedin.thefastech.com";

setTimeout(() => {

    user_id = localStorage.getItem("user_id")
    getId = localStorage.getItem("prospect_id")
    const url = `${globalURl}/get_prospectData/${getId}/${user_id}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);
        if (userData.data) {
            document.getElementById("prospect_name").innerText = userData.data.name

            document.getElementById("select-listing").innerHTML = `<option value="compain" selected >${userData.data.status}</option>`
            document.getElementById("select-listing").innerHTML += `
            <option value="LinkedIn Campaign">LinkedIn Campaign</option>
            <option value="Talking/Replied">Talking/Replied</option>
            <option value="Serious Conversations">Serious Conversations</option>
            <option value="Discovery Call Scheduled">Discovery Call Scheduled</option>
            <option value="Discovery Call Completed">Discovery Call Completed</option>
            <option value="Boom">Boom</option>
            <option value="Lost">Lost</option>`
            $(".select-listing").select2().on('change', () => {
                let data = $(".select-listing option:selected").text();
                event_save()
            })
            

            document.getElementById("prospect_image").src = userData.data.image
            document.getElementById("follow_up_date").value = userData.data.follow_up
            document.getElementById("content").innerText = userData.data.notes
            document.getElementById("description_name").value = userData.data.description
            document.getElementById("company_name").value = userData.data.company
            document.getElementById("company_address").value = userData.data.address
            document.getElementById("prospect_about").value = userData.data.about
            document.getElementById("prospect_about").innerText = userData.data.about
            
            document.getElementById("discovery_call_date").value = userData.data.discovery_call
            document.getElementById("strategy_date").value = userData.data.strategy_date
            document.getElementById("weeklu_source").value = userData.data.weekly_date
            
            document.getElementById("total_messages").value = userData.data.total_messages
            document.getElementById("record_link").value = userData.data.profile_link
            document.getElementById("last_modified").value = userData.data.weekly_date
            if(userData.data.conversion)
            {
              document.getElementById("searchTopSelect-4").innerHTML = `<option value="compain" selected >${userData.data.conversion}</option>`
              document.getElementById("searchTopSelect-4").innerHTML += `
                  <option id="New Job - Congrats">New Job - Congrats</option>
                  <option id="Work Anniversary - Congrats">Work Anniversary - Congrats</option>
                  <option id="Birthday - Congrats">Birthday - Congrats</option>
                  <option id="Recently Viewed Profile">Recently Viewed Profile</option>
                  <option id="Message Sequence - Connection Request">Message Sequence - Connection Request
                  </option>
                  <option id="Message Sequence - Welcome Message">Message Sequence - Welcome Message
                  </option>
                  <option id="Message Sequence - Follow Up">Message Sequence - Follow Up</option>
                  <option id="Organic Outreach - Comments &amp; Likes">Organic Outreach - Comments &amp; Likes
                  </option>
                  <option id="Inbound">Inbound</option>
                  <option id="Direct Outreach">Direct Outreach</option>`
            }
            else{
              document.getElementById("searchTopSelect-4").innerHTML += `
              <option selected=""></option>
                  <option id="New Job - Congrats">New Job - Congrats</option>
                  <option id="Work Anniversary - Congrats">Work Anniversary - Congrats</option>
                  <option id="Birthday - Congrats">Birthday - Congrats</option>
                  <option id="Recently Viewed Profile">Recently Viewed Profile</option>
                  <option id="Message Sequence - Connection Request">Message Sequence - Connection Request
                  </option>
                  <option id="Message Sequence - Welcome Message">Message Sequence - Welcome Message
                  </option>
                  <option id="Message Sequence - Follow Up">Message Sequence - Follow Up</option>
                  <option id="Organic Outreach - Comments &amp; Likes">Organic Outreach - Comments &amp; Likes
                  </option>
                  <option id="Inbound">Inbound</option>
                  <option id="Direct Outreach">Direct Outreach</option>`
            }
            $("#searchTopSelect-4").select2().on('change', () => {
              let data = $("#searchTopSelect-4 option:selected").text();
              event_save()
          })
            if(userData.data.endorsement){
              if(userData.data.endorsement  == "No"){
                document.getElementById("end-given-no").checked = true
              }
              else{
                document.getElementById("end-given-yes").checked = true
              }
            }

            if(userData.data.priority){
              if(userData.data.priority  == "A"){
                document.getElementById("prospects-a").checked = true
              }
              else if(userData.data.priority  == "B"){
                document.getElementById("prospects-b").checked = true
              }
              else if(userData.data.priority  == "C"){
                document.getElementById("prospects-c").checked = true
              }
              else {
                document.getElementById("prospects-d").checked = true
              }
            }

            if(userData.comments){
              document.getElementById("comments_div").innerHTML = ``
              userData.comments.map((obj) => {
                // lists.push(obj.id);
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
                document.getElementById("comments_div").innerHTML += `<div class="user-comment" ><div class="img-box">
                <img src="${obj.image}" alt="" class="profile">
            </div>
            <div class="comment-text">
                <div class="top-content">
                    <span class="user-name-comment">${obj.name}</span>
                    <span class="time-ago">${msg}</span>
                </div>
                <div class="bottom-box-content">
                ${obj.comment}
                </div>
            </div>
            </div>`

                

              })
            }
            else{
              document.getElementById("comments_div").innerHTML = `No Comments To Show`
            }
            




        }
    }
}
},100)

function event_save(){

  
    user_id = localStorage.getItem("user_id")
    fname =  document.getElementById("prospect_name").innerText 
    let status = $(".select-listing option:selected").text();
    profile_image = document.getElementById("prospect_image").src
    description =  document.getElementById("description_name").value
    company = document.getElementById("company_name").value
    about = document.getElementById("prospect_about").value
    address = document.getElementById("company_address").value
    notes = document.getElementById("content").innerText
    follow_up = document.getElementById("follow_up_date").value
    discovery_call = document.getElementById("discovery_call_date").value
    updated_at = document.getElementById("last_modified").value
    conversion = $("#searchTopSelect-4 option:selected").text();
    total_messages = document.getElementById("total_messages").value
    endorsement = null;
    if (document.querySelector('input[name="end-given"]:checked')) {
      endorsement = document.querySelector(
        'input[name="end-given"]:checked'
      ).value;
    }
     
    priority = null;
    if (document.querySelector('input[name="prospects"]:checked')) {
      priority = document.querySelector(
        'input[name="prospects"]:checked'
      ).value;
    }
    profile_link = document.getElementById("record_link").value
    weekly_date = document.getElementById("weeklu_source").value
    strategy_date = document.getElementById("strategy_date").value

    var today = new Date(weekly_date);
          var today = today.toISOString().substring(0, 10);
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

          weekly_source = today.toLocaleDateString("en-US", options) +
          " Week " +
          getWeekOfMonth(date) +
          " -" +
          today.toLocaleDateString("en-US", options_year);

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
}
function getWeekOfMonth(date) {
  let adjustedDate = date.getDate() + date.getDay();
  let prefixes = ["0", "1", "2", "3", "4", "5"];
  return parseInt(prefixes[0 | (adjustedDate / 8)]) + 1;
}

if (document.getElementById("follow_up_date")) {
  document
    .getElementById("follow_up_date")
    .addEventListener("change", event_save);
}

if (document.getElementById("content")) {
  document
    .getElementById("content")
    .addEventListener("keyup", event_save);
}
if (document.getElementById("description_name")) {
  document
    .getElementById("description_name")
    .addEventListener("change", event_save);
}

if (document.getElementById("company_name")) {
  document
    .getElementById("company_name")
    .addEventListener("change", event_save);
}

if (document.getElementById("company_address")) {
  document
    .getElementById("company_address")
    .addEventListener("change", event_save);
}

if (document.getElementById("prospect_about")) {
  document
    .getElementById("prospect_about")
    .addEventListener("change", event_save);
}

if (document.getElementById("discovery_call_date")) {
  document
    .getElementById("discovery_call_date")
    .addEventListener("change", event_save);
}
if (document.getElementById("strategy_date")) {
  document
    .getElementById("strategy_date")
    .addEventListener("change", event_save);
}
if (document.getElementById("weeklu_source")) {
  document
    .getElementById("weeklu_source")
    .addEventListener("change", event_save);
}

if (document.getElementById("total_messages")) {
  document
    .getElementById("total_messages")
    .addEventListener("change", event_save);
}
if (document.getElementById("record_link")) {
  document
    .getElementById("record_link")
    .addEventListener("change", event_save);
}
if (document.getElementById("last_modified")) {
  document
    .getElementById("last_modified")
    .addEventListener("change", event_save);
}

if (document.getElementById("add_comment")) {
  document.getElementById("add_comment").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      add_comment();
    }
  });
}
function add_comment(){
  var user_id = localStorage.getItem("user_id");

  const url = `${globalURl}/addComment`;
  var actual_id = localStorage.getItem("user_id");
  if (!actual_id) {
    actual_id = user_id;
  }
  var profile_link = document.getElementById("record_link").value
  var comment = document.getElementById("add_comment").value;
  document.getElementById("add_comment").value = "";

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
        viewComments()

      }
    }
}

}
function viewComments(){

  user_id = localStorage.getItem("user_id")
  secondary_id = localStorage.getItem("user_id")

  var profile_link = document.getElementById("record_link").value;
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

      if (xhr.readyState == 4 && xhr.status == 200) {
        let userData = JSON.parse(xhr.responseText);
          if (userData) {
            console.log(userData)
            document.getElementById("comments_div").innerHTML = ``
            userData.map(function (obj, key) {

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
              document.getElementById("comments_div").innerHTML += `<div class="user-comment" ><div class="img-box">
              <img src="${obj.image}" alt="" class="profile">
          </div>
          <div class="comment-text">
              <div class="top-content">
                  <span class="user-name-comment">${obj.name}</span>
                  <span class="time-ago">${msg}</span>
              </div>
              <div class="bottom-box-content">
              ${obj.comment}
              </div>
          </div>
          </div>`



            })

          }
        }
      }

}
if (document.getElementById("open_linkedin")) {
  document.getElementById("open_linkedin").addEventListener("click", function() {
    window.open(document.getElementById("record_link").value)
  });
}
