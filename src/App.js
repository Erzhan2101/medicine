import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Project from "./views/Project";
import Calendar from "./views/Calendar";
import Works from "./views/Works";
import Possibilities from "./views/Possibilities";
import Layout from "./components/Layout";


function App() {
    return (
     <Router>
       <Layout>
           <Route exact path='/'><Redirect to='/projects'/></Route>
           <Route  path='/projects'><Project/></Route>
           <Route  path='/calendar'><Calendar/></Route>
           <Route  path='/works'><Works/></Route>
           <Route  path='/possibilities'><Possibilities/></Route>
       </Layout>
     </Router>
    );
}

export default App;
