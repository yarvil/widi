import "styles/App.css";
import { AppRouter } from "@/app/router";
import Header from "@/shared/ui/Header";

function App() {
  return (
    <>
      <Header />
      <AppRouter />
    </>
  );
}

export default App;
