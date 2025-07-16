import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  required,
  ...props
}) => {
  const baseClasses = `
    w-full px-4 py-3 border-2 rounded-lg 
    bg-white text-gray-900
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
    transition-colors duration-200
    placeholder:text-gray-500
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
      <input
        className={`${baseClasses} ${borderClasses} ${className}`}
        {...props}
      />
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  )
}
