import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './pages/Home'
import Post from './pages/Post'

function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
