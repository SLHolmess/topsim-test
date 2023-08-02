import React from "react";

const SelectField = (props: any) => {
  const { className, options, title, onChange, defaultValue } = props;
  return (
    <div className={className}>
      {title && <div className="font-semibold">{title}</div>}
      <select
        id="underline_select"
        className="font-semibold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
        onChange={(event) => onChange(event.target.value)}
        value={defaultValue}
      >
        {options &&
          options.map((option: any, idx: number) => (
            <option key={idx} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectField;
