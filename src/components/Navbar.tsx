import { NavLink } from 'react-router-dom';
import { Gamepad2, CreditCard, Smile, UserCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t } = useTranslation();

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
    </div>
  );
}
