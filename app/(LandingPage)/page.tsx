import { Button } from "@/components/ui/button";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-b from-orange-50 via-white to-orange-20'>
      <div className='shadow-sm w-full sticky top-0 bg-white dark:bg-gray-900 z-[9]'>
        <div className='w-full mx-auto max-w-7xl py-2 px-5 !bg-white flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div>
              <span className='font-black text-xl sm:text-2xl text-primary'>CV.Builder</span>
            </div>
          </div>

          <div className='flex items-center gap-4 sm:gap-6'>
            <Button variant='outline' className='bg-transparent border-primary text-primary border px-6 py-2 hover:bg-transparent shadow-md font-medium rounded-md'>
              <LoginLink>Sign In</LoginLink>
            </Button>

            <Button className='bg-primary shadow-md text-white px-6 py-2 font-medium'>
              <RegisterLink>Sign Up</RegisterLink>
            </Button>
          </div>
        </div>
      </div>

      {/* hero section */}
      <section className='flex-1'>
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
            Find perfect job with our{" "}
            <span className="font-extrabold bg-gradient-to-r from-orange-400 via-orange-10 to-orange-600 bg-clip-text text-transparent">AI Powered</span> resume builder
          </h1>

          <p className="mt-4 sm:mt-6 text-base font-semibold sm:text-lg text-gray-700 dark:text-gray-300">
            Design your resume with our free tool and share it with a link.
          </p>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700 dark:text-gray-300">
            Get To Know More About Us By Visiting
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              className="border border-orange-600 text-orange-600 hover:bg-orange-100 px-10 py-7 hover:bg-transparent hover:text-primary rounded-full bg-transparent text-base sm:text-lg font-medium"
            >
              <Link href='https://solumentics.com'>Solumentics</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* image section */}
      <section className="w-full relative max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className='absolute top-10 left-1/2 transform -translate-x-1/2 w-full h-[400px] rounded-full blur-3xl opacity-40 z-0'></div>
        <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-xl shadow-lg bg-background">
          <div className="relative w-full h-full rounded-md">
            <Image
              src='/images/board_img.png'
              width={600}
              height={400}
              alt='board image'
              className="w-full h-full rounded-md shadow-lg object-contain absolute"
            />
          </div>
        </div>
      </section>


    </div>
  );
}
