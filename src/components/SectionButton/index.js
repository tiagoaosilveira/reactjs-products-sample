import React from "react";
import "./styles.scss";

function SectionButton(props) {
  const {
    parentColor,
    size,
    state,
    fullWidth,
    classe,
    data,
    // Passed to button element
    ...otherProps
  } = props;

  return (
    <button
      className={
        "button" +
        ([
          "primary",
          "info",
          "success",
          "warning",
          "danger",
          "black",
          "dark"
        ].includes(parentColor)
          ? ` is-${parentColor} is-inverted`
          : "") +
        (["white", "light"].includes(parentColor) || !parentColor
          ? " is-primary"
          : "") +
        (size ? ` is-${size}` : "") +
        (state ? ` is-${state}` : "") +
        (fullWidth ? " is-fullwidth" : "") +
        (" " + classe)
      }
      {...otherProps}
    >
      {props.children}
    </button>
  );
}

export default SectionButton;
