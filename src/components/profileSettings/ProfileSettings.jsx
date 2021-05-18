import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";

function ProfileSettings() {
  return (
    <div className="d-flex">
      <div
        style={{ height: "95vh" }}
        className="container col-lg-9 d-flex align-items-center justify-content-center shadow p-3 mb-2 mt-2 bg-body rounded">
        <Form className="col-lg-8">
          <h2 className="text-center display-4">Profile Settings</h2>
          <Form.Group>
            <Form.File label="Upload profile picture here" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Change name" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" placeholder="Change phone" />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Change location" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" type="submit">
              Save changes
            </Button>
          </div>
        </Form>
      </div>
      <div className="container col-lg-2 d-flex flex-column align-items-center justify-content-center shadow p-3 mb-2 mt-2 bg-body rounded">
        <Link to={"/profileSettings/changePassword"}>Change password?</Link>

        <Link to={"/profileSettings/changeEmail"}>Change email?</Link>
      </div>
    </div>
  );
}

export default ProfileSettings;
