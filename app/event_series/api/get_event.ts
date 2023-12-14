const data = require("./mockComment.ts");

const { items } = data;

const commentsMap = new Map();

items.forEach((item: YouTubeCommentResp) => {
  item.snippet.topLevelComment.snippet.textOriginal
    .split(" ")
    .forEach((word) => {
      if (commentsMap.has(word)) {
        commentsMap.set(word, commentsMap.get(word) + 1);
      } else {
        commentsMap.set(word, 1);
      }
    });
});

console.log("length", items.length);
console.log(commentsMap);
