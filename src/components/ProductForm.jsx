import { useState } from "react";

const initialValues = {
  name: "",
  image: "",
  price: "",
  description: "",
  email: "",
};

export default function ProductForm({ onCreate }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "number" ? value : value,
    }));
  };

  const validate = () => {
    const err = {};
    if (!values.name.trim()) err.name = "Name is required.";
    if (!values.image.trim()) err.image = "Image is required.";

    if (values.price === "" || values.price === null) {
      err.price = "Price is required.";
    } else if (Number(values.price) < 0) {
      err.price = "Price cannot be less than 0.";
    }

    if (!values.description.trim())
      err.description = "Description is required.";

    if (!values.email.trim()) {
      err.email = "Email is required";
    } else {
      const emailOk = /^\S+@\S+\.\S+$/.test(values.email);
      if (!emailOk) err.email = "Invalid email format.";
    }

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    // ส่งข้อมูลให้ App แสดง Product
    onCreate?.(values);

    // รีเซ็ตฟอร์ม
    setValues(initialValues);
  };

  return (
    <form className="post-form" onSubmit={handleSubmit} noValidate>
      <h1>Create Product Form</h1>

      {/* Name */}
      <div className="input-container">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter name here"
          value={values.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="error-text">
            {errors.name}
          </p>
        )}
      </div>

      {/* Image */}
      <div className="input-container">
        <label htmlFor="image">Image Url</label>
        <input
          id="image"
          name="image"
          type="url"
          placeholder="Enter image url here"
          value={values.image}
          onChange={handleChange}
          aria-invalid={!!errors.image}
          aria-describedby={errors.image ? "image-error" : undefined}
        />
        {errors.image && (
          <p id="image-error" className="error-text">
            {errors.image}
          </p>
        )}
      </div>

      {/* Price */}
      <div className="input-container">
        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          inputMode="decimal"
          placeholder="Enter price here"
          value={values.price}
          onChange={handleChange}
          min={0}
          step="0.01"
          aria-invalid={!!errors.price}
          aria-describedby={errors.price ? "price-error" : undefined}
        />
        {errors.price && (
          <p id="price-error" className="error-text">
            {errors.price}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="input-container">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter description here"
          value={values.description}
          onChange={handleChange}
          rows={4}
          cols={30}
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? "description-error" : undefined}
        />
        {errors.description && (
          <p id="description-error" className="error-text">
            {errors.description}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="input-container">
        <label htmlFor="email">User&apos;s email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email here"
          value={values.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="error-text">
            {errors.email}
          </p>
        )}
      </div>

      <div className="form-actions">
        <button type="submit">Create</button>
      </div>
    </form>
  );
}
