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
    <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-5 py-3 border-b">
        <div>
          <p className="font-semibold">Sponsored</p>

          <p className="text-xs text-zinc-500">Advertisement</p>
        </div>
      </div>

      <img src={banner.image} className="w-full h-72 object-cover" />

      <div className="p-5">
        <h2 className="font-bold text-lg">{banner.title}</h2>

        <p className="text-zinc-500 mt-2">{banner.description}</p>

        <button
          onClick={handleClick}
          className="mt-5 flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white"
        >
          Learn More
          <ExternalLink size={18} />
        </button>
      </div>
    </div>
  );
};

export default BannerCard;
