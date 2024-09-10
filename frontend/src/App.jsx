import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <div className="p-4 h-screen flex items-center justify-center">
        <Outlet />
      </div>
    </>
  );
}

export default App;
