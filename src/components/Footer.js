import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Footer.css'

const Footer = () => {
    return (
        <div className="footer " style={{backgroundColor:'#000'}}>
           
<footer className="page-footer font-small blue pt-4 container">

  
  <div className="container-fluid text-center text-md-left">

    
    <div className="row">

      
      <div className="col-md-6 mt-md-0 mt-3">

        
        <h5 className="text-uppercase footer-h5">Free Learning </h5>
        <p className="footer-p">Free and Job ready videos for learner by learners.</p>

      </div>
      

      <hr className="clearfix w-100 d-md-none pb-3" />

      
      <div className="col-md-3 mb-md-0 mb-3">

        
        <h5 className="text-uppercase footer-h5">Downlaod App</h5>

        <ul className="list-unstyled">
          <li>
            <Link className="profile-link" to="/#">Ios</Link>
          </li>
          <li>
            <Link className="profile-link" to="/#">Android</Link>
          </li>
          
        </ul>

      </div>
      

      
      <div className="col-md-3 mb-md-0 mb-3">

        
        <h5 className="text-uppercase footer-h5">Resources</h5>

        <ul className="list-unstyled">
          <li>
            <Link className="profile-link" to="/#">Youtube</Link>
          </li>
          <li>
            <a className="profile-link"  target="_blank" href="https://abhilakshbansal2001.github.io/abhilakshbansal/">Developer</a>
          </li>
          <li>
            <Link className="profile-link" to="/#">Contribute</Link>
          </li>
          <li>
            <Link className="profile-link" to="/#">About</Link>
          </li>
        </ul>

      </div>
      

    </div>
    

  </div>
  

  
  <div className="footer-copyright text-center py-3">© 2020 Free Learning:
    <Link className="profile-link" to="/htps://mdbootstrap.com/"> ElEarning.com</Link>
  </div>
  

</footer>


            
        </div>
    )
}

export default Footer
