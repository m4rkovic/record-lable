// Naziv komponente: InputField
import React from 'react';

interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  type?: string;
  options?: string[];
  placeholder?: string;
  helper?: string;
  rows?: number;
}

export const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, type = 'text', options, placeholder, helper, rows = 4 }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-mono text-gray-700 mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={value as string}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-2 border border-black bg-white text-gray-800 font-mono resize-none focus:border-lime-600"
          rows={rows}
        />
      ) : type === 'select' && options ? (
        <select
          value={value as string | number}
          onChange={onChange}
          className="w-full p-2 border border-black bg-white text-gray-800 font-mono appearance-none focus:border-lime-600"
        >
          {options.map(opt => (
            <option key={opt} value={opt}>{opt.toUpperCase()}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-2 border border-black bg-white text-gray-800 font-mono focus:border-lime-600"
        />
      )}
      {helper && <p className="text-xs font-serif text-gray-500 mt-1">{helper}</p>}
    </div>
  );
};