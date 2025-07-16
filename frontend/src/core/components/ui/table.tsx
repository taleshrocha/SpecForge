import { ReactNode } from 'react'

// Simple utility to concatenate class names
function clsx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

interface TableProps {
  children: ReactNode
  className?: string
}

interface TableHeaderProps {
  children: ReactNode
  className?: string
}

interface TableBodyProps {
  children: ReactNode
  className?: string
}

interface TableRowProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

interface TableCellProps {
  children: ReactNode
  className?: string
}

interface TableHeadProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

/**
 * Main table container component
 * @param children - Table content (header, body, rows)
 * @param className - Additional CSS classes
 * @returns JSX element representing the table
 */
export function Table({ children, className }: TableProps) {
  return (
    <div className="relative w-full overflow-auto">
      <table className={clsx("w-full caption-bottom text-sm", className)}>
        {children}
      </table>
    </div>
  )
}

/**
 * Table header component
 * @param children - Header content
 * @param className - Additional CSS classes
 * @returns JSX element representing the table header
 */
export function TableHeader({ children, className }: TableHeaderProps) {
  return (
    <thead className={clsx("[&_tr]:border-b", className)}>
      {children}
    </thead>
  )
}

/**
 * Table body component
 * @param children - Body content
 * @param className - Additional CSS classes
 * @returns JSX element representing the table body
 */
export function TableBody({ children, className }: TableBodyProps) {
  return (
    <tbody className={clsx("[&_tr:last-child]:border-0", className)}>
      {children}
    </tbody>
  )
}

/**
 * Table row component
 * @param children - Row content
 * @param className - Additional CSS classes
 * @param onClick - Click handler for row
 * @returns JSX element representing the table row
 */
export function TableRow({ children, className, onClick }: TableRowProps) {
  return (
    <tr 
      className={clsx(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  )
}

/**
 * Table header cell component
 * @param children - Cell content
 * @param className - Additional CSS classes
 * @param onClick - Click handler for header cell
 * @returns JSX element representing the table header cell
 */
export function TableHead({ children, className, onClick }: TableHeadProps) {
  return (
    <th 
      className={clsx(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </th>
  )
}

/**
 * Table data cell component
 * @param children - Cell content
 * @param className - Additional CSS classes
 * @returns JSX element representing the table cell
 */
export function TableCell({ children, className }: TableCellProps) {
  return (
    <td className={clsx("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}>
      {children}
    </td>
  )
}
