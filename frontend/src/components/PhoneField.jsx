import PhoneInput from "react-phone-number-input/input";
import "react-phone-number-input/style.css";

const PhoneField = ({ label, value, onChange, icon: Icon }) => {
  return (
    <div className="mt-6">
      <label className="font-semibold">{label}</label>

      <div className="relative mt-2 h-12 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10"
          />
        )}

        <PhoneInput
          // international
          value={value}
          onChange={onChange}
          className="h-full w-full pl-11 pr-4 flex items-center"
        />
      </div>
    </div>
  );
};

export default PhoneField;
