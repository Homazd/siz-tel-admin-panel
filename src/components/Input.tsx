// import { Input as MantineInput } from "@mantine/core";
// import { useForm } from "@mantine/form";

// import classNames from "classnames";

// type InputVariant = "default" | "danger";

// interface InputProps {
//   className?: string;
//   label: string;
//   withAsterisk?: boolean;
//   variant?: InputVariant;
//   [key: string]: any;
// }

// const Input = ({
//   className,
//   label,
//   withAsterisk = false,
//   variant = "default",
//   ...rest
// }: InputProps) => {
//   const form = useForm({
//     initialValues: { name: "" },
//     validate: {
//       name: (value) => (value.length === 0 ? "This field is required" : null),
//     },
//   });
//   const inputClassNames = classNames(className, {
//     "border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200":
//       variant === "default",
//     "border-red-300 focus:border-red-500 focus:ring focus:ring-red-200":
//       variant === "danger",
//   });

//   return (
//     <div className="mb-4 mt-5">
//       <form onSubmit={form.onSubmit(console.log)}>
//         {label && (
//           <label className="block text-gray-700 font-bold" htmlFor={rest.id}>
//             {label}
//             {withAsterisk && <span className="text-red-500">*</span>}
//           </label>
//         )}
//         <MantineInput
//           className={inputClassNames}
//           {...rest}
//           {...form.getInputProps("name")}
//         />
//         {/* {withAsterisk && (
//           <div className="text-red-500 mt-1">{errorMessage}</div>
//         )}s */}
//       </form>
//     </div>
//   );
// };

// export default Input;
import { TextInput, TextInputProps } from "@mantine/core";
import { useForm } from "@mantine/form";

interface InputProps extends TextInputProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  validate?: (value: string) => string | null;
}

const ReusableInput = ({
  name,
  label,
  placeholder,
  required = false,
  validate,
  ...props
}: InputProps) => {
  const form = useForm({
    initialValues: { [name]: "" },

    validate: validate ? { [name]: validate } : {},
  });

  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      required={required}
      {...form.getInputProps(name)}
      {...props}
    />
  );
};
export default ReusableInput;
