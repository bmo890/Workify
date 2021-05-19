import { queryByRole } from "@testing-library/react";
import { useState } from "react";
import AuthProvider, { useAuth } from "./Auth";
import { login } from "../../lib/api";

const Login = () => {
  let auth = useAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      try {
        const { token, user } = await login(email, password);
        await auth.saveToken(token);
        await auth.saveUser(user);
      } catch (err) {
        alert("Bad username and password");
      }
    }
  };
  return (
    <form className="loginForm" onSubmit={handleOnSubmit}>
      <div className="emailTag">
        <label htmlFor="email"></label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
        />
      </div>
      <div className="passwordTag">
        <label htmlFor="password"></label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
      </div>
      <div>
        <button class="btn btn-primary" type="submit">Login</button>
      </div>
    </form>
  );
};

export default Login;
