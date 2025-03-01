function makeid(num = 4, prefix = "PINk_QUEEN_MD_") {
  let result = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;

  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return prefix + result;
}

module.exports = { makeid };

// Example Usage
console.log(makeid(8)); // PINk_QUEEN_MD_A1b2C3d4
console.log(makeid(6, "CUSTOM_")); // CUSTOM_XyZ123
