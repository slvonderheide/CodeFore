// import { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import './index.css'; // Assuming you have a CSS file for styling

const Header = () => {
  // const [menuOpen, setMenuOpen] = useState(false);

  const logout = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="tight-header">



      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">CodeFore Solutions</h1>
          </Link>
          <p className="m-0">
            
          </p>
        </div>

        <div className="header-buttons">
         
        {!Auth.loggedIn() && (
  <>
    <Link className="btn btn-info m-2" to="/login">
      Login
    </Link>
    <Link className="btn btn-light m-2" to="/signup">
      Signup
    </Link>
  </>
)}


          {/* Profile and Logout when logged in */}
          {Auth.loggedIn() && (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
