import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './routes/HomePage';
import DetailsCountry from './routes/DetailsCountry';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:countryName" element={<DetailsCountry />} />
      </Routes>
    </Router>
  );
}

export default App;
