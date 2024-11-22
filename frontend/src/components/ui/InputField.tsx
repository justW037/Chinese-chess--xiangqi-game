import React from 'react'

interface InputFieldProps {
  id: string
  label: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  placeholder?: string
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  required = false,
  placeholder = '' 
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-gray-700 font-medium mb-2 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-black dark:bg-zinc-700 dark:text-white dark:border-zinc-500 dark:focus:border-zinc-200"
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
    </div>
  )
}

export default InputField
