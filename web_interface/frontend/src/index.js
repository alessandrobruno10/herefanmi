import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Login';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './userContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <UserProvider>
      <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<App />} />
          <Route path="/welcom" element={<Home />} />
      </Routes>
    </UserProvider>      
    </Router>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
