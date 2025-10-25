import { getIdToken } from "firebase/auth";
import { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { FiRefreshCw, FiTag, FiFileText } from "react-icons/fi";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const PostArticles = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState("");
  const [generatedTags, setGeneratedTags] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch user gamification data with TanStack Query
  const { data: userData, isLoading: userDataLoading } = useQuery({
    queryKey: ['userProfile', user?.email],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/profile/${user.email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      return response.json();
    },
    enabled: !!user?.email,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleGenerateAIContent = async (articleContent) => {
    if (!articleContent.trim()) {
      toast.error("Please write some content first!");
      return;
    }

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
        toast.success("AI content generated successfully!");
      } else {
        throw new Error("Failed to generate AI content");
      }
    } catch (error) {
      console.error("AI generation failed:", error);
      toast.error("Failed to generate AI content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Mutation for adding an article
  const addArticleMutation = useMutation({
    mutationFn: async (articles) => {
      const token = await getIdToken(user);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/articles`,
        articles,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate articles query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      toast.success("Article added successfully!");
      // Show gamification reward notification
      toast.info(`You earned 50 points for posting an article!`);
      navigate("/myArticles");
    },
    onError: (error) => {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while adding the article!",
      });
    }
  });

  const handleAddArticle = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const articles = Object.fromEntries(formData.entries());

    // Convert tags to array
    if (articles.tags) {
      articles.tags = articles.tags.split(",").map((tag) => tag.trim());
    }

    // Add AI-generated content
    articles.summary = generatedSummary;
    articles.aiTags = generatedTags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0);

    // Add author info
    articles.authorName = user?.displayName || "Unknown Author";
    articles.authorEmail = user?.email || "";

    addArticleMutation.mutate(articles);
  };

  if (userDataLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-bars loading-xl text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center py-10 px-4 mt-15 bg-base-200 transition-colors duration-300">
      <form
        onSubmit={handleAddArticle}
        className="w-full max-w-2xl p-8 md:p-10 bg-base-100 rounded-2xl shadow-2xl border border-base-300 transition-all duration-500 space-y-6"
      >
        {/* Gamification Info Banner */}
        {userData && (
          <div className="alert alert-info shadow-lg mb-6 bg-primary/10 border-primary/20">
            <div>
              <span className="font-bold text-base-content">Gamification Stats:</span>
              <div className="flex gap-4 mt-2">
                <span className="badge badge-primary">Level {userData.level || 1}</span>
                <span className="badge badge-secondary">{userData.points || 0} Points</span>
                <span className="text-base-content/80">Posting an article earns you 50 points!</span>
              </div>
            </div>
          </div>
        )}

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-primary mb-8">
          Craft Your New Article
        </h2>

        {/* Article Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base md:text-lg font-semibold text-base-content">
              Article Title <span className="text-error">*</span>
            </span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="e.g., The Impact of AI on Modern Lifestyles"
            className="input input-bordered input-primary w-full text-base bg-base-100 border-base-300 text-base-content focus:ring-2 focus:ring-primary/50 transition-all"
            required
          />
        </div>

        {/* Content */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base md:text-lg font-semibold text-base-content">
              Content <span className="text-error">*</span>
            </span>
          </label>
          <textarea
            id="articleContent"
            name="content"
            placeholder="Write the full, engaging content of your article."
            className="textarea textarea-bordered textarea-primary h-48 w-full text-base resize-y bg-base-100 border-base-300 text-base-content focus:ring-2 focus:ring-primary/50 transition-all"
            required
          ></textarea>
        </div>

        {/* AI Content Generation Section */}
        <div className="form-control bg-primary/10 p-4 rounded-lg border border-primary/20">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg text-primary flex items-center">
              <FiFileText className="mr-2" />
              AI-Powered Content Assistant
            </h3>
            <button
              type="button"
              onClick={() => handleGenerateAIContent(document.getElementById("articleContent").value)}
              disabled={isGenerating}
              className="btn btn-sm btn-outline btn-primary flex items-center border-primary text-primary"
            >
              {isGenerating ? (
                <>
                  <span className="loading loading-spinner loading-xs mr-2"></span>
                  Generating...
                </>
              ) : (
                <>
                  <FiRefreshCw className="mr-2" />
                  Generate AI Content
                </>
              )}
            </button>
          </div>

          {/* AI Summary */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-sm font-medium text-primary flex items-center">
                <FiFileText className="mr-2" />
                AI-Generated Summary
              </span>
            </label>
            <textarea
              name="aiSummary"
              value={generatedSummary}
              onChange={(e) => setGeneratedSummary(e.target.value)}
              placeholder="AI-generated summary will appear here..."
              className="textarea textarea-bordered textarea-sm w-full bg-base-100 border-base-300 text-base-content"
              rows="3"
            ></textarea>
          </div>

          {/* AI Tags */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm font-medium text-primary flex items-center">
                <FiTag className="mr-2" />
                AI-Generated Tags
              </span>
            </label>
            <input
              type="text"
              name="aiTags"
              value={generatedTags}
              onChange={(e) => setGeneratedTags(e.target.value)}
              placeholder="AI-generated tags will appear here (comma-separated)..."
              className="input input-bordered input-sm w-full bg-base-100 border-base-300 text-base-content"
            />
          </div>
        </div>

        {/* Manual Tags */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base md:text-lg font-semibold text-base-content">
              Manual Tags <span className="text-info text-sm font-normal">(Optional)</span>
            </span>
          </label>
          <input
            type="text"
            name="tags"
            placeholder="e.g., technology, innovation, future (comma-separated)"
            className="input input-bordered input-primary w-full text-base bg-base-100 border-base-300 text-base-content focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Photo URL */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base md:text-lg font-semibold text-base-content">
              Photo URL <span className="text-info text-sm font-normal">(Optional)</span>
            </span>
          </label>
          <input
            type="text"
            name="photoUrl"
            placeholder="Enter image URL for article thumbnail"
            className="input input-bordered input-primary w-full text-base bg-base-100 border-base-300 text-base-content focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Submit Button */}
        <div className="form-control mt-8">
          <button
            type="submit"
            disabled={addArticleMutation.isPending}
            className="btn btn-primary w-full py-3 text-lg font-bold hover:scale-[1.02] transition-transform duration-300 shadow-lg hover:shadow-xl"
          >
            {addArticleMutation.isPending ? "Publishing..." : "Publish Article"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostArticles;