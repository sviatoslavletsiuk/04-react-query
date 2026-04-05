import { ThreeDots } from "react-loader-spinner";
import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.loaderWrapper}>
      <ThreeDots color="#084298" height={80} width={80} />
      <p className={s.loaderText}>Loading movies, please wait...</p>
    </div>
  );
};

export default Loader;
