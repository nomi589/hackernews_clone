export default function getArticles(type = "top", articleCount = 10) {
  const endpoint = `https://hacker-news.firebaseio.com/v0/${type}stories.json`;

  return getIds(endpoint, articleCount)
    .then((articleIds) => {
      console.log(articleIds);
    })
    .catch((error) => {
      throw Error(error);
    });
}

function getIds(endpoint, articleCount) {
  return fetch(endpoint)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data.splice(0, articleCount);
    })
    .catch((error) => {
      throw Error(error);
    });
}
