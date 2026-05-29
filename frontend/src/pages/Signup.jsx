import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");

    const navigate = useNavigate();

    const handleSignup = async() => {
        try{
            const res = await axios.post("/api/signup/", {
                username,
                password,
                email,
            });

            alert(res.data.message);
        }
        catch (err) {
            alert(err.response?.data?.message || "Signup failed");
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">

            <div className="p-8 rounded-xl w-full max-w-md bg-amber-100">

                <div className="text-2xl font-bold text-center mb-8">Create Account</div>

                <div className="flex flex-col gap-5">
                    <div>
                        <label className ="text-sm font-medium text-gray-700" >Name</label>
                        <input 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder = "Username"
                            className="w-[20vw] px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className ="text-sm font-medium text-gray-700" >Password</label>
                        <input type = "password"
                                onChange = {(e) => setPassword(e.target.value)} 
                                placeholder = "Password"
                                className="w-[20vw] px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className ="text-sm font-medium text-gray-700" >Email</label>
                        <input onChange = {(e) => setEmail(e.target.value)} 
                                placeholder = "Email"
                                className="w-[20vw] px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <button onClick = {handleSignup} 
                            className=" self-center mt-4 font-medium
                            w-[10vw] bg-blue-600 text-white py-2 rounded-lg 
                            hover:bg-blue-700 transition duration-200 
                            "> 
                         SignUp
                    </button>
                </div>
            </div>

                <div className="flex flex-row m-10 gap-2">
                    <p className=" text-md text-gray-500">Already have an account?</p>
                    <span onClick = {() => navigate("/login")} className="font-bold cursor-pointer text-blue-600">Login</span>
                </div>
        </div>
    );
}

export default Signup;