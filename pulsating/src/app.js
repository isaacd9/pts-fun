// A demo of convex hull using pts.js. We are using webpack to bundle this demo into 'dist/bundle.js'.
// Source code licensed under Apache License 2.0.
// Copyright © 2017 William Ngan. (https://github.com/williamngan/pts)

import {Color, CanvasSpace, Create, Num} from 'pts';

// Initiate Space and Form
var space = new CanvasSpace('#pts').setup({bgcolor: '#000'});
var form = space.getForm();

let landmarks;

space.add({
  start: (bound, space) => {
    landmarks = Create.radialPts(space.center, space.height / 2.4, 3);
  },
  animate: (time) => {
    //landmarks.map(landmark => form.fill('#fff').point(landmark, 1));

    let radius = (Num.cycle((time % 1000) / 1000) * 30) + 300;
    let color = Num.cycle((time % (255 * 100)) / (255 * 100)) * 128;

    const [redCenter, greenCenter, blueCenter] = landmarks;

    const redScale = Num.normalizeValue(
      redCenter.$subtract(space.pointer).magnitude(), 0, space.height * .90,
    );
    const greenScale = Num.normalizeValue(
      greenCenter.$subtract(space.pointer).magnitude(), 0, space.height * .90,
    );
    const blueScale = Num.normalizeValue(
      blueCenter.$subtract(space.pointer).magnitude(), 0, space.height * .90,
    );

    const c = new Color(color * redScale, color * greenScale, color * blueScale);
    form.fill(c).point(space.center, radius, 'circle');
  }
});

// bind mouse events and play animation
space.bindMouse().bindTouch().play();
