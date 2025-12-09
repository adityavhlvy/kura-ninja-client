import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './view/home/Home';
import About from './view/about/About';
import Projects from './view/projects/Projects';
import ProjectDetail from './view/projects/ProjectDetail';
import Certifications from './view/certifications/Certifications';

import DesignSystem from './view/design-system/DesignSystem';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="certifications" element={<Certifications />} />
          <Route path="about" element={<About />} />
          <Route path="design-system" element={<DesignSystem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
