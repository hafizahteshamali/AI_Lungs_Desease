"use client"

import { useEffect } from "react"

const DetailModal = ({ open, onClose, title, children }) => {
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.()
    if (open) window.addEventListener("keydown", onEsc)
    return () => window.removeEventListener("keydown", onEsc)
  }, [open, onClose])

  if (!open) return null

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg bg-card text-card-foreground rounded-lg border border-border shadow-lg">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h4 className="text-base font-semibold text-foreground">{title}</h4>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Close">
            {"✕"}
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}

export default DetailModal;
