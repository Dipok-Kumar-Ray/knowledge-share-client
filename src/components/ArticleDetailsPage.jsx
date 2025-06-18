import axios from "axios";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { SlLike } from "react-icons/sl";
import { toast } from "react-toastify";

const ArticleDetailsPage = () => {
  //likes
  const [loading, setLoading] = useState(true);
  const [cardData, setCardData] = useState([]);
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios(`https://eduhive-server-side.vercel.app/articles/${id}`).then((res) => {
      setCardData(res.data);
      setLoading(false);
    });
  }, [id, cardData]);

  console.log(cardData);
  const handleLike = (id) => {
    // console.log(id);
    axios
      .patch(`https://eduhive-server-side.vercel.app/userLike/${id}`, {
        userEmail: user?.email,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  if (loading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  //comments

  const handleCommentSubmit = (e, id) => {
    e.preventDefault();
    const form = e.target;
    const text = form?.comment?.value;
    const comment = { comment: text };
    console.log(comment);
    axios.patch(`https://eduhive-server-side.vercel.app/comments/${id}`, comment).then((res) => {
      if (res.data.modifiedCount) {
        setCardData(null);
        toast.success("Comment Added Successful !");
        setLoading(true);
      }
    });

    // console.log(comment);
  };

  return (
    <div>
      <div
        key={cardData._id}
        className="max-w-2xl mx-auto rounded-2xl shadow-lg p-6"
      >
        <div className="h-82 flex justify-center mb-4">
          <img
            src={cardData.photoUrl}
            alt={cardData.title}
            className="w-full rounded-xl shadow"
          />
        </div>
        <span>
          <h1 className="text-3xl font-bold text-center mb-4">
            {cardData.title}
          </h1>
        </span>

        <p className="flex justify-around text-sm mb-2 text-center">
          <span className="text-xl font-semibold"> Author Name :</span>
          <span className="font-semibold text-xl text-blue-300">
            {cardData.authorName || "Unknown Author"}
          </span>{" "}
          <span className="text-error text-4xl mx-2">*</span>
          <span className="text-xl font-semibold"> Published Date : </span>
          <span className="ml-1 text-blue-500 text-xl">
            {cardData.date
              ? format(new Date(cardData.date), "PPP")
              : "Date Unknown"}
          </span>
        </p>

        <p className="text-lg whitespace-pre-line">{cardData.content}</p>
        <p className="text-lg font-bold">{cardData.tags}</p>

        <div className="flex justify-between mt-4">
          <div className="flex justify-between">
            <button
              className="cursor-pointer "
              onClick={() => handleLike(cardData._id)}
            >
              <span className="ml-2 ">
                {cardData.likes} <SlLike size={30} />
              </span>
            </button>
          </div>

          <div>
            <h4 className="text-lg">Comment</h4>
            {cardData?.comments?.map((comment, index) => {
              return (
                <p className="mb-2" key={index}>
                  {comment.text}
                </p>
              );
            })}
          </div>

          <div>
            <form
              onSubmit={(e) => handleCommentSubmit(e, cardData._id)}
              className="flex flex-col gap-2"
            >
              <input
                type="  text "
                name="comment"
                placeholder="Write your comment..."
                className=" rounded p-2"
                required
              ></input>
              <button
                type=" submit"
                className="bg-blue-500 text-white rounded p-2"
              >
                Submit Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailsPage;
