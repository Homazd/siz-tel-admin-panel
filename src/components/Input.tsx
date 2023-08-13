import { TextInput, TextInputProps } from "@mantine/core";
import { useState } from 'react'

interface InputProps extends TextInputProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const ReusableInput = ({
  label,
  placeholder,
  required = false,
  className = '',
}: InputProps) => {
 
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (required && event.target.value === '') {
      setError(`${label} is required`);
    } else {
      setError('');
    }
  };

  return (

    <TextInput
      label={label}
      placeholder={placeholder}
      required={required}
      onChange={handleChange}
      value={value}
      error={error}
      className={className}
    />
  );
};
export default ReusableInput;
