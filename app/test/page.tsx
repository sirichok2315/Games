"use client";

import CourseForm from "@/components/CourseForm";

export default function TestPage() {
  const handleSave = (draft: any) => {
    console.log("Save:", draft);
  };

  const handleCancel = () => {
    console.log("Cancel");
  };

  return (
    <div>
      <h1>Test Page</h1>
      <CourseForm onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}