import { SVGProps } from "react";

interface ISVGIconProps extends SVGProps<SVGSVGElement> {
  className: string
}

export function I({ className='', ...props}: ISVGIconProps){
  return(
    <svg 
      {...props}
      className={className}
      viewBox="0 0 18 135" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.3507 135H0.606672V0.865991H17.3507V135Z" fill="currentColor"/>
    </svg>
  )
}