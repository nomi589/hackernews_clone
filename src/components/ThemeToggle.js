import React from "react";
import PropTypes from "prop-types";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle(props) {
  return (
    <button onClick={props.toggleTheme}>
      {props.theme === "light" ? <FaSun /> : <FaMoon />}
    </button>
  );
}

ThemeToggle.propTypes = {
  theme: PropTypes.string.isRequired,
};
