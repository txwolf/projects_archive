import Link from 'next/link'
import { cva, VariantProps } from 'class-variance-authority'
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'

type ButtonBaseProps = VariantProps<typeof buttonClasses> & {
  children: React.ReactNode
}

interface ButtonAsAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

interface ButtonAsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never
}

type ButtonProps = ButtonBaseProps & (ButtonAsAnchorProps | ButtonAsButtonProps)

const buttonClasses = cva('rounded-full inline-flex items-center', {
  variants: {
    variant: {
      primary: [
        'bg-primary-gradient hover:text-shadow hover:shadow-primary transition-all',
        '[&_.icon-wrapper]:ml-2',
      ],
      secondary: [
        'text-off-white bg-white bg-opacity-10 border-transparent-white backdrop-filter-[12px] hover:bg-opacity-20 transition-colors ease-in',
        '[&_.highlight-wrapper]:bg-transparent-white [&_.highlight-wrapper]:rounded-full [&_.highlight-wrapper]:px-2 [&_.highlight-wrapper:first-child]:-ml-2 [&_.highlight-wrapper:first-child]:mr-2 [&_.highlight-wrapper:last-child]:ml-2 [&_.highlight-wrapper:last-child]:-mr-2',
      ],
    },
    size: {
      small: 'text-xs px-3 h-7',
      medium: 'text-sm px-4 h-8',
      large: 'text-md px-6 h-12',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
})

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode
  className: string
}) => (
  <span className={classNames('highlight-wrapper', className)}>{children}</span>
)

const Button = ({ children, href, variant, size, ...props }: ButtonProps) => {
  const classes = buttonClasses({ variant, size, className: props.className })

  if ('href' in props && props.href !== undefined) {
    return (
      <Link {...props} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  )
}

export default Button
