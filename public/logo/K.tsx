import { SVGProps } from "react";

interface ISVGIconProps extends SVGProps<SVGSVGElement> {
  className: string
}
export function K({className='', ...props}: ISVGIconProps) {
  return(
    <svg
      {...props}
      className={className}
      viewBox="0 0 147 142" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M138.005 141.822L38.2686 76.484C34.6286 74.118 33.5366 71.934 33.5366 69.75C33.5366 67.384 34.9926 65.018 38.2686 62.834L133.637 0.043997L142.555 13.694L57.9246 69.568L146.741 127.99L138.005 141.822ZM17.3386 138H0.776594V3.86599H17.3386V138Z" fill="currentColor"/>
    </svg>
  )
}