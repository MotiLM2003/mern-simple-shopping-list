import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../app.css';
import AppNavbar from './AppNavbar';
import ShoppingList from './/ShoppingList/ShoppingList';

const App = () => {
  return (
    <div className='App'>
      <AppNavbar />
      <ShoppingList />
    </div>
  );
};

export default App;
