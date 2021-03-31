import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle(props) {
  return (
    <button onClick={props.toggleTheme}>
      {props.theme === "light" ? <FaSun /> : <FaMoon />}
    </button>
  );
}
