import logo from "../assets/logo.png";
import { useNavigate, Link } from "react-router-dom"; //rappel
import { useState } from "react";

const Header = ({
  setResearch,
  research,
  setVisible,
  visible,
  setVisibleLogin,
  visibleLogin,
  token,
  handleToken,
  inputVisible,
}) => {
  // const [search, setSearch] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);

  // setResearch(search);

  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <img src={logo} alt="marvel" />{" "}
        </Link>
        {!inputVisible ? null : (
          <input
            type="text"
            name="search"
            onChange={(event) => {
              setResearch(event.target.value);
            }}
            value={research}
          />
        )}

        {token ? (
          <button
            onClick={() => {
              handleToken(null);
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <ul>
            <li>
              <button
                onClick={() => {
                  setVisible(!visible);
                }}
              >
                Signup
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setVisibleLogin(!visibleLogin);
                }}
              >
                Login
              </button>
            </li>
          </ul>
        )}

        <ul>
          <Link to="/">
            <li>personnages</li>
          </Link>
          <Link to="/comics">
            <li>comics</li>
          </Link>
          <Link to="/Favoris">
            <li>favoris</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
