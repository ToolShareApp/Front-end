import { createContext } from "react";
import axios from "axios";

const GlobalStateContext = createContext({
  user: Object,
  setUser: (user: any) => {},
  token: null,
  setToken: (user: any) => {},
  api: axios.create(),
});

export default GlobalStateContext;
