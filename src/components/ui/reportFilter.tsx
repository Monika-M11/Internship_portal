"use client";

import {
  FormProvider,
  useForm,
} from "react-hook-form";

import { useState } from "react";

import { Button }
from "@/components/ui/button";

import { FormField } from "@/app/utils/formField";


import { theme }
from "@/theme";

type FormValues = {
  from: string;
  to: string;
};

type Props = {
  title: string;
};

export default function ReportFilter({
  title,
}: Props) {

  const [loading, setLoading] =
  useState(false);

  const methods =
    useForm<FormValues>({
      defaultValues: {
        from: "",
        to: "",
      },
    });

const onSubmit = async (
  data: FormValues
) => {

  // ✅ Prevent duplicate submit
  if (loading) return;

  setLoading(true);

  try {

    console.log(
      `${title} Filters`,
      data
    );

    // fake delay
    await new Promise(
      (resolve) =>
        setTimeout(resolve, 2000)
    );

  } finally {

    setLoading(false);

  }
};

  return (

    <FormProvider {...methods}>

      <form
        onSubmit={methods.handleSubmit(
          onSubmit
        )}
        className="space-y-6"
      >

        {/* PAGE TITLE */}
        <h1
          className="
            text-2xl
            font-semibold
          "
          style={{
            color:
              theme.primaryDark,
          }}
        >
          {title}
        </h1>

        {/* FILTER CARD */}
        <div
          className="
            bg-white
            border
            rounded-xl
            p-5
          "
          style={{
            borderColor:
              theme.border,
          }}
        >
<div className="space-y-5">

  {/* DATE FIELDS */}
  <div
    className="
      grid
      grid-cols-2
      gap-5
    "
  >

    {/* FROM */}
    <div className="space-y-2">

      <label
        className="
          text-sm
          font-medium
        "
      >
        From Date
      </label>

     <FormField
  type="datepicker"
  name="from"
/>

    </div>

    {/* TO */}
    <div className="space-y-2">

      <label
        className="
          text-sm
          font-medium
        "
      >
        To Date
      </label>

 <FormField
  type="datepicker"
  name="to"
/>

    </div>

  </div>

  {/* SUBMIT */}
  <div className="flex justify-center">

   <Button
  type="submit"
  disabled={loading}
>

  {loading
    ? "Submitting..."
    : "Submit"}

</Button>


  </div>

          </div>

        </div>

      </form>

    </FormProvider>
  );
}