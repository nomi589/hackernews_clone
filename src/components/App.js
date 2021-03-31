import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./Nav";
import TopArticles from "./TopArticles";
import NewArticles from "./NewArticles";

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

  render() {
    return (
      <Router>
        <Nav />
        <Route path="/" exact component={TopArticles} />
        <Route path="/new" component={NewArticles} />
      </Router>
    );
  }
}
