import React, { useEffect, useState } from "react";
import GlobalStateContext from "./GlobalStateContext";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const GlobalState: any = ({ children, apiUrl }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const saveValueFor = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  };

  const getValueFor = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    } else {
      return null;
    }
  };

  useEffect(() => {
    getValueFor("user").then((storedUser) => {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    });
  }, []);

  useEffect(() => {
    saveValueFor("user", JSON.stringify(user));
  }, [user]);

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
