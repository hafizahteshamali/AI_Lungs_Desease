"use client"

import { useMemo, useState } from "react"
import { MdAdd, MdDelete, MdEdit } from "react-icons/md"
import Modal from "../../../../../components/Modal"

// Yeh constant disease severity levels define karta hai
const SEVERITY = ["Low", "Medium", "High"]

// Yeh component diseases management handle karta hai - CRUD operations
const DiseasesManagement = ({ diseases, onAdd, onUpdate, onDelete }) => {
  // Yeh state search query ko track karta hai
  const [query, setQuery] = useState("")
  // Yeh state selected severity filter ko track karta hai
  const [severity, setSeverity] = useState("All")
  // Yeh state modal open/close ko control karta hai
  const [open, setOpen] = useState(false)
  // Yeh state batata hai ke kya hum edit mode mein hain
  const [editing, setEditing] = useState(null)
  // Yeh state form data ko store karta hai
  const [form, setForm] = useState({ name: "", category: "", severity: "Low", cases: 0 })

  // Yeh useMemo filtered diseases calculate karta hai based on search and filter
  const filtered = useMemo(() => {
    // Diseases ki copy create karta hai
    let arr = [...diseases]
    // Agar search query hai toh filter karta hai
    if (query.trim()) {
      const q = query.toLowerCase()
      // Name ya category mein search karta hai
      arr = arr.filter((d) => d.name.toLowerCase().includes(q) || d.category.toLowerCase().includes(q))
    }
    // Agar severity filter "All" nahi hai toh uske hisaab se filter karta hai
    if (severity !== "All") arr = arr.filter((d) => d.severity === severity)
    // Filtered array return karta hai
    return arr
  }, [diseases, query, severity]) // Jab diseases, query ya severity change ho tab re-calculate karta hai

  // Yeh function form ko reset karta hai
  const reset = () => {
    // Form ko initial values par set karta hai
    setForm({ name: "", category: "", severity: "Low", cases: 0 })
    // Edit mode band karta hai
    setEditing(null)
  }

  // Yeh function new disease create karne ke liye modal open karta hai
  const openCreate = () => {
    reset() // Form reset karta hai
    setOpen(true) // Modal open karta hai
  }
  
  // Yeh function existing disease edit karne ke liye modal open karta hai
  const openEdit = (d) => {
    setEditing(d) // Editing state mein disease set karta hai
    setForm({ name: d.name, category: d.category, severity: d.severity, cases: d.cases }) // Form mein existing data fill karta hai
    setOpen(true) // Modal open karta hai
  }
  
  // Yeh function form submit handle karta hai
  const submit = () => {
    // Validation check karta hai - name aur category required hain
    if (!form.name || !form.category) return
    // Payload create karta hai - cases ko number mein convert karta hai
    const payload = { ...form, cases: Number(form.cases || 0) }
    // Agar edit mode mein hai toh update function call karta hai
    if (editing) onUpdate(editing.id, payload)
    // Agar create mode mein hai toh add function call karta hai
    else onAdd(payload)
    setOpen(false) // Modal band karta hai
    reset() // Form reset karta hai
  }

  return (
    // Main container div jo card style provide karta hai
    <div className="bg-card rounded-lg shadow-sm p-6 border border-gray-300">
      {/* Header section jo search aur add button dikhata hai */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-xl font-bold">Disease Categories</h3>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {/* Search input jo diseases search karta hai */}
          <input
            className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-2 bg-card"
            placeholder="Search by name/category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)} // Search query update karta hai
          />
          {/* Severity filter dropdown */}
          <select
            className="border border-gray-300 rounded-md px-3 py-2 bg-card"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)} // Severity filter update karta hai
          >
            <option>All</option>
            {/* Sab severity options render karta hai */}
            {SEVERITY.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          {/* Add Disease button jo modal open karta hai */}
          <button
            className="bg-emerald-600 text-white px-4 py-2 rounded-md flex items-center gap-2 justify-center"
            onClick={openCreate}
          >
            <MdAdd /> Add Disease
          </button>
        </div>
      </div>

      {/* Diseases grid jo flexible cards mein diseases display karta hai */}
      <div className="flex flex-wrap gap-4">
        {/* Har filtered disease ke liye card render karta hai */}
        {filtered.map((disease) => (
          <div
            key={disease.id}
            className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow bg-secondary"
            style={{ flex: "1 1 calc(33.333% - 16px)", minWidth: "250px", maxWidth: "100%" }}
          >
            {/* Card header jo name aur severity dikhata hai */}
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold break-words">{disease.name}</h4>
              {/* Severity badge jo color-coded hai */}
              <span
                className={`px-2 py-1 rounded text-xs ${
                  disease.severity === "High"
                    ? "bg-red-100 text-red-800"
                    : disease.severity === "Medium"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {disease.severity}
              </span>
            </div>
            {/* Disease category display karta hai */}
            <p className="text-muted-foreground text-sm mb-2 break-words">Category: {disease.category}</p>
            {/* Disease cases count display karta hai */}
            <p className="text-primary font-semibold">Cases: {disease.cases}</p>
            {/* Action buttons section */}
            <div className="flex gap-2 mt-3">
              {/* Edit button jo edit modal open karta hai */}
              <button className="text-primary text-sm flex items-center gap-1" onClick={() => openEdit(disease)}>
                <MdEdit /> Edit
              </button>
              {/* Delete button jo disease delete karta hai */}
              <button
                className="text-red-600 text-sm flex items-center gap-1"
                onClick={() => {
                  // Confirmation dialog show karta hai
                  if (confirm("Delete this disease?")) onDelete(disease.id) // Delete function call karta hai
                }}
              >
                <MdDelete /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal component jo disease add/edit form dikhata hai */}
      <Modal
        open={open}
        title={editing ? "Edit Disease" : "Add Disease"}
        onClose={() => setOpen(false)}
        actions={
          <>
            {/* Cancel button jo modal band karta hai */}
            <button className="px-4 py-2 rounded-md border border-gray-300" onClick={() => setOpen(false)}>
              Cancel
            </button>
            {/* Save button jo form submit karta hai */}
            <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground" onClick={submit}>
              Save
            </button>
          </>
        }
      >
        {/* Form fields jo flex layout mein hain */}
        <div className="flex flex-wrap gap-3">
          {/* Disease name input field */}
          <label className="text-sm" style={{ flex: "1 1 calc(50% - 12px)", minWidth: "200px" }}>
            <span className="block mb-1 text-muted-foreground">Name</span>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} // Form name update karta hai
              placeholder="e.g., Coronary Artery Disease"
            />
          </label>
          {/* Disease category input field */}
          <label className="text-sm" style={{ flex: "1 1 calc(50% - 12px)", minWidth: "200px" }}>
            <span className="block mb-1 text-muted-foreground">Category</span>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} // Form category update karta hai
              placeholder="e.g., Cardiology"
            />
          </label>
          {/* Disease severity dropdown */}
          <label className="text-sm" style={{ flex: "1 1 calc(50% - 12px)", minWidth: "200px" }}>
            <span className="block mb-1 text-muted-foreground">Severity</span>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.severity}
              onChange={(e) => setForm((f) => ({ ...f, severity: e.target.value }))} // Form severity update karta hai
            >
              {/* Sab severity options render karta hai */}
              {SEVERITY.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          {/* Disease cases number input */}
          <label className="text-sm" style={{ flex: "1 1 calc(50% - 12px)", minWidth: "200px" }}>
            <span className="block mb-1 text-muted-foreground">Cases</span>
            <input
              type="number"
              min="0"
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.cases}
              onChange={(e) => setForm((f) => ({ ...f, cases: e.target.value }))} // Form cases update karta hai
              placeholder="0"
            />
          </label>
        </div>
      </Modal>
    </div>
  )
}

export default DiseasesManagement