import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "../src/pages/LoginForm";
import SignupForm from "../src/pages/SignupForm";
import MyPage from "../src/pages/MyPage";
import Modal from "./components/NewCollectionModal";
import CreateImage from "../src/pages/CreateImage";
import Header from "../src/components/header";
import RecentGeneration from "../src/pages/RecentGeneration";
import MyCollection from "../src/pages/MyCollection";
import CollectionName from "./pages/CollectionName";
import DeleteModal from "./components/DeleteModal";
import EditModal from "./components/NameEditModal";
import CollectionAddModal from "./components/CollectionAddModal";
import Main from "./pages/Main";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/SignupForm" element={<SignupForm />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/Modal" element={<Modal />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/recent-generation" element={<RecentGeneration />} />
          <Route path="/my-collection" element={<MyCollection />} />
          <Route path="/collection-name" element={<CollectionName />} />
          <Route path="/DeleteModal" element={<DeleteModal />} />
          <Route path="/EditModal" element={<EditModal />} />
          <Route path="/CollectionAddModal" element={<CollectionAddModal />} />
          <Route
            path="/collection/:collectionName"
            element={<CollectionName />}
          />
          <Route path="/create-image" element={<CreateImage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
