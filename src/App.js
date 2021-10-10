import React from 'react';
import { Signup } from './features/signup';
import { ErrorBoundary } from './components/ErrorBoundary';
import styles from './App.module.css';

function App() {
  return (
    <div className="App">
      <main className={styles.main}>
        <ErrorBoundary>
          <Signup />
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
