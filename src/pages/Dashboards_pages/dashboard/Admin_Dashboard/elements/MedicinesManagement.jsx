"use client"

import { useMemo, useState } from "react"
import { MdAdd, MdDelete, MdEdit, MdFileDownload, MdSearch } from "react-icons/md"
import Modal from "../../../../../components/Modal"

const TYPES = ["Tablet", "Capsule", "Syrup", "Injection"]

const MedicinesManagement = ({ medicines, onAdd, onUpdate, onDelete }) => {
  const [query, setQuery] = useState("")
  const [type, setType] = useState("All")
  const [stockFilter, setStockFilter] = useState("All")
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: "", dosage: "", type: "Tablet", stock: 0, price: 0 })

  const filtered = useMemo(() => {
    let arr = [...medicines]
    if (query.trim()) {
      const q = query.toLowerCase()
      arr = arr.filter((m) => m.name.toLowerCase().includes(q) || m.dosage.toLowerCase().includes(q))
    }
    if (type !== "All") arr = arr.filter((m) => m.type === type)
    if (stockFilter !== "All") {
      if (stockFilter === "<500") arr = arr.filter((m) => m.stock < 500)
      if (stockFilter === ">=500") arr = arr.filter((m) => m.stock >= 500)
    }
    return arr
  }, [medicines, query, type, stockFilter])

  const reset = () => {
    setForm({ name: "", dosage: "", type: "Tablet", stock: 0, price: 0 })
    setEditing(null)
  }

  const openCreate = () => {
    reset()
    setOpen(true)
  }
  const openEdit = (m) => {
    setEditing(m)
    setForm({ name: m.name, dosage: m.dosage, type: m.type, stock: m.stock, price: m.price })
    setOpen(true)
  }

  const submit = () => {
    if (!form.name || !form.dosage) return
    const payload = { ...form, stock: Number(form.stock || 0), price: Number(form.price || 0) }
    if (editing) onUpdate(editing.id, payload)
    else onAdd(payload)
    setOpen(false)
    reset()
  }

  const exportCSV = () => {
    const headers = ["id", "name", "dosage", "type", "stock", "price"]
    const rows = filtered.map((m) => [m.id, m.name, m.dosage, m.type, m.stock, m.price])
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "medicines.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-card rounded-lg shadow-sm p-6 border border-gray-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-xl font-bold">Medicine Library</h3>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md justify-center text-sm w-full sm:w-auto"
            onClick={exportCSV}
          >
            <MdFileDownload /> Export
          </button>
          <button
            className="bg-cyan-600 text-white px-4 py-2 rounded-md flex items-center gap-2 w-full sm:w-auto justify-center"
            onClick={openCreate}
          >
            <MdAdd /> Add Medicine
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 mb-4">
        <div className="flex-1 relative">
          <MdSearch className="absolute left-3 top-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search medicines..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-card"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select
          className="border border-gray-300 rounded-md px-3 py-2 bg-card"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>All</option>
          {TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select
          className="border border-gray-300 rounded-md px-3 py-2 bg-card"
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
        >
          <option>All</option>
          <option value="<500">Stock &lt; 500</option>
          <option value=">=500">Stock ≥ 500</option>
        </select>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 sm:hidden">
        {filtered.map((m) => (
          <div key={m.id} className="bg-secondary p-4 rounded-lg border border-gray-300">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold">{m.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {m.dosage} • {m.type}
                </p>
              </div>
              <span className={`text-sm font-semibold ${m.stock < 500 ? "text-red-600" : "text-emerald-600"}`}>
                {m.stock.toLocaleString()}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div>
                <span className="text-muted-foreground">Type:</span>
                <span className="ml-2 bg-accent px-2 py-1 rounded-md text-xs">{m.type}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Price:</span>
                <span className="ml-2 font-semibold">${m.price}</span>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button className="text-primary hover:underline p-1" onClick={() => openEdit(m)}>
                <MdEdit className="text-lg" />
              </button>
              <button
                className="text-red-600 hover:underline p-1"
                onClick={() => {
                  if (confirm("Delete this medicine?")) onDelete(m.id)
                }}
              >
                <MdDelete className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <div className="grid grid-cols-1 gap-2 min-w-[800px]">
          {filtered.map((m) => (
            <div
              key={m.id}
              className="grid grid-cols-12 gap-4 items-center p-4 border-b border-gray-300 hover:bg-accent rounded-md"
            >
              <div className="col-span-3">
                <div className="font-medium">{m.name}</div>
                <div className="text-sm text-muted-foreground">{m.dosage}</div>
              </div>
              <div className="col-span-2">
                <span className="bg-accent px-2 py-1 rounded-md text-xs">{m.type}</span>
              </div>
              <div className="col-span-2">
                <span className={m.stock < 500 ? "text-red-600 font-semibold" : "text-emerald-600"}>
                  {m.stock.toLocaleString()}
                </span>
              </div>
              <div className="col-span-2 font-semibold">${m.price}</div>
              <div className="col-span-3 flex gap-2 justify-end">
                <button className="text-primary hover:underline p-1" onClick={() => openEdit(m)}>
                  <MdEdit className="text-lg" />
                </button>
                <button
                  className="text-red-600 hover:underline p-1"
                  onClick={() => {
                    if (confirm("Delete this medicine?")) onDelete(m.id)
                  }}
                >
                  <MdDelete className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={open}
        title={editing ? "Edit Medicine" : "Add Medicine"}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="text-sm">
            <span className="block mb-1 text-muted-foreground">Name</span>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g., Paracetamol"
            />
          </label>
          <label className="text-sm">
            <span className="block mb-1 text-muted-foreground">Dosage</span>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.dosage}
              onChange={(e) => setForm((f) => ({ ...f, dosage: e.target.value }))}
              placeholder="e.g., 500mg"
            />
          </label>
          <label className="text-sm">
            <span className="block mb-1 text-muted-foreground">Type</span>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
            >
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="block mb-1 text-muted-foreground">Stock</span>
            <input
              type="number"
              min="0"
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.stock}
              onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
              placeholder="0"
            />
          </label>
          <label className="text-sm sm:col-span-2">
            <span className="block mb-1 text-muted-foreground">Price (USD)</span>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              placeholder="0.00"
            />
          </label>
        </div>
      </Modal>
    </div>
  )
}

export default MedicinesManagement
