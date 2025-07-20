import { getIdToken } from "firebase/auth";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const PostArticles = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  setTimeout(() => {
    setLoading(false);
  }, 300);

  if (loading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  const handleAddArticle = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const articles = Object.fromEntries(formData.entries());

    // convert comma separated tag string to array
    if (articles.tags) {
      articles.tags = articles.tags.split(",").map((tag) => tag.trim());
    }

    try {
      const token = await getIdToken(user);
      const res = await axios.post(
        `https://eduhive-server-side.vercel.app/articles`,
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
    }
  };

  return (
    <div className="flex justify-center items-center py-8">
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
            <option value="Lifestyle">Lifestyle</option>
            <option value="Business">Business</option>
            <option value="Science">Science</option>
            <option value="Travel">Travel</option>
            <option value="Arts & Culture">Arts & Culture</option>
          </select>
        </div>

        {/* Tags Dropdown */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg font-semibold">
              Tags (comma separated)
            </span>
          </label>
          <select
            name="tags"
            className="select select-bordered select-primary w-full text-base"
            onChange={(e) => {
              // set selected tag as input value
              e.target.form.tags.value = e.target.value;
            }}
          >
            <option value="">Select a tag</option>
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="AI">AI</option>
            <option value="CSS">CSS</option>
            <option value="MongoDB">MongoDB</option>
          </select>

          {/* Hidden input to hold selected tag(s) */}
          <input
            type="text"
            name="tags"
            placeholder="e.g., react, ai"
            className="input input-bordered input-primary w-full text-base mt-2"
          />
        </div>

        {/* Author Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg font-semibold">
              Author Name
            </span>
          </label>
          <input
            type="text"
            name="authorName"
            value={user?.displayName}
            readOnly
            className="input input-bordered input-primary w-full text-base"
          />
        </div>

        {/* Author Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg font-semibold">
              Author Email
            </span>
          </label>
          <input
            type="email"
            name="authorEmail"
            value={user?.email}
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
