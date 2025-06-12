import { SVGProps } from "react";

interface ISVGIconProps extends SVGProps<SVGSVGElement> {
  className: string
}

export function T({className='', ...props}: ISVGIconProps) {
  return(
    <svg 
      {...props}
      className={className}
      viewBox="0 0 144 135" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
<path d="M143.439 17.428H0.386555V0.865991H143.439V17.428ZM79.9206 135H63.3586V35.446H79.9206V135Z" fill="currentColor"/>
</svg>

  )
}