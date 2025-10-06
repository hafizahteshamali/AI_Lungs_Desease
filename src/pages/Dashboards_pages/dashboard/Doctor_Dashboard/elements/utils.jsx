export const formatTime = (dateString) => {
    const d = new Date(dateString)
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }
  
  export const formatDate = (dateString) => {
    const d = new Date(dateString)
    return d.toLocaleDateString()
  }
  
  // Map priority/urgency to token-friendly classes (no hard-coded colors)
  export const priorityClasses = (level) => {
    switch (level) {
      case "urgent":
        return "bg-destructive/10 text-destructive"
      case "high":
        return "bg-primary/10 text-primary"
      case "medium":
        return "bg-secondary/10 text-secondary-foreground"
      case "low":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }
  
  export const statusIconColor = (status) => {
    // Semantic choice: normal → text-primary, abnormal/pending → text-destructive/text-muted-foreground
    if (status === "normal") return "text-primary"
    if (status === "confirmed") return "text-primary"
    if (status === "pending") return "text-muted-foreground"
    return "text-destructive"
  }
  