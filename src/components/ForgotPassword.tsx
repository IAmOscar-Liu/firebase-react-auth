import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

interface Props {}

const ForgotPassword: React.FC<Props> = () => {
  const emailRef = useRef<any>();
  const { resetPassword } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    try {
      setMessage('');
      setError("");
      setLoading(true);
      await resetPassword!(emailRef.current.value as string);
      setMessage('Check your inbox for further instructions');
    } catch (error) {
      setError("Failed to reset password");
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant='success'>{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
                Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
              <Link to='/login'>Login</Link>
          </div>

        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to='/signup'>Sign up</Link>
      </div>
    </>
  );
};
export default ForgotPassword;