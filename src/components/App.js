import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserCreateAccount from "./UserCreateAccount"
import AddResource from './AddResource';
import Resources from "./Resources";
import Login from "./Login";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path='/'
            element={<UserCreateAccount />}
          />
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/addresource'
            element={<AddResource />}
          />
          <Route
            path='/resources'
            element={<Resources />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
