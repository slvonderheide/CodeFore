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
      {/* Only this button is conditional */}
      {location.pathname !== '/' && (
        <button className="btn btn-dark mb-3" onClick={handleGoBack}>
          &larr; Go Back
        </button>
      )}
      {/* These lines should ALWAYS render */}
      
    </footer>
  );
};

export default Footer;
