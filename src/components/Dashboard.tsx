import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

interface Props {}

const Dashboard: React.FC<Props> = () => {
  const [error, setError] = useState<string>("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setError("");
    
    try {
      await logout!();
      history.push("/login");
    } catch (error) {
      setError("Failed to log out");
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong> {currentUser?.email}
          <Link to="/update-profile" className="btn btn-primary w-100">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
};
export default Dashboard;
