import React from "react";
import queryString from "query-string";
import { getItems } from "../helpers/api";
import ArticleHeadline from "./ArticleHeadline";

export default class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null,
      comments: null,
      loadingItem: true,
      loadingComments: false,
    };
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);

    getItems([query.id])
      .then((result) => result.pop())
      .then((item) => {
        this.setState({
          item: {
            title: item.title,
            url: item.url,
            by: item.by,
            time: item.time,
            kids: item.kids,
            id: item.id,
          },
          loadingItem: false,
          loadingComments: true,
        });

        return item.kids;
      })
      .then((commentsIds) => {
        getItems(commentsIds).then((comments) =>
          this.setState({ comments, loadingComments: false })
        );
      });
  }

  render() {
    const { item, comments, loadingItem, loadingComments } = this.state;

    return (
      <React.Fragment>
        {loadingItem && <p>loading...</p>}
        {item && <ArticleHeadline article={item} />}
        {loadingComments && <p>loading comments...</p>}
        {comments && <p>success comments</p>}
      </React.Fragment>
    );
  }
}
