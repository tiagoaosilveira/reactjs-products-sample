import React from "react";
import "./styles.scss";
import { useSnackbar } from "./../../util/snackbar";

function Snackbar(props) {
  const snackbar = useSnackbar();
  if (props.data.message) {
    setTimeout(() => snackbar.changeMessage(""),3000);
  }
  return (
    <div className={
      "notification snackbar" + 
      (props.data.success == true ? ` is-success` : ` is-danger`) +
      (!props.data.message ? ` is-hidden` : "") +
      (props.data.message ? ` show` : "")
    }>
      <button className="delete" onClick={() => snackbar.changeMessage("")}/>
      {props.data.message}
    </div>
  );
}

export default Snackbar;
