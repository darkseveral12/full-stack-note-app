import { Card, Skeleton, HStack, SkeletonText } from "@chakra-ui/react";
const SkeletonCard = () => {
  return (
    <Card.Root variant="outline">
      <Card.Body gap="4" justifyContent={"space-between"}>
        <HStack justify={"space-between"}>
          <SkeletonText noOfLines={1} />
          <Skeleton width={5} height={5} />
        </HStack>
        <SkeletonText noOfLines={3} />
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Skeleton width={10} height={10} />
        <Skeleton width={10} height={10} />
      </Card.Footer>
    </Card.Root>
  );
};

export default SkeletonCard;
