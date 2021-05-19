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
import ProfileSettings from "./Components/ProfileSettings"


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
            <Homepage></Homepage>
          </Route>
          <Route path="/about">
            <About></About>
          </Route>
          <PrivateRoute path="/jobform">
            <JobForm></JobForm>
          </PrivateRoute>
          <Route path="/job/:jobId">
            <JobPage></JobPage>
          </Route>
          <Route path="/login">
            <SignupModal />
            <Login />
          </Route>
          <PrivateRoute path="/profile">
            <ProfileSettings></ProfileSettings>
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
