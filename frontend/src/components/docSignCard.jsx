import React, { useState } from 'react';
import { UilGoogle, UilEye, UilEyeSlash } from '@iconscout/react-unicons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const SignCard = ({ inputs, buttons }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response;
        try {
            
                response = await axios.post('http://localhost:5003/api/doctors/login', {
                    email: formData.email,
                    password: formData.password
                });
            

            // Get the token from the response
            const token = response.data.token;
            // Decode the JWT to extract the role
            const decodedToken = jwtDecode(token);
            const userRole = decodedToken.role;  // Assume role is part of the payload
            console.log('Decoded Role:', userRole);
            const doctorSpecialization = decodedToken.specialization;
            // Store the token and role in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('role', userRole);
            localStorage.setItem('specialization',doctorSpecialization);

            if (response.status === 200) {
                console.log('Login successful');
                navigate('/homePage');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError("An error occurred during login. Please try again.");
        }
    };

    return (
        <div className="bg-[linear-gradient(134.59deg,rgba(83,162,186,0.2)17.59%,rgba(57,115,235,0.2)95.85%)] p-8 rounded-2xl w-full md:w-2/5 lg:w-1/3 text-black flex flex-col items-center mt-10 ml-10">
            <form onSubmit={handleSubmit} className="w-full">
                <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold">Glad to Have You!</h3>
                    <h3 className="text-xl font-semibold">Log In for Personalized Health Services</h3>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {inputs.map((input, index) => (
                    <div key={index} className="w-full mb-4 relative">
                        <input 
                            type={input.type === 'password' && showPassword ? 'text' : input.type}
                            placeholder={input.placeholder}
                            name={input.name}
                            value={formData[input.name]} 
                            onChange={handleInputChange} 
                            required={input.required} 
                            className="w-full p-4 rounded-lg border border-customGray bg-custom-gradient text-md"
                        />
                        {input.type === 'password' && (
                            <span
                                onClick={togglePasswordVisibility}
                                className="absolute right-4 top-4 cursor-pointer"
                            >
                                {showPassword ? <UilEyeSlash className="text-gray-500" /> : <UilEye className="text-gray-500" />}
                            </span>
                        )}
                    </div>
                ))}

                <div className="flex justify-end w-full mb-4">
                    <a href="#" className="text-blue-500 underline text-sm">Forgot Password?</a>
                </div>

                <button className="w-full h-12 bg-blue-600 text-white rounded-md text-md font-sm mb-4" >
                    {buttons.main}
                </button>

                <div className="flex justify-center text-gray-600 mb-4 w-full">
                    <span className="px-2 text-center">OR</span>
                </div>

                <div className="w-full flex justify-center mb-4">
                    <button 
                        className="w-full md:w-64 p-2 border-2 border-blue-600 text-blue-600 rounded-md flex justify-center items-center"
                    >
                        Login with 
                        <UilGoogle className="ml-2 text-blue-600 text-2xl" />
                    </button>
                </div>

                <p className="text-sm text-gray-500 text-center">
                    Don't Have An Account? <span className="text-blue-500 cursor-pointer font-bold" onClick={()=>{
                        navigate('/UserSignUp')
                    }}>Sign Up</span>
                </p>
            </form>
        </div>
    );
};

export default SignCard;
