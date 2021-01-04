import React, { useContext,useEffect,useState } from 'react'
import {auth,storage} from '../firebase/Firebase.js'
import { Link,useHistory } from 'react-router-dom'
import { userContext } from '../Context/UserContext'

const Account = () => {
    const history  = useHistory()
    const [state,dispatch,user,detail] = useContext(userContext)
    const [image,setImage] = useState('')
    const [url,setUrl] = useState('')
    const [progress,setProgress] = useState('')
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState('')
    const types = ['image/png','image/jpeg','image/jpg']
    

    useEffect(() => {

    if(state == "NULL")
        history.replace("/")
      
    }, [state])



    function changeImage(e){
        let files = e.target.files[0]
        if(files && types.includes(files.type)){
            setImage(e.target.files[0])
            setError('')
        }
        else{
            setError("Please provide image in png/jpg")
            setImage('')
        }
        
        
    }

    useEffect(() => {
        if(image){
            const storageRef = storage.ref(`profile-pictures/${image.name}`)
            storageRef.put(image)
            .on('state_changed' , (snap) => {
                setLoading(false)
                let progress = (snap.bytesTransferred / snap.totalBytes) * 100
                setProgress(progress)
            },err => {
                setError(err)
            }, async () => {
                const url = await storageRef.getDownloadURL()
                setUrl(url)
            })


        }
    }, [image])

    useEffect(() => {
        if(url){
        const user = auth.currentUser;

        user.updateProfile({
       
        photoURL: url
        }).then(function() {
            setLoading(true)
            alert("Updated the profile")
        }).catch(function(error) {
            alert(error.message)
        });



    }

    }, [url])

    return (
        <>
        { !loading ? <div className="loader account-loader">
            <div >
        {/* <span class="sr-only">Loading...</span> */}
        <span className="mt-5 pt-3"> 
          Image Uploading : {progress}
        </span>
        </div>
    </div> : 

        <div className="py-4 pt-5">
            <div className="container">
    <div className="row my-2">
        <div className="col-lg-8 order-lg-2">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a href="" data-target="#profile" data-toggle="tab" className="nav-link active">Profile</a>
                </li>
               
                <li className="nav-item">
                    <a href="" data-target="#edit" data-toggle="tab" className="nav-link">Edit</a>
                </li>
            </ul>
            <div className="tab-content py-4">
                <div className="tab-pane active" id="profile">
                    <h5 className="mb-3">User Profile</h5>
                    <div className="row">
                        <div className="col-md-6">
                            <h6>About</h6>
                            <p>
                                Web Designer, UI/UX Engineer
                            </p>
                            <h6>Hobbies</h6>
                            <p>
                                Indie music, skiing and hiking. I love the great outdoors.
                            </p>
                        </div>
                        <div className="col-md-6">
                            <h6>Recent badges</h6>
                            <a href="#" className="badge badge-dark badge-pill">html5</a>
                            <a href="#" className="badge badge-dark badge-pill">react</a>
                            <a href="#" className="badge badge-dark badge-pill">codeply</a>
                            <a href="#" className="badge badge-dark badge-pill">angularjs</a>
                            <a href="#" className="badge badge-dark badge-pill">css3</a>
                            <a href="#" className="badge badge-dark badge-pill">jquery</a>
                            <a href="#" className="badge badge-dark badge-pill">bootstrap</a>
                            <a href="#" className="badge badge-dark badge-pill">responsive-design</a>
                            <hr />
                            <span className="badge badge-primary"><i className="fa fa-user"></i> {user && user.subscription && user.subscription.length} Courses</span>
                            <span className="badge badge-success"><i className="fa fa-cog"></i> 43 Forks</span>
                            <span className="badge badge-danger"><i className="fa fa-eye"></i> 245 Views</span>
                        </div>
                        <div className="col-md-12">
                            <h5 className="mt-2"><span className="fa fa-clock-o ion-clock float-right"></span> Recent Activity</h5>
                            <table className="table table-sm table-hover table-striped">
                                <tbody>                                    
                                    <tr>
                                        <td>
                                            <strong>Abby</strong> joined ACME Project Team in <strong>`Collaboration`</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Gary</strong> deleted My Board1 in <strong>`Discussions`</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Kensington</strong> deleted MyBoard3 in <strong>`Discussions`</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>John</strong> deleted My Board1 in <strong>`Discussions`</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Skell</strong> deleted his post Look at Why this is.. in <strong>`Discussions`</strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>
                
                
                <div className="tab-pane" id="edit">
                    <form role="form">
                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">Full Name</label>
                            <div className="col-lg-9">
                                <input className="form-control" type="text" value={state && state.displayName} />
                            </div>
                        </div>
                       
                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">Email</label>
                            <div className="col-lg-9">
                                <input className="form-control" type="email" value={state && state.email} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">Hobbies</label>
                            <div className="col-lg-9">
                                <input className="form-control" type="text"  />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">About</label>
                            <div className="col-lg-9">
                                <input className="form-control" type="text"  />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">Company</label>
                            <div className="col-lg-9">
                                <input className="form-control" type="text"  />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">Website</label>
                            <div className="col-lg-9">
                                <input className="form-control" type="url"  />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">Address</label>
                            <div className="col-lg-9">
                                <input className="form-control" type="text"  placeholder="Street" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label"></label>
                            <div className="col-lg-6">
                                <input className="form-control" type="text"  placeholder="City" />
                            </div>
                            <div className="col-lg-3">
                                <input className="form-control" type="text"  placeholder="State" />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">Change Password</label>
                            <div className="col-lg-9">
                            <button type="button" className="btn btn-danger" > <Link to="/resetPassword" style={{color:'white'}}>Reset Password</Link>  </button>

                                
                            </div>
                        </div>
                        
                        
                        
                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label"></label>
                            <div className="col-lg-9">
                                {/* <input type="reset" className="btn btn-secondary" value="Cancel" /> */}
                                <input type="reset" className="btn btn-danger" value="Save Changes" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="col-lg-4 order-lg-1 text-center">
            <img src={state !== "NULL" && state.photoURL} height="100px" width="150px" className="mx-auto img-fluid img-circle d-block" alt="avatar" />
            <h6 className="mt-2">Upload a different photo</h6>
            <label className="custom-file">
                <input type="file" id="file" className="custom-file-input" onChange={changeImage} />
                <span className="custom-file-control">Choose Image</span>
            </label>
        </div>
    </div>
</div>
        </div>}
        </>
    )
}

export default Account
