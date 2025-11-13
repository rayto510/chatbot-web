import { NavLink } from 'react-router-dom';
import { useUIStore } from '../store/ui';

export default function SideMenu() {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const closeSidebar = useUIStore((s) => s.closeSidebar);

  return (
    <nav
      id="sidemenu"
      className={`sidemenu ${sidebarOpen ? 'open' : ''}`}
      aria-label="Main"
    >
      <ul onClick={closeSidebar}>
        <li>
          <NavLink
            to="/apps"
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            Apps
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/documents"
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            Documents
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
