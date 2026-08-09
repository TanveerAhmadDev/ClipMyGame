import { useEffect, useRef } from "react";
import api from "../utils/axios";

const useBannerImpression = (bannerId) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!bannerId || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        api.patch(`/banner/${bannerId}/impression`);

        observer.disconnect();
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [bannerId]);

  return ref;
};

export default useBannerImpression;
