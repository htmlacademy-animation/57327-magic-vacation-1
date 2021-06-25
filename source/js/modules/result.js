export default () => {
  let showResultEls = document.querySelectorAll(`.js-show-result`);
  let results = document.querySelectorAll(`.screen--result`);

  const WinAnimationElement = document.querySelector('#winTitleAnim'),
        WinAnimationElement2 = document.querySelector('#winTitleAnim2'),
        WinAnimationElement3 = document.querySelector('#winTitleAnim3');
  
  let WinPaths = document.querySelectorAll('.screen--result .result__title svg path');
  [].slice.call(WinPaths).forEach(function (el) {
    let pathLength = Math.round(el.getTotalLength());
    el.setAttribute('stroke-dasharray', '0 ' + pathLength/2);
    let pathAnim = el.querySelector('animate');
    if (pathAnim) pathAnim.setAttribute('values', '0 ' + pathLength/2 + '; ' + pathLength/2 + ' 0');
  });

  if (results.length) {
    for (let i = 0; i < showResultEls.length; i++) {
      showResultEls[i].addEventListener(`click`, function () {
        let target = showResultEls[i].getAttribute(`data-target`);
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        let targetEl = [].slice.call(results).filter(function (el) {
          return el.getAttribute(`id`) === target;
        });
        targetEl[0].classList.add(`screen--show`);
        targetEl[0].classList.remove(`screen--hidden`);

        if (target == 'result') {
          WinAnimationElement.beginElement();
        }
        if (target == 'result2') {
          WinAnimationElement2.beginElement();
        }
        if (target == 'result3') {
          WinAnimationElement3.beginElement();
        }
      });
    }

    let playBtn = document.querySelector(`.js-play`);
    if (playBtn) {
      playBtn.addEventListener(`click`, function () {
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        document.getElementById(`messages`).innerHTML = ``;
        document.getElementById(`message-field`).focus();
      });
    }
  }
};
