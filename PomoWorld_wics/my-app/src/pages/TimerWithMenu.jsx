// // src/components/TimerWithMenu.js
// import React, { useState } from 'react';
// import Timer from './Timer.jsx';
// import Menu from './Menu.jsx';

// const TimerWithMenu = () => {
//   const [menuOpen, setMenuOpen] = useState(true);

//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   return (
//     <div style={{ display: 'flex' }}>
//       {/* Side Menu */}
//       <Menu toggleMenu={toggleMenu} menuOpen={menuOpen} />

//       {/* Timer */}
//       <Timer menuOpen={menuOpen} />
//     </div>
//   );
// };

// export default TimerWithMenu;
