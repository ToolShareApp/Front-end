import { createContext } from "react";
import axios from "axios";

const GlobalStateContext = createContext({
  user: null,
  setUser: (user) => {},
  token: null,
  setToken: (user) => {},
  api: axios.create(),
});

export default GlobalStateContext;
