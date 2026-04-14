'use client';

import MainLayout from '../components/layoutsDashboard/MainLayout';
import { AuthProvider } from '../contexts/AuthContext';
import { SidebarProvider } from '../contexts/SiderbarContext';

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <MainLayout>{children}</MainLayout>
      </SidebarProvider>
    </AuthProvider>
  );
}
