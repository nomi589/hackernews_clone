export default function getHeadlines(type = "top", articleCount = 10) {
  const endpoint = `https://hacker-news.firebaseio.com/v0/${type}stories.json`;

  return getIds(endpoint, articleCount)
    .then((articleIds) => getArticles(articleIds))
    .then((articles) => {
      return articles.map((article) => {
        return {
          title: article.title,
          url: article.url,
          author: article.by,
          time: article.time,
          numberOfComments: article.kids ? article.kids.length : 0,
          id: article.id,
        };
      });
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

function getArticles(articleIds) {
  const articleByIdEndpoints = articleIds.map(
    (articleId) =>
      `https://hacker-news.firebaseio.com/v0/item/${articleId}.json`
  );

  return Promise.allSettled(
    articleByIdEndpoints.map((articleEndpoint) => {
      return fetch(articleEndpoint).then((res) => res.json());
    })
  ).then((results) => {
    const fulfilledResults = results.filter(
      (result) => result.status === "fulfilled"
    );

    return fulfilledResults.map((result) => result.value);
  });
}
