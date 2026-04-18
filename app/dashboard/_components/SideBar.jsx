"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Shield, UserCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'

function SideBar() {
  const { user } = useUser()
  const path = usePathname()
  const [totalCourses, setTotalCourses] = useState(0)
  const [isMember, setIsMember] = useState(false)

  const MAX_FREE_CREDITS = 5

  useEffect(() => {
    if (user) fetchCredits()
  }, [user])

  const fetchCredits = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress
      const [coursesRes, userRes] = await Promise.all([
        axios.post('/api/courses', { createdBy: email }),
        axios.get(`/api/user?email=${encodeURIComponent(email)}`)
      ])
      setTotalCourses(coursesRes.data?.result?.length ?? 0)
      setIsMember(userRes.data?.isMember ?? false)
    } catch (e) {
      console.error('Sidebar credits fetch error:', e)
    }
  }

  const MenuList = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Upgrade', icon: Shield, path: '/dashboard/upgrade' },
    { name: 'Profile', icon: UserCircle, path: '/dashboard/profile' },
  ]

  const usedCredits = totalCourses
  const maxCredits = isMember ? null : MAX_FREE_CREDITS
  const pct = maxCredits ? Math.min((usedCredits / maxCredits) * 100, 100) : 100

  return (
    <div className='h-screen shadow-md p-5 flex flex-col'>
      <div className='flex gap-2 items-center'>
        <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
        <h2 className='font-bold text-2xl'>Easy study</h2>
      </div>

      <div className='mt-10 flex-1'>
        <Link href={'/create'}>
          <Button className='w-full'>+Create new</Button>
        </Link>
        <div className='mt-5'>
          {MenuList.map((menu, index) => (
            <Link key={index} href={menu.path}>
              <div className={`flex gap-5 items-center p-3 hover:bg-slate-200 rounded-lg mt-3 ${path === menu.path && 'bg-slate-200'}`}>
                <menu.icon />
                <h2>{menu.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Credits section */}
      <div className='border p-3 bg-slate-100 rounded-lg'>
        <h2 className='text-sm font-semibold mb-2'>
          {isMember ? 'Pro Plan — Unlimited Credits' : `Available Credits: ${MAX_FREE_CREDITS}`}
        </h2>

        {/* Progress bar */}
        <div className='w-full bg-gray-200 rounded-full h-2 mb-2'>
          <div
            className={`h-2 rounded-full transition-all ${isMember ? 'bg-blue-500 w-full' : pct >= 100 ? 'bg-red-500' : 'bg-green-500'}`}
            style={{ width: isMember ? '100%' : `${pct}%` }}
          />
        </div>

        <p className='text-xs text-gray-600'>
          {isMember
            ? 'Unlimited course creation'
            : `${usedCredits} out of ${MAX_FREE_CREDITS} Credits Used`}
        </p>

        {!isMember && (
          <Link href='/dashboard/upgrade' className='text-primary text-xs mt-2 block hover:underline'>
            Upgrade to create more
          </Link>
        )}
      </div>
    </div>
  )
}

export default SideBar
