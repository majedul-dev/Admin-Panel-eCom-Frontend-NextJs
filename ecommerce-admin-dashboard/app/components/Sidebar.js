'use client';
import {
  SquaresPlusIcon,
  FolderIcon,
  ChartBarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar({ isAdmin }) {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
    { name: 'Products', href: '/products', icon: SquaresPlusIcon },
    { name: 'Categories', href: '/categories', icon: FolderIcon },
    { name: 'Orders', href: '/orders', icon: ShoppingCartIcon },
    { name: 'Customers', href: '/customers', icon: UserGroupIcon },
    { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  ];

  const secondaryNavigation = [
    { name: 'Create Product', href: '/products/create', icon: PlusIcon },
    { name: 'Add Category', href: '/categories/create', icon: PlusIcon },
  ];

  if (!isAdmin) return null;

  return (
    <aside className="w-64 bg-white shadow-md fixed h-full">
      <div className="p-6">
        <h1 className="text-xl font-bold mb-8">Admin Panel</h1>
        
        <nav className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-lg ${
                pathname === item.href
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="my-6 border-t border-gray-200" />

        <div className="space-y-2">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase">
            Quick Actions
          </h3>
          {secondaryNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <item.icon className="h-5 w-5 mr-3 text-green-500" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}