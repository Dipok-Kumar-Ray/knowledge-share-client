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
    return <span className="loading loading-bars loading-xl"></span>;
  }

  const handleAddArticle = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const articles = Object.fromEntries(formData.entries());

    // tags string থেকে array তৈরি
    if (articles.tags) {
      articles.tags = articles.tags.split(",").map((tag) => tag.trim());
    }

    // authorName এবং authorEmail ম্যানুয়ালি যোগ করছি (formData থেকে নয়)
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
      } else {
        console.log("verification failed");
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while adding the article!",
      });
    }
  };

  return (
    <div className="flex justify-center items-center py-8 mt-20">
      <form
        onSubmit={handleAddArticle}
        className="w-full max-w-2xl p-8 bg-base-100 rounded-lg shadow-2xl space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-primary mb-6">
          Craft Your New Article
        </h2>

        {/* Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg font-semibold">
              Article Title <span className="text-error">*</span>
            </span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="e.g., The Impact of AI on Modern Lifestyles"
            className="input input-bordered input-primary w-full text-base"
            required
          />
        </div>

        {/* Content */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg font-semibold">
              Content <span className="text-error">*</span>
            </span>
          </label>
          <textarea
            name="content"
            placeholder="Write the full, engaging content of your article."
            className="textarea textarea-bordered textarea-primary h-48 w-full text-base resize-y"
            required
          ></textarea>
        </div>

        {/* Category Dropdown */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg font-semibold">
              Category <span className="text-error">*</span>
            </span>
          </label>
          <select
            name="category"
            className="select select-bordered select-primary w-full text-base"
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

        {/* Author Name and Email (readonly just for display) */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg font-semibold">Author Name</span>
          </label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered input-primary w-full text-base"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg font-semibold">Author Email</span>
          </label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered input-primary w-full text-base"
          />
        </div>

        {/* Thumbnail */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg font-semibold">
              Thumbnail Image URL
            </span>
          </label>
          <input
            type="url"
            name="photoUrl"
            placeholder="https://example.com/image.jpg"
            className="input input-bordered input-primary w-full text-base"
          />
        </div>

        {/* Date */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg font-semibold">
              Publication Date
            </span>
          </label>
          <input
            type="date"
            name="date"
            className="input input-bordered input-primary w-full text-base"
            required
          />
        </div>

        {/* Submit */}
        <div className="form-control mt-8">
          <button
            type="submit"
            className="btn btn-primary btn-lg w-full text-white font-bold"
          >
            Add Post Article
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostArticles;

