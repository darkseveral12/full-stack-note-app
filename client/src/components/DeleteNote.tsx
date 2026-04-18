import Modal from "./Modal";
import { Button } from "@chakra-ui/react";
import type { IFormInput } from "../types/NoteInput";
import { useState } from "react";
import DeleteFormNote from "./DeleteFormNote";

import { BiTrash } from "react-icons/bi";
import { Spinner } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";

const DeleteNote = ({ data }: { data: IFormInput }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Modal
      title={"Delete your Note"}
      triggerNode={
        <IconButton bgColor={"red"} variant={"subtle"}>
          <BiTrash />
        </IconButton>
      }
      bodyNode={
        <DeleteFormNote
          formId="delete-form"
          _id={data._id}
          setOpen={setOpen}
          setIsSubmitting={setIsSubmitting}
        />
      }
      saveNode={
        <Button
          type="submit"
          variant="solid"
          form="delete-form"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner />
            </>
          ) : (
            "Delete"
          )}
        </Button>
      }
      open={open}
      setOpen={setOpen}
    ></Modal>
  );
};

export default DeleteNote;
