import axios from "axios";
import { useState } from "react";

const ModalLogin = ({ setVisibleLogin, handleToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://site--backend-marvel--y5mtbvcp7vlv.code.run/user/login",
        {
          username: username,
          password: password,
        }
      );
      if (response.data.token) {
        handleToken(response.data.token);
        console.log(response.data);
        setVisibleLogin(false);
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="modal-root">
      <div className="modal">
        {/* button pour fermer la modal */}
        <button
          onClick={() => {
            setVisibleLogin(false);
          }}
        >
          X
        </button>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            value={username}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
          />
          <input type="submit" value="Se connecter" />
          <p>{error}</p>
        </form>
      </div>
    </div>
  );
};

export default ModalLogin;
