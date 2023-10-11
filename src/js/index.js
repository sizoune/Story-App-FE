// Import our custom CSS
import '../sass/main.scss';

// Import components
import './components/index';

// Import javascript file as needed
import Dashboard from './pages/dashboard';
import AddStory from './pages/add-story';
import AboutUs from './pages/about-us';

const routes = {
  '/': Dashboard,
  '/add-story.html': AddStory,
  '/about-us.html': AboutUs,
};

const detectRoute = () => routes[window.location.pathname];

const initPages = () => {
  const header = document.querySelector('header');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');

  if (header && main && footer) {
    main.style.minHeight = `calc(100vh - ${header.clientHeight + footer.clientHeight}px)`;
  }
};

const initNavbarListener = () => {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbar = document.querySelector('nav');

  navbarToggler.addEventListener('click', function () {
    if (navbarToggler.classList.contains('collapsed')) {
      if (window.scrollY === 0) {
        navbar.classList.remove('scrolled', 'navbar-dark');
      }
    } else {
      navbar.classList.add('scrolled', 'navbar-dark');
    }
  });

  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 0) {
      navbar.classList.add('scrolled', 'navbar-dark');
    } else {
      // only show bg when the toggler is in collapsed mode
      if (navbar.clientHeight < 100) {
        navbar.classList.remove('scrolled', 'navbar-dark');
      }
    }
  });
};

window.addEventListener('DOMContentLoaded', async () => {
  initPages();
  initNavbarListener();

  const route = detectRoute();
  console.log(route);
  route.init();
});
