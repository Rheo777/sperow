import React, { useState } from 'react';
import { FaPen, FaCheck, FaTimes } from 'react-icons/fa';
import SettingsLeft from './settingsleft'; // Adjust the import path as necessary

const ProfileSettings = () => {
  // State to manage visibility of the input blocks
  const [isUsernameInputVisible, setUsernameInputVisible] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [username, setUsername] = useState('Charan Boorle');

  const [isEmailInputVisible, setEmailInputVisible] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [email, setEmail] = useState('charanboorle@gmail.com');

  const [isPhoneInputVisible, setPhoneInputVisible] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [phone, setPhone] = useState('7893****');

  const [isPasswordInputVisible, setPasswordInputVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [password, setPassword] = useState('****');

  const toggleUsernameInput = () => setUsernameInputVisible((prev) => !prev);
  const toggleEmailInput = () => setEmailInputVisible((prev) => !prev);
  const togglePhoneInput = () => setPhoneInputVisible((prev) => !prev);
  const togglePasswordInput = () => setPasswordInputVisible((prev) => !prev);

  const handleSaveUsername = () => {
    setUsername(newUsername);
    setUsernameInputVisible(false);
    setNewUsername('');
  };

  const handleSaveEmail = () => {
    setEmail(newEmail);
    setEmailInputVisible(false);
    setNewEmail('');
  };

  const handleSavePhone = () => {
    setPhone(newPhone);
    setPhoneInputVisible(false);
    setNewPhone('');
  };

  const handleSavePassword = () => {
    setPassword(newPassword);
    setPasswordInputVisible(false);
    setNewPassword('');
  };

  const handleCancelUsername = () => {
    setUsernameInputVisible(false);
    setNewUsername('');
  };

  const handleCancelEmail = () => {
    setEmailInputVisible(false);
    setNewEmail('');
  };

  const handleCancelPhone = () => {
    setPhoneInputVisible(false);
    setNewPhone('');
  };

  const handleCancelPassword = () => {
    setPasswordInputVisible(false);
    setNewPassword('');
  };

  return (
    <div className="flex min-h-screen h-full"> {/* Flex container for full height */}
      <div className="w-1/3 h-full"> {/* Adjust width as necessary for SettingsLeft */}
        <SettingsLeft />
      </div>
      <div className="w-2/3 h-full flex-grow"> {/* Profile Settings Section with full height */}
        <div className="w-full h-full mx-auto min-h-full mt-10 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <div className="w-full h-full p-4 bg-gray-100 rounded-lg shadow mb-4"> {/* Full height inner container */}
            <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">Profile Settings</h2>

            {/* Username Block */}
            <div className="flex justify-between items-center py-4 border-b border-gray-400">
              <span className="text-md text-gray-600 font-medium">Username: {username}</span>
              <div className="flex items-center">
                <FaPen className="text-gray-600 mr-2 cursor-pointer" onClick={toggleUsernameInput} />
              </div>
            </div>

            {/* New Username Input Block */}
            {isUsernameInputVisible && (
              <div className="flex justify-between items-center py-4 border-b border-gray-400 bg-gray-100 rounded-lg mt-2">
                <span className="text-md text-gray-600 font-medium">Set New Username:</span>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="p-2 border border-gray-400 rounded-md mr-2"
                    placeholder="Enter new username"
                  />
                  <button
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
                    onClick={handleSaveUsername}
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="p-2 bg-red-800 text-white rounded-md hover:bg-red-600 ml-2 flex items-center"
                    onClick={handleCancelUsername}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            )}

            {/* Email Block */}
            <div className="flex justify-between items-center py-4 border-b border-gray-400">
              <span className="text-md text-gray-600 font-medium">Email: {email}</span>
              <div className="flex items-center">
                <FaPen className="text-gray-600 mr-2 cursor-pointer" onClick={toggleEmailInput} />
              </div>
            </div>

            {/* New Email Input Block */}
            {isEmailInputVisible && (
              <div className="flex justify-between items-center py-4 border-b border-gray-400 bg-gray-100 rounded-lg mt-2">
                <span className="text-md text-gray-600 font-medium">Set New Email:</span>
                <div className="flex items-center">
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="p-2 border border-gray-400 rounded-md mr-2"
                    placeholder="Enter new email"
                  />
                  <button
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
                    onClick={handleSaveEmail}
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="p-2 bg-red-800 text-white rounded-md hover:bg-red-600 ml-2 flex items-center"
                    onClick={handleCancelEmail}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            )}

            {/* Phone Number Block */}
            <div className="flex justify-between items-center py-4 border-b border-gray-400">
              <span className="text-md text-gray-600 font-medium">Phone Number: {phone}</span>
              <div className="flex items-center">
                <FaPen className="text-gray-600 mr-2 cursor-pointer" onClick={togglePhoneInput} />
              </div>
            </div>

            {/* New Phone Number Input Block */}
            {isPhoneInputVisible && (
              <div className="flex justify-between items-center py-4 border-b border-gray-400 bg-gray-100 rounded-lg mt-2">
                <span className="text-md text-gray-600 font-medium">Set New Phone Number:</span>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="p-2 border border-gray-400 rounded-md mr-2"
                    placeholder="Enter new phone number"
                  />
                  <button
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
                    onClick={handleSavePhone}
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="p-2 bg-red-800 text-white rounded-md hover:bg-red-600 ml-2 flex items-center"
                    onClick={handleCancelPhone}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            )}

            {/* Password Block */}
            <div className="flex justify-between items-center py-4 border-b border-gray-400">
              <span className="text-md text-gray-600 font-medium">Password: {password}</span>
              <div className="flex items-center">
                <FaPen className="text-gray-600 mr-2 cursor-pointer" onClick={togglePasswordInput} />
              </div>
            </div>

            {/* New Password Input Block */}
            {isPasswordInputVisible && (
              <div className="flex justify-between items-center py-4 bg-gray-100 rounded-lg mt-2">
                <span className="text-md text-gray-600 font-medium">Set New Password:</span>
                <div className="flex items-center">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="p-2 border border-gray-400 rounded-md mr-2"
                    placeholder="Enter new password"
                  />
                  <button
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
                    onClick={handleSavePassword}
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="p-2 bg-red-800 text-white rounded-md hover:bg-red-600 ml-2 flex items-center"
                    onClick={handleCancelPassword}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
