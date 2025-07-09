import { NavLink, useLocation } from 'react-router-dom'
import { Gamepad2, CreditCard, Smile, UserCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <div className="navbar">
      <NavLink
        to="/home"
        className={({ isActive }) => isActive ? 'nav-icon active' : 'nav-icon'}
      >
        {currentPath === '/home' ? (
          <motion.div animate={{ scale: 1.2 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Gamepad2 size={20} />
          </motion.div>
        ) : (
          <Gamepad2 size={20} />
        )}
        <span>Game</span>
      </NavLink>

      <NavLink
        to="/stake"
        className={({ isActive }) => isActive ? 'nav-icon active' : 'nav-icon'}
      >
        {currentPath === '/stake' ? (
          <motion.div animate={{ scale: 1.2 }} transition={{ type: 'spring', stiffness: 300 }}>
            <CreditCard size={20} />
          </motion.div>
        ) : (
          <CreditCard size={20} />
        )}
        <span>Stake</span>
      </NavLink>

      <NavLink
        to="/friends"
        className={({ isActive }) => isActive ? 'nav-icon active' : 'nav-icon'}
      >
        {currentPath === '/friends' ? (
          <motion.div animate={{ scale: 1.2 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Smile size={20} />
          </motion.div>
        ) : (
          <Smile size={20} />
        )}
        <span>Friends</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) => isActive ? 'nav-icon active' : 'nav-icon'}
      >
        {currentPath === '/profile' ? (
          <motion.div animate={{ scale: 1.2 }} transition={{ type: 'spring', stiffness: 300 }}>
            <UserCircle2 size={20} />
          </motion.div>
        ) : (
          <UserCircle2 size={20} />
        )}
        <span>Profile</span>
      </NavLink>
    </div>
  )
}
