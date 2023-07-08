import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ title }) => (
  <header>
    <div className="header-back">
      <Link className="header-back-link" to="/">Back</Link>
    </div>
    <h1 className="header-text">{title}</h1>
  </header>
);

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
