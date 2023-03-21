import { InputHTMLAttributes } from "react";
import { FieldMetaState } from "react-final-form";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  meta: FieldMetaState<any>;
  label: string;
  className?: string;
};

const Input = ({ meta, label, className, ...inputProps }: InputProps) => {
  return (
    <div className="mt-3">
      <label className="block mb-1">
        {label}{" "}
        <input
          {...inputProps}
          className={
            `block ring-1 rounded-md px-2 py-1 w-full${
              meta.touched && meta.error ? " ring-red-500 " : " ring-gray-300 "
            }` + className
          }
        />
      </label>
      {meta.touched && (meta.error || meta.submitError) && (
        <span className="block mt-1 text-red-500">
          {meta.error || meta.submitError}
        </span>
      )}
    </div>
  );
};

export default Input;
