const InputField = ({
  label,
  type = "text",
  icon: Icon,
  options = [],
  ...props
}) => {
  return (
    <div className="">
      <label className="font-semibold dark:text-white">{label}</label>

      <div className="relative mt-2">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}

        {type === "select" ? (
          <select
            {...props}
            className="w-full h-12 rounded-xl border pl-11 pr-4 outline-none  focus:border-green-600 dark:bg-zinc-800/50  focus:dark:bg-zinc-800 dark:text-white"
          >
            <option value="">Select {label}</option>

            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            {...props}
            className="w-full h-12 rounded-xl border pl-11 pr-4 outline-none focus:border-green-600 dark:bg-zinc-800/50 dark:border-zinc-500 dark:text-white"
          />
        )}
      </div>
    </div>
  );
};

export default InputField;
