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
      {rootMargin: "0px 0px -15% 0px"}
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

  $('.about-info__carousel').slick({
    arrows: true,
    slidesToShow: 2,
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
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1279,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1
        }
      }
    ]
  })

  $('.who-participation__carousel').slick({
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnFocus: false,
    pauseOnHover: false,
  })

  $('.media-page__carousel').slick({
    dots: false,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnFocus: false,
    pauseOnHover: false,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
    ]
  })

  //Speakers page letter pinning
  function pinLetters() {
    const letters = $(".speakers-list__letters");
    const parent = $(".speakers-list__outer");

    if (letters.length) {
      letters.css({
        left: parent.offset().left + parent.width() + 50 + 'px',
        top: parent.offset().top + 'px'
      })
    } else {
      return;
    }
  }

  $(window).on('scroll', function () {
    const letters = $(".speakers-list__letters");
    const parent = $(".speakers-list__outer");
    let parentTop = parent.offset().top;
    let parentBottom = parentTop + parent.height() - 100;
    let scrollTop = $(window).scrollTop();

    if (letters.length) {
      if (scrollTop > parentTop - 100 && scrollTop < parentBottom) {
        console.log('fixed')
        letters.addClass('is-fixed');
      } else {
        letters.removeClass('is-fixed');
      }
    } else {
      return;
    }
  })


  /*
  event photos popup
  magnific popup
  https://dimsemenov.com/plugins/magnific-popup/documentation.html
   */
  $('.events-photos__block').each(function () { // the containers for all your galleries
    $(this).magnificPopup({
      delegate: '.events-photo__item-img', // child items selector, by clicking on it popup will open
      disableOn: 200,
      type: 'image',
      image: {
        markup: `<div class="mfp-figure">
                  <div class="mfp-img"></div>
                  <div class="mfp-bottom-bar">
                  <div class="mfp-title"></div>
                  </div>
                 </div>`, // Popup HTML markup. `.mfp-img` div will be replaced with img tag, `.mfp-close` by close butt
        cursor: 'mfp-zoom-out-cur', // Class that adds zoom cursor, will be added to body. Set to null to disable zoom out cursor.
        titleSrc: function (item) {
          return `<h4>${item.el.attr('title')}</h4>
                  <p class="caption">${item.el.data('caption')}<a href="${item.el.attr('href')}" class="btn mfp-btn"
                 download="">Download</a></p>`;
        },
        verticalFit: true, // Fits image in area vertically

        tError: '<a href="%url%">The image</a> could not be loaded.' // Error message
      },
      mainClass: 'mfp-fade',
      removalDelay: 300,
      gallery: {
        enabled: true, // set to true to enable gallery
        preload: [0, 2], // read about this option in next Lazy-loading section
        navigateByImgClick: true,
        arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button
        tPrev: 'Previous (Left arrow key)', // title for left button
        tNext: 'Next (Right arrow key)', // title for right button
      }
    });
  });


  if (isObserver) {
    $(".js-visibility").each((i, el) => {
      observer.observe(el);
    });
  }

  ///Function calls
  pinLetters();

  /* Trigger resize once */
  $(window).resize(function () {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing(wWidth), 500);

    function doneResizing() {
      let width = $(window).width();
      if (wWidth !== width) {
        wWidth = width;

        pinLetters();
      }
    }
  });
});
