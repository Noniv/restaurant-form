type ValueType = string | number | readonly string[] | undefined;

export const composeValidators =
  (...validators: ((value: ValueType) => string | undefined)[]) =>
  (value: ValueType) =>
    validators.reduce<string | undefined>(
      (error, validator) => error || validator(value),
      undefined
    );

export const required = (value: ValueType) =>
  value ? undefined || "" : "Please fill in this field.";

export const isPositiveInteger = (value: ValueType) => {
  if (value === undefined || "") return;
  if (!(Number.isInteger(Number(value)) && Number(value) > 0))
    return "Please enter a valid amount.";
};

export const isPositiveNumber = (value: ValueType) => {
  if (value === undefined || "") return;
  if (!(Number(value) && Number(value) > 0))
    return "Please enter a valid amount.";
};

export const isValidTime = (value: ValueType) => {
  if (value === undefined || "") return;
  if (!/^((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$)/.test(value.toString()))
    return "Please enter a valid time.";
};
