var mq, wrapper, top_wrap, mid, bottom_wrap, overlay, navList;

function ready(fn) {
  // http://youmightnotneedjquery.com
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function fn() {
  mq = window.matchMedia("(min-width: 992px)");
  wrapper = document.getElementsByClassName("wrapper")[0];
  top_wrap = wrapper.firstElementChild;
  mid = top_wrap.nextElementSibling.firstElementChild;
  bottom_wrap = top_wrap.nextElementSibling.nextElementSibling;
  overlay = document.getElementsByClassName("overlay")[0];
  navList = overlay.getElementsByTagName("H2");

  wrapper.addEventListener("click", toggleOverlay);

  for (var i=0; i<navList.length-1; i++) {
    var el = navList[i];
    el.addEventListener("click", function() {
      toggleDisplay(event.target.textContent);
    });
  }

  if (mq.matches) {
    wrapper.addEventListener("mouseover", toggleWrapper);
    wrapper.addEventListener("mouseout", toggleWrapper);

    for (var i=0; i<navList.length-1; i++) {
      var el = navList[i];
      el.addEventListener("mouseover", function() {
        toggleBackgroundColor(event.target.textContent, overlay);
      });

      el.addEventListener("mouseout", function() {
        toggleBackgroundColor(event.target.textContent, overlay);
      });
    }
  }
}

function toggleOverlay() {
  top_wrap.classList.toggle("x");
  mid.classList.toggle("x");
  bottom_wrap.classList.toggle("x");
  overlay.classList.toggle("show_overlay");
  overlay.parentElement.classList.toggle("no_scroll");
}

function toggleDisplay(text) {
  document.getElementsByClassName("display_flex")[0].classList.remove("display_flex");
  document.getElementsByClassName(text)[0].classList.add("display_flex");
  toggleOverlay();
}

function toggleBackgroundColor(text, el) {
  el.classList.toggle(text + "_color");
}

function toggleWrapper() {
  var text = document.getElementsByClassName("display_flex")[0].getAttribute("class").split(" ")[0];
  toggleBackgroundColor(text, top_wrap.firstElementChild);
  toggleBackgroundColor(text, mid);
  toggleBackgroundColor(text, bottom_wrap.firstElementChild);
}

ready(fn);
