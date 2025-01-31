import React from 'react';
import styles from '../styles/buttonContainer.module.css'; // Import the CSS module

function ButtonContainer({
  profileImage,
  name,
  subhead,
  iconSrc,
  signOut
}) {
  const role = localStorage.getItem('role');
  const bgColor = role === 'user' ? '#3973EB' : '#30A45E';
  return (
    <>
      <div className={styles.buttonContainer} style={{backgroundColor:bgColor}}>
        {/* Profile Image */}
        <img
          className={styles.profileImage}
          src={profileImage}
          alt='doctor'
        />

        {/* User Details */}
        <div className={styles.userDetails}>
          <div className={styles.userName}>
          {name}
          </div>
          <div className={styles.userFollowers}>{subhead}</div>
        </div>

        {/* Logout Icon */}
        <div className={styles.logoutIconContainer} onClick={signOut}>
          <i className={`${iconSrc} ${styles.logoutIcon}`}></i>
        </div>
      </div>
    </>
  );
}

export default ButtonContainer;
