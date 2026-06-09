export const validationRules = {

  required: (field: string) => ({
    required: `${field} is required`,
  }),

  phone: {
    required: "Phone Number is required",
    pattern: {
      value: /^[0-9]{10}$/,
      message: "Enter valid 10 digit phone number",
    },
  },

  email: {
    pattern: {
      value:
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  },

  aadhaar: {
    pattern: {
      value: /^[0-9]{12}$/,
      message: "Aadhaar must be 12 digits",
    },
  },

  pan: {
    pattern: {
      value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      message: "Invalid PAN number",
    },
  },

  pincode: {
    pattern: {
      value: /^[0-9]{6}$/,
      message: "Pincode must be 6 digits",
    },
  },

};


export const validateDynamicRow = (
  values: Record<string, any>
) => {

  const errors:
    Record<string, string> = {};

  // medicine
  if (
    !values.medicine_name?.trim()
  ) {
    errors.medicine_name =
      "Medicine required";
  }

  // unit
  if (!values.unit?.trim()) {
    errors.unit =
      "Unit required";
  }

  // quantity
  if (!values.quantity) {

    errors.quantity =
      "Quantity required";

  } else if (
    Number(values.quantity) <= 0
  ) {

    errors.quantity =
      "Invalid quantity";
  }

  // rate
  if (!values.rate) {

    errors.rate =
      "Rate required";

  } else if (
    Number(values.rate) <= 0
  ) {

    errors.rate =
      "Invalid rate";
  }

  // tax optional
  if (!values.tax) {

  errors.tax =
    "Tax required";

} else if (
  Number(values.tax) < 0 ||
  Number(values.tax) > 100
) {

  errors.tax =
    "Invalid tax";
}
  return errors;
};