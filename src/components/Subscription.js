import React, { useState,useEffect,useContext } from 'react'
import {useHistory ,Link} from 'react-router-dom'
import { userContext } from '../Context/UserContext'
import { db } from '../firebase/Firebase'
// import { CircularProgressbar } from 'react-circular-progressbar';
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
  } from "react-circular-progressbar";
  import AnimatedProgressProvider from '../Animation/AnimatedProgressProvider'
import 'react-circular-progressbar/dist/styles.css';
import { easeQuadInOut } from "d3-ease";
import humanizeDuration from 'humanize-duration'
import ReactPlayer from 'react-player/youtube'
import '../Styles/Subscription.css'

const Subscription = (props) => {

    const [isHide, setIsHide] = useState(false)
    const [ended, setEnded] = useState(false)
    const [data, setData] = useState('')
    const [duration, setDuration] = useState(0)
    const [length, setLength] = useState(0)
    const [time, setTime] = useState('')
    const [state,dispatch,user,detail] = useContext(userContext);

    const courseName = props.match.params.courseName
    const course = props.match.params.pathParam1
    const videoId = props.match.params.pathParam2
   

    const history = useHistory()


    //circular next video
    function Circular(props) {
        return (
          
            <div style={{ marginBottom: 30, display: "flex" }}>
              <div style={{ width: "150px",height:"150px"}}>{props.children}</div>
              
            </div>
        );
      }

    const hidePlayer = (e) => {
        const player = document.querySelector(".youtube-video");
        player.classList.toggle("hide-player")
        console.log("clicked !");
        if(!isHide)
            {
                e.target.innerText = "Show"
                setIsHide(!isHide)
            }
        else{
            e.target.innerText = "Hide"
            setIsHide(!isHide)
        }
        
    }

  

    // function isSub(){
    //     const isFound = user.subscription.find((rev) => rev.id === course )
    //     if(isFound)
    //         return true;
    //     return false
    // }


    //convert seconds to 'hh:mm:ss'


    
    useEffect(() => {

        if(( user == "NULL") || (user !== "NULL" && user && state !=="NULL" && (user[course] && user[course].id !== course && user[course].courseParent !== courseName) ))
            history.replace(`/course/${courseName}/${course}`)

    }, [user])

    let Player = ''

    useEffect(() => {
        
        const docRef = db.collection(courseName).doc(course)

        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log(doc.data().course.content);
                setData(doc.data())
            } else {
                // doc.data() will be undefined in this case
                history.push("/")
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

        return () => {
            // sendDetails()
        }

        


    }, [])


    //find the if video is in user variable
    function isVideoDone(id){
        if(user !== "NULL" && state !=="NULL" && data){
             const findVideo = user[course].watched_videos.find(vid => vid.id === id )
             if(findVideo && findVideo.duration > 0.98)
             {
                 return findVideo
             }
             
        }
        return false;
    }
    function videoBorder(id){
        if(user !== "NULL" && state !=="NULL" && data){
             const findVideo = user[course].watched_videos.find(vid => vid.id === id )
             if(findVideo )
             {
                 return findVideo
             }
             
        }
        return false;
    }

    //Send the duration to server

    function checkIfVideoExists(){
        
           const findVideo = user[course].watched_videos.findIndex(e => e.id === videoId)
           if(findVideo && user[course].watched_videos[findVideo] && user[course].watched_videos[findVideo].duration < 0.998 ){
            user[course].watched_videos.splice(findVideo,1)
           }
           return;
          
    }

    //return duration of video watched
 
    useEffect(() => {
        setTime(0)
        setDuration(0)
        setLength(0)
    }, [videoId])

    useEffect(() => {
        if(user !== "NULL" ){
            // console.log('mkdmdk');
        const findVideo = user[course].watched_videos.find(e => e.id === videoId)
        
        if(findVideo){
            
                setTime(findVideo.duration < 0.98 ? findVideo.duration : 0)
        }
    }
 
    
        // return;
    }, [user,videoId])



    const sendDetails = () => {
        let ind = ''
    

        // if(user !== 'NULL'&& state !== "NULL" && data){
            if(user === 'NULL' && !data)
                return;

         ind = data.videos.findIndex(e => e.id === videoId)
         checkIfVideoExists()
        const arr = user[course].watched_videos
        const watched = {
            id:videoId,duration
        }

        
            arr.push(watched)
        

        db.collection("Users").doc(state.uid)
        .update({
            [course]: {
                id:user[course].id,
                courseParent:user[course].courseParent,
                watched_videos: arr
            }
          }).then(function() {
            console.log("Frank food updated");
          })
        .catch(() => {

        })
    }
    
    var newVideo;

    const something = (e) => {
        
        sendDetails();
        setEnded(true)

        let ind = data.videos.findIndex(e => e.id === videoId)

         newVideo  = setTimeout(function(){
        document.querySelector(".nextVideoQuestion").classList.remove("show")

            setEnded(false)
            history.replace(`/course/${courseName}/${course}/${data.videos[ind + 1].id}`)
           
        }, 3000);
        console.log(newVideo,"><><><");

        document.querySelector(".nextVideoQuestion").classList.add("show")
    }

    function funDuration(e){
        setDuration(e.played)
        
    }

    function cancel(){
        setEnded(true)
        console.log(newVideo,"><><><");
        clearTimeout(newVideo)
        
        document.querySelector(".nextVideoQuestion").classList.remove("show")
    }

   

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-9 pb-4 px-0">
                    <div className="youtube-video  col-12 px-0">
                       
                        {user !== 'NULL' && time !== '' && <ReactPlayer className="video-player" width={'100%'} height={'500px'} playing={!ended} url={`https://www.youtube.com/watch?v=${videoId}&t=${ length && time ? Math.floor(time 
                        * length) : 0}s`} onEnded={something} onProgress={funDuration} controls={true} onDuration={(duration) =>{
                           setLength(duration)
                      
                            
                        }} />}

                        <div className="nextVideoQuestion">
                            {ended &&  
                        <Circular label="Fully controlled text animation using react-move">
                            <AnimatedProgressProvider
                                valueStart={0}
                                valueEnd={100}
                                duration={2.5}
                                easingFunction={easeQuadInOut}
                                
                            >
                                {value => {
                                const roundedValue = Math.round(value/20);
                                return (
                                    <CircularProgressbar
                                    value={value}
                                    text={roundedValue}
                                    styles={buildStyles({
                                        textColor: "white",
                                        pathColor: "white",
                                        
                                      })}
                                    styles={buildStyles({ pathTransition: "none" })}
                                    />
                                );
                                }}
                            </AnimatedProgressProvider>
                        </Circular>
                        }
                            <button className="btn btn-large btn-danger" onClick={cancel}>CANCEL</button>
                        </div>
                    </div>
                    <div className="col-12 py-3 mt-2 mark-as-done d-flex justify-content-between">
                        <div className="custom-control custom-checkbox w-100">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" for="customCheck1">Mark as done.</label>
                        </div>
                        <div>
                          <Link to={`/course/${courseName}/${course}`} > Give reviews / Learning Path </Link>
                        </div>
                    </div>
                    <div className="col-12 description pt-4">

                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#description">Description</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#question">Q&A</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#files">Files</a>
                            </li>
                            
                        </ul>

                        <div id="myTabContent" className="tab-content">
                            <div className="tab-pane fade active show" id="description">
                                <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
                            </div>
                            <div className="tab-pane fade " id="files">
                                <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
                            </div>
                            <div className="tab-pane fade " id="question">
                                <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit.</p>
                                <img className="course-list-images" src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
                                
                                <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit.</p>
                                <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit.</p>
                            </div>
                       
                        </div>

                        

                    </div>
                </div>

                <div className="col-md-3 px-0 co">
                    <div className="col-12 d-flex justify-content-between align-items-center py-4" style={{backgroundColor:"#212121"}}>
                        <h3 style={{fontSize:'1.2rem',color:"white"}}>Course Content</h3>
                        <button className="btn btn-danger" id="show-hide" onClick={hidePlayer} >Hide</button>
                    </div>
                    <div className="col-12 p-0 courses-list" style={{backgroundColor:"#f9f9f9"}}>

                      

                    <div className="accordion col-12 px-0" id="accordionExample">

                            {data && 
                                data.course.content.map((e,index) => {
                                    
                                   return <div className="card" >
                                        <div className="card-header" id={`heading${index}-Sub`}>
                                        <h2 className="mb-0">
                                            <button className="btn pl-0 collapse-btn-list btn-link " type="button" data-toggle="collapse" data-target={`#subscribe${index}`} aria-expanded="true" aria-controls={`subscribe${index}`}>
                                            <span style={{fontSize:'20px',fontWeight:"700",color:"#000"}}>{e.course}</span>
                                            </button>
                                        </h2>
                                        </div>

                                    
                                        <div id={`subscribe${index}`} className="collapse show p-0" aria-labelledby={`heading${index}-Sub`} data-parent="#accordionExample">

                                        {e.videos.map(video => {
                                            return (<Link className="video-link" to={`/course/${courseName}/${course}/${video.id}`}>

                                                    <div className="card-body p-0" onClick={() => {

                                                        // something()
                                                        if(video.id !== videoId ){
                                                        sendDetails()
                                                        setDuration(0)
                                                        setTime(0)
                                                        setLength(0)}
                                                    }}>
                                                <div className={video.id === videoId ? 'list-sub p-3 d-flex flex-column active-watching' : "list-sub p-3 d-flex flex-column"}>
                                                <div className="header-list">{video.title}</div>
                                                <div className="d-flex justify-content-between">
                                                    <div className="play-title pt-2">
                                                    <i className="fa fa-play" aria-hidden="true"></i> <span style={{fontSize:'15px'}}>{video.duration}</span> 
                                                    </div>
                                                    {
                                                        isVideoDone(video.id) && 
                                                        <div>
                                                            done
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            {
                                                videoBorder(video.id) && 
                                              <div className="border-red" style={{width:`${ videoBorder(video.id).duration  * 100 }%`}}></div>
                                            }
                                            </div>
                                            </Link>)

                                            })}
                                            </div>

                                       



                                    </div>
                                })
                            }
                         </div>
                      </div>
                </div>
            </div>
        </div>
    )
}

export default Subscription
