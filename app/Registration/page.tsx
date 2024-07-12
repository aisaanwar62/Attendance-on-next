"use client";
import React from "react";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";

// Define zod schema for form validation
const formSchema = z.object({
  name: z
    .string()
    .min(2, "Username should be at least 2 characters")
    .max(50, "Username should not exceed 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password should be at least 8 characters"),
  confirmPassword: z
    .string()
    .min(8, "Password should be at least 8 characters"),
});

type FormValues = z.infer<typeof formSchema>; // Define type for form values

function Registration() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    console.log("Submitting form with values:", values);
    console.log(values); // Output form values
    try {
      const response = await axios.post("/api/auth/register", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.status === 200) {
        console.log("Registration successful:");
        router.push("/UserLogin"); // Redirect to success page after registration
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, possibly display an error message to the user
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-200 ">
      <div className="grid grid-cols-2 divide-x-2 bg-white border border-white shadow-xl rounded-lg overflow-hidden ">
        <div
          className="h-full flex justify-center items-center"
          style={{
            backgroundImage: "url('/time_attendence.jpg')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className="p-7 flex flex-col items-center justify-center bg-sky-100 bg-opacity-30 px-20">
          <h1 className="font-bold text-sky-700 text-center">Sign Up</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="@gmail.com" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter password" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Confirm Password" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="border rounded bg-blue-400 shadow-md text-center px-2 py-2 flex items-center justify-center w-full"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
