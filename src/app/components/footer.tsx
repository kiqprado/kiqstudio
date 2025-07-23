import { LocationAndTimeDisplay } from '@/app/components/location-and-time-display'

export function Footer() {

  return(
    <div className='w-full flex gap-3 items-center px-3'>
      <div 
        className='h-1 flex-1 bg-neutral-500 rounded-xl hover:bg-neutral-300 transition-colors duration-300. ease-in-out'
      />
      <LocationAndTimeDisplay/>
    </div>
  )
}