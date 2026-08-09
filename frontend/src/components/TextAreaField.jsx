import React from "react";

const TextAreaField = ({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  maxLength = 250,
  minHeight = 120,
  maxHeight = 200,
}) => {
  const handleChange = (e) => {
    onChange(e);

    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, maxHeight)}px`;
  };

  return (
    <div className="mt-6 flex-1">
      <label className="font-semibold">{label}</label>

      <div className="relative mt-2">
        {Icon && (
          <Icon size={18} className="absolute left-4 top-5 text-gray-400" />
        )}

        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          maxLength={maxLength}
          style={{ minHeight: `${minHeight}px` }}
          className="w-full rounded-xl border pl-11 pr-4 pt-4  outline-none resize-none overflow-y-auto focus:border-green-600 dark:bg-zinc-950 dark:text-white"
        />
      </div>

      <p className="text-right text-sm text-gray-500 mt-1">
        {value.length}/{maxLength}
      </p>
    </div>
  );
};

export default TextAreaField;
