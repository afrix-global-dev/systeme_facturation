'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth-context';
import Image from 'next/image';
import logo from '../assets/logo_eTax.png';
import {
  Home,
  Users,
  FileText,
  Package,
  Settings,
  LogOut,
  ShoppingCart,
  Truck,
  ArrowLeftRight,
  BarChart3,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/clients', label: 'Clients', icon: Users },
  { href: '/dashboard/factures', label: 'Factures', icon: FileText },
  { href: '/dashboard/produits', label: 'Produits', icon: Package },
  { href: '/dashboard/approvisionnement', label: 'Approvisionnement', icon: Truck },
  { href: '/dashboard/ventes', label: 'Ventes', icon: ShoppingCart },
  { href: '/dashboard/transactions', label: 'Stock', icon: ArrowLeftRight },
  { href: '/dashboard/rapports', label: 'Rapports', icon: BarChart3 },
  { href: '/dashboard/parametres', label: 'Paramètres', icon: Settings },
];

interface SidebarProps {
  isExpanded: boolean;
}

export default function Sidebar({ isExpanded }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside
      className={cn(
        'relative z-50 flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out',
        isExpanded ? 'w-[260px]' : 'w-[80px]'
      )}
    >
      {/* Header / Logo */}
      <div className="flex h-[70px] items-center px-4 border-b border-slate-100 overflow-hidden">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
          <Image src={logo} alt="Logo" className="h-6 w-auto" />
        </div>
        <span
          className={cn(
            'ml-3 font-bold text-slate-800 whitespace-nowrap transition-all duration-300',
            isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'
          )}
        >
          eTax Facturation
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 custom-scrollbar">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  title={!isExpanded ? item.label : undefined}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all group',
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                  )}
                >
                  <item.icon className={cn('h-5 w-5 shrink-0', isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-600')} />
                  <span
                    className={cn(
                      'text-sm font-medium transition-all duration-300 truncate',
                      isExpanded ? 'opacity-100' : 'opacity-0 w-0'
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer / Logout */}
      <div className="p-3 border-t border-slate-100">
        <button
          onClick={logout}
          title={!isExpanded ? 'Déconnexion' : undefined}
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50',
            !isExpanded && 'justify-center'
          )}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {isExpanded && <span className="truncate">Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
}