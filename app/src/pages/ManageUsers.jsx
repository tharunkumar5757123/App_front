import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Card, Spinner } from "react-bootstrap";
import { FaUserShield, FaTrashAlt, FaUserEdit } from "react-icons/fa";
import {
  fetchUsers,
  deleteUser,
  updateUser,
} from "../redux/actions/authActions";
import AlertBox from "../components/AlertBox";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleRoleChange = (id, newRole) => {
    if (window.confirm(`Change role to ${newRole}?`)) {
      dispatch(updateUser(id, { role: newRole }));
    }
  };

  return (
    <div className="container py-5">
      <Card className="shadow-sm border-0 p-4">
        <h3 className="fw-bold text-primary mb-4">
          <FaUserShield className="me-2" />
          Manage Users
        </h3>

        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <AlertBox type="danger" message={error} />
        ) : (
          <Table hover bordered responsive className="align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "admin"
                          ? "bg-danger"
                          : user.role === "host"
                          ? "bg-warning text-dark"
                          : "bg-success"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      {user.role !== "admin" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => handleRoleChange(user._id, "host")}
                          >
                            <FaUserEdit className="me-1" /> Make Host
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-success"
                            onClick={() => handleRoleChange(user._id, "user")}
                          >
                            <FaUserEdit className="me-1" /> Make User
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDelete(user._id)}
                      >
                        <FaTrashAlt />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default ManageUsers;
