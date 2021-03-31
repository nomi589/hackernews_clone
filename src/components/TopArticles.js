import React from "react";
import getArticles from "../helpers/api";

export default class TopArticles extends React.Component {
  state = {
    articles: null,
    error: null,
  };

  componentDidMount() {
    getArticles("top")
      .then(() => {
        this.setState({ articles: "success" });
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
        {error && (
          <p>
            Error in fetching articles. Please check your internet connection
          </p>
        )}
        {articles && <p>{articles}</p>}
      </React.Fragment>
    );
  }
}
