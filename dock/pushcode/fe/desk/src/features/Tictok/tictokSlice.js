import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  server: {
    url: "",
    token: ""
  },
  networks: [],
  network: "",
  routes: [],
  obs: {
    socketUrl: "ws://127.0.0.1:4455",
    password: ""
  },
  automation: false
};

const tictokSlice = createSlice({
  name: "tictok",
  initialState,
  reducers: {
    setServer(state, action) {
      state.server = action.payload;
    },
    setNetworks(state, action) {
      state.networks = action.payload;
    },
    setNetwork(state, action) {
      state.network = action.payload;
    },
    addRoutes(state, action) {
      state.routes.push(action.payload);
    },
    clearRoutes() {
      state.routes = [];
    },
    setObs(state, action) {
      state.obs = {
        ...state.obs,
        ...action.payload
      };
    },
    setAutomation(state, action) {
      state.automation = action.payload;
    }
  }
});

export const { setServer, setNetworks, setNetwork, addRoutes, clearRoutes, setObs, setAutomation } =
  tictokSlice.actions;
export default tictokSlice;

export const getNetworks = (state) => state.tictok.networks;
export const getServer = (state) => state.tictok.server;
export const getNetwork = (state) => state.tictok.network;
export const getRoutes = (state) => state.tictok.routes;
export const getObs = (state) => state.tictok.obs;
export const getAutomation = (state) => state.tictok.automation;
