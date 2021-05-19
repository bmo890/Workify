import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './Homepage'
import JobPage from './JobPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import About from "./Components/About";
import NavBar from "./Components/NavBar";
import JobForm from "./Components/JobForm";
import { useAuth } from "./Components/Auth";
import SignupModal from "./Components/SignupModal";
import Login from "./Components/Login";


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
          <Route path="/search">
            <Homepage></Homepage>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
