import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LocalSingle from "./pages/LocalSingle";
import MultipleLocal from "./pages/MultipleLocal";
import MultipleCloud from "./pages/MultipleCloud";
import SingleCloud from "./pages/SingleCloud";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/local/single" element={<LocalSingle />} />
        <Route path="/local/multiple" element={<MultipleLocal />} />
        <Route path="/cloud/single" element={<SingleCloud />} />
        <Route path="/cloud/multiple" element={<MultipleCloud />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
