import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const MainLayout = async ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

  const {isAuthenticated} = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  if(!isUserAuthenticated){
    redirect('/')
  }
  return (
    <div>
      {children}
    </div>
  )
}

export default MainLayout
