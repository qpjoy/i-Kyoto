(function flexible(window, document) {
  var docEl = document.documentElement;
  var dpr = window.devicePixelRatio || 1;

  // Set body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + "px";
    } else {
      document.addEventListener("DOMContentLoaded", setBodyFontSize);
    }
  }
  setBodyFontSize();

  // Custom REM logic based on width
  function setRemUnit() {
    var width = docEl.clientWidth;
    var rem;

    if (width <= 768) {
      rem = (width / 768) * 20;
      // rem = width / 10; // mobile: 1rem = width / 10
    }
    // else if (width === 768) {
    //   rem = 16; // exactly 16px
    // }
    else {
      // For larger screens, grow slowly from 16px upward
      // You can adjust the divisor for tuning
      rem = width / 48; // e.g. 1920px → 40px
    }

    docEl.style.fontSize = rem + "px";
  }

  setRemUnit();

  window.addEventListener("resize", setRemUnit);
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) {
      setRemUnit();
    }
  });

  // hairline support detection
  if (dpr >= 2) {
    var fakeBody = document.createElement("body");
    var testElement = document.createElement("div");
    testElement.style.border = ".5px solid transparent";
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add("hairlines");
    }
    docEl.removeChild(fakeBody);
  }
})(window, document);
