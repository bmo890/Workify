import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import { Form, Button, Alert } from "react-bootstrap";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [validPass, setValidPass] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (password !== repeatPassword) {
      setValidPass(true);
    }
  }

  return (
    <div
      style={{ height: "100vh" }}
      className="container d-flex align-items-center justify-content-center">
      <Form className="col-lg-6" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Change Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter new password"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Enter new password again</Form.Label>
          <Form.Control
            onChange={(e) => setRepeatPassword(e.target.value)}
            isInvalid={validPass}
            type="password"
            placeholder="Repeat new password"
          />
          {validPass ? (
            <Alert variant="danger">Passwords does not match!</Alert>
          ) : (
            <> </>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ChangePassword;
