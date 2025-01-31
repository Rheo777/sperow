import React, { useState } from 'react'; // Ensure React and useState are imported

import NavBarMain from './navbarMain'; 
import Docprofile from './docimage';
import ButtonGroupComponent from './ButtonGroupComponent';
import InfoSectionComponentStylish from './Infocontent';
import PostsContent from './PostsContent';
import ArticleContent from './ArticlesContent';
import AnsweredContent from './AnsweredContent';
import FollowingContent from './FollowingContent';

function App() {
  const [selectedSection, setSelectedSection] = useState('Info'); // Default section

  // Function to render content based on the selected section
  const renderSection = () => {
    switch (selectedSection) {
      case 'Posts':
        return <PostsContent />;
      case 'Articles':
        return <ArticleContent />;
      case 'Answered':
        return <AnsweredContent />;
      case 'Following':
        return <FollowingContent />;
      default:
        return <InfoSectionComponentStylish />;
    }
  };

  return (
    <>
      <NavBarMain />
      <Docprofile />
      
      {/* Pass the state setter to the ButtonGroupComponent */}
      <ButtonGroupComponent onSelectSection={setSelectedSection} />
      
      {/* Render the selected section */}
      {renderSection()}
    </>
  );
}

export default App;
