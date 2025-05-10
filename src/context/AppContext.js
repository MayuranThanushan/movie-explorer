import React, { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

const initialState = {
  searchQuery: "",
  favoriteMovies: [],
  theme: "light",
  filters: {
    genre: "",
    year: "",
    rating: "",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "ADD_FAVORITE":
      return { ...state, favoriteMovies: [...state.favoriteMovies, action.payload] };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favoriteMovies: state.favoriteMovies.filter((movie) => movie.id !== action.payload),
      };
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    case "SET_FILTERS":
      return { ...state, filters: action.payload };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
