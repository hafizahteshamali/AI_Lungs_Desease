// Yeh utility functions date/time formatting aur styling classes provide karte hain
export const formatTime = (dateString) => {
  // Yeh function date string ko formatted time mein convert karta hai
  const d = new Date(dateString) // Date string ko Date object mein convert karta hai
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) // Time ko HH:MM format mein return karta hai
}

export const formatDate = (dateString) => {
  // Yeh function date string ko formatted date mein convert karta hai
  const d = new Date(dateString) // Date string ko Date object mein convert karta hai
  return d.toLocaleDateString() // Date ko locale-specific format mein return karta hai
}

// Map priority/urgency to token-friendly classes (no hard-coded colors)
// Yeh function priority/urgency level ke hisaab se Tailwind CSS classes return karta hai
export const priorityClasses = (level) => {
  switch (level) {
    case "urgent":
      return "bg-destructive/10 text-destructive" // Red background (10% opacity) with red text
    case "high":
      return "bg-primary/10 text-primary" // Primary color background (10% opacity) with primary text
    case "medium":
      return "bg-secondary/10 text-secondary-foreground" // Secondary background (10% opacity) with secondary text
    case "low":
      return "bg-muted text-muted-foreground" // Muted background with muted text
    default:
      return "bg-muted text-muted-foreground" // Default case ke liye muted styling
  }
}

// Yeh function status ke hisaab se text color classes return karta hai
export const statusIconColor = (status) => {
  // Semantic choice: normal → text-primary, abnormal/pending → text-destructive/text-muted-foreground
  if (status === "normal") return "text-primary" // Normal status ke liye primary color
  if (status === "confirmed") return "text-primary" // Confirmed status ke liye primary color
  if (status === "pending") return "text-muted-foreground" // Pending status ke liye muted color
  return "text-destructive" // All other cases (abnormal, etc.) ke liye destructive (red) color
}