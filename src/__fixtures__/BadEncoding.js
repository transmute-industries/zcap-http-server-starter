// base58 characters (Bitcoin alphabet)
const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

const baseN = require("base-x")(alphabet);

function encode(input, maxline) {
  return baseN.encode(Buffer.from(input), maxline);
}

function decode(input) {
  return baseN.decode(input);
}

module.exports = {
  encode,
  decode
};
