import Animation from './helpers/animation.js';
import Scene2D from './helpers/scene-2d.js';
import _ from './helpers/utils.js';

const IMAGES_PATH = '/img/module-4/lose-images/';

const IMAGES_URLS = Object.freeze({
  keyhole: `${IMAGES_PATH}key.png`,
  crocodile: `${IMAGES_PATH}crocodile.png`,
  watermelon: `${IMAGES_PATH}watermelon.png`,
  flamingo: `${IMAGES_PATH}flamingo.png`,
  snowflake: `${IMAGES_PATH}snowflake.png`,
  leaf: `${IMAGES_PATH}leaf.png`,
  saturn: `${IMAGES_PATH}saturn.png`,
  tear: `${IMAGES_PATH}drop.png`,
});


const OBJECTS = Object.freeze({
  keyhole: {
    imageId: `keyhole`,
    x: 50,
    y: 57,
    size: 20,
    opacity: 0,
    transforms: {
      scaleX: 0.8,
      scaleY: 0.8,
      translateX: -2,
      translateY: -2
    }
  },
  crocodile: {
    imageId: `crocodile`,
    x: 50,
    y: 63,
    size: 90,
    opacity: 1,
    transforms: {
      translateX: 43,
      translateY: -8
    }
  },
  watermelon: {
    imageId: `watermelon`,
    x: 10,
    y: 65,
    size: 17,
    opacity: 1,
    transforms: {
      translateX: 40,
      translateY: -2,
      scaleX: 0,
      scaleY: 0,
    }
  },
  flamingo: {
    imageId: `flamingo`,
    x: 25,
    y: 50,
    size: 17,
    opacity: 1,
    transforms: {
        translateX: 28,
        translateY: 10,
        scaleX: 0,
        scaleY: 0,
    }
  },
  snowflake: {
    imageId: `snowflake`,
    x: 73,
    y: 60,
    size: 14,
    opacity: 1,
    transforms: {
        translateX: -17,
        translateY: -6,
        scaleX: 0,
        scaleY: 0,
    }
  },
  leaf: {
    imageId: `leaf`,
    x: 90,
    y: 42,
    size: 22,
    opacity: 1,
    transforms: {
        translateX: -32,
        translateY: 13,
        scaleX: 0,
        scaleY: 0,
    }
  },
  saturn: {
    imageId: `saturn`,
    x: 90,
    y: 78,
    size: 17,
    opacity: 1,
    transforms: {
        translateX: -30,
        translateY: -18,
        scaleX: 0,
        scaleY: 0,
    }
  },
  tear: {
    imageId: `tear`,
    x: 50,
    y: 66,
    size: 3,
    opacity: 1,
    transforms: {
        translateX: 1.5,
        translateY: 0,
        scaleX: 0,
        scaleY: 0,
    }
  },
});


const LOCALS = Object.freeze({
  blob: {
    startX: 100,
    startY: 0,
    centerX: 45,
    centerY: 55,
    radius: 15,
    endX: 87,
    endY: 53
  }
});


export default class Scene2DCrocodile extends Scene2D {
  constructor() {
    const canvas = document.getElementById(`crocodile-scene`);

    super({
      canvas,
      objects: OBJECTS,
      locals: LOCALS,
      imagesUrls: IMAGES_URLS,
    });

    this.initLocals();

    this.afterInit = () => {
        this.objects.crocodile.after = this.drawBlob.bind(this);
    };

    this.initEventListeners();
    this.initObjects(OBJECTS);
    this.initLocals();
    this.updateSize();
  }


  initLocals() {
    this.locals = {
      blob: {
        startX: LOCALS.blob.startX,
        startY: LOCALS.blob.startY,
        centerX: LOCALS.blob.centerX,
        centerY: LOCALS.blob.centerY,
        radius: LOCALS.blob.radius,
        endX: LOCALS.blob.endX,
        endY: LOCALS.blob.endY
      }
    };
  }


  initEventListeners() {
    window.addEventListener(`resize`, this.updateSize.bind(this));
  }


  initAnimations() {
    this.animations.push(new Animation({
      func: () => {
        this.drawScene();
      },
      duration: `infinite`,
      fps: 60
    }));

    this.initCrocodileAnimations();
    this.initKeyholeAnimations();
    this.initWatermelonAnimations();
    this.initFlamingoAnimations();
    this.initLeafAnimations();
    this.initSaturnAnimations();
    this.initSnowflakeAnimations();
    this.initTearAnimations();
  }


  initKeyholeAnimations() {
    this.animations.push(new Animation({
        func: (progress) => {
          const progressReversed = 1 - progress;
  
          this.objects.keyhole.transforms.scaleX = 0.8 + progress*0.2;
          this.objects.keyhole.transforms.scaleY = 0.8 + progress*0.2;
          this.objects.keyhole.transforms.translateX = 2 * progressReversed;
          this.objects.keyhole.transforms.translateY = 2 * progressReversed;
          this.objects.keyhole.opacity = progress;
        },
        duration: 360,
        delay: 0,
        easing: _.easeLinear
    }));
  }


  initWatermelonAnimations() {
    this.animations.push(new Animation({
        func: (progress) => {
          const progressReversed = 1 - progress;
  
          this.objects.watermelon.transforms.scaleX = progress;
          this.objects.watermelon.transforms.scaleY = progress;
          this.objects.watermelon.transforms.translateX = 40 * progressReversed;
          this.objects.watermelon.transforms.translateY = -2 * progressReversed;
        },
        duration: 600,
        delay: 240,
        easing: _.easeOutCubic
    }));

    this.animations.push(new Animation({
        func: (progress) => {
          this.objects.watermelon.transforms.translateY = 35*progress;
        },
        duration: 360,
        delay: 1200,
        easing: _.easeOutCubic
    }));
  }


  initFlamingoAnimations() {
    this.animations.push(new Animation({
        func: (progress) => {
          const progressReversed = 1 - progress;
  
          this.objects.flamingo.transforms.scaleX = progress;
          this.objects.flamingo.transforms.scaleY = progress;
          this.objects.flamingo.transforms.translateX = 28 * progressReversed;
          this.objects.flamingo.transforms.translateY = 10 * progressReversed;
        },
        duration: 600,
        delay: 240,
        easing: _.easeOutCubic
    }));

    this.animations.push(new Animation({
        func: (progress) => {
          this.objects.flamingo.transforms.translateY = 55*progress;
        },
        duration: 565,
        delay: 1250,
        easing: _.easeOutCubic
    }));
  }


  initLeafAnimations() {
    this.animations.push(new Animation({
        func: (progress) => {
          const progressReversed = 1 - progress;
  
          this.objects.leaf.transforms.scaleX = progress;
          this.objects.leaf.transforms.scaleY = progress;
          this.objects.leaf.transforms.translateX = -32 * progressReversed;
          this.objects.leaf.transforms.translateY = 13 * progressReversed;
        },
        duration: 600,
        delay: 215,
        easing: _.easeOutCubic
    }));

    this.animations.push(new Animation({
        func: (progress) => {
          this.objects.leaf.transforms.translateY = 65*progress;
        },
        duration: 660,
        delay: 1175,
        easing: _.easeOutCubic
    }));
  }


  initFlamingoAnimations() {
    this.animations.push(new Animation({
        func: (progress) => {
          const progressReversed = 1 - progress;
  
          this.objects.flamingo.transforms.scaleX = progress;
          this.objects.flamingo.transforms.scaleY = progress;
          this.objects.flamingo.transforms.translateX = 28 * progressReversed;
          this.objects.flamingo.transforms.translateY = 10 * progressReversed;
        },
        duration: 600,
        delay: 240,
        easing: _.easeOutCubic
    }));

    this.animations.push(new Animation({
        func: (progress) => {
          this.objects.flamingo.transforms.translateY = 55*progress;
        },
        duration: 565,
        delay: 1250,
        easing: _.easeOutCubic
    }));
  }


  initSaturnAnimations() {
    this.animations.push(new Animation({
        func: (progress) => {
          const progressReversed = 1 - progress;
  
          this.objects.saturn.transforms.scaleX = progress;
          this.objects.saturn.transforms.scaleY = progress;
          this.objects.saturn.transforms.translateX = -30 * progressReversed;
          this.objects.saturn.transforms.translateY = -18 * progressReversed;
        },
        duration: 600,
        delay: 240,
        easing: _.easeOutCubic
    }));

    this.animations.push(new Animation({
        func: (progress) => {
          this.objects.saturn.transforms.translateY = 25*progress;
        },
        duration: 260,
        delay: 1200,
        easing: _.easeOutCubic
    }));
  }


  initSnowflakeAnimations() {
    this.animations.push(new Animation({
        func: (progress) => {
          const progressReversed = 1 - progress;
  
          this.objects.snowflake.transforms.scaleX = progress;
          this.objects.snowflake.transforms.scaleY = progress;
          this.objects.snowflake.transforms.translateX = -17 * progressReversed;
          this.objects.snowflake.transforms.translateY = -6 * progressReversed;
        },
        duration: 600,
        delay: 240,
        easing: _.easeOutCubic
    }));

    this.animations.push(new Animation({
        func: (progress) => {
          this.objects.snowflake.transforms.translateY = 42*progress;
        },
        duration: 430,
        delay: 1320,
        easing: _.easeOutCubic
    }));
  }


  initCrocodileAnimations() {
    this.animations.push(new Animation({
        func: (progress) => {
          const progressReversed = 1 - progress;

          this.objects.crocodile.transforms.translateX = 43 * progressReversed;
          this.objects.crocodile.transforms.translateY = -8 * progressReversed;
        },
        duration: 480,
        delay: 1250,
        easing: _.easeLinear
    }));
  }

  initTearAnimations() {
    this.animations.push(new Animation({
        func: (progress, details) => {
            const timing = (details.currentTime - details.startTime) / 1000,
                  timingSin = Math.abs(Math.sin(timing)),
                  timingLinear = timing % 2;
            // console.log(timingLinear);

            if (timingLinear < 1) {
                this.objects.tear.transforms.scaleX = timingLinear;
                this.objects.tear.transforms.scaleY = timingLinear;
                this.objects.tear.transforms.translateX = -1.5 * timingLinear;
                this.objects.tear.transforms.translateY = 0;
                this.objects.tear.opacity = 1;
            } else {
                this.objects.tear.transforms.translateY = (timingLinear - 1)*4;
                this.objects.tear.opacity = 2 - timingLinear;
            }
        },
        duration: `infinite`,
        delay: 1800
    }));
  }


  drawBlob() {
    const b = this.locals.blob;

    const half = this.size / 2,
          all = this.size;

    this.ctx.save();
    this.ctx.globalAlpha = b.opacity;
    this.ctx.fillStyle = `#5f458c`;

    this.ctx.beginPath();
    this.ctx.moveTo(half, 0);
    this.ctx.lineTo(half, all / 2.5);
    this.ctx.arc(
        half,
        half,
        all * 0.1,
        Math.PI * 3 / 2,
        Math.PI / 3.7
    );
    this.ctx.lineTo(all * 0.656, all);
    this.ctx.lineTo(all, all);
    this.ctx.lineTo(all, 0);
    

    this.ctx.fill();
    this.ctx.restore();
  }
}