import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Playground from "./components/Playground";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Playground />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
