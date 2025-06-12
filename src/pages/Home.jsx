import Motion from "./Motion";
import HeroSlider from "./HeroSlider";
import { useLoaderData } from "react-router";
import { format } from "date-fns";

const Home = () => {
  const article = useLoaderData();
  console.log(article);
  return (
    <div>
      <Motion />
      {/* <HeroSlider/> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {article.map((article) => (
          <div
            key={article.id}
            className="card w-full bg-base-100 shadow-xl image-full transform transition duration-300 hover:scale-105"
          >
            <figure>
              <img src={article.image} alt={article.title} />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-white">{article.title}</h2>
              <p className="text-gray-200 text-sm mb-4">
                By{" "}
                <span className="font-semibold text-primary">
                  {article.author}
                </span>{" "}
                | Published:{" "}
                <span className="text-gray-300">
                  {article.date ? format(new Date(article.date), "PPP") : "N/A"}
                </span>
              </p>

              <div className="card-actions justify-end">
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
