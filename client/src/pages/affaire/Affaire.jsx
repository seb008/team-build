import NavBar from "../../components/navBar/NavBar"
import SideBar from "../../components/sideBar/SideBar"
import CreatBlocAffaire from "../../components/creatBlocAffaire/CraetBlocAffaire.jsx"
import "./affaire.scss"

const Affaire = () => {
  return (
    <div className="affaire">
      <SideBar />
      <div className="affaireContainer">
        <NavBar />
        <div className="top">
          <h1>Nouvelle Affaire</h1>
          <div className="blocAffaire">
          </div>
        </div>
      </div>
    </div>
  )
}

export default Affaire