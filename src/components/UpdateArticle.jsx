import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateArticle = () => {
  const navigate = useNavigate();

  // এখানে useLoaderData থেকে article এর সব ডাটা পাবে
  const {
    _id,
    title,
    content,
    category,
    tags,
    authorName,
    email,
    photoUrl,
    date,
  } = useLoaderData();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  const handleUpdateArticle = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedArticle = Object.fromEntries(formData.entries());

    // readonly ফিল্ড গুলো আগের মতোই রাখা হবে (বদলবে না)
    updatedArticle.authorName = authorName;
    updatedArticle.email = email;

    // tags কে array তে রূপান্তর (যদি থাকে)
    if (updatedArticle.tags) {
      updatedArticle.tags = updatedArticle.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
    }

    fetch(`https://eduhive-server-side.vercel.app/articles/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedArticle),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Your article has been updated successfully.",
            icon: "success",
            confirmButtonText: "Cool",
            draggable: true,
          });
          navigate("/myArticles");
        } else {
          Swal.fire({
            title: "No Changes",
            text: "No updates were made to the article.",
            icon: "info",
            confirmButtonText: "Okay",
          });
        }
      })
      .catch((err) => {
        console.error("Update failed:", err);
        Swal.fire({
          title: "Error!",
          text: "Failed to update article. Please try again.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  return (
    <div className="flex justify-center items-center py-8 mt-20">
      <form
        onSubmit={handleUpdateArticle}
        className="w-full max-w-2xl p-8 bg-base-100 rounded-lg shadow-2xl space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-primary mb-6">
          Update Your Article
        </h2>

        {/* Editable Fields */}
        <div className="form-control">
          <label htmlFor="title" className="label font-semibold">
            Title <span className="text-error">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={title}
            required
            className="input input-bordered input-primary w-full"
          />
        </div>

        <div className="form-control">
          <label htmlFor="content" className="label font-semibold">
            Content <span className="text-error">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            defaultValue={content}
            required
            className="textarea textarea-bordered textarea-primary h-48 w-full"
          />
        </div>

        <div className="form-control">
          <label htmlFor="category" className="label font-semibold">
            Category <span className="text-error">*</span>
          </label>
          <select
            id="category"
            name="category"
            defaultValue={category}
            required
            className="select select-bordered select-primary w-full"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Technology">Technology</option>
            <option value="Science">Science</option>
            <option value="Health & Wellness">Health & Wellness</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Travel">Travel</option>
            <option value="Education">Education</option>
            <option value="Business">Business</option>
            <option value="Arts & Culture">Arts & Culture</option>
          </select>
        </div>

        <div className="form-control">
          <label htmlFor="tags" className="label font-semibold">
            Tags (Optional)
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            defaultValue={Array.isArray(tags) ? tags.join(", ") : tags || ""}
            placeholder="e.g., react, javascript"
            className="input input-bordered input-primary w-full"
          />
        </div>

        <div className="form-control">
          <label htmlFor="photoUrl" className="label font-semibold">
            Thumbnail Image URL (Optional)
          </label>
          <input
            id="photoUrl"
            name="photoUrl"
            type="url"
            defaultValue={photoUrl}
            className="input input-bordered input-primary w-full"
          />
        </div>

        <div className="form-control">
          <label htmlFor="date" className="label font-semibold">
            Publication Date <span className="text-error">*</span>
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={date ? date.split("T")[0] : ""}
            required
            className="input input-bordered input-primary w-full"
          />
        </div>

        {/* Readonly Fields */}
        <div className="form-control">
          <label htmlFor="authorName" className="label font-semibold">
            Author Name
          </label>
          <input
            id="authorName"
            name="authorName"
            type="text"
            value={authorName}
            readOnly
            className="input input-bordered input-primary w-full bg-gray-200 cursor-not-allowed"
          />
        </div>

        <div className="form-control">
          <label htmlFor="email" className="label font-semibold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email || ""}
            readOnly
            className="input input-bordered input-primary w-full bg-gray-200 cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-primary btn-lg w-full text-white font-bold"
          >
            Update Article
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateArticle;
