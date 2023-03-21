import { ReactNode, SelectHTMLAttributes } from "react";
import { FieldMetaState } from "react-final-form";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  meta: FieldMetaState<any>;
  label: string;
  children: ReactNode;
};

const Input = ({ meta, label, children, ...inputProps }: Props) => {
  return (
    <div className="mt-2">
      <label className="block mb-1">
        What would you like to eat?{" "}
        <select
          {...inputProps}
          name="type"
          className={`block ring-1 rounded-md px-2 py-1 w-full${
            meta.touched && meta.error ? " ring-red-500" : " ring-gray-300"
          }`}
        >
          {children}
        </select>
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
