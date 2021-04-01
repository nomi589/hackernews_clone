export default function getHeadlines(type = "top", itemCount = 10) {
  const endpoint = `https://hacker-news.firebaseio.com/v0/${type}stories.json`;

  return getIds(endpoint, itemCount)
    .then((ids) => getItems(ids))
    .then((items) => {
      return items.map((item) => {
        return {
          title: item.title,
          url: item.url,
          author: item.by,
          time: item.time,
          numberOfComments: item.kids ? item.kids.length : 0,
          id: item.id,
        };
      });
    })
    .catch((error) => {
      throw Error(error);
    });
}

function getIds(endpoint, itemCount) {
  return fetch(endpoint)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data.splice(0, itemCount);
    })
    .catch((error) => {
      throw Error(error);
    });
}

function getItems(ids) {
  const itemByIdEndpoints = ids.map(
    (articleId) =>
      `https://hacker-news.firebaseio.com/v0/item/${articleId}.json`
  );

  return Promise.allSettled(
    itemByIdEndpoints.map((itemEndpoint) => {
      return fetch(itemEndpoint).then((res) => res.json());
    })
  ).then((results) => {
    const fulfilledResults = results.filter(
      (result) => result.status === "fulfilled"
    );

    return fulfilledResults.map((result) => result.value);
  });
}
