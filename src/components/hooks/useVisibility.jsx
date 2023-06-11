import { useState, useEffect } from "react";

const getVisible = () => {
  return !document.hidden;
};

function useVisibility() {
  const [visible, setVisible] = useState(getVisible);

  const handleChange = () => {
    setVisible(getVisible);
  };
  useEffect(() => {
    document.addEventListener("visibilitychange", handleChange);

    return () => document.removeEventListener("visibilitychange", handleChange);
  }, []);

  return visible;
}

export default useVisibility;
