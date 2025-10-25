import { useState, useEffect, useContext } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useParams, useNavigate } from 'react-router';
import { FiGrid, FiList, FiArrowUp, FiArrowDown, FiSearch } from 'react-icons/fi';

const CategoryArticles = ({ category: propCategory }) => {
  const { theme } = useTheme();
  const { categoryName: routeCategoryName } = useParams();
  const navigate = useNavigate();
  const categoryName = propCategory || routeCategoryName;
  
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all categories and articles
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all categories
        const categoriesResponse = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
        let categoryList = [];
        
        if (categoriesResponse.ok) {
          categoryList = await categoriesResponse.json();
        } else {
          // Fallback to known categories if API doesn't exist
          categoryList = ['Tech', 'Health', 'Education'];
        }
        
        setCategories(categoryList);
        
        // If we're on a specific category page, fetch articles for that category
        if (categoryName) {
          const articlesResponse = await fetch(`${import.meta.env.VITE_API_URL}/articles?category=${encodeURIComponent(categoryName)}`);
          
          if (articlesResponse.ok) {
            const articlesData = await articlesResponse.json();
            setArticles(Array.isArray(articlesData) ? articlesData : []);
            setFilteredArticles(Array.isArray(articlesData) ? articlesData : []);
          } else {
            throw new Error(`Failed to fetch articles: ${articlesResponse.status} ${articlesResponse.statusText}`);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryName]);

  // Filter and sort articles
  useEffect(() => {
    let result = [...articles];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.authorName && article.authorName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        // Handle date sorting
        if (sortConfig.key === 'date') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }
        
        // Handle null/undefined values
        if (aValue == null) aValue = '';
        if (bValue == null) bValue = '';
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredArticles(result);
  }, [articles, searchTerm, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? <FiArrowUp className="inline ml-1" /> : <FiArrowDown className="inline ml-1" />;
    }
    return null;
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">Failed to load data: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {!categoryName ? (
        // Category selection view
        <div>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Explore Categories
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover articles from various categories. Click on any category to explore its content.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-700/20 dark:to-purple-700/20"></div>
                <div className="relative p-8 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">{category.charAt(0)}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">{category}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Explore articles in this category
                  </p>
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    View Articles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Category articles view
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                {categoryName} Articles
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <button 
              onClick={() => navigate('/category')}
              className="mt-4 md:mt-0 px-5 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg transition-colors duration-300 flex items-center"
            >
              ← Back to Categories
            </button>
          </div>

          {/* Search and Filter Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('card')}
                  className={`p-2 rounded-lg ${viewMode === 'card' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
                  title="Card View"
                >
                  <FiGrid />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-lg ${viewMode === 'table' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
                  title="Table View"
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>

          {/* Articles Display */}
          {viewMode === 'card' ? (
            // Card View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <div key={article._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
                  {article.photoUrl && (
                    <img 
                      src={article.photoUrl} 
                      alt={article.title} 
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {article.content}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{article.authorName || 'Unknown Author'}</span>
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                    <button
                      onClick={() => navigate(`/articleDetails/${article._id}`)}
                      className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Table View
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('title')}
                    >
                      <div className="flex items-center">
                        Title {getSortIcon('title')}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('authorName')}
                    >
                      <div className="flex items-center">
                        Author {getSortIcon('authorName')}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('date')}
                    >
                      <div className="flex items-center">
                        Date {getSortIcon('date')}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredArticles.map((article) => (
                    <tr key={article._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{article.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">{article.authorName || 'Unknown'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(article.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => navigate(`/articleDetails/${article._id}`)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Read
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No articles found</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryArticles;