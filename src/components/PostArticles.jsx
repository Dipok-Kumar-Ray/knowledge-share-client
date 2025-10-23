import { getIdToken } from "firebase/auth";
import { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const PostArticles = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-xl text-primary"></span>
      </div>
    );
  }

  const handleAddArticle = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const articles = Object.fromEntries(formData.entries());

    // Convert tags to array
    if (articles.tags) {
      articles.tags = articles.tags.split(",").map((tag) => tag.trim());
    }

    // Add author info
    articles.authorName = user?.displayName || "Unknown Author";
    articles.authorEmail = user?.email || "";

    try {
      const token = await getIdToken(user);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/articles`,
        articles,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        toast.success("Article added successfully!");
        navigate("/myArticles");
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while adding the article!",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center py-10 px-4 mt-15 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <form
        onSubmit={handleAddArticle}
        className="w-full max-w-2xl p-8 md:p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-500 space-y-6"
      >
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-primary dark:text-blue-400 mb-8">
          Craft Your New Article
        </h2>

        {/* Article Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base md:text-lg font-semibold dark:text-gray-200">
              Article Title <span className="text-error">*</span>
            </span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="e.g., The Impact of AI on Modern Lifestyles"
            className="input input-bordered input-primary w-full text-base dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-primary/50 transition-all"
            required
          />
        </div>

        {/* Content */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base md:text-lg font-semibold dark:text-gray-200">
              Content <span className="text-error">*</span>
            </span>
          </label>
          <textarea
            name="content"
            placeholder="Write the full, engaging content of your article."
            className="textarea textarea-bordered textarea-primary h-48 w-full text-base resize-y dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-primary/50 transition-all"
            required
          ></textarea>
        </div>

        {/* Category */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base md:text-lg font-semibold dark:text-gray-200">
              Category <span className="text-error">*</span>
            </span>
          </label>
          <select
            name="category"
            className="select select-bordered select-primary w-full text-base dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-primary/50 transition-all"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Tech">Tech</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
        </div>

        {/* Tags */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base md:text-lg font-semibold dark:text-gray-200">
              Tags (comma separated)
            </span>
          </label>
          <input
            type="text"
            name="tags"
            placeholder="e.g., AI, Machine Learning, Future"
            className="input input-bordered input-primary w-full text-base dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Author Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base md:text-lg font-semibold dark:text-gray-200">
                Author Name
              </span>
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered input-primary w-full text-base dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 cursor-not-allowed"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base md:text-lg font-semibold dark:text-gray-200">
                Author Email
              </span>
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered input-primary w-full text-base dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Thumbnail */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base md:text-lg font-semibold dark:text-gray-200">
              Thumbnail Image URL
            </span>
          </label>
          <input
            type="url"
            name="photoUrl"
            placeholder="https://example.com/image.jpg"
            className="input input-bordered input-primary w-full text-base dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Date */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base md:text-lg font-semibold dark:text-gray-200">
              Publication Date
            </span>
          </label>
          <input
            type="date"
            name="date"
            className="input input-bordered input-primary w-full text-base dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-primary/50 transition-all"
            required
          />
        </div>

        {/* Submit */}
        <div className="form-control mt-8">
          <button
            type="submit"
            className="btn btn-primary btn-lg w-full text-white font-bold hover:scale-[1.02] transition-transform duration-300"
          >
            Add Post Article
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostArticles;
