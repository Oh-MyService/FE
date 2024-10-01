import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import LoginForm from '../src/pages/LoginForm';
import SignupForm from '../src/pages/SignupForm';
import MyPage from '../src/pages/MyPage';
import Modal from './components/NewCollectionModal';
import CreateImage from '../src/pages/CreateImage';
import Header from '../src/components/header';
import RecentGeneration from '../src/pages/RecentGeneration';
import MyCollection from '../src/pages/MyCollection';
import CollectionName from './pages/CollectionName';
import DeleteModal from './components/DeleteModal';
import EditModal from './components/NameEditModal';
import CollectionAddModal from './components/CollectionAddModal';
import Main from './pages/Main';
import ArchiveDeleteModal from './components/ArchiveDeleteModal';
import FindAccount from './pages/FindAccount';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    // 로그인 및 비밀번호 찾기 페이지에서 헤더 숨김
    const location = useLocation();
    const isLoginPage = location.pathname === '/login' || location.pathname === '/find-account';

    return (
        <div className="App">
            {!isLoginPage && <Header token={token} setToken={setToken} />}
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/SignupForm" element={<SignupForm />} />
                <Route path="/login" element={<LoginForm setToken={setToken} />} />
                <Route path="/recent-generation" element={<RecentGeneration />} />
                <Route path="/my-collection" element={<MyCollection />} />
                <Route path="/collection/:collectionId" element={<CollectionName />} />
                <Route path="/DeleteModal" element={<DeleteModal />} />
                <Route path="/EditModal" element={<EditModal />} />
                <Route path="/CollectionAddModal" element={<CollectionAddModal />} />
                <Route path="/ArchiveDeleteModal" element={<ArchiveDeleteModal />} />
                <Route path="/find-account" element={<FindAccount />} />

                {/* Protected Routes */}
                <Route path="/my-page" element={token ? <MyPage /> : <Navigate to="/login" />} />
                <Route path="/create-image" element={token ? <CreateImage /> : <Navigate to="/login" />} />
                <Route path="/Modal" element={token ? <Modal /> : <Navigate to="/login" />} />
            </Routes>
        </div>
    );
}

export default App;
