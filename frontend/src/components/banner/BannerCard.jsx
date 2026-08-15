import { ExternalLink } from "lucide-react";
import api from "../../utils/axios";
import useBannerImpression from "../../hooks/useBannerImpression";

const BannerCard = ({ banner }) => {
  if (!banner) return null;

  const ref = useBannerImpression(banner?._id);

  const handleClick = async () => {
    try {
      await api.patch(`/banner/${banner._id}/click`);
    } catch {}

    window.open(banner.redirectUrl, "_blank");
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-700 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-5 py-3 border-b">
        <div>
          <p className="font-semibold text-xl dark:text-white mb-2">
            Sponsored
          </p>

          <p className="text-xs text-zinc-500">Advertisement</p>
        </div>
      </div>

      <img src={banner.image} className="w-full h-auto object-cover" />

      <div className="px-5 py-3 flex flex-col">
        <h2 className="font-bold text-lg dark:text-white">{banner.title}</h2>

        <p className="text-zinc-500 mt-2">{banner.description}</p>

        <button
          onClick={handleClick}
          className="mt-2 flex  items-center gap-2 px-5 py-3  w-fit rounded-xl bg-green-600 hover:bg-green-700 text-white"
        >
          Learn More
          <ExternalLink size={18} />
        </button>
      </div>
    </div>
  );
};

export default BannerCard;
