"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useSetState } from "react-use";

const RichTextEditor = dynamic(() => import("react-simple-wysiwyg"), {
  ssr: false,
});

type Props = {
  coursId: string | number;
};

const DiscussionForm = ({ coursId }: Props) => {
  // Form state
  const [formData, setFormData] = useSetState({
    title: "",
    content: "",
    isQuestion: false,
  });
  const [loading, setLoading] = useState(false);

  // Destructure state for easier use
  const { title, content, isQuestion } = formData;

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("formdata", formData);
    try {
      const url = `/courses/${coursId}/discussions`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("response", response);
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="tw:space-y-4 tw:bg-white tw:p-6 tw:rounded-2xl tw:shadow-sm"
    >
      <div>
        <label className="tw:block tw:font-medium tw:mb-1" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setFormData({ title: e.target.value })}
          className="tw:w-full tw:border tw:rounded tw:px-3 tw:py-2"
          required
        />
      </div>

      <div>
        <label className="tw:block tw:font-medium tw:mb-1">Content</label>
        <RichTextEditor
          value={content}
          onChange={(e) => setFormData({ content: e.target.value })}
        />
      </div>

      <div className="tw:flex tw:items-center tw:gap-2">
        <input
          id="isQuestion"
          type="checkbox"
          checked={isQuestion}
          onChange={(e) => setFormData({ isQuestion: e.target.checked })}
          className="tw:h-4 tw:w-4"
        />
        <label htmlFor="isQuestion" className="tw:select-none">
          Is this a question?
        </label>
      </div>

      <button
        type="submit"
        className="tw:bg-blue-600 tw:text-white tw:px-4 tw:py-2 tw:rounded hover:tw:bg-blue-700 disabled:tw:opacity-50"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Discussion"}
      </button>
    </form>
  );
};

export default DiscussionForm;
