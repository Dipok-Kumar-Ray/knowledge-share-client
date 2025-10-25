import axios from "axios";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useAppTheme } from "../hooks/useAppTheme";
import { FaHeart } from "react-icons/fa";
import { FiFileText, FiTag as FiTagIcon } from "react-icons/fi";
import { toast } from "react-toastify";

const ArticleDetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const [authorData, setAuthorData] = useState(null);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();
  const { getColor } = useAppTheme();

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/articles/${id}`);
      setArticle(res.data);

      // Fetch author gamification data
      if (res.data.authorEmail) {
        try {
          const authorRes = await axios.get(
            `${import.meta.env.VITE_API_URL}/user/profile/${res.data.authorEmail}`
          );
          setAuthorData(authorRes.data);
        } catch {
          console.log("Could not fetch author data");
        }
      }
    } catch {
      toast.error("Failed to load article");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const handleLike = async () => {
    if (!user?.email) return toast.error("Please login to like");

    try {
      const token = await user.getIdToken();

      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/userLike/${id}`,
        { userEmail: user.email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.modifiedCount >= 0 || res.data.upsertedCount >= 0) {
        // Update local article state safely
        setArticle((prev) => {
          const likesArray = Array.isArray(prev.likes) ? prev.likes : [];
          const alreadyLiked = likesArray.includes(user.email);
          const newLikes = alreadyLiked
            ? likesArray.filter((email) => email !== user.email)
            : [...likesArray, user.email];

          return {
            ...prev,
            likes: newLikes,
          };
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update like");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.comment.value.trim();
    if (!text) return;

    const commentObj = {
      email: user?.email || "Anonymous",
      displayName: user?.displayName || "Anonymous",
      text,
      userEmail: user?.email,
    };

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/comments/${id}`,
        {
          comment: commentObj,
        }
      );
      if (res.data.modifiedCount) {
        toast.success("Comment added!");
        fetchArticle();
        e.target.reset();
      }
    } catch {
      toast.error("Failed to add comment");
    }
  };

  if (loading || !article) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-bars loading-xl text-primary"></span>
      </div>
    );
  }

  // Like button rendering part
  const hasLiked =
    Array.isArray(article.likes) && article.likes.includes(user?.email);
  const likeCount = Array.isArray(article.likes)
    ? article.likes.length
    : 0;
  const commentCount = Array.isArray(article.comments)
    ? article.comments.length
    : 0;

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-xl shadow-md mt-20 bg-base-100">
      <img
        src={article.photoUrl}
        alt={article.title}
        className="w-full h-full object-cover rounded-lg mb-4"
      />

      <h1 className="text-3xl font-bold text-center mb-2 text-base-content">
        {article.title}
      </h1>

      <div className="flex justify-center gap-4 text-sm text-base-content/70 mb-4">
        <span className="font-semibold">Author:</span>
        <span>{article.authorName || "Unknown"}</span>
        {article.date && (
          <>
            <span> | </span>
            <span>{format(new Date(article.date), "PPP")}</span>
          </>
        )}
        {/* Show author's gamification stats */}
        {authorData && (
          <>
            <span> | </span>
            <span className="badge badge-primary">
              Level {authorData.level || 1}
            </span>
            <span className="badge badge-secondary">
              {authorData.points || 0} pts
            </span>
          </>
        )}
      </div>

      {/* AI-Generated Summary */}
      {article.summary && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-lg text-primary flex items-center mb-2">
            <FiFileText className="mr-2" />
            Article Summary
          </h3>
          <p className="text-base-content/90">
            {article.summary}
          </p>
        </div>
      )}

      <p className="whitespace-pre-line mb-4 text-base-content">{article.content}</p>

      {/* Tags Section */}
      <div className="mb-6">
        <h3 className="font-bold text-lg text-base-content flex items-center mb-2">
          <FiTagIcon className="mr-2" />
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {/* Manual Tags */}
          {Array.isArray(article.tags) && article.tags.length > 0 ? (
            article.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-base-300 text-base-content rounded-full text-sm"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-base-content/60">
              No tags available
            </span>
          )}

          {/* AI Tags */}
          {Array.isArray(article.aiTags) &&
            article.aiTags.length > 0 &&
            article.aiTags.map((tag, index) => (
              <span
                key={`ai-${index}`}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center"
              >
                <FiTagIcon className="mr-1 text-xs" />
                {tag}
              </span>
            ))}
        </div>
      </div>

      {/* Like and Comment Section */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            hasLiked
              ? "bg-error/10 text-error"
              : "bg-base-200 text-base-content"
          }`}
        >
          <FaHeart className={hasLiked ? "fill-current" : ""} />
          <span>{likeCount} likes</span>
        </button>
        <span className="text-base-content/70">
          {commentCount} comments
        </span>
      </div>

      {/* Comments Section */}
      <div className="bg-base-200/50 rounded-lg p-4 mb-6">
        <h3 className="font-bold text-lg mb-4 text-base-content">Comments</h3>
        
        {user?.email ? (
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              name="comment"
              placeholder="Add a comment..."
              className="w-full p-3 rounded-lg mb-2 bg-base-100 text-base-content border border-base-300"
              rows="3"
            ></textarea>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
            >
              Post Comment
            </button>
          </form>
        ) : (
          <p className="text-base-content/70 mb-4">
            Please <a href="/login" className="text-primary hover:underline">login</a> to comment
          </p>
        )}

        <div className="space-y-4">
          {Array.isArray(article.comments) && article.comments.length > 0 ? (
            article.comments.map((comment, index) => (
              <div key={index} className="bg-base-100 p-3 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-base-content">
                    {comment.displayName}
                  </span>
                  <span className="text-xs text-base-content/60">
                    {comment.timestamp
                      ? format(new Date(comment.timestamp), "MMM d, yyyy h:mm a")
                      : "Unknown date"}
                  </span>
                </div>
                <p className="text-base-content/90">{comment.text}</p>
              </div>
            ))
          ) : (
            <p className="text-base-content/60">No comments yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailsPage;