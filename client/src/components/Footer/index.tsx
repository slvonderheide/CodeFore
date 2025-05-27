import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <footer className="transparent-footer">
  {location.pathname !== '/' && (
    <button className="btn btn-dark mb-3" onClick={handleGoBack}>
      &larr; Go Back
    </button>
  )}

  {/* Add this line */}
  <p className="m-0">&copy; {new Date().getFullYear()} CodeFore Solutions. All rights reserved.</p>
</footer>

  );
};

export default Footer;
