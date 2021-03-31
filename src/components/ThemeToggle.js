import React from "react";

export default function ThemeToggle(props) {
  return <button onClick={props.toggleTheme}>{props.theme}</button>;
}
