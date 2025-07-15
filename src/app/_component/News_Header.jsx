import Image from 'next/image'
import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const News_Header = ({setDistrict}) => {
    const [inputValue, setInputValue] = React.useState('');
  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 py-8 bg-white shadow-sm">
      <Image src="/Logo.png" alt="logo" width={180} height={100} />

      <div className="flex w-full max-w-xl items-center gap-2 border rounded-full px-4 py-2 shadow-md focus-within:ring-2 ring-blue-500 transition-all duration-200">
        <Input
          type="text"
          placeholder="Search your city for local news..."
          className="flex-1 border-none outline-none ring-0 focus-visible:ring-0 focus:ring-0 focus:outline-none text-base"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <Button className="rounded-full px-6" onClick={() => {setDistrict(inputValue); setInputValue('');toast.success(`📍 Your location is set to: ${inputValue}`)}}>Search</Button>
      </div>
    </div>
  )
}

export default News_Header;



   
