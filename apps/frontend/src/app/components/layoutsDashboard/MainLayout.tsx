import Sidebar from '../layoutsDashboard/Sidebar';
import Navbar from '../layoutsDashboard/Navbar';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-white">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
}
