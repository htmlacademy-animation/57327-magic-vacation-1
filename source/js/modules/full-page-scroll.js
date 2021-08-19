import throttle from 'lodash/throttle';
import prizeNumbers from './prize-numbers.js';

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);

    this.prizeAnimationStart = false;
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    if (!this.screenElements[this.activeScreen].classList.contains('active')) {
      this.changeVisibilityDisplay();
      this.changeActiveMenuItem();
      this.emitChangeDisplayEvent();
    }
  }

  changeVisibilityDisplay() {
    let changeTimeout = 0,
        animateBgEl = document.querySelector('.bg-animation-screen'),
        bodyEl = document.getElementsByTagName('body')[0];

    let activeScreenFooter = document.querySelector('.screen.active .screen__footer, .screen.active .screen__disclaimer');
    if (activeScreenFooter) {
      changeTimeout = 200;

      if (document.querySelector('#prizes').classList.contains('active') && this.screenElements[this.activeScreen].getAttribute('id') == 'rules') {
        document.querySelector('#rules .screen__disclaimer').classList.add('fading-in');
        activeScreenFooter.classList.add('fading');
        document.getElementsByTagName('body')[0].classList.add('footer_bg');
      } else {
          if(document.querySelector('#rules').classList.contains('active') && this.screenElements[this.activeScreen].getAttribute('id') == 'prizes') {
            document.querySelector('#prizes .screen__footer').classList.add('fading-in');
            activeScreenFooter.classList.add('fading');
            document.getElementsByTagName('body')[0].classList.add('footer_bg');
          } else {
            activeScreenFooter.classList.add('hiding');
          }
      }
    }

    if (document.querySelector('#story').classList.contains('active') && this.screenElements[this.activeScreen].getAttribute('id') == 'prizes') {
      changeTimeout = 500;
      animateBgEl.classList.add('animate');
    }

    if (this.screenElements[this.activeScreen].getAttribute('id') == 'story') {
      bodyEl.classList.add('theming');
    } else {
      bodyEl.classList.remove('theming');
    }

    setTimeout(() => {
      if (activeScreenFooter) activeScreenFooter.classList.remove('hiding', 'fading');

      animateBgEl.classList.remove('animate');
      this.screenElements.forEach((screen) => {
        screen.classList.add(`screen--hidden`);
        screen.classList.remove(`active`);
      });
      this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
      setTimeout(() => {
        this.screenElements[this.activeScreen].classList.add(`active`);

        if (this.screenElements[this.activeScreen].getAttribute('id') == 'prizes') {               
          if (!this.prizeAnimationStart) {
            this.prizeAnimationStart = true;
            const prizeNum = new prizeNumbers();
            prizeNum.tick();
          }
        }

        setTimeout(() => {
          document.querySelector('#prizes .screen__footer').classList.remove(`fading-in`);
          document.querySelector('#rules .screen__disclaimer').classList.remove(`fading-in`);
          document.getElementsByTagName('body')[0].classList.remove('footer_bg');
        }, 200);
      }, 10);
    }, changeTimeout);
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
