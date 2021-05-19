import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useAuth } from "../Auth";

import { Form, Button, Alert } from "react-bootstrap";
import { changePassword } from "../../lib/api";

function ChangePassword() {
  const auth = useAuth();
  const userId = auth.user.id;
  const userEmail = auth.user.email;
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [validPass, setValidPass] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== repeatPassword) {
      setValidPass(true);
    } else {
      try {
        const data = await changePassword(
          userId,
          userEmail,
          oldPassword,
          password
        );
        if (data) {
          alert("User password changed!");
        }
      } catch (error) {
        alert(error);
      }
    }
  }

  return (
    <div
      style={{ height: "100vh" }}
      className="container d-flex align-items-center justify-content-center">
      <Form
        className="container col-lg-6 shadow p-3 mb-2 mt-2 bg-body rounded"
        onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label>Enter Old Password</Form.Label>
          <Form.Control
            className="mb-2"
            onChange={(e) => setOldPassword(e.target.value)}
            type="password"
            placeholder="Enter your old password"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Change Password</Form.Label>
          <Form.Control
            className="mb-2"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter new password"
          />
        </Form.Group>

        <Form.Group>
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
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ChangePassword;
