export default class AccentTypographyBuild {
    constructor(elementSelector, timer, classForActivate, property, easing, animOrder, noWords = true, screenDelay = 0) {
      this._TIME_SPACE = 100;
  
      this._elementSelector = elementSelector;
      this._timer = timer;
      this._classForActivate = classForActivate;
      this._property = property;
      this._easing = easing;
      this._element = document.querySelector(this._elementSelector);
      this._animOrder = animOrder;
      this._timeOffsetDiff = 33;
      
      this._noWords = noWords;
      this._screenDelay = screenDelay;

      this._animCounter = 0;

      this._wordsCount = 0;
      this._maxDelay = Math.max.apply(null, animOrder);

      this.prePareText();
    }
    
    createElement(letter) {
      let spanDelay = this._animOrder[this._animCounter]*this._timeOffsetDiff + this._wordsCount*this._maxDelay*this._timeOffsetDiff + this._screenDelay;
      const span = document.createElement(`span`);
      span.textContent = letter;
      span.style.transition = `${this._property} ${this._timer}ms ${this._easing} ${spanDelay}ms`;
      this._animCounter++;
      if (this._animCounter > this._animOrder.length - 1) this._animCounter = 0;
      return span;
    }
    
    prePareText() {
      if (!this._element) {
        return;
      }
      const text = this._element.textContent.trim().split(` `).filter((latter)=>latter !== '');
  
      const content = text.reduce((fragmentParent, word) => {
        const wordElement = Array.from(word).reduce((fragment, latter) => {
          fragment.appendChild(this.createElement(latter));
          return fragment;
        }, document.createDocumentFragment());
        const wordContainer = document.createElement(`span`);
        wordContainer.classList.add(`text__word`);
        wordContainer.appendChild(wordElement);
        fragmentParent.appendChild(wordContainer);
        if(!this._noWords) this._wordsCount++;
        return fragmentParent;
      }, document.createDocumentFragment());
      
      this._element.innerHTML = ``;
      this._element.appendChild(content);
    }
    
    runAnimation() {
      if (!this._element) {
        return;
      }
      this._element.classList.add(this._classForActivate);
    }
  
    destroyAnimation() {
      this._element.classList.remove(this._classForActivate);
    }
}