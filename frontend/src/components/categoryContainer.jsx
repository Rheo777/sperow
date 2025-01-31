import React from 'react';
import styles from '../styles/categoryContainer.module.css'; // Import the CSS module

function CategoryContainer({ content }) {
  return (
    <>
      <div className={styles.buttonContainer}>
        <div className={styles.userDetails}>
          <div className={styles.userName}>
            {content}
          </div>
        </div>

        {/* Logout Icon */}
        <div className={styles.logoutIconContainer}>
          <i className={`uil uil-plus ${styles.logoutIcon}`}></i>
        </div>
      </div>
    </>
  );
}

export default CategoryContainer;
