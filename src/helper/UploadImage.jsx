import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateContent } from "../features/Template/editTemplate";

// -------------------
// For service image uploads (not template editing)
// -------------------
export const useImageUploader = () => {
  const fileInputRefs = useRef({});
  const [loadingImage, setLoading] = useState(false);

  const handleEditImageClick = (section, field) => {
    if (fileInputRefs.current[`${section}-${field}`]) {
      fileInputRefs.current[`${section}-${field}`].click();
    }
  };

  const handleImageChange = async (
    event,
    section,
    field,
    oldImageUrl = null
  ) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("oldImageUrl", oldImageUrl ? oldImageUrl : "");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/creator/template-image`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok)
        throw new Error(`Azure upload failed: ${response.statusText}`);

      const data = await response.json();
      setLoading(false);
      return data?.url || data?.imageUrl || null;
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image to Azure:", error);
    }
  };

  return {
    fileInputRefs,
    handleEditImageClick,
    handleImageChange,
    loadingImage,
  };
};

// -------------------
// For template image editing (uses Redux to update content)
// -------------------
export const useImageEditor = () => {
  const dispatch = useDispatch();
  const fileInputRefs = useRef({});
  const [loadingImage, setLoading] = useState(false);

  const currentTemplate = useSelector(
    (state) => state.editTemplate.editcurrentTemplate
  );

  const handleEditImageClick = (section, field) => {
    if (fileInputRefs.current[`${section}-${field}`]) {
      fileInputRefs.current[`${section}-${field}`].click();
    }
  };

  const handleImageChange = async (event, section, field) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);

    try {
      const oldImageUrl = currentTemplate?.[section]?.[field] || null;

      const formData = new FormData();
      formData.append("image", file);
      formData.append("oldImageUrl", oldImageUrl ? oldImageUrl : "");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/creator/template-image`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok)
        throw new Error(`Azure upload failed: ${response.statusText}`);

      const data = await response.json();
      console.log("Azure upload response:", data);

      if (data?.url) {
        dispatch(
          updateContent({
            section,
            field,
            value: data.url,
          })
        );
      }
    } catch (error) {
      console.error("Error uploading image to Azure:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    fileInputRefs,
    handleEditImageClick,
    handleImageChange,
    loadingImage,
  };
};
