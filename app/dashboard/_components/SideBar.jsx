"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Lasso, LayoutDashboard, Shield, UserCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function SideBar() {

  const MenuList = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard'
    },
    {
      name: 'Upgrade',
      icon: Shield,
      path: '/dashboard/upgrade'
    },
    {
      name: 'Profile',
      icon: UserCircle,
      path: '/dashboard/profile'
    }
  ]
  const path = usePathname();

  return (
    <div className='h-screen shadow-md p-5'>
      <div className='flex gap-2 items-center'>
        <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
        <h2 className='font-bold text-2xl'>Easy study</h2>
      </div>
      <div className='mt-10'>
        <Link href={'/create'}>
          <Button className='w-full'>+Create new</Button>
        </Link>
        <div className='mt-5'>
          {MenuList.map((menu, index) => (
            <Link key={index} href={menu.path}>
              <div 
                className={`flex gap-5 items-center p-3
                hover:bg-slate-200 rounded-lg mt-3
                ${path == menu.path && 'bg-slate-200'}`}
              >
                <menu.icon />
                <h2>{menu.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className='border p-3 bg-slate-100 rounded-lg absolute bottom-10 w-[87%]'>
        <h2 className='text-lg mb-2'>Available Credits: 5</h2>
        <progress value={50} />

        <h2 className='text-sm'>1 out of 5 Credits Used</h2>

        <a href={'/dashboard/upgrade'} className='text-primary text-xs mt-3'>Upgrade to create more</a>
      </div>
    </div>
  )
}

export default SideBar
