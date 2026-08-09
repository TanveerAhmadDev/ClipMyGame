import { useEffect, useState } from "react";
import api from "../utils/axios";
import { toast } from "react-toastify";

const useBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBanners = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/banner");

      setBanners(data.data);
    } catch (err) {
      toast.error("Failed to load banners");
    } finally {
      setLoading(false);
    }
  };

  const deleteBanner = async (id) => {
    try {
      await api.delete(`/banner/${id}`);

      toast.success("Banner deleted");

      getBanners();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  return {
    banners,
    loading,
    deleteBanner,
    refresh: getBanners,
  };
};

export default useBanner;
