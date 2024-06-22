import { useState } from "react";
import axios from "axios";

const ModalSignup = ({ setVisible, handletoken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://site--backend-marvel--y5mtbvcp7vlv.code.run/user/signup",
        {
          username: username,
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        handletoken(response.data.token);
        setVisible(false);
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
            setVisible(false);
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
            type="text"
            placeholder="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
          />
          <input type="submit" value="S'inscrire" />
          <p>{error}</p>
        </form>
      </div>
    </div>
  );
};
export default ModalSignup;
