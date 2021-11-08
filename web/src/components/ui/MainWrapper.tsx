import React from 'react';

interface MainWrapperProps {
  children: React.ReactNode
}

const MainWrapper: React.FC<MainWrapperProps> = ({ children }) => {
  return (
    <div className="bg-gray-600 h-screen w-full">
      { children }
    </div>
  );
};

export default MainWrapper;
