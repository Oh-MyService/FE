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
import CollectionName from './pages/CollectionName';
import DeleteModal from './components/DeleteModal';
import EditModal from './components/EditModal';
import AddModal from './components/AddModal';

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
                    <Route path="/Login" element={<LoginForm />} />
                    <Route path="/RecentGeneration" element={<RecentGeneration />} />
                    <Route path="/MyCollection" element={<MyCollection />} />
                    <Route path="/CollectionName" element={<CollectionName />} />
                    <Route path="/DeleteModal" element={<DeleteModal />} />
                    <Route path="/EditModal" element={<EditModal />} />
                    <Route path="/AddModal" element={<AddModal />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
