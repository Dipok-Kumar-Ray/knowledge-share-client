import axios from "axios";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const ArticleDetailsPage = () => {
    
  //comments
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);


  //likes
  const [cardData, setCardData] = useState([]);
  const { id } = useParams();
  const articles = useLoaderData();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const filtered = articles.filter((article) => article._id === id);
    setCardData(filtered);
  }, [articles, id]);

  const handleLike = (id) => {
    // console.log(id);
    axios
      .patch(`http://localhost:4000/userLike/${id}`, {
        userEmail: user?.email,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const comment = form.comment.value;
    console.log(comment);
  };

  return (
    <div>
      {cardData.map((article) => (
        <div
          key={article._id}
          className="max-w-2xl mx-auto rounded-2xl shadow-lg p-6"
        >
          <h1 className="text-3xl font-bold text-center mb-4">
            {article.title}
          </h1>

          <div className="flex justify-center mb-4">
            <img
              src={
                article.photoUrl ||
                "https://via.placeholder.com/800x400?text=No+Image"
              }
              alt={article.title}
              className="w-full rounded-xl shadow"
            />
          </div>

          <p className="text-sm mb-2 text-center">
            <span className="font-semibold text-primary">
              {article.authorName || "Unknown Author"}
            </span>{" "}
            •
            <span className="ml-1">
              {article.date
                ? format(new Date(article.date), "PPP")
                : "Date Unknown"}
            </span>
          </p>

          <p className="text-lg whitespace-pre-line">{article.content}</p>

          <div className="flex justify-between mt-4">
            <div>
              <button
                className="cursor-pointer"
                onClick={() => handleLike(article._id)}
              >
                Like
              </button>
              <span className="ml-2 ">{article.likes} Likes</span>
            </div>
            <div>
              <form
                onSubmit={handleCommentSubmit}
                className="flex flex-col gap-2"
              >
                <input type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write your comment..."
                  className=" rounded p-2"
                  required
                ></input>
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded p-2"
                >
                  Submit Comment
                </button>
              </form>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleDetailsPage;
