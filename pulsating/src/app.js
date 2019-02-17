// A demo of convex hull using pts.js. We are using webpack to bundle this demo into 'dist/bundle.js'.
// Source code licensed under Apache License 2.0.
// Copyright © 2017 William Ngan. (https://github.com/williamngan/pts)

import {Color, CanvasSpace, Create, Num} from 'pts';

// Initiate Space and Form
var space = new CanvasSpace('#pts').setup({bgcolor: '#123'});
var form = space.getForm();

let landmarks;

space.add({
  start: (bound, space) => {
    landmarks = Create.radialPts(space.center, space.height / 2.3, 3);
  },
  animate: (time, ftime) => {
    //landmarks.map(landmark => form.fill('#FF').point(landmark, 10));

    let radius = (Num.cycle((time % 1000) / 1000) * 30) + 100;
    let color = Num.cycle((time % (255 * 10)) / (255 * 10)) * 128;

    const [redCenter, greenCenter, blueCenter] = landmarks;

    const redScale = Num.normalizeValue(
      redCenter.$subtract(space.pointer).magnitude(), 0, space.height * .80,
    );
    console.log(redScale);
    const greenScale = Num.normalizeValue(
      greenCenter.$subtract(space.pointer).magnitude(), 0, space.height * .80,
    );
    const blueScale = Num.normalizeValue(
      blueCenter.$subtract(space.pointer).magnitude(), 0, space.height * .80,
    );

    const c = new Color(color * redScale, color * greenScale, color * blueScale);
    form.fill(c).point(space.center, radius, 'circle');
  }
});

// bind mouse events and play animation
space.bindMouse().bindTouch().play();
