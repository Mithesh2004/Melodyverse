import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useActiveRoute = (paths) => {
  const location = useLocation();
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    if (paths.includes(location.pathname)) {
      setActivePath(location.pathname);
    } else {
      setActivePath("");
    }
  }, [location.pathname, paths]);

  const isActive = (path) => activePath === path;

  return { isActive };
};

export default useActiveRoute;
