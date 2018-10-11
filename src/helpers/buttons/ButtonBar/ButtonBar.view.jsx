import { Button } from 'react-md';
import React from 'react';

import { injectState } from 'freactal';
import styles from './ButtonBar.module.css';

// eslint-disable-next-line no-unused-vars
export default injectState(({ children, small }) => (
  <div className={`${styles.ButtonBar} ${small ? styles['ButtonBar--small'] : ''}`}>
    {React.Children.toArray(children).map((child, i) => (
      <div key={`child_${i}`} className={styles.ButtonBar__cell}>
        {child}
      </div>
    ))}
  </div>
));
