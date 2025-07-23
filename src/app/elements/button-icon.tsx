import { ReactNode, ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const ButtonIconVariants = tv({
  base: [
    'flex outline-none cursor-pointer',
    'transform transition duration-300 ease-in-out',
    'hover:scale-110 hover:brightness-200'
  ],
  variants: {
    align: {
      start: 'self-start',
      center: 'self-center',
      end: 'self-end'
    }
  },
  defaultVariants: {
    align: 'center'
  }
})

interface IButtonIcon extends ComponentProps<'button'>,
VariantProps<typeof ButtonIconVariants> {
  children: ReactNode
}

export function ButtonIcon({ children, align, ...props } : IButtonIcon) {
  return (
    <button
      {...props}
      className={ButtonIconVariants({ align })}
    >
      {children}
    </button>
  )
}