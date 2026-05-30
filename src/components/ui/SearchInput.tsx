import React, { useRef } from 'react';
import { Search, X } from 'lucide-react';
import styles from './SearchInput.module.css';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onClear: () => void;
}

export default function SearchInput({ value, onClear, className = '', ...props }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onClear();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={`glass ${styles.container} ${className}`}>
      <Search size={18} className={styles.searchIcon} aria-hidden="true" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        className={styles.input}
        {...props}
      />
      {value && (
        <button
          onClick={handleClear}
          className={styles.clearButton}
          aria-label="مسح نص البحث"
          type="button"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
