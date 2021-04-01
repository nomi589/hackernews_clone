import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { getItems, getUser } from "../helpers/api";
import ArticleHeadline from "./ArticleHeadline";

function Profile(props) {
  const { id, karma, items } = props.user;

  return (
    <article className="user-info">
      <h1>{id}</h1>
      <h4>Karma: {karma}</h4>
    </article>
  );
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

function UserItems(props) {
  const { items } = props;

  return (
    <article className="user-items">
      {items.map((item) => {
        return <ArticleHeadline key={item.id} article={item} />;
      })}
    </article>
  );
}

UserItems.propTypes = {
  items: PropTypes.array.isRequired,
};

export default class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      items: null,
      loadingUser: true,
      loadingUserItems: false,
    };
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);

    getUser(query.id)
      .then((user) => {
        this.setState({
          user: {
            id: user.id,
            karma: user.karma,
          },
          loadingUser: false,
          loadingUserItems: true,
        });

        return user.submitted;
      })
      .then((itemIds) => {
        return getItems(itemIds.splice(0, 10));
      })
      .then((items) => {
        this.setState({
          items: items.filter((item) => item.type === "story"),
          loadingUserItems: false,
        });
      });
  }

  render() {
    const { user, items, loadingUser, loadingUserItems } = this.state;

    return (
      <React.Fragment>
        {loadingUser && <p>loading user...</p>}
        {user && <Profile user={user} />}
        {loadingUserItems && <p>loading items...</p>}
        {items && <UserItems items={items} />}
      </React.Fragment>
    );
  }
}
