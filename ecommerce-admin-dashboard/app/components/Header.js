import React from 'react'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between h-12">
                {/* Search Bar */}
                <div className="flex-1 max-w-2xl">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search orders, products, users..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                  </div>
                </div>

                {/* User Profile Dropdown */}
                <div className="ml-4 flex items-center">
                  <Menu as="div" className="relative">
                    <Menu.Button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-1.5 rounded-lg">
                      <UserCircleIcon className="h-8 w-8 text-gray-600" />
                      <span className="font-medium text-gray-700">Admin User</span>
                    </Menu.Button>

                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } w-full px-4 py-2 text-left text-sm text-gray-700`}
                            >
                              View Profile
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => console.log('Sign out')}
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } w-full px-4 py-2 text-left text-sm text-gray-700`}
                            >
                              Sign Out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </header>
  )
}

export default Header