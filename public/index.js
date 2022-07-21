const globalURl = "https://linkedin.thefastech.com";
lists = []
weekArray = []

var i = setInterval(() => {
  $('.slider-canban').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    dots: false,
    focusOnSelect: false
  })
  localStorage.removeItem("db")
  let userBoxHeight = $(".user-box").height();
  $(".item-slider-inner").height(userBoxHeight + userBoxHeight / 2);
  // document.querySelectorAll(".head_row").style.display = "none"
  views = "canban"
  // document.getElementById("admin_name").innerHTML = localStorage.getItem("name")
  

  localStorage.setItem("views", views)
  document.getElementById("adding_lists").innerHTML = `<tr><div class="loader"></div></tr>`
  console.log("Working")
  user_id = localStorage.getItem("user_id")
  username = localStorage.getItem("username")
  second_user_id = localStorage.getItem("user_id")
  let name = "00"
  variable = "00"
  console.log(user_id, "user_id")
  setTimeout(() => {
    const url = `${globalURl}/get_users_lists/${name}/${user_id}/${variable}`;

    let xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onreadystatechange = function () {
      
      if (xhr.readyState == 4 && xhr.status == 200) {
        let userData = JSON.parse(xhr.responseText);
        document.getElementById("searchTopSelect-2").innerHTML = `<option value="">Select List</option>`
        document.getElementById("searchTopSelect-2").innerHTML += `<option value="">Select List</option>`
        localStorage.setItem("name",userData.name)
        localStorage.setItem("profilepic",userData.image)
        str = localStorage.getItem("name")
        test_name = str.split(" ")
        document.getElementById("admin_name").innerHTML = test_name[0]
        document.getElementById("admin_image").src = localStorage.getItem("profilepic")
        userData.data.map((obj) => {
          // lists.push(obj.id);
          document.getElementById("searchTopSelect-2").innerHTML += `<option value="${obj.id}" >${obj.title}</option>`
        })
        localStorage.setItem("second_user_id",userData.user_id)
        $("#searchTopSelect-2").select2().on('change', () => {
          let data = $("#searchTopSelect-2 option:selected").text();
          if(data == "Select List"){
            document.getElementById("select2-searchTopSelect-2-container").style.backgroundColor = "#f7fbff"
            lists = []
            filter()
          }
          else{
            document.getElementById("select2-searchTopSelect-2-container").style.backgroundColor = "#a0c8f1"
          }
          console.log("test")
          getvalue(data)
      })
        // console.log(JSON.stringify(lists))
        filter()
      }
    }
    const url1 = `${globalURl}/linkingids?user_id=` + `${username}`;
      var xhr1 = new XMLHttpRequest();
      xhr1.open("GET", url1, true);
      xhr1.setRequestHeader("Content-Type", "application/json");
      xhr1.send();
      xhr1.onreadystatechange = function () {
        //Call a function when the state changes.
        if (xhr1.readyState == 4 && xhr1.status == 200) {
          document.getElementById("searchTopSelect").innerHTML = ``
          document.getElementById("searchTopSelect").innerHTML = `
          <option value="Abdul Mateen">${localStorage.getItem("name")}</option>
          `

          var respon = xhr1.responseText;
            respon = JSON.parse(respon);
            if(respon.length > 0){
              document.getElementById("searchTopSelect").innerHTML += `
          <option value="Abdul Mateen">${localStorage.getItem("name")}</option>
          `
              var finalArr = respon.map(function (obj, key) {
                document.getElementById("searchTopSelect").innerHTML += `<option value="Abdul Mateen">${obj.names_original}</option>`
              })
            }
            $("#searchTopSelect").select2().on('change', () => {
              let data = $("#searchTopSelect option:selected").text();
              localStorage.setItem("db",true)
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
  second_user_id = localStorage.getItem("second_user_id")
  if(!second_user_id){
    second_user_id = localStorage.getItem("user_id")
  }
  else{
    user_id = second_user_id
  }
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
    if(element[3].value == ""){
      document.getElementById("major_filters").style.backgroundColor = "#f7fbff"
    }
    else{
      document.getElementById("major_filters").style.backgroundColor = "#a0c8f1"
    }
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
    var search = document.getElementById("search").value
    if(search != ""){
      document.querySelector(".input-con").style.border = "2px solid #a0c8f1"
    }
    else{
      document.querySelector(".input-con").style.border = null
    }
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
                            <a href="#" class="view-btn view_detail_button" data-prospect-id=${obj2.id}>View Details</a>
                        </div>
                    </div>`
                    if (document.querySelector(".view_detail_button")) {
                      document.querySelectorAll(".view_detail_button").forEach((ele) => {
                        ele.addEventListener("click", detailpage);
                      });
                    }
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
                        <a href="#" class="view-btn view_detail_button" data-prospect-id=${obj2.id}>View Details</a>
                        </div>
                    </div>`
                    if (document.querySelector(".view_detail_button")) {
                      document.querySelectorAll(".view_detail_button").forEach((ele) => {
                        ele.addEventListener("click", detailpage);
                      });
                    }
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
                        <a href="#" class="view-btn view_detail_button" data-prospect-id=${obj2.id}>View Details</a>
                        </div>
                    </div>`
                    if (document.querySelector(".view_detail_button")) {
                      document.querySelectorAll(".view_detail_button").forEach((ele) => {
                        ele.addEventListener("click", detailpage);
                      });
                    }
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
                        <a href="#" class="view-btn view_detail_button" data-prospect-id=${obj2.id}>View Details</a>
                        </div>
                    </div>`
                    if (document.querySelector(".view_detail_button")) {
                      document.querySelectorAll(".view_detail_button").forEach((ele) => {
                        ele.addEventListener("click", detailpage);
                      });
                    }
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
                        <a href="#" class="view-btn view_detail_button" data-prospect-id=${obj2.id}>View Details</a>
                        </div>
                    </div>`
                    if (document.querySelector(".view_detail_button")) {
                      document.querySelectorAll(".view_detail_button").forEach((ele) => {
                        ele.addEventListener("click", detailpage);
                      });
                    }
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
                        <a href="#" class="view-btn view_detail_button" data-prospect-id=${obj2.id}>View Details</a>
                        </div>
                    </div>`
                    if (document.querySelector(".view_detail_button")) {
                      document.querySelectorAll(".view_detail_button").forEach((ele) => {
                        ele.addEventListener("click", detailpage);
                      });
                    }
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
                        <a href="#" class="view-btn view_detail_button" data-prospect-id=${obj2.id}>View Details</a>
                        </div>
                    </div>`
                    if (document.querySelector(".view_detail_button")) {
                      document.querySelectorAll(".view_detail_button").forEach((ele) => {
                        ele.addEventListener("click", detailpage);
                      });
                    }
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
  user_id = localStorage.getItem("user_id")
  second_user_id = localStorage.getItem("second_user_id")
  if(!second_user_id){
    second_user_id = localStorage.getItem("user_id")
  }
  else{
    user_id = second_user_id
  }

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

  var search = document.getElementById("search").value
  if(search != ""){
    document.getElementById("search").style.backgroundColor = "#a0c8f1"
  }
  else{
    document.getElementById("search").style.backgroundColor = "transparent"
  }
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
      <td><a href="#"  class="view-btn view_detail_button" data-prospect-id=${obj.id} >View Details</a>
      </td>
      <td><span class="reply-count">${obj.count}</span></tr></td>`
        });
        document.getElementById("adding_lists").innerHTML = ``;
        document.getElementById("adding_lists").innerHTML = row
        if (document.querySelector(".view_detail_button")) {
          document.querySelectorAll(".view_detail_button").forEach((ele) => {
            ele.addEventListener("click", detailpage);
          });
        }
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
      <option value="and" selected>and</option>
      <option value="or" selected>or</option>
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
  variable = "00"
  user_id = localStorage.getItem("user_id")
  check = localStorage.getItem("db")
  if(!check){
    const url = `${globalURl}/get_users_lists/${name}/${user_id}/${variable}`;

    let xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        lists = []
        let userData = JSON.parse(xhr.responseText);
        
          lists.push(JSON.stringify(userData.data.id));
        
        // JSON.stringify(lists)
        filter()
      }
    };
  }
  else{
    variable = "11"
    const url = `${globalURl}/get_users_lists/${name}/${user_id}/${variable}`;

    let xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        lists = []
        let userData = JSON.parse(xhr.responseText);
        document.getElementById("searchTopSelect-2").innerHTML = `<option value="">Select List</option>`
        document.getElementById("searchTopSelect-2").innerHTML += `<option value="">Select List</option>`

        userData.data.map((obj) => {
          // lists.push(obj.id);
          document.getElementById("searchTopSelect-2").innerHTML += `<option value="${obj.id}" >${obj.title}</option>`
        })
        localStorage.setItem("second_user_id",userData.user_id)
        console.log(JSON.stringify(lists))
        localStorage.removeItem("db")
        $("#searchTopSelect-2").select2().on('change', () => {
          let data = $("#searchTopSelect-2 option:selected").text();
          getvalue(data)
      })
        filter()
      }
    };
  }
}
function detailpage(e){
  prospect_id = e.currentTarget.getAttribute("data-prospect-id");
  localStorage.setItem("prospect_id",prospect_id)
  window.location.href = "Single-details-page.html";

}

if (document.getElementById("this_month")) {
  document.getElementById("this_month").addEventListener("click", () => {
    if(document.getElementById("this_month").style.backgroundColor == "rgb(133, 187, 101)"){
      document.getElementById("this_month").style.backgroundColor = "#edf2f6"
      document.getElementById("this_month").style.color = "#7c7c7c"
      weekArray = []
      filter()
    }
    else{
      weekArray = []
      document.getElementById("this_month").style.backgroundColor = "rgb(133, 187, 101)"
      document.getElementById("this_month").style.color = "white"
      document.getElementById("last_month").style.backgroundColor = "#edf2f6"
      document.getElementById("last_month").style.color = "#7c7c7c"
      document.getElementById("this_week").style.backgroundColor = "#edf2f6"
      document.getElementById("this_week").style.color = "#7c7c7c"
      document.getElementById("last_week").style.backgroundColor = "#edf2f6"
      document.getElementById("last_week").style.color = "#7c7c7c" 
      const nameOfMonth = new Date().toLocaleString(
        'default', {month: 'short'}
      );
      const currentYear = new Date().getFullYear();
      currentYearstring = JSON.stringify(currentYear)
       getMonthYear = currentYearstring.slice(2, 4);
      console.log(getMonthYear)
      let week1 = `${nameOfMonth} Week 1 -${getMonthYear}`;
        let week2 = `${nameOfMonth} Week 2 -${getMonthYear}`;
        let week3 = `${nameOfMonth} Week 3 -${getMonthYear}`;
        let week4 = `${nameOfMonth} Week 4 -${getMonthYear}`;
        let week5 = `${nameOfMonth} Week 5 -${getMonthYear}`;
        weekArray.push(week1, week2, week3, week4, week5);
        filter()
    }
    

  });
}

if (document.getElementById("last_month")) {
  document.getElementById("last_month").addEventListener("click", () => {
    if(document.getElementById("last_month").style.backgroundColor == "rgb(133, 187, 101)"){
      document.getElementById("last_month").style.backgroundColor = "#edf2f6"
      document.getElementById("last_month").style.color = "#7c7c7c"
      weekArray = []
      filter()
    }
    else{
      weekArray = []
      document.getElementById("last_month").style.backgroundColor = "rgb(133, 187, 101)"
      document.getElementById("last_month").style.color = "white"
      document.getElementById("this_month").style.backgroundColor = "#edf2f6"
      document.getElementById("this_month").style.color = "#7c7c7c"
      document.getElementById("this_week").style.backgroundColor = "#edf2f6"
      document.getElementById("this_week").style.color = "#7c7c7c"
      document.getElementById("last_week").style.backgroundColor = "#edf2f6"
      document.getElementById("last_week").style.color = "#7c7c7c" 
      const current = new Date();
      current.setMonth(current.getMonth()-1);
      const previousMonth = current.toLocaleString('default', { month: 'short' });
      
      console.log(previousMonth);

      const currentYear = new Date().getFullYear();
      currentYearstring = JSON.stringify(currentYear)
       getMonthYear = currentYearstring.slice(2, 4);
      console.log(getMonthYear)
      let week1 = `${previousMonth} Week 1 -${getMonthYear}`;
        let week2 = `${previousMonth} Week 2 -${getMonthYear}`;
        let week3 = `${previousMonth} Week 3 -${getMonthYear}`;
        let week4 = `${previousMonth} Week 4 -${getMonthYear}`;
        let week5 = `${previousMonth} Week 5 -${getMonthYear}`;
        weekArray.push(week1, week2, week3, week4, week5);
        filter()
    }
    

  });
}

if (document.getElementById("this_week")) {
  document.getElementById("this_week").addEventListener("click", () => {
    if(document.getElementById("this_week").style.backgroundColor == "rgb(133, 187, 101)"){
      document.getElementById("this_week").style.backgroundColor = "#edf2f6"
      document.getElementById("this_week").style.color = "#7c7c7c"
      weekArray = []
      filter()
    }
    else{
      weekArray = []
      document.getElementById("this_week").style.backgroundColor = "rgb(133, 187, 101)"
      document.getElementById("this_week").style.color = "white"
      document.getElementById("this_month").style.backgroundColor = "#edf2f6"
      document.getElementById("this_month").style.color = "#7c7c7c"
      document.getElementById("last_month").style.backgroundColor = "#edf2f6"
      document.getElementById("last_month").style.color = "#7c7c7c"
      document.getElementById("last_week").style.backgroundColor = "#edf2f6"
      document.getElementById("last_week").style.color = "#7c7c7c" 
      const current = new Date();
      current.setMonth(current.getMonth());
      const previousMonth = current.toLocaleString('default', { month: 'short' });
      
      console.log(previousMonth);
      const d = new Date();
      const date = d.getDate();
      const day = d.getDay();
      const weekOfMonth = Math.ceil((date - 1 - day) / 7);
      console.log(weekOfMonth)
      const currentYear = new Date().getFullYear();
      currentYearstring = JSON.stringify(currentYear)
       getMonthYear = currentYearstring.slice(2, 4);
      console.log(getMonthYear)
      let week1 = `${previousMonth} Week ${weekOfMonth} -${getMonthYear}`;
        
        weekArray.push(week1);
        filter()
    }
    

  });
}

if (document.getElementById("last_week")) {
  document.getElementById("last_week").addEventListener("click", () => {
    if(document.getElementById("last_week").style.backgroundColor == "rgb(133, 187, 101)"){
      document.getElementById("last_week").style.backgroundColor = "#edf2f6"
      document.getElementById("last_week").style.color = "#7c7c7c"
      weekArray = []
      filter()
    }
    else{
      weekArray = []
      document.getElementById("last_week").style.backgroundColor = "rgb(133, 187, 101)"
      document.getElementById("last_week").style.color = "white"
      document.getElementById("this_month").style.backgroundColor = "#edf2f6"
      document.getElementById("this_month").style.color = "#7c7c7c"
      document.getElementById("last_month").style.backgroundColor = "#edf2f6"
      document.getElementById("last_month").style.color = "#7c7c7c"
      document.getElementById("this_week").style.backgroundColor = "#edf2f6"
      document.getElementById("this_week").style.color = "#7c7c7c" 
      const current = new Date();
      current.setMonth(current.getMonth());
      const previousMonth = current.toLocaleString('default', { month: 'short' });
      
      console.log(previousMonth);
      const d = new Date();
      const date = d.getDate();
      const day = d.getDay();
      const weekOfMonth = Math.ceil((date - 1 - day) / 7) - 1;
      if(weekOfMonth <= 0){
        weekOfMonth = 5
        current = new Date();
        current.setMonth(current.getMonth()-1);
       previousMonth = current.toLocaleString('default', { month: 'short' });
      
      }
      console.log(weekOfMonth)
      const currentYear = new Date().getFullYear();
      currentYearstring = JSON.stringify(currentYear)
       getMonthYear = currentYearstring.slice(2, 4);
      console.log(getMonthYear)
      let week1 = `${previousMonth} Week ${weekOfMonth} -${getMonthYear}`;
        
        weekArray.push(week1);
        filter()
    }
    

  });
}

if (document.getElementById("custom_open")) {
  document.getElementById("custom_open").addEventListener("click", () => {
    if(document.querySelector(".custom-date-next-box-con").style.display == "block"){
      document.querySelector(".custom-date-next-box-con").style.display = "none"
    }
    else{
      document.querySelector(".custom-date-next-box-con").style.display = "block"

    }

  });
}
// if (document.getElementById("major_filters")) {
//   document.getElementById("major_filters").addEventListener("click", () => {
    
//     document.getElementById("major_date").style.visibility = "hidden"
//     document.getElementById("major_filter_div").style.visibility = "visible"

//   });
// }

setTimeout(() => {
  if (document.querySelector(".calendar__day-text")) {
    if (document.querySelector(".calendar__day")) {
      document.querySelectorAll(".calendar__day").forEach((ele) => {
        ele.addEventListener("click", calender_dates);
      });
    }
  }
  
},3000)

setTimeout(() => {
    if (document.querySelector(".calendar__arrow-inner")) {
      document.querySelectorAll(".calendar__arrow-inner").forEach((ele) => {
        ele.addEventListener("click", again);
      });
    }
  
  
},3000)

function calender_dates(e){
  day = e.currentTarget.querySelector(".calendar__day-text").innerHTML
  month = document.querySelector(".calendar__month").innerHTML
  year = document.querySelector(".calendar__year").innerHTML
  // others = document.querySelectorAll(".calendar__day-other")
  // console.log(others.length)
  // temp = 35 - others.length
  // console.log(temp);
  // weeks 
}
function again(){
  setTimeout(() => {
  if (document.querySelector(".calendar__day-text")) {
    if (document.querySelector(".calendar__day")) {
      document.querySelectorAll(".calendar__day").forEach((ele) => {
        ele.addEventListener("click", calender_dates);
      });
    }
  }
},1500)
}

setInterval(() => {
  if(weekArray.length > 0){
    document.getElementById("major_date").style.backgroundColor = "#a0c8f1"
  }
  else{
    document.getElementById("major_date").style.backgroundColor = "rgb(247, 251, 255)"
  }
  console.log(weekArray.length)
},500)

$(document).ready(function() {
  $('.js-example-basic-multiple').select2();
});







