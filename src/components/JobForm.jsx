import React from "react";
import { useState } from "react";

function JobForm() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
  return (
<div>
    
<form>
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