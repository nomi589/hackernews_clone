import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./Nav";
import TopArticles from "./TopArticles";
import NewArticles from "./NewArticles";

export default function App() {
  return (
    <Router>
      <Nav />
      <Route path="/" exact component={TopArticles} />
      <Route path="/new" component={NewArticles} />
    </Router>
  );
}
