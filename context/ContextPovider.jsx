"use client";
import { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "./reducer";

export const CardContext = createContext();

export const useCartContext = () => {
  return useContext(CardContext);
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  


  return (
    <CardContext.Provider value={{ state, dispatch }}>
      {children}
    </CardContext.Provider>
  );
};