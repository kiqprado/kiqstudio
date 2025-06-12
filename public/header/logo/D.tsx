import { SVGProps } from "react";

interface ISVGIconProps extends SVGProps<SVGSVGElement> {
  className?: string
}

export function D({ className = '', ...props}: ISVGIconProps) {
  return(
    <svg
      {...props}
      className={className}
      viewBox="0 0 175 135" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M100.71 135H9.16422C3.52222 135 0.792219 132.088 0.792219 126.446V9.23799C0.792219 3.59599 3.52222 0.865991 9.16422 0.865991H100.71C168.96 0.865991 174.966 10.148 174.966 50.37V85.496C174.966 125.718 168.96 135 100.71 135ZM158.404 85.496V50.37C158.404 21.614 156.402 17.428 100.71 17.428H17.5362V118.256H100.71C156.402 118.256 158.404 114.434 158.404 85.496Z" fill="currentColor"/>
    </svg>
  )
}