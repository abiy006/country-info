import CountriesList from '../components/CountriesList';
import Navbar from '../components/Navigationbar';
import Footer from '../components/Footer';

const Home = () => (
  <>
    <Navbar title="World Countries Information" />
    <section className="countries-container-outside">
      <CountriesList />
    </section>
    <Footer />
  </>
);

export default Home;
