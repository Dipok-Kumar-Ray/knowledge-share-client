import axios from "axios";
import { format } from "date-fns";
import { useContext, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useAppTheme } from "../hooks/useAppTheme";
import { FaHeart } from "react-icons/fa";
import { FiFileText, FiTag as FiTagIcon } from "react-icons/fi";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const ArticleDetailsPage = () => {
  const [commentText, setCommentText] = useState("");
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();
  const { getColor } = useAppTheme();
  const queryClient = useQueryClient();

  // Fetch article data with TanStack Query
  const { data: article, isLoading, isError } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/articles/${id}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch author gamification data
  const { data: authorData } = useQuery({
    queryKey: ['authorProfile', article?.authorEmail],
    queryFn: async () => {
      if (!article?.authorEmail) return null;
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile/${article.authorEmail}`);
      return response.data;
    },
    enabled: !!article?.authorEmail,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mutation for liking an article
  const likeMutation = useMutation({
    mutationFn: async () => {
      if (!user?.email) throw new Error("Please login to like");
      
      const token = await user.getIdToken();
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/userLike/${id}`,
        { userEmail: user.email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch the article data
      queryClient.invalidateQueries({ queryKey: ['article', id] });
      toast.success("Like updated!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update like");
    }
  });

  // Mutation for adding a comment
  const commentMutation = useMutation({
    mutationFn: async (commentText) => {
      if (!commentText.trim()) throw new Error("Comment cannot be empty");
      
      const commentObj = {
        email: user?.email || "Anonymous",
        displayName: user?.displayName || "Anonymous",
        text: commentText,
        userEmail: user?.email,
      };

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/comments/${id}`,
        {
          comment: commentObj,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch the article data
      queryClient.invalidateQueries({ queryKey: ['article', id] });
      setCommentText("");
      toast.success("Comment added!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add comment");
    }
  });

  const handleLike = () => {
    likeMutation.mutate();
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    commentMutation.mutate(commentText);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-bars loading-xl text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="text-center">
          <p className="text-error">Failed to load article. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="text-center">
          <p className="text-base-content/70">Article not found.</p>
        </div>
      </div>
    );
  }

  // Like button rendering part
  const hasLiked = Array.isArray(article.likes) && article.likes.includes(user?.email);
  const likeCount = Array.isArray(article.likes) ? article.likes.length : 0;
  const commentCount = Array.isArray(article.comments) ? article.comments.length : 0;

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
          disabled={likeMutation.isPending}
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
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <button
              type="submit"
              disabled={commentMutation.isPending}
              className="btn btn-primary btn-sm"
            >
              {commentMutation.isPending ? "Posting..." : "Post Comment"}
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