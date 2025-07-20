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
    return <span className="loading loading-bars loading-xl"></span>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">All Articles</h1>

      {/* Filter Section */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
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

        {/* <select
          className="select select-bordered"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          <option>All</option>
          <option>React</option>
          <option>JavaScript</option>
          <option>AI</option>
        </select> */}

        <button className="btn btn-primary" onClick={handleFilter}>
          Filter
        </button>
      </div>

      {/* Article Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article._id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300 rounded-lg"
          >
            <figure className="h-56 overflow-hidden rounded-t-lg">
              <img
                src={article.photoUrl || "https://via.placeholder.com/400x200?text=No+Image"}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-xl font-bold text-blue-300 ">
                {article.title}
              </h2>
              <div className="flex justify-between text-sm text-gray-600">
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
              <p className="text-sm text-gray-700 line-clamp-3">
                {article.content.slice(0, 100)}...
              </p>
              <div className="card-actions justify-end pt-2">
                <button
                  onClick={() => handleReadMore(article._id)}
                  className="btn btn-sm btn-primary"
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
