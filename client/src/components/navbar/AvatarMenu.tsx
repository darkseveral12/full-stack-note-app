import { Menu, Avatar, Portal, Box } from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";
import useFetch from "../../hooks/useFetch";

import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

const AvatarMenu = () => {
  const { user } = useAuth();
  const { data, isSuccess, refetch } = useFetch(
    "https://full-stack-note-app-1-czf8.onrender.com/auth/logout",
    false,
    ["logout"],
  );

  useEffect(() => {
    if (data && isSuccess) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  }, [isSuccess, data]);

  const handleSelect = (details: { value: string }) => {
    switch (details.value) {
      case "logout":
        refetch();
        break;
    }
  };

  return (
    <Menu.Root
      positioning={{ placement: "bottom-start" }}
      onSelect={handleSelect}
    >
      <Menu.Trigger rounded="full" focusRing="outside">
        <Avatar.Root _hover={{ cursor: "pointer" }} size="sm">
          <Avatar.Fallback name={`${user?.firstName} ${user?.lastName}`} />
        </Avatar.Root>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW={"40"}>
            <Menu.Content>
              <Menu.ItemGroup>
                <Menu.ItemGroupLabel>
                  {user?.firstName} {user?.lastName}
                </Menu.ItemGroupLabel>
              </Menu.ItemGroup>
              <Menu.Separator />
              <Menu.Item
                value="logout"
                color="fg.error"
                _hover={{
                  bg: "bg.error",
                  color: "fg.error",
                  cursor: "pointer",
                }}
              >
                <LuLogOut />
                <Box flex="1">Logout</Box>
              </Menu.Item>
            </Menu.Content>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default AvatarMenu;
