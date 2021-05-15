import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ChangeEmail from './components/profileSettings/ChangeEmail';
import ChangePassword from './components/profileSettings/ChangePassword';
import ProfileSettings from './components/profileSettings/ProfileSettings';
import AboutUs from './components/AboutUs'

function App() {
  return (
    <Router>
      {/* <Switch>
        <Route
          exact
          path="/profileSettings"
          render={(routeProps) => <ProfileSettings {...routeProps} />}
        />
        <Route
          exact
          path="/profileSettings/changeEmail"
          render={(routeProps) => <ChangeEmail {...routeProps} />}
        />
        <Route
          exact
          path="/profileSettings/changePassword"
          render={(routeProps) => <ChangePassword {...routeProps} />}
        />
      </Switch> */}
      <AboutUs />
    </Router>

  );
}

export default App;
