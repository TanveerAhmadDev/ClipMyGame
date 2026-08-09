import { useEffect, useState } from "react";
import api from "../utils/axios";

const useBannerFeed = (sport) => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const getBanner = async () => {
      try {
        const { data } = await api.get("/banner/feed", {
          params: { sport },
        });

        setBanners(data.data || []);
      } catch (err) {
        console.log(err);
        setBanners([]);
      }
    };

    getBanner();
  }, [sport]);

  return banners;
};

export default useBannerFeed;
