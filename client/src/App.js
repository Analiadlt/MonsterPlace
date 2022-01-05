import React from 'react';
import { Route } from 'react-router-dom';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import Home from './components/Home'



import './sass/app.scss'
function App() {

  return (
    <div className="App">
      <Route path="/Home" component={Home} />
    </div>
  );
}

export default App;
