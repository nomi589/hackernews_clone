import React from "react";
import getHeadlines from "../helpers/api";

function Article(props) {
  const { title, url, author, time, numberOfComments, id } = props.article;
  /**
   * 'time' is a Unix timestamp which is in seconds
   * JavaScript's Date() accepts Unix timestamp but expects milliseconds
   * Hence the multiplication by 1000
   */
  const dateTime = new Date(time * 1000).toLocaleString();

  return (
    <article>
      <p>
        <a href={url}>{title}</a>
      </p>
      <p>
        by {author} on {dateTime} with {numberOfComments} comments
      </p>
    </article>
  );
}

export default class TopArticles extends React.Component {
  state = {
    articles: null,
    error: null,
  };

  componentDidMount() {
    getHeadlines("top")
      .then((articles) => {
        this.setState({ articles });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  render() {
    const { articles, error } = this.state;

    return (
      <React.Fragment>
        {articles === null && error === null && "loading..."}
        {error && <p>{error.message}</p>}
        {articles &&
          articles.map((article) => {
            return <Article key={article.id} article={article} />;
          })}
      </React.Fragment>
    );
  }
}
