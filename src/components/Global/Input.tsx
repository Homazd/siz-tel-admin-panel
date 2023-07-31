import { Input as MantineInput } from "@mantine/core";
import classNames from "classnames";

type InputVariant = "default" | "danger";

interface InputProps {
  className?: string;
  label: string;
  withAsterisk?: boolean;
  errorMessage?: string;
  variant?: InputVariant;
  [key: string]: any;
}

const Input = ({
  className,
  label,
  withAsterisk = false,
  errorMessage,
  variant = "default",
  ...rest
}: InputProps) => {
  const inputClassNames = classNames(className, {
    "border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200":
      variant === "default",
    "border-red-300 focus:border-red-500 focus:ring focus:ring-red-200":
      variant === "danger",
  });

  return (
    <div className="mb-4 mt-5">
      {label && (
        <label className="block text-gray-700 font-bold" htmlFor={rest.id}>
          {label}
          {withAsterisk && <span className="text-red-500">*</span>}
        </label>
      )}
      <MantineInput className={inputClassNames} {...rest} />
      {errorMessage && <div className="text-red-500 mt-1">{errorMessage}</div>}
    </div>
  );
};

export default Input;
