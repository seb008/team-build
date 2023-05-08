import SideBar from "../../components/sideBar/SideBar.jsx"
import NavBar from "../../components/navBar/NavBar.jsx"
import { useEffect } from "react";
import axios from "axios";
import "./home.scss";

const Home = () => {


  useEffect(() => {
    const fetchAffaires = async () => {
      try {
        const res = await axios.get(/affaires/);
        console.log(res.data); 
      } catch (err) {
        console.error(err);
      }
    };
    fetchAffaires();
  }, []); 
  

  return (
    <div className="home">
    < SideBar />
    <div className="homeContainer">
      <NavBar />
      <div className="widget">
        <ul>
          <li>wigget 1</li>
          <li>wigget 2</li>
          <li>wigget 3</li>
        </ul>
      </div>
    </div>
    </div>
  )
}

export default Home