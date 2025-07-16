import { ReactNode } from 'react'

// Simple utility to concatenate class names
function clsx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

interface CardProps {
  children: ReactNode
  className?: string
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

interface CardTitleProps {
  children: ReactNode
  className?: string
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

/**
 * Main card container component
 * @param children - Card content
 * @param className - Additional CSS classes
 * @returns JSX element representing the card
 */
export function Card({ children, className }: CardProps) {
  return (
    <div className={clsx(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}>
      {children}
    </div>
  )
}

/**
 * Card header component
 * @param children - Header content
 * @param className - Additional CSS classes
 * @returns JSX element representing the card header
 */
export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={clsx("flex flex-col space-y-1.5 p-6", className)}>
      {children}
    </div>
  )
}

/**
 * Card title component
 * @param children - Title content
 * @param className - Additional CSS classes
 * @returns JSX element representing the card title
 */
export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={clsx(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}>
      {children}
    </h3>
  )
}

/**
 * Card content component
 * @param children - Content
 * @param className - Additional CSS classes
 * @returns JSX element representing the card content
 */
export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={clsx("p-6 pt-0", className)}>
      {children}
    </div>
  )
}
