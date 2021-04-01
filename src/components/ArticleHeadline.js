import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ArticleHeadline(props) {
  const { title, url, author, time, numberOfComments, id } = props.article;
  /**
   * 'time' is a Unix timestamp which is in seconds
   * JavaScript's Date() accepts Unix timestamp but expects milliseconds
   * Hence the multiplication by 1000
   */
  const dateTime = new Date(time * 1000).toLocaleString();

  return (
    <article>
      <p className="title">
        <a href={url}>{title}</a>
      </p>
      <p className="metadata">
        by{" "}
        <Link
          to={{
            pathname: "/user",
            search: `?id=${author}`,
          }}>
          {author}
        </Link>{" "}
        on {dateTime} with{" "}
        <Link
          to={{
            pathname: "/article",
            search: `?id=${id}`,
          }}>
          {numberOfComments}
        </Link>{" "}
        comments
      </p>
    </article>
  );
}

ArticleHeadline.propTypes = {
  article: PropTypes.object.isRequired,
};
