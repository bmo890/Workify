import React from "react";
import { useState } from "react";
import { postJob } from "../lib/api";
import { useAuth } from "../Components/Auth";
import { useHistory } from 'react-router-dom'


function JobForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState();

  const auth = useAuth();
  const history = useHistory();
  

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const job = {
      userId: auth.user.id, title, description, category
    };
    try {
      const response = await postJob(job, image);
      console.log(response)
      alert("Job posted successfully")
      let path = `/job/${response.jobId}`;
      history.push(path)

    } catch (error) {
      alert("Error")
    }
  };
  return (
    <div>

      <form className="jobForm" onSubmit={handleOnSubmit}>
        <div class="form-group col-md-6">
          <label for="inputTitle">Title</label>
          <input
            type="text"
            class="form-control"
            id="inputFirstName"
            placeholder="Title"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div class="form-group col-md-6">
          <label for="inputCategory">Category</label>
          <input
            type="text"
            class="form-control"
            id="inputCategory"
            placeholder="Category"
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          />
        </div>
        <div class="form-group col-md-6">
          <label for="description">Description</label>
          <input
            type="description"
            class="form-control"
            id="inputDescription"
            placeholder="Description"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
        <div class="form-group col-md-6">
          <label for="location">Location</label>
          <input
            type="location"
            class="form-control"
            id="inputLocation"
            placeholder="Location"
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="image">Upload image</label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            name="picture"
            id="image"
          />
        </div>
        <button type="submit" class="btn btn-primary"
        //  onClick={}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default JobForm;