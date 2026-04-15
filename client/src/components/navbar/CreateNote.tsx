import { Button, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import Modal from "../Modal";
import FormNote from "../FormNote";
import { MdCreate } from "react-icons/md";

const CreateNote = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      <Modal
        title="Create Note"
        triggerNode={
          <Button variant="surface">
            <MdCreate />
            Create Note
          </Button>
        }
        bodyNode={
          <FormNote
            id="note-form"
            setOpen={setOpen}
            onSubmittingChange={setIsSubmitting}
          />
        }
        saveNode={
          <Button
            type="submit"
            variant="solid"
            form="note-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner />
              </>
            ) : (
              "Submit"
            )}
          </Button>
        }
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default CreateNote;
