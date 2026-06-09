"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField } from "@/app/utils/formField";
import { apiRequest } from "@/lib/api";
import { X } from "lucide-react"; 

type StudentForm = {
  full_name: string;
  phone_number: string;
  dob: string;
  gender: string;
  email: string;
  college_name: string;
  course: string;
  department: string;
  internship_course: string;
  linkedin_url: string;
  transaction_id: string;
  declaration: boolean;
};

export default function StudentRegistrationPage() {
  const [showQR, setShowQR] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{ username: string; password: string } | null>(null);

  const [toastData, setToastData] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const methods = useForm<StudentForm>({
    defaultValues: {
      full_name: "",
      phone_number: "",
      dob: "",
      gender: "",
      email: "",
      college_name: "",
      course: "",
      department: "",
      internship_course: "",
      linkedin_url: "",
      transaction_id: "",
      declaration: false,
    },
  });

  const onSubmit: SubmitHandler<StudentForm> = async (formData) => {
    setIsSubmitting(true);

    try {
      const payload = {
        data: {
          full_name: formData.full_name,
          dob: formData.dob,
          email: formData.email,
          phone_number: formData.phone_number,
          gender: formData.gender,
          university: formData.college_name,
          internship_course: formData.internship_course,
          course: formData.course,
          department: formData.department,
          linkedin_url: formData.linkedin_url,
          transaction_id: formData.transaction_id,
          terms_status: formData.declaration,
        },
      };

      const response = await apiRequest({
        endpoint: "REGISTER",
        data: payload,
      });

      if (response?.status === true) {
        setSuccessData({
          username: response.username,
          password: response.password,
        });
        methods.reset();
      } else {
        setToastData({
          message: response?.message || "Failed to submit registration",
          type: "error",
        });
      }
    } catch (error: any) {
      setToastData({
        message: error?.message || "Something went wrong",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto hide toast
  useEffect(() => {
    if (toastData) {
      const timer = setTimeout(() => setToastData(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastData]);

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  const internshipOptions = [
    { label: "Data Analytics", value: "Data Analytics" },
    { label: "Agentic AI Development", value: "Agentic AI Development" },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Hero */}
      <div className="hidden lg:flex lg:w-1/2 lg:fixed lg:inset-0 lg:items-center lg:justify-center overflow-hidden bg-[#6B3F69]">
        <img
          src="https://plus.unsplash.com/premium_photo-1682787494765-44d02d12f5be?q=80&w=870&auto=format&fit=crop"
          alt="Internship"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="relative z-10 max-w-xl px-10 text-white">
          <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
            Learn, Build & Grow
          </h1>
          <p className="text-base xl:text-lg text-gray-200 leading-8">
            Join our internship program to gain industry experience, strengthen your technical skills, and work on projects that prepare you for future career opportunities.
          </p>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex-1 lg:ml-[50%] bg-gray-100 min-h-screen flex items-center justify-center py-8 px-4 sm:px-6">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 sm:p-10 overflow-y-auto max-h-[100dvh]">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#6B3F69]">Internship Registration</h2>
            <p className="text-gray-500 mt-2">Fill your details to enroll in the program</p>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
              {/* Form fields remain same */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                <FormField name="full_name" type="input" placeholder="Enter Full Name" validation={{ required: "Full Name is required" }} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                <FormField name="phone_number" type="input" placeholder="Enter Phone Number" className="only-number limit-10" validation={{ required: "Phone Number is required" }} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth <span className="text-red-500">*</span></label>
                <FormField name="dob" type="date" validation={{ required: "Date of Birth is required" }} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender <span className="text-red-500">*</span></label>
                <FormField name="gender" type="select" placeholder="Select Gender" options={genderOptions} validation={{ required: "Gender is required" }} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                <FormField name="email" type="input" placeholder="Enter Email Address" validation={{ required: "Email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid Email" } }} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">College / University <span className="text-red-500">*</span></label>
                <FormField name="college_name" type="input" placeholder="Enter College Name" validation={{ required: "College Name is required" }} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course <span className="text-red-500">*</span></label>
                <FormField name="course" type="input" placeholder="Enter Course" validation={{ required: "Course is required" }} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department <span className="text-red-500">*</span></label>
                <FormField name="department" type="input" placeholder="Enter Department" validation={{ required: "Department is required" }} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Internship Course <span className="text-red-500">*</span></label>
                <FormField name="internship_course" type="select" placeholder="Select Internship" options={internshipOptions} validation={{ required: "Internship Course is required" }} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile URL <span className="text-red-500">*</span></label>
                <FormField name="linkedin_url" type="input" placeholder="https://linkedin.com/in/your-profile" validation={{ required: "LinkedIn URL is required" }} />
              </div>

              <div className="border rounded-xl p-6 bg-slate-50">
                <h3 className="font-semibold text-lg mb-4 text-[#6B3F69]">Payment Details</h3>
                <Button type="button" onClick={() => setShowQR(true)} className="w-full bg-[#8D5F8C] hover:bg-[#7A4F79] text-white">
                  Show QR Code for Payment
                </Button>

                <div className="mt-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID <span className="text-red-500">*</span></label>
                  <FormField name="transaction_id" type="input" placeholder="Enter Transaction ID" validation={{ required: "Transaction ID is required" }} />
                </div>
              </div>

              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" {...methods.register("declaration", { required: "Please accept Terms & Conditions" })} className="mt-1 accent-[#6B3F69]" />
                  <span className="text-sm text-gray-700">
                    I agree to the{" "}
                    <button type="button" onClick={() => setShowTerms(true)} className="text-[#6B3F69] underline font-medium hover:text-[#5A3559]">
                      Terms & Conditions
                    </button>
                  </span>
                </label>
                {methods.formState.errors.declaration && (
                  <p className="text-red-500 text-xs mt-1">{String(methods.formState.errors.declaration.message)}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#6B3F69] hover:bg-[#5A3559] text-white h-12 rounded-xl text-base font-medium mt-4 disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>

      {/* Toast */}
      {toastData && (
        <div className="fixed top-5 right-5 z-50">
          <div className={`px-4 py-3 rounded-lg shadow-lg text-white ${toastData.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
            {toastData.message}
          </div>
        </div>
      )}

      {/* Success Modal - Username & Password */}
      {successData && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 relative">
          
            <button
              onClick={() => setSuccessData(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                ✓
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Registration Successful!</h2>
              <p className="text-gray-600 mb-6">Your login credentials have been generated.</p>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-left mb-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="font-mono font-semibold text-lg">{successData.username}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Password</p>
                  <p className="font-mono font-semibold text-lg">{successData.password}</p>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-6">
                Please save these credentials securely. You will need them to login.
              </p>

              <Button
                onClick={() => setSuccessData(null)}
                className="w-full bg-[#6B3F69] hover:bg-[#5A3559] text-white h-11"
              >
                I have saved my credentials
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-[360px]">
            <h3 className="text-xl font-semibold mb-5 text-center text-[#6B3F69]">Scan QR Code</h3>
            <img src="/qr-code.png" alt="QR Code" className="w-60 mx-auto" />
            <Button type="button" className="w-full mt-6 bg-[#6B3F69]" onClick={() => setShowQR(false)}>
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-semibold text-[#6B3F69]">Internship Terms & Conditions</h2>
            </div>
            <div className="p-6 overflow-y-auto max-h-[65vh] text-sm text-gray-700">
              <ol className="list-decimal pl-5 space-y-3">
                <li>The intern must attend all scheduled internship sessions, training programs, workshops, and assigned activities. Regular attendance is mandatory.</li>
                {/* Add remaining terms here */}
                <li>By registering for the internship, the participant agrees to comply with all the above terms and conditions.</li>
              </ol>
            </div>
            <div className="border-t p-5">
              <Button type="button" className="w-full bg-[#6B3F69]" onClick={() => setShowTerms(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}