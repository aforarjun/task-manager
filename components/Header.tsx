"use client"

import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { LayoutDashboardIcon, ListIcon, MenuIcon, SearchIcon, TimerIcon } from './svg-icons'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from './ui/breadcrumb'
import { Input } from './ui/input'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { toast } from './ui/use-toast'
import { useRouter } from 'next/navigation'
import userSignOut from '@/firebase/auth/signOut'
import { useAppSelector } from '@/store/hooks'
import { UserIcon } from 'lucide-react'

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAppSelector(state => state.auth)

  const [breadcrumbLabel, setBreadcrumbLabel] = useState<{label:string; href:string}[]>();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean);

    const breadcrumbs = segments.map((segment, index) => {
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      const href = `/${segments.slice(0, index + 1).join('/')}`;
      return { label, href };
    });

    setBreadcrumbLabel(breadcrumbs);
  }, [pathname]);

  const signOut = async () => {
    setLoading(true);
    try {
      await userSignOut();

      toast({title: "Logged out successfully"});
      setLoading(false);
      router.push("/sign-in");
    } catch (error:any) {
      toast({title: error.message, description: `Please try again later -> ${error.error}`});
      setLoading(false);
    }
  }

  if(!isAuthenticated){
    return null
  }

  return (
    <header className="fixed w-full top-0 z-30 flex py-3 h-14 items-center gap-4 border-b bg-background px-4 sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild >
            <Button size="icon" variant="outline">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="/" className="flex items-center gap-4 px-2.5 text-foreground">
                <LayoutDashboardIcon className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>

              <Link href="/tasks" className="flex items-center gap-4 px-2.5 text-foreground">
                <TimerIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                <span>Tasks</span>
              </Link>


              <Link href="/tasks/_new" className="flex items-center gap-4 px-2.5 text-foreground">
                <ListIcon className="h-5 w-5" />
                <span>Create New Task</span>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href='/'>DASHBOARD</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            {breadcrumbLabel?.map((breadcrumb) => (
              <div key={breadcrumb.href} className='flex gap-1 items-center justify-center'>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={breadcrumb.href}>
                      {breadcrumb.label}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Searchable tasks */}
        <div className="relative ml-auto flex-1 md:grow-0">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tasks..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>

        {/* User Icon for more settings */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
              <UserIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {loading ? (
              <p>Loading...</p>
            ): (
              <>
                <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
  )
}

export default Header;