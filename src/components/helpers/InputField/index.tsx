import React from "react";

type Props = {
  value?: string | number;
  onChange?: any;
  placeholder?: string;
  required?: boolean;
  type?: string;
  title?: any;
  name?: string;
  errorMessage?: string;
};

const InputField = (props: Props) => {
  const {
    value,
    onChange,
    placeholder,
    type,
    required,
    title,
    name,
    errorMessage,
  } = props;

  const handleChange = (e: any) => {
    onChange(e.target.value);
  };
  return (
    <div>
      {title && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {title}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          required={required ? true : false}
        ></textarea>
      ) : (
        <input
          type={type}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          required={required ? true : false}
          style={errorMessage ? {borderColor: "#ff4d00"} : {}}
        />
      )}
      {errorMessage && <small className="text-[#ff4d00] italic">{errorMessage}</small>}
    </div>
  );
};

export default InputField;
