import React, { createContext, useContext, useReducer } from "react";
import { useSelector } from "react-redux";
import { getIsAuthenticated, getUser } from "../features/Account/accountSlice";

const AuthContext = createContext();

// const initialState = {
//   user: null,
//   isAuthenticated: false,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "login":
//       return { ...state, user: action.payload, isAuthenticated: true };
//     case "logout":
//       return { ...state, user: null, isAuthenticated: false };
//     default:
//       throw new Error("Unknown action");
//   }
// }

// const FAKE_USER = {
//   name: "Jack",
//   email: "jack@example.com",
//   password: "qwerty",
//   avatar: "https://i.pravatar.cc/100?u=zz",
// };

function AuthProvider({ children }) {
  // const [{ user, isAuthenticated }, dispatch] = useReducer(
  //   reducer,
  //   initialState
  // );

  const user = useSelector(getUser);
  const isAuthenticated = useSelector(getIsAuthenticated);

  return <AuthContext.Provider value={{ user, isAuthenticated }}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
