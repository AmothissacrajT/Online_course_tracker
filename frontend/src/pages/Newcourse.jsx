import axios from "axios"
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Newcourse = () => {

    const [title,setTitle] = useState("");
    return(
        <div className="w-screen flex flex-col h-screen">
            <div className="flex-1 bg-red-400"> <Navbar /> </div>

            <div className="flex-[10]  p-16"> {/*Area without navbar*/}

                <div className="flex flex-col bg-amber-200 gap-14 p-10"> {/*Writable area with padding from edges */}
                    <div className="self-center font-bold text-3xl"> Create Course</div>

                    <div className="flex flex row justify-center">

                        <div className="flex flex-col gap-2">
                            <label className="text-lg font-semibold"> Title </label>
                            <input
                                onChange = {(e) => setTitle(e.target.value)}
                                placeholder = "Title"
                                className = "w-[25vw] px-6 py-3 rounded-xl border border-gray-500 shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            /> 
                        </div>
                        <div className="w-[30vw]"></div>
                        <div className="flex flex-col gap-2">
                            <label className="text-lg font-semibold"> Instructor </label>
                            <input
                                onChange = {(e) => setTitle(e.target.value)}
                                placeholder = "Title"
                                className = "w-[25vw] px-6 py-3 rounded-xl border border-gray-500 shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            /> 
                        </div>

                    </div>
                    

                    <div className="flex flex row justify-center ">

                        <div className="flex flex-col gap-2">
                            <label className="text-lg font-semibold"> Description </label>
                            <input
                                onChange = {(e) => setTitle(e.target.value)}
                                className = "w-[30vw] h-[25vh] px-6 py-3 rounded-xl border border-gray-500 shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            /> 
                        </div>
                        <div className="w-[25vw]"></div>
                        <div className="flex flex-col gap-2">
                            <label className="text-lg font-semibold"> No of Modules </label>
                            <input
                                onChange = {(e) => setTitle(e.target.value)}
                                placeholder = "Title"
                                className = "w-[25vw] px-6 py-3 rounded-xl border border-gray-500 shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            /> 
                        </div>

                    </div>
                    

                </div>
            </div>
        </div>
    );
}

export default Newcourse;