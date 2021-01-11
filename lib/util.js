export const parseTopic = topic => {
  let topicArr = topic.split("");
  for (let i = 0; i < topicArr.length; i++) {
    if (topicArr[i] == topicArr[i].toUpperCase()) {
      topicArr.splice(i, 0, "&");
      break;
    }
  }
  topic = topicArr.join("");
  return topic.charAt(0).toUpperCase() + topic.slice(1);
};
