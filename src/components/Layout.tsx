import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import ChatWindow from './chat/ChatWindow';
import { useUIStore } from '../store/ui';

export default function Layout() {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const closeSidebar = useUIStore((s) => s.closeSidebar);

  return (
    <div className="app-grid">
      <Navbar />
      <SideMenu />
      {sidebarOpen && (
        <div className="backdrop" onClick={closeSidebar} aria-hidden="true" />
      )}
      <main className="content" role="main">
        <Outlet />
      </main>
      <ChatWindow />
    </div>
  );
}
