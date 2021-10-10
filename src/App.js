import React from 'react';
import { Signup } from './features/signup';
import styles from './App.module.css';

function App() {
  return (
    <div className="App">
      <main className={styles.main}>
        <Signup />
      </main>
    </div>
  );
}

export default App;
