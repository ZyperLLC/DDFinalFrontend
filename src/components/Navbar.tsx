import { NavLink } from 'react-router-dom'
import { Gamepad2, CreditCard, Smile, UserCircle2 } from 'lucide-react'

export default function Navbar() {
  return (
    <div className="navbar">
      <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-icon active' : 'nav-icon'}>
        <Gamepad2 size={20} /><span>Game</span>
      </NavLink>
      <NavLink to="/stake" className={({ isActive }) => isActive ? 'nav-icon active' : 'nav-icon'}>
        <CreditCard size={20} /><span>Stake</span>
      </NavLink>
      <NavLink to="/friends" className={({ isActive }) => isActive ? 'nav-icon active' : 'nav-icon'}>
        <Smile size={20} /><span>Friends</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-icon active' : 'nav-icon'}>
        <UserCircle2 size={20} /><span>Profile</span>
      </NavLink>
    </div>
  )
}
