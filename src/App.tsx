import React from 'react';
import { RouterProvider, useRouter } from './router';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CareersPage } from './pages/CareersPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { CampusPage } from './pages/CampusPage';

const AppContent: React.FC = () => {
  const { pathname } = useRouter();

  switch (pathname) {
    case '/':
      return <HomePage />;
    case '/about':
      return <AboutPage />;
    case '/careers':
      return <CareersPage />;
    case '/blog':
      return <BlogPage />;
    case '/contact':
      return <ContactPage />;
    case '/nextgen-campus-leaders':
      return <CampusPage />;
    default:
      return (
        <div style={{ padding: '80px 24px', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h2>404 - Page Not Found</h2>
          <p>The page you are looking for does not exist.</p>
          <p>
            <a href="/" style={{ color: 'var(--orange)', fontWeight: 'bold' }}>Go back home</a>
          </p>
        </div>
      );
  }
};

function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}

export default App;
