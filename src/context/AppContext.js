import React, { createContext, useContext, useReducer, useEffect } from "react";

const AppContext = createContext();

const initialState = {
  searchQuery: "",
  favoriteMovies: JSON.parse(localStorage.getItem("favoriteMovies")) || [],
  theme: localStorage.getItem("theme") || "light",
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
      const updatedFavoritesAdd = [...state.favoriteMovies, action.payload];
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavoritesAdd));
      return { ...state, favoriteMovies: updatedFavoritesAdd };
    case "REMOVE_FAVORITE":
      const updatedFavoritesRemove = state.favoriteMovies.filter((movie) => movie.id !== action.payload);
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavoritesRemove));
      return { ...state, favoriteMovies: updatedFavoritesRemove };
    case "TOGGLE_THEME":
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return { ...state, theme: newTheme };
    case "SET_FILTERS":
      return { ...state, filters: action.payload };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
  }, [state.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);