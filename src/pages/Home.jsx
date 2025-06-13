import Motion from "./Motion";
import HeroSlider from "./HeroSlider";
import { useLoaderData } from "react-router";
import { format } from "date-fns";
import TopContributors from "../extraSection/TopContributors";
import FeaturedMentors from "../extraSection/FeaturedMentors ";

const Home = () => {
  const articles = useLoaderData();
  console.log(articles);

  return (
    <div>
      <Motion />
      {/* <HeroSlider /> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {articles.map((article) => (
          <div
            key={article._id}
            className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition duration-300 rounded-xl"
          >
            <figure className="h-56 overflow-hidden rounded-t-xl">
              <img
                src={article.photoUrl || "https://via.placeholder.com/400x200?text=No+Image"}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="card-body space-y-2">
              <h2 className="card-title text-xl font-bold text-primary-content">
                {article.title}
              </h2>

              <p className="text-sm text-gray-600">
                <span className="font-semibold text-primary">
                  {article.authorName || "Unknown Author"}
                </span>{" "}
                •{" "}
                <span className="text-gray-500">
                  {article.date ? format(new Date(article.date), "PPP") : "Date Unknown"}
                </span>
              </p>

              <p className="text-sm text-gray-700 line-clamp-3">
                {article.content.slice(0, 100)}...
              </p>

              <div className="card-actions justify-end pt-2">
                <a
                  href={article.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-primary"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <TopContributors /> */}
      <TopContributors/>
      <FeaturedMentors/>
    </div>
  );
};

export default Home;
