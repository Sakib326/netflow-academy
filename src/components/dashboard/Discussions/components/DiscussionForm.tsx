"use client";

import dynamic from "next/dynamic";
import { useCreateDiscussionMutation } from "@/redux/discussion/discussionApi";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
// Dynamic import to avoid SSR issues
const RichTextEditor = dynamic(() => import("react-simple-wysiwyg"), {
  ssr: false,
});
import {
  Toolbar,
  BtnItalic,
  BtnUnderline,
  BtnBulletList,
  BtnNumberedList,
  BtnBold,
} from "react-simple-wysiwyg";

type Props = {
  courseId: string | number;
};

const DiscussionForm = ({ courseId = 3 }: Props) => {
  const [createDiscussion, { isLoading, isSuccess, isError }] =
    useCreateDiscussionMutation();

  const initialValues = {
    title: "",
    content: "",
    is_question: false,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
  });

  const handleSubmit = (values: typeof initialValues, { resetForm }: any) => {
    try {
      createDiscussion({
        courseId,
        ...values,
      });

      resetForm();
      if (isSuccess) toast.success("Discussion create successfully");
    } catch (error: any) {
      toast.error(`${error?.message}`);
    }
  };

  return (
    <div className="tw:mb-8">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors }) => (
          <Form className="tw:space-y-4 tw:bg-white tw:md:p-6 tw:p-2 tw:rounded-xl tw:border tw:border-gray-200">
            <div>
              <Field
                id="title"
                name="title"
                type="text"
                className={`tw:w-full tw:h-10 tw:placeholder:text-sm tw:border ${
                  errors.title ? "tw:border-red-600 tw:border-2" : ""
                } tw:border-gray-200 tw:focus:outline-gray-300 tw:rounded tw:px-3 tw:py-1`}
                placeholder="Write hare to your discussion title"
              />
            </div>
            <div>
              <RichTextEditor
                value={values.content}
                onChange={(e) => setFieldValue("content", e.target.value)}
                placeholder="Write your discussion description"
                className={`${
                  errors.content ? "tw:border-red-600 tw:border-2" : ""
                } tw:placeholder:text-sm`}
              >
                <Toolbar>
                  <BtnBold />
                  <BtnItalic />
                  <BtnUnderline />

                  <BtnBulletList />
                  <BtnNumberedList />
                </Toolbar>
              </RichTextEditor>
            </div>

            {/* Is Question */}
            <div className="tw:flex tw:items-center tw:justify-between">
              <div className="tw:flex tw:items-center tw:gap-2">
                <Field
                  id="is_question"
                  name="is_question"
                  type="checkbox"
                  className="tw:h-4 tw:w-4"
                />
                <label
                  htmlFor="is_question"
                  className="tw:select-none tw:font-semibold"
                >
                  Is this a question?
                </label>
              </div>

              <button
                type="submit"
                className="tw:bg-orange-600 tw:text-white tw:text-sm tw:px-3 tw:py-2 tw:rounded tw:hover:bg-blue-700 disabled:tw:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Create"}
              </button>
            </div>

            {/* Submit */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DiscussionForm;
