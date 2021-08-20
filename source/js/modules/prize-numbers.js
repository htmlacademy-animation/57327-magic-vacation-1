export default class prizeNumbers {

    constructor() {
        this.fps = 12;
        this.fpsInterval = 1000 / this.fps;
        this.now;
        this.then = Date.now();
        this.timeStart = Date.now();
        this.timeFromStart = 0;
        this.elapsed;

        this.counters = [
            {
                el: '.prizes__item--journeys',
                start: 1,
                end: 3,
                animId: 'rootAnim',
                startTime: 0,
                active: false,
                done: false
            },
            {
                el: '.prizes__item--cases',
                start: 1,
                end: 7,
                animId: 'rootAnim2',
                startTime: 3500,
                active: false,
                done: false
            },
            {
                el: '.prizes__item--codes',
                start: 11,
                end: 900,
                animId: 'rootAnim3',
                startTime: 5150,
                active: false,
                done: false
            }
        ];

        this.tick = this.tick.bind(this);
    }

    drawPrizeNumbers() {

        this.counters.forEach((counter) => {
            if (this.timeFromStart > counter.startTime && !counter.done) {
                if (!counter.active) {
                    let prizeAnim = document.getElementById(counter.animId);
                    prizeAnim.beginElement();
                }
                counter.active = true;

                let numPlace = document.querySelector(counter.el + ' .prizes__desc b'),
                    numNow = counter.start + parseInt((this.timeFromStart - counter.startTime)/2);
                if (numNow > counter.end) {
                    numNow = counter.end;
                    counter.done = true;
                }
                //console.log(counter.el + ' ' + numNow);
                numPlace.innerText = numNow;
            }
           
        });
    }

    tick() {
        requestAnimationFrame(this.tick);

        this.now = Date.now();
        this.elapsed = this.now - this.then;

        this.timeFromStart = Date.now() - this.timeStart;

        if (this.elapsed > this.fpsInterval) {
            this.then = this.now - (this.elapsed % this.fpsInterval);

            this.drawPrizeNumbers();
        }
    }

};