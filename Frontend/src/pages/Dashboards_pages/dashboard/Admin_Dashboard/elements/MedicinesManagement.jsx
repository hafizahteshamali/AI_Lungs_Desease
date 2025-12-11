"use client"

import { useMemo, useState } from "react"
import { MdAdd, MdDelete, MdEdit, MdFileDownload, MdSearch } from "react-icons/md"
import Modal from "../../../../../components/Modal"

// Yeh constant medicine types define karta hai
const TYPES = ["Tablet", "Capsule", "Syrup", "Injection"]

// Yeh component medicines management handle karta hai - CRUD operations aur export
const MedicinesManagement = ({ medicines, onAdd, onUpdate, onDelete }) => {
  // Yeh state search query ko track karta hai
  const [query, setQuery] = useState("")
  // Yeh state medicine type filter ko track karta hai
  const [type, setType] = useState("All")
  // Yeh state stock level filter ko track karta hai
  const [stockFilter, setStockFilter] = useState("All")
  // Yeh state modal open/close ko control karta hai
  const [open, setOpen] = useState(false)
  // Yeh state batata hai ke kya hum edit mode mein hain
  const [editing, setEditing] = useState(null)
  // Yeh state form data ko store karta hai
  const [form, setForm] = useState({ name: "", dosage: "", type: "Tablet", stock: 0, price: 0 })

  // Yeh useMemo filtered medicines calculate karta hai based on search and filters
  const filtered = useMemo(() => {
    // Medicines ki copy create karta hai
    let arr = [...medicines]
    // Agar search query hai toh filter karta hai
    if (query.trim()) {
      const q = query.toLowerCase()
      // Name ya dosage mein search karta hai
      arr = arr.filter((m) => m.name.toLowerCase().includes(q) || m.dosage.toLowerCase().includes(q))
    }
    // Agar type filter "All" nahi hai toh uske hisaab se filter karta hai
    if (type !== "All") arr = arr.filter((m) => m.type === type)
    // Agar stock filter "All" nahi hai toh uske hisaab se filter karta hai
    if (stockFilter !== "All") {
      if (stockFilter === "<500") arr = arr.filter((m) => m.stock < 500) // Low stock
      if (stockFilter === ">=500") arr = arr.filter((m) => m.stock >= 500) // Sufficient stock
    }
    // Filtered array return karta hai
    return arr
  }, [medicines, query, type, stockFilter]) // Jab medicines, query, type ya stockFilter change ho tab re-calculate karta hai

  // Yeh function form ko reset karta hai
  const reset = () => {
    // Form ko initial values par set karta hai
    setForm({ name: "", dosage: "", type: "Tablet", stock: 0, price: 0 })
    // Edit mode band karta hai
    setEditing(null)
  }

  // Yeh function new medicine create karne ke liye modal open karta hai
  const openCreate = () => {
    reset() // Form reset karta hai
    setOpen(true) // Modal open karta hai
  }
  
  // Yeh function existing medicine edit karne ke liye modal open karta hai
  const openEdit = (m) => {
    setEditing(m) // Editing state mein medicine set karta hai
    setForm({ name: m.name, dosage: m.dosage, type: m.type, stock: m.stock, price: m.price }) // Form mein existing data fill karta hai
    setOpen(true) // Modal open karta hai
  }

  // Yeh function form submit handle karta hai
  const submit = () => {
    // Validation check karta hai - name aur dosage required hain
    if (!form.name || !form.dosage) return
    // Payload create karta hai - stock aur price ko number mein convert karta hai
    const payload = { ...form, stock: Number(form.stock || 0), price: Number(form.price || 0) }
    // Agar edit mode mein hai toh update function call karta hai
    if (editing) onUpdate(editing.id, payload)
    // Agar create mode mein hai toh add function call karta hai
    else onAdd(payload)
    setOpen(false) // Modal band karta hai
    reset() // Form reset karta hai
  }

  // Yeh function medicines data ko CSV format mein export karta hai
  const exportCSV = () => {
    // CSV headers define karta hai
    const headers = ["id", "name", "dosage", "type", "stock", "price"]
    // Har medicine ke data ko array mein convert karta hai
    const rows = filtered.map((m) => [m.id, m.name, m.dosage, m.type, m.stock, m.price])
    // CSV string create karta hai
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n")
    // Blob create karta hai jisme CSV data hai
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    // Download URL generate karta hai
    const url = URL.createObjectURL(blob)
    // Anchor element create karta hai download ke liye
    const a = document.createElement("a")
    a.href = url
    a.download = "medicines.csv" // File name set karta hai
    a.click() // Automatically click simulate karta hai
    URL.revokeObjectURL(url) // Memory clean karta hai
  }

  return (
    // Main container div jo card style provide karta hai
    <div className="bg-card rounded-lg shadow-sm p-6 border border-gray-300">
      {/* Header section jo export aur add button dikhata hai */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-xl font-bold">Medicine Library</h3>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {/* Export button jo CSV download karta hai */}
          <button
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md justify-center text-sm w-full sm:w-auto"
            onClick={exportCSV}
          >
            <MdFileDownload /> Export
          </button>
          {/* Add Medicine button jo modal open karta hai */}
          <button
            className="bg-cyan-600 text-white px-4 py-2 rounded-md flex items-center gap-2 w-full sm:w-auto justify-center"
            onClick={openCreate}
          >
            <MdAdd /> Add Medicine
          </button>
        </div>
      </div>

      {/* Filters section jo search aur dropdown filters dikhata hai */}
      <div className="flex flex-col lg:flex-row gap-3 mb-4">
        {/* Search input with icon */}
        <div className="flex-1 relative">
          <MdSearch className="absolute left-3 top-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search medicines..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-card"
            value={query}
            onChange={(e) => setQuery(e.target.value)} // Search query update karta hai
          />
        </div>
        {/* Medicine type filter dropdown */}
        <select
          className="border border-gray-300 rounded-md px-3 py-2 bg-card"
          value={type}
          onChange={(e) => setType(e.target.value)} // Type filter update karta hai
        >
          <option>All</option>
          {/* Sab medicine types render karta hai */}
          {TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        {/* Stock level filter dropdown */}
        <select
          className="border border-gray-300 rounded-md px-3 py-2 bg-card"
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)} // Stock filter update karta hai
        >
          <option>All</option>
          <option value="<500">Stock &lt; 500</option>
          <option value=">=500">Stock ≥ 500</option>
        </select>
      </div>

      {/* Mobile view jo small screens ke liye cards dikhata hai */}
      <div className="space-y-3 sm:hidden">
        {/* Har filtered medicine ke liye card render karta hai */}
        {filtered.map((m) => (
          <div key={m.id} className="bg-secondary p-4 rounded-lg border border-gray-300">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold">{m.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {m.dosage} • {m.type}
                </p>
              </div>
              {/* Stock count jo color-coded hai */}
              <span className={`text-sm font-semibold ${m.stock < 500 ? "text-red-600" : "text-emerald-600"}`}>
                {m.stock.toLocaleString()} {/* Stock ko formatted string mein convert karta hai */}
              </span>
            </div>
            {/* Medicine details flex layout mein */}
            <div className="flex flex-wrap gap-2 text-sm mb-3">
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Type:</span>
                <span className="bg-accent px-2 py-1 rounded-md text-xs">{m.type}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Price:</span>
                <span className="font-semibold">${m.price}</span>
              </div>
            </div>
            {/* Action buttons */}
            <div className="flex justify-end gap-2">
              {/* Edit button */}
              <button className="text-primary hover:underline p-1" onClick={() => openEdit(m)}>
                <MdEdit className="text-lg" />
              </button>
              {/* Delete button */}
              <button
                className="text-red-600 hover:underline p-1"
                onClick={() => {
                  // Confirmation dialog show karta hai
                  if (confirm("Delete this medicine?")) onDelete(m.id) // Delete function call karta hai
                }}
              >
                <MdDelete className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view jo table style mein data dikhata hai */}
      <div className="hidden sm:block overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Har filtered medicine ke liye row render karta hai */}
          {filtered.map((m) => (
            <div
              key={m.id}
              className="flex items-center p-4 border-b border-gray-300 hover:bg-accent rounded-md gap-4"
            >
              {/* Medicine name aur dosage */}
              <div className="flex-1 min-w-0" style={{ flex: "3" }}>
                <div className="font-medium">{m.name}</div>
                <div className="text-sm text-muted-foreground">{m.dosage}</div>
              </div>
              {/* Medicine type */}
              <div className="flex-1 min-w-0" style={{ flex: "2" }}>
                <span className="bg-accent px-2 py-1 rounded-md text-xs">{m.type}</span>
              </div>
              {/* Stock count jo color-coded hai */}
              <div className="flex-1 min-w-0" style={{ flex: "2" }}>
                <span className={m.stock < 500 ? "text-red-600 font-semibold" : "text-emerald-600"}>
                  {m.stock.toLocaleString()}
                </span>
              </div>
              {/* Medicine price */}
              <div className="flex-1 min-w-0 font-semibold" style={{ flex: "2" }}>${m.price}</div>
              {/* Action buttons */}
              <div className="flex-1 min-w-0 flex gap-2 justify-end" style={{ flex: "3" }}>
                {/* Edit button */}
                <button className="text-primary hover:underline p-1" onClick={() => openEdit(m)}>
                  <MdEdit className="text-lg" />
                </button>
                {/* Delete button */}
                <button
                  className="text-red-600 hover:underline p-1"
                  onClick={() => {
                    // Confirmation dialog show karta hai
                    if (confirm("Delete this medicine?")) onDelete(m.id) // Delete function call karta hai
                  }}
                >
                  <MdDelete className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal component jo medicine add/edit form dikhata hai */}
      <Modal
        open={open}
        title={editing ? "Edit Medicine" : "Add Medicine"}
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
          {/* Medicine name input field */}
          <label className="text-sm" style={{ flex: "1 1 calc(50% - 12px)", minWidth: "200px" }}>
            <span className="block mb-1 text-muted-foreground">Name</span>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} // Form name update karta hai
              placeholder="e.g., Paracetamol"
            />
          </label>
          {/* Medicine dosage input field */}
          <label className="text-sm" style={{ flex: "1 1 calc(50% - 12px)", minWidth: "200px" }}>
            <span className="block mb-1 text-muted-foreground">Dosage</span>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.dosage}
              onChange={(e) => setForm((f) => ({ ...f, dosage: e.target.value }))} // Form dosage update karta hai
              placeholder="e.g., 500mg"
            />
          </label>
          {/* Medicine type dropdown */}
          <label className="text-sm" style={{ flex: "1 1 calc(50% - 12px)", minWidth: "200px" }}>
            <span className="block mb-1 text-muted-foreground">Type</span>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} // Form type update karta hai
            >
              {/* Sab medicine types render karta hai */}
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          {/* Stock count number input */}
          <label className="text-sm" style={{ flex: "1 1 calc(50% - 12px)", minWidth: "200px" }}>
            <span className="block mb-1 text-muted-foreground">Stock</span>
            <input
              type="number"
              min="0"
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.stock}
              onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))} // Form stock update karta hai
              placeholder="0"
            />
          </label>
          {/* Price input field */}
          <label className="text-sm" style={{ flex: "1 1 100%", minWidth: "200px" }}>
            <span className="block mb-1 text-muted-foreground">Price (USD)</span>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} // Form price update karta hai
              placeholder="0.00"
            />
          </label>
        </div>
      </Modal>
    </div>
  )
}

export default MedicinesManagement