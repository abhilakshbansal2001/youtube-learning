import React, { useContext } from 'react'
import { userContext } from '../Context/UserContext'
import '../Styles/Navbar.css'
import {useHistory,Link} from 'react-router-dom'
import { auth } from '../firebase/Firebase'


const IsLogin = ({state,dispatch}) => {

    // console.log(state);

    function logout(){
        auth.signOut().then(function() {

            dispatch({type: 'CLEAR', payload: "NULL"})
            
          }).catch(function(error) {
            console.log(error);
            alert(error.message)
          });
    }


    return(
        <>
        {state !=='NULL' ? 
            <>
            
                
            
                <li className="nav-item dropdown" >
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Profile</a>
                    <div className="dropdown-menu">
                    <Link className="dropdown-item" to="/profile">Course Catalog</Link>
                    
                    <div className="dropdown-divider"></div>
                  {state !== "NULL" &&   <Link className="dropdown-item" to="/account">{state.displayName}</Link>}
                    </div>
                </li>

                <li className="nav-item">
            <Link className="nav-link" to="/contribute">Contribute</Link>

                </li>

            <li className="nav-item">
            <button type="button" onClick={logout} className="btn btn-danger">Logout</button>
            </li> </>:
            
            <>

            <li className="nav-item">
                <Link className="nav-link" to="/contribute">Contribute</Link>
            </li>
            <li className="nav-item mx-1">
                <Link to={'/login'}>
                <button type="button" className="btn btn-primary">Login</button>
                </Link>
            </li>

            <li className="nav-item mx-1">
                <Link to={'/register'}>
                    <button type="button" className="btn btn-success">SignUp</button>
                </Link>
            </li> 
            
            </>
            


            }
        </>
    )
}




const Navbar = () => {

    const [state,dispatch] = useContext(userContext);

    

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:'#630e38'}}>
            <h2 >
                <div className="navbar-brand Logo d-flex align-items-center" href="#" style={{fontSize:'25px',fontFamily:'Rubik'}}>
                     <div>
                         <i className="fab fa-youtube" style={{fontSize:'35px',color:"#FF0000"}}></i>
                    </div>
                     <div className="ml-2"> 
                         <Link to="/" style={{color:'white'}}>Learning</Link>
                    </div>
                </div>
            </h2>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor03">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                <Link to={'/'}>
                    <span className="nav-link" >Home
                    <span className="sr-only">(current)</span>
                    </span>
                </Link>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Courses</a>
                    <div className="dropdown-menu">
                    <Link className="dropdown-item" to="/courses/web-development">Web Development</Link>
                    <Link className="dropdown-item" to="/courses/app-development">App Development</Link>
                    <Link className="dropdown-item" to="/courses/python">Python</Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/courses/all">All Courses</Link>
                    </div>
                </li>
            
               
               <IsLogin state={state} dispatch={dispatch} />
               
                </ul>
                
            </div>
            </nav>
        </div>
    )
}

export default Navbar
