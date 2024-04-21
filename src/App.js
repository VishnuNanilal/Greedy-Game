import { useState } from 'react';
import './App.css';
import Main from './components/Main'
import Help from './components/Help';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';


function App() {
  const [helpDisplay, setHelpDisplay] = useState(false)
  return (
    <div className="App"> 
      <FontAwesomeIcon onClick={()=>setHelpDisplay(true)} icon={faInfo} className='help-icon'/>
      {helpDisplay && <Help closeHelp={()=>setHelpDisplay(false)}/>}
      <Main />
    </div>
  );
}

export default App;