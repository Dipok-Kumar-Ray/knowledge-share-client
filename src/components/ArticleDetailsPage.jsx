import axios from "axios";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { FaHeart } from "react-icons/fa";


import { toast } from "react-toastify";

const ArticleDetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/articles/${id}`);
      
      setArticle(res.data);
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
      //  Update local article state safely
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
  };

  try {
    const res = await axios.patch(`${import.meta.env.VITE_API_URL}/comments/${id}`, {
      comment: commentObj,
    });
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
    return <span className="loading loading-bars loading-xl"></span>;
  }

// Like button rendering part
const hasLiked = Array.isArray(article.likes) && article.likes.includes(user?.email);
const likeCount = Array.isArray(article.likes) ? article.likes.length : 0;
  const commentCount = Array.isArray(article.comments) ? article.comments.length : 0;

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-xl shadow-md mt-20">
      <img
        src={article.photoUrl}
        alt={article.title}
        className="w-full h-full object-cover rounded-lg mb-4"
      />

      <h1 className="text-3xl font-bold text-center mb-2">{article.title}</h1>

      <div className="flex justify-center gap-4 text-sm text-gray-600 mb-4">
        <span className="font-semibold">Author:</span>
        <span>{article.authorName || "Unknown"}</span>
        {article.date && (
          <>
            <span> | </span>
            <span>{format(new Date(article.date), "PPP")}</span>
          </>
        )}
      </div>

      <p className="whitespace-pre-line mb-4">{article.content}</p>

      <p className="text-sm text-blue-500 font-medium">
        Tags: {Array.isArray(article.tags) ? article.tags.join(", ") : "No Tags"}
      </p>

   {/* Like button UI */}
<div className="mt-6 flex items-center justify-between">
  <button
    onClick={handleLike}
    className={`flex items-center gap-2 text-xl transition duration-300 ${
      hasLiked ? "text-red-500" : "text-gray-500"
    }`}
  >
    {hasLiked ? <FaHeart size={24} /> : <FaHeart size={24} className="opacity-40" />}
    <span>{likeCount} {likeCount === 1 ? "Like" : "Likes"}</span>
  </button>
  <span>{commentCount} {commentCount === 1 ? "Comment" : "Comments"}</span>
</div>





<div className="mt-6">
  <h2 className="text-lg font-semibold mb-2">Comments</h2>
  {Array.isArray(article.comments) && article.comments.length > 0 ? (
    article.comments.map((comment, idx) => (
      <div key={idx} className="border p-2 rounded mb-2">
        <p className="text-sm font-medium text-blue-500">
          {/* commenter name or email */}
          {comment?.displayName || comment?.email || "Anonymous"}
        </p>
        <p className="text-gray-200">
          {/* comment text */}
          {typeof comment?.text === "string"
            ? comment.text
            : comment?.text?.text || ""}
        </p>
      </div>
    ))
  ) : (
    <p>No comments yet</p>
  )}

  <form onSubmit={handleCommentSubmit} className="mt-4 flex flex-col gap-2">
    <input
      type="text"
      name="comment"
      placeholder="Write your comment..."
      className="border p-2 rounded"
      required
    />
    <button type="submit" className="bg-blue-500 text-white rounded p-2">
      Submit Comment
    </button>
  </form>
</div>

    </div>
  );
};

export default ArticleDetailsPage;
