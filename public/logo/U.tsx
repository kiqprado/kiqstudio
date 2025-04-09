import { SVGProps } from "react";

interface ISVGIconProps extends SVGProps<SVGSVGElement> {
  className: string
}

export function U({className='', ...props}: ISVGIconProps) {
  return(
    <svg
      {...props}
      className={className} 
      viewBox="0 0 166 137" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg">
<path d="M149.266 87.498V0.865991H165.828V87.498C165.828 127.72 159.822 137.002 91.5718 137.002H74.2818C6.21377 137.002 0.207773 127.72 0.207773 87.498V0.865991H16.7698V87.498C16.7698 116.254 18.5898 120.258 74.2818 120.258H91.5718C147.264 120.258 149.266 116.254 149.266 87.498Z" fill="currentColor"/>
    </svg>
  )
}