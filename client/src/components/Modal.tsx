import { Button, Dialog, Portal, Stack } from "@chakra-ui/react";
const Modal = ({
  title,
  triggerNode,
  bodyNode,
  saveNode,
  open,
  setOpen,
}: {
  title: string;
  triggerNode: React.ReactNode;
  bodyNode?: React.ReactNode;
  saveNode: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Dialog.Root
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement={"center"}
    >
      <Dialog.Trigger asChild>{triggerNode}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Stack>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Description>
                  Please provide your details below.
                </Dialog.Description>
              </Stack>
            </Dialog.Header>
            <Dialog.Body>{bodyNode}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="ghost">Cancel</Button>
              </Dialog.ActionTrigger>
              {saveNode}
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default Modal;
