import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import Header from '../components/Header';
import Main from '../components/Main';
import Tools from '../components/Tools';
import WalletView from '../components/WalletView';
import Configuration from '../components/Configuration';


export default function App() {
  return (
    <Router>
    <div app-container>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/configuration" element={<Configuration />} />
          <Route path="/walletview" element={<WalletView />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}
