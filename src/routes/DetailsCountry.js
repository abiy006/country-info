import { useParams } from 'react-router';
import DetailsCountry from '../components/CountryDetails';
import Navbar from '../components/Navigationbar';

const Details = () => {
  const { countryName } = useParams();

  return (
    <>
      <Navbar title={`${countryName}`} />
      <section>
        <DetailsCountry />
      </section>
    </>
  );
};

export default Details;
