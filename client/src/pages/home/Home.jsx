import SideBar from "../../components/sideBar/SideBar.jsx"
import NavBar from "../../components/navBar/NavBar.jsx"
import "./home.scss";

const Home = () => {
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