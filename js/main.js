function select(s) {
  return document.querySelector(s);
}

const users = select(".users"),
  modal = select(".modal"),
  closeButton = select("#close_modal"),
  avatar = select(".avatar"),
  control = select(".sorting"),
  profile = select(".profile");

// AJAX
let request = new XMLHttpRequest();
request.open(
  "GET",
  "https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture",
  false
);
request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    var data = JSON.parse(request.responseText),
      l = data.results.length;

    for (let i = 0; i < l; i++) {
      // data results
      users.insertAdjacentHTML(
        "beforeend",
        '<li class="user-item" data-name="' +
          data.results[i].name.first +
          " " +
          data.results[i].name.last +
          '"data-email="' +
          data.results[i].email +
          '"data-tel="' +
          data.results[i].phone +
          '"data-gender="' +
          data.results[i].gender +
          '"data-street="' +
          data.results[i].location.street +
          '"data-city="' +
          data.results[i].location.city +
          '"data-state="' +
          data.results[i].location.state +
          '" data-pic="' +
          data.results[i].picture.large +
          '"><img  class="small-img" src="' +
          data.results[i].picture.medium +
          '"data-name="' +
          data.results[i].name.first +
          " " +
          data.results[i].name.last +
          '"data-email="' +
          data.results[i].email +
          '"data-tel="' +
          data.results[i].phone +
          '"data-gender="' +
          data.results[i].gender +
          '"data-street="' +
          data.results[i].location.street +
          '"data-city="' +
          data.results[i].location.city +
          '"data-state="' +
          data.results[i].location.state +
          '" data-pic="' +
          data.results[i].picture.large +
          '"><div class="user-name">' +
          data.results[i].name.first +
          " " +
          data.results[i].name.last +
          "</div></li>"
      );
    }
  } else {
    alert("We reached our target server, but there was an error");
  }
};

request.onerror = function () {
  alert("There was a connection error of some sort");
};
request.send();

// SORTING
let items = document.querySelectorAll(".user-item");

control.addEventListener("change", function () {
  let sorted = [...items].sort(function (a, b) {
    if (control.value === "Sort Alphabetically A to Z")
      if (a.children[1].innerHTML >= b.children[1].innerHTML) {
        return 1;
      } else {
        return -1;
      }
    else {
      if (a.children[1].innerHTML < b.children[1].innerHTML) {
        return 1;
      } else {
        return -1;
      }
    }
  });
  users.innerHTML = " ";
  for (let li of sorted) {
    users.appendChild(li);
  }
});

// MODAL

users.addEventListener("click", function (e) {
  modal.style.display = "flex";
  let target = e.target,
    data_src = target.getAttribute("data-pic"),
    data_name = target.getAttribute("data-name"),
    data_email = target.getAttribute("data-email"),
    data_phone = target.getAttribute("data-tel"),
    data_gender = target.getAttribute("data-gender"),
    data_street = target.getAttribute("data-street"),
    data_city = target.getAttribute("data-city"),
    data_state = target.getAttribute("data-state");

  if (target.nodeName === "LI" || target.nodeName === "IMG") {
    avatar.innerHTML =
      '<img  class="large__img" src="' + data_src + '" alt="avatar">';
    profile.innerHTML = '<h3 class="profile__name"> ' + data_name + "</h3>";
    ('<ul class="info_list">');
    profile.innerHTML +=
      '<li class="info-item"> Email:    <a href="#" class="profile__email">' +
      data_email +
      "</a></li>";
    profile.innerHTML +=
      '<li class="info-item">' + "Gender:    " + data_gender + "</li>";
    profile.innerHTML +=
      '<li class="info-item">' + "Tel:   " + data_phone + "</li>";
    profile.innerHTML +=
      '<li class="info-item">' + "State: " + data_state + "</li>";
    profile.innerHTML +=
      '<li class="info-item">' + "City:  " + data_city + "</li>";
    profile.innerHTML +=
      '<li class="info-item">' + "Street:    " + data_street + "</li>";
    ("</ul>");
    modal.classList.add("show");
  }
});
closeButton.addEventListener("click", function () {
  modal.style.display = "none";
});
