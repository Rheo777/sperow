import React from 'react';
import NavBar from './navbarMain';
import MainPageLeft from './mainPageLeft';
import MainPageRight from './mainPageRight';
import AnswerMiddlePage from './answerMiddlePage';

const AnswersPage = () => {
  return (
    <>
      {/* Sticky NavBar */}
      <div className="sticky top-0 z-10">
        <NavBar />
      </div>

      {/* Main Content */}
      <div className="flex mx-3 my-3">
        {/* Left Sidebar with margin to avoid overlap with NavBar */}
        <div className="w-1/4 sticky top-[80px] h-screen">
          <MainPageLeft />
        </div>

        {/* Middle Content for answers */}
        <div className="w-4/5 overflow-y-auto">
          <AnswerMiddlePage />
        </div>

        {/* Right Sidebar with margin to avoid overlap with NavBar */}
        <div className="w-1/4 sticky top-[80px] h-screen">
          <MainPageRight />
        </div>
      </div>
    </>
  );
};

export default AnswersPage;
