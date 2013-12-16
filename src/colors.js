function hslToRgb(h, s, l) {
  var r;
  var g;
  var b;

  var temp1;
  var temp2
  var rtemp;
  var gtemp;
  var btemp;

  if (s === 0) {
    r = 1;
    g = 1;
    b = 1;
  }
  else {
    if (l < 128) {
      temp2 = l * (255 + s) * 0.003922;
    }

    else {
      temp2 = (l + s) - (l * s) * 0.003922;
    }

    temp1 = 2 * l - temp2;
    rtemp = h + 120;
    rtemp = rtemp % 360;

    gtemp = h;

    btemp = h + 240;

    btemp = btemp % 360;

    // Red
    if (rtemp < 60) {
      r = temp1 + (temp2 - temp1) * rtemp * 0.016667;
    }
    else {
      if (rtemp < 180) {
        r = temp2;
      }
      else {
        if (rtemp < 240) {
          r = temp1 + (temp2 - temp1) * (240 - rtemp) * 0.016667;
        }
        else {
          r = temp1;
        }

        // Green		
        if (gtemp < 60) {
          g = temp1 + (temp2 - temp1) * gtemp * 0.016667;
        }
        else {
          if (gtemp < 180) {
            g = temp2;
          }
          else {
            if (gtemp < 240) {
              g = temp1 + (temp2 - temp1) * (240 - gtemp) * 0.016667;
            }
            else {
              g = temp1;
            }

            // Blue		
            if (btemp < 60) {
              b = temp1 + (temp2 - temp1) * btemp * 0.016667;
            }
            else {
              if (btemp < 180) {
                b = temp2;
              }
              else {
                if (btemp < 240) {
                  b = temp1 + (temp2 - temp1) * (240 - btemp) * 0.016667;
                }
                else {
                  b = temp1;
                }
              }
            }
          }
        }
      }
    }
  }
  var rgb = (r & 255) | ((g & 255) << 8) | ((b & 255) << 16);
  return rgb;
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
    hue = 60 * (g - b) / delta;
    break;
  case g:
    hue = 120 + 60 * (b - r) / delta;
    break;
  case b:
    hue = 240 + 60 * (r - g) / delta;
    break;
  }

  if ((Math.abs(hue)) > 360) {
    hue = hue % 360;
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
