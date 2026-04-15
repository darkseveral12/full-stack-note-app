import { EmptyState, VStack } from "@chakra-ui/react";
import { LuNotebook } from "react-icons/lu";
import type { IconType } from "react-icons";

interface EmptySectionProps {
  title: string;
  description: string;
  icon?: IconType;
}

const EmptySection = ({ title, description, icon }: EmptySectionProps) => {
  const IconComponent = icon || LuNotebook;

  return (
    <EmptyState.Root size={"lg"}>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <IconComponent />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>{title}</EmptyState.Title>
          <EmptyState.Description>{description}</EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
};

export default EmptySection;
