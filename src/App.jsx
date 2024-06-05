import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./Routes/MainRoutes";

function App() {
  return (
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  );
}

export default App;
