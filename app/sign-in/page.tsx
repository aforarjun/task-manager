"use client"
import React from "react";
import Link from "next/link";
import LoginForm from "./ui/LoginForm";

function Page() {
    return (
        <div className="mt-20 flex px-4">
            <div className="w-full p-5 md:p-16 border rounded-xl shadow-2xl max-w-[600px] md:mx-auto">
                <h2 className="text-3xl font-bold mb-8">Sign In</h2>

                <LoginForm />
                
                <div className="w-full flex justify-between items-center mt-6">
                    <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground">Don&apos;t have an account?</span>
                        <Link href="/sign-up" className="text-sm font-medium hover:underline" prefetch={false}>
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;