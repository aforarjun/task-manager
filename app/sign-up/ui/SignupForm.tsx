"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAppSelector } from '@/store/hooks';
import signUp from '@/firebase/auth/signup';
import { LoadingCircle } from '@/components/svg-icons';

const SignupForm = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const router = useRouter();

    const { isAuthenticated } = useAppSelector(state => state.auth);

    useEffect(() => {
        if(isAuthenticated) router.push("/");
    }, [isAuthenticated, router])

    const handleForm = async (event:any) => {
        event.preventDefault();
        setLoading(true);

        try {
            await signUp(email, password, name);

            toast({title: "Sign up Successful"});
            setLoading(false);
            return router.push("/");
        } catch (error:any) {
            console.log(error);
            toast({title: error.message, description: `Please try again later -> ${error.error}`});
            setLoading(false);
        }
    }

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleForm}>
        <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <Button type="submit" className="w-full">{loading ? <LoadingCircle /> : "Sign Up"}</Button>
    </form>
  )
}

export default SignupForm