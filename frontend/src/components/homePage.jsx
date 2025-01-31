import React from 'react';
import NavBar from './navbarMain';
import MainPageLeft from './mainPageLeft';
import QuestionContainer from './questionContainer';
import MainPageRight from './mainPageRight';
import QuestionAnswer from './questionAnswer'; 

function HomePage() {
    const navItems = [
        { name: 'Products' },
        { name: 'Contact' },
        { name: 'About Us' }
    ];

    return (
        <>
        <div className='bg-[#e2eeff]'>
            <div className='sticky z-10 top-0'>
                <NavBar list={navItems}/>
            </div>
            
            <div className='flex mx-3 my-3' >
                {/* Set fixed widths to avoid horizontal scrolling */}
                <div className="w-1/4 h-full overflow-y-auto">
                    <MainPageLeft />
                </div>

                <div className="flex-grow h-full w-full">
                    <QuestionContainer />
                </div>

                <div className="w-1/4 h-full overflow-y-auto">
                    <MainPageRight />
                </div>
            </div>

            {/* Display QuestionAnswer component directly */}
            <div className="w-[900px] mx-auto p-4 bg-white gap-1 rounded-xl">
                <h2 className="text-xl font-bold mb-4 text-[#3973eb] text-center">More Questions</h2>

                {/* QuestionAnswer component handles fetching internally */}
                <QuestionAnswer />
            </div>
            </div>
        </>
    );
}

export default HomePage;
