import React,{useState,useEffect,useContext} from 'react'
import { Link,useHistory } from 'react-router-dom'
// import RegisterAuthentication  from '../Authentication/RegisterAuthentication';
import '../Styles/Login.css'
import '../Styles/Social.css'
import {auth,db,google,fb} from '../firebase/Firebase'
import { userContext } from '../Context/UserContext'


const Register = () => {


    const [email,SetEmail] = useState('');
    const [password,SetPassword] = useState('');
    const [name,SetName] = useState('');
    const [error,setError] = useState('');
    const [signIn,SetSignIn] = useState('');
    const [isLoading,setIsLoading] = useState(true);
    const history = useHistory()
    const [state,dispatch] = useContext(userContext);


    useEffect(() => {

        if(state !== "NULL")
            history.replace("/")
        else{
            setIsLoading(false)
        }
        
        
        return () => {
            
        }
    }, [state])

    // console.log(state);


    const checkCondition = () => {
        if(!email || !password || !name)
            return {errorMSG: 'Please fill all the details' }
        if(password.length < 5 || password.length > 25 ){
            return {errorMSG: 'Passwords length must be between 6 and 25.' }

        }
        // if(email.mat)

        return {errorMSG:''}
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
    

     function RegisterAuthentication(email,password) {
        
      
        auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {

            userToDb(user.user).then(() => history.push("/login"))
         
           SetSignIn(true)
           
           
           
        })
        .catch(function(error) {
           // Handle Errors here.
          SetSignIn(false)
          setError(error.message)
        //   console.log(error);
         });
    
         
         
    }

    useEffect(() => {
        if(signIn){
            history.push("/login")
        }
    }, [signIn])

    const submit = async(e) => {
        e.preventDefault()
        const {errorMSG} = checkCondition();
        setError(errorMSG)
        if(!errorMSG){
         RegisterAuthentication(email,password)
        //   console.log(response);
          

        }
        
    }

    function authWithGoogle(){

        auth.signInWithPopup(google).then(function(result) {
           
            const token = result.credential.accessToken;
           
            const user = result.user;
            userToDb(user).then(() => history.push("/login"))
           
          }).catch(function(error) {
            
            const errorCode = error.code;
            const errorMessage = error.message;
     
            const email = error.email;
            
            const credential = error.credential;
            setError(errorMessage)
          
          });
    }


    function authWithFacebook(){

        auth.signInWithPopup(fb).then(function(result) {
           
            const token = result.credential.accessToken;
           
            const user = result.user;
            userToDb(user).then(() => history.push("/login"))
           
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
                <img src="./images/yt.svg" id="icon" alt="User Icon" height="50px" width='60px' />  <h2> Register</h2>
                </div>

                <div class="login-box px-5">
                    <div class="social-button" id="facebook-connect" onClick={authWithFacebook}> <span>Login with Facebook</span></div>
                    <div class="social-button" id="google-connect" onClick={authWithGoogle}> <span>Login with Google</span></div>
              
                </div>
                
                <div className='py-4'>
                    OR
                </div>

                <div>
                <input type="text" id="Login" class="fadeIn second" name="name" placeholder="Name" value={name} onChange={e => SetName(e.target.value)} />
                <input type="text" id="Login" class="fadeIn third" name="email" placeholder="Email" value={email} onChange={e => SetEmail(e.target.value)} />
                <input type="password" id="Login" class="fadeIn third" name="password" placeholder="password" value={password} onChange={e => SetPassword(e.target.value)} />
                <input type="submit" onClick={submit} class="fadeIn fourth" value="Register" />
                <small style={{display:'block'}}>Already have an account? click <Link to="/register">Here</Link></small>
                </div>

                

                <div id="formFooter">
                {error && <div className="error">{error}</div>}
                <a class="underlineHover" href="#"></a>
                </div>

            </div>
            </div>

            
        </div>
        </>
    )
}

export default Register
