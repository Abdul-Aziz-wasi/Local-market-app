import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`https://local-market-omega.vercel.app/users?search=${search}`);
      setUsers(res.data);
    } catch {
      toast.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const handleRoleUpdate = async (id, newRole) => {
    try {
      await axios.patch(`https://local-market-omega.vercel.app/users/role/${id}`, { role: newRole });
      toast.success('Role updated');
      fetchUsers();
    } catch {
      toast.error('Failed to update role');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">👥 All Users</h2>

      {/* 🔍 Search bar */}
      <div className="mb-4 max-w-md">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Photo</th>
              <th>Current Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">No users found.</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <img src={user.photo} alt="user" className="w-10 h-10 rounded-full" />
                  </td>
                  <td>{user.role}</td>
                  <td className="space-x-2">
                    {user.role !== 'admin' && (
                      <button
                        onClick={() => handleRoleUpdate(user._id, 'admin')}
                        className="btn btn-sm btn-primary"
                      >
                        Make Admin
                      </button>
                    )}
                    {user.role !== 'vendor' && (
                      <button
                        onClick={() => handleRoleUpdate(user._id, 'vendor')}
                        className="btn btn-sm btn-success"
                      >
                        Make Vendor
                      </button>
                    )}
                    {user.role !== 'user' && (
                      <button
                        onClick={() => handleRoleUpdate(user._id, 'user')}
                        className="btn btn-sm btn-warning"
                      >
                        Make User
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
