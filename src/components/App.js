import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./Nav";
import TopArticles from "./TopArticles";
import NewArticles from "./NewArticles";
import ThemeToggle from "./ThemeToggle";

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
      </Router>
    );
  }
}
