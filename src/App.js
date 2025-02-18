import { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import { publicRoutes, privateRoutes } from "./routes";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import axios from 'axios';

axios.defaults.baseURL = process.env.BASE_URL;

function App() {
  const [user, setUser] = useState();

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload = atob(base64);

      return JSON.parse(decodedPayload);
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = parseJwt(token);
        if (decodedToken) {
          const expirationTime = decodedToken.exp * 1000;
          const currentTime = Date.now();

          if (expirationTime > currentTime) {
            setUser(decodedToken);
          } else {
            localStorage.removeItem("token");
          }
        }
      }
  }, []);

  return (
    <Router>
      <div className="App font-sans">
        <Routes>
          {/* private route */}
          {
            user &&
            (
              privateRoutes.map((route, index) => {
                let Layout = DefaultLayout;
    
                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }
    
                const Page = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              })
            )
          }

          {/* public route */}
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
