import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { changeProfile } from "../../lib/api";
import { useAuth } from "../Auth";

function ProfileSettings() {
  const auth = useAuth();
  const userId = auth.user.id;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await changeProfile(
        userId,
        firstName,
        lastName,
        phone,
        location
      );
      auth.saveUser({
        first_name: firstName,
        last_name: lastName,
        location,
        phone,
      });
      alert("User details changed!");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="d-flex">
      <div
        style={{ height: "88vh" }}
        className="container col-lg-9 d-flex align-items-center justify-content-center shadow p-3 mb-2 mt-2 bg-body rounded">
        <Form onSubmit={handleSubmit} className="col-lg-8">
          <h2 className="text-center display-4">Profile Settings</h2>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              className="mb-2"
              type="text"
              placeholder={auth.user.first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              className="mb-2"
              type="text"
              placeholder={auth.user.last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              className="mb-2"
              type="text"
              placeholder={auth.user.phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              placeholder={auth.user.location}
              type="text"
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
          <br />
          <div className="text-center">
            <Button variant="primary" type="submit">
              Save changes
            </Button>
          </div>
        </Form>
      </div>
      <div className="container col-lg-2 d-flex flex-column align-items-center justify-content-center shadow p-3 mb-2 mt-2 bg-body rounded">
        <Link to={"/profile/changePass"}>Change password?</Link>

        <Link to={"/profile/changeEmail"}>Change email?</Link>
      </div>
    </div>
  );
}

export default ProfileSettings;
