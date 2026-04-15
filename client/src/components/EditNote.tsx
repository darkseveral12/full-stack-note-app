import { useState } from "react";
import Modal from "./Modal";
import { Button, Spinner } from "@chakra-ui/react";
import FormNote from "./FormNote";
import type { IFormInput } from "../types/NoteInput";

const EditNote = ({ data }: { data: IFormInput }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Modal
      title={"Update your Note"}
      triggerNode={<Button variant={"ghost"}>Edit</Button>}
      bodyNode={
        <FormNote
          id={"update-form"}
          setOpen={setOpen}
          onSubmittingChange={setIsSubmitting}
          newdata={data}
        />
      }
      saveNode={
        <Button
          type="submit"
          variant="solid"
          form="update-form"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner />
            </>
          ) : (
            "Save"
          )}
        </Button>
      }
      open={open}
      setOpen={setOpen}
    ></Modal>
  );
};

export default EditNote;
