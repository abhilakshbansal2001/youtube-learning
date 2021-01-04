import React from 'react'
import '../Styles/Profile.css'

const Profile = () => {


    const wallpaper = 'web-wallpaper.jpg';

    const Active = (e) => {
        const h2s = document.querySelectorAll(".profile-h2")
        const pr_row = document.querySelectorAll(".profile-row")
        h2s.forEach(h2 => {
            h2.classList.remove("profile-active")
        })

        pr_row.forEach(row => {
            row.classList.remove("active-row")
        })

        e.target.classList.add("profile-active")

        const ClassId = e.target.id
       const c =  document.querySelector(`.${ClassId}`)
       c.classList.add("active-row")
       console.log(c);



    }

    
    // useEffect(() => {

    //     if(state == "NULL")
    //         history.replace("/")
      
    // }, [state])

    return (
        <div>
            <div className="profile">
                <div className="profile-img">
                    <span>A</span>
                </div>
                <div className="profile-header">Abhilaksh Bansal</div>

            </div>
            <div className="profile-list" >
                <h2 className="profile-h2 profile-active" id="enrolled"  onClick={Active} >Enrolled</h2>
                <h2 className="profile-h2" id="completed" onClick={Active}>Completed</h2>
                <h2 className="profile-h2" id="ongoing" onClick={Active}>OnGoing</h2>
            </div>
            <div className="container-fluid py-5 pt-2" style={{minHeight:'70vh'}}>



            {/* ################ Enrolled ############### */}

                <div className="enrolled  row profile-row active-row">
                    <div className="col-md-4 my-3">
                        <div class="card-courses card transition">
                            <h2 class="transition">FRONTEND<small style={{display:'block'}}>1 of 3 series of web Development</small></h2>
                            <div class="cta-container transition"><a href="#" class="cta">Subscribe</a></div>
                            <div class="card_circle transition" style={{backgroundImage:`url(../images/${wallpaper})`}}></div>
                        </div>
                    </div>
                    <div className="col-md-4 my-3">
                        <div class="card-courses card transition">
                            <h2 class="transition">#1<small style={{display:'block'}}>1 of 3 series of web Development</small></h2>
                            <div class="cta-container transition"><a href="#" class="cta">Subscribe</a></div>
                            <div class="card_circle transition" style={{backgroundImage:`url(../images/${wallpaper})`}}></div>
                        </div>
                    </div>
                   
                </div>  




            {/* ################ Completed ############### */}



            <div className="completed  row profile-row ">
                   
                    
                    <div className="col-md-4 my-3">
                        <div class="card-courses card transition">
                            <h2 class="transition">#3<small style={{display:'block'}}>1 of 3 series of web Development</small></h2>
                            <div class="cta-container transition"><a href="#" class="cta">Subscribe</a></div>
                            <div class="card_circle transition" style={{backgroundImage:`url(../images/${wallpaper})`}}></div>
                        </div>
                    </div>
                </div>




            {/* ################ Ongoing ############### */}



            <div className="ongoing  row profile-row ">
                    <div className="col-md-4 my-3">
                        <div class="card-courses card transition">
                            <h2 class="transition">FRONTEND<small style={{display:'block'}}>1 of 3 series of web Development</small></h2>
                            <div class="cta-container transition"><a href="#" class="cta">Subscribe</a></div>
                            <div class="card_circle transition" style={{backgroundImage:`url(../images/${wallpaper})`}}></div>
                        </div>
                    </div>
                    <div className="col-md-4 my-3">
                        <div class="card-courses card transition">
                            <h2 class="transition">#1<small style={{display:'block'}}>1 of 3 series of web Development</small></h2>
                            <div class="cta-container transition"><a href="#" class="cta">Subscribe</a></div>
                            <div class="card_circle transition" style={{backgroundImage:`url(../images/${wallpaper})`}}></div>
                        </div>
                    </div>
                    <div className="col-md-4 my-3">
                        <div class="card-courses card transition">
                            <h2 class="transition">#3<small style={{display:'block'}}>1 of 3 series of web Development</small></h2>
                            <div class="cta-container transition"><a href="#" class="cta">Subscribe</a></div>
                            <div class="card_circle transition" style={{backgroundImage:`url(../images/${wallpaper})`}}></div>
                        </div>
                    </div>
                    <div className="col-md-4 my-3">
                        <div class="card-courses card transition">
                            <h2 class="transition">#3<small style={{display:'block'}}>1 of 3 series of web Development</small></h2>
                            <div class="cta-container transition"><a href="#" class="cta">Subscribe</a></div>
                            <div class="card_circle transition" style={{backgroundImage:`url(../images/${wallpaper})`}}></div>
                        </div>
                    </div>
                    <div className="col-md-4 my-3">
                        <div class="card-courses card transition">
                            <h2 class="transition">#3<small style={{display:'block'}}>1 of 3 series of web Development</small></h2>
                            <div class="cta-container transition"><a href="#" class="cta">Subscribe</a></div>
                            <div class="card_circle transition" style={{backgroundImage:`url(../images/${wallpaper})`}}></div>
                        </div>
                    </div>
                </div>




            </div>

        </div>

        
    )
}

export default Profile
