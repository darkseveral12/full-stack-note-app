import { Fieldset, Field, Input, Textarea, TagsInput } from "@chakra-ui/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import useRequest from "../hooks/useRequest";
import type { IFormInput } from "../types/NoteInput";
import { Controller } from "react-hook-form";
import { toaster } from "../components/ui/toaster";
import { useEffect } from "react";
interface FormNoteProps {
  id: string;
  setOpen: (open: boolean) => void;
  onSubmittingChange: (isSubmitting: boolean) => void;
  newdata?: IFormInput;
}

const FormNote = ({
  id,
  setOpen,
  onSubmittingChange,
  newdata,
}: FormNoteProps) => {
  const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, errors },
  } = useForm<IFormInput>({
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const SPLIT_REGEX = /[;,]/;
  const { mutateAsync } = useRequest();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const isEdit = !!newdata?._id;

    const promise = mutateAsync({
      url: isEdit
        ? `${BASE_API_URL}/api/notes/${newdata._id}`
        : `${BASE_API_URL}/api/notes`,

      data,
      method: isEdit ? "PATCH" : "POST",
    });

    toaster.promise(promise, {
      success: {
        title: isEdit
          ? "Sucess updated a note."
          : "Successfully created a note",
      },
      error: {
        title: isEdit
          ? "Error when updating a note."
          : "Failed to create a note.",
      },
      loading: { title: isEdit ? "Updating..." : "Creating..." },
    });

    await promise;
    setOpen(false);
  };

  useEffect(() => {
    if (newdata) {
      reset({
        title: newdata.title,
        content: newdata.content,
        tags: newdata.tags,
      });
    } else {
      reset({ title: "", content: "", tags: [] }); // clear for create mode
    }
  }, [newdata, reset]);

  useEffect(() => {
    onSubmittingChange(isSubmitting);
  }, [isSubmitting, onSubmittingChange]);

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)}>
      <Fieldset.Root size="lg" maxW="md">
        <Fieldset.Content>
          <Field.Root invalid={!!errors.title}>
            <Field.Label>Title</Field.Label>
            <Input
              {...register("title", {
                required: "Title is required",
              })}
              placeholder="Enter note title..."
              disabled={isSubmitting}
            />

            <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.content}>
            <Field.Label>Content</Field.Label>
            <Textarea
              {...register("content", {
                required: "Content is required",
                minLength: {
                  value: 4,
                  message: "The Content must atleast have 4 characters.",
                },
              })}
              placeholder="Comment..."
              disabled={isSubmitting}
            />
            <Field.ErrorText>{errors.content?.message}</Field.ErrorText>
          </Field.Root>

          <Controller
            name="tags"
            control={control}
            defaultValue={[]}
            rules={{
              required: "Tags are required",
              validate: (tags) =>
                (tags && tags.length >= 3) || "Must have at least 3 tags",
            }}
            render={({ field }) => (
              <Field.Root invalid={!!errors.tags}>
                <TagsInput.Root
                  disabled={isSubmitting}
                  value={field.value}
                  onValueChange={(details) => field.onChange(details.value)}
                  delimiter={SPLIT_REGEX}
                >
                  <TagsInput.Label>Tags</TagsInput.Label>
                  <TagsInput.Control>
                    <TagsInput.Items />
                    <TagsInput.Input placeholder="Add tag..." />
                  </TagsInput.Control>
                  <Field.ErrorText>{errors.tags?.message}</Field.ErrorText>
                </TagsInput.Root>
              </Field.Root>
            )}
          />
        </Fieldset.Content>
      </Fieldset.Root>
    </form>
  );
};

export default FormNote;
