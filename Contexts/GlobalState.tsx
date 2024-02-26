import React, { useEffect, useState } from "react";
import GlobalStateContext from "./GlobalStateContext";
import axios from "axios";
const GlobalState: any = ({ children, apiUrl }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const api = axios.create({
    baseURL: apiUrl,
  });

  // api.interceptors.request.use(async(config) => {
  //   if(user) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  //
  //   return config;
  // });

  return (
    <GlobalStateContext.Provider
      value={{ user, setUser, api, token, setToken }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalState;
