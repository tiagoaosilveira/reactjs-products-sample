import {isAdmin} from "./auth";

export const openModal = (modalName) => {
  if (isAdmin()) {
    var element = document.getElementById(modalName);
    element.classList.add("is-active");
    return '';
  } else {
    return 'You have no permission to edit this product';
  }
}

export const closeModal = (modalName) => {
  var element = document.getElementById(modalName);
  element.classList.remove("is-active");
}