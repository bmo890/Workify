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

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar></NavBar>
        <Switch>
          <Route exact path="/">
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
