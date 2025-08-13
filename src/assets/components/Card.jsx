// Utility function to combine class names (simplified version)
const cn = (...classes) => {
    return classes.filter(Boolean).join(" ")
  }
  
  export const Card = ({ className, children, ...props }) => {
    return (
      <div className={cn("bg-white border border-gray-200 rounded-lg shadow-sm", className)} {...props}>
        {children}
      </div>
    )
  }
  
  export const CardHeader = ({ className, children, ...props }) => {
    return (
      <div className={cn("px-6 py-4 border-b border-gray-200", className)} {...props}>
        {children}
      </div>
    )
  }
  
  export const CardTitle = ({ className, children, ...props }) => {
    return (
      <h3 className={cn("text-lg font-semibold text-gray-900", className)} {...props}>
        {children}
      </h3>
    )
  }
  
  export const CardDescription = ({ className, children, ...props }) => {
    return (
      <p className={cn("text-sm text-gray-600 mt-1", className)} {...props}>
        {children}
      </p>
    )
  }
  
  export const CardContent = ({ className, children, ...props }) => {
    return (
      <div className={cn("px-6 py-4", className)} {...props}>
        {children}
      </div>
    )
  }
  
  export const CardFooter = ({ className, children, ...props }) => {
    return (
      <div className={cn("px-6 py-4 border-t border-gray-200 bg-gray-50", className)} {...props}>
        {children}
      </div>
    )
  }
  