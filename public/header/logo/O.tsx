import { SVGProps } from "react";

interface ISVGIconProps extends SVGProps<SVGSVGElement> {
  className: string
}
export function O({className='', ...props}: ISVGIconProps) {
  return(
    <svg 
      {...props}
      className={className} 
      viewBox="0 0 176 138" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg">
      <path d="M101.088 138.002H75.0624C6.81236 138.002 0.80636 128.72 0.80636 88.498V49.55C0.80636 9.32799 6.81236 0.045993 75.0624 0.045993H101.088C169.156 0.045993 175.162 9.32799 175.162 49.55V88.498C175.162 128.72 169.156 138.002 101.088 138.002ZM158.6 88.498V49.55C158.6 20.612 156.598 16.79 101.088 16.79H75.0624C19.3704 16.79 17.3684 20.612 17.3684 49.55V88.498C17.3684 117.254 19.3704 121.258 75.0624 121.258H101.088C156.598 121.258 158.6 117.254 158.6 88.498Z" fill="currentColor"/>
    </svg>
  )
}