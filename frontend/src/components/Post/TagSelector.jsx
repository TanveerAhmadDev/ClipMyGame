import { useState } from "react";
import { X } from "lucide-react";
import { CATEGORY_TAGS } from "../../constants/postOptions";

const TagSelector = ({ metadata, setMetadata }) => {
  const [input, setInput] = useState("");

  const tags = metadata.tags;

  const suggestions = CATEGORY_TAGS[metadata.sport] || [];

  const addTag = (tag) => {
    tag = tag.trim();

    if (!tag) return;

    if (tags.includes(tag)) return;

    if (tags.length >= 10) return;

    setMetadata((prev) => ({
      ...prev,
      tags: [...prev.tags, tag],
    }));

    setInput("");
  };

  const removeTag = (tag) => {
    setMetadata((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    addTag(input);
  };

  return (
    <div>
      <label className="text-sm font-medium">Tags</label>

      <div className="mt-2 border rounded-xl p-3">
        <div className="flex flex-wrap gap-2 items-center">
          {tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
              <button onClick={() => removeTag(tag)}>
                <X size={14} />
              </button>
            </div>
          ))}

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={tags.length ? "" : "Type tag and press Enter..."}
            className="flex-1 min-w-40 outline-none py-1"
          />
        </div>
      </div>

      {metadata.sport && (
        <div className="flex flex-wrap gap-2 mt-3">
          {suggestions.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => addTag(tag)}
              className="px-3 py-1 rounded-full bg-zinc-100 hover:bg-green-100"
            >
              #{tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagSelector;
