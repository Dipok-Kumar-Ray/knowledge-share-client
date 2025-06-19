import TopContributors from "../extraSection/TopContributors";
import FeaturedMentors from "../extraSection/FeaturedMentors ";
import Motion from "./Motion";
import SectionData from "./SectionData";
import FeaturedArticles from "./FeaturedArticles";
import CategoryArticles from "./CategoryArticles";

const Home = () => {

  return (
    <div>
      <Motion />
      <FeaturedArticles/>
      <CategoryArticles/>
      <TopContributors/>
      <FeaturedMentors/>
    </div>
  );
};

export default Home;
