import { Trash2 } from "lucide-react";

const BannerTable = ({ banners, deleteBanner }) => {
  return (
    <table className="w-full bg-white rounded-xl overflow-hidden shadow">
      <thead className="bg-zinc-100">
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Sport</th>
          <th>Priority</th>
          <th>Clicks</th>
          <th>Views</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {banners.map((banner) => (
          <tr key={banner._id} className="border-b">
            <td>
              <img src={banner.image} className="w-36 h-20 object-cover" />
            </td>

            <td>{banner.title}</td>

            <td>{banner.sport}</td>

            <td>{banner.priority}</td>

            <td>{banner.analytics.clicks}</td>

            <td>{banner.analytics.impressions}</td>

            <td>
              <button onClick={() => deleteBanner(banner._id)}>
                <Trash2 color="red" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BannerTable;
