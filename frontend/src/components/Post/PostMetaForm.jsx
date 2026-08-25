import SkillSelector from "./SkillSelector";
import LocationSelector from "./LocationSelector";

import { CONTENT_TYPES, SPORTS, LEVELS } from "../../constants/postOptions";
import SearchSelect from "../SearchSelect";
import TagSelector from "./TagSelector";

const PostMetaForm = ({ metadata, setMetadata }) => {
  const updateField = (field, value) => {
    setMetadata((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-5 border-t border-zinc-200 pt-5">
      <div>
        <SearchSelect
          label="Content Type"
          value={metadata.contentType}
          options={CONTENT_TYPES}
          className={
            "dark:border-green-500 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
          }
          onChange={(contentType) =>
            setMetadata((prev) => ({
              ...prev,
              contentType,
            }))
          }
        />
      </div>

      {/* Sport */}

      <div>
        <SearchSelect
          label="Sport"
          value={metadata.sport}
          options={SPORTS}
          placeholder="Choose sport"
          className={
            "dark:border-green-500 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
          }
          onChange={(value) =>
            setMetadata((prev) => ({
              ...prev,
              sport: value,
              skills: [],
            }))
          }
        />
      </div>

      {/* Skills */}

      <SkillSelector metadata={metadata} setMetadata={setMetadata} />

      <TagSelector metadata={metadata} setMetadata={setMetadata} />

      {/* Level */}

      <SearchSelect
        label="Level"
        value={metadata.level}
        options={LEVELS}
        className={
          "dark:border-green-500 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
        }
        onChange={(level) =>
          setMetadata((prev) => ({
            ...prev,
            level,
          }))
        }
      />

      {/* Location */}

      <LocationSelector
        metadata={metadata}
        setMetadata={setMetadata}
        className={
          "dark:border-green-500 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
        }
      />
    </div>
  );
};

export default PostMetaForm;
