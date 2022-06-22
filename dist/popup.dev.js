"use strict";

var profile_check = 0;

function setup() {
  noCanvas();
  localStorage.removeItem("second_user_id");
  profile_check = 0;
  var bgpage = chrome.extension.getBackgroundPage();
  var title = bgpage.word.title;
  var name = bgpage.word.name;
  var description = bgpage.word.description;
  var address = bgpage.word.address;
  var company = bgpage.word.company;
  var about = bgpage.word.about;
  var img = bgpage.word.img;
  var profile_link = bgpage.word.profile_link;
  var prev = null;
  var access_token = localStorage.getItem("access_token");
  var username = localStorage.getItem("username");
  var user_id = localStorage.getItem("user_id"); // var user = apiCall('http://linkedin.thefastech.com/access_token/'+access_token);

  if (access_token && username) {
    if (document.getElementById('not_logged_in_buttons')) {
      document.getElementById('not_logged_in_buttons').style.display = 'none';
    }

    if (document.getElementById('logged_in_buttons')) {
      document.getElementById('logged_in_buttons').style.display = 'block';
    }

    if (document.getElementById('username')) {
      var trimmed_username = username.substring(0, 20);
      document.getElementById('username').innerText = 'Welcome, ' + trimmed_username;
    }
  } else {
    document.getElementById('not_logged_in_buttons').style.display = 'block';
  }

  if (bgpage.word.loader == 'loader') {
    console.log('loader');
    addLoader();
    setTimeout(function () {
      var bgpage = chrome.extension.getBackgroundPage();
      var profile_link = bgpage.word.profile_link;
      console.log('started');
      var user_id = localStorage.getItem("user_id");
      var url = 'http://linkedin.thefastech.com/alreadyStored';
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({
        id: profile_link,
        user_id: user_id
      }));
      console.log('requested');

      xhr.onreadystatechange = function () {
        //Call a function when the state changes.
        if (xhr.readyState == 4 && xhr.status == 200) {
          res = JSON.parse(xhr.responseText);
          console.log(profile_link);

          if (xhr.responseText != '400') {
            document.getElementById('alreadyStored').innerText = 'Already Stored';
            prev = res;
            document.getElementById('about').value = prev.about;
            document.getElementById('notes').value = prev.notes;

            if (document.getElementById(prev.status)) {
              document.getElementById(prev.status).selected = true;
              var status_tag = document.getElementById('status');
              status_tag = status_tag[status_tag.selectedIndex].style.color; // alert(status_tag);

              document.getElementById('statusbg').style.backgroundColor = status_tag;
            }

            document.getElementById('discovery_call').value = prev.discovery_call;

            if (prev.endorsement == 'Yes') {
              document.getElementById('endorsement_yes').checked = true;
            } else if (prev.endorsement == 'No') {
              document.getElementById('endorsement_no').checked = true;
            }

            if (prev.priority == 'A') {
              document.getElementById('priority_a').checked = true;
            } else if (prev.priority == 'B') {
              document.getElementById('priority_b').checked = true;
            } else if (prev.priority == 'C') {
              document.getElementById('priority_c').checked = true;
            } else if (prev.priority == 'D') {
              document.getElementById('priority_d').checked = true;
            }

            document.getElementById('total_messages').value = prev.total_messages;
            document.getElementById('follow_up').value = prev.follow_up;
            document.getElementById('conversion').value = prev.conversion;
            document.getElementById('week').value = prev.weekly_date;
            var today = new Date(prev.weekly_date);
            var today = today.toISOString().substring(0, 10);
            document.getElementById('week').value = today; // document.getElementById('week').max =  today;

            var weekly_source = today;
            var options = {
              month: 'short'
            };
            var options_year = {
              year: '2-digit'
            };
            var today = new Date(weekly_source); //init date

            var date = new Date(weekly_source); // document.getElementById("week_number").innerHTML =(getWeekOfMonth(date));

            document.getElementById('weekly_source').innerText = today.toLocaleDateString("en-US", options) + ' Week ' + getWeekOfMonth(date) + ' -' + today.toLocaleDateString("en-US", options_year);
          }
        }
      };

      console.log('closed');
      removeLoader();
    }, 7000);
    var today = new Date();
    var today = today.toISOString().substring(0, 10);
    document.getElementById('week').value = today;
    document.getElementById('week').max = today;
    var weekly_source = today;
    var options = {
      month: 'short'
    };
    var options_year = {
      year: '2-digit'
    };
    var today = new Date(weekly_source); //init date

    var date = new Date(weekly_source); // document.getElementById("week_number").innerHTML =(getWeekOfMonth(date));

    document.getElementById('weekly_source').innerText = today.toLocaleDateString("en-US", options) + ' Week ' + getWeekOfMonth(date) + ' -' + today.toLocaleDateString("en-US", options_year);
  } else {
    console.log('started');
    var user_id = localStorage.getItem("user_id");
    var url = 'http://linkedin.thefastech.com/alreadyStored';
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      id: profile_link,
      user_id: user_id
    }));
    console.log('requested');

    xhr.onreadystatechange = function () {
      //Call a function when the state changes.
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log('response');
        res = JSON.parse(xhr.responseText);

        if (xhr.responseText != '400') {
          // alert();
          // document.getElementById('alreadyStored').innerText = 'Already Stored';
          prev = res;
          document.getElementById('about').value = prev.about;
          document.getElementById('notes').value = prev.notes;

          if (document.getElementById(prev.status)) {
            document.getElementById(prev.status).selected = true;
            var status_tag = document.getElementById('status');
            status_tag = status_tag[status_tag.selectedIndex].style.color; // alert(status_tag);
            // document.getElementById('statusbg').style.backgroundColor = status_tag;
          }

          document.getElementById('discovery_call').value = prev.discovery_call;

          if (prev.endorsement == 'Yes') {
            document.getElementById('endorsement_yes').checked = true;
          } else if (prev.endorsement == 'No') {
            document.getElementById('endorsement_no').checked = true;
          }

          if (prev.priority == 'A') {
            document.getElementById('priority_a').checked = true;
          } else if (prev.priority == 'B') {
            document.getElementById('priority_b').checked = true;
          } else if (prev.priority == 'C') {
            document.getElementById('priority_c').checked = true;
          } else if (prev.priority == 'D') {
            document.getElementById('priority_d').checked = true;
          }

          document.getElementById('total_messages').value = prev.total_messages;
          document.getElementById('follow_up').value = prev.follow_up;
          document.getElementById('conversion').value = prev.conversion;
          document.getElementById('week').value = prev.weekly_date;
          var today = new Date(prev.weekly_date);
          var today = today.toISOString().substring(0, 10);
          document.getElementById('week').value = today; // document.getElementById('week').max =  today;

          var weekly_source = today;
          var options = {
            month: 'short'
          };
          var options_year = {
            year: '2-digit'
          };
          var today = new Date(weekly_source); //init date

          var date = new Date(weekly_source); // document.getElementById("week_number").innerHTML =(getWeekOfMonth(date));

          document.getElementById('weekly_source').innerText = today.toLocaleDateString("en-US", options) + ' Week ' + getWeekOfMonth(date) + ' -' + today.toLocaleDateString("en-US", options_year);
        }
      }
    };

    console.log('closed');
    var today = new Date();
    var today = today.toISOString().substring(0, 10);
    document.getElementById('week').value = today;
    document.getElementById('week').max = today;
    var weekly_source = today;
    var options = {
      month: 'short'
    };
    var options_year = {
      year: '2-digit'
    };
    var today = new Date(weekly_source); //init date

    var date = new Date(weekly_source); // document.getElementById("week_number").innerHTML =(getWeekOfMonth(date));

    document.getElementById('weekly_source').innerText = today.toLocaleDateString("en-US", options) + ' Week ' + getWeekOfMonth(date) + ' -' + today.toLocaleDateString("en-US", options_year);
    removeLoader();
  }
}

setInterval(function () {
  // alert();
  // console.log(profile_check);
  if (profile_check < 100) {
    var bgpage = chrome.extension.getBackgroundPage();
    var title = bgpage.word.title;
    var name = bgpage.word.name;
    var description = bgpage.word.description;
    var address = bgpage.word.address;
    var company = bgpage.word.company;
    var about = bgpage.word.about;
    var img = bgpage.word.img;
    var profile_link = bgpage.word.profile_link;

    if (!name) {
      addLoader();
    } else {
      removeLoader();
    }

    document.getElementById('name').innerText = name;
    document.getElementById('fname').value = name;
    document.getElementById('description').value = description;
    document.getElementById('address').innerText = address;
    document.getElementById('company').value = company;
    document.getElementById('about').innerText = about;
    var copy_link = profile_link;
    document.getElementById('profile_link').innerText = copy_link;
    var image = document.getElementById('image');
    image.src = img;
  }

  profile_check++;
}, 100); //////////////////// Event Listeners /////////////////////////////

if (document.getElementById('request')) {
  document.getElementById('request').addEventListener('click', getRequest);
}

if (document.getElementById('view_profile')) {
  document.getElementById('view_profile').addEventListener('click', getProfile);
}

if (document.getElementById('view_all')) {
  document.getElementById('view_all').addEventListener('click', getAll);
}

if (document.getElementById('view_all_1')) {
  document.getElementById('view_all_1').addEventListener('click', getAll);
}

if (document.getElementById('go_back')) {
  document.getElementById('go_back').addEventListener('click', getProfile);
}

if (document.getElementById('login')) {
  document.getElementById('login').addEventListener('click', getLoginPage);
}

if (document.getElementById('login_submit')) {
  document.getElementById('login_submit').addEventListener('click', loginSubmit);
}

if (document.getElementById('register')) {
  document.getElementById('register').addEventListener('click', getRegisterPage);
}

if (document.getElementById('register_submit')) {
  document.getElementById('register_submit').addEventListener('click', registerSubmit);
}

if (document.getElementById('logout')) {
  document.getElementById('logout').addEventListener('click', logout);
}

if (document.getElementById('logout1')) {
  document.getElementById('logout1').addEventListener('click', logout);
}

if (document.getElementById('admin_home')) {
  document.getElementById('admin_home').addEventListener('click', adminHome);
}

if (document.getElementById('users_listing')) {
  document.getElementById('users_listing').addEventListener('click', usersListing);
}

if (document.getElementById('view_categories')) {
  document.getElementById('view_categories').addEventListener('click', viewCategories);
}

if (document.getElementById('add_category')) {
  document.getElementById('add_category').addEventListener('click', addCategory);
}

if (document.getElementById('category_submit')) {
  document.getElementById('category_submit').addEventListener('click', categorySubmit);
} /// Filters


if (document.getElementById('status_filter')) {
  document.getElementById('status_filter').addEventListener('change', weekFilterChange);
}

if (document.getElementById('weekly_filter')) {
  document.getElementById('weekly_filter').addEventListener('change', weekFilterChange);
}

if (document.getElementById('priority_filter')) {
  document.getElementById('priority_filter').addEventListener('change', weekFilterChange);
}

if (document.getElementById('follow_up_filter')) {
  document.getElementById('follow_up_filter').addEventListener('change', weekFilterChange);
}

if (document.getElementById('discovery_filter')) {
  document.getElementById('discovery_filter').addEventListener('change', weekFilterChange);
}

if (document.getElementById('view_type')) {
  document.getElementById('view_type').addEventListener('change', weekFilterChange);
}

if (document.getElementById('search_box')) {
  document.getElementById('search_box').addEventListener('keyup', weekFilterChange);
} /// Filters End ////


if (document.getElementById('week')) {
  document.getElementById('week').addEventListener('change', weekChange);
}

if (document.getElementById('notes')) {
  document.getElementById('notes').addEventListener('keyup', eventSave);
}

if (document.getElementById('status')) {
  document.getElementById('status').addEventListener('change', statusEventSave);
}

if (document.getElementById('follow_up')) {
  document.getElementById('follow_up').addEventListener('change', eventSave);
}

if (document.getElementById('discovery_call')) {
  document.getElementById('discovery_call').addEventListener('change', eventSave);
}

if (document.getElementById('conversion')) {
  document.getElementById('conversion').addEventListener('change', eventSave);
}

if (document.getElementById('total_messages')) {
  document.getElementById('total_messages').addEventListener('change', eventSave);
}

if (document.getElementById('endorsement_yes')) {
  document.getElementById('endorsement_yes').addEventListener('change', eventSave);
}

if (document.getElementById('endorsement_no')) {
  document.getElementById('endorsement_no').addEventListener('change', eventSave);
}

if (document.getElementById('priority_a')) {
  document.getElementById('priority_a').addEventListener('change', eventSave);
}

if (document.getElementById('priority_b')) {
  document.getElementById('priority_b').addEventListener('change', eventSave);
}

if (document.getElementById('priority_c')) {
  document.getElementById('priority_c').addEventListener('change', eventSave);
}

if (document.getElementById('priority_d')) {
  document.getElementById('priority_d').addEventListener('change', eventSave);
}

if (document.getElementById('about')) {
  document.getElementById('about').addEventListener('keyup', aboutEventSave);
}

if (document.getElementById('show_filters')) {
  document.getElementById('show_filters').addEventListener('click', showFilters);
}

if (document.getElementById('share')) {
  document.getElementById('share').addEventListener('click', share);
}

if (document.getElementById('share_submit')) {
  document.getElementById('share_submit').addEventListener('click', shareSubmit);
}

if (document.getElementById('editBtn')) {
  document.getElementById('editBtn').addEventListener('click', editData);
}

if (document.getElementById('get_all_databases')) {
  document.getElementById('get_all_databases').addEventListener('click', getAllDatabases);
}

if (document.getElementById('username_login')) {
  document.getElementById('username_login').addEventListener('keyup', enterPress);
}

if (document.getElementById('password_login')) {
  document.getElementById('password_login').addEventListener('keyup', enterPress);
}

if (document.getElementById('username_register')) {
  document.getElementById('username_register').addEventListener('keyup', enterPressRegister);
}

if (document.getElementById('password_register')) {
  document.getElementById('password_register').addEventListener('keyup', enterPressRegister);
}

if (document.getElementById('confirm_password_register')) {
  document.getElementById('confirm_password_register').addEventListener('keyup', enterPressRegister);
}

if (document.getElementById('view_comments')) {
  document.getElementById('view_comments').addEventListener('click', viewComments);
}

if (document.getElementById('add_comment')) {
  document.getElementById('add_comment').addEventListener('click', addComment);
}

if (document.getElementById('comment_box')) {
  document.getElementById('comment_box').addEventListener('keyup', addCommentKeyUp);
}

if (document.getElementById('delete_prospect')) {
  document.getElementById('delete_prospect').addEventListener('click', deleteProspect);
}

if (document.getElementById('image')) {
  document.getElementById('image').addEventListener('click', imageClicked);
} /////////////// Event Listeners //////////////////////////////////


function aboutEventSave() {
  profile_check = 500;
  eventSave();
}

function imageClicked() {
  var profile_link = document.getElementById('profile_link').innerText;
  var params = {
    active: true,
    currentWindow: true
  };
  chrome.tabs.query(params, gotTab);

  function gotTab(tabs) {
    var msg = {
      txt: profile_link
    };
    chrome.tabs.sendMessage(tabs[0].id, msg);
  }

  window.close();
}

function addCommentKeyUp(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("add_comment").click();
  }
}

function deleteProspect() {
  var url = 'http://linkedin.thefastech.com/deleteProspect';
  var user_id = localStorage.getItem("user_id");
  var profile_link = document.getElementById('profile_link').innerText;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    user_id: user_id,
    profile_link: profile_link
  }));

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (xhr.responseText != '200') {} else {
        alert('Prospect Deleted');
        getAll();
      }
    }
  };
}

function addComment() {
  var url = 'http://linkedin.thefastech.com/addComment';
  var user_id = localStorage.getItem("user_id");
  var actual_id = localStorage.getItem("second_user_id");

  if (!actual_id) {
    actual_id = user_id;
  }

  var profile_link = document.getElementById('profile_link').innerText;
  var comment = document.getElementById('comment_box').value;
  document.getElementById('comment_box').value = '';
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  if (comment != '') {
    xhr.send(JSON.stringify({
      user_id: user_id,
      actual_id: actual_id,
      profile_link: profile_link,
      comment: comment
    }));
  }

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      // alert(xhr.responseText);
      if (xhr.responseText == '200') {
        viewComments();
      } else {}
    }
  };
}

function viewComments() {
  var access_token = localStorage.getItem("access_token");
  var user_id = localStorage.getItem("user_id");
  var secondary_id = localStorage.getItem("secondary_user_id");

  if (!access_token || !username) {
    getLoginPage();
  }

  var profile_link = document.getElementById('profile_link').innerText;
  var url = 'http://linkedin.thefastech.com/getComments?user_id=' + user_id + '&profile_link=' + profile_link + '&secondary_id=' + secondary_id;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (xhr.responseText != '400') {
        document.getElementById('comments_data').innerHTML = '';
        comments = JSON.parse(xhr.responseText);
        var commentArr = comments.map(function (obj, key) {
          row = "<div class=\"popup_left m-2\">" + obj.comment + "</div>"; // all1 += row;

          document.getElementById('comments_data').innerHTML += row;
        });
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
  document.getElementById('statusbg').style.backgroundColor = this.options[this.selectedIndex].style.color;
  eventSave();
}

function getAllDatabases() {
  var username = localStorage.getItem("username");
  var user_id = localStorage.getItem("user_id");

  if (document.getElementById('multi_database')) {
    var url1 = 'http://linkedin.thefastech.com/linkingids?user_id=' + username;
    var xhr1 = new XMLHttpRequest();
    xhr1.open("GET", url1, true);
    xhr1.setRequestHeader('Content-Type', 'application/json');
    xhr1.send();

    xhr1.onreadystatechange = function () {
      //Call a function when the state changes.
      if (xhr1.readyState == 4 && xhr1.status == 200) {
        if (xhr1.responseText != '400') {
          var respon = xhr1.responseText;
          respon = JSON.parse(respon);
          var row = '<div class="text-center" style="margin:5% !important"><h3>Databases</h3></div>';
          row += "<div class=\"mt-2 text-center single_database\" id=\"" + user_id + "\" style=\"padding-bottom:2%; margin-top:5% !important; cursor:pointer\"><p class=\"pl-2\" style=\"margin-bottom:0\"><strong>  - " + username + "</strong> </p></div>";
          document.getElementById('multi_database').innerHTML = row; // document.getElementById('single'+username).addEventListener('click', getSingleDatabase);

          var finalArr = respon.map(function (obj, key) {
            row = "<div class=\"mt-2 text-center single_database\" id=\"" + obj.link_id + "\" style=\"padding-bottom:2%; margin-top:5% !important; cursor:pointer\"><p class=\"pl-2\" style=\"margin-bottom:0\"><strong>  - " + obj.user_id + "</strong> </p></div>"; // all1 += row;

            document.getElementById('multi_database').innerHTML += row;
          });
          var single_database = document.getElementsByClassName('single_database');

          for (var i = 0; i < single_database.length; i++) {
            single_database[i].addEventListener('click', getSingleDatabase, false);
          } // document.getElementsByClassName('single_database').addEventListener('click', getSingleDatabase);


          document.getElementById('multi_database').style.display = 'block';
          document.getElementById('results').style.display = 'none';
        }
      }
    };
  }
}

function getSingleDatabase() {
  var user_id = this.getAttribute("id");
  document.getElementById('multi_database').style.display = 'none';
  localStorage.setItem("second_user_id", user_id);
  getAllById(user_id);
}

function shareSubmit() {
  var username = document.getElementById('username').value;
  var message = document.getElementById('message1');
  var user_id = localStorage.getItem("username");
  var link_id = localStorage.getItem("user_id");
  var re = /\S+@\S+\.\S+/; // return re.test(email);

  if (!re.test(username)) {
    message.innerText = 'Email Format incorrect';
  } else {
    message.style.color = 'green';
    message.innerText = 'Waiting for response';
    var url = 'http://linkedin.thefastech.com/share?email=' + username + '&user_id=' + user_id + '&link_id=' + link_id;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();

    xhr.onreadystatechange = function () {
      //Call a function when the state changes.
      if (xhr.readyState == 4 && xhr.status == 200) {
        if (xhr.responseText != '400') {
          message.innerText = 'Confirmation Email Sent Successful';
          setTimeout(function () {
            document.location.href = "popup.html";
          }, 3000);
        } else {
          message.style.color = 'red';
          message.innerText = 'No Such User Exists';
        }
      }
    };
  }
}

function share() {
  document.location.href = 'share.html';
}

function editData(e) {
  var fname = document.getElementById('fname');
  var description = document.getElementById('description');
  var company = document.getElementById('company');
  var about = document.getElementById('about');

  if (fname.readOnly === true && description.readOnly === true && company.readOnly === true && about.readOnly === true) {
    fname.readOnly = false;
    description.readOnly = false;
    company.readOnly = false;
    about.readOnly = false;
    fname.classList.add('editableInputs');
    description.classList.add('editableInputs');
    company.classList.add('editableInputs');
    about.classList.add('editableTextArea');
    fname.value = e.target.value;
    description.value = e.target.value;
    company.value = e.target.value;
    about.innerText = e.target.value;
  } else {
    fname.readOnly = true;
    description.readOnly = true;
    company.readOnly = true;
    about.readOnly = true;
    fname.classList.remove('editableInputs');
    description.classList.remove('editableInputs');
    company.classList.remove('editableInputs');
    about.classList.remove('editableTextArea');
  }
}

function showFilters() {
  elem = document.getElementById('new_filters');

  if (elem.style.display == 'none') {
    elem.style.display = 'block';
  } else {
    elem.style.display = 'none';
  }
}

function weekFilterChange(e) {
  // var selected_value = e.currentTarget[e.currentTarget.selectedIndex].innerHTML;
  var status = document.getElementById('status_filter').value;
  var weekly = document.getElementById('weekly_filter').value;
  var priority = document.getElementById('priority_filter').value;
  var follow_up = document.getElementById('follow_up_filter').value;
  var discovery = document.getElementById('discovery_filter').value;
  var search_box = document.getElementById('search_box').value;
  var user_id = localStorage.getItem("second_user_id");

  if (!user_id) {
    user_id = localStorage.getItem("user_id");
  }

  var view_type = document.getElementById('view_type').checked;
  filtersChange(user_id, status, weekly, priority, follow_up, discovery, view_type, search_box);
  document.getElementById('get_all_message').style.display = 'none';
}

function getWeekOfMonth(date) {
  var adjustedDate = date.getDate() + date.getDay();
  var prefixes = ['0', '1', '2', '3', '4', '5'];
  return parseInt(prefixes[0 | adjustedDate / 8]) + 1;
}

function weekChange(e) {
  var weekly_source = e.currentTarget.value;
  var options = {
    month: 'short'
  };
  var options_year = {
    year: '2-digit'
  };
  var today = new Date(weekly_source); //init date

  var date = new Date(weekly_source); // document.getElementById("week_number").innerHTML =(getWeekOfMonth(date));

  document.getElementById('weekly_source').innerText = today.toLocaleDateString("en-US", options) + ' Week ' + getWeekOfMonth(date) + ' -' + today.toLocaleDateString("en-US", options_year);
  eventSave();
}

function showStatus(e) {
  console.log('status'); // var check = document.getElementById('status').innerHTML;
  // alert(check);
  // if(check == 'Select' || check == '<option>null</option>'){

  apiCategories('status'); // }
}

function categorySubmit() {
  var name = document.getElementById('category_name').value;
  var message = document.getElementById('message');
  message.style.color = 'green';
  message.innerText = 'Waiting for response';
  var url = 'http://linkedin.thefastech.com/addCategory';
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    name: name
  }));

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (xhr.responseText != '400') {
        message.innerText = 'Saved Successfully';
        setTimeout(function () {
          document.location.href = "admin.html";
        }, 2000);
      } else {
        message.style.color = 'red';
        message.innerText = 'Category Already Exists';
      }
    }
  };
}

function addCategory() {
  document.location.href = "add_category.html";
}

function viewCategories() {
  document.getElementById('message').style.display = 'block';
  var url = 'http://linkedin.thefastech.com/getAllCategories';
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
  var all = '';

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      arr = xhr.responseText;
      arr = JSON.parse(arr); // document.getElementById('users_listing').innerText = 'asd';

      var finalArray = arr.map(function (obj, key) {
        row = "<div class=\"mt-2 single_page\" id=\"" + obj.id + "\" style=\"padding-bottom:2%; cursor:pointer\"><p class=\"single_profile pl-2\" style=\"margin-bottom:0\"><strong>  - " + obj.name + "</strong> </p></div>";
        all += row;
      });
    }
  };

  setTimeout(function () {
    // document.location.href = "users.html";
    document.getElementById('message').style.display = 'none';
    document.getElementById('users').innerHTML = all;
    document.getElementById('options').style.display = 'none';
    document.getElementById('users').style.display = 'block';
  }, 3000);
}

function usersListing() {
  document.getElementById('message').style.display = 'block';
  var url = 'http://linkedin.thefastech.com/getAllUsers';
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
  var all = '';

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      arr = xhr.responseText;
      arr = JSON.parse(arr); // document.getElementById('users_listing').innerText = 'asd';

      var finalArray = arr.map(function (obj, key) {
        row = "<div class=\"mt-2 single_page\" id=\"" + obj.id + "\" style=\"padding-bottom:2%; cursor:pointer\"><p class=\"single_profile pl-2\" style=\"margin-bottom:0\"><strong>  - " + obj.username + "</strong> (" + obj.count + " lead/s)</p></div>";
        all += row;
      }); // console.log(document.location.href);
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
    document.getElementById('message').style.display = 'none';
    document.getElementById('users').innerHTML = all;
    document.getElementById('options').style.display = 'none';
    document.getElementById('users').style.display = 'block';
  }, 3000);
}

function adminHome() {
  var url = 'http://linkedin.thefastech.com/totalUsers';
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
  var all = 4;

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      arr = xhr.responseText;
      arr = JSON.parse(arr);
      var finalArray = arr.map(function (obj, key) {
        row = "<div class=\"mt-2 single_page\" id=\"" + obj.id + "\" style=\"padding-bottom:2%; cursor:pointer\"><p class=\"single_profile pl-2\" style=\"margin-bottom:0\"><strong>  - " + obj.username + "</strong> (" + obj.count + " lead/s)</p></div>";
        all += row;
      });
    }
  };

  document.location.href = "admin.html";
  setTimeout(function () {
    document.getElementById('totalUsers').innerText = all;
  }, 1000);
}

function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("username");
  localStorage.removeItem("second_user_id");
  document.location.href = "login.html";
}

function registerSubmit() {
  var username = document.getElementById('username_register').value;
  var password = document.getElementById('password_register').value;
  var confirm_password = document.getElementById('confirm_password_register').value;
  var message = document.getElementById('message');
  var re = /\S+@\S+\.\S+/; // return re.test(email);

  if (!re.test(username)) {
    message.innerText = 'Email Format incorrect';
  } else if (password.length < 6) {
    message.innerText = 'Password must be greater than 6 characters';
  } else if (password != confirm_password) {
    message.innerText = 'Password and Confirm Password must be same';
  } else {
    message.style.color = 'green';
    message.innerText = 'Waiting for response';
    var url = 'http://linkedin.thefastech.com/registration';
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      username: username,
      password: password
    }));

    xhr.onreadystatechange = function () {
      //Call a function when the state changes.
      if (xhr.readyState == 4 && xhr.status == 200) {
        if (xhr.responseText != '400') {
          message.innerText = 'Registration Successful';
          setTimeout(function () {
            document.location.href = "login.html";
          }, 2000);
        } else {
          message.style.color = 'red';
          message.innerText = 'User Already Exists';
        }
      }
    };
  }
}

function getRegisterPage() {
  document.location.href = "register.html";
}

function loginSubmit() {
  var username = document.getElementById('username_login').value;
  var password = document.getElementById('password_login').value;
  var message = document.getElementById('message');
  var re = /\S+@\S+\.\S+/; // return re.test(email);

  if (!re.test(username)) {
    message.innerText = 'Email format incorrect';
  } else if (password.length < 6) {
    message.innerText = 'Password must be greater than 6 characters';
  } else {
    message.style.color = 'green';
    message.innerText = 'Waiting for response';
    var url = 'http://linkedin.thefastech.com/login';
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      username: username,
      password: password
    }));

    xhr.onreadystatechange = function () {
      //Call a function when the state changes.
      if (xhr.readyState == 4 && xhr.status == 200) {
        if (xhr.responseText != '400') {
          message.innerText = 'Login Successful';
          user = JSON.parse(xhr.responseText);
          localStorage.setItem("access_token", user.access_token);
          localStorage.setItem("user_id", user.id);
          localStorage.setItem("username", user.username);

          if (user.username == 'admin1') {
            setTimeout(function () {
              document.location.href = "/admin.html";
            }, 2000);
          } else {
            setTimeout(function () {
              document.location.href = "popup.html";
            }, 2000);
          }
        } else {
          message.style.color = 'red';
          message.innerText = 'Login Credentials are not Correct';
        }
      }
    };
  }
}

function getLoginPage() {
  document.location.href = "login.html";
}

function getAll() {
  profile_check = 500;
  var user_id = localStorage.getItem("user_id");
  var url = 'http://linkedin.thefastech.com/getAll/' + user_id;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      arr = xhr.responseText;
      arr = JSON.parse(arr); // alert(arr);

      document.getElementById('getAll').innerHTML = '';
      document.getElementById('list_table_view').style.display = 'block';
      var finalArray = arr.map(function (obj, key) {
        row = "<div class=\"row m-0 tabs_two_main single_profile\" id=\"" + obj.id + "\">\n\t\t\t\t  <div class=\"col-2 tabs_cols_two_main_1\">\n\t\t\t\t\t  <span class=\"left data_name\">" + obj.name + "</span>\n\t\t\t\t  </div>\n\t\t\t\t  <div class=\"col-2 tabs_cols_two_main_1\"\n\t\t\t\t           >\n\t\t\t\t\t  <img src=\"" + obj.image + "\" class=\"tabs_two_imgs\">\n\t\t\t\t\t\t\t\t\t  </span>\n\t\t\t\t\t  <span class=\"right\"><i class=\"far fa-comment-alt comment_icon\"></i></span>\n\t\t\t\t  </div>\n\t\t\t\t  <div class=\"col-2 tabs_cols_two_main_1\"\n\t\t\t\t           >\n\t\t\t\t\t  <span class=\"left\">" + obj.weekly_source + "</span>\n\t\t\t\t\t  <span class=\"right\"><i class=\"far fa-calendar-alt calender_icon_last_tab_3\"></i></span>\n\t\t\t\t  </div>\n\t\t\t\t  <div class=\"col-2 tabs_cols_two_main_1\"\n\t\t\t\t           >\n\t\t\t\t\t  <span class=\"badg-1\" style=\"float:left;\">" + obj.total_messages + "</span>\n\t\t\t\t\t  \n\t\t\t\t\t  <span><button type=\"button\" class=\"btn btn-primary add_icon\"><i class=\"fas fa-plus plus_icon\"></i></button></span>\n\t\t\t\t  </div>\n\t\t\t\t  <div class=\"col-2 tabs_cols_two_main_1\"\n\t\t\t\t           >\n\t\t\t\t\t  <span class=\"congrats_msg\">" + obj.status + "</span>\n\t\t\t\t  </div>\n\t\t\t\t  <div class=\"col-2 tabs_cols_two_main_1\"\n\t\t\t\t           >\n\t\t\t\t\t  <span class=\"Address_msg\">" + obj.address + "</span>\n\t\t\t\t  </div>\n\t\t\t  </div>";
        document.getElementById('getAll').innerHTML += row;
      }); // apiCategories('status_filter');

      apiWeekly('weekly_filter');
      document.getElementById('api_return').style.display = 'none';
      document.getElementById('results').style.display = 'none';
      document.getElementById('getAll').style.display = 'contents';
      document.getElementById('getAllButtons').style.display = 'block';
      var single_profile = document.getElementsByClassName('single_profile');

      for (var i = 0; i < single_profile.length; i++) {
        single_profile[i].addEventListener('click', getSinglePage, false);
      }
    }
  };
}

function getAllById(user_id) {
  var user_id = user_id;
  var url = 'http://linkedin.thefastech.com/getAll/' + user_id;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      arr = xhr.responseText;
      arr = JSON.parse(arr);
      document.getElementById('getAll').innerHTML = '';
      document.getElementById('list_table_view').style.display = 'block';
      var finalArray = arr.map(function (obj, key) {
        row = "<div class=\"row m-0 tabs_two_main single_profile\" id=\"" + obj.id + "\">\n\t\t\t\t  <div class=\"col-2 tabs_cols_two_main_1\">\n\t\t\t\t\t  <span class=\"left\">" + obj.name + "</span>\n\t\t\t\t  </div>\n\t\t\t\t  <div class=\"col-2 tabs_cols_two_main_1\">\n\t\t\t\t\t  <span class=\"left\">\n\t\t\t\t\t  <img src=\"" + obj.image + "\" class=\"tabs_two_imgs\">\n\t\t\t\t\t\t\t\t\t  </span>\n\t\t\t\t\t  <span class=\"right\"><i class=\"far fa-comment-alt comment_icon\"></i></span>\n\t\t\t\t  </div>\n\t\t\t\t  <div class=\"col-2 tabs_cols_two_main_1\">\n\t\t\t\t\t  <span class=\"left\">" + obj.weekly_source + "</span>\n\t\t\t\t\t  <span class=\"right\"><i class=\"far fa-calendar-alt calender_icon_last_tab_3\"></i></span>\n\t\t\t\t  </div>\n\t\t\t\t  <div class=\"col-2 tabs_cols_two_main_1\">\n\t\t\t\t\t  <span class=\"badg-1\" style=\"float:left;\">" + obj.total_messages + "</span>\n\t\t\t\t\t  \n\t\t\t\t\t  <span><button type=\"button\" class=\"btn btn-primary add_icon\"><i class=\"fas fa-plus plus_icon\"></i></button></span>\n\t\t\t\t  </div>\n\t\t\t\t  <div class=\"col-2 tabs_cols_two_main_1\">\n\t\t\t\t\t  <span class=\"congrats_msg\">" + obj.status + "</span>\n\t\t\t\t  </div>\n\t\t\t\t  <div class=\"col-2 tabs_cols_two_main_1\">\n\t\t\t\t\t  <span class=\"Address_msg\">" + obj.address + "</span>\n\t\t\t\t  </div>\n\t\t\t  \t\t</div>";
        document.getElementById('getAll').innerHTML += row;
      }); // console.log(row);
      // apiCategories('status_filter');

      apiWeekly('weekly_filter');
      document.getElementById('api_return').style.display = 'none';
      document.getElementById('results').style.display = 'none';
      document.getElementById('getAll').style.display = 'contents';
      document.getElementById('getAllButtons').style.display = 'block';
      var single_profile = document.getElementsByClassName('single_profile');

      for (var i = 0; i < single_profile.length; i++) {
        single_profile[i].addEventListener('click', getSinglePage, false);
      }
    }
  };
}

function getSinglePage(e) {
  profile_check = 100;

  if (document.getElementById('list_table_view')) {
    document.getElementById('list_table_view').style.display = 'none';
  }

  var user_id = this.getAttribute("id");
  var url = 'http://linkedin.thefastech.com/singlePage/' + user_id;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      res = xhr.responseText;

      if (res != '400') {
        var gotTab = function gotTab(tabs) {
          var msg = {
            txt: res.profile_link
          };
          chrome.tabs.sendMessage(tabs[0].id, msg);
        }; // console.log(res);


        res = JSON.parse(res);
        var params = {
          active: true,
          currentWindow: true
        };
        chrome.tabs.query(params, gotTab);
        document.getElementById('name').innerText = res.name;
        document.getElementById('fname').innerText = res.name;
        document.getElementById('description').innerText = res.description;
        document.getElementById('address').innerText = res.address;
        document.getElementById('company').innerText = res.company;
        document.getElementById('about').innerText = res.about;
        var image = document.getElementById('image');
        image.src = res.image;
        document.getElementById('notes').value = res.notes;

        if (document.getElementById(res.status)) {
          document.getElementById(res.status).selected = true;
          var status_tag = document.getElementById('status');
          status_tag = status_tag[status_tag.selectedIndex].style.color;
          document.getElementById('statusbg').style.backgroundColor = status_tag;
        }

        if (res.endorsement == 'Yes') {
          document.getElementById('endorsement_yes').checked = true;
        } else {
          document.getElementById('endorsement_no').checked = true;
        }

        if (res.priority == 'A') {
          document.getElementById('priority_a').checked = true;
        } else if (res.priority == 'B') {
          document.getElementById('priority_b').checked = true;
        } else if (res.priority == 'C') {
          document.getElementById('priority_c').checked = true;
        } else if (res.priority == 'D') {
          document.getElementById('priority_d').checked = true;
        }

        var today = new Date(res.weekly_date);
        var today = today.toISOString().substring(0, 10);
        document.getElementById('week').value = today; // document.getElementById('week').max =  today;

        var weekly_source = today;
        var options = {
          month: 'short'
        };
        var options_year = {
          year: '2-digit'
        };
        var today = new Date(weekly_source); //init date

        var date = new Date(weekly_source); // document.getElementById("week_number").innerHTML =(getWeekOfMonth(date));

        document.getElementById('weekly_source').innerText = today.toLocaleDateString("en-US", options) + ' Week ' + getWeekOfMonth(date) + ' -' + today.toLocaleDateString("en-US", options_year);
        document.getElementById('discovery_call').value = res.discovery_call;
        document.getElementById('total_messages').value = res.total_messages;
        document.getElementById('follow_up').value = res.follow_up;
        document.getElementById('conversion').value = res.conversion;
        document.getElementById('profile_link').innerText = res.profile_link;
        document.getElementById('api_return').style.display = 'none';
        document.getElementById('getAll').style.display = 'none';
        document.getElementById('getAllButtons').style.display = 'none';
        document.getElementById('results').style.display = 'block';
      }
    }
  };
}

var date = new Date();
var monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
document.getElementById("week_number").innerHTML = monthNames[date.getMonth()] + '-' + 'Week ' + getWeekOfMonth(date) + ' <i class="far fa-calendar-alt clender_icons"></i>'; //get week number of date hgvh
// function getWeekOfMonth(date) {
// 	let adjustedDate = date.getDate() + date.getDay();
// 	let prefixes = ['0', '1', '2', '3', '4', '5'];
// 	return (parseInt(prefixes[0 | adjustedDate / 7]) + 1);
// }

function getProfile() {
  document.getElementById('api_return').style.display = 'none';
  document.getElementById('getAll').style.display = 'none';
  document.getElementById('getAllButtons').style.display = 'none';
  document.getElementById('list_table_view').style.display = 'none';
  document.getElementById('results').style.display = 'block';
}

function addLoader() {
  document.getElementById('results').style.display = 'none';
  document.getElementById('loader').style.display = 'block';
}

function removeLoader() {
  document.getElementById('results').style.display = 'block';
  document.getElementById('loader').style.display = 'none';
}

function getRequest() {
  if (document.getElementById('list_table_view')) {
    document.getElementById('list_table_view').style.display = 'none';
  } // let bgpage = chrome.extension.getBackgroundPage();


  var id = 0; // let title = bgpage.word.title;

  var name = document.getElementById('name').innerText;
  var description = document.getElementById('description').innerText;
  var address = document.getElementById('address').innerText;
  var company = document.getElementById('company').innerText;
  var about = document.getElementById('about').innerText;
  var profile_link = document.getElementById('profile_link').innerText;
  var img = document.getElementById('image').src; //   document.getElementById('name').innerText = res.name;
  // 	document.getElementById('fname').innerText = res.name;
  // document.getElementById('description').innerText = res.description;
  // document.getElementById('address').innerText = res.address;
  // document.getElementById('company').innerText = res.company;
  // document.getElementById('about').innerText = res.about;
  // let image = document.getElementById('image');
  // image.src = res.image;
  // var user_id = localStorage.getItem("secondary_user_id");
  // if(!user_id){

  var user_id = localStorage.getItem("user_id"); // }

  var notes = document.getElementById('notes') ? document.getElementById('notes').value : '';
  var follow_up = document.getElementById('follow_up').value;
  var status = document.getElementById('status').value;
  var discovery_call = document.getElementById('discovery_call').value;
  var conversion = document.getElementById('conversion').value;
  var total_messages = document.getElementById('total_messages').value;
  var endorsement = null;

  if (document.querySelector('input[name="endorsement"]:checked')) {
    endorsement = document.querySelector('input[name="endorsement"]:checked').value;
  }

  var priority = null;

  if (document.querySelector('input[name="priority"]:checked')) {
    priority = document.querySelector('input[name="priority"]:checked').value;
  }

  var weekly_source = document.getElementById('weekly_source').innerText;
  var weekly_date = document.getElementById('week').value;
  var url = 'http://linkedin.thefastech.com/api-test';
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    id: id,
    name: name,
    description: description,
    address: address,
    company: company,
    about: about,
    img: img,
    user_id: user_id,
    notes: notes,
    follow_up: follow_up,
    status: status,
    discovery_call: discovery_call,
    conversion: conversion,
    total_messages: total_messages,
    endorsement: endorsement,
    priority: priority,
    profile_link: profile_link,
    weekly_source: weekly_source,
    weekly_date: weekly_date
  }));

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.responseText);

      if (xhr.responseText == '200') {
        document.getElementById('results').style.display = 'none';
        document.getElementById('getAll').style.display = 'none';
        document.getElementById('getAllButtons').style.display = 'none';
        document.getElementById('message').style.color = '#020c46';
        document.getElementById('message').innerText = 'Saved Successfully!';
        document.getElementById('api_return').style.display = 'block';
      }
    }
  };
}

function apiCall(url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  // const url='http://linkedin.thefastech.com/getAll';
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
  var response = null;

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (xhr.responseText != '400') {
        res = JSON.parse(xhr.responseText);

        if (res.username == 'admin1') {
          document.getElementById('admin_buttons').style.display = 'block';
          document.getElementById('not_logged_in_buttons').style.display = 'none';
          document.getElementById('logged_in_buttons').style.display = 'none';
          document.getElementById('username').innerText = 'Welcome, ' + res.username;
        } else {
          if (document.getElementById('not_logged_in_buttons')) {
            document.getElementById('not_logged_in_buttons').style.display = 'none';
          }

          if (document.getElementById('logged_in_buttons')) {
            document.getElementById('logged_in_buttons').style.display = 'block';
          }

          if (document.getElementById('username')) {
            document.getElementById('username').innerText = 'Welcome, ' + res.username;
          }
        }
      } else {
        document.getElementById('not_logged_in_buttons').style.display = 'block';
      }
    }
  };
}

function alreadyStored() {
  var bgpage = chrome.extension.getBackgroundPage();
  var id = bgpage.word.id;
  var user_id = localStorage.getItem("user_id");
  var url = 'http://linkedin.thefastech.com/alreadyStored';
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    id: id,
    user_id: user_id
  }));

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      res = JSON.parse(xhr.responseText);

      if (xhr.responseText != '200') {
        document.getElementById('alreadyStored').innerText = 'Already Stored';
        return xhr.responseText;
      } else {
        return null;
      }
    }
  };
}

function apiCategories(tag) {
  var url = 'http://linkedin.thefastech.com/getAllCategories';
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
  var all = '<option value="">Select</option>';

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      arr = xhr.responseText;
      arr = JSON.parse(arr);
      var finalArray = arr.map(function (obj, key) {
        row = "<option>" + obj.name + "</option>";
        all += row;
      });
      document.getElementById(tag).innerHTML = all;
    }
  };
}

function apiWeekly(tag) {
  var user_id = localStorage.getItem("user_id");
  var url = 'http://linkedin.thefastech.com/getFilterWeeks/' + user_id;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
  var all = '<option value="">Select</option>';

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      arr = xhr.responseText;
      arr = JSON.parse(arr);
      var finalArray = arr.map(function (obj, key) {
        row = "<option>" + obj.weekly_source + "</option>";
        all += row;
      });
      document.getElementById(tag).innerHTML = all;
    }
  };
}

function filtersChange(user_id, category_id, weekly_source, priority, follow_up, discovery, view_type, search_box) {
  var url = 'http://linkedin.thefastech.com/filters/?status=' + category_id + '&user_id=' + user_id + '&weekly=' + weekly_source + '&priority=' + priority + '&follow_up=' + follow_up + '&discovery=' + discovery + '&search_box=' + search_box + '&view_type=' + view_type;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
  var all = '<option value="">Select</option>';

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      arr = xhr.responseText;
      arr = JSON.parse(arr);
      var count_arr = arr.length;
      document.getElementById('getAll').innerHTML = '';
      document.getElementById('getAllCanban').innerHTML = '';

      if (arr == '') {
        document.getElementById('get_all_message').style.display = 'block';
      } else {
        document.getElementById('get_all_message').style.display = 'none';

        if (!view_type) {
          var finalArray = arr.map(function (obj, key) {
            row = "<div class=\"row m-0 tabs_two_main single_page\" id=\"" + obj.id + "\">\n\t\t\t\t  <div class=\"col-2 tabs_cols_two_main_1\">\n\t\t\t\t\t  <span class=\"left\">" + obj.name + "sss</span>\n\t\t\t\t  </div>\n\t\t\t\t  <div class=\"col-2 tabs_cols_two_main_1 this-class\">\n\t\t\t\t\t  <span class=\"left\">\n\t\t\t\t\t  <img src=\"" + obj.image + "\" class=\"tabs_two_imgs\">\n\t\t\t\t\t\t\t\t\t  </span>\n\t\t\t\t\t  <span class=\"right\"><i class=\"far fa-comment-alt comment_icon\"></i></span>\n\t\t\t\t  </div>\n\t\t\t\t  <div class=\"col-2 tabs_cols_two_main_1\">\n\n\n\t\t\t\t\t  <span class=\"left\">" + obj.weekly_source + "</span>\n\t\t\t\t\t  <span class=\"right\"><i class=\"far fa-calendar-alt calender_icon_last_tab_3\"></i></span>\n\n\t\t\t\t  </div>\n\t\t\t\t  <div class=\"col-2 tabs_cols_two_main_1\">\n\t\t\t\t\t  <span class=\"badg-1\" style=\"float:left;\">" + obj.total_messages + "</span>\n\t\t\t\t\t  \n\t\t\t\t\t  <span><button type=\"button\" class=\"btn btn-primary add_icon\"><i class=\"fas fa-plus plus_icon\"></i></button></span>\n\t\t\t\t  </div>\n\t\t\t\t  <div class=\"col-2 tabs_cols_two_main_1\">\n\t\t\t\t\t  <span class=\"congrats_msg\">" + obj.status + "</span>\n\t\t\t\t  </div>\n\t\t\t\t  <div class=\"col-2 tabs_cols_two_main_1\">\n\t\t\t\t\t  <span class=\"Address_msg\">" + obj.address + "</span>\n\t\t\t\t  </div>\n\t\t\t  </div>";
            document.getElementById('getAll').innerHTML += row;
            document.getElementById('pills-profile').style.display = 'block';
            document.getElementById('getAllCanban').style.display = 'none';
          });
        } else {
          count_arr = count_arr * 100;
          arr = Object.keys(arr).map(function (key) {
            return [arr[key]];
          }); // document.getElementById('getAllCanban').style.width = count_arr +'%'; 
          // alert(count_arr * 50);

          var finalArray = arr.map(function (obj, key) {
            var finalArray1 = obj.map(function (obj1, key1) {
              var row = null;

              if (key != 0) {
                var margin = "<div class=\"slide-1 \" style=\"width:230px !important\">";
              } else {
                var margin = "<div class=\"slide-1\"style=\"width:230px !important\">";
              }

              row = margin + "<div class=\"row m-0\">\n\t                                                <div class=\"col-12 p-1\">\n\t                                                    <div class=\"item owl_items\">\n\t                                                        <div class=\"itms_btns my-2 bg-white\">\n\t                                                            " + obj1[0].status + "\n\t                                                        </div>";
              var finalArray2 = obj1.map(function (obj2, key2) {
                row += "<div class=\"card banner_card_slider single_page text-center pt-1\" id=" + obj2.id + ">\n\t                                            <div class=\"card-img\">\n\t                                                <img class=\"item_imgs\" src=\"" + obj2.image + "\" alt=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"new-list-icon\"><i class=\"far fa-comment-alt\"></i></span>\n\t                                            </div>\n\n\t                                            <div class=\"card_body\">\n\t                                                <h6 class=\"c_name\">\n\t                                                    " + obj2.name + "\n\t                                                </h6>\n\t                                                <p class=\"c_paragraph\">\n\t                                                    " + obj2.company + "\n\t                                                </p>\n\t                                                <h6 class=\"ceo_name\">\n\t                                                    " + obj2.description + "\n\t                                                </h6>\n\t                                                <h6 class=\"Location_name\">\n\t                                                    Location\n\t                                                </h6>\n\t                                                <p class=\"location_paragraph\">\n\t                                                    " + obj2.address + "\n\t                                                </p>\n\t                                                <h6 class=\"Location_name\">\n\t                                                    Status\n\t                                                </h6>\n\t                                                <p class=\"c_paragraph\">\n\t                                                    " + obj2.status + "\n\t                                                </p>\n\t                                                <h6 class=\"Location_name\">\n\t                                                    Notes\n\t                                                </h6>\n\t                                                <p class=\"c_paragraph_box\">\n\t                                                    " + obj2.notes + "\n\t                                                </p>\n\t                                                <h6 class=\"Location_name\">\n\t                                                    About Me\n\t                                                </h6>\n\t                                                <p class=\"c_paragraph\">\n\t                                                    " + obj2.about + "\n\t                                                </p>\n\t                                                <h6 class=\"Location_name\">\n\t                                                    Profile URL\n\t                                                </h6>\n\t                                                <p class=\"c_paragraph_url\">\n\t                                                    " + obj2.profile_link + "\n\t                                                </p>\n\t                                                <h6 class=\"Location_name\">\n\t                                                    Total Message Sent\n\t                                                </h6>\n\t                                                <p class=\"c_paragraph\">\n\t                                                    <span class=\"badg-1\">" + obj2.total_messages + "</span>\n\t                                                </p>\n\t                                                <h6 class=\"Location_name\">\n\t                                                    Conversation Messages\n\t                                                </h6>\n\t                                                <p class=\"c_paragraph\">\n\t                                                    " + obj2.conversion + "\n\t                                                </p>\n\t                                                <h6 class=\"Location_name\">\n\t                                                    Follow up Date\n\t                                                </h6>\n\t                                                <p class=\"c_paragraph_date_calender\">\n\n\t                                                    <span class=\"c-date\">" + obj2.follow_up + "</span>\n\t                                                    <span class=\"c-calender\"><i class=\"far fa-calendar-alt down_arrow\"></i></span>\n\t                                                </p>\n\t                                                <h6 class=\"Location_name\">\n\t                                                    Discovery Call\n\t                                                </h6>\n\t                                                <p class=\"c_paragraph_date_calender\">\n\t                                                    <span class=\"c-date\">" + obj2.discovery_call + "</span>\n\t                                                    <span class=\"c-calender\"><i class=\"far fa-calendar-alt down_arrow\"></i></span>\n\t                                                </p>\n\t                                               \n\n\t                                                <button class=\"btn btn-primary w-100 last_c_btn\">MAKE CHANGES</button>\n\n\t                                            </div>\n\n\t                                        </div>";
              });
              row += "</div>\n                                            </div>\n\n                                               \n                                            </div>\n                                        </div>";
              document.getElementById('getAllCanban').innerHTML += row;
            });
          });
          document.getElementById('getAllCanban').style.display = 'flex';
          document.getElementById('pills-profile').style.display = 'none';
        } // apiCategories('status_filter');


        document.getElementById('api_return').style.display = 'none';
        document.getElementById('results').style.display = 'none'; // document.getElementById('getAll').style.display = 'block';

        document.getElementById('getAllButtons').style.display = 'block';
        var divs = document.getElementsByClassName('single_page');

        for (i = 0; i < divs.length; ++i) {
          var p_id = divs[i].id;
          document.getElementById(p_id).addEventListener('click', getSinglePage);
        }

        ;
      }
    }
  };
}

function eventSave() {
  var notes = document.getElementById('notes') ? document.getElementById('notes').value : '';
  var follow_up = document.getElementById('follow_up').value;
  var status = document.getElementById('status').value;
  var discovery_call = document.getElementById('discovery_call').value;
  var conversion = document.getElementById('conversion').value;
  var total_messages = document.getElementById('total_messages').value;
  var about = document.getElementById('about').value;
  var endorsement = null;

  if (document.querySelector('input[name="endorsement"]:checked')) {
    endorsement = document.querySelector('input[name="endorsement"]:checked').value;
  }

  var priority = null;

  if (document.querySelector('input[name="priority"]:checked')) {
    priority = document.querySelector('input[name="priority"]:checked').value;
  }

  var weekly_source = document.getElementById('weekly_source').innerText;
  var weekly_date = document.getElementById('week').value;
  var user_id = localStorage.getItem("user_id");
  var profile_link = document.getElementById('profile_link').innerText;
  var url = 'http://linkedin.thefastech.com/event-save';
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    user_id: user_id,
    about: about,
    notes: notes,
    follow_up: follow_up,
    status: status,
    discovery_call: discovery_call,
    conversion: conversion,
    total_messages: total_messages,
    endorsement: endorsement,
    priority: priority,
    profile_link: profile_link,
    weekly_source: weekly_source,
    weekly_date: weekly_date
  }));

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.responseText); // alert(xhr.responseText);

      if (xhr.responseText == '200') {
        console.log('changes Saved');
      } else {
        console.log('Error');
      }
    }
  };
} // ........modal code..........................................


!function (d) {
  var itemClassName = "carousel__photo";
  items = d.getElementsByClassName(itemClassName), totalItems = items.length, slide = 0, moving = true;

  function setInitialClasses() {
    items[totalItems - 1].classList.add("prev");
    items[0].classList.add("active");
    items[1].classList.add("next");
  }

  function setEventListeners() {
    var next = d.getElementsByClassName('carousel__button--next')[0],
        prev = d.getElementsByClassName('carousel__button--prev')[0];
    next.addEventListener('click', moveNext);
    prev.addEventListener('click', movePrev);
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
}(document); //  first modal code......................................................

var modal = document.querySelector('#my-modal');
var modalBtn = document.querySelector('#modal-btn');
var closeBtn = document.querySelector('.off');
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
} // second modal code...............................................


var popup = document.querySelector('#my-new-modal-2');
var pBtn = document.querySelector('#modal-new-btn-2');
var closeBtn2 = document.querySelector('.close');
pBtn.addEventListener('click', openModal2);
closeBtn2.addEventListener('click', closeModal2);
window.addEventListener('click', outsideClick2);

function openModal2() {
  popup.style.display = 'block';
}

function closeModal2() {
  popup.style.display = 'none';
}

function outsideClick2(e) {
  if (e.target == popup) {
    popup.style.display = 'none';
  }
}