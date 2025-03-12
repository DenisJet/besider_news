import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import NewsList from "./components/NewsList/NewsList";

function App() {
  return (
    <div className="flex flex-col justify-between h-full">
      <Header />
      <NewsList />
      <Footer />
    </div>
  );
}

export default App;
