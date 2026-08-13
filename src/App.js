import React, { useCallback, useState } from 'react';
import TetHero from './components/TetHero';
import SectionDrawer from './components/tet/SectionDrawer';
import SocialsDock from './components/tet/SocialsDock';
import DragonSeal from './components/tet/DragonSeal';

function App() {
  // one drawer open at a time; the matching bulb is lit while it's open
  const [activeSection, setActiveSection] = useState(null);
  const toggleSection = useCallback((id) => {
    setActiveSection((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="App" style={{ position: 'relative' }}>
      <TetHero activeSection={activeSection} onToggleSection={toggleSection} />
      <SocialsDock />
      <DragonSeal />
      <SectionDrawer activeSection={activeSection} onSelect={setActiveSection} onClose={() => setActiveSection(null)} />
    </div>
  );
}

export default App;
