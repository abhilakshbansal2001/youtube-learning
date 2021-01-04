import React,{useContext,useEffect,useState} from 'react';
import {Link ,useHistory} from 'react-router-dom'
import {userContext} from'../Context/UserContext'
import { db } from '../firebase/Firebase'
import firebase from "firebase/app";
import "firebase/auth";
import ReactStars from "react-rating-stars-component";
import '../Styles/CourseList.css'
import '../Styles/bootstrap.css'

const CourseList = (props) => {
    const id = props.match.params.id
    const courseParent = props.match.params.courseName
    const history = useHistory()
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')

    const wallpaper = `python-wallpaper.jpg`;
    const [state,dispatch,user,detail] = useContext(userContext);

    const [data, setData] = useState()
    
    useEffect(() => {
        
        const docRef = db.collection(courseParent).doc(id)

        docRef.get().then(function(doc) {
            if (doc.exists) {
                setData(doc.data())
            } else {
                // doc.data() will be undefined in this case
                history.push("/")
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        
        // const arrb = user[id].watched_videos;
        // arrb.push("bjjhb")
        // db.collection("Users").doc(state.uid).update({

        //     [id]: {
        //         id,
        //         courseParent,
        //         watched_videos: arrb

        //     }
            
          
        // })
        // .then(function() {
        //     console.log("Document successfully updated!");
        // });

            // console.log(user[courseParent].id);
    }, [])


    function subscribeReq() {
        if(state !== "NULL"){
        const ref = db.collection('Users').doc(state.uid);
        const d = {
           [id] : { id,courseParent,
           
            watched_videos:[]
           }

        }

        // ref.update({
        //     subscription : firebase.firestore.FieldValue.arrayUnion(d)
        //   });
        // }

        ref.set(d, { merge: true })
        .then(() => {
            console.log("Added");
        })
        .catch(e => {
            console.log(e);
        })
        }

        else{
            history.replace("/login")
        }
    }


   async function Update(){
        const docRef = db.collection(courseParent).doc(id)

        docRef.get().then(function(doc) {
            if (doc.exists) {
                setData(doc.data())
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        
    }


    const giveRating = {
        size: 25,
        count: 5,
       
        value: rating,
        a11y: true,
        isHalf: true,

        onChange: newValue => {
            console.log(`Example 2: new value is ${newValue}`);
            setRating(newValue)
        }
        };

        function submitReview(){
            if(rating !== 0 && review !== ''){
                const data = { rating , review,name:state.displayName ? state.displayName : state.email ,id:state.uid}
                db.collection(courseParent).doc(id)
                .update({
                    reviews: firebase.firestore.FieldValue.arrayUnion(data)
                    
                });

                Update().then(() => {
                        document.getElementById("close").click()
                        setRating(0)
                        setReview('')
                })
               
                

                   

                
            }
        }

        function removeComment(e){

                const button = e.target;
                // Get the values
                const reviewF = button.getAttribute('data-review');
                const ratingF = button.getAttribute('data-rating');


             const data = {id:state.uid, name:state.displayName ? state.displayName : state.email , rating:ratingF , review:reviewF }
             

          
             db.collection(courseParent).doc(id)
                .update({
                    reviews: firebase.firestore.FieldValue.arrayRemove(data)
                });
        
        
}
    function isSub(){
        const isFound = user.subscription.find((rev) => rev.id === id )
        if(isFound)
            return true;
        return false
    }



    return (
        <div>
            <div className="course-list container-fluid " style={{backgroundImage:`url(../images/${wallpaper})`}}>
                <div className="row w-100 px-4 d-flex align-items-center">
                    <div className="col-md-7 ml-5">
                        <div className="title-courses text-left">
                            <h1 className="my-4 py-1">{id.toUpperCase()}</h1>
                            <p>{courseParent}</p>
                        </div>
                    </div>
                    {/* <div className="col-md-5"> */}
                    <div className="col-md-4 list-card mx-2">
                             <div class="card-courses card transition">
                                <h2 class="transition">{id.toUpperCase()}<small style={{display:'block'}}>Part of {courseParent}</small></h2>

                                {user && data && state !=="NULL" && (user[id] && user[id].id === id && user[id].courseParent === courseParent)  ?  
                                <div class="cta-container transition" ><Link to={`/course/${courseParent}/${id}/vid-?id=133`}  id={id} class="cta">Go to Course</Link></div>
                                : <div class="cta-container transition" onClick={subscribeReq}><a href="#"  id={id} class="cta">Subscribe</a></div>
                                }


                                <div class="card_circle transition" style={{backgroundImage:`url(./images/${wallpaper})`}}></div>
                            </div>
                        </div>
                    {/* </div> */}

                </div>
                

            </div>
            <section className="list-section container mt-4 ml-5 m py-3"> 
                    <div className="list-header mb-5 alert alert-dismissible alert-success ">
                        <h1>Learning Path</h1>
                        <h5 className="my-3 mb-4">Contains:</h5>
                        <p><span className="list-desc" >20 hrs</span> on-Demand video</p>
                        <p>Estimated time to complete  <span className="list-desc" >8 weeks</span></p>
                        <p><span className="list-desc" >15</span> real world projects.</p>
                    </div>
                <div className="row">
                    <div className="col-md-5">
                    <img width="100%" src="https://raw.githubusercontent.com/kamranahmedse/developer-roadmap/master/img/frontend.png" />

                    </div>
                    <div className="col-md-7 timeline h-100 d-flex flex-column justify-content-between">
                    <div class="accordion col-12" id="accordionExample">


                        {/* //TODO: server se info lake .map loop lgana hain  */}
                        <div class="card">
                            <div class="card-header" id="headingOne">
                            <h2 class="mb-0">
                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Collapsible Group Item #1
                                </button>
                            </h2>
                            </div>

                            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div class="card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                            </div>
                            </div>
                        </div>


                        {/* //////////////////////////////////// */}


                        <div class="card">
                            <div class="card-header" id="headingOne">
                            <h2 class="mb-0">
                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Collapsible Group Item #1
                                </button>
                            </h2>
                            </div>

                            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div class="card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                            </div>
                            </div>
                        </div>



                        <div class="card">
                            <div class="card-header" id="headingTwo">
                            <h2 class="mb-0">
                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Collapsible Group Item #2
                                </button>
                            </h2>
                            </div>
                            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                            <div class="card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                            </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="headingThree">
                            <h2 class="mb-0">
                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Collapsible Group Item #3
                                </button>
                            </h2>
                            </div>
                            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                            <div class="card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                            </div>
                            </div>
                        </div>
                        </div>
                    
                    <div className="col-12 mt-5 pt-4" id="reviews">

                        <div className="py-3"> 
                            {state !== "NULL" ? 
                            
                                <button className="btn btn-primary " type="button" data-toggle="modal" data-target="#exampleModal">
                                    Give Reviews
                                </button>:
                                <button className="btn btn-primary " onClick={() => {
                                    history.replace('/login')
                                }}>
                                    Login to give Reviews
                                </button>
                            }

                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">FeedBack</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div>
                                            <ReactStars {...giveRating} />
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleTextarea">Your Reviews</label>
                                            <textarea class="form-control" id="exampleTextarea" value={review} onChange={e => setReview(e.target.value)} rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" id="close" data-dismiss="modal">Close</button>
                                        <button type="button" onClick={submitReview} class="btn btn-primary">Submit Reviews</button>
                                    </div>
                                    </div>
                                </div>
                                </div>


                        </div>


                        <h3 className="my-5 ">
                            Reviews:
                        </h3>

                        {

                                data && data.reviews && data.reviews.map(rev => {

                        
                         return <div className="review-section py-3 d-flex align-items-center justify-content-between">
                            <div className="comment d-flex flex-column">
                                <h5>{rev.name}</h5>
                                <blockquote>
                                 "{rev.review}"
                                </blockquote>

                            </div>
                            <div className="stars">
                               <ReactStars size={30} edit={false} value={rev.rating} isHalf={true}  />
                               <div>
                               {/* { rev.id === state.uid &&
                                <button className="btn btn-danger" data-rating={rev.rating} data-review={rev.review} onClick={removeComment} >
                                    Delete
                                </button>} */}
                               </div>
                            </div>

                        </div>

                                })

                        }





                        


                     </div>
                  </div>

              </div>

            </section>
        </div>
    )
}

export default CourseList
