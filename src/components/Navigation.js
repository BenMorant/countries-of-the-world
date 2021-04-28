import { NavLink } from 'react-router-dom'

const Navigation = () => (
  <div className="navigation">
    <NavLink exact to="/" activeClassName="nav-active">
      Accueil
    </NavLink>
    <NavLink exact to="a-propos" activeClassName="nav-active">
      À propos
    </NavLink>
  </div>
)

export default Navigation
