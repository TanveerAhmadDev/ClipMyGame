import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  GraduationCap,
  Trophy,
  Heart,
  MapPin,
  CalendarDays,
  Link2,
  Plus,
  X,
  UserSearch,
  Phone,
  Mail,
} from "lucide-react";
import NavBar from "../components/NavBar";
import { toast } from "react-toastify";
import api from "../utils/axios";
import LocationSelector from "../components/Post/LocationSelector";
import SearchSelect from "../components/SearchSelect";
import { LEVELS, SPORTS } from "../constants/postOptions";
const opportunityTypes = [
  {
    value: "Offer",
    label: "Offer",
    description: "Education or financial support",
    icon: GraduationCap,
  },
  {
    value: "Request",
    label: "Request",
    description: "Hiring or career opportunity",
    icon: UserSearch,
  },
];
const opportunityCategory = [
  {
    value: "Job",
    label: "Job",
    description: "Hiring or career opportunity",
    icon: Briefcase,
  },
  {
    value: "Scholarship",
    label: "Scholarship",
    description: "Education or financial support",
    icon: GraduationCap,
  },
  {
    value: "Trial",
    label: "Trial",
    description: "Sports trial or selection",
    icon: Trophy,
  },
  {
    value: "Volunteering",
    label: "Volunteering",
    description: "Volunteer opportunity",
    icon: Heart,
  },
];
const CreateOpportunity = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [featureImage, setFeatureImage] = useState(null);
  const [extraImages, setExtraImages] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "Offer",
    category: "Job",
    organization: "",
    description: "",
    location: {
      countryCode: "",
      country: "",
      stateCode: "",
      state: "",
      city: "",
    },
    deadline: "",
    applicationUrl: "",
    sport: "",
    level: "",
    compensation: "",
    tags: [],
    email: "",
    whatsAppNumber: "",
  });
  const [tagInput, setTagInput] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // 5 MB = 5 * 1024 * 1024 bytes
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5 MB.");
      e.target.value = ""; // Reset input
      return;
    }

    setFeatureImage(file);
  };

  const handleExtraImages = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    // Maximum 3 images
    if (files.length > 3) {
      toast.error("You can select a maximum of 3 images.");
      e.target.value = "";
      return;
    }

    // Maximum 5 MB per image
    const invalidFile = files.find((file) => file.size > 5 * 1024 * 1024);

    if (invalidFile) {
      toast.error("Each image must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    setExtraImages(files);
  };

  const addTag = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const tag = tagInput.trim();
    if (!tag) return;
    if (formData.tags.includes(tag)) {
      setTagInput("");
      return;
    }
    setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    setTagInput("");
  };
  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Opportunity title is required.");
      return;
    }

    if (!formData.organization.trim()) {
      toast.error("Organization is required.");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Description is required.");
      return;
    }

    try {
      setLoading(true);

      const dataToSend = new FormData();

      // Add normal form fields
      dataToSend.append("title", formData.title);
      dataToSend.append("type", formData.type);
      dataToSend.append("category", formData.category);
      dataToSend.append("organization", formData.organization);
      dataToSend.append("description", formData.description);
      dataToSend.append("deadline", formData.deadline);
      dataToSend.append("applicationUrl", formData.applicationUrl);
      dataToSend.append("sport", formData.sport);
      dataToSend.append("level", formData.level);
      dataToSend.append("compensation", formData.compensation);
      dataToSend.append("whatsAppNumber", formData.whatsAppNumber);
      dataToSend.append("email", formData.email);

      // Objects/arrays need to be serialized
      dataToSend.append("location", JSON.stringify(formData.location));
      dataToSend.append("tags", JSON.stringify(formData.tags));

      // Add image
      if (featureImage) {
        dataToSend.append("featureImage", featureImage);
      }

      if (extraImages) {
        extraImages.forEach((file) => {
          dataToSend.append("MoreImages", file);
        });
      }

      const { data } = await api.post("/opportunities", dataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Opportunity created successfully.");

      const createdOpportunity = data.data;

      navigate(`/opportunities/${createdOpportunity._id}`);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to create opportunity.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gray-50 dark:bg-[#1E1E1E] transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-6">
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
          >
            <ArrowLeft size={18} /> Back
          </button>
          {/* Header */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-green-600">
              Share an opportunity
            </p>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
              Create Opportunity
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Help athletes and professionals discover their next opportunity.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            {/* Opportunity type */}
            <section className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5">
              <h2 className="font-semibold text-gray-900 dark:text-white">
                What type of opportunity is this?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-4">
                {opportunityTypes.map((item) => {
                  const Icon = item.icon;
                  const active = formData.type === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, type: item.value }))
                      }
                      className={` text-left p-4 rounded-xl border transition dark:border-green-500 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 ${active ? "border-green-500 bg-green-50 dark:bg-green-500/10" : "border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800"} `}
                    >
                      <Icon
                        size={21}
                        className={active ? "text-green-600" : "text-gray-500"}
                      />
                      <p className="font-semibold text-sm mt-3 text-gray-900 dark:text-white">
                        {item.label}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>
            <section className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5">
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Category of this opportunity?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                {opportunityCategory.map((item) => {
                  const Icon = item.icon;
                  const active = formData.category === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          category: item.value,
                        }))
                      }
                      className={` text-left p-4 rounded-xl border transition border-gray-200 dark:border-green-500 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 ${active ? "border-green-500 bg-green-50 dark:bg-green-500/10" : "border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800"} `}
                    >
                      <Icon
                        size={21}
                        className={active ? "text-green-600" : "text-gray-500"}
                      />
                      <p className="font-semibold text-sm mt-3 text-gray-900 dark:text-white">
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>
            {/* Basic information */}
            <section className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5">
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Basic information
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <Input
                  label="Opportunity title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Junior Football Coach"
                  required
                />
                <Input
                  label="Organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="e.g. Karachi Sports Academy"
                  required
                />
              </div>
              <div className="mt-2">
                <label className=" text-sm font-medium text-gray-700 dark:text-gray-300">
                  Feature Image
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFeatureImage}
                  className="mt-2 w-full h-12 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white text-center file:mr-4 file:h-full file:border-0 file:bg-green-500/50 file:px-4 file:text-white file:font-medium outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                />
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Describe the opportunity, requirements and what applicants can expect..."
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white outline-none resize-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Extra Images
                </label>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleExtraImages}
                  className="mt-2 w-full h-12 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white text-center file:mr-4 file:h-full file:border-0 file:bg-green-500/50 file:px-4 file:text-white file:font-medium outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                />
              </div>
            </section>
            {/* Details */}
            <section className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5">
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Opportunity details
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <LocationSelector
                  metadata={formData}
                  setMetadata={setFormData}
                  className={
                    "dark:border-green-500 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  }
                />
                <Input
                  label="Application deadline"
                  name="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={handleChange}
                  icon={<CalendarDays size={17} />}
                />
                <SearchSelect
                  label="Sport"
                  value={formData.sport}
                  options={SPORTS}
                  placeholder="e.g. Football"
                  className={
                    "dark:border-green-500 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  }
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      sport: value,
                    }))
                  }
                />
                <SearchSelect
                  label="Level"
                  placeholder="e.g. U18, Professiona"
                  value={formData.level}
                  options={LEVELS}
                  className={
                    "dark:border-green-500 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  }
                  onChange={(level) =>
                    setFormData((prev) => ({
                      ...prev,
                      level,
                    }))
                  }
                />
                <Input
                  label="Compensation / Award"
                  name="compensation"
                  value={formData.compensation}
                  onChange={handleChange}
                  placeholder="e.g. $1,000 / month"
                />
                <Input
                  label="Application URL"
                  name="applicationUrl"
                  value={formData.applicationUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/apply"
                  icon={<Link2 size={17} />}
                />
              </div>
            </section>
            {/* Tags */}
            <section className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5">
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Tags
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Add keywords to help people discover this opportunity.
              </p>
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={addTag}
                placeholder="Type a tag and press Enter"
                className="mt-4 w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white outline-none focus:border-green-500"
              />
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 text-sm text-gray-700 dark:text-gray-300"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </section>
            <section className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5">
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Contact information
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                These inputs are temporary.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <Input
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. useranme@gmail.com "
                  icon={<Mail size={17} />}
                />
                <Input
                  label="WhatsApp Number"
                  name="whatsAppNumber"
                  value={formData.whatsAppNumber}
                  onChange={handleChange}
                  placeholder="+xxxxxxxxxxxxx"
                  icon={<Phone size={17} />}
                />
              </div>
            </section>
            {/* Actions */}
            <div className="flex justify-end gap-3 pb-8">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-5 h-11 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 h-11 rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold transition"
              >
                <Plus size={18} />
                {loading ? "Publishing..." : "Publish opportunity"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};
const Input = ({ label, icon, ...props }) => {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative mt-2">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          {...props}
          className={` w-full h-12 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 ${icon ? "pl-11 pr-4" : "px-4"} `}
        />
      </div>
    </div>
  );
};
export default CreateOpportunity;
