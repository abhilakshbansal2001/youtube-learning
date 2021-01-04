import React,{useState} from 'react'
import { AddCourse } from '../AddCourse'
import { db } from '../firebase/Firebase'
import '../Styles/Contribute.css'
const Contribute = () => {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [url,setUrl] = useState('')
    const [message,setMessage] = useState('')
    const [sent,setSent] = useState('')
    const data = {
        name,email,url
    }

    // AddCourse();

    function check(){
        if(!email || !name || !url)
            return false
        else 
         return true
    }

    const contactForm = (e) => {
        const cond = check()
        if(cond){
        db.collection("contribution").add(data)
        .then(() => {
            setSent("Your message is successfully sent.")
            setEmail('')
            setName('')
            setUrl('')
        })
        .catch(error => {
            setSent(error.message)
        })
      }
      else{
          alert("Please fill all the fields")
      }
    }


    return (
        <>
        { sent && <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="mr-auto">Free Learning</strong>
                <small>Now</small>
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="toast-body">
                {sent}
            </div>
                </div> 
            }

        <div>
            <div class="container contact-form">
            <div class="contact-image">
                <img src="./images/contact.png" alt="rocket_contact"/>
            </div>
            <div method="post">
                <h3>Help us improve</h3>
               <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <input type="text" name="txtName" class="form-control" placeholder="Your Name " onChange={e => setName(e.target.value)} value={name} />
                        </div>
                        <div class="form-group">
                            <input type="text" name="txtEmail" class="form-control" placeholder="Your Email " onChange={e => setEmail(e.target.value)} value={email} />
                        </div>
                        <div class="form-group">
                            <input type="text" name="textUrl" class="form-control" placeholder="Playlist URL " onChange={e => setUrl(e.target.value)} value={url} />
                        </div>
                        <div class="form-group">
                            <input type="submit" onClick={contactForm} name="btnSubmit" class="btnContact py-2" value="Send Message" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <textarea name="txtMsg" class="form-control" placeholder="What is the playlist about ? " onChange={e => setMessage(e.target.value)} value={message} style={{width: "100%", height: "150px"}}></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default Contribute
