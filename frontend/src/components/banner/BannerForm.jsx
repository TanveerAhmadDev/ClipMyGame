import { useState } from "react";
import api from "../../utils/axios";
import { toast } from "react-toastify";

const sports = [
  "all",
  "football",
  "basketball",
  "cricket",
  "swimming",
  "volleyball",
  "cycling",
  "track",
];

const BannerForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    redirectUrl: "",
    priority: 1,
    sport: "all",
    startDate: "",
    endDate: "",
  });

  const [image, setImage] = useState(null);

  const submit = async () => {
    const fd = new FormData();

    Object.entries(form).forEach(([k, v]) => fd.append(k, v));

    fd.append("image", image);

    try {
      await api.post("/banner", fd);

      toast.success("Banner Uploaded");

      onSuccess();

      setForm({
        title: "",
        description: "",
        redirectUrl: "",
        priority: 1,
        sport: "all",
        startDate: "",
        endDate: "",
      });

      setImage(null);
    } catch {
      toast.error("Upload Failed");
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow mb-10">
      <div className="grid grid-cols-2 gap-5">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border rounded-lg p-3"
        />

        <select
          value={form.sport}
          onChange={(e) => setForm({ ...form, sport: e.target.value })}
          className="border rounded-lg p-3"
        >
          {sports.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <input
          placeholder="Redirect URL"
          value={form.redirectUrl}
          onChange={(e) => setForm({ ...form, redirectUrl: e.target.value })}
          className="border rounded-lg p-3"
        />

        <input
          type="number"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
          className="border rounded-lg p-3"
        />

        <div className="flex flex-col ">
          <label htmlFor="" className="">
            Start Date
          </label>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            className="border rounded-lg p-3"
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="">End Date</label>
          <input
            type="date"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            className="border rounded-lg p-3"
          />
        </div>
      </div>

      <textarea
        rows={4}
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="border rounded-lg p-3 mt-5 w-full"
      />

      <input
        type="file"
        className="mt-5"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button
        onClick={submit}
        className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        Upload Banner
      </button>
    </div>
  );
};

export default BannerForm;
