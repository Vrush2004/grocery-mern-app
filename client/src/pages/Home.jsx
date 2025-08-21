import Banner from "../components/Banner";
import BestSeller from "../components/BestSeller";
import BottomBanner from "../components/BottomBanner";
import Category from "../components/Category";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  return (
    <div className="mt-10">
      <Banner />
      <Category />
      <BestSeller />
      <BottomBanner/>
      <NewsLetter />
    </div>
  );
};
export default Home;
