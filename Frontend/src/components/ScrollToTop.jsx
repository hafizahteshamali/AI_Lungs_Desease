import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  // Har location change (route change) ko track karega
  const { pathname } = useLocation();

  useEffect(() => {
    // Jaise hi route change ho, scroll ko top kar do
    window.scrollTo(0, 0);
  }, [pathname]); // Jab bhi pathname change ho, yeh useEffect chalega

  return null; // Yeh component kuch render nahi karta
}

export default ScrollToTop;