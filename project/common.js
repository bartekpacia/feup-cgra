// Borrowed from https://stackoverflow.com/a/1527820/7009800
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// Borrowed from https://stackoverflow.com/a/1527820/7009800
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { getRandom, getRandomInt };
