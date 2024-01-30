/* eslint-disable @typescript-eslint/no-explicit-any */
const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(import.meta.env.VITE_UPLOAD_IMAGE_URL, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return data.data.url;
    } else {
      console.error("Failed to upload image:", response.statusText);
    }
  } catch (error: any) {
    console.error("Error during image upload:", error.message);
  }
};

export default uploadImage;
