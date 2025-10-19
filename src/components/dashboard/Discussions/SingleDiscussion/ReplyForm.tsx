"use client";

import { useCreateReplyMutation } from "@/redux/discussion/discussionApi";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

type Props = {
  discId: string | number;
};

type ReplyFormValues = {
  content: string;
};

const ReplyForm = ({ discId }: Props) => {
  const [createReply] = useCreateReplyMutation();

  const handleSubmit = (
    values: ReplyFormValues,
    { resetForm }: FormikHelpers<ReplyFormValues>
  ) => {
    createReply({
      discId,
      body: { content: values.content },
    });
    resetForm();
  };

  return (
    <div className="tw:mt-4 tw:border-t tw:border-gray-200 tw:pt-4">
      <Formik<ReplyFormValues>
        initialValues={{ content: "" }}
        validationSchema={Yup.object({
          content: Yup.string().required("Reply is required"),
        })}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Field
              as="textarea"
              name="content"
              placeholder="Write a reply..."
              rows={2}
              className="tw:w-full tw:focus:outline-gray-300 tw:border tw:border-gray-200 tw:rounded-md tw:p-2 tw:resize-none focus:tw:outline-none focus:tw:ring focus:tw:ring-blue-400"
            />
            <ErrorMessage
              name="content"
              component="span"
              className="tw:text-red-600 tw:text-xs"
            />

            <button
              type="submit"
              className="tw:mt-2 tw:bg-orange-600 tw:text-white tw:font-medium tw:px-8 tw:py-1 tw:rounded tw:hover:bg-orange-500"
            >
              Reply
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReplyForm;
