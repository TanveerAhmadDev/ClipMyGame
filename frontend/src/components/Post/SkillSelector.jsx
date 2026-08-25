import { SKILLS } from "../../constants/postOptions";

const SkillSelector = ({ metadata, setMetadata }) => {
  const availableSkills = metadata.sport ? SKILLS[metadata.sport] || [] : [];

  const toggleSkill = (skill) => {
    const exists = metadata.skills.includes(skill);

    if (exists) {
      setMetadata((prev) => ({
        ...prev,
        skills: prev.skills.filter((item) => item !== skill),
      }));
    } else {
      setMetadata((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
  };

  return (
    <div>
      <label className="block mb-2 text-sm font-medium dark:text-white">
        Skills / Actions
      </label>

      {!metadata.sport ? (
        <div className="rounded-xl p-4 text-sm text-zinc-500  bg-white dark:bg-zinc-950  dark:text-white outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10">
          Select a sport first.
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {availableSkills.map((skill) => {
            const selected = metadata.skills.includes(skill);

            return (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  transition
                  border

                  ${
                    selected
                      ? "bg-green-600 border-green-600 text-white"
                      : "bg-white dark:bg-zinc-500/20 border-zinc-300/20 hover:bg-zinc-200/20 dark:text-white"
                  }
                `}
              >
                {skill.replaceAll("_", " ")}
              </button>
            );
          })}
        </div>
      )}

      {metadata.skills.length > 0 && (
        <p className="mt-3 text-xs text-zinc-500">
          {metadata.skills.length} skill
          {metadata.skills.length > 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
};

export default SkillSelector;
