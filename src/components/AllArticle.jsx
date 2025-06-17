import { Link, useLoaderData, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const AllArticle = () => {
  const articles = useLoaderData();
  // console.log(articles);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleReadMore = (id) => {
    if (user && user.email) {
      navigate(`/articleDetails/${id}`);
    } else {
      navigate(`'login?redirect=/articleDetails`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">All Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article._id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300 rounded-lg"
          >
            <figure className="h-56 overflow-hidden rounded-t-lg">
              <img
                src={
                  article.photoUrl ||
                  "https://via.placeholder.com/400x200?text=No+Image"
                }
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-xl font-bold text-blue-300 ">
                {article.title}
              </h2>
              <div className="flex justify-between  text-gray-600">
                <span className=" lg:text-sm font-semibold"> Author Name </span>
                :{" "}
                <span className=" text-blue-600">
                  {article.authorName || "Unknown Author"}
                </span>
                <span className="text-error text-xl">*</span>
                <span className="">Published date</span> :{" "}
                <span className="lg:text-sm text-blue-600">
                  {" "}
                  {new Date(article.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-700 line-clamp-3">
                {article.content.slice(0, 100)}...
              </p>
              <div className="card-actions justify-end pt-2">
                <button
                  onClick={() => handleReadMore(article._id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-primary"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArticle;
