'use client';
import { useState } from 'react';
import {
  LineChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Transition } from '@headlessui/react';
import { 
  CalendarIcon, 
  CurrencyDollarIcon, 
  ShoppingBagIcon, 
  UserGroupIcon, 
  ChevronDownIcon, 
  ChevronUpIcon,
  ShoppingCartIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ChartBarIcon,
  TagIcon
} from '@heroicons/react/24/outline';

// Temporary data
const salesData = [
  { date: '2024-01', total: 4000, online: 2400, offline: 1600 },
  { date: '2024-02', total: 4500, online: 2800, offline: 1700 },
  { date: '2024-03', total: 6000, online: 3500, offline: 2500 },
  { date: '2024-04', total: 5800, online: 3000, offline: 2800 },
  { date: '2024-05', total: 7200, online: 4200, offline: 3000 },
];

const productCategoryData = [
  { name: 'Electronics', value: 4000 },
  { name: 'Fashion', value: 3000 },
  { name: 'Home & Kitchen', value: 2000 },
  { name: 'Books', value: 1000 },
];

const orderData = [
  { month: 'Jan', completed: 120, pending: 45, canceled: 10, revenue: 24000 },
  { month: 'Feb', completed: 150, pending: 35, canceled: 5, revenue: 30000 },
  { month: 'Mar', completed: 180, pending: 25, canceled: 8, revenue: 36000 },
  { month: 'Apr', completed: 200, pending: 15, canceled: 3, revenue: 40000 },
];

const orderStatusData = [
  { name: 'Completed', value: 755, color: '#10B981' },
  { name: 'Pending', value: 120, color: '#F59E0B' },
  { name: 'Canceled', value: 25, color: '#EF4444' },
];

const COLORS = ['#3B82F6', '#6366F1', '#10B981', '#F59E0B', '#EF4444'];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('monthly');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedSections, setExpandedSections] = useState({
    sales: true,
    orders: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const metrics = [
    { 
      title: 'Total Sales', 
      value: '$58.2K',
      change: '+15.2%',
      icon: CurrencyDollarIcon,
      color: 'bg-blue-100'
    },
    { 
      title: 'Orders', 
      value: '2.4K',
      change: '+8.6%',
      icon: ShoppingBagIcon,
      color: 'bg-purple-100'
    },
    { 
      title: 'Customers', 
      value: '15.6K',
      change: '+12.1%',
      icon: UserGroupIcon,
      color: 'bg-green-100'
    },
    { 
      title: 'Avg. Order Value', 
      value: '$142',
      change: '+3.8%',
      icon: CalendarIcon,
      color: 'bg-orange-100'
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex gap-2">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{metric.title}</p>
                <p className="text-2xl font-semibold">{metric.value}</p>
                <span className="text-sm text-green-600">{metric.change}</span>
              </div>
              <div className={`${metric.color} p-3 rounded-lg`}>
                <metric.icon className="w-6 h-6 text-gray-700" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Analytics Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <button
          onClick={() => toggleSection('sales')}
          className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <ChartBarIcon className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold">Sales Analytics</h2>
              <p className="text-sm text-gray-500">Monthly sales performance</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {expandedSections.sales ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-600" />
            )}
          </div>
        </button>

        <Transition
          show={expandedSections.sales}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="p-6 border-t border-gray-100 space-y-8">
            {/* Sales Trend Chart */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="online" 
                    stroke="#10B981" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="offline" 
                    stroke="#6366F1" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Sales Comparison Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="online" fill="#10B981" />
                    <Bar dataKey="offline" fill="#6366F1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={productCategoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {productCategoryData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend 
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      {/* Order Analytics Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <button
          onClick={() => toggleSection('orders')}
          className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <ShoppingCartIcon className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold">Order Analytics</h2>
              <p className="text-sm text-gray-500">Monthly order performance</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {expandedSections.orders ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-600" />
            )}
          </div>
        </button>

        <Transition
          show={expandedSections.orders}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="p-6 border-t border-gray-100 space-y-8">
            {/* Order Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg flex items-center gap-4">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Completed Orders</p>
                  <p className="text-2xl font-semibold">755</p>
                </div>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg flex items-center gap-4">
                <ClockIcon className="h-8 w-8 text-amber-600" />
                <div>
                  <p className="text-sm text-gray-600">Pending Orders</p>
                  <p className="text-2xl font-semibold">120</p>
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg flex items-center gap-4">
                <XCircleIcon className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Canceled Orders</p>
                  <p className="text-2xl font-semibold">25</p>
                </div>
              </div>
            </div>

            {/* Order Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={orderData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="completed" 
                      name="Completed Orders"
                      fill="#10B981"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      dataKey="pending" 
                      name="Pending Orders"
                      fill="#F59E0B"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      dataKey="canceled" 
                      name="Canceled Orders"
                      fill="#EF4444"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [
                        value, 
                        `${((value / 900) * 100).toFixed(1)}%`
                      ]}
                    />
                    <Legend 
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                      iconSize={10}
                      iconType="circle"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Order ID</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[...Array(5)].map((_, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">#00{i + 1}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">Customer {i + 1}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">${(Math.random() * 500 + 50).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}