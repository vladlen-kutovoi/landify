document.addEventListener('DOMContentLoaded', function () {
  toggleMobileMenu();
  turnOnPhone();
  runSlider();
  runObserver();
});

function toggleMobileMenu() {
  const NAV = document.querySelector('.header__nav');
  const MENU_BUTTON = NAV.querySelector('.menu-button');
  const LINK = NAV.querySelectorAll('A');

  MENU_BUTTON.addEventListener('click', function () {
    NAV.classList.toggle('header__nav_active');
    document.body.classList.toggle('no-scroll');
  });

  LINK.forEach(item => {
    item.addEventListener('click', function () {
      NAV.classList.remove('header__nav_active');
      document.body.classList.remove('no-scroll');
    });
  });
}

function turnOnPhone() {
  const PHONE = document.getElementById('phone');
  const BUTTON = document.getElementById('hero-button');
  PHONE.addEventListener('mouseover', playAnimation, ['once']);
  BUTTON.addEventListener('mouseover', playAnimation, ['once']);
  setTimeout(playAnimation, 3500);
  function playAnimation() {
    PHONE.classList.add('active');
  }
}

function runSlider() {
  let slider = tns({
    container: '.brands',
    items: 2,
    gutter: 32,
    controls: false,
    nav: false,
    speed: 1000,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayButton: false,
    autoplayButtonOutput: false,
    touch: false,
    responsive: {
      576: {
        items: 3
      },
      768: {
        items: 5
      },
      992: {
        items: 6
      }
    }
  });
}

function runObserver() {
  function observerCallback(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('faded-in');
      }
    });
  }
  let observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 1
  }
  const OBSERVER = new IntersectionObserver(observerCallback, observerOptions);

  const TARGETS = document.querySelectorAll('.to-be-animated');
  TARGETS.forEach(el => OBSERVER.observe(el));
}