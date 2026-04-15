import NoteSection from "./components/NoteSection";
import Navbar from "./components/navbar/Navbar";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  return (
    <>
      <Toaster />
      <Navbar />
      <NoteSection />
    </>
  );
};

export default App;
