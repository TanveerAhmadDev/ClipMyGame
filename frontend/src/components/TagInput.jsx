import { useState } from "react";
import { X } from "lucide-react";

const TagInput = ({ label, value = [], onChange, placeholder }) => {
  const [input, setInput] = useState("");

  const addLanguage = () => {
    const language = input.trim();

    if (!language) return;

    // Prevent duplicates
    if (!value.includes(language)) {
      onChange([...value, language]);
    }

    setInput("");
  };

  const removeLanguage = (language) => {
    onChange(value.filter((item) => item !== language));
  };

  return (
    <div className="mt-6">
      <label className="font-semibold">{label}</label>

      <div className="mt-2 min-h-12 rounded-xl border border-gray-300 dark:border-zinc-700 p-3 focus-within:border-green-600">
        <div className="flex flex-wrap gap-2">
          {value.map((language) => (
            <span
              key={language}
              className="flex items-center gap-1 rounded-lg bg-green-100 text-green-700 px-3 py-1 text-sm"
            >
              {language}

              <button type="button" onClick={() => removeLanguage(language)}>
                <X size={14} />
              </button>
            </span>
          ))}

          <input
            type="text"
            value={input}
            placeholder={value.length === 0 ? placeholder : ""}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                addLanguage();
              }
            }}
            className="flex-1 min-w-40 bg-transparent outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default TagInput;
