 function responsiveNav() {
  var x = document.querySelector(".nav-wrapper");
  if (x.className === "nav-wrapper") {
    x.className += " responsive";
  } else {
    x.className = "nav-wrapper";
  }
}
