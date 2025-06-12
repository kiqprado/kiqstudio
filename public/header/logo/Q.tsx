import { SVGProps } from "react";

interface ISVGIconProps extends SVGProps<SVGSVGElement> {
  className: string
}

export function Q({className='', ...props}: ISVGIconProps) {
  return(
    <svg 
      {...props}
      className={className}
      viewBox="0 0 178 140" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M169.604 139.822L89.8878 87.77L98.8058 74.12L178.522 125.99L169.604 139.822ZM174.518 73.028H157.956V49.55C157.956 20.612 155.954 16.79 100.444 16.79H74.4178C18.7258 16.79 16.7238 20.612 16.7238 49.55V88.498C16.7238 117.254 18.7258 121.258 74.4178 121.258H86.0658V138.002H74.4178C6.16783 138.002 0.161829 128.72 0.161829 88.498V49.55C0.161829 9.32799 6.16783 0.045993 74.4178 0.045993H100.444C168.512 0.045993 174.518 9.32799 174.518 49.55V73.028Z" fill="currentColor"/>
    </svg>
  )
}