import React from 'react'
import AddResume from '../_components/AddResume'
import ResumeList from '../_components/ResumeList'

const Page = () => {
  return (
    <div className='w-full capitalize'>
      <div className="w-full mx-auto max-w-7xl py-5 px-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              resume builder
            </h1>
            <p className="text-base dark:text-inherit">
              create a personalized resume with our AI
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            {/* trash list */}
          </div>
        </div>

        <div className="w-full pt-11">
          <h5 className="text-xl font-semibold dark:text-inherit mb-3">
            all resume
          </h5>

          <div className='flex flex-wrap w-full gap-5'>
            <AddResume />
            <ResumeList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
