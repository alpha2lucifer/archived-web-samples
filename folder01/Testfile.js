

window.onload = () => {
  let canvas = document.querySelector(".myCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const TAU = Zdog.TAU;
  let isSpinning = true;

  let illo = new Zdog.Illustration({
    element: '.myCanvas',
    dragRotate: true,
    zoom: 0.5,
    onDragStart() {
      isSpinning = false;
    },
    rotate: { x: -TAU/3.3, z: TAU/60 }
  });

  let table = new Zdog.Ellipse({
    addTo: illo,
    stroke: 20,
    width: 300,
    height: 250,
    color: '#0f646f',
    fill: true
  });

  let groupLeg = new Zdog.Group({
    addTo: illo,
  });

  let tableLeg = new Zdog.Shape({
    addTo: groupLeg,
    path: [
      { y: 0 },
      { y: 150 }
    ],
    stroke: 15,
    rotate: { x: TAU/4 },
    translate: { y: 120, z: 5 },
  });

  tableLeg.copy({
    translate: { y: -120, z: 5 }
  });

  tableLeg.copy({
    translate: { x: -145, z: 5 }
  });

  tableLeg.copy({
    translate: { x: 145, z: 5 }
  });

  let chair = new Zdog.Box({
    addTo: illo,
    width: 80,
    height: 80,
    depth: 10,
    translate: { x: -250, z: 70 },
    color: '#64959b',
    scale: 1.5
  });

  let chairGroupLeg = new Zdog.Group({
    addTo: chair,
  });

  let chairLeg = new Zdog.Shape({
    addTo: chairGroupLeg,
    path: [
      { y: 7 },
      { y: 57 }
    ],
    stroke: 12,
    rotate: { x: TAU/4 },
    translate: { x: -25, y: 25 },
  });

  chairLeg.copy({
    translate: { x: -25, y: -25 },
  });

  chairLeg.copy({
    translate: { x: 25, y: -25 },
  });

  chairLeg.copy({
    translate: { x: 25, y: 25 },
  });

  let chairBack = new Zdog.Shape({
    addTo: chair,
    path: [
      { x: -40, y: 40, z: 0 },
      { x: -40, y: 40, z: -100 }
    ],
    stroke: 8,
  });

  chairBack.copy({
    translate: { y: -80 }
  });

  let back = new Zdog.Shape({
    addTo: chair,
    path: [
      { x: -40, y: 40, z: -100 },
      { x: -40, y: -40, z: -100 }
    ],
    stroke: 5
  });

  back.copy({
    rotate: { x: TAU/2 },
    translate: { z: -170 }
  });

  back.copy({
    rotate: { x: TAU/2 },
    translate: { z: -140 }
  });

  back.copy({
    rotate: { x: TAU/2 },
    translate: { z: -110 }
  });

  chair.copyGraph({
    translate: { y: -250, z: 70 },
    rotate: { z: TAU/4 }
  });

  chair.copyGraph({
    translate: { x: 250, z: 70 },
    rotate: { z: TAU/2 }
  });

  let gr = new Zdog.Group({
    addTo: chair,
  });

  let gr2 = new Zdog.Group({
    addTo: chair,
    translate: { x: 330, z: -30 },
  });

  let gift2 = new Zdog.Box({
    addTo: gr2,
    width: 55,
    height: 55,
    depth: 55,
    color: '#edef00',
  });

  new Zdog.Rect({
    addTo: gr2,
    stroke: 25,
    width: 60,
    height: 60,
    translate: { z: -20 },
    color: '#40b08d',
    fill: true
  });

  let gift = new Zdog.Box({
    addTo: gr,
    width: 50,
    height: 50,
    depth: 50,
    translate: { z: -30 },
    color: '#39df47'
  });

  let tape = new Zdog.Rect({
    addTo: gr,
    stroke: 1,
    width: 10,
    height: 50,
    fill: true,
    rotate: { x: TAU/4 },
    translate: { y: -25, z: -30 },
    backface: false,
    color: '#5436ba'
  });

  tape.copy({
    rotate: { x: TAU/2 },
    translate: { y: 0, z: -55 }
  });

  tape.copy({
    rotate: { x: -TAU/4 },
    translate: { y: 25, z: -30 }
  });

  tape.copy({
    width: 50,
    height: 10,
    rotate: { x: TAU/2 },
    translate: { y: 0, z: -55 }
  });

  tape.copy({
    rotate: { x: TAU/4, y: TAU/4 },
    translate: { x: -25, y: 0, z: -30 }
  });

  tape.copy({
    rotate: { x: -TAU/4, y: -TAU/4 },
    translate: { x: 25, y: 0, z: -30 }
  });

  let plate = new Zdog.Ellipse({
    addTo: table,
    stroke: 5,
    width: 80,
    height: 80,
    fill: true,
    translate: { z: -10 },
    rotate: { y: TAU/2 }
  });

  let cake = new Zdog.Cylinder({
    addTo: plate,
    diameter: 80,
    length: 60,
    stroke: false,
    translate: { z: 30 },
    color: '#ffb2b5',
    frontFace: '#ad0007'
  });

  cake.copy({
    diameter: 50,
    length: 40,
    translate: { z: 80 }
  });

  let berry = new Zdog.Shape({
    addTo: illo,
    stroke: 5,
    color: '#000b80',
    translate: { x: 33, y: 1, z: -70 }
  });

  let berry2 = new Zdog.Hemisphere({
    addTo: illo,
    diameter: 10,
    stroke: false,
    color: '#e3eb00',
    translate: { x: 27, y: -19, z: -71.5 },
    backface: '#93eb00'
  });

  berry.copy({
    translate: { x: 32, y: -8, z: -70 },
    color: '#ed0028',
  });

  berry.copy({
    translate: { x: 18, y: -27, z: -70 },
    color: '#111111',
  });

  berry.copy({
    translate: { x: 9, y: -31, z: -70 },
    color: '#ed0028',
  });

  berry2.copy({
    color: '#414141',
    translate: { x: -4, y: -32, z: -71.5 },
    backface: '#e1e1e1'
  });

  berry.copy({
    translate: { x: -14, y: -30, z: -70 },
    color: '#111111',
  });

  berry.copy({
    translate: { x: -22, y: -25, z: -70 },
    color: '#d70024',
  });

  berry.copy({
    translate: { x: -28, y: -19, z: -70 },
    color: '#0010b8',
  });

  berry2.copy({
    color: '#00d728',
    translate: { x: -32, y: -9, z: -71.5 },
    backface: '#8affa0'
  });

  berry.copy({
    translate: { x: -33, y: 1, z: -70 },
    color: '#005610',
  });

  berry.copy({
    translate: { x: -32, y: 10, z: -70 },
    color: '#336a3d',
  });

  berry.copy({
    translate: { x: -28, y: 18, z: -70 },
    color: '#7e6f3c',
  });

  let berry3 = new Zdog.Shape({
    addTo: illo,
    stroke: 10,
    color: '#e1961e',
    translate: { x: -20, y: 25, z: -70 }
  });

  berry.copy({
    translate: { x: -11, y: 29, z: -70 },
    color: '#073536',
  });

  berry.copy({
    translate: { x: -3, y: 31, z: -70 },
    color: '#a9d7ab',
  });

  berry.copy({
    translate: { x: 5, y: 31, z: -70 },
    color: '#f0ad90',
  });

  berry2.copy({
    color: '#e13270',
    translate: { x: 15, y: 28, z: -71.5 },
    backface: '#d698ae'
  });

  berry.copy({
    translate: { x: 24, y: 23, z: -70 },
    color: '#073536',
  });

  berry.copy({
    translate: { x: 28, y: 17, z: -70 },
    color: '#a9d7ab',
  });

  berry.copy({
    translate: { x: 32, y: 9, z: -70 },
    color: '#f0ad90',
  });

  let stick = new Zdog.RoundedRect({
    addTo: cake,
    stroke: 1,
    height: 14,
    translate: { x: 15, y: 10, z: 75 },
    rotate: { x: TAU/4, z: -TAU/24 },
    color: '#fff'
  });

  let lollypop = new Zdog.Ellipse({
    addTo: stick,
    stroke: 5,
    diameter: 10,
    translate: { y: 15 },
    color: '#c33624',
    fill: true
  });

  let a = new Zdog.Shape({
    addTo: lollypop,
    path: [
      { x: 5, y: -2 },
      { arc: [
        { x : 0, y: -2 },
        { x: 0, y: 3 }
      ] },
      { x: 0, y: 3 },
      { arc: [
        { x: -3, y: 1 },
        { x: -5, y: 4 },
        { x: -8, y: 9 }
      ] },
      { x: -6, y: 1 },
      { arc: [
        { x: 3, y: -2 },
        { x: 3, y: -4 }
      ] }
      ],
      closed: false,
      stroke: 1,
      translate: { z: 3 },
      color: '#30bdcf'
  });

  stick.copyGraph({
    translate: { x: 8, y: 18, z: 75 },
    rotate: { x: TAU/4, z: TAU/24 },
  });

  stick.copyGraph({
    translate: { x: -1, y: 10, z: 75 },
    rotate: { x: TAU/4, z: TAU/24 },
  });

  let donut = new Zdog.Ellipse({
    addTo: cake,
    diameter: 10,
    stroke: 4,
    color: '#282613',
    translate: { x: -10, y: -15, z: 72 },
  });

  donut.copy({
    translate: { x: -10, y: -5, z: 72 },
    color: '#fff',
    rotate: { x: TAU/3 }
  });

  let cookie = new Zdog.Ellipse({
    addTo: cake,
    diameter: 5,
    stroke: 1.5,
    color: '#fff',
    fill: true,
    translate: { x: -10, y: 5, z: 71 }
  });

  let upCookiePart = new Zdog.Ellipse({
    addTo: cookie,
    diameter: 8,
    stroke: 1,
    color: '#000',
    fill: true,
    translate: { z: 1 }
  });

  let downCookiePart = new Zdog.Ellipse({
    addTo: cookie,
    diameter: 8,
    stroke: 1,
    color: '#000',
    fill: true,
    translate: { z: -1 }
  });

  cookie.copyGraph({
    translate: { x: 3, y: -5, z: 71 }
  });

  cookie.copyGraph({
    translate: { x: 2.5, y: -16.5, z: 71 }
  });

  cookie.copyGraph({
    translate: { x: 13.5, y: -11.5, z: 71 }
  });

  let chocolate = new Zdog.Rect({
    addTo: cake,
    stroke: 2,
    width: 10,
    height: 20,
    color: '#1c1c18',
    fill: true,
    translate: { x: 17, y: -1, z: 77 },
    rotate: { x: TAU/4, z: -TAU/12 }
  });

  chocolate.copy({
    translate: { x: -12.5, y: 17, z: 77 },
    rotate: { x: TAU/4, z: TAU/12 },
    color: '#1e1c00'
  });

  let head = new Zdog.Shape({
    addTo: illo,
    stroke: 150,
    color: '#ff0',
    translate: { y: 250, z: -185 },
  });

  let eye = new Zdog.Ellipse({
    addTo: head,
    diameter: 4,
    quarters: 2,
    stroke: 0.8,
    color: '#1e9c73',
    translate: { x: -27.75, y: -53.25 },
    backface: false,
    scale: 9,
    rotate: { x: TAU/4, z: -TAU/4 }
  });

  eye.copy({
    translate: { x: 27.75, y: -53.25 }
  });

  new Zdog.Ellipse({
    addTo: head,
    diameter: 3,
    quarters: 1,
    stroke: 0.8,
    color: '#1e9c73',
    translate: { y: -53.25, z: 21.3 },
    backface: false,
    scale: 9,
    rotate: { x: TAU/4, z: -TAU/8 }
  });

  new Zdog.Ellipse({
    addTo: head,
    diameter: 6,
    quarters: 2,
    rotate: { x: TAU/4, z: TAU/4 },
    translate: { y: -53.25, z: 21.3 },
    stroke: 0.6,
    closed: true,
    color: '#ffffff',
    backface: false,
    fill: true,
    scale: 10.5
  });

  let chest = new Zdog.Shape({
    addTo: illo,
    path: [ { x: -5.7 }, { x: 5.7 } ],
    translate: { y: 245, z: -78 },
    rotate: { z: TAU/2 },
    stroke: 85.2,
    color: '#eac69e',
    scale: 6
  });

  let hips = new Zdog.Shape({
    addTo: chest,
    path: [ { x: -8.5 }, { x: 8.5 } ],
    translate: { z: 9 },
    rotate: { z: TAU/2 },
    stroke: 27,
    color: '#f9c8b6',
  });

  let leg = new Zdog.Shape({
    addTo: hips,
    path: [ { x: 0 }, { x: 25 } ],
    translate: { x: -7.1, z: 1 },
    color: '#f9c8b6',
    stroke: 33,
    rotate: { y: TAU/4 }
  });

  new Zdog.RoundedRect({
    addTo: leg,
    color: '#9ac26b',
    stroke: 22.5,
    width: 2,
    height: 6,
    translate: { x: 28, y: -2 },
    fill: true,
    rotate: { y: TAU/4 }
  });

  leg.copyGraph({
    translate: { x: 7.1, z: 1 },
    rotate: { y: TAU/4 }
  });

  let upperArm = new Zdog.Shape({
    addTo: chest,
    path: [ { y: 0 }, { y: 7.0 } ],
    translate: { x: -13, y: 1, z: -2 },
    color: '#8b4f99',
    stroke: 33,
    rotate: { x: -TAU/8 },
    scale: 1.3
  });

  let forearm = new Zdog.Shape({
    addTo: upperArm,
    path: [ { y: 0 }, { y: 5.5 } ],
    color: '#92f8ed',
    stroke: 33,
    translate: { y: 8.0 },
    scale: 1.3
  });

  new Zdog.Ellipse({
    addTo: forearm,
    path: [ { y: 0 }, { y: 8.0 } ],
    color: '#92f8ed',
    stroke: 33,
    translate: { y: 6.5 }
  });

  upperArm.copyGraph({
    translate: { x: 13, y: 1, z: -2 },
    rotate: { x: -TAU/8 }
  });

  let partyHat = new Zdog.Cone({
    addTo: head,
    diameter: 110,
    length: 140,
    stroke: false,
    color: '#636',
    backface: '#C25',
    rotate: { x: TAU/2 },
    translate: { z: -60 }
  });

  let tree = new Zdog.Shape({
    addTo: illo,
    stroke: 50,
    path: [
      { x: 0 },
      { x: 300 }
    ],
    color: '#3f5557',
    rotate: { y: TAU/4 },
    translate: { x: -300, y: 950, z: -150 }
  });

  let d = new Zdog.Shape({
    addTo: tree,
    stroke: 135,
    translate: { x: -55, z: 20 },
    color: '#168116'
  });

  d.copy({
    translate: { x: -55, z: -30 }
  });

  d.copy({
    translate: { x: -115, z: -1 }
  });

  tree.copyGraph({
    translate: { x: 250, y: 750, z: -150 }
  });

  tree.copyGraph({
    translate: { x: 50, y: 850, z: -150 }
  });

  tree.copyGraph({
    translate: { x: -150, y: 650, z: -150 }
  });

  let cloud = new Zdog.Shape({
    addTo: illo,
    stroke: 110,
    color: '#fff',
    translate: { x: -300, y: 1150, z: -550 }
  });

  cloud.copy({
    translate: { x: -260, y: 1230, z: -550 }
  });

  cloud.copy({
    translate: { x: -210, y: 1230, z: -580 }
  });

  cloud.copy({
    stroke: 90,
    translate: { x: -260, y: 1230, z: -620 }
  });

  cloud.copy({
    translate: { x: 50, y: 1150, z: -550 }
  });

  cloud.copy({
    translate: { x: 0, y: 1150, z: -550 }
  });

  cloud.copy({
    translate: { x: 90, y: 1150, z: -560 }
  });

  cloud.copy({
    stroke: 70,
    translate: { x: 40, y: 1150, z: -600 }
  });

  cloud.copy({
    translate: { x: -150, y: 1650, z: -720 }
  });

  cloud.copy({
    translate: { x: -200, y: 1650, z: -720 }
  });

  cloud.copy({
    translate: { x: -90, y: 1650, z: -730 }
  });

  cloud.copy({
    stroke: 70,
    translate: { x: -190, y: 1650, z: -770 }
  });

  let sun = new Zdog.Shape({
    addTo: illo,
    stroke: 200,
    color: '#fff066',
    translate: { x: -200, y: 1450, z: -700 }
  });

  let letterH = new Zdog.Shape({
    addTo: illo,
    path: [
      { x: -600, y: 450, z: -200 },
      { x: -600, y: 450, z: -100 },
      { x: -600, y: 450, z: -150 },
      { x: -550, y: 450, z: -150 },
      { x: -550, y: 450, z: -200 },
      { x: -550, y: 450, z: -100 }
    ],
    stroke: 10,
    closed: false,
    color: '#e1341e'
  });

  let letterA = letterH.copy({
    path: [
      { x: -500, y: 450, z: -100 },
      { x: -475, y: 450, z: -200 },
      { x: -450, y: 450, z: -100 },
      { x: -462.5, y: 450, z: -140 },
      { x: -490, y: 450, z: -140 }
    ],
    color: '#1ecbe1'
  });

  let letterP = letterH.copy({
    path: [
      { x: -400, y: 450, z: -100 },
      { x: -400, y: 450, z: -200 }
    ],
    color: '#fff74c'
  });

  let semicircle = new Zdog.Ellipse({
    addTo: letterP,
    stroke: 10,
    quarters: 2,
    diameter: 60,
    translate: { x: -400, y: 450, z: -173 },
    rotate: { x: TAU/4 },
    color: '#fff74c'
  });

  letterP.copyGraph({
    translate: { x: 90 }
  });

  let letterY = letterH.copy({
    path: [
      { x: -200, y: 450, z: -100 },
      { x: -200, y: 450, z: -160 },
      { x: -225, y: 450, z: -200 },
      { x: -200, y: 450, z: -160 },
      { x: -175, y: 450, z: -200 }
    ],
    color: '#ff864c'
  });

  let letterB = letterH.copy({
    path: [
      { x: 0, y: 450, z: -100 },
      { x: 0, y: 450, z: -200 }
    ],
    color: '#1ecbe1'
  });

  semicircle.copy({
    addTo: letterB,
    width: 75,
    height: 50,
    translate: { x: 0, y: 450, z: -176 },
    color: '#1ecbe1'
  });

  semicircle.copy({
    addTo: letterB,
    width: 75,
    height: 50,
    translate: { x: 0, y: 450, z: -124 },
    color: '#1ecbe1'
  });

  let letterI = letterH.copy({
    path: [
      { x: 75, y: 450, z: -100 },
      { x: 125, y: 450, z: -100 },
      { x: 100, y: 450, z: -100 },
      { x: 100, y: 450, z: -200 },
      { x: 75, y: 450, z: -200 },
      { x: 125, y: 450, z: -200 }
    ],
    color: '#9aff72'
  });

  let letterR = letterH.copy({
    path: [
      { x: 180, y: 450, z: -100 },
      { x: 180, y: 450, z: -200 }
    ],
    color: '#ff864c'
  });

  semicircle.copy({
    translate: { x: 180, y: 450, z: -173 },
    color: '#ff864c'
  });

  new Zdog.Shape({
    addTo: letterR,
    stroke: 10,
    path: [
      { x: 180, y: 450, z: -150 },
      { x: 215, y: 450, z: -100 }
    ],
    color: '#ff864c'
  });

  let letterT = letterH.copy({
    path: [
      { x: 280, y: 450, z: -100 },
      { x: 280, y: 450, z: -200 },
      { x: 255, y: 450, z: -200 },
      { x: 305, y: 450, z: -200 }
    ],
    color: '#5435ff'
  });

  letterH.copy({
    translate: { x: 960 }
  });

  let letterD = letterH.copy({
    path: [
      { x: 470, y: 450, z: -100 },
      { x: 470, y: 450, z: -200 }
    ],
    color: '#9aff72'
  });

  semicircle.copy({
    diameter: 105,
    translate: { x: 470, y: 450, z: -150 },
    color: '#9aff72'
  });

  letterA.copy({
    translate: { x: 1060 }
  });

  letterY.copy({
    translate: { x: 870 }
  });

  new Zdog.Shape({
    addTo: illo,
    path: [
      { x: -500, y: 300, z: -350 },
      { x: -500, y: 300, z: -200 }
    ],
    stroke: 5,
    color: '#303030',
    rotate: { y: -TAU/8 },
    translate: { z: -200 }
  });

  new Zdog.Ellipse({
    addTo: illo,
    width: 50,
    height: 75,
    stroke: 50,
    fill: true,
    color: '#3881e4',
    translate: { x: -645, y: 300, z: -135 },
    rotate: { x: TAU/4, z: -TAU/8 }
  });

  new Zdog.Shape({
    addTo: illo,
    path: [
      { x: -495, y: 300, z: -350 },
      { x: -495, y: 300, z: -200 }
    ],
    stroke: 5,
    color: '#303030',
    translate: { z: 212 }
  });

  new Zdog.Ellipse({
    addTo: illo,
    width: 50,
    height: 75,
    stroke: 50,
    fill: true,
    color: '#f64a4a',
    translate: { x: -495, y: 300, z: -200 },
    rotate: { x: -TAU/4 }
  });

  new Zdog.Shape({
    addTo: illo,
    path: [
      { x: -400, y: 300, z: -350 },
      { x: -400, y: 300, z: -200 }
    ],
    stroke: 5,
    color: '#303030',
    rotate: { y: TAU/8 },
    translate: { x: -352, z: 435 }
  });

  new Zdog.Ellipse({
    addTo: illo,
    width: 50,
    height: 75,
    stroke: 50,
    fill: true,
    color: '#f6dc4a',
    translate: { x: -350, y: 300, z: -140 },
    rotate: { x: TAU/4, z: TAU/8 }
  });

  new Zdog.Shape({
    addTo: illo,
    path: [
      { x: -500, y: 300, z: -350 },
      { x: -500, y: 300, z: -200 }
    ],
    stroke: 5,
    color: '#303030',
    rotate: { y: -TAU/8 },
    translate: { x: 1000, z: -200 }
  });

  new Zdog.Ellipse({
    addTo: illo,
    width: 50,
    height: 75,
    stroke: 50,
    fill: true,
    color: '#f64a4a',
    translate: { x: 355, y: 300, z: -135 },
    rotate: { x: TAU/4, z: -TAU/8 }
  });

  new Zdog.Shape({
    addTo: illo,
    path: [
      { x: -495, y: 300, z: -350 },
      { x: -495, y: 300, z: -200 }
    ],
    stroke: 5,
    color: '#303030',
    translate: { x: 1000, z: 212 }
  });

  new Zdog.Ellipse({
    addTo: illo,
    width: 50,
    height: 75,
    stroke: 50,
    fill: true,
    color: '#f6dc4a',
    translate: { x: 505, y: 300, z: -200 },
    rotate: { x: -TAU/4 }
  });

  new Zdog.Shape({
    addTo: illo,
    path: [
      { x: -400, y: 300, z: -350 },
      { x: -400, y: 300, z: -200 }
    ],
    stroke: 5,
    color: '#303030',
    rotate: { y: TAU/8 },
    translate: { x: 647, z: 437 }
  });

  new Zdog.Ellipse({
    addTo: illo,
    width: 50,
    height: 75,
    stroke: 50,
    fill: true,
    color: '#3881e4',
    translate: { x: 650, y: 300, z: -140 },
    rotate: { x: TAU/4, z: TAU/8 }
  });

  function animate() {
    illo.rotate.z += isSpinning ? 0.02 : 0;
    illo.updateRenderGraph();
    requestAnimationFrame( animate );
  }

  animate();
};
