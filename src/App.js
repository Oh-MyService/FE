import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import MyPage from './MyPage';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/SignupForm" element={<SignupForm />} />
                    <Route path="/MyPage" element={<MyPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
