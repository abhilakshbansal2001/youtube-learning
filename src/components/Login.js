import React,{useState,useEffect,useContext} from 'react'
import { Link,useHistory } from 'react-router-dom'
import {LoginAuthentication} from '../Authentication/LoginAuthentication'
// import {useHistory} from 'react-router-dom'
import '../Styles/Login.css'
import '../Styles/Social.css'
import { userContext } from '../Context/UserContext'
import {auth, db,fb,google} from '../firebase/Firebase'

const Login = () => {
    const [email,SetEmail] = useState('');
    const [password,SetPassword] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState('');
 
    
    const [state,dispatch] = useContext(userContext);

    const history = useHistory()

    const submit = async(e) => {
        e.preventDefault();
        setError('')
      
         LoginAuthentication(email,password)
         

         
    }

    useEffect(() => {

        if(state !== "NULL")
            history.replace("/")
        else
            setIsLoading(true)
        
        return () => {
            
        }
    }, [state])


    
     const LoginAuthentication = (email,password) => {
         auth.signInWithEmailAndPassword(email, password)
         .then( async (user) => {
             history.replace("/")
            console.log(user,"log user");
          
            
         })
         .catch(function(error) {
            // Handle Errors here.
            console.log(error);
           setError(error.message)
          });
        
    }

    const userToDb = async(user) => {
        
        const data = {
            email:user.email,
            id:user.uid
        }
        db.collection("Users").doc(user.uid).set(data, { merge: true })
        .then(function(doc) {
            // console.log(state,doc);
            dispatch({type: 'USER', payload: user})
            
                
            
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
           setError("Password or Email is not correct")
    
        });
    }
    
    function authWithGoogle(){

        auth.signInWithPopup(google).then(function(result) {
           
            const token = result.credential.accessToken;
           
            const user = result.user;

            userToDb(user)
           
          }).catch(function(error) {
            
            const errorCode = error.code;
            const errorMessage = error.message;
     
            const email = error.email;
            
            const credential = error.credential;
            setError(errorMessage)
          
          });
    }
    function authWithFaceBook(){

        auth.signInWithPopup(fb).then(function(result) {
           
            const token = result.credential.accessToken;
           
            const user = result.user;

            userToDb(user)
           
          }).catch(function(error) {
            
            const errorCode = error.code;
            const errorMessage = error.message;
     
            const email = error.email;
            
            const credential = error.credential;
            setError(errorMessage)
          
          });
    }


    





    return (
        <>
     
        <div>
            <div class="wrapper fadeInDown">
            <div id="formContent">
              
                <div class="fadeIn first py-5">
                <img src="./images/yt.svg" id="icon" alt="User Icon" height="50px" width='60px' />  <h2> Login</h2>
                </div>
               

                <div class="login-box px-5">
                    <div class="social-button" id="facebook-connect" onClick={authWithFaceBook}> <span>Login with Facebook</span></div>
                    <div class="social-button" id="google-connect" onClick={authWithGoogle}> <span>Login with Google</span></div>
              
                </div>
                
                <div className='py-4'>
                    OR
                </div>

                <div>
                <input type="text" id="login" class="fadeIn second" name="email" placeholder="email" value={email} onChange={e => SetEmail(e.target.value)} />
                <input type="password" id="password" class="fadeIn third" name="login" placeholder="password" value={password} onChange={e => SetPassword(e.target.value)} />
                <input type="submit" class="fadeIn fourth" value="Log In" onClick={submit} />
                <small style={{display:'block'}}>Need an account? click <Link to="/register">Here</Link></small>
                </div>

                <div id="formFooter">
                    {error && <div className="error">{error}</div>}
                <a class="underlineHover" href="#">Forgot Password?</a>
                </div>

            </div>
            </div>

            
        </div>
        </>
    )
}

export default Login
