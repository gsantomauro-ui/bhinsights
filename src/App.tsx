import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Category from './pages/Category';
import Article from './pages/Article';
import About from './pages/About';
import Admin from './pages/Admin';
import ArticleEditor from './pages/ArticleEditor';
import AdEditor from './pages/AdEditor';
import { AuthProvider } from './lib/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categoria/:slug" element={<Category />} />
            <Route path="/articulo/:slug" element={<Article />} />
            <Route path="/sobre-el-observatorio" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/editor" element={<ArticleEditor />} />
            <Route path="/admin/editor/:id" element={<ArticleEditor />} />
            <Route path="/admin/ad-editor" element={<AdEditor />} />
            <Route path="/admin/ad-editor/:id" element={<AdEditor />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
