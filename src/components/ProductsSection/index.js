import React, { useState, useEffect } from "react";
import Section from "../Section";
import SectionButton from "../SectionButton";
import FormField from "../FormField";
import {openModal, closeModal} from "../../util/modal.js";
import useSignUpForm from "../CustomHooks";
import "./styles.scss";
import { useAuth } from "../../util/auth.js";
import { useSnackbar } from "../../util/snackbar";
import { getProducts, insertProduct, updateProduct, removeProduct } from "../../services/products";

function ProductsSection(props) {
  const auth = useAuth();
  const snackbar = useSnackbar();
  
  const [products, setProducts] = useState();
  const [showErrors, setShowErrors] = useState(false);
  const [novo, setNovo] = useState(true);
  const {inputs, handleInputChange, handleEdit, handleSubmit} = useSignUpForm();
  const [loading, setLoading] = useState(true);

  let errors = [];

  const getError = field => {
    return errors.find(e => e.field === field);
  };

  async function fetchProducts() {
    let response = await getProducts();
    setProducts(response);
    setLoading(false);
  }

  const submitProduct = async () => {
    var form = document.getElementById('form');
    var formData = new FormData(form);
    var object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    var json = JSON.stringify(object);
    let done;
    if (novo) {
      done = await insertProduct(json);

    } else {
      done = await updateProduct(inputs.id, json);
    }
    closeModal("modal-normal");
    snackbar.changeMessage(done.message ? false : true, done.message ? done.message : 'Successfully Inserted/Updated Product!');
    fetchProducts();
  };

  async function deleteProduct(id) {
    let done = await removeProduct(id);
    snackbar.changeMessage(done.message ? false : true,done.message ? done.message : 'Successfully Removed Product!');
    fetchProducts();
  }

  useEffect(() => {
    fetchProducts();  
  }, []);


  return (
    <Section color={props.color} size={props.size}>
      <div className={`container ${loading ? "is-loading" : ""}`}>
        <div>
        <table align="center" className="table">
          <thead>
            <tr>
              <th className="has-text-centered">
                <i className="fas fa-sort-numeric-down"/> Id
              </th>
              <th className="has-text-centered">
                <i className="fas fa-list"/> Name
              </th>
              <th className="has-text-centered">
                <i className="fas fa-list-ol"/> Quantity
              </th>
              <th className="has-text-centered">
                <i className="fas fa-dollar-sign"/> Price
              </th>
              <th className="has-text-centered">
                <i className="fas fa-edit"/> Edit
              </th>
              <th className="has-text-centered">
                <i className="fas fa-trash-alt"/> Remove
              </th>
            </tr>
          </thead>
          <tbody>
            { products && products.map( item => {
              return (
                <tr key={item.id}>
                  <td className="has-text-centered">
                    {item.id}
                  </td>
                  <td className="has-text-centered">
                    {item.name}
                  </td>
                  <td className="has-text-centered">
                    {item.quantity}
                  </td>
                  <td className="has-text-centered">
                    {item.price}
                  </td>
                  <td className="has-text-centered">
                    <i className="fas fa-edit" style={{ cursor : 'pointer'}} onClick={() => {handleEdit(item);setNovo(false);snackbar.changeMessage(openModal("modal-normal"))}}/>
                  </td>
                  <td className="has-text-centered">
                    <i className="fas fa-trash-alt" style={{ cursor : 'pointer'}} onClick={() => {deleteProduct(item.id)}}/>
                  </td>
                </tr>
              )
            })
            }
            <tr>
              <td colSpan="6" style={{textAlign : 'center'}}>
              <SectionButton
                parentColor={props.parentColor}
                size={"medium"}
                onClick={() => {handleEdit({});setNovo(true);snackbar.changeMessage(openModal("modal-normal"))}}
                classe={"modal-button"}
              >
                {"New Product"}
              </SectionButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
      <div id="modal-normal" className="modal">
        <div 
          className="modal-background"
          onClick={() => closeModal("modal-normal")}
          />

        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Product Information</p>
            <button className="delete" aria-label="close" onClick={() => closeModal("modal-normal")}></button>
          </header>
          <section className="modal-card-body">
            <form id="form">
              {!novo &&
                <div className="field">
                  <label className="label">Product Id</label>
                    <FormField
                      name={"id"}
                      value={inputs.id}
                      type="text"
                      placeholder="Id"
                      error={showErrors && getError("id")}
                      onChange={value => handleInputChange('id',value)}
                      disabled={novo ? false : true}
                    />
                </div>
              }
              <div className="field">
                <label className="label">Product Name</label>
                <FormField
                  name={"name"}
                  value={inputs.name || ''}
                  type="text"
                  placeholder="Product Name"
                  error={showErrors && getError("name")}
                  onChange={value => handleInputChange('name',value)}
                />
              </div>
              <div className="field">
                <label className="label">Quantity</label>
                <FormField
                  name={"quantity"}
                  value={inputs.quantity || ''}
                  type="text"
                  placeholder="Quantity"
                  error={showErrors && getError("quantity")}
                  onChange={value => handleInputChange('quantity',value)}
                />
              </div>
              <div className="field">
                <label className="label">Price</label>
                <FormField
                  name={"price"}
                  value={inputs.price || ''}
                  type="text"
                  placeholder="Price"
                  error={showErrors && getError("price")}
                  onChange={value => handleInputChange('price',value)}
                />
              </div>
            </form>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={() => submitProduct()}>Save Product</button>
            <button className="button" onClick={() => closeModal("modal-normal")}>Cancel</button>
          </footer>
        </div>
      </div>
    </Section>
  );
}

export default ProductsSection;
