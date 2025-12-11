"use client"

import { useMemo, useState } from "react"
import { MdAdd, MdDelete, MdEdit, MdFilterList, MdSearch } from "react-icons/md"
import Modal from "../../../../../components/Modal"

// Yeh constant user roles define karta hai
const ROLES = ["Doctor", "Radiographer", "Patient"]
// Yeh constant user statuses define karta hai
const STATUSES = ["Active", "Inactive"]

// Yeh component users management handle karta hai - CRUD operations aur filtering
const UsersManagement = ({ users, onAdd, onUpdate, onDelete }) => {
  // Yeh state search query ko track karta hai
  const [query, setQuery] = useState("")
  // Yeh state role filter ko track karta hai
  const [role, setRole] = useState("All")
  // Yeh state status filter ko track karta hai
  const [status, setStatus] = useState("All")
  // Yeh state sorting criteria ko track karta hai
  const [sortBy, setSortBy] = useState("joinDate-desc")

  // Yeh state modal open/close ko control karta hai
  const [open, setOpen] = useState(false)
  // Yeh state batata hai ke kya hum edit mode mein hain
  const [editing, setEditing] = useState(null)
  // Yeh state form data ko store karta hai
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Doctor",
    status: "Active",
    joinDate: "",
  })

  // Yeh function form ko reset karta hai
  const resetForm = () => {
    setForm({ name: "", email: "", role: "Doctor", status: "Active", joinDate: "" }) // Form ko initial values par set karta hai
    setEditing(null) // Edit mode band karta hai
  }

  // Yeh function new user create karne ke liye modal open karta hai
  const openCreate = () => {
    resetForm() // Form reset karta hai
    setOpen(true) // Modal open karta hai
  }
  
  // Yeh function existing user edit karne ke liye modal open karta hai
  const openEdit = (u) => {
    setEditing(u) // Editing state mein user set karta hai
    setForm({ name: u.name, email: u.email, role: u.role, status: u.status, joinDate: u.joinDate }) // Form mein existing data fill karta hai
    setOpen(true) // Modal open karta hai
  }

  // Yeh function form submit handle karta hai
  const submit = () => {
    // Validation check karta hai - name, email aur joinDate required hain
    if (!form.name || !form.email || !form.joinDate) return
    // Agar edit mode mein hai toh update function call karta hai
    if (editing) {
      onUpdate(editing.id, form)
    } else {
      // Agar create mode mein hai toh add function call karta hai
      onAdd(form)
    }
    setOpen(false) // Modal band karta hai
    resetForm() // Form reset karta hai
  }

  // Yeh useMemo filtered aur sorted users calculate karta hai
  const data = useMemo(() => {
    // Users ki copy create karta hai
    let arr = [...users]
    // Agar search query hai toh filter karta hai
    if (query.trim()) {
      const q = query.toLowerCase()
      // Name ya email mein search karta hai
      arr = arr.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
    }
    // Agar role filter "All" nahi hai toh uske hisaab se filter karta hai
    if (role !== "All") arr = arr.filter((u) => u.role === role)
    // Agar status filter "All" nahi hai toh uske hisaab se filter karta hai
    if (status !== "All") arr = arr.filter((u) => u.status === status)

    // Sorting logic implement karta hai
    const [key, dir] = sortBy.split("-") // Sort key aur direction separate karta hai
    arr.sort((a, b) => {
      let av = a[key], bv = b[key] // Values get karta hai
      // Agar joinDate sort kar rahe hain toh date objects mein convert karta hai
      if (key === "joinDate") {
        av = new Date(a.joinDate).getTime() // Date ko timestamp mein convert karta hai
        bv = new Date(b.joinDate).getTime()
      } else {
        // String values ko lowercase mein convert karta hai case-insensitive comparison ke liye
        av = String(av).toLowerCase()
        bv = String(bv).toLowerCase()
      }
      // Comparison logic based on sort direction
      if (av < bv) return dir === "asc" ? -1 : 1
      if (av > bv) return dir === "asc" ? 1 : -1
      return 0
    })
    return arr // Sorted array return karta hai
  }, [users, query, role, status, sortBy]) // Jab inme se koi bhi change ho tab re-calculate karta hai

  return (
    // Main container div jo card style provide karta hai
    <div className="bg-card rounded-lg shadow-sm p-6 border border-gray-300">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-xl font-bold">Manage Users</h3>
        {/* Add New User button jo modal open karta hai */}
        <button
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2 w-full sm:w-auto justify-center border border-gray-300"
          onClick={openCreate}
        >
          <MdAdd /> Add New User
        </button>
      </div>

      {/* Search and Filters Section */}
      <div className="flex flex-col lg:flex-row gap-3 mb-4">
        {/* Search input with icon */}
        <div className="flex-1 relative">
          <MdSearch className="absolute left-3 top-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-card"
            value={query}
            onChange={(e) => setQuery(e.target.value)} // Search query update karta hai
          />
        </div>

        {/* Filters section */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="hidden sm:inline text-sm text-muted-foreground">
            <MdFilterList className="inline mr-1" />
            Filters
          </span>
          {/* Role filter dropdown */}
          <select
            className="border border-gray-300 rounded-md px-3 py-2 bg-card"
            value={role}
            onChange={(e) => setRole(e.target.value)} // Role filter update karta hai
          >
            <option>All</option>
            {/* Sab roles render karta hai */}
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          {/* Status filter dropdown */}
          <select
            className="border border-gray-300 rounded-md px-3 py-2 bg-card"
            value={status}
            onChange={(e) => setStatus(e.target.value)} // Status filter update karta hai
          >
            <option>All</option>
            {/* Sab statuses render karta hai */}
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          {/* Sort by dropdown */}
          <select
            className="border border-gray-300 rounded-md px-3 py-2 bg-card"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)} // Sort criteria update karta hai
          >
            <option value="joinDate-desc">Newest</option>
            <option value="joinDate-asc">Oldest</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
          </select>
        </div>
      </div>

      {/* Mobile Cards View */}
      <div className="flex flex-col gap-3 sm:hidden">
        {/* Har filtered user ke liye card render karta hai */}
        {data.map((user) => (
          <div key={user.id} className="bg-secondary rounded-lg p-4 border border-gray-300">
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col">
                <h4 className="font-semibold">{user.name}</h4>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              {/* Status badge jo color-coded hai */}
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  user.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                }`}
              >
                {user.status}
              </span>
            </div>

            {/* User details flex layout mein */}
            <div className="flex flex-wrap gap-4 text-sm mb-3">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Role:</span>
                {/* Role badge jo color-coded hai */}
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    user.role === "Doctor"
                      ? "bg-blue-100 text-blue-800"
                      : user.role === "Patient"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-cyan-100 text-cyan-800"
                  }`}
                >
                  {user.role}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Join Date:</span>
                <span>{user.joinDate}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-2">
              {/* Edit button */}
              <button className="text-primary hover:underline p-1" onClick={() => openEdit(user)}>
                <MdEdit className="text-lg" />
              </button>
              {/* Delete button */}
              <button
                className="text-red-600 hover:underline p-1"
                onClick={() => {
                  // Confirmation dialog show karta hai
                  if (confirm("Delete this user?")) onDelete(user.id) // Delete function call karta hai
                }}
              >
                <MdDelete className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <div className="flex flex-col gap-2 min-w-[700px]">
          {/* Har filtered user ke liye row render karta hai */}
          {data.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 border-b border-gray-300 hover:bg-accent rounded-md gap-4"
            >
              {/* User name aur email */}
              <div className="flex flex-1 min-w-0">
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="font-medium truncate">{user.name}</div>
                  <div className="text-sm text-muted-foreground truncate">{user.email}</div>
                </div>
              </div>

              {/* User details aur actions */}
              <div className="flex items-center gap-4 flex-1 justify-between">
                <div className="flex items-center gap-4 flex-1">
                  {/* Role badge */}
                  <span
                    className={`px-2 py-1 rounded-full text-xs min-w-20 text-center ${
                      user.role === "Doctor"
                        ? "bg-blue-100 text-blue-800"
                        : user.role === "Patient"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-cyan-100 text-cyan-800"
                    }`}
                  >
                    {user.role}
                  </span>

                  {/* Status badge */}
                  <span
                    className={`px-2 py-1 rounded-full text-xs min-w-20 text-center ${
                      user.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>

                  {/* Join date */}
                  <div className="text-sm text-muted-foreground min-w-24">{user.joinDate}</div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  {/* Edit button */}
                  <button className="text-primary hover:underline p-1" onClick={() => openEdit(user)}>
                    <MdEdit className="text-lg" />
                  </button>
                  {/* Delete button */}
                  <button
                    className="text-red-600 hover:underline p-1"
                    onClick={() => {
                      // Confirmation dialog show karta hai
                      if (confirm("Delete this user?")) onDelete(user.id) // Delete function call karta hai
                    }}
                  >
                    <MdDelete className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal component jo user add/edit form dikhata hai */}
      <Modal
        open={open}
        title={editing ? "Edit User" : "Add User"}
        onClose={() => setOpen(false)}
        actions={
          <div className="flex gap-2">
            {/* Cancel button jo modal band karta hai */}
            <button className="px-4 py-2 rounded-md border border-gray-300" onClick={() => setOpen(false)}>
              Cancel
            </button>
            {/* Save button jo form submit karta hai */}
            <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground" onClick={submit}>
              Save
            </button>
          </div>
        }
      >
        {/* Form fields jo flexible layout mein hain */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          {/* Name input field */}
          <div className="flex flex-col flex-1 min-w-200px">
            <label className="text-sm mb-1 text-muted-foreground">Name</label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} // Form name update karta hai
              placeholder="Enter name"
            />
          </div>
          {/* Email input field */}
          <div className="flex flex-col flex-1 min-w-200px">
            <label className="text-sm mb-1 text-muted-foreground">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} // Form email update karta hai
              placeholder="Enter email"
            />
          </div>
          {/* Role dropdown */}
          <div className="flex flex-col flex-1 min-w-200px">
            <label className="text-sm mb-1 text-muted-foreground">Role</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} // Form role update karta hai
            >
              {/* Sab roles render karta hai */}
              {ROLES.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
          {/* Status dropdown */}
          <div className="flex flex-col flex-1 min-w-200px">
            <label className="text-sm mb-1 text-muted-foreground">Status</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} // Form status update karta hai
            >
              {/* Sab statuses render karta hai */}
              {STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          {/* Join date input field */}
          <div className="flex flex-col w-full">
            <label className="text-sm mb-1 text-muted-foreground">Join Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.joinDate}
              onChange={(e) => setForm((f) => ({ ...f, joinDate: e.target.value }))} // Form join date update karta hai
            />
          </div>
        </div>
      </Modal>

      {/* Inline CSS jo min-width define karta hai */}
      <style jsx>{`
        .min-w-200px {
          min-width: 200px;
        }
      `}</style>
    </div>
  )
}

export default UsersManagement