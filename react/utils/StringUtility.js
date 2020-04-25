export const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const convertToTime = (duration) => {
  const timeInDecimals = String([pad(Math.floor(duration / 60), 2), pad(duration % 60, 2)]);
  const time = timeInDecimals.slice(0, timeInDecimals.indexOf('.') > 0 ? timeInDecimals.indexOf('.') : timeInDecimals.length);
  const minutes = time.slice(0, time.indexOf(","));
  const seconds = time.slice(time.indexOf(",") + 1);
  if (seconds < 10 && String(seconds) !== "00") {
    return `${minutes}:0${seconds}`;
  }
  return `${minutes}:${seconds}`;
};

function pad(n, width, z = 0) {
  const val = String(n);
  return val.length >= width ? val : new Array(width - val.length + 1).join(z) + val;
}