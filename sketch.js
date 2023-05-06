// let pause = true;

let dis;
let display = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
let reScale = 3;
let d;

let logo, logo2;
let txt;
let words = [];

let iScale = 20;

let textDis;
let tilesXtext = 10;
let tilesYtext = 5;
let tileWtext, tileHtext;

let profile;
let name, nameDis;
let bio;
let bioDis = [];
let bioDis2 = [];
let bioX = [];
let bioH = [];
let moveX = 0;
let direction;

let myFont = [];

let tilesXbg = 5;
let tilesYbg = 8;

let tilesXimg = 5;
let tilesYimg = 30;

let pattern;
let patternDis;
let shape;

let img = [];
let bg = [];

let colorSet = [];
let luck = [];
let luck2 = [];

let pixelXimg, pixelYimg;
let pixelColorImg = [];

let pixelXbg, pixelYbg;
let pixelColorBg = [];

function preload() {
  data = loadJSON("profile.json");
  for (let i = 0; i < 15; i++) {
    img[i] = loadImage("img/" + i + ".png");
  }
  for (let i = 0; i < 15; i++) {
    bg[i] = loadImage("bg/" + i + ".png");
  }

  logo = loadImage("logo/logo.png");
  logo2 = loadImage("logo/logo-ngang.png");

  txt = loadStrings("ssbd.txt");

  myFont = ["Noto Sans", "Noto Serif", "Noto Sans Mono"];
}

function setup() {
  // noLoop();
  createCanvas(windowWidth, windowHeight);
  background(0);

  pattern = createGraphics(500, 300);

  textDis = createGraphics(500, 160);

  shape = createGraphics(500, 300);
  shape.rect(0, 0, 500, 300, 20);

  dis = random(display);

  for (let i = 0; i < 1800; i++) {
    myFont[i] = random(myFont);
    colorSet[i] = random(100, 225);
    luck[i] = round(random(-1, 1));
    luck2[i] = round(random(-1, 1));

    pixelXimg = random(img[dis].width);
    pixelYimg = random(img[dis].height);
    pixelColorImg[i] = img[dis].get(pixelXimg, pixelYimg);

    pixelXbg = random(bg[dis].width);
    pixelYbg = random(bg[dis].height);
    pixelColorBg[i] = bg[dis].get(pixelXbg, pixelYbg);
    bioX[i] = random(-10, 300);
    bioH[i] = random(170, 300);
  }

  img[dis].resize(30, 17.7); // resizes image to window size

  profile = data.profile;

  name = profile[dis].name;
  nameDis = name.split(" ");

  bio = profile[dis].bio;

  direction = random(-0.1, 0.1);
  // print(direction)

  // if (pause == true) {
  //   noLoop();
  // }
}

function draw() {
  background(0);
  drawPattern(dis);
  d = dist(mouseX, mouseY, windowWidth / 2, windowHeight);
  if (d < 150) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }

  push();
  translate(width / 2, height / 2);
  // patternDis.resize(windowWidth / 2, 0);

  imageMode(CENTER);

  tint(255, map(mouseX, 0, width, 65, 90));
  image(patternDis, 0, 0, 820, 480);

  blendMode(HARD_LIGHT);
  tint(255, 35);
  image(patternDis, 0, 0, 820, 480);
  pop();

  imageMode(CORNER);
  
  image(logo2, -width / 150, -width / 180, width + 20, width / 16);

  push();
  translate(width / 2 - 655 / 2, height / 2 + height / 6);
  drawDescription();
  pop();

  push();
  translate(width / 2, height / 2 + height / 2.2);
  fill(255);
  textSize(18);
  textAlign(CENTER);
  textFont("Noto Sans Mono");
  text("< explore >", 0, 0);
  pop();
}

function drawDescription() {
  textSize(18);
  textAlign(CENTER);
  for (let i = 0; i < txt.length; i++) {
    words = txt[i].split("");
    let offset = 0;
    let leading = 0;
    let count = 0;
    for (let j = 0; j < words.length; j++) {
      let wordWidth = textWidth(words[j]);
      // textAlign(CENTER)
      textSize(16.5);
      textFont("Noto Sans Mono");
      fill(255, colorSet[j]);
      text(words[j], offset, leading);
      offset += wordWidth;
      if (offset > 655) {
        leading += 23;
        offset = 0;
      }
      count++;
    }
  }
}

function drawPattern(dis) {
  pattern.background(0);
  bg[dis].loadPixels();
  img[dis].loadPixels();

  let count = 0;

  // Draw background
  let tileWbg = pattern.width / tilesXbg;
  let tileHbg = pattern.height / tilesYbg;

  for (let y = 0; y < tilesYbg; y++) {
    for (let x = 0; x < tilesXbg; x++) {
      if (luck2[count] != 0) {
        pattern.strokeWeight(0.5);
        pattern.stroke(pixelColorBg[count]);
        pattern.fill(pixelColorBg[count]);
        pattern.rect(x * tileWbg, y * tileHbg, tileWbg, tileHbg);
        count++;
      } else {
        pattern.noStroke();
        pattern.noFill();
        pattern.rect(x * tileWbg, y * tileHbg, tileWbg, tileHbg);
        count++;
      }
    }
  }

  // Draw pixel profile

  let density;

  for (let y = 0; y < img[dis].height; y++) {
    for (let x = 0; x < img[dis].width; x++) {
      let index = (x + y * img[dis].width) * 4;
      let r = img[dis].pixels[index + 0]; //pixel Red
      let g = img[dis].pixels[index + 1]; //pixel Green
      let b = img[dis].pixels[index + 2]; //Pixel Blue
      let bright = (r + g + b) / 3;

      if (dis == 2 || dis == 8) {
        density = map(mouseX, 0, width, 190, 210);
      } else {
        density = map(mouseX, 0, width, 15, 150);
      }

      if (bright > density) {
        pattern.fill(r, g, b, map(mouseX, 0, pattern.width, 80, 150));
        pattern.noStroke();
        // pattern.rectMode(CENTER);
        pattern.rect(x * iScale, y * iScale, iScale, iScale);
      } else {
        pattern.noFill();
        pattern.noStroke();
        // pattern.rectMode(CENTER);
        pattern.rect(x * iScale, y * iScale, iScale, iScale);
      }
    }
  }

  // Draw profile pic
  let tileWimg = pattern.width / 2 / tilesXimg;
  let tileHimg = pattern.height / tilesYimg;

  tilesYimg = int(map(mouseY, 0, pattern.height, 30, 50));

  for (let y = 0; y < tilesYimg; y++) {
    for (let x = 0; x < tilesXimg; x++) {
      if (luck[count] == 0) {
        pattern.strokeWeight(0.5);
        pattern.stroke(pixelColorImg[count]);
        pattern.fill(pixelColorImg[count]);
        pattern.rect(x * tileWimg, y * tileHimg, tileWimg, tileHimg / 4);
        count++;
      } else {
        pattern.noStroke();
        pattern.noFill();
        pattern.rect(x * tileWimg, y * tileHimg, tileWimg, tileHimg / 4);
        count++;
      }
    }
  }

  //Draw Text
  let space = 0;
  let leading = 55;

  for (let i = 0; i < nameDis.length; i++) {
    if (frameCount < 5) {
      let wordW = textWidth(nameDis[i]);
      textDis.noStroke();
      textDis.noFill();
      textDis.textSize(60);
      textDis.textFont(myFont[i]);
      textDis.textAlign(LEFT, BOTTOM);
      textDis.text(nameDis[i], space, leading);
      space += 85;
      leading += 18.5;
      count++;
    } else {
      let wordW = textWidth(nameDis[i]);
      textDis.noStroke();
      textDis.fill(pixelColorImg[i]);
      textDis.textSize(60);
      textDis.textFont(myFont[i]);
      textDis.textAlign(LEFT, BOTTOM);
      textDis.text(nameDis[i], space, leading);
      space += 85;
      leading += 18.5;
      count++;
    }
  }

  tileWtext = int(textDis.width / tilesXtext);
  tileHtext = int(textDis.height / tilesYtext);

  let distortion = map(mouseX, 0, textDis.width, 0.05, 0.3);

  for (let y = 0; y < tilesYtext; y++) {
    for (let x = 0; x < tilesXtext; x++) {
      // WARP
      let waveX = int(sin(frameCount * 0.01 + x * y * distortion) * 50);
      // let waveY = int(sin(frameCount * 0.005 + ( x * y ) * 0) * 100);

      // image(pg,0,0)

      // SOURCE
      let sx = x * tileWtext + waveX;
      let sy = y * tileHtext;
      let sw = tileWtext;
      let sh = tileHtext;

      // DESTINATION
      let dx = x * tileWtext;
      let dy = y * tileHtext;
      let dw = tileWtext;
      let dh = tileHtext;

      pattern.copy(textDis, sx, sy, sw, sh, dx, dy, dw, dh);
    }
  }

  //Draw Bio

  let leadingBio = 175;
  let leadingW = 165;
  moveX = moveX + direction + map(mouseX, 0, pattern.width, 0.001, 0.005);
  if (moveX > 80 || moveX < -20) {
    direction = -direction;
  }
  for (let j = 0; j < bio.length; j++) {
    let spaceBio = 0;
    bioDis[j] = bio[j].split("");
    bioDis2[j] = bio[j].split(" ");

    for (let i = 0; i < bioDis[j].length; i++) {
      let wordW = textWidth(bioDis[j][i]);
      pattern.noStroke();
      pattern.fill(pixelColorImg[j], 255);
      // pattern.ellipseMode(CORNER);
      pattern.rect(200 + spaceBio, leadingW, wordW / 0.7, 13);

      pattern.fill(250, map(mouseY, 0, pattern.height, 100, 200));
      pattern.textFont(myFont[j + count]);
      pattern.textSize(15);
      pattern.text(bioDis2[j][i], bioX[i] + spaceBio + moveX, bioH[j + count]);
      spaceBio = spaceBio + wordW / 0.7 + map(mouseX, 0, pattern.width, 3, 8);

      count++;
    }

    leadingW += 22;

    // pattern.fill(250, map(mouseY, 0, pattern.height, 255, 255));
    // pattern.textFont(myFont[j]);
    // pattern.textSize(12);
    // pattern.text(bio[j], random(100,300), leadingBio);
    // leadingBio += leadingBio;
  }

  patternDis = pattern.get();
  patternDis.mask(shape);
}

// function keyPressed() {
//   // this will download the first 5 seconds of the animation!
//   if (key === 's') {
//     saveGif('mySketch', 8);
//   }
// }

// function mousePressed() {
//   if (pause == false) {
//     noLoop();
//     pause = true;
//   } else {
//     loop();
//     pause = false;
//   }
// }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  if (d < 150) {
    location.reload();
    location.href = "https://editor.p5js.org/aj.nguyen93/full/8OyOe47jT";
  }
}
