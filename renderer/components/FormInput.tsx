import React from "react";

const FormInput = ({
  icon,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  onBlur,
}) => {
  return (
    <div className="relative">
        {icon}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        onBlur={onBlur}
        className={`w-full pl-10 pr-4 py-2 rounded-lg 
          bg-[#1E1E1E] 
          border 
          ${
            error
              ? "border-[#F14C4C] text-[#F14C4C]"
              : "border-[#333333] text-[#D4D4D4]"
          }
          focus:outline-none 
          focus:ring-2 
          focus:ring-[#0E639C]
          placeholder-[#D4D4D4]`}
      />
      {error && <p className="text-[#F14C4C] text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
