// import TopContributors from "../extraSection/TopContributors";
import FeaturedMentors from "../extraSection/FeaturedMentors ";
import Motion from "./Motion";
import FeaturedArticles from "./FeaturedArticles";
import CategoryArticles from "./CategoryArticles";

const Home = () => {

  return (
    <div>
      <Motion />
      {/* <TopContributors/> */}
      <FeaturedMentors/>
      <FeaturedArticles/>
      <CategoryArticles />
    </div>
  );
};

export default Home;