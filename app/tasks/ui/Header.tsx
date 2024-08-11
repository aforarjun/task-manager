"use client"

import { useRouter } from 'next/navigation';
import React from 'react';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Header = () => {
    const router = useRouter();

    const newtask = () =>{
        router.push("/tasks/_new")
    }

  return (
    <CardHeader>
        <div className='flex  justify-between gap-5'>
            <CardTitle>All Tasks</CardTitle>
            <Button onClick={newtask}>Add New task</Button>
        </div>
        <CardDescription>A list of your all tasks.</CardDescription>
    </CardHeader>
  )
}

export default Header