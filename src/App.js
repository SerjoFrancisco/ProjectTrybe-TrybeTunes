import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routers';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }
}

export default App;
