const globalURl = "https://linkedin.thefastech.com";
lists = []

var i = setInterval(() => {
  $('.slider-canban').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    dots: false,
    focusOnSelect: false
  })
  let userBoxHeight = $(".user-box").height();
  $(".item-slider-inner").height(userBoxHeight + userBoxHeight / 2);
  // document.querySelectorAll(".head_row").style.display = "none"
  views = "canban"
  localStorage.setItem("views", views)
  document.getElementById("adding_lists").innerHTML = `<tr><div class="loader"></div></tr>`
  console.log("Working")
  localStorage.setItem("user_id", 11);
  user_id = localStorage.getItem("user_id")
  second_user_id = localStorage.getItem("user_id")

  console.log(user_id, "user_id")
  setTimeout(() => {
    const url = `${globalURl}/getmembers/${user_id}`;

    let xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let userData = JSON.parse(xhr.responseText);
        document.getElementById("searchTopSelect-2").innerHTML = `<option value="">Select List</option>`
        userData.users.map((item, i, arr) => {
          document.getElementById("searchTopSelect-2").innerHTML += `<option value="${item.linked_to_id}" >${item.username}</option>`
        })
        $("#searchTopSelect-2").select2().on('change', () => {
          let data = $("#searchTopSelect-2 option:selected").text();
          getvalue(data)
      })
      }
    }

  }, 2000)



  filter()
  // const url = `${globalURl}/getAll/${user_id}/${second_user_id}`;
  // var xhr = new XMLHttpRequest();
  // xhr.open("GET", url, true);
  // xhr.setRequestHeader("Content-Type", "application/json");
  // xhr.send();

  // xhr.onreadystatechange = function () {
  //   //Call a function when the state changes.
  //   if (xhr.readyState == 4 && xhr.status == 200) {
  //     arr = xhr.responseText;
  //     arr = JSON.parse(arr);
  //     let row = ""
  //     // alert(arr);
  //     let color = ""
  //     if(arr.length > 0){
  //     arr.map((obj) => {
  //     if(obj.status == "LinkedIn Campaign"){
  //       color = "#0e76a8"
  //     }
  //     if(obj.status == "Talking/Replied"){
  //       color = "#0e76a8"
  //     }
  //     if(obj.status == "Serious Conversations"){
  //       color = "#FFA500"
  //     }
  //     if(obj.status == "Discovery Call Scheduled"){
  //       color = "#FF0000"
  //     }
  //     if(obj.status == "Discovery Call Completed"){
  //       color = "#FFCB05"
  //     }
  //     if(obj.status == "Boom"){
  //       color = "rgb(133, 187, 101)"
  //     }
  //     if(obj.status == "Lost"){
  //       color = "rgb(128, 128, 128)"
  //     }
  //     document.querySelector(".count").innerHTML = arr.length


  //     row += `<tr><td>
  //     <img src="${obj.image}" alt="user-image">
  //     <span class="name">${obj.name}</span>
  //     </td>
  //     <td>${obj.description ? `${obj.description.length > 22 ? `${obj.description.slice(0,22)}...`: `${obj.description}`}` : `No Title`} </td>
  //     <td>${obj.company ? `${obj.company.length > 22 ? `${obj.company.slice(0,22)}...`: `${obj.company}`}` : `No Company`} </td>
  //     <td>${obj.address ? `${obj.address.length > 22 ? `${obj.address.slice(0,22)}...`: `${obj.address}`}` : `No address`} </td>
  //     <td class="badge-own compain" ><span style="background-color:${color} !important">${obj.status}</span></td>
  //     <td><a href="Single-details-page.html" class="view-btn">View Details</a>
  //     </td>
  //     <td><span class="reply-count">${obj.count}</span></tr></td>`
  //     });
  //     document.getElementById("adding_lists").innerHTML = ``;
  //     document.getElementById("adding_lists").innerHTML = row
  //   }
  //   else{
  //     document.getElementById("adding_lists").innerHTML = `No prospects Added`
  //     document.querySelector(".count").innerHTML = arr.length

  //   }
  //   }
  // }



  clearInterval(i)
}, 50)

const setWidthSlider = () => {
  setInterval(() => {
    // alert('ok')
    $('.slider-canban').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: false,
      dots: false,
      focusOnSelect: false
    })
    let userBoxHeight = $(".user-box").height();
    $(".item-slider-inner").height(userBoxHeight + userBoxHeight / 2);

  }, 200);
}




if (document.getElementById("pills-home-tab")) {
  document.getElementById("pills-home-tab").addEventListener("click", () => {
    views = "canban"
    localStorage.setItem("views", views)
    filter();
  });
}

function filter() {
  check = localStorage.getItem("views")
  if (check != "list") {
    document.getElementById("linkdin_campaign").innerHTML = `<div class="heading">LinkedIn Campaign <span></span></div>
  <div class="item-slider-inner">
      <div class="user-box" id="for_linkdin_campaign">
          <div class="loader_canban"></div>
      </div>
  </div>`
    document.getElementById("talking").innerHTML = `<div class="heading">Talking/Replied <span></span></div>
  <div class="item-slider-inner">
      <div class="user-box" id="for_talking">
          <div class="loader_canban"></div>
      </div>
  </div>`
    document.getElementById("serious").innerHTML = `<div class="heading">Serious Conversations <span></span></div>
  <div class="item-slider-inner" >
      <div class="user-box" id="for_serious">
          <div class="loader_canban"></div>
      </div>
      
  </div>`
    document.getElementById("scheduled").innerHTML = `<div class="heading">Discovery-Call Scheduled <span></span></div>
  <div class="item-slider-inner" >
      <div class="user-box" id="for_scheduled">
          <div class="loader_canban"></div>
      </div>
      
  </div>`
    document.getElementById("completed").innerHTML = `<div class="heading">Call Completed <span></span></div>
  <div class="item-slider-inner">
      <div class="user-box" id="for_completed">
          <div class="loader_canban"></div>
      </div>
  </div>`
    document.getElementById("boom").innerHTML = `<div class="heading" style="background-color: rgb(133, 187, 101) !important;">Boom <span></span></div>
  <div class="item-slider-inner">
      <div class="user-box" id="for_boom">
          <div class="loader_canban"></div>
      </div>
  </div>`
    document.getElementById("lost").innerHTML = `<div class="heading" style="background-color: rgb(128, 128, 128) !important;">Lost <span></span></div>
  <div class="item-slider-inner">
      <div class="user-box" id="for_lost">
          <div class="loader_canban"></div>
      </div>
  </div>`
    let arr = [];
    let counting = 0;
    let counter = 0;
    var element = document.querySelectorAll(".where");
    document.querySelectorAll(".where").forEach((ele, i) => {


      // alert(i);
      if (i % 4 === 0) {
        let obj = {
          field0: element[counter].value,
          field1: element[counter + 1].value,
          field2: element[counter + 2].value,
          field3: element[counter + 3].value,
        };
        arr.push(obj);

        counter = counter + 4;

        // let convertDate = formatDate(obj.field0)
      }
    });

    document.getElementById("the_canban").style.display = "block";
    let view = localStorage.getItem("views")
    let lists = [];
    weekArray = [];
    var search = document.getElementById("search").value
    // let arr = [{ field0: 'and', field1: 'status', field2: '=',field3:'' },
    // { field0: 'and', field1: 'status', field2: '=',field3:'' }]

    url = `${globalURl}/filters`;

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
      })
    );
    xhr.onreadystatechange = function () {
      //Call a function when the state changes.
      if (xhr.readyState == 4 && xhr.status == 200) {
        arr = JSON.parse(xhr.responseText);
        arr = Object.keys(arr).map((key) => [arr[key]]);


        arr.map(function (obj, key) {
          var finalArray1 = obj.map(function (obj1, key1) {
            if (obj1.length > 0) {
              if (obj1[0].status == "LinkedIn Campaign") {
                let row = `<div class="heading">LinkedIn Campaign <span>(${obj1.length})</span></div><div class="item-slider-inner">`
                var finalArray2 = obj1.map(function (obj2, key2) {
                  counting = counting + 1
                  row += `
                    <div class="user-box">
                        <div class="img-box">
                            <img src="${obj2.image}" alt="user-img">
                        </div>
                        <div class="name-box">
                            <div class="name">${obj2.name.length > 18 ? `${obj2.name.slice(0,18)}...`: `${obj2.name}`}</div>
                            <div class="desig">${obj2.description ? `${obj2.description.length > 20 ? `${obj2.description.slice(0,20)}...`: `${obj2.description}`}` : `No Title`} </div>
                        </div>
                        <div class="company">
                            <span class="co">Company:</span>
                            <div class="co-con">${obj2.company ? `${obj2.company.length > 28 ? `${obj2.company.slice(0,28)}...`: `${obj2.company}`}` : `No Company`} </div>
                        </div>
                        <div class="location">
                            <span class="lo">Location:</span>
                            <div class="lo-content">${obj2.address ? `${obj2.address.length > 28 ? `${obj2.address.slice(0,28)}...`: `${obj2.address}`}` : `No Address`} </div>
                        </div>
                        <div class="view-btn">
                            <a href="Single-details-page.html" class="view-btn">View Details</a>
                        </div>
                    </div>`
                })
                document.getElementById("linkdin_campaign").innerHTML = ``;
                document.getElementById("linkdin_campaign").innerHTML = row
                document.getElementById("linkdin_campaign").innerHTML += `</div>`


              }
              if (obj1[0].status == "Talking/Replied") {
                let row = `<div class="heading">Talking/Replied <span>(${obj1.length})</span></div>
                  <div class="item-slider-inner">`
                var finalArray2 = obj1.map(function (obj2, key2) {
                  counting = counting + 1

                  row += `
                    <div class="user-box">
                        <div class="img-box">
                            <img src="${obj2.image}" alt="user-img">
                        </div>
                        <div class="name-box">
                            <div class="name">${obj2.name.length > 18 ? `${obj2.name.slice(0,18)}...`: `${obj2.name}`}</div>
                            <div class="desig">${obj2.description ? `${obj2.description.length > 20 ? `${obj2.description.slice(0,20)}...`: `${obj2.description}`}` : `No Title`} </div>
                        </div>
                        <div class="company">
                            <span class="co">Company:</span>
                            <div class="co-con">${obj2.company ? `${obj2.company.length > 28 ? `${obj2.company.slice(0,28)}...`: `${obj2.company}`}` : `No Company`} </div>
                        </div>
                        <div class="location">
                            <span class="lo">Location:</span>
                            <div class="lo-content">${obj2.address ? `${obj2.address.length > 28 ? `${obj2.address.slice(0,28)}...`: `${obj2.address}`}` : `No Address`} </div>
                        </div>
                        <div class="view-btn">
                            <a href="Single-details-page.html" class="view-btn">View Details</a>
                        </div>
                    </div>`
                })
                document.getElementById("talking").innerHTML = ``;
                document.getElementById("talking").innerHTML = row
                document.getElementById("talking").innerHTML += `</div>`
              }
              if (obj1[0].status == "Serious Conversations") {
                let row = `<div class="heading">Serious Conversations <span>(${obj1.length})</span></div><div class="item-slider-inner">`
                var finalArray2 = obj1.map(function (obj2, key2) {
                  counting = counting + 1

                  row += `
                    <div class="user-box">
                        <div class="img-box">
                            <img src="${obj2.image}" alt="user-img">
                        </div>
                        <div class="name-box">
                            <div class="name">${obj2.name.length > 18 ? `${obj2.name.slice(0,18)}...`: `${obj2.name}`}</div>
                            <div class="desig">${obj2.description ? `${obj2.description.length > 20 ? `${obj2.description.slice(0,20)}...`: `${obj2.description}`}` : `No Title`} </div>
                        </div>
                        <div class="company">
                            <span class="co">Company:</span>
                            <div class="co-con">${obj2.company ? `${obj2.company.length > 28 ? `${obj2.company.slice(0,28)}...`: `${obj2.company}`}` : `No Company`} </div>
                        </div>
                        <div class="location">
                            <span class="lo">Location:</span>
                            <div class="lo-content">${obj2.address ? `${obj2.address.length > 28 ? `${obj2.address.slice(0,28)}...`: `${obj2.address}`}` : `No Address`} </div>
                        </div>
                        <div class="view-btn">
                            <a href="Single-details-page.html" class="view-btn">View Details</a>
                        </div>
                    </div>`
                })
                document.getElementById("serious").innerHTML = ``;
                document.getElementById("serious").innerHTML = row
                document.getElementById("serious").innerHTML += "</div>"

              }
              if (obj1[0].status == "Discovery Call Scheduled") {
                let row = `<div class="heading">Discovery Call Scheduled <span>(${obj1.length})</span></div><div class="item-slider-inner">`
                var finalArray2 = obj1.map(function (obj2, key2) {
                  counting = counting + 1

                  row += `
                    <div class="user-box">
                        <div class="img-box">
                            <img src="${obj2.image}" alt="user-img">
                        </div>
                        <div class="name-box">
                            <div class="name">${obj2.name.length > 18 ? `${obj2.name.slice(0,18)}...`: `${obj2.name}`}</div>
                            <div class="desig">${obj2.description ? `${obj2.description.length > 20 ? `${obj2.description.slice(0,20)}...`: `${obj2.description}`}` : `No Title`} </div>
                        </div>
                        <div class="company">
                            <span class="co">Company:</span>
                            <div class="co-con">${obj2.company ? `${obj2.company.length > 28 ? `${obj2.company.slice(0,28)}...`: `${obj2.company}`}` : `No Company`} </div>
                        </div>
                        <div class="location">
                            <span class="lo">Location:</span>
                            <div class="lo-content">${obj2.address ? `${obj2.address.length > 28 ? `${obj2.address.slice(0,28)}...`: `${obj2.address}`}` : `No Address`} </div>
                        </div>
                        <div class="view-btn">
                            <a href="Single-details-page.html" class="view-btn">View Details</a>
                        </div>
                    </div>`
                })
                document.getElementById("scheduled").innerHTML = ``;
                document.getElementById("scheduled").innerHTML = row
                document.getElementById("scheduled").innerHTML += "</div>"

              }
              if (obj1[0].status == "Discovery Call Completed") {
                let row = `<div class="heading">Discovery Call Completed <span>(${obj1.length})</span></div><div class="item-slider-inner">`
                var finalArray2 = obj1.map(function (obj2, key2) {
                  counting = counting + 1

                  row += `
                    <div class="user-box">
                        <div class="img-box">
                            <img src="${obj2.image}" alt="user-img">
                        </div>
                        <div class="name-box">
                            <div class="name">${obj2.name.length > 18 ? `${obj2.name.slice(0,18)}...`: `${obj2.name}`}</div>
                            <div class="desig">${obj2.description ? `${obj2.description.length > 20 ? `${obj2.description.slice(0,20)}...`: `${obj2.description}`}` : `No Title`} </div>
                        </div>
                        <div class="company">
                            <span class="co">Company:</span>
                            <div class="co-con">${obj2.company ? `${obj2.company.length > 28 ? `${obj2.company.slice(0,28)}...`: `${obj2.company}`}` : `No Company`} </div>
                        </div>
                        <div class="location">
                            <span class="lo">Location:</span>
                            <div class="lo-content">${obj2.address ? `${obj2.address.length > 28 ? `${obj2.address.slice(0,28)}...`: `${obj2.address}`}` : `No Address`} </div>
                        </div>
                        <div class="view-btn">
                            <a href="Single-details-page.html" class="view-btn">View Details</a>
                        </div>
                    </div>`
                })
                document.getElementById("completed").innerHTML = ``;
                document.getElementById("completed").innerHTML = row
                document.getElementById("completed").innerHTML += "</div>"

              }
              if (obj1[0].status == "Boom") {
                let row = `<div class="heading" style="background-color: rgb(133, 187, 101) !important;">Boom <span>(${obj1.length})</span></div><div class="item-slider-inner">`
                var finalArray2 = obj1.map(function (obj2, key2) {
                  counting = counting + 1

                  row += `
                    <div class="user-box">
                        <div class="img-box">
                            <img src="${obj2.image}" alt="user-img">
                        </div>
                        <div class="name-box">
                            <div class="name">${obj2.name.length > 18 ? `${obj2.name.slice(0,18)}...`: `${obj2.name}`}</div>
                            <div class="desig">${obj2.description ? `${obj2.description.length > 20 ? `${obj2.description.slice(0,20)}...`: `${obj2.description}`}` : `No Title`} </div>
                        </div>
                        <div class="company">
                            <span class="co">Company:</span>
                            <div class="co-con">${obj2.company ? `${obj2.company.length > 28 ? `${obj2.company.slice(0,28)}...`: `${obj2.company}`}` : `No Company`} </div>
                        </div>
                        <div class="location">
                            <span class="lo">Location:</span>
                            <div class="lo-content">${obj2.address ? `${obj2.address.length > 28 ? `${obj2.address.slice(0,28)}...`: `${obj2.address}`}` : `No Address`} </div>
                        </div>
                        <div class="view-btn">
                            <a href="Single-details-page.html" class="view-btn">View Details</a>
                        </div>
                    </div>`
                })
                document.getElementById("boom").innerHTML = ``;
                document.getElementById("boom").innerHTML = row
                document.getElementById("boom").innerHTML += "</div>"

              }
              if (obj1[0].status == "Lost") {
                let row = `<div class="heading" style="background-color: rgb(128, 128, 128) !important;">Lost <span>(${obj1.length})</span></div><div class="item-slider-inner">`
                var finalArray2 = obj1.map(function (obj2, key2) {
                  counting = counting + 1

                  row += `
                    <div class="user-box">
                        <div class="img-box">
                            <img src="${obj2.image}" alt="user-img">
                        </div>
                        <div class="name-box">
                            <div class="name">${obj2.name.length > 18 ? `${obj2.name.slice(0,18)}...`: `${obj2.name}`}</div>
                            <div class="desig">${obj2.description ? `${obj2.description.length > 20 ? `${obj2.description.slice(0,20)}...`: `${obj2.description}`}` : `No Title`} </div>
                        </div>
                        <div class="company">
                            <span class="co">Company:</span>
                            <div class="co-con">${obj2.company ? `${obj2.company.length > 28 ? `${obj2.company.slice(0,28)}...`: `${obj2.company}`}` : `No Company`} </div>
                        </div>
                        <div class="location">
                            <span class="lo">Location:</span>
                            <div class="lo-content">${obj2.address ? `${obj2.address.length > 28 ? `${obj2.address.slice(0,28)}...`: `${obj2.address}`}` : `No Address`} </div>
                        </div>
                        <div class="view-btn">
                            <a href="Single-details-page.html" class="view-btn">View Details</a>
                        </div>
                    </div>`
                })
                document.getElementById("lost").innerHTML = ``;
                document.getElementById("lost").innerHTML = row
                document.getElementById("lost").innerHTML += "</div>"

              }
            }
          })
        })
      }
      setTimeout(() => {
        if (document.getElementById("for_boom")) {
          let target = document.getElementById("for_boom").innerHTML;
          console.log(target)
          if (target = `<div class="loader_canban"></div>`) {
            document.getElementById("boom").innerHTML = `<div class="heading" style="background-color: rgb(133, 187, 101) !important;">Boom <span>(0)</span></div>
        <div class="item-slider-inner">
            <div class="user-box">
                No Data
            </div>
        </div>`
          }
        }
        if (document.getElementById("for_linkdin_campaign")) {
          let target1 = document.getElementById("for_linkdin_campaign").innerHTML;
          console.log(target1)
          if (target1 = `<div class="loader_canban"></div>`) {
            document.getElementById("linkdin_campaign").innerHTML = `<div class="heading">LinkedIn Campaign <span>(0)</span></div>
        <div class="item-slider-inner">
            <div class="user-box">
                No Data
            </div>
        </div>`
          }
        }
        if (document.getElementById("for_lost")) {
          let target2 = document.getElementById("for_lost").innerHTML;
          console.log(target2)
          if (target2 = `<div class="loader_canban"></div>`) {
            document.getElementById("lost").innerHTML = `<div class="heading" style="background-color: rgb(128, 128, 128) !important;">Lost <span>(0)</span></div>
        <div class="item-slider-inner">
            <div class="user-box">
                No Data
            </div>
        </div>`
          }
        }
        if (document.getElementById("for_talking")) {
          let target3 = document.getElementById("for_talking").innerHTML
          console.log(target3)
          if (target3 = `<div class="loader_canban"></div>`) {
            document.getElementById("talking").innerHTML = `<div class="heading">Talking/Replied <span>(0)</span></div>
        <div class="item-slider-inner">
            <div class="user-box">
                No Data
            </div>
        </div>`
          }
        }
        if (document.getElementById("for_serious")) {
          let target4 = document.getElementById("for_serious").innerHTML;
          console.log(target4)
          if (target4 = `<div class="loader_canban"></div>`) {
            document.getElementById("serious").innerHTML = `<div class="heading">Serious Conversations <span>(0)</span></div>
        <div class="item-slider-inner">
            <div class="user-box">
                No Data
            </div>
        </div>`
          }
        }
        if (document.getElementById("for_scheduled")) {
          let target5 = document.getElementById("for_scheduled").innerHTML;
          console.log(target5)
          if (target5 = `<div class="loader_canban"></div>`) {
            document.getElementById("scheduled").innerHTML = `<div class="heading">Discovery-Call Scheduled <span>(0)</span></div>
        <div class="item-slider-inner">
            <div class="user-box">
                No Data
            </div>
        </div>`
          }
        }
        if (document.getElementById("for_completed")) {
          let target6 = document.getElementById("for_completed").innerHTML;
          console.log(target6)
          if (target6 = `<div class="loader_canban"></div>`) {
            document.getElementById("completed").innerHTML = `<div class="heading">Call Completed <span>(0)</span></div>
        <div class="item-slider-inner">
            <div class="user-box">
                No Data
            </div>
        </div>`
          }
        }
      }, 8000)
      document.querySelector(".count").innerHTML = counting
    }

    // alert('ok')


  } else {
    showlists()
  }
}
if (document.getElementById("apply_filter")) {
  document
    .getElementById("apply_filter")
    .addEventListener("click", filter);
}
if (document.querySelector(".statuss")) {
  document.querySelectorAll(".statuss").forEach((ele) => {
    ele.addEventListener("change", changestatus);
  });
}

function changestatus(e) {
  let contentDiv1 = e.target.parentElement;
  divv = contentDiv1.querySelector(".optionss");
  value = e.target.value;
  console.log(value)
  if (value == "priority") {
    variable = contentDiv1.querySelector(".removeing");
    console.log(variable)
    variable.innerHTML = ``
    variable.innerHTML = `<select name="option" id="" class="where optionss"><option value selected>Select Options</option>
    <option value="A">A</option>
    <option value="B">B</option>
    <option value="C">C</option>
    <option value="D">D</option></select>`
  }
  if (value == "status") {
    variable = contentDiv1.querySelector(".removeing");
    console.log(variable)
    variable.innerHTML = ``
    variable.innerHTML = `<select name="option" id="" class="where optionss"><option value selected>Select Options</option>
    <option value="LinkedIn Campaign">LinkedIn Campaign</option>
    <option value="Talking/Replied">Talking/Replied</option>
    <option value="Serious Conversations">Serious Conversations</option>
    <option value="Discovery Call Scheduled">Discovery Call Scheduled</option>
    <option value="Discovery Call Completed">Discovery Call Completed</option>
    <option value="Boom">Boom</option>
    <option value="Lost">Lost</option> </select>`
  }
  if (value == "conversion") {
    variable = contentDiv1.querySelector(".removeing");
    console.log(variable)
    variable.innerHTML = ``
    variable.innerHTML = `<select name="option" id="" class="where optionss"><option value="" selected="">Select option</option>
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
    <option value="Organic Outreach - Comments &amp; Likes">Organic Outreach - Comments
      &amp;
      Likes
    </option>
    <option value="Inbound">Inbound</option>
    <option value="Direct Outreach">Direct Outreach</option></select>`
  }
  if (value == "discovery_call") {
    variable = contentDiv1.querySelector(".removeing");
    console.log(variable)
    variable.innerHTML = ``
    variable.innerHTML = `<input type="date" class="where" id="discoveryField" style="background: #f7fbff;
    border: 1px solid rgba(7,77,209,.1);
    border-radius: 5px;
    color: #7c7c7c;
    padding: 10px;
    cursor: pointer;
    font-size: 16px;">`

  }
  if (value == "follow_up") {
    variable = contentDiv1.querySelector(".removeing");
    console.log(variable)
    variable.innerHTML = ``
    variable.innerHTML = `<input type="date" class="where" id="discoveryField" style="background: #f7fbff;
    border: 1px solid rgba(7,77,209,.1);
    border-radius: 5px;
    color: #7c7c7c;
    padding: 10px;
    cursor: pointer;
    font-size: 16px;">`

  }

  if (document.querySelector(".statuss")) {
    document.querySelectorAll(".statuss").forEach((ele) => {
      ele.addEventListener("change", changestatus);
    });
  }
  if (document.querySelector(".refresh")) {
    document.querySelectorAll(".refresh").forEach((ele) => {
      ele.addEventListener("click", refresh);
    });
  }
}



if (document.getElementById("pills-profile-tab")) {
  document.getElementById("pills-profile-tab").addEventListener("click", () => {
    views = "list"
    localStorage.setItem("views", views)
    filter();
  });
}
if (document.getElementById("search")) {
  document.getElementById("search").addEventListener("change", () => {
    filter();
  });
}

function showlists() {
  document.getElementById("adding_lists").innerHTML = `<tr><div class="loader"></div></tr>`
  console.log("Working")
  localStorage.setItem("user_id", 11);
  user_id = localStorage.getItem("user_id")
  second_user_id = localStorage.getItem("user_id")

  let arr = [];
  let counter = 0;
  var element = document.querySelectorAll(".where");
  document.querySelectorAll(".where").forEach((ele, i) => {


    // alert(i);
    if (i % 4 === 0) {
      let obj = {
        field0: element[counter].value,
        field1: element[counter + 1].value,
        field2: element[counter + 2].value,
        field3: element[counter + 3].value,
      };
      arr.push(obj);

      counter = counter + 4;

      // let convertDate = formatDate(obj.field0)
    }
  });

  let lists = [];
  weekArray = [];
  var search = document.getElementById("search").value
  // let arr = [{ field0: 'and', field1: 'status', field2: '=',field3:'' },
  // { field0: 'and', field1: 'status', field2: '=',field3:'' }]

  url = `${globalURl}/filters`;

  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      filters: arr,
      weekArray,
      view: "",
      search,
      user_id,
      second_user_id,
      lists,
    })
  );

  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      arr = xhr.responseText;
      arr = JSON.parse(arr);
      let row = ""
      // alert(arr);
      let color = ""
      if (arr != '200') {
        arr.map((obj) => {
          if (obj.status == "LinkedIn Campaign") {
            color = "#0e76a8"
          }
          if (obj.status == "Talking/Replied") {
            color = "#0e76a8"
          }
          if (obj.status == "Serious Conversations") {
            color = "#FFA500"
          }
          if (obj.status == "Discovery Call Scheduled") {
            color = "#FF0000"
          }
          if (obj.status == "Discovery Call Completed") {
            color = "#FFCB05"
          }
          if (obj.status == "Boom") {
            color = "rgb(133, 187, 101)"
          }
          if (obj.status == "Lost") {
            color = "rgb(128, 128, 128)"
          }
          document.querySelector(".count").innerHTML = arr.length


          row += `<tr><td>
      <img src="${obj.image}" alt="user-image">
      <span class="name">${obj.name}</span>
      </td>
      <td>${obj.description ? `${obj.description.length > 22 ? `${obj.description.slice(0,22)}...`: `${obj.description}`}` : `No Title`} </td>
      <td>${obj.company ? `${obj.company.length > 22 ? `${obj.company.slice(0,22)}...`: `${obj.company}`}` : `No Company`} </td>
      <td>${obj.address ? `${obj.address.length > 22 ? `${obj.address.slice(0,22)}...`: `${obj.address}`}` : `No address`} </td>
      <td class="badge-own compain" ><span style="background-color:${color} !important">${obj.status}</span></td>
      <td><a href="Single-details-page.html" class="view-btn">View Details</a>
      </td>
      <td><span class="reply-count">${obj.count}</span></tr></td>`
        });
        document.getElementById("adding_lists").innerHTML = ``;
        document.getElementById("adding_lists").innerHTML = row
      } else {
        document.getElementById("adding_lists").innerHTML = `<tr><td>No Record Found</td></tr>`
        document.querySelector(".count").innerHTML = 0

      }
    }
  }

}
if (document.getElementById("add_another")) {
  document.getElementById("add_another").addEventListener("click", () => {
    add_another();
  });
}

function add_another() {

  document.getElementById("containing_div").innerHTML += `<div class="filter-row">
  <select name="where" id="where" class="where">
      <option value="and" selected>Where</option>
  </select>
  <select name="status" id="status" class="where statuss">
      <option value="status" selected>Status</option>
      <option value="priority">Priority</option>
      <option value="conversion">Conversion Messages</option>
      <option value="discovery_call">Discovery</option>
      <option value="follow_up">Follow</option>

  </select>
  <select name="operator" id="operator" class="where">
      <option value="="selected>is</option>
      <option value="!=">is not</option>
      <option value="LIKE">contain</option>
      <option value="exp">not contain</option>
  </select>
  <div class="removeing">
  <select name="option" id="option" class="where optionss">
      <option value selected>Select Options</option>
      <option value="LinkedIn Campaign">LinkedIn Campaign</option>
      <option value="Talking/Replied">Talking/Replied</option>
      <option value="Serious Conversations">Serious Conversations</option>
      <option value="Discovery Call Scheduled">Discovery Call Scheduled</option>
      <option value="Discovery Call Completed">Discovery Call Completed</option>
      <option value="Boom">Boom</option>
      <option value="Lost">Lost</option>

  </select>
  </div>
  <button class="btn-own ">
      <img class="refresh" src="./Assets/img/refresh.png" alt="refresh-button">
  </button>
</div>`
  if (document.querySelector(".statuss")) {
    document.querySelectorAll(".statuss").forEach((ele) => {
      ele.addEventListener("change", changestatus);
    });
  }
  if (document.querySelector(".refresh")) {
    document.querySelectorAll(".refresh").forEach((ele) => {
      ele.addEventListener("click", refresh);
    });
  }
}

if (document.querySelector(".refresh")) {
  document.querySelectorAll(".refresh").forEach((ele) => {
    ele.addEventListener("click", refresh);
  });
}

function refresh(e) {
  let contentDiv1 = e.target.parentElement.parentElement;
  console.log(contentDiv1)
  contentDiv1.innerHTML = ``
  contentDiv1.innerHTML = `<select name="where" id="where" class="where">
  <option value="and" selected>Where</option>
</select>
<select name="status" id="status" class="where statuss">
  <option value="status" selected>Status</option>
  <option value="priority">Priority</option>
  <option value="conversion">Conversion Messages</option>
  <option value="discovery_call">Discovery</option>
  <option value="follow_up">Follow</option>

</select>
<select name="operator" id="operator" class="where">
  <option value="="selected>is</option>
  <option value="!=">is not</option>
  <option value="LIKE">contain</option>
  <option value="exp">not contain</option>
</select>
<div class="removeing">
<select name="option" id="option" class="where optionss">
  <option value selected>Select Options</option>
  <option value="LinkedIn Campaign">LinkedIn Campaign</option>
  <option value="Talking/Replied">Talking/Replied</option>
  <option value="Serious Conversations">Serious Conversations</option>
  <option value="Discovery Call Scheduled">Discovery Call Scheduled</option>
  <option value="Discovery Call Completed">Discovery Call Completed</option>
  <option value="Boom">Boom</option>
  <option value="Lost">Lost</option>

</select>
</div>
<button class="btn-own " >
  <img class="refresh" src="./Assets/img/refresh.png" alt="refresh-button">
</button>`
  if (document.querySelector(".refresh")) {
    document.querySelectorAll(".refresh").forEach((ele) => {
      ele.addEventListener("click", refresh);
    });
  }
  if (document.querySelector(".statuss")) {
    document.querySelectorAll(".statuss").forEach((ele) => {
      ele.addEventListener("change", changestatus);
    });
  }
}


setInterval(() => {
  // alert('ok')
  if (document.querySelector(".refresh")) {
    document.querySelectorAll(".refresh").forEach((ele) => {
      ele.addEventListener("click", refresh);
    });
  }

}, 200);

function getvalue(data) {
  console.log(data)
  let name = data
  const url = `${globalURl}/get_users_lists/${name}`;

  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let userData = JSON.parse(xhr.responseText);
      userData.data.map((obj) => {
        lists.push(obj.id);
      })
      console.log(JSON.stringify(lists))
      
    }
  };
}






