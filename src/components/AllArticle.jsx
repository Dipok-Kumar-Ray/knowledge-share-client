import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const AllArticle = () => {
  const { user } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [tag, setTag] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles(category, tag);
  }, [user]);

  const fetchArticles = async (selectedCategory, selectedTag) => {
    const token = user?.accessToken;
    try {
      const res = await axios.get(`http://localhost:3000/articles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          category: selectedCategory !== "All" ? selectedCategory : undefined,
          tag: selectedTag !== "All" ? selectedTag : undefined,
        },
      });
      setArticles(res.data);
    } catch (err) {
      console.error("Failed to fetch articles:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    setLoading(true);
    fetchArticles(category, tag);
  };

  const handleReadMore = (id) => {
    if (user?.email) {
      navigate(`/articleDetails/${id}`);
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-xl text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 mt-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
        All Articles
      </h1>

      {/* Filter Section */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <select
          className="select select-bordered"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Tech</option>
          <option>Health</option>
          <option>Education</option>
        </select>

        <button
          className="btn btn-primary shadow-md hover:shadow-lg transition-all duration-300"
          onClick={handleFilter}
        >
          Filter
        </button>
      </div>

      {/* Article Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {articles.map((article) => (
          <div
            key={article._id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] flex flex-col"
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
              <div className="flex justify-between text-xs text-gray-500 mb-3">
                <span>
                  <strong>Author:</strong>{" "}
                  <span className="text-blue-600">
                    {article.authorName || "Unknown"}
                  </span>
                </span>
                <span>
                  <strong>Date:</strong>{" "}
                  {new Date(article.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-3 flex-grow">
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
