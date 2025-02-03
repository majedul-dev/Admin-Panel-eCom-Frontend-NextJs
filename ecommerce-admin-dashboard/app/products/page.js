// app/products/page.js
'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilSquareIcon,
  EyeIcon,
  TrashIcon,
  ChevronUpDownIcon,
  ArrowsUpDownIcon
} from '@heroicons/react/24/outline';

const products = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    sku: 'PH-7890',
    price: 299.99,
    stock: 25,
    category: 'Electronics',
    status: 'published',
    image: 'https://products.shureweb.eu/shure_product_db/product_main_images/files/c25/16a/40-/setcard/ce632827adec4e1842caa762f10e643d.jpeg',
    createdAt: '2024-03-15'
  },
  {
    id: 2,
    name: 'Organic Cotton T-Shirt',
    sku: 'TS-4567',
    price: 39.99,
    stock: 0,
    category: 'Fashion',
    status: 'draft',
    image: 'https://i.ebayimg.com/00/s/MTYwMFgxMzA4/z/s5MAAOSw3lRcx4qC/$_57.JPG?set_id=8800005007',
    createdAt: '2024-04-20'
  },
  {
    id: 3,
    name: 'Premium Wireless Headphones',
    sku: 'PH-7890',
    price: 299.99,
    stock: 25,
    category: 'Electronics',
    status: 'published',
    image: 'https://products.shureweb.eu/shure_product_db/product_main_images/files/c25/16a/40-/setcard/ce632827adec4e1842caa762f10e643d.jpeg',
    createdAt: '2024-03-15'
  },
  {
    id: 4,
    name: 'Organic Cotton T-Shirt',
    sku: 'TS-4567',
    price: 39.99,
    stock: 0,
    category: 'Fashion',
    status: 'draft',
    image: 'https://i.ebayimg.com/00/s/MTYwMFgxMzA4/z/s5MAAOSw3lRcx4qC/$_57.JPG?set_id=8800005007',
    createdAt: '2024-04-20'
  },
  // Add more products...
];

const statusColors = {
  published: 'bg-green-100 text-green-800',
  draft: 'bg-gray-100 text-gray-800',
  archived: 'bg-red-100 text-red-800'
};

const stockStatus = (stock) => {
  if(stock > 10) return 'In Stock';
  if(stock > 0) return 'Low Stock';
  return 'Out of Stock';
};

const stockColor = (stock) => {
  if(stock > 10) return 'text-green-600';
  if(stock > 0) return 'text-yellow-600';
  return 'text-red-600';
};

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Sorting functionality
  const sortedProducts = [...products].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filtering logic
  const filteredProducts = sortedProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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
    if (e.target.checked) {
      setSelectedProducts(currentProducts.map(product => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const toggleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <Link 
          href="/products/new"
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Product
        </Link>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
        </div>

        <select
          className="p-2 border rounded-lg bg-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Home & Kitchen">Home & Kitchen</option>
        </select>

        <select
          className="p-2 border rounded-lg bg-white"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === currentProducts.length}
                  onChange={toggleSelectAll}
                  className="h-4 w-4"
                />
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Product
              </th>
              <th 
                className="px-6 py-3 text-left text-sm font-medium cursor-pointer"
                onClick={() => handleSort('sku')}
              >
                <div className="flex items-center">
                  SKU
                  <ArrowsUpDownIcon className="h-4 w-4 ml-1" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-sm font-medium cursor-pointer"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center">
                  Price
                  <ArrowsUpDownIcon className="h-4 w-4 ml-1" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-sm font-medium cursor-pointer"
                onClick={() => handleSort('stock')}
              >
                <div className="flex items-center">
                  Stock
                  <ArrowsUpDownIcon className="h-4 w-4 ml-1" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleSelectProduct(product.id)}
                    className="h-4 w-4"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 object-cover rounded-md mr-4"
                    />
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">
                        Added: {new Date(product.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{product.sku}</td>
                <td className="px-6 py-4 text-sm">${product.price}</td>
                <td className="px-6 py-4">
                  <span className={`text-sm ${stockColor(product.stock)}`}>
                    {stockStatus(product.stock)}
                  </span>
                  <div className="text-xs text-gray-500">
                    {product.stock} units
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{product.category}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${statusColors[product.status]}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/products/${product.id}/edit`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </Link>
                    <button className="text-gray-600 hover:text-gray-900">
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
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
          Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} results
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
            disabled={indexOfLastProduct >= filteredProducts.length}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg flex items-center gap-4">
          <span className="text-sm">{selectedProducts.length} selected</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200">
              Delete Selected
            </button>
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
              Publish Selected
            </button>
          </div>
        </div>
      )}
    </div>
  );
}