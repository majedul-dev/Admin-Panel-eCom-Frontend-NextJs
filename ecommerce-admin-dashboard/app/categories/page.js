// app/categories/page.js
'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  FolderIcon,
  ChevronUpDownIcon,
  ArrowsUpDownIcon
} from '@heroicons/react/24/outline';

const categories = [
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
    description: 'Devices and gadgets',
    parentCategory: null,
    productCount: 245,
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'Mobile Phones',
    slug: 'mobile-phones',
    description: 'Smartphones and accessories',
    parentCategory: 'Electronics',
    productCount: 150,
    status: 'active',
    createdAt: '2024-02-20'
  },
];

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const itemsPerPage = 10;

  // Sorting functionality
  const sortedCategories = [...categories].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filtering logic
  const filteredCategories = sortedCategories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || category.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

  // Sort handler
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Bulk selection
  const toggleSelectAll = (e) => {
    setSelectedCategories(e.target.checked ? currentCategories.map(c => c.id) : []);
  };

  const toggleSelectCategory = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Delete confirmation modal
  const confirmDelete = () => {
    // Add your delete logic here
    console.log('Deleting categories:', selectedCategories);
    setSelectedCategories([]);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-6">
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-4">
              Are you sure you want to delete {selectedCategories.length} 
              categor{selectedCategories.length === 1 ? 'y' : 'ies'}?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Categories Management</h1>
        <Link 
          href="/categories/new"
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Category
        </Link>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
        </div>

        <select
          className="p-2 border rounded-lg bg-white"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Categories Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium w-12">
                <input
                  type="checkbox"
                  checked={selectedCategories.length === currentCategories.length}
                  onChange={toggleSelectAll}
                  className="h-4 w-4"
                />
              </th>
              <th 
                className="px-6 py-3 text-left text-sm font-medium cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Category Name
                  <ArrowsUpDownIcon className="h-4 w-4 ml-1" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">Description</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Parent Category</th>
              <th 
                className="px-6 py-3 text-left text-sm font-medium cursor-pointer"
                onClick={() => handleSort('productCount')}
              >
                <div className="flex items-center">
                  Products
                  <ArrowsUpDownIcon className="h-4 w-4 ml-1" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentCategories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggleSelectCategory(category.id)}
                    className="h-4 w-4"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <FolderIcon className="h-6 w-6 text-gray-400 mr-3" />
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-sm text-gray-500">/{category.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                  {category.description || '–'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {category.parentCategory || '–'}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="font-medium">{category.productCount}</span>
                  <span className="text-gray-500 ml-1">products</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    category.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {category.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/categories/${category.id}/edit`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </Link>
                    <button 
                      onClick={() => {
                        setSelectedCategories([category.id]);
                        setIsDeleteModalOpen(true);
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-700">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCategories.length)} of {filteredCategories.length} results
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={indexOfLastItem >= filteredCategories.length}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCategories.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg flex items-center gap-4">
          <span className="text-sm">{selectedCategories.length} selected</span>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
            >
              Delete Selected
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
              {selectedCategories.some(c => categories.find(cat => cat.id === c)?.status === 'active') 
                ? 'Archive Selected' 
                : 'Activate Selected'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}