import { useState } from 'react';
import './App.css';
// import Main from './components/Main'
import Help from './components/Help';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GameScreen from './screens/GameScreen';
import MenuScreen from './screens/MenuScreen'

function App() {
  const [helpDisplay, setHelpDisplay] = useState(false)
  return (
    <div className="App"> 
      <FontAwesomeIcon onClick={()=>setHelpDisplay(true)} icon={faInfo} className='help-icon'/>
      {helpDisplay && <Help closeHelp={()=>setHelpDisplay(false)}/>}
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<MenuScreen/>} />
          <Route path={'/game-screen'} element={<GameScreen/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;