import BannerForm from "../components/banner/BannerForm";
import BannerTable from "../components/banner/BannerTable";

import useBanner from "../hooks/useBanner";

const BannerManagement = () => {
  const { banners, loading, deleteBanner, refresh } = useBanner();

  return (
    <div className="max-w-7xl mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Banner Management</h1>
      </div>

      <BannerForm onSuccess={refresh} />

      <BannerTable
        banners={banners}
        loading={loading}
        deleteBanner={deleteBanner}
      />
    </div>
  );
};

export default BannerManagement;
