
function hueCalculation(p, q, t) {
  if (t < 0)
    {
     t = 1-(Math.abs(t % 1));
   }
 if (t > 1)
   {
     t%=1;
   }
 if (t < 0.1667) {
   return p + (q - p) * 6 * t;
 }
 if (t < 0.5) {
   return q;
 }
 if (t < 0.6667) {
   return p + (q - p) * (2/3 - t) * 6;
 }
 return p;
}

function hslToRgb(h, s, l) {

  //Normalise arguments
  h*=0.00278;
  s*=0.00392;
  l*=0.00392;

  var r, g, b;
   
  if (s === 0) {
    r = g = b = l; // achromatic
  }
  else  {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
     
    r = hueCalculation(p, q, h + 0.333 );
    g = hueCalculation(p, q, h);
    b = hueCalculation(p, q, h - 0.333);
  }
  
  r*=255;
  g*=255;
  b*=255;
  
  var rgb = (r & 255) | ((g & 255) << 8) | ((b & 255) << 16);
  return rgb;
}

function randomFleshColor() {
  var h = _.random(12 , 20);
  var s = _.random(32 , 128);
  var l = _.random(32,224);

  var rgb = hslToRgb(h, s, l);
  var r = getColorRed(rgb);
  var g = getColorGreen(rgb);
  var b = getColorBlue(rgb);

  return createjs.Graphics.getRGB(r, g, b);

}

function randomClothingColor() {
  var h = _.random(0, 300);

  if (h < 150)
  //No red clothes!
  {
    h = 360 - h;
  }

  var s = _.random(192, 255);
  var l = _.random(32, 224);

  var rgb = hslToRgb(h, s, l);
  var r = getColorRed(rgb);
  var g = getColorGreen(rgb);
  var b = getColorBlue(rgb);

  return createjs.Graphics.getRGB(r, g, b);
}

function getColorRed(rgb) {
  var n = (rgb & 255);
  return n;
}

function getColorGreen(rgb) {
  var n = ((rgb >> 8) & 255);
  return n;
}

function getColorBlue(rgb) {
  var n = ((rgb >> 16) & 255);
  return n;
}

function Hue(r, g, b) {
  // I am certain that much of the min/max stuff can be replaced with 
  // some ? operations

  var max;
  var min;

  var delta;
  var hue;

  if (r > g) {
    max = r;
    min = g;
  }
  else {
    max = g;
    min = r;
  }

  if (b > max) {
    max = b;
  }
  else {
    if (b < min) {
      min = b;
    }
  }

  delta = max - min;

  switch (max) {
  case r:
    hue = 60 * ((g - b) / delta);
    break;
  case g:
    hue = 120 + (60 * ((b - r) / delta));
    break;
  case b:
    hue = 240 + (60 * ((r - g) / delta));
    break;
  }

  if ((Math.abs(hue)) > 360) {
    hue %= 360;
  }

  if (hue < 0) {
    hue = 360 - (Math.abs(hue));
  }

  hue = ((hue * 0.0222) * 32.0);

  return hue;
}

function saturation(r, g, b) {
  var rg = Math.abs(r - g);
  var gb = Math.abs(g - b);
  var br = Math.abs(b - r);

  var sat = (rg + gb + br) * 0.333;

  return sat;
}

function luminance(r, g, b) {
  var lum = (r + g + b) * 0.333;
  return lum;
}
