import { Field } from "react-final-form";
import { ReactNode } from "react";

type ConditionType = {
  when: string;
  is: string;
  children: ReactNode;
};

const Condition = ({ when, is, children }: ConditionType) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
);

export default Condition;
