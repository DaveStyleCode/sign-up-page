import React from 'react';
import styles from '../../App.module.css';

export class ErrorBoundary extends React.Component {
  state = {};
  static getDerivedStateFromError(e) {
    return { error: e };
  }

  render() {
    return this.state.error ? (
      <div className={styles.Container}>
        <h1>Error</h1>
        {this.state.error.toString()}
      </div>
    ) : (
      this.props.children
    );
  }
}
