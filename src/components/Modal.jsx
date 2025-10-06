"use client"
import { useEffect } from "react"

const Modal = ({ open, title, children, onClose, actions }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.()
    }
    if (open) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg border border-gray-300">
        <div className="px-5 py-4 border-b border-gray-300">
          <h3 id="modal-title" className="text-lg font-semibold">
            {title}
          </h3>
        </div>
        <div className="px-5 py-4 bg-white">{children}</div>
        <div className="px-5 py-4 border-t border-gray-300 bg-white flex gap-2 justify-end rounded-b-lg">{actions}</div>
      </div>
    </div>
  )
}

export default Modal