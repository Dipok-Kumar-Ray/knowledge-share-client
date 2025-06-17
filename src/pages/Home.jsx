import TopContributors from "../extraSection/TopContributors";
import FeaturedMentors from "../extraSection/FeaturedMentors ";
import Motion from "./Motion";
import SectionData from "./SectionData";

const Home = () => {

  return (
    <div>
      <Motion />
      <TopContributors/>
      <FeaturedMentors/>
    </div>
  );
};

export default Home;
