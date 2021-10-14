import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useHistory, Link } from 'react-router-dom';
import { Card, Alert, Form, Button } from 'react-bootstrap';

interface Props {
}

const UpdateProfile: React.FC<Props> = () => {
    const emailRef = useRef<any>();
    const passwordRef = useRef<any>();
    const passwordConfirmRef = useRef<any>();
    const { currentUser, updatePassword, updateEmail } = useAuth();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();

    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (passwordRef.current.value as string !== passwordConfirmRef.current.value as string) {
            return setError('Passwords do not match');
        }

        // const promises = [];
        const promises = Array<Promise<void> | null | undefined>();
        setLoading(true);
        setError("");
        
        if (emailRef.current.value !== currentUser?.email) {
            promises.push(updateEmail!(emailRef.current.value));
        }

        if (passwordRef.current.value) {
            promises.push(updatePassword!(passwordRef.current.value));
        }

        Promise.all(promises)
          .then(() => history.push('/'))
          .catch((err) => {
              console.error(err);
              setError('Failed to update account');
            })
          .finally(() => setLoading(false));
    }

    return (
        <>
          <Card>
              <Card.Body>
                  <h2 className="text-center mb-4">Update Profile</h2>
                  {error && <Alert variant='danger'>{error}</Alert>}
                   <Form onSubmit={handleSubmit}>
                     <Form.Group id='email'>
                       <Form.Label>Email</Form.Label>
                       <Form.Control
                         type='email'
                         ref={emailRef}
                         required
                         defaultValue={currentUser?.email as any}
                       ></Form.Control>
                     </Form.Group>
                     <Form.Group id='password'>
                       <Form.Label>Password</Form.Label>
                       <Form.Control
                         type='password'
                         ref={passwordRef}
                         placeholder="Leave bland to keep the same"
                       ></Form.Control>
                     </Form.Group>
                     <Form.Group id='password-confirm'>
                       <Form.Label>Password Confirmation</Form.Label>
                       <Form.Control
                         type='password'
                         ref={passwordConfirmRef}
                         placeholder="Leave bland to keep the same"
                       ></Form.Control>
                      </Form.Group> 
                      <Button disabled={loading} className='w-100' type='submit'>
                          Update
                      </Button>
                   </Form>
              </Card.Body>
          </Card>
          <div className='w-100 text-center mt-2'>
              <Link to='/'>Cancel</Link>
          </div>
        </>
    );
}
export default UpdateProfile;