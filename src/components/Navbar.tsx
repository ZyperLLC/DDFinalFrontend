import { NavLink } from 'react-router-dom';
import { Gamepad2, CreditCard, Smile, UserCircle2, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContextProvider';

const ADMIN_WALLETS = import.meta.env.VITE_ADMIN_WALLET; // Replace with your actual admin wallet

export default function Navbar() {
  const { t } = useTranslation();
  const context = useContext(UserContext);
  const walletAddress = context?.user?.walletAddress;
  const isAdmin = walletAddress && ADMIN_WALLETS.includes(walletAddress);

  return (
    <div className="navbar">
      <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-icon active' : 'nav-icon'}>
        <Gamepad2 size={20} />
        <span>{t('navbar.game')}</span>
      </NavLink>
      <NavLink to="/stake" className={({ isActive }) => isActive ? 'nav-icon active' : 'nav-icon'}>
        <CreditCard size={20} />
        <span>{t('navbar.stake')}</span>
      </NavLink>
      <NavLink to="/friends" className={({ isActive }) => isActive ? 'nav-icon active' : 'nav-icon'}>
        <Smile size={20} />
        <span>{t('navbar.friends')}</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-icon active' : 'nav-icon'}>
        <UserCircle2 size={20} />
        <span>{t('navbar.profile')}</span>
      </NavLink>

      {/* ✅ Admin Link Only for Admin Wallet */}
      {isAdmin && (
        <NavLink to="/admin" className={({ isActive }) => isActive ? 'nav-icon active' : 'nav-icon'}>
          <ShieldCheck size={20} />
          <span>Admin</span>
        </NavLink>
      )}
    </div>
  );
}
