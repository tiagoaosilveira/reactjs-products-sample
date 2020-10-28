import React from "react";
import "./styles.scss";

function Footer(props) {
  return (
    <footer class="footer">
    <div class="content has-text-centered">
      <p>
        {props.copyright}
      </p>
    </div>
  </footer>
  );
}

export default Footer;
