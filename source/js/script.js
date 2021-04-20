// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import AccentTypographyBuild from './modules/accent-text';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

window.addEventListener('DOMContentLoaded', function () {
    let bodyEl = document.getElementsByTagName('body')[0];
    bodyEl.classList.add('loaded');
    setTimeout(() => {
        let pageHeaderEl = document.querySelector('.page-header__nav');
        pageHeaderEl.classList.remove('start_state');
    }, 500);
    
});

const animationTopScreenTitle = new AccentTypographyBuild(`.intro__title`, 635, `active`, `transform`, `ease`, [4,2,0,2,3,2,0,6,3,0,3,1,4,5,3,0,4,1], false),
      animationTopScreenDate = new AccentTypographyBuild(`.intro__date`, 635, `active`, `transform`, `ease`, [3,2,0,4,1,0,2,5,2,0,4,3,1], true, 600),
      animationStoryScreenTitle = new AccentTypographyBuild(`.screen--story .slider__item-title`, 635, `active`, `transform`, `ease`, [4,2,0,2,3,2,0]),
      animationPrizesScreenTitle = new AccentTypographyBuild(`.prizes__title`, 635, `active`, `transform`, `ease`, [4,2,0,2,3]),
      animationRulesScreenTitle = new AccentTypographyBuild(`.rules__title`, 635, `active`, `transform`, `ease`, [5,2,1,0,3,2,0]),
      animationGameScreenTitle = new AccentTypographyBuild(`.game__title`, 635, `active`, `transform`, `ease`, [6,3,0,2]);