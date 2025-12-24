import { AppRouter } from "@/app/router";
import Header from "@/shared/ui/Header";
import StatusMessage from "./store/authentication/StatusMessage";

function App() {
  return (
    <>
      <Header />
      <AppRouter />
      <StatusMessage />
    </>
  );
}

export default App;
