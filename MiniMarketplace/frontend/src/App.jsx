import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LocalSingle from "./pages/LocalSingle";
import MultipleLocal from "./pages/MultipleLocal";
import MultipleCloud from "./pages/MultipleCloud";
import { Toaster } from "react-hot-toast";
import CloudSingle from "./pages/CloudSingle";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/local/single" element={<LocalSingle />} />
        <Route path="/local/multiple" element={<MultipleLocal />} />
        <Route path="/cloud/single" element={<CloudSingle />} />
        <Route path="/cloud/multiple" element={<MultipleCloud />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
