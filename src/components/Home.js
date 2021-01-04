import React,{useContext,useEffect} from 'react'
import {userContext} from'../Context/UserContext'
import { auth ,db} from '../firebase/Firebase';

import '../Styles/Home.css'

const Home = () => {

      const [state,dispatch,user,detail] = useContext(userContext);

    //   useEffect(() => {

    //       if(state !== "NULL"){

    //       var unSubscribe = db.collection("Users").doc(state.uid)
    //         .onSnapshot(function(doc) {
    //             const data = doc.data();
    //             detail({type: "USER", payload: data})
    //             console.log("Current data: ", doc.data());
    //         });
    //     }

    //       return () => {
    //           unSubscribe()
    //       }
    //   }, [state])

    // useEffect(() => {
    //     console.log(user)
       
    // }, [user])

    return (
        <div>
              <header className="masthead text-center text-white">
            <div className="masthead-content">
            <div className="container">
                <h1 className="masthead-heading mb-0">Learn for Free</h1>
                <h2 className="masthead-subheading mb-1">For learners , by learners</h2>
                {/* <p className=" mb-0">Statistically designed Playlist 4 you</p> */}
                {/* <a href="#" className="btn btn-primary btn-xl rounded-pill mt-5">See Courses</a> */}
                <a href="#" style={{display:'inline-block'}} className="btn-home mt-5">See Courses</a>
            </div>
            </div>
            <div className="bg-circle-1 bg-circle"></div>
            <div className="bg-circle-2 bg-circle"></div>
            <div className="bg-circle-3 bg-circle"></div>
            <div className="bg-circle-4 bg-circle"></div>

            <div className="mouse-wheel-border">
                <div className="mouse-wheel-dot"></div>
            </div>
        </header>

        <section>
            <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6 order-lg-2">
                <div className="p-5">
                    <img className="img-fluid rounded-circle" src="./images/web.png" alt="" />
                </div>
                </div>
                <div className="col-lg-6 order-lg-1">
                <div className="p-5">
                    <h2 className="display-4">Web Development</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.</p>
                    <button className='btn btn-success' >Go To Course</button>
                    
        
         
                </div>
                </div>
            </div>
            </div>
        </section>

        <section>
            <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                <div className="p-5">
                    <img className="img-fluid rounded-circle" src="./images/python.png" alt="" />
                </div>
                </div>
                <div className="col-lg-6">
                <div className="p-5">
                    <h2 className="display-4">Python</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.</p>
                    <button className='btn btn-success' >Go To Course</button>
                </div>
                </div>
            </div>
            </div>
        </section>

        <section>
            <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6 order-lg-2">
                <div className="p-5">
                    <img className="img-fluid rounded-circle" src="./images/app.png" alt="" />
                </div>
                </div>
                <div className="col-lg-6 order-lg-1">
                <div className="p-5">
                    <h2 className="display-4">App Development</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.</p>
                    <button className='btn btn-success' >Go To Course</button>

                </div>
                </div>
            </div>
            </div>
        </section>

      
        </div>
    )
}

export default Home
