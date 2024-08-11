import React from "react";
import Link from "next/link";
import SignupForm from "./ui/SignupForm";

function Page() {
  console.log("sign up page")
    return (
      <div className="mt-20 flex px-4">
          <div className="w-full p-5 md:p-16 border rounded-xl shadow-2xl max-w-[600px] md:mx-auto">
          <h2 className="text-3xl font-bold mb-8">Sign Up</h2>

          <SignupForm />

          <div className="w-full flex justify-between items-center mt-6">
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">Already have an account?</span>
              <Link href="/sign-in" className="text-sm font-medium hover:underline" prefetch={false}>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Page;