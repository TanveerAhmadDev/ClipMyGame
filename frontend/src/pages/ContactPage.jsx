import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Megaphone,
  CalendarDays,
  DollarSign,
  User,
  Building2,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../utils/axios";
const AontactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    campaignType: "",
    budget: "",
    duration: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/advertisement/inquiry", formData);

      toast.success("Your inquiry has been submitted successfully.");

      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        campaignType: "",
        budget: "",
        duration: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to submit inquiry.");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* ================= HERO ================= */}
      <section className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 py-16 md:py-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400 text-sm font-medium mb-5">
              <Megaphone size={17} /> Advertise on ClipMyGame
            </div>
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight transition-colors">
              Put your brand in front of the
              <span className="text-green-600 dark:text-green-500">
                sports community.
              </span>
            </h1>
            {/* Description */}
            <p className="mt-5 text-gray-600 dark:text-zinc-400 text-lg leading-relaxed max-w-2xl">
              Looking to promote your brand, product, event, academy, team, or
              sports business? Get in touch with our advertising team and let's
              discuss a campaign that fits your goals.
            </p>
          </div>
        </div>
      </section>
      {/* ================= MAIN ================= */}
      <section className="max-w-7xl mx-auto px-5 py-10 md:py-14">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* ================= LEFT ================= */}
          <div className="lg:col-span-1 space-y-5">
            {/* Introduction */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 shadow-sm dark:shadow-none transition-colors duration-300">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Let's work together
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-zinc-400">
                Tell us about your advertising campaign. Whether you're
                promoting a sports product, tournament, academy, event, or
                business, our team will get back to you.
              </p>
            </div>
            {/* Contact information */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 space-y-5 shadow-sm dark:shadow-none transition-colors duration-300">
              <ContactInfo
                icon={<Mail size={19} />}
                title="Email"
                value="advertising@clipmygame.com"
              />
              <ContactInfo
                icon={<Phone size={19} />}
                title="Phone"
                value="+92 XXX XXXXXXX"
              />
              <ContactInfo
                icon={<MapPin size={19} />}
                title="Location"
                value="Pakistan"
              />
            </div>
            {/* Campaign types */}
            <div className="bg-green-600 dark:bg-green-700 rounded-2xl p-6 text-white">
              <h3 className="font-semibold text-lg">What can you advertise?</h3>
              <div className="mt-4 space-y-3 text-sm text-green-50">
                <p>✓ Sports products & brands</p>
                <p>✓ Tournaments & sporting events</p>
                <p>✓ Sports academies & training</p>
                <p>✓ Teams & organizations</p>
                <p>✓ Fitness & sports services</p>
                <p>✓ Other relevant businesses</p>
              </div>
            </div>
          </div>
          {/* ================= FORM ================= */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 md:p-8 shadow-sm dark:shadow-none transition-colors duration-300">
              {/* Form heading */}
              <div className="mb-7">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Advertising Inquiry
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
                  Fill out the form below and our team will contact you.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Company */}
                <div className="grid md:grid-cols-2 gap-5">
                  <Input
                    icon={<User size={18} />}
                    label="Your Name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    icon={<Building2 size={18} />}
                    label="Company / Brand"
                    name="company"
                    placeholder="Company or brand name"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                {/* Email + Phone */}
                <div className="grid md:grid-cols-2 gap-5">
                  <Input
                    icon={<Mail size={18} />}
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    icon={<Phone size={18} />}
                    label="Phone Number"
                    name="phone"
                    placeholder="+92 XXX XXXXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                {/* Campaign + Budget */}
                <div className="grid md:grid-cols-2 gap-5">
                  <Select
                    icon={<Megaphone size={18} />}
                    label="Campaign Type"
                    name="campaignType"
                    value={formData.campaignType}
                    onChange={handleChange}
                    options={[
                      "Brand Promotion",
                      "Product Advertisement",
                      "Event / Tournament",
                      "Sports Academy",
                      "Team / Organization",
                      "Other",
                    ]}
                  />
                  <Select
                    icon={<DollarSign size={18} />}
                    label="Estimated Budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    options={[
                      "Under $100",
                      "$100 - $500",
                      "$500 - $1,000",
                      "$1,000 - $5,000",
                      "$5,000+",
                      "Not decided yet",
                    ]}
                  />
                </div>
                {/* Duration */}
                <Select
                  icon={<CalendarDays size={18} />}
                  label="Campaign Duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  options={[
                    "Less than 1 week",
                    "1 - 4 weeks",
                    "1 - 3 months",
                    "3 - 6 months",
                    "6+ months",
                    "Not decided yet",
                  ]}
                />
                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                    Tell us about your campaign
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    placeholder="Tell us about your brand, campaign goals, target audience, and what you would like to advertise..."
                    className=" w-full rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900/30 resize-none transition-colors "
                  />
                </div>
                {/* Submit */}
                <button
                  type="submit"
                  className=" w-full md:w-auto inline-flex items-center justify-center gap-2 px-7 h-12 rounded-xl bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-500 text-white font-semibold transition-colors "
                >
                  Send Inquiry <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
/* ===================================================== INPUT COMPONENT ===================================================== */ const Input =
  ({
    icon,
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    required = false,
  }) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
          {label}
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500">
            {icon}
          </div>
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className=" w-full h-12 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900/30 transition-colors "
          />
        </div>
      </div>
    );
  };
/* ===================================================== SELECT COMPONENT ===================================================== */ const Select =
  ({ icon, label, name, value, onChange, options }) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
          {label}
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 pointer-events-none">
            {icon}
          </div>
          <select
            name={name}
            value={value}
            onChange={onChange}
            className=" w-full h-12 appearance-none rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 pl-10 pr-4 text-sm text-gray-900 dark:text-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900/30 transition-colors "
          >
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };
/* ===================================================== CONTACT INFO ===================================================== */ const ContactInfo =
  ({ icon, title, value }) => {
    return (
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-zinc-500">{title}</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
      </div>
    );
  };
export default AontactPage;
