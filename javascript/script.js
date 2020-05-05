 function responsiveNav() {
  var x = document.querySelector(".nav-wrapper");
  if (x.className === "nav-wrapper") {
    x.className += " responsive";
  } else {
    x.className = "nav-wrapper";
  }
}

// code inspired by https://www.w3schools.com/howto/howto_js_topnav_responsive.asp


