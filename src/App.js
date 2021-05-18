import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './Homepage'
import JobPage from './JobPage'
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import About from "./components/About";
import NavBar from "./components/NavBar";
import JobForm from "./components/JobForm";
import { useAuth } from "./components/Auth";
import SignupModal from "./components/SignupModal";
import Login from "./components/Login";


function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar></NavBar>
        <Switch>
          <Route exact path="/">
            <SignupModal/>
            <Login/>
            {/* homepage */}
          </Route>

          <Route path="/about">
            <About></About>
          </Route>
          <Route path="/jobform">
            <JobForm></JobForm>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
