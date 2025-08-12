import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Explore from "./components/Explore";
import Sidebar from "./components/Sidebar";
import Posts from "./components/Posts";
import Suggestion from "./components/Suggestion";
import Create from "./components/Create";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex justify-between">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/create" element={<Create />} />
        </Routes>
        <Suggestion />
      </div>
    </BrowserRouter>
  );
};

export default App;
