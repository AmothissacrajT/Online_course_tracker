import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Home = () => {

    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/api/courses/")
        .then((response) => {
            setCourses(response.data);
        })
        .catch((error) => {
            console.error("Error fetching course:",error);
        });
    }, []);


    return(

        <div className="w-screen flex flex-col h-screen">
            <div className="flex-1 bg-red-400"> <Navbar /> </div>

            <div className="flex-[10] bg-blue-500 p-16"> {/* Lower Body Half*/} 
                
                <div className="flex flex-col ml-[6vw] mr-[6vw] gap-10"> {/*Content sections */}
                    <div className="text-3xl self-start font-bold">
                        My Courses
                    </div>
                    <div className="flex flex-col items-center gap-10"> {/*Column of cards */}
                        {courses.map((course) => (
                            <div key={course.id} className="w-[60vw] p-6 bg-red-500 rounded-xl border"> {/*Card*/}
                                <div className="font-bold text-xl">{course.title} </div>
                                <div className="italic font- text-sm">Instructor - {course.instructor}</div>
                                <div className="h-4"></div>
                                <div className="font-semibold "> Description</div>
                                <div>{course.description}</div>
                            </div>
                        ))}
                    </div>
                    
                </div>    

                <button 
                    onClick ={() => navigate("/newcourse")} 
                    className="fixed 
                        bottom-12 right-12 
                        px-5 py-3
                        font-bold bg-amber-100 
                        rounded-full shadow-lg 
                    "
                >
                     + Add Course

                </button> 
            </div>
            
        </div>
        
    );
}

export default Home;