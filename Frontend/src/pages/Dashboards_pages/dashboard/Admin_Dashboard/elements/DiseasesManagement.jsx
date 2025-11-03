"use client"

import { useMemo, useState } from "react"
import { MdAdd, MdDelete, MdEdit } from "react-icons/md"
import Modal from "../../../../../components/Modal"

const SEVERITY = ["Low", "Medium", "High"]

const DiseasesManagement = ({ diseases, onAdd, onUpdate, onDelete }) => {
  const [query, setQuery] = useState("")
  const [severity, setSeverity] = useState("All")
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: "", category: "", severity: "Low", cases: 0 })

  const filtered = useMemo(() => {
    let arr = [...diseases]
    if (query.trim()) {
      const q = query.toLowerCase()
      arr = arr.filter((d) => d.name.toLowerCase().includes(q) || d.category.toLowerCase().includes(q))
    }
    if (severity !== "All") arr = arr.filter((d) => d.severity === severity)
    return arr
  }, [diseases, query, severity])

  const reset = () => {
    setForm({ name: "", category: "", severity: "Low", cases: 0 })
    setEditing(null)
  }

  const openCreate = () => {
    reset()
    setOpen(true)
  }
  const openEdit = (d) => {
    setEditing(d)
    setForm({ name: d.name, category: d.category, severity: d.severity, cases: d.cases })
    setOpen(true)
  }
  const submit = () => {
    if (!form.name || !form.category) return
    const payload = { ...form, cases: Number(form.cases || 0) }
    if (editing) onUpdate(editing.id, payload)
    else onAdd(payload)
    setOpen(false)
    reset()
  }

  return (
    <div className="bg-card rounded-lg shadow-sm p-6 border border-gray-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-xl font-bold">Disease Categories</h3>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <input
            className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-2 bg-card"
            placeholder="Search by name/category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-md px-3 py-2 bg-card"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
          >
            <option>All</option>
            {SEVERITY.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <button
            className="bg-emerald-600 text-white px-4 py-2 rounded-md flex items-center gap-2 justify-center"
            onClick={openCreate}
          >
            <MdAdd /> Add Disease
          </button>
        </div>
      </div>

      {/* Yahan grid ko flex mein change kiya hai */}
      <div className="flex flex-wrap gap-4">
        {filtered.map((disease) => (
          <div
            key={disease.id}
            className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow bg-secondary"
            style={{ flex: "1 1 calc(33.333% - 16px)", minWidth: "250px", maxWidth: "100%" }}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold break-words">{disease.name}</h4>
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
            <p className="text-muted-foreground text-sm mb-2 break-words">Category: {disease.category}</p>
            <p className="text-primary font-semibold">Cases: {disease.cases}</p>
            <div className="flex gap-2 mt-3">
              <button className="text-primary text-sm flex items-center gap-1" onClick={() => openEdit(disease)}>
                <MdEdit /> Edit
              </button>
              <button
                className="text-red-600 text-sm flex items-center gap-1"
                onClick={() => {
                  if (confirm("Delete this disease?")) onDelete(disease.id)
                }}
              >
                <MdDelete /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={open}
        title={editing ? "Edit Disease" : "Add Disease"}
        onClose={() => setOpen(false)}
        actions={
          <>
            <button className="px-4 py-2 rounded-md border border-gray-300" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground" onClick={submit}>
              Save
            </button>
          </>
        }
      >
        {/* Yahan bhi grid ko flex mein change kiya hai */}
        <div className="flex flex-wrap gap-3">
          <label className="text-sm" style={{ flex: "1 1 calc(50% - 12px)", minWidth: "200px" }}>
            <span className="block mb-1 text-muted-foreground">Name</span>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g., Coronary Artery Disease"
            />
          </label>
          <label className="text-sm" style={{ flex: "1 1 calc(50% - 12px)", minWidth: "200px" }}>
            <span className="block mb-1 text-muted-foreground">Category</span>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              placeholder="e.g., Cardiology"
            />
          </label>
          <label className="text-sm" style={{ flex: "1 1 calc(50% - 12px)", minWidth: "200px" }}>
            <span className="block mb-1 text-muted-foreground">Severity</span>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.severity}
              onChange={(e) => setForm((f) => ({ ...f, severity: e.target.value }))}
            >
              {SEVERITY.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="text-sm" style={{ flex: "1 1 calc(50% - 12px)", minWidth: "200px" }}>
            <span className="block mb-1 text-muted-foreground">Cases</span>
            <input
              type="number"
              min="0"
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.cases}
              onChange={(e) => setForm((f) => ({ ...f, cases: e.target.value }))}
              placeholder="0"
            />
          </label>
        </div>
      </Modal>
    </div>
  )
}

export default DiseasesManagement