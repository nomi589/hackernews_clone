import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import TopArticles from "./TopArticles";
import NewArticles from "./NewArticles";
import ThemeToggle from "./ThemeToggle";
import User from "./User";
import Article from "./Article";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="navlink-active">
            Top
          </NavLink>
        </li>
        <li>
          <NavLink to="/new" activeClassName="navlink-active">
            New
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default class App extends React.Component {
  state = {
    theme: "light",
  };

  componentDidMount() {
    document.documentElement.setAttribute("data-theme", this.state.theme);
  }

  componentDidUpdate() {
    document.documentElement.setAttribute("data-theme", this.state.theme);
  }

  toggleTheme = () => {
    this.setState((oldState) => ({
      theme: oldState.theme === "light" ? "dark" : "light",
    }));
  };

  render() {
    return (
      <Router>
        <header>
          <Nav />
          <ThemeToggle
            theme={this.state.theme}
            toggleTheme={this.toggleTheme}
          />
        </header>
        <Route path="/" exact component={TopArticles} />
        <Route path="/new" component={NewArticles} />
        <Route path="/user" component={User} />
        <Route path="/article" component={Article} />
      </Router>
    );
  }
}
