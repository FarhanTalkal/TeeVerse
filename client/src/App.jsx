import { lazy, Suspense } from "react";
import Home from "./pages/Home";

const Canvas = lazy(() => import("./canvas"));
const Customizer = lazy(() => import("./pages/Customizer"));

function App() {
  return (
    <main className="app transition-all ease-in">
      <Home />
      <Suspense fallback={null}>
        <Canvas />
        <Customizer />
      </Suspense>
    </main>
  );
}

export default App;
