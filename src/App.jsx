import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from '../src/pages/LoginForm';
import SignupForm from '../src/pages/SignupForm';
import MyPage from '../src/pages/MyPage';
import Modal from '../src/components/Modal';
import CreateImage from '../src/pages/CreateImage';
import Header from '../src/components/header';
import RecentGeneration from '../src/pages/RecentGeneration';
import MyCollection from '../src/pages/MyCollection';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<CreateImage />} />
                    <Route path="/SignupForm" element={<SignupForm />} />
                    <Route path="/MyPage" element={<MyPage />} />
                    <Route path="/Modal" element={<Modal />} />
                    <Route path="/LoginForm" element={<LoginForm />} />
                    <Route path="/RecentGeneration" element={<RecentGeneration />} />
                    <Route path="MyCollection" element={<MyCollection />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
