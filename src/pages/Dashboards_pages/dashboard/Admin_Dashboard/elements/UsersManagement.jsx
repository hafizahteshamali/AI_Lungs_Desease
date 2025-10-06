"use client"

import { useMemo, useState } from "react"
import { MdAdd, MdDelete, MdEdit, MdFilterList, MdSearch } from "react-icons/md"
import Modal from "../../../../../components/Modal"

const ROLES = ["Doctor", "Radiographer", "Patient"]
const STATUSES = ["Active", "Inactive"]

const UsersManagement = ({ users, onAdd, onUpdate, onDelete }) => {
  const [query, setQuery] = useState("")
  const [role, setRole] = useState("All")
  const [status, setStatus] = useState("All")
  const [sortBy, setSortBy] = useState("joinDate-desc")

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Doctor",
    status: "Active",
    joinDate: "",
  })

  const resetForm = () => {
    setForm({ name: "", email: "", role: "Doctor", status: "Active", joinDate: "" })
    setEditing(null)
  }

  const openCreate = () => {
    resetForm()
    setOpen(true)
  }
  const openEdit = (u) => {
    setEditing(u)
    setForm({ name: u.name, email: u.email, role: u.role, status: u.status, joinDate: u.joinDate })
    setOpen(true)
  }

  const submit = () => {
    if (!form.name || !form.email || !form.joinDate) return
    if (editing) {
      onUpdate(editing.id, form)
    } else {
      onAdd(form)
    }
    setOpen(false)
    resetForm()
  }

  const data = useMemo(() => {
    let arr = [...users]
    if (query.trim()) {
      const q = query.toLowerCase()
      arr = arr.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
    }
    if (role !== "All") arr = arr.filter((u) => u.role === role)
    if (status !== "All") arr = arr.filter((u) => u.status === status)

    const [key, dir] = sortBy.split("-")
    arr.sort((a, b) => {
      let av = a[key],
        bv = b[key]
      if (key === "joinDate") {
        av = new Date(a.joinDate).getTime()
        bv = new Date(b.joinDate).getTime()
      } else {
        av = String(av).toLowerCase()
        bv = String(bv).toLowerCase()
      }
      if (av < bv) return dir === "asc" ? -1 : 1
      if (av > bv) return dir === "asc" ? 1 : -1
      return 0
    })
    return arr
  }, [users, query, role, status, sortBy])

  return (
    <div className="bg-card rounded-lg shadow-sm p-6 border border-gray-300">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-xl font-bold">Manage Users</h3>
        <button
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2 w-full sm:w-auto justify-center border border-gray-300"
          onClick={openCreate}
        >
          <MdAdd /> Add New User
        </button>
      </div>

      {/* Search and Filters Section */}
      <div className="flex flex-col lg:flex-row gap-3 mb-4">
        <div className="flex-1 relative">
          <MdSearch className="absolute left-3 top-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-card"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="hidden sm:inline text-sm text-muted-foreground">
            <MdFilterList className="inline mr-1" />
            Filters
          </span>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 bg-card"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>All</option>
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 bg-card"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All</option>
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 bg-card"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="joinDate-desc">Newest</option>
            <option value="joinDate-asc">Oldest</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
          </select>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-3 sm:hidden">
        {data.map((user) => (
          <div key={user.id} className="bg-secondary rounded-lg p-4 border border-gray-300">
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col">
                <h4 className="font-semibold">{user.name}</h4>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  user.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                }`}
              >
                {user.status}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-sm mb-3">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Role:</span>
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

            <div className="flex justify-end gap-2">
              <button className="text-primary hover:underline p-1" onClick={() => openEdit(user)}>
                <MdEdit className="text-lg" />
              </button>
              <button
                className="text-red-600 hover:underline p-1"
                onClick={() => {
                  if (confirm("Delete this user?")) onDelete(user.id)
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
        <div className="flex flex-col gap-2 min-w-[700px]">
          {data.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 border-b border-gray-300 hover:bg-accent rounded-md gap-4"
            >
              <div className="flex flex-1 min-w-0">
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="font-medium truncate">{user.name}</div>
                  <div className="text-sm text-muted-foreground truncate">{user.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-1 justify-between">
                <div className="flex items-center gap-4 flex-1">
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

                  <span
                    className={`px-2 py-1 rounded-full text-xs min-w-20 text-center ${
                      user.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>

                  <div className="text-sm text-muted-foreground min-w-24">{user.joinDate}</div>
                </div>

                <div className="flex gap-2">
                  <button className="text-primary hover:underline p-1" onClick={() => openEdit(user)}>
                    <MdEdit className="text-lg" />
                  </button>
                  <button
                    className="text-red-600 hover:underline p-1"
                    onClick={() => {
                      if (confirm("Delete this user?")) onDelete(user.id)
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

      {/* Modal */}
      <Modal
        open={open}
        title={editing ? "Edit User" : "Add User"}
        onClose={() => setOpen(false)}
        actions={
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-md border border-gray-300" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground" onClick={submit}>
              Save
            </button>
          </div>
        }
      >
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <div className="flex flex-col flex-1 min-w-200px">
            <label className="text-sm mb-1 text-muted-foreground">Name</label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Enter name"
            />
          </div>
          <div className="flex flex-col flex-1 min-w-200px">
            <label className="text-sm mb-1 text-muted-foreground">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="Enter email"
            />
          </div>
          <div className="flex flex-col flex-1 min-w-200px">
            <label className="text-sm mb-1 text-muted-foreground">Role</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
            >
              {ROLES.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col flex-1 min-w-200px">
            <label className="text-sm mb-1 text-muted-foreground">Status</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
            >
              {STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm mb-1 text-muted-foreground">Join Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-card"
              value={form.joinDate}
              onChange={(e) => setForm((f) => ({ ...f, joinDate: e.target.value }))}
            />
          </div>
        </div>
      </Modal>

      <style jsx>{`
        .min-w-200px {
          min-width: 200px;
        }
      `}</style>
    </div>
  )
}

export default UsersManagement
