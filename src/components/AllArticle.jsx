import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useAppTheme } from "../hooks/useAppTheme";
import { FiTag } from "react-icons/fi";
import { useQuery } from '@tanstack/react-query';

const AllArticle = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();
  const { getColor } = useAppTheme();
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch articles with TanStack Query
  const { data: articles = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['articles', category, search],
    queryFn: async () => {
      const token = user?.accessToken;
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/articles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          category: category !== "All" ? category : undefined,
          search: search || undefined,
        },
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleFilter = () => {
    refetch();
  };

  const handleReadMore = (id) => {
    if (user?.email) {
      navigate(`/articleDetails/${id}`);
    } else {
      navigate("/login");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-bars loading-xl text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="text-center">
          <p className="text-error">Failed to load articles. Please try again later.</p>
          <button className="btn btn-primary mt-4" onClick={refetch}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 mt-20 bg-base-200 min-h-screen py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary">
        All Articles
      </h1>

      {/* Filter/Search Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full sm:w-auto">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search articles..."
              className="input input-bordered w-64 bg-base-100 text-base-content"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="select select-bordered bg-base-100 text-base-content"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Tech">Tech</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
          </div>

          <button
            className="btn btn-primary shadow-md hover:shadow-lg transition-all duration-300"
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
      </div>

      {/* Article Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {articles.map((article) => (
          <div
            key={article._id}
            className="bg-base-100 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] flex flex-col"
          >
            <figure className="h-48 overflow-hidden">
              <img
                src={
                  article.photoUrl ||
                  "https://via.placeholder.com/400x200?text=No+Image"
                }
                alt={article.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </figure>
            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-lg font-bold text-primary hover:text-secondary transition-colors duration-300 mb-2 line-clamp-2">
                {article.title}
              </h2>
              
              {/* AI Summary Preview */}
              {article.summary && (
                <p className="text-sm text-base-content/80 line-clamp-2 mb-3 italic">
                  {article.summary}
                </p>
              )}
              
              <div className="flex justify-between text-xs text-base-content/70 mb-3">
                <span>
                  <strong>Author:</strong>{" "}
                  <span className="text-primary">
                    {article.authorName || "Unknown"}
                  </span>
                </span>
                <span>
                  <strong>Date:</strong>{" "}
                  {new Date(article.date).toLocaleDateString()}
                </span>
              </div>
              
              {/* Tags Preview */}
              <div className="flex flex-wrap gap-1 mb-3">
                {/* Show up to 3 AI tags */}
                {Array.isArray(article.aiTags) && article.aiTags.slice(0, 3).map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs flex items-center"
                  >
                    <FiTag className="mr-1 text-xs" />
                    {tag}
                  </span>
                ))}
                
                {/* Show up to 2 manual tags if there's space */}
                {Array.isArray(article.tags) && article.tags.slice(0, Math.max(0, 3 - (article.aiTags?.length || 0))).map((tag, index) => (
                  <span 
                    key={`manual-${index}`} 
                    className="px-2 py-1 bg-base-300 text-base-content rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <p className="text-sm text-base-content/80 line-clamp-3 flex-grow">
                {article.content.slice(0, 120)}...
              </p>
              <div className="mt-4">
                <button
                  onClick={() => handleReadMore(article._id)}
                  className="btn btn-sm btn-primary w-full hover:btn-secondary transition-all duration-300"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArticle;