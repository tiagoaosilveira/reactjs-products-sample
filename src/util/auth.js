import React, { useState, useEffect, useContext, createContext } from "react";
import { getUrl } from "../util/url";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

export const isAdmin = () => {
  let token = window.localStorage.getItem("access_token");

  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  let tokeninfo = JSON.parse(jsonPayload);
  return tokeninfo.role === 'ROLE_ADMIN' ? true : false;
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (login, password) => {
    return new Promise((resolve, reject) => {
      fetch(`${getUrl()}/login`, {
        method : 'post',
        headers : {
          "Content-Type" : "application/json"
          
        },
        body : 
          JSON.stringify(
            {
              user: login, 
              pwd: password
            }
          )
      })
      .then(response => {
        return response.json()
      })
      .then(json => {
        if (json.token) {
          window.localStorage.setItem("access_token", json.token);
          getCurrentUser().then(user => {
            setUser(user);
            resolve(user);
          });    
        } else {
          reject(new CustomError(json.status, "User or password not found"));
        }
      })
      .catch(error => {
        if (String(error).includes('Failed to fetch')) {
          reject(new CustomError(error, 'Cannot connect to the server'));
        } else {
          reject(new CustomError(error, error));
        }
      })
    });
  };

  const signout = () => {
    window.localStorage.removeItem("access_token");
    setUser(false);
  };

  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const accessToken = window.localStorage.getItem("access_token");
      if (accessToken) {
        resolve(accessToken);
      } else {
        resolve(false);
      }
    });
  };

  // Get user on mount
  useEffect(() => {
    getCurrentUser().then(user => {
      setUser(user);
    });
  }, []);

  return {
    user,
    signin,
    signout
  };
}

function CustomError(code, message) {
  const displayMessage = typeof message === "string" ? message : code;
  const error = new Error(displayMessage);
  error.code = code;
  return error;
}
