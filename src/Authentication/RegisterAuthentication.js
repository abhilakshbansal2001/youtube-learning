import React,{useContext} from 'react'
import { userContext } from '../Context/UserContext';
import {auth} from '../firebase/Firebase'

export default function RegisterAuthentication(email,password) {
    let signIn = false;
  
    auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(user,"auth reg");
       signIn = true;
       return true;
       
    })
    .catch(function(error) {
       // Handle Errors here.
      return {error,signIn:false}
     });

     
     
}


