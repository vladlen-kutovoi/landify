document.addEventListener('DOMContentLoaded', function () {
  toggleMobileMenu();
  toggleMobileSubmenu();
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
  window.addEventListener('resize', function () {
    if (window.innerWidth > 992) {
      document.body.classList.remove('no-scroll');
    }
  })
}

function toggleMobileSubmenu() {
  const BUTTON = document.getElementById('submenu-enabler');
  const SUBMENU = document.getElementById('submenu');
  BUTTON.addEventListener('click', function () {
    if (window.innerWidth < 992) {
      SUBMENU.classList.toggle('active');
      BUTTON.classList.toggle('active');
    }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 992) {
      SUBMENU.classList.remove('active');
      BUTTON.classList.remove('active');
    }
  });
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
        if (entry.target.classList.contains('to-be-animated')) {
          entry.target.classList.add('faded-in');
        } else if (entry.target.classList.contains('stats')) {
          makeCounter();
        } else if (entry.target.classList.contains('phone-wrapper')) {
          entry.target.classList.add('active');
        };
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

  const PHONE_WRAPPERS = document.querySelectorAll('.phone-wrapper');
  PHONE_WRAPPERS.forEach(el => OBSERVER.observe(el));

  const COUNTERS = document.querySelector('.stats');
  OBSERVER.observe(COUNTERS);
}

function makeCounter() {
  const counters = document.querySelectorAll('.stats__counter');
  let speed = 500;
  counters.forEach(counter => {
    let count = +counter.innerText;
    function updateCount() {
      let target = +counter.getAttribute('data-target');
      let inc = target / speed;
      if (count < target) {
        count += inc;
        counter.innerText = addComaDivider(Math.ceil(count));
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = addComaDivider(target);
      }
    };

    updateCount();
  });

  function addComaDivider(number) {
    if (number >= 1000) {
      let newNumber = number.toString();
      let comas = 0;
      for (let i = newNumber.length - 4; i >= 0; i--) {
        if (!((newNumber.length - i - 1 - comas) % 3)) {
          newNumber = newNumber.slice(0, i + 1) + ',' + newNumber.slice(i + 1);
          comas++;
        }
      }
      return newNumber;
    } else {
      return number;
    }
  }
}