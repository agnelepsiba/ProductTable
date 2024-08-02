
import 'antd/dist/reset.css';
import "./styles/variable.scss";
import "./styles/global.scss";
import { Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './components';
import LoginPage from './components/loginPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/products" element={<MainLayout />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
