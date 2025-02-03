"use client"
import React, { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon, 
  UserCircleIcon,
  BellIcon,
  ChatBubbleOvalLeftIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { useTheme } from '@/context/ThemeContext';

const Header = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const { isDark, toggleTheme } = useTheme();

  // Dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  // Sample notifications
  const notifications = [
    { id: 1, text: 'New order received', time: '2 min ago' },
    { id: 2, text: 'Payment received', time: '15 min ago' },
    { id: 3, text: 'New customer registration', time: '1 hr ago' },
  ];

  // Handle message send
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sent: true }]);
      setNewMessage('');
    }
  };

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.notifications-menu')) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} 
    shadow-sm border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} px-6 py-4`}>
      <div className="flex items-center justify-between h-12">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders, products, users..."
              className={`w-full pl-10 pr-4 py-2 ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} 
                border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            <MagnifyingGlassIcon className={`h-5 w-5 absolute left-3 top-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="ml-4 flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isDark ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative notifications-menu">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative"
            >
              <BellIcon className="h-6 w-6" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg py-2">
                <div className="px-4 py-2 font-medium border-b dark:border-gray-700">
                  Notifications
                </div>
                {notifications.map(notification => (
                  <div key={notification.id} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <div className="text-sm">{notification.text}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Chat Button */}
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChatBubbleOvalLeftIcon className="h-6 w-6" />
          </button>

          {/* Chat Window */}
          {chatOpen && (
            <div className="fixed bottom-20 right-4 w-80 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg">
              <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-t-lg flex justify-between items-center">
                <h3 className="font-medium">Customer Support</h3>
                <button
                  onClick={() => setChatOpen(false)}
                  className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
                >
                  ×
                </button>
              </div>
              <div className="h-60 overflow-y-auto p-4 space-y-2">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-lg ${message.sent ? 'bg-blue-100 dark:bg-blue-900 ml-auto' : 'bg-gray-100 dark:bg-gray-700'}`}
                    style={{ maxWidth: '80%' }}
                  >
                    {message.text}
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="p-2 border-t dark:border-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 rounded-lg border dark:border-gray-600 px-2 py-1 text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* User Profile Dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1.5 rounded-lg">
              <UserCircleIcon className="h-8 w-8" />
              <span className="font-medium">Admin User</span>
            </Menu.Button>

            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} 
                        w-full px-4 py-2 text-left text-sm`}
                    >
                      View Profile
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => console.log('Sign out')}
                      className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} 
                        w-full px-4 py-2 text-left text-sm`}
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
  );
};

export default Header;