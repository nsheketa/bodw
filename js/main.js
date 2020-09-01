$(document).ready(function () {
  let isObserver = true; //for scroll reveal
  let observer; //for scroll reveal
  let resizeId; // for resize timer
  let wWidth = $(window).width(); // for resize
  const controller = new ScrollMagic.Controller();

  function disableScrolling() {
    if ($(document).height() > $(window).height()) {
      var scrollTop = $("html").scrollTop()
        ? $("html").scrollTop()
        : $("body").scrollTop(); // Works for Chrome, Firefox, IE...
      $("html").addClass("disable-scrolling").css("top", -scrollTop);
    }
  }

  function enableScrolling() {
    var scrollTop = parseInt($("html").css("top"));
    $("html").removeClass("disable-scrolling");
    $("html,body").scrollTop(-scrollTop);
  }

  function isMobile() {
    if ($(".is-mobile").css("display") === "block") {
      return true;
    } else {
      return false;
    }
  }

  /* Init object fit polyfill */
  /* To make it work, add 'font-family: 'object-fit: cover;';' to image */
  if (window.objectFitImages) {
    window.objectFitImages();
  }

  $("select").niceSelect();

  //Scroll revealing animation
  if (
    !("IntersectionObserver" in window) ||
    !("IntersectionObserverEntry" in window) ||
    !("isIntersecting" in window.IntersectionObserverEntry.prototype)
  ) {
    isObserver = false;
    $("html").removeClass("is-observer");
  }

  if (isObserver) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
  }

  $(".scroll-link").on("click", (e) => {
    let target = $(this).attr("href");
    $("html,body").animate(
      {
        scrollTop: $(target).offset().top,
      },
      1000
    );
  });

  /*  HEADER */

  //reseting header

  function headerReset() {
    enableScrolling();
    $(".header__inner-mob").removeClass("is-active");
    $(".header__hamburger").removeClass("is-active");
  }

  $(".header__hamburger").on("click", function (e) {
    e.stopPropagation();
    if ($("html").hasClass("disable-scrolling")) {
      enableScrolling();
    } else {
      disableScrolling();
    }

    $(this).toggleClass("is-active");
    $(".header__inner-mob").toggleClass("is-active");
  });

  $(".header-nav__list > li > a").on("click", function (e) {
    if (isMobile()) {
      e.preventDefault();
      $(this).siblings("ul").slideToggle();
    }
  });

  /* End header */

  //early birds popup
  $(".sign-up__link").on("click", function (e) {
    e.preventDefault();
    disableScrolling();
    $(".sign-up-modal").addClass("is-active");
  });

  $(document).on("click", ".sign-up-modal__close", function (e) {
    $(this).parent().removeClass("is-active");
    enableScrolling();
  });

  //search popup
  $(".header-search__link").on("click", function (e) {
    e.preventDefault();
    disableScrolling();
    $(".modal-search").addClass("is-active");
  });

  $(document).on("click", ".modal-search__close", function (e) {
    $(this).parent().removeClass("is-active");
    enableScrolling();
  });

  const homeCarousel = $(".home-hero__carousel");

  homeCarousel.on("init", function (event, slick, currentSlide, nextSlide) {
    let content = $(".home-hero__carousel-content");
    content.addClass("is-hidden");
    setTimeout(function () {
      homeCarousel
        .find(".slick-active .home-hero__carousel-content")
        .removeClass("is-hidden");
    }, 100);
  });

  homeCarousel.on("afterChange", function (
    event,
    slick,
    currentSlide,
    nextSlide
  ) {
    let content = $(".home-hero__carousel-content");
    content.addClass("is-hidden");
    homeCarousel
      .find(".slick-active .home-hero__carousel-content")
      .removeClass("is-hidden");
  });

  homeCarousel.slick({
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnDotsHover: true,
  });

  $(".partners__carousel").slick({
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 2,
    slidesToScroll: 2,
    adaptiveHeight: false,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ],
  });

  $('.speaker-portfolio__slider').slick({
    dots: false,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnFocus: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 1279,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      }
    ]
  });

  function pinLetters() {
    const letters = $(".speaker-list__letters");
    if (letters.length) {
      // if (wWidth > 1440) {
      //   var scene = new ScrollMagic.Scene({
      //     triggerElement: ".speaker-list__outer",
      //     triggerHook: 0.4,
      //     duration: "100%",
      //   })
      //     .setPin(".speaker-list__letters", {
      //       pushFollowers: false,
      //     })
      //     .addIndicators({ name: "1" }) // add indicators (requires plugin)
      //     .addTo(controller);
      //   // .setClassToggle('.speaker-list__letters', 'is-visible')
      //   var scene_02 = new ScrollMagic.Scene({
      //     triggerElement: ".speaker-list__outer",
      //     triggerHook: 0,
      //     duration: "100%",
      //   })
      //     .on("enter", function () {
      //       letters.addClass("is-visible");
      //     })
      //     .on("leave", function () {
      //       letters.addClass("is-visible");
      //     })
      //     // .setClassToggle(".speaker-list__letters", "is-visible")
      //     .addIndicators({ name: "2" }) // add indicators (requires plugin)
      //     .addTo(controller);
      // }


    } else {
      return;
    }
  }
  // pinLetters();

  if (isObserver) {
    $(".js-visibility").each((i, el) => {
      observer.observe(el);
    });
  }

  /* Trigger resize once */
  $(window).resize(function () {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing(wWidth), 500);

    function doneResizing() {
      let width = $(window).width();
      if (wWidth !== width) {
        wWidth = width;
      }

      pinLetters();
    }
  });
});
