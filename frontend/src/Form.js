import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Form.css";
import axios from "axios";

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
      email: Yup.string().email("Invalid email format").required("Required!"),
      phone: Yup.number()
        .min(10, "Number must be in 10 digits")
        .max(10, "Number must be in 10 digits")
        .required("Required!"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const obj = {
      name,
      email,
      phone,
    };
    console.log(obj);

    axios.post("http://localhost:5000/setUser", obj).then((res) => {
      setName("");
      setEmail("");
      setPhone("");
    });
    window.location.reload().catch((err) => console.log(err.message));
  };

  return (
    <div className="container">
      <h1>User Directory Form</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Name*"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {formik.errors.name && formik.touched.name && (
            <p>{formik.errors.name}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email*"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {formik.errors.email && formik.touched.email && (
            <p>{formik.errors.email}</p>
          )}
        </div>
        <div>
          <input
            type="number"
            placeholder="Phone.No*"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {formik.errors.phone && formik.touched.phone && (
            <p>{formik.errors.phone}</p>
          )}
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
