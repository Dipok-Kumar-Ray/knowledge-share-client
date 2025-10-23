import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const MyArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.email) return;
      const token = await user.getIdToken();

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/myArticles?email=${user.email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setArticles(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  // Loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-bars loading-xl text-primary"></span>
      </div>
    );
  }

  // Handle delete with confirmation
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/articles/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your article has been deleted.",
                icon: "success",
                confirmButtonColor: "#2563eb",
              });
              setArticles(articles.filter((a) => a._id !== _id));
            }
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  return (
    <div className="w-11/12 mx-auto my-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary dark:text-blue-400">
        My Articles
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <table className="min-w-full text-sm md:text-base">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <tr>
              <th className="px-4 py-3 text-left border-b dark:border-gray-700">Title</th>
              <th className="px-4 py-3 text-left border-b dark:border-gray-700">Content</th>
              <th className="px-4 py-3 text-left border-b dark:border-gray-700">Category</th>
              <th className="px-4 py-3 text-left border-b dark:border-gray-700">Author</th>
              <th className="px-4 py-3 text-left border-b dark:border-gray-700">Date</th>
              <th className="px-4 py-3 text-left border-b dark:border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(articles) && articles.length > 0 ? (
              articles.map((article) => (
                <tr
                  key={article._id}
                  className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  <td className="px-4 py-3 border-b dark:border-gray-700 font-medium text-gray-800 dark:text-gray-100 break-words">
                    {article.title}
                  </td>
                  <td className="px-4 py-3 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300 max-w-[180px] truncate">
                    {article.content}
                  </td>
                  <td className="px-4 py-3 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    {article.category}
                  </td>
                  <td className="px-4 py-3 border-b dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    {article.authorName}
                  </td>
                  <td className="px-4 py-3 border-b dark:border-gray-700 text-gray-600 dark:text-gray-400">
                    {new Date(article.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 border-b dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link to={`/updateArticle/${article._id}`}>
                        <button className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-all w-full sm:w-auto">
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(article._id)}
                        className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-all w-full sm:w-auto"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 dark:text-gray-400 border-b dark:border-gray-700"
                >
                  No articles found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyArticles;
