import React from 'react'
import course from './courseContent/frontend-course.json'
import videos from './courseContent/frontend-video.json'
import { db } from './firebase/Firebase'

const AddCourse = () => {
  
    
    db.collection("web-development").doc("frontend")
    .set( {course,videos},{merge:true})
    .then(() => {
        console.log("Updated");
    })
    
}

export  {AddCourse}
