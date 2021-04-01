import React from "react";
import queryString from "query-string";

export default class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      article: queryString.parse(this.props.location.search),
    };
  }

  render() {
    return <p>{this.state.article.id}</p>;
  }
}
