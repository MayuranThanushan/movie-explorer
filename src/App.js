import './App.css';
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import SearchResults from "./pages/SearchResults";
import { useAppContext } from "./context/AppContext";

function App() {
  const { state } = useAppContext();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
    
  return (
    <div className={state.theme}>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/search" element={<SearchResults query={query} />} />
      </Routes>
    </div>
  );
}

export default App;
