import { motion } from 'framer-motion'
import DataTable from '../../components/DataTable'
import FilterBar from '../../components/FilterBar'
import StatusBadge from '../../components/StatusBadge'
import { getUsers } from '../../services/usersService'

function UsersPage() {
  const users = getUsers()

  return (
    <motion.div className="mt-7 space-y-5" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
      <div className="flex justify-end">
        <FilterBar searchPlaceholder="Search users" actionLabel="Add User" />
      </div>
      <DataTable
        columns={['Name', 'Email', 'Role', 'Status']}
        rows={users}
        renderRow={(user) => (
          <tr key={user.email} className="border-b border-slate-100 bg-white text-slate-950 last:border-b-0">
            <td className="px-5 py-5 font-semibold">{user.name}</td>
            <td className="px-5 py-5">{user.email}</td>
            <td className="px-5 py-5">{user.role}</td>
            <td className="px-5 py-5">
              <StatusBadge status={user.status} />
            </td>
          </tr>
        )}
      />
    </motion.div>
  )
}

export default UsersPage


