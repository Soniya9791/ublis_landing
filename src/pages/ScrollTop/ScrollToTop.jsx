import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const offset = 70;
    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
