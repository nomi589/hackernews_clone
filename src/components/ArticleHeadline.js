import React from "react";

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
      <p>
        <a href={url}>{title}</a>
      </p>
      <p>
        by {author} on {dateTime} with {numberOfComments} comments
      </p>
    </article>
  );
}
