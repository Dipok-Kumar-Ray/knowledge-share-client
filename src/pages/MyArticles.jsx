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


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  // handleDelete
  const handleDelete = (_id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
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
                  confirmButtonText: "Cool",
                });
                const newArticles = articles.filter(
                  (article) => article._id !== _id
                );
                setArticles(newArticles);
              }
            })
            .catch((error) => {
              console.error("Error deleting article:", error);
              Swal.fire("Error!", "Something went wrong.", "error");
            });
        }
      });
  };

  return (
    <div className="w-11/12 mx-auto my-9 overflow-x-auto">
      <h1 className="text-3xl font-bold text-center mb-6">My Articles</h1>
      <div className="shadow-md rounded-lg border border-gray-800">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-3 sm:px-4 py-2 text-left border">Title</th>
              <th className="px-3 sm:px-4 py-2 text-left border">Content</th>
              <th className="px-3 sm:px-4 py-2 text-left border">Category</th>
              <th className="px-3 sm:px-4 py-2 text-left border">Author</th>
              <th className="px-3 sm:px-4 py-2 text-left border">Date</th>
              <th className="px-3 sm:px-4 py-2 text-left border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(articles) && articles.length > 0 ? (
              articles.map((article) => (
                <tr key={article._id} className="hover:bg-orange-100">
                  <td className="px-3 sm:px-4 py-2 border break-words">
                    {article.title}
                  </td>
                  <td className="px-3 sm:px-4 py-2 border break-words max-w-[150px] sm:max-w-xs truncate">
                    {article.content}
                  </td>
                  <td className="px-3 sm:px-4 py-2 border">
                    {article.category}
                  </td>
                  <td className="px-3 sm:px-4 py-2 border">
                    {article.authorName}
                  </td>
                  <td className="px-3 sm:px-4 py-2 border">{article.date}</td>
                  <td className="px-3 sm:px-4 py-2 border">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <Link to={`/updateArticle/${article._id}`}>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 w-full sm:w-auto">
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(article._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 w-full sm:w-auto"
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
                  className="text-center py-4 text-gray-500 border"
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
