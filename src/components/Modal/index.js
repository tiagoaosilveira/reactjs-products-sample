import React from "react";
import "./styles.scss";

function Modal(props) {
  const {

    // Passed to button element
    ...otherProps
  } = props;

  return (

    <div class={"modal"}>
        <div 
          class="modal-background"
          onClick={() => closeModal("modal-normal")}
          />

        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Inserir Pista</p>
            <button class="delete" aria-label="close" onClick={() => closeModal("modal-normal")}></button>
          </header>
          <section class="modal-card-body">
            <div class="field">
              <label class="label">Id da Pista</label>
              <FormField
                value={idPista}
                type="text"
                placeholder="idPista"
                error={showErrors && getError("idPista")}
                onChange={value => setIdPista(value)}
              />
            </div>
            <div class="field">
              <label class="label">Descrição</label>
              <FormField
                value={descricao}
                type="text"
                placeholder="Descrição"
                error={showErrors && getError("descricao")}
                onChange={value => setDescricao(value)}
              />
            </div>
            <div class="field">
              <label class="label">Tipo da Pista</label>
              <FormField
                value={tipoPista}
                type="select"
                placeholder="tipoPista"
                error={showErrors && getError("tipoPista")}
                onChange={value => setTipoPista(value)}
                options={[0,1,2,3,4]}
              />
            </div>
            <div class="field">
              <label class="label">Id da Área</label>
              <FormField
                value={idArea}
                type="select"
                placeholder="idArea"
                error={showErrors && getError("idArea")}
                onChange={value => setIdArea(value)}
                options={[0,1]}
              />
            </div>
            <div class="field">
              <label class="label">IP</label>
              <FormField
                value={ip}
                type="text"
                placeholder="IP"
                error={showErrors && getError("ip")}
                onChange={value => setIp(value)}
              />
            </div>
            <div class="field">
              <label class="label">Porta</label>
              <FormField
                value={porta}
                type="text"
                placeholder="Porta"
                error={showErrors && getError("porta")}
                onChange={value => setPorta(value)}
                maxLength="5"
              />
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success">Save changes</button>
            <button class="button" onClick={() => closeModal("modal-normal")}>Cancel</button>
          </footer>
        </div>
      </div>

    // <button
    //   className={
    //     "button" +
    //     ([
    //       "primary",
    //       "info",
    //       "success",
    //       "warning",
    //       "danger",
    //       "black",
    //       "dark"
    //     ].includes(parentColor)
    //       ? ` is-${parentColor} is-inverted`
    //       : "") +
    //     (["white", "light"].includes(parentColor) || !parentColor
    //       ? " is-primary"
    //       : "") +
    //     (size ? ` is-${size}` : "") +
    //     (state ? ` is-${state}` : "") +
    //     (fullWidth ? " is-fullwidth" : "") +
    //     (" " + classe)
    //   }
    //   {...otherProps}
    // >
    //   {props.children}
    // </button>
  );
}

export default Modal;
