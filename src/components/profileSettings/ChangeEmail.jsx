import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

function ChangeEmail() {
  const [email, setEmail] = useState("");
  const [repeatEmail, setRepeatEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (email !== repeatEmail) {
      setValidEmail(true);
    }
  }

  return (
    <div
      style={{ height: "100vh" }}
      className="container d-flex align-items-center justify-content-center">
      <Form className="col-lg-6" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Change email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter here your new Email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Enter new email again</Form.Label>
          <Form.Control
            onChange={(e) => setRepeatEmail(e.target.value)}
            isInvalid={validEmail}
            type="email"
            placeholder="Repeat new email"
          />
          {validEmail ? (
            <Alert variant="danger">Emails does not match!</Alert>
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

export default ChangeEmail;
