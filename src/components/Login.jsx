import { queryByRole } from "@testing-library/react";
import { useState } from "react";
import AuthProvider, { useAuth } from "../context/auth";

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
    <form onSubmit={handleOnSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          id="email"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          id="password"
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default Login;
