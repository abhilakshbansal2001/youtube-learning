import React,{useEffect,useContext,useState} from 'react'
import {Link} from 'react-router-dom'
import {userContext} from'../Context/UserContext'
import { db } from '../firebase/Firebase'
// import '';
import '../Styles/Courses.css'

const Courses = (props) => {
    const { match } = props
   
    const courseName = match.params.id

    const wallpaper = `${courseName}-wallpaper.jpg`;
    const [state,dispatch,user,detail] = useContext(userContext);
    const [course, setCourse] = useState([])



    useEffect(() => {
        db.collection(courseName)
        .get().then(function(querySnapshot) {
            let docs = []
            querySnapshot.forEach(function(doc) {
            docs.push(doc.data())
    });
        setCourse([...docs])
    });
    }, [courseName])

    useEffect(() => {

        // if(user !== "NULL")
        // console.log(user['frontend'].watched_videos[user['frontend'].watched_videos.length -1 ])
        
    }, [user])


   
    return (
        <div>
            <div className="course-header" style={{backgroundImage:`url(../images/${wallpaper})`}}>
                <div className="title-courses text-center">
                    <h1 className="my-4 py-3">{courseName.toUpperCase().replace(/-/g, ' ')}</h1>
                    <p>by- ElEarning.com</p>
                </div>

            </div>
            <div className="ruler-course"></div>

            <div className="courses mb-5 pb-4">
                <h1 className="text-center py-2 mb-4">
                    Choose Course
                </h1>
                
                <div className="courses-list container-fluid w-100 mx-auto" style={{overflowX:'hidden'}}>
                    <div className="row pt-3 pb-5 d-flex justify-content-center flex-wrap">
                      
                        {course.length !== 0 && course.map((doc,index) => {
                            return (
                                    <div className="col-md-3 mx-2 my-2">
                                        <div class="card-courses card transition">
                                            <h2 class="transition">{doc.name}<small style={{display:'block',margin:'10px'}}>{index + 1} of {course.length} series of <div className="d-block">{courseName.toUpperCase().replace(/-/g, ' ')}</div></small></h2>
                                            
                                            
                                           {user !== "NULL" && course.length !== 0 && state !=="NULL" && (user[doc.val] && user[doc.val].id === doc.val && user[doc.val].courseParent === courseName) ?  
                                            <div class="cta-container transition" ><Link to={`/course/${courseName}/${ doc.val && doc.val.toLowerCase()}/${user[doc.val].watched_videos.length !== 0 && user[doc.val].watched_videos[user[doc.val].watched_videos.length -1 ].id}`} class="cta">Continue Watching </Link></div>
                                            : <div class="cta-container transition"><Link to={`/course/${courseName}/${ doc.val && doc.val.toLowerCase()}`} class="cta">See course</Link></div>
                                            }

                                            
                                            
                                            
                                            
                                            <div class="card_circle transition" style={{backgroundImage:`url(../images/${wallpaper})`}}></div>
                                        </div>
                                    </div>
                            )
                        }) 
                        
                        }
                
                 
                 

                    </div>
                    
                </div>
            </div>

        </div>
    )
}

export default Courses
