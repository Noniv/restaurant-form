import { Field, Form } from "react-final-form";
import { useState } from "react";
import formatString from "format-string-by-pattern";
import Input from "./components/Input";
import Select from "./components/Select";
import Condition from "./components/Condition";
import {
  composeValidators,
  required,
  isPositiveInteger,
  isValidTime,
  isPositiveNumber,
} from "./utilities/validators";
import { FormApi } from "final-form";

function App() {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const onSubmit = async (
    values: Record<string, any>,
    form: FormApi<Record<string, any>, Partial<Record<string, any>>>
  ) => {
    if (pending) return;
    setPending(true);
    setSuccess(false);
    const res = await fetch(
      "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const data = await res.json();
    setPending(false);
    if (!res.ok) return data;
    setSuccess(true);
    form.restart();
  };

  return (
    <>
      <header className="bg-sky-600 py-2 px-4">
        <h1 className="text-white font-bold text-2xl">HexOcean Restaurant</h1>
      </header>

      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="p-4 max-w-2xl mx-auto">
            <h2 className="font-bold text-lg">Place your order</h2>
            <Field name="name" validate={required}>
              {({ input, meta }) => (
                <Input
                  {...input}
                  type="text"
                  placeholder="Name"
                  label="What is your name?"
                  meta={meta}
                />
              )}
            </Field>
            <Field
              name="preparation_time"
              parse={formatString("00:00:00")}
              validate={composeValidators(required, isValidTime)}
            >
              {({ input, meta }) => (
                <Input
                  {...input}
                  type="text"
                  placeholder="00:00:00"
                  label="Enter preparation time"
                  meta={meta}
                />
              )}
            </Field>
            <Field name="type" validate={required}>
              {({ input, meta }) => (
                <Select
                  {...input}
                  placeholder="Preparation time"
                  label="What would you like to order?"
                  meta={meta}
                >
                  <option value="">Please choose an option</option>
                  <option value="pizza">Pizza</option>
                  <option value="soup">Soup</option>
                  <option value="sandwich">Sandwich</option>
                </Select>
              )}
            </Field>
            <Condition when="type" is="pizza">
              <Field
                name="no_of_slices"
                validate={composeValidators(required, isPositiveInteger)}
              >
                {({ input, meta }) => (
                  <Input
                    {...input}
                    type="number"
                    placeholder="Number of slices"
                    label="How many slices?"
                    meta={meta}
                    step="1"
                  />
                )}
              </Field>
              <Field
                name="diameter"
                validate={composeValidators(required, isPositiveNumber)}
              >
                {({ input, meta }) => (
                  <Input
                    {...input}
                    type="number"
                    placeholder="Diameter"
                    label="Diameter"
                    meta={meta}
                  />
                )}
              </Field>
            </Condition>
            <Condition when="type" is="soup">
              <Field
                name="spiciness_scale"
                validate={required}
                initialValue="5"
              >
                {({ input, meta }) => (
                  <Input
                    {...input}
                    type="range"
                    placeholder="Spiciness scale"
                    label="Spiciness scale"
                    meta={meta}
                    min="1"
                    max="10"
                    className="!ring-0 !px-0"
                  />
                )}
              </Field>
              <div className="flex justify-between">
                <div>min</div>
                <div>max</div>
              </div>
            </Condition>
            <Condition when="type" is="sandwich">
              <Field
                name="slices_of_bread"
                validate={composeValidators(required, isPositiveInteger)}
              >
                {({ input, meta }) => (
                  <Input
                    {...input}
                    type="number"
                    placeholder="Slices of bread"
                    label="Slices of bread"
                    meta={meta}
                  />
                )}
              </Field>
            </Condition>

            <button
              type="submit"
              className={`text-white py-2 px-4 rounded-full mt-6 w-full${
                pending
                  ? " bg-sky-700 hover:cursor-default"
                  : " bg-sky-600 hover:bg-sky-700"
              }`}
            >
              {pending ? "Sending..." : "Submit"}
            </button>
          </form>
        )}
      />
      {success && (
        <div className="mx-auto w-fit text-green-600">
          Form sent successfully!
        </div>
      )}
    </>
  );
}

export default App;
