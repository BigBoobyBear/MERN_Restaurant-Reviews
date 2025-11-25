import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import AddReview from "./components/add-review";
import Login from "./components/login";
import Restaurant from "./components/restaurant";
import RestaurantsList from "./components/restaurants-list";

function App() {
  const [user, setUser] = useState(null);

  const login = async (user = null) => {
    setUser(user);
  };

  const logout = async () => {
    setUser(null);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Restaurant Reviews
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item">
            {user ? (
              <a
                href="/"
                onClick={logout}
                className="nav-link"
                style={{ cursor: "pointer" }}
              >
                Logout {user.name}
              </a>
            ) : (
              <Link to="/login" className="nav-link">
                Login
              </Link>
            )}
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<RestaurantsList />} />
          <Route
            path="/restaurants/:id/review"
            element={<AddReview user={user} />}
          />
          <Route path="/restaurants/:id" element={<Restaurant user={user} />} />
          <Route path="/login" element={<Login login={login} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
