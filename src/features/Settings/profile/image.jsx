import React, { useState } from "react";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Preview the image
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedImage); // Change 'file' to match your server's expected field name

    try {
      // Replace with your actual upload endpoint
      const response = await fetch("https://your-upload-url.com/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setUploadedImageUrl(result.imageUrl); // Assuming the response contains the image URL
      } else {
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload Image"}
      </button>
      {loading && <p>Loading...</p>} {/* Loading indicator */}
      {uploadedImageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img
            src={uploadedImageUrl}
            alt="Uploaded"
            style={{ maxWidth: "300px" }}
          />
        </div>
      )}
      {selectedImage && !loading && !uploadedImageUrl && (
        <div>
          <h3>Preview:</h3>
          <img
            src={selectedImage}
            alt="Preview"
            style={{ maxWidth: "300px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
