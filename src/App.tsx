import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ConferencePage from "./pages/ConferencePage";
import PaperDetailPage from "./pages/PaperDetailPage";
import SearchPage from "./pages/SearchPage";

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-neutral flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/conference/:id" element={<ConferencePage />} />
            <Route path="/paper/:id" element={<PaperDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
