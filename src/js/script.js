document.addEventListener('DOMContentLoaded', function () {
  toggleMobileMenu();
  turnOnPhone();
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
  setTimeout(playAnimation, 5000);
  function playAnimation() {
    PHONE.classList.add('active');
  }
}