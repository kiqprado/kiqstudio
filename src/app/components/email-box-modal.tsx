import { useMediaRange } from '../utils/breakpoints-hook'

import { ButtonIcon } from '../elements/button-icon'

import { X } from 'lucide-react'

interface IEmailBoxModal {
  HandleToggleEmailModalBoxContact: () => void
}

export function EmailBoxModal({ HandleToggleEmailModalBoxContact }: IEmailBoxModal) {

  //Query's
    const isMobileSM = useMediaRange('mobileSM')
    const isMobileMD = useMediaRange('mobileMD')
    const isMobileLG = useMediaRange('mobileLG')
    const isTabletMD = useMediaRange('tabletMD')
    const isTabletLG = useMediaRange('tabletLG')
    
    const mobileRangeFull = isMobileSM || isMobileMD || isMobileLG
    const tabletRangeFull = isTabletMD || isTabletLG
    // const desktopRangeFull = !mobileRangeFull && !tabletRangeFull

  return (
    <div
      className='absolute inset-0 z-10 flex bg-zinc-950/50'
    >
      <div
        className={`m-auto relative ${mobileRangeFull || tabletRangeFull ? 'min-w-[90%]' : 'min-w-[40%]'} 
          px-3.5 py-2 rounded-xl bg-neutral-900`}
      >
        <div className='absolute top-1 right-1'>
          <ButtonIcon
            onClick={HandleToggleEmailModalBoxContact}
            align='end'
          >
            <X className={`${mobileRangeFull || tabletRangeFull ? 'size-7' : 'size-6'}`}/>
          </ButtonIcon>
        </div>

        <h3 className='pt-3 tracking-wider text-lg'>Send me a message</h3>

        <div className='h-0.5 w-full mb-5 bg-zinc-50 hover:brightness-200 rounded-2xl'/>

        <form 
          action="" 
          className={`flex flex-col gap-3 ${mobileRangeFull || tabletRangeFull ? 'text-xl' : 'text-md'}`}
        >
          <input 
            type="email" 
            placeholder='Email'
            className='border border-zinc-700 rounded-lg px-1.5' 
          />
          <input 
            type="text" 
            placeholder='Subject'
            className='border border-zinc-700 rounded-lg px-1.5'
          />
          <textarea 
            name="" id="" 
            placeholder='Type your message...'
            rows={mobileRangeFull|| tabletRangeFull ? 16 : 12}
            className='border border-zinc-700 rounded-lg px-1.5'
          />
          <button
            className='border border-zinc-700 rounded-lg py-1 px-4
              cursor-pointer transition-all duration-200 ease-in-out
              shadow-[0_4px_0_rgba(0,0,0,0.3)] active:translate-y-[2px] active:shadow-[0_1px_0_rgba(0,0,0,0.2)] 
            bg-zinc-900 text-white tracking-wider hover:bg-zinc-800'
          >
            Send
          </button>
        </form>  
      </div>
    </div>
  )
}