import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CountryCard = ({ name, flag, population }) => (
  <section className="each-country-card">
    <div className="img-div">
      <img className="actual-img" src={flag} alt="Country flag" />
    </div>
    <div>
      <h2>{name}</h2>
      <p>
        Estimated Population is -
        {`\n${population} people.`}
      </p>
      <Link className="country-detail" to={`/details/${name}`}>Detail</Link>
    </div>
  </section>
);

CountryCard.propTypes = {
  name: PropTypes.string.isRequired,
  flag: PropTypes.string.isRequired,
  population: PropTypes.number.isRequired,
};

export default CountryCard;
