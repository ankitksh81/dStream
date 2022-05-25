import React from 'react';

import { useField, Field } from 'formik';

interface DatePickerFieldProps {
  name: string;
}

export const DatePickerField = ({ ...props }: DatePickerFieldProps) => {
  const [field] = useField(props);

  return (
    <Field
      type="datetime-local"
      {...field}
      {...props}
      className="px-4 py-2 border border-gray-900 rounded-sm"
    />
  );
};
