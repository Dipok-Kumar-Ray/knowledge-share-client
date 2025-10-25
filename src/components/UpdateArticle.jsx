import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useTheme } from "../contexts/ThemeContext";
import Swal from "sweetalert2";
import { FiRefreshCw, FiTag, FiFileText } from "react-icons/fi";

const UpdateArticle = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

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
    summary,
    aiTags
  } = useLoaderData();

  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState(summary || "");
  const [generatedTags, setGeneratedTags] = useState(Array.isArray(aiTags) ? aiTags.join(", ") : aiTags || "");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleGenerateAIContent = async (articleContent) => {
    setIsGenerating(true);
    try {
      // In a real implementation, this would call your backend API
      // that connects to an AI service like OpenAI
      const response = await fetch(`${import.meta.env.VITE_API_URL}/ai/generate-content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: articleContent }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedSummary(data.summary || "");
        setGeneratedTags(Array.isArray(data.tags) ? data.tags.join(", ") : data.tags || "");
      } else {
        throw new Error("Failed to generate AI content");
      }
    } catch (error) {
      console.error("AI generation failed:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to generate AI content. Please try again.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpdateArticle = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedArticle = Object.fromEntries(formData.entries());

    // readonly ফিল্ড গুলো আগের মতোই রাখা হবে (বদলবে না)
    updatedArticle.authorName = authorName;
    updatedArticle.email = email;

    // Add AI-generated content
    updatedArticle.summary = generatedSummary;
    updatedArticle.aiTags = generatedTags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0);

    // tags কে array তে রূপান্তর (যদি থাকে)
    if (updatedArticle.tags) {
      updatedArticle.tags = updatedArticle.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
    }

    fetch(`${import.meta.env.VITE_API_URL}/articles/${_id}`, {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <span className="loading loading-bars loading-xl text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-8 mt-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <form
        onSubmit={handleUpdateArticle}
        className="w-full max-w-2xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-2xl space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-primary dark:text-blue-400 mb-6">
          Update Your Article
        </h2>

        {/* Editable Fields */}
        <div className="form-control">
          <label htmlFor="title" className="label font-semibold dark:text-gray-200">
            Title <span className="text-error">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={title}
            required
            className="input input-bordered input-primary w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="form-control">
          <label htmlFor="content" className="label font-semibold dark:text-gray-200">
            Content <span className="text-error">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            defaultValue={content}
            required
            className="textarea textarea-bordered textarea-primary h-48 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* AI Content Generation Section */}
        <div className="form-control bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg text-blue-700 dark:text-blue-300 flex items-center">
              <FiFileText className="mr-2" />
              AI-Powered Content Assistant
            </h3>
            <button
              type="button"
              onClick={() => handleGenerateAIContent(document.getElementById("content").value)}
              disabled={isGenerating}
              className="btn btn-sm btn-outline btn-primary flex items-center dark:border-blue-400 dark:text-blue-400"
            >
              {isGenerating ? (
                <>
                  <span className="loading loading-spinner loading-xs mr-2"></span>
                  Generating...
                </>
              ) : (
                <>
                  <FiRefreshCw className="mr-2" />
                  Generate Summary & Tags
                </>
              )}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label htmlFor="generatedSummary" className="label font-semibold text-blue-700 dark:text-blue-300">
                <FiFileText className="mr-1 inline" />
                AI Summary
              </label>
              <textarea
                id="generatedSummary"
                name="generatedSummary"
                value={generatedSummary}
                onChange={(e) => setGeneratedSummary(e.target.value)}
                placeholder="AI-generated summary will appear here..."
                className="textarea textarea-bordered textarea-sm w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows="3"
              />
            </div>

            <div className="form-control">
              <label htmlFor="generatedTags" className="label font-semibold text-blue-700 dark:text-blue-300">
                <FiTag className="mr-1 inline" />
                AI Tags
              </label>
              <input
                id="generatedTags"
                name="generatedTags"
                type="text"
                value={generatedTags}
                onChange={(e) => setGeneratedTags(e.target.value)}
                placeholder="AI-generated tags will appear here..."
                className="input input-bordered input-sm w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Manual Tags */}
        <div className="form-control">
          <label htmlFor="tags" className="label font-semibold dark:text-gray-200">
            Manual Tags <span className="text-info text-sm font-normal">(Optional)</span>
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            defaultValue={Array.isArray(tags) ? tags.join(", ") : tags || ""}
            placeholder="e.g., technology, innovation, future (comma-separated)"
            className="input input-bordered input-primary w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Photo URL */}
        <div className="form-control">
          <label htmlFor="photoUrl" className="label font-semibold dark:text-gray-200">
            Photo URL <span className="text-info text-sm font-normal">(Optional)</span>
          </label>
          <input
            id="photoUrl"
            name="photoUrl"
            type="text"
            defaultValue={photoUrl || ""}
            placeholder="Enter image URL for article thumbnail"
            className="input input-bordered input-primary w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Category */}
        <div className="form-control">
          <label htmlFor="category" className="label font-semibold dark:text-gray-200">
            Category
          </label>
          <select
            id="category"
            name="category"
            defaultValue={category || ""}
            className="select select-bordered select-primary w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select a category</option>
            <option value="Tech">Tech</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Science">Science</option>
            <option value="Business">Business</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>

        {/* Readonly Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label font-semibold dark:text-gray-200">Author</label>
            <input
              type="text"
              value={authorName}
              readOnly
              className="input input-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="form-control">
            <label className="label font-semibold dark:text-gray-200">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="input input-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label font-semibold dark:text-gray-200">Date</label>
          <input
            type="text"
            value={new Date(date).toLocaleDateString()}
            readOnly
            className="input input-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-primary w-full py-3 text-lg font-bold hover:scale-[1.02] transition-transform duration-300 shadow-lg hover:shadow-xl"
          >
            Update Article
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateArticle;