var profanity = require("@2toad/profanity").profanity;
const data = require("./mockComment.ts");

const { items } = data;

const hash = new Map();
hash.set("@#$%&!", 0);

items.forEach((item: YouTubeCommentResp) => {
  item.snippet.topLevelComment.snippet.textOriginal
    .split(" ")
    .forEach((word) => {
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
