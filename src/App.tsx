import { Route, Routes } from "react-router";
import Main from "./routes/Main";
import MoreInfoPage from "./routes/MoreInfoPage";
import LayOut from "./layout/LayOut";

export default function App() {
  return (
    <Routes>
      <Route element={<LayOut />}>
        <Route path="/" element={<Main />} />
        <Route path="/MoreInfoPage/:infoType" element={<MoreInfoPage />} />
      </Route>
    </Routes>
  );
}
