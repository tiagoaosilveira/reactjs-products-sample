import { getUrl } from "../util/url";

export const getProducts = async () => {
    const response = await fetch(`${getUrl()}/products`, {
      method : 'get',
      headers : {
        "Content-Type" : "application/json"
      },
    })
    const products = await response.json();
    return products;
}

export const insertProduct = async (json) => {
  const response = await fetch(`${getUrl()}/products`, {
    method : 'post',
    headers : {
      "Authorization": "Bearer " + window.localStorage.getItem("access_token"),
      "Content-Type" : "application/json"
    },
    body : json
  })
  const products = await response.json();
  return products;
}

export const updateProduct = async (id, json) => {
  const response = await fetch(`${getUrl()}/products/${id}`, {
    method : 'put',
    headers : {
      "Authorization": "Bearer " + window.localStorage.getItem("access_token"),
      "Content-Type" : "application/json"
    },
    body : json
  })
  const products = await response.json();
  return products;
}

export const removeProduct = async (id) => {
  const response = await fetch(`${getUrl()}/products/${id}`, {
    method : 'delete',
    headers : {
      "Authorization": "Bearer " + window.localStorage.getItem("access_token"),
      "Content-Type" : "application/json"
    }
  })
  const products = await response.json();
  return products;
}