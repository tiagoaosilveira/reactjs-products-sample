import React from "react";
import "./styles.scss";

function FormField(props) {
  return (
    <div className="field">
      <div className="control">
        {props.type === "textarea" && (
          <textarea
            name={props.name}
            className="textarea is-medium"
            type={props.type}
            value={props.value}
            placeholder={props.placeholder}
            onChange={e => props.onChange(e.target.value)}
          />
        )}

        {(props.type === 'login' || props.type === 'password' || props.type === 'text') && (
          <input
            name={props.name}
            className="input is-medium"
            type={props.type}
            value={props.value}
            placeholder={props.placeholder}
            onChange={e => props.onChange(e.target.value)}
            maxLength={props.maxLength ? props.maxLength : undefined}
            disabled={props.disabled}
          />
        )}

        {props.disabled && (
          <input
            name={props.name}
            value={props.value}
            type="hidden"
          />
        )}

        {props.type === 'select' && (
          <div className="select">
          <select
            name={props.name}
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
          >
            {props.options.map( item => {
              return (
                <option value={item.id}>{item.id + " - " + item.descricao}</option>
              )
            })}
          </select>
          </div>
        )}
   
      </div>

      {props.error && <p className="help is-danger">{props.error.message}</p>}
    </div>
  );
}

export default FormField;
