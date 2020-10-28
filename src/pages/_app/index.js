import React from "react";
import Navbar from "./../../components/Navbar";
import SigninPage from "./../signin";
import ProductsPage from "./../products";
import { Switch, Route, Router } from "./../../util/router.js";
import Footer from "./../../components/Footer";
import { ProvideAuth } from "./../../util/auth.js";
import "./styles.scss";
import { ProvideSnackbar } from "../../util/snackbar";

function App(props) {

  return (
    <ProvideAuth>
      <Router>
        <ProvideSnackbar>
          <>
            <Navbar
              color="white"
              spaced={true}
            />

            <Switch>
              <Route exact path="/" component={ProductsPage} />

              <Route exact path="/signin" component={SigninPage} />

              <Route exact path="/products" component={ProductsPage} />

              <Route
                component={({ location }) => {
                  return (
                    <div
                      style={{
                        padding: "50px",
                        width: "100%",
                        textAlign: "center"
                      }}
                    >
                      The page <code>{location.pathname}</code> could not be
                      found.
                    </div>
                  );
                }}
              />
            </Switch>

            <Footer
              color="light"
              size="normal"
              copyright="© 2020 Tiago Silveira"
            />
          </>
        </ProvideSnackbar>
      </Router>
    </ProvideAuth>
  );
}

export default App;
