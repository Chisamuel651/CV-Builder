import React from 'react'
import { Frown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Error = () => {
  return (
    <div className='h-screen flex flex-col items-center space-y-4 justify-center'>
      <div className="h-screen flex flex-col items-center space-y-4 justify-center">
        <Frown size='80px' />
        <h2 className="text-xl font-semibold">You do not have access</h2>
        <Button className="min-w-64">Request for access</Button>
      </div>

      <div className="shrink-0 min-h-14 text-center">
        <p className="text-xs">Company by </p>
        <h5
          className="font-black 
         text-[20px] text-primary"
        >
          {" "}
          Cv.Builder
        </h5>
        <p className="text-xs">Powered By <span className='text-primary font-semibold'>Solumentics</span> </p>
      </div>
    </div>
  )
}

export default Error
