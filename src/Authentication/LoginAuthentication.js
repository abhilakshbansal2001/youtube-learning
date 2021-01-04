import React,{useContext} from 'react'
import { userContext } from '../Context/UserContext';
import {db,auth} from '../firebase/Firebase'


const userToDb = (user,dispatch) => {
    db.collection("Users").add(user)
    .then(function(docRef) {
        dispatch({type: 'USER', payload: user})
        return {
            isAuthenticated:true
        } 
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
       return {error,isAuthenticated:false}

    });
}


export const LoginAuthentication = (email,password) => {
    const [state,dispatch] = useContext(userContext);
     auth.signInWithEmailAndPassword(email, password)
     .then((user) => {
        
        userToDb(user,dispatch)
        
     })
     .catch(function(error) {
        // Handle Errors here.
       return {error,isAuthenticated:false}
      });
    
}

// export default Authentication
