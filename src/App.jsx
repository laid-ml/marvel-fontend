import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";

import "./App.css";

import Header from "./components/Header";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import CharactersComics from "./pages/ChatactersComics";
import Favoris from "./pages/Favoris";
import ModalSignup from "./components/Modalsignup";
import ModalLogin from "./components/ModalLogin";

function App() {
  const [research, setResearch] = useState("");
  const [token, setToken] = useState(Cookies.get("marvel-token") || null);
  const [visible, setVisible] = useState(false);
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [inputVisible, setInputVisible] = useState(true);

  // const [cookiesComics, setCookiesComics] = useState([]);
  // const [cookiesCharac, setCookiesCharac] = useState([]);

  // Cookies.set("comics", cookiesComics);
  // Cookies.set("charac", cookiesCharac);
  const handleToken = (token) => {
    if (token) {
      Cookies.set("marvel-token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("marvel-token");
      setToken(null);
    }
  };

  return (
    <Router>
      <Header
        setResearch={setResearch}
        research={research}
        handleToken={handleToken}
        token={token}
        setVisible={setVisible}
        visible={visible}
        setVisibleLogin={setVisibleLogin}
        visibleLogin={visibleLogin}
        inputVisible={inputVisible}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Characters research={research} setInputVisible={setInputVisible} />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics research={research} setInputVisible={setInputVisible} />
          }
        />
        <Route
          path="/comics/:id"
          element={<CharactersComics setInputVisible={setInputVisible} />}
        />

        <Route
          path="/favoris"
          element={<Favoris setInputVisible={setInputVisible} />}
        />
      </Routes>
      {visible && (
        <ModalSignup setVisible={setVisible} handletoken={handleToken} />
      )}
      {visibleLogin && (
        <ModalLogin
          setVisibleLogin={setVisibleLogin}
          handleToken={handleToken}
        />
      )}
    </Router>
  );
}

export default App;
