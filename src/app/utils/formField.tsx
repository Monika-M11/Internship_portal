"use client";

import {
  useFormContext,
  Controller,
  RegisterOptions,
} from "react-hook-form";

import * as React from "react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import {
  Calendar as CalendarComponent,
} from "@/components/ui/calendar";

import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

import { TypeaheadField } from "./typeheadField";
import ToggleSwitch from "@/components/ui/switch";

type Option = {
  label: string;
  value: string;
  description?: string;
};

type Props = {
  name: string;
  type:
    | "input"
    | "textarea"
    | "radio"
    | "checkbox"
    | "datepicker"
    | "typeahead"
    | "toggle"
    | "select"        // ← Added
    | "date";         // ← Added

  placeholder?: string;
  options?: Option[] | string[];
  validation?: RegisterOptions;
  readonly?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (value: string) => void;
};

// NORMALIZE OPTIONS
const normalizeOptions = (options?: Option[] | string[]): Option[] => {
  if (!options) return [];
  if (typeof options[0] === "string") {
    return (options as string[]).map((o) => ({ label: o, value: o }));
  }
  return options as Option[];
};

export const FormField = ({
  name,
  type,
  placeholder,
  options,
  validation,
  readonly = false,
  disabled = false,
  className = "",
  onChange,
}: Props) => {
  const {
    register,
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  const hasError = !!error;

  const baseInputClass = `
    border rounded-md w-full px-3 py-2 h-[38px] text-[15px]
    outline-none transition disabled:bg-gray-100
    disabled:cursor-not-allowed read-only:bg-gray-50
  `;

 const borderClass = hasError
  ? `border-red-500 focus:ring-1 focus:ring-red-500`
  : `border-gray-300 focus:border-[#6B3F69] focus:ring-1 focus:ring-[#6B3F69]`;

  switch (type) {
    // INPUT
    case "input":
      // ... (your existing input code - unchanged)
      return (
        <Controller
          name={name}
          control={control}
          rules={validation}
          render={({ field }) => {
            const cls = className || "";
            const limitMatch = cls.match(/limit-(\d+)/);
            const computedMaxLength = limitMatch ? parseInt(limitMatch[1], 10) : undefined;

            const isOnlyNumbers = cls.includes("only-number");
            const isNumbersDecimal = cls.includes("numbers-decimal");
            const isOnlyAlphabets = cls.includes("only-alphabets");
            const isAlphanumeric = cls.includes("alphanumeric");
            const isNoSpace = cls.includes("no-space");
            const isUppercase = cls.includes("uppercase");
            const isCapitalize = cls.includes("capitalize");
            const isAlnumUpper = cls.includes("alphanumeric-uppercase");

            const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              let value = e.target.value;

              if (isOnlyNumbers) value = value.replace(/[^0-9]/g, "");
              if (isNumbersDecimal) {
                value = value.replace(/[^0-9.]/g, "");
                const parts = value.split(".");
                if (parts.length > 2) value = parts[0] + "." + parts[1];
                if (parts[1]?.length > 2) value = parts[0] + "." + parts[1].slice(0, 2);
              }
              if (isOnlyAlphabets) value = value.replace(/[^A-Za-z\s]/g, "");
              if (isAlphanumeric) value = value.replace(/[^A-Za-z0-9]/g, "");
              if (isNoSpace) value = value.replace(/\s+/g, "");
              if (isUppercase) value = value.toUpperCase();
              if (isCapitalize) {
                value = value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
              }
              if (isAlnumUpper) {
                value = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
              }
              if (computedMaxLength !== undefined && computedMaxLength > 0) {
                value = value.slice(0, computedMaxLength);
              }

              field.onChange(value);
              onChange?.(value);
              if (value?.toString().trim()) clearErrors(name);
            };

            return (
              <div>
                <input
                  {...field}
                  placeholder={placeholder}
                  autoComplete="off"
                  readOnly={readonly}
                  disabled={disabled}
                  maxLength={computedMaxLength}
                  onChange={handleInputChange}
                  className={`${baseInputClass} ${borderClass} ${className}`}
                />
                {hasError && (
                  <p className="text-red-500 text-xs mt-1">
                    {String(error?.message)}
                  </p>
                )}
              </div>
            );
          }}
        />
      );

    // TEXTAREA
    case "textarea":
      // ... (your existing textarea code - unchanged)
      return (
        <Controller
          name={name}
          control={control}
          rules={validation}
          render={({ field }) => (
            <div>
              <textarea
                {...field}
                placeholder={placeholder}
                readOnly={readonly}
                disabled={disabled}
                className={`${baseInputClass} ${borderClass} h-[90px] resize-none`}
              />
              {hasError && (
                <p className="text-red-500 text-xs mt-1">
                  {String(error?.message)}
                </p>
              )}
            </div>
          )}
        />
      );

    // SELECT (New)
       // SELECT
    case "select": {
      const opts = normalizeOptions(options);
      return (
        <Controller
          name={name}
          control={control}
          rules={validation}
          render={({ field }) => (
            <div>
              <select
                {...field}
                className={`${baseInputClass} ${borderClass} ${className} text-gray-500`}
                disabled={disabled || readonly}
                style={{
                  color: field.value ? "inherit" : "#9CA3AF", // Gray when placeholder is shown
                }}
              >
                <option value="" className="text-gray-400">
                  {placeholder || "Select..."}
                </option>
                {opts.map((opt) => (
                  <option key={opt.value} value={opt.value} className="text-black">
                    {opt.label}
                  </option>
                ))}
              </select>
              {hasError && (
                <p className="text-red-500 text-xs mt-1">
                  {String(error?.message)}
                </p>
              )}
            </div>
          )}
        />
      );
    }

    // DATE (New) - Simple HTML date input
    case "date":
      return (
        <Controller
          name={name}
          control={control}
          rules={validation}
          render={({ field }) => (
            <div>
              <input
                type="date"
                {...field}
                className={`${baseInputClass} ${borderClass} ${className}`}
                disabled={disabled || readonly}
              />
              {hasError && (
                <p className="text-red-500 text-xs mt-1">
                  {String(error?.message)}
                </p>
              )}
            </div>
          )}
        />
      );

    // DATEPICKER (existing)
    case "datepicker":
      // ... (your existing datepicker code - unchanged)
      return (
        <Controller
          name={name}
          control={control}
          rules={validation}
          defaultValue={format(new Date(), "dd/MM/yyyy")}
          render={({ field }) => {
            const today = new Date();
            const selectedDate =
              field.value && typeof field.value === "string"
                ? (() => {
                    const [day, month, year] = field.value.split("/");
                    return new Date(+year, +month - 1, +day);
                  })()
                : today;

            return (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={readonly || disabled}
                    className={`${baseInputClass} ${borderClass} justify-start text-left flex items-center gap-2`}
                  >
                    <Calendar className="h-4 w-4" />
                    <span>{format(selectedDate, "dd/MM/yyyy")}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={(val) =>
                      field.onChange(val ? format(val, "dd/MM/yyyy") : "")
                    }
                  />
                </PopoverContent>
              </Popover>
            );
          }}
        />
      );
     

    // TYPEAHEAD
    case "typeahead":

      return (
        <TypeaheadField
          name={name}
          options={normalizeOptions(
            options
          )}
          placeholder={
            placeholder
          }
          validation={
            validation
          }
          onChange={
            onChange
          }
        />
      );

    // TOGGLE
    case "toggle":

      return (
        <Controller
          name={name}
          control={control}
          rules={validation}
          render={({ field }) => {

            const checked =
              field.value === true ||
              field.value === 1 ||
              field.value === "1";

            const handleChange = (
              val: boolean
            ) => {

              if (
                typeof field.value ===
                "number"
              ) {

                field.onChange(
                  val ? 1 : 0
                );

              } else if (
                typeof field.value ===
                "string"
              ) {

                field.onChange(
                  val ? "1" : "0"
                );

              } else {

                field.onChange(
                  val
                );
              }
            };

            return (
              <ToggleSwitch
                checked={
                  checked
                }
                disabled={
                  readonly ||
                  disabled
                }
                onChange={
                  handleChange
                }
              />
            );
          }}
        />
      );

    default:
      return null;
  }
};