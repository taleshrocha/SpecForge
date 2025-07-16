import React from 'react'

interface SelectOption {
  value: string | number
  label: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: SelectOption[]
  placeholder?: string
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  options,
  placeholder,
  className = '',
  required,
  ...props
}) => {
  const baseClasses = `
    w-full px-4 py-3 border-2 rounded-lg 
    bg-white text-gray-900
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
    transition-colors duration-200
    cursor-pointer
  `
  
  const borderClasses = error 
    ? 'border-error' 
    : 'border-gray-300 hover:border-gray-400'

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <select
        className={`${baseClasses} ${borderClasses} ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  )
}
