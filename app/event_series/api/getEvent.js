var profanity = require("@2toad/profanity").profanity;
var data = require("./mockComment.ts");
var items = data.items;
var hash = new Map();
hash.set("@#$%&!", 0);
items.forEach(function (item) {
  item.snippet.topLevelComment.snippet.textOriginal
    .split(" ")
    .forEach(function (word) {
      if (!profanity.exists(word)) {
        if (hash.has(word)) {
          hash.set(word, hash.get(word) + 1);
        } else {
          hash.set(word, 1);
        }
      } else {
        hash.set("@#$%&!", hash.get("@#$%&!") + 1);
      }
    });
});
console.log("length", items.length);
console.log(hash);
