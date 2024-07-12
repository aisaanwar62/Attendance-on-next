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
import { db } from "@/lib/db";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const prisma = new PrismaClient();

// Define zod schema for form validation
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password should be at least 8 characters"),
});

type FormValues = z.infer<typeof formSchema>; // Define type for form values

function UserLogin() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    console.log(values); // Output form values
    console.log("Submitting form with values:", values);
    console.log(values); // Output form values
    try {
      const response = await axios.post("/api/auth/login", values);

      router.push("/admin"); // Redirect to success page after successful login
      toast({
        title: "Login successfully",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, possibly display an error message to the user
    }
  };

  return (
    <div className="flex fex-col items-center justify-center  h-screen bg-blue-200 ">
      <div className="grid grid-cols-2 divide-x-2 bg-white border border-white shadow-xl rounded-lg overflow-hidden  ">
        <div
          className="h-full  flex flex-col justify-center items-center p-8"
          style={{
            backgroundImage: "url('/adminlogin.avif')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className="p-20 flex flex-col items-center justify-center bg-lime-100 bg-opacity-30 ">
          <h1 className="font-bold text-yellow-500 text-center ">
            Admin Login
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
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
                      <Input placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="border rounded bg-yellow-600 text-white shadow-md text-center px-2 py-2  flex items-center justify-center w-full"
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

export default UserLogin;
