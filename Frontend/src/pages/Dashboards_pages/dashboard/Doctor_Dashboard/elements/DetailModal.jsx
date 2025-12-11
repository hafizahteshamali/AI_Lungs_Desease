"use client"

import { useEffect } from "react"

// Yeh component ek reusable modal display karta hai
const DetailModal = ({ open, onClose, title, children }) => {
  // Yeh useEffect Escape key handle karta hai modal close karne ke liye
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.() // Escape key press par onClose function call karta hai
    if (open) window.addEventListener("keydown", onEsc) // Agar modal open hai toh event listener add karta hai
    return () => window.removeEventListener("keydown", onEsc) // Cleanup function jo component unmount par event listener remove karta hai
  }, [open, onClose]) // Jab open ya onClose change ho tab re-run karta hai

  // Agar modal open nahi hai toh kuch bhi render nahi karta
  if (!open) return null

  return (
    // Main modal overlay jo puri screen cover karta hai
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop jo background ko dim karta hai aur click par modal close karta hai */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      
      {/* Modal content container */}
      <div className="relative z-10 w-full max-w-lg bg-card text-card-foreground rounded-lg border border-border shadow-lg">
        {/* Modal header jo title aur close button dikhata hai */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h4 className="text-base font-semibold text-foreground">{title}</h4> {/* Modal title */}
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Close">
            {"✕"} {/* Close button icon */}
          </button>
        </div>
        
        {/* Modal body jo dynamic content (children) display karta hai */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}

export default DetailModal;