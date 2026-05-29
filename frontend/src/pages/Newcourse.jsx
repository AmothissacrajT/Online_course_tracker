import axios from "axios"
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Newcourse = () => {

    const [title,setTitle] = useState("");
    const [instructor,setInstructor] = useState("");
    const [description,setDescription] = useState("")
    const [modules,setModules] = useState(0);
    const [price,setPrice] = useState(0);
    const [url,setURL] = useState("");
    const [isPublic,setIsPublic] = useState(false);

    const handleCreate = async() => {
        try{
            const res = await axios.post("/api/courses/", {
                title,
                instructor,
                description,
                modules,
                price,
                url,
                isPublic,
            });

            alert(res.data.message);
        }

        catch (err) {

            alert(err.response?.data?.message || "Course creation failed");
        }
    }


    return(
        <div className="w-screen flex flex-col h-screen">
            <div className="flex-1 bg-red-400"> <Navbar /> </div>

            <div className="flex-[10] p-16"> {/*Area without navbar*/}

                <div className="flex flex-col bg-amber-200 gap-14 p-10 border border-black"> {/*Writable area with padding from edges (padding "p-16" in Area without navbar) */}
                    <div className="self-center font-bold text-3xl"> Create Course</div>

                    <div className="flex flex-row ml-[4vw] mr-[4vw]">

                        <div className="flex flex-col gap-2">
                            <label className="text-lg font-semibold"> Title </label>
                            <input
                                onChange = {(e) => setTitle(e.target.value)}
                                placeholder = "Title"
                                className = "w-[25vw] px-6 py-3 rounded-xl border border-gray-500 shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            /> 
                        </div>
                        
                        <div className="ml-auto flex flex-col gap-2">
                            <label className="text-lg font-semibold"> Instructor </label>
                            <input
                                onChange = {(e) => setInstructor(e.target.value)}
                                placeholder = "Instructor"
                                className = "w-[25vw] px-6 py-3 rounded-xl border border-gray-500 shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            /> 
                        </div>

                    </div>
                    

                    <div className="flex flex-row ml-[4vw] mr-[4vw]">

                        <div className="flex flex-col gap-2">
                            <label className="text-lg font-semibold"> Description </label>
                            <input
                                onChange = {(e) => setDescription(e.target.value)}
                                className = "w-[30vw] h-[25vh] px-6 py-3 rounded-xl border border-gray-500 shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            /> 
                        </div>
                    
                        <div className="flex flex-col gap-10 ml-auto">

                            <div className="flex flex-col gap-2">
                                <label className="text-lg font-semibold"> No of Modules </label>
                                <input
                                    type="number"
                                    onChange = {(e) => setModules(e.target.value)}
                                    placeholder = "Modules"
                                    className = "w-[25vw] px-6 py-3 rounded-xl border border-gray-500 shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                /> 
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-lg font-semibold"> URL </label>
                                <input
                                    onChange = {(e) => setURL(e.target.value)}
                                    placeholder = "URL"
                                    className = "w-[25vw] px-6 py-3 rounded-xl border border-gray-500 shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                /> 
                            </div>

                        </div>

                    </div>


                    <div className="flex flex-row ml-[4vw] mr-[24vw]">
                        
                        <div className="flex flex-col gap-2">
                            <label className="text-lg font-semibold">Price</label>
                            <input
                                onChange = {(e) => setPrice(e.target.value)}
                                placeholder = "Price"
                                className= "w-[25vw] px-6 py-3 rounded-xl border border-gray-500 shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        
                        <div className="flex flex-col gap-2 ml-auto">
                            <label className="text-lg font-semibold"> Public </label>
                            <button 
                                onClick = {() => setIsPublic(!isPublic)}
                                className= {`relative w-20 h-10 rounded-full transition-colors duration-300 ${
                                    isPublic? "bg-green-500" : "bg-gray-300"
                                }`}
                            >
                                <span
                                    className= {`absolute top-2 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                                        isPublic ? "translate-x-12" : "translate-x-0"
                                    }`}
                                />
                            </button>
                        </div>

                    </div>

                    <button
                        onClick={handleCreate}
                        className= "self-center w-[6vw] py-3 text-white rounded-full shadow-md bg-blue-600 hover:bg-blue-700 transtition duration-200 "
                    >
                        Create
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Newcourse;