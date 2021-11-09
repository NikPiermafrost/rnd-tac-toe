import React from 'react';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import RouterComponent from './components/layout/RouterComponent';

const App: React.FC = () => {
  return (
    <main className="bg-gray-600 text-yellow-400 h-screen w-100">
      <Header />
      <RouterComponent />
      <Footer />
    </main>
  );
};

export default App;
