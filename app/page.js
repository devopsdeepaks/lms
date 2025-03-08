"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h1>hiiiii</h1>
      <Button variant="ghost">Click me</Button>
      {/* <Image src="/logo.svg" alt="logo" width={200} height={200} /> */}
      
      <UserButton/>

    </div>
  );
}
