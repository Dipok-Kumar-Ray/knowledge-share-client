import axios from "axios";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { SlLike } from "react-icons/sl";

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
          <div className="h-62 flex justify-center mb-4">
            <img
              src={
                article.photoUrl 
                // "https://via.placeholder.com/800x400?text=No+Image"
              }
              alt={article.title}
              className="w-full rounded-xl shadow"
            />
          </div>
         <span>
       
           <h1 className="text-3xl font-bold text-center mb-4">
            {article.title}
          </h1>
         </span>

              
          <p className="flex justify-around text-sm mb-2 text-center"><span className="text-xl font-semibold"> Author Name :</span>  
            <span className="font-semibold text-xl text-blue-300">
              {article.authorName || "Unknown Author"}
            </span>{" "}
            <span className="text-error text-4xl mx-2">*</span>
            <span className="text-xl font-semibold"> Published Date : </span>
            <span className="ml-1 text-blue-500 text-xl">
              
              {article.date
                ? format(new Date(article.date), "PPP")
                : "Date Unknown"}
            </span>
          </p>

          <p className="text-lg whitespace-pre-line">{article.content}</p>

          <div className="flex justify-between mt-4">
            <div className="flex justify-between">
              <button
                className="cursor-pointer "
                onClick={() => handleLike(article._id)}
              >
             
              </button>
              <span className="ml-2 ">{article.likes} <SlLike  size={30}/></span>
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
