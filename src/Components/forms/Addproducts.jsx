import React, { useState } from "react";
import { API_URL } from "../data/apiPath";

function Addproducts() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleBestSellerChange = (event) => {
    const value = event.target.value === "true";
    setBestseller(value);
  };

  const handleAddProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      const firmId = localStorage.getItem("firmId");

      if (!loginToken || !firmId) {
        console.error("User not authenticated or firmId not set");
        return;
      }

      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("description", description);

      category.forEach((value) => {
        formData.append("category", value);
      });

      formData.append("bestseller", bestseller.toString()); // Convert boolean to string

      if (file) {
        formData.append("image", file);
      }

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${loginToken}`, // Correct header name for JWT token
          "X-Firm-Id": firmId, // Custom header for Firm ID
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        alert("Product added successfully");
      } else {
        throw new Error(data.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Product add failed:", error);
      alert("Product add failed: " + error.message);
    }
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
  };

  return (
    <>
      <div className="addproductSection">
        <h3>AddProduct</h3>
        <form className="productauthForm" onSubmit={handleAddProductSubmit}>
          <label>ProductName:</label>
          <br />
          <input
            type="text"
            placeholder="Enter"
            name="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />{" "}
          <br />
          <label>Price:</label>
          <br />
          <input
            type="text"
            placeholder="Enter"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <div className="CheckIn">
            <div className="CheckIn-labels">
              <label className="rclabel">Category:</label>

              <div className="labels">
                <label>Veg</label>
                <input
                  type="checkbox"
                  value="Veg"
                  checked={category.includes("Veg")}
                  onChange={handleCategoryChange}
                />
              </div>

              <div className="labels">
                <label>Non-veg</label>
                <input
                  type="checkbox"
                  value="Non-veg"
                  checked={category.includes("Non-veg")}
                  onChange={handleCategoryChange}
                />
              </div>
            </div>
          </div>
          <div className="CheckIn">
            <div className="CheckIn-labels">
              <label className="rclabel">BestSeller:</label>

              <div className="labels radioinput">
                <label>Yes</label>
                <input
                  type="radio"
                  value="true"
                  checked={bestseller === true}
                  onChange={handleBestSellerChange}
                />
              </div>

              <div className="labels radioinput">
                <label>No</label>
                <input
                  type="radio"
                  value="false"
                  checked={bestseller === false}
                  onChange={handleBestSellerChange}
                />
              </div>
            </div>
          </div>
          <label>Upload Image:</label>
          <br />
          <input type="file" onChange={handleImageUpload} />
          <br />
          <label>Description:</label>
          <br />
          <input
            type="text"
            placeholder="Enter"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <br />
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Addproducts;
