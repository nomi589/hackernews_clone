import React from "react";
import ArticleHeadline from "./ArticleHeadline";
import getHeadlines from "../helpers/api";

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
            return <ArticleHeadline key={article.id} article={article} />;
          })}
      </React.Fragment>
    );
  }
}
