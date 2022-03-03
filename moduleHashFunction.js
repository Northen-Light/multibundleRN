module.exports = function (path) {

  if (path.startsWith('/')) {
    path = path.replace(`${__dirname}/`, '')
  }
  // abcd
  let hash = 0, i, chr;
  for (i = 0; i < path.length; i++) {
    chr = path.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  if (path.indexOf('home') > 0) {
    console.log(path, hash)
  }
  return hash;
}
// 000001 - 1
// 1 << 5
// 100000 - 32


//abc
// hash - 97
// 97 << 5 - 97 +
