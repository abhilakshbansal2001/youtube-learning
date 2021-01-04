import React,{useContext,useEffect,useState} from 'react';
import {userContext} from'./Context/UserContext'
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Courses from './components/Courses';
import Profile from './components/Profile';
import CourseList from './components/CourseList';
import Subscription from './components/Subscription';
import { auth ,db} from './firebase/Firebase';
import Footer from './components/Footer';
import Contribute from './components/Contribute';
import Account from './components/Account';
import {AddCourse} from './AddCourse'


function App() {

  const [state,dispatch,user,detail] = useContext(userContext);
  const [isLoading,setIsLoading] = useState(false);


 

  useEffect(() => {

    const deUser = auth.onAuthStateChanged(function(user) {
      if (user) {
        dispatch({type: 'USER', payload: user})
        

      } else {
        dispatch({type: 'CLEAR', payload: "NULL"})
        
      }
      setIsLoading(true)
    });


    
    return () => {
      deUser()
    
    }
  }, [])




    useEffect(() => {

   

      if(state !== "NULL"){

      var unSubscribe = db.collection("Users").doc(state.uid)
        .onSnapshot(function(doc) {
            const data = doc.data();
            detail({type: "USER", payload: data})
        });
    }

      // return () => {
      //     unSubscribe()
      // }
  }, [state])



  

  return (
    <>
    {!isLoading ? <div className="loader">
    <div class="spinner-grow text-dark" role="status">
  <span class="sr-only">Loading...</span>
</div>
    </div> :
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" >
            <Login />
          </Route>
          <Route path="/register" >
            <Register />
          </Route>
          <Route path="/courses/:id" component={Courses} exact />
            
          <Route path="/course/:courseName/:pathParam1/:pathParam2" component={Subscription} />

          <Route path="/course/:courseName/:id" component={CourseList} />
            
          <Route path="/profile" >
            <Profile />
          </Route>
          <Route path="/contribute" >
            <Contribute />
          </Route>
          <Route path="/account" >
            <Account />
          </Route>
        </Switch>
        <Footer />
      </Router>
        
    </div>}
    </>
  );
}

export default App;
