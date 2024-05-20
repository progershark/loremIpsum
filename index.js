(() => {
  "use strict";
  document.addEventListener("DOMContentLoaded", function() {
    var selectElement = document.getElementById("select"),
      initElement = selectElement.querySelector(".init"),
      optionElements = selectElement.querySelectorAll("li:not(.init)"),
      headerElement = document.querySelector("header"),
      lastScrollPosition = 0,
      isMenuOpen = false;

    function getScrollPosition() {
      return window.scrollY;
    }

    function isHeaderHidden() {
      return headerElement.classList.contains("hide");
    }

    initElement.addEventListener("click", function() {
      this.classList.toggle("open");
      optionElements.forEach(function(option) {
        option.classList.toggle("hidden");
      });
    });

    optionElements.forEach(function(option) {
      option.addEventListener("click", function() {
        optionElements.forEach(function(option) {
          option.classList.remove("selected");
        });
        this.classList.add("selected");
        initElement.innerHTML = this.innerHTML;
        initElement.classList.remove("open");
        optionElements.forEach(function(option) {
          option.classList.add("hidden");
        });
      });
    });

    window.addEventListener("scroll", function() {
      if (getScrollPosition() > lastScrollPosition && !isHeaderHidden() && getScrollPosition() > 100) {
        headerElement.classList.add("hide");
      } else if (getScrollPosition() < lastScrollPosition && isHeaderHidden()) {
        headerElement.classList.remove("hide");
      }
      lastScrollPosition = getScrollPosition();
    });

    document.querySelectorAll(".menuBtn, .c-header__menu--item").forEach(function(menuButton) {
      menuButton.addEventListener("click", function() {
        document.querySelector(".c-header__menu").classList.toggle("hidden");
        if (isMenuOpen) {
          document.body.style.overflow = "auto";
          document.querySelector(".menuBtn").classList.remove("open");
        } else {
          document.body.style.overflow = "hidden";
          document.querySelector(".menuBtn").classList.add("open");
        }
        isMenuOpen = !isMenuOpen;
      });
    });
  });
})();
