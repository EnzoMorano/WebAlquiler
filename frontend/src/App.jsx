import { useState } from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Reserva from "./pages/Reserva";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservar/:id" element={<Reserva />} />
      </Routes>
    </div>
  );
}

export default App;
