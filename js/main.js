$(document).ready(function () {
  let isObserver = true; //for scroll reveal
  let observer; //for scroll reveal
  let resizeId; // for resize timer
  let wWidth = $(window).width(); // for resize

  function disableScrolling() {
    if ($(document).height() > $(window).height()) {
      var scrollTop = $('html').scrollTop()
        ? $('html').scrollTop()
        : $('body').scrollTop(); // Works for Chrome, Firefox, IE...
      $('html')
        .addClass('disable-scrolling')
        .css('top', -scrollTop);
    }
  }

  function enableScrolling() {
    var scrollTop = parseInt($('html').css('top'));
    $('html').removeClass('disable-scrolling');
    $('html,body').scrollTop(-scrollTop);
  }

  function isMobile() {
    if ($('.is-mobile').css('display') === 'block') {
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


  //Scroll revealing animation
  if (
    !('IntersectionObserver' in window) ||
    !('IntersectionObserverEntry' in window) ||
    !('isIntersecting' in window.IntersectionObserverEntry.prototype)
  ) {
    isObserver = false;
    $('html').removeClass('is-observer');
  }

  if (isObserver) {
    observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {rootMargin: '0px 0px -15% 0px'}
    );
  }


  $('.scroll-link').on('click', e => {
    let target = $(this).attr('href');
    $('html,body').animate(
      {
        scrollTop: $(target).offset().top
      },
      1000
    );
  });

  /*  HEADER */
  //reseting header

  function headerReset() {
    enableScrolling();
    $('.header__inner-mob').removeClass('is-active');
    $('.header__hamburger').removeClass('is-active');
  }

  $('.header__hamburger').on('click', function (e) {
    e.stopPropagation();
    if ($('html').hasClass('disable-scrolling')) {
      enableScrolling();
    } else {
      disableScrolling();
    }

    $(this).toggleClass('is-active');
    $('.header__inner-mob').toggleClass('is-active');
  });

  /* End header */

  $('.home-hero__carousel').slick({
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnDotsHover: true,
  });

  /* Trigger resize once */
  $(window).resize(function () {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing(wWidth), 500);

    function doneResizing() {
      let width = $(window).width();
      if (wWidth !== width) {
        wWidth = width;
      }
    }
  });

});
