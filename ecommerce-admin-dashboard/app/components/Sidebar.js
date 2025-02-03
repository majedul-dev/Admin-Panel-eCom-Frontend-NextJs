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
    { name: 'Create Product', href: '/products/new', icon: PlusIcon },
    { name: 'Add Category', href: '/categories/new', icon: PlusIcon },
  ];

  if (!isAdmin) return null;

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900 fixed h-full transition-colors duration-200">
      <div className="p-6">
        <h1 className="text-xl font-bold mb-8 dark:text-white">Admin Panel</h1>
        
        <nav className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                pathname === item.href
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3 dark:text-gray-400" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="my-6 border-t border-gray-200 dark:border-gray-700" />

        <div className="space-y-2">
          <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
            Quick Actions
          </h3>
          {secondaryNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <item.icon className="h-5 w-5 mr-3 text-green-500 dark:text-green-400" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}