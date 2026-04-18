import { Fieldset, Field } from "@chakra-ui/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "@chakra-ui/react";
import { toaster } from "./ui/toaster";
import { useEffect } from "react";
import useRequest from "../hooks/useRequest";

interface DeleteFormInput {
  deleteInput: string;
}

interface DeleteFormProp {
  formId: string;
  _id: string;
  setOpen: (open: boolean) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

const DeleteFormNote = ({
  formId,
  _id,
  setOpen,
  setIsSubmitting,
}: DeleteFormProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DeleteFormInput>();

  const { mutateAsync } = useRequest();

  const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

  const onSubmit: SubmitHandler<DeleteFormInput> = async () => {
    console.log("Clicked");
    const promise = mutateAsync({
      url: `${BASE_API_URL}/${_id}`,
      method: "DELETE",
    });

    toaster.promise(promise, {
      success: {
        title: "Sucessfully Deleted your note!",
      },
      error: {
        title: "Failed to delete your note",
      },
      loading: {
        title: "Deleting...",
      },
    });

    await promise;
    setOpen(false);
  };

  useEffect(() => {
    setIsSubmitting(isSubmitting);
  }, [isSubmitting, setIsSubmitting]);

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <Fieldset.Root size="lg" maxW="md">
        <Fieldset.Content>
          <Field.Root invalid={!!errors.deleteInput}>
            <Field.Label>To confirm, type “delete"</Field.Label>
            <Input
              {...register("deleteInput", {
                required: "Delete is required",
                validate: (input) =>
                  input === "delete" || "The input does not match “delete",
              })}
              disabled={isSubmitting}
            />

            <Field.ErrorText>{errors.deleteInput?.message}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>
      </Fieldset.Root>
    </form>
  );
};

export default DeleteFormNote;
