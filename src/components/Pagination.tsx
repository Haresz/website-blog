import { HStack, Heading, Text } from "@chakra-ui/react";
import React from "react";

export default function Pagination(props: any) {
  const { page, setPage, maxPage = 10 } = props;

  return (
    <div className="flex mx-20 mt-8 mb-16">
      <button
        onClick={() => (page >= 2 ? setPage(page - 1) : null)}
        className="btn-pagination"
      >
        Previous
      </button>
      <HStack textAlign={"center"} mx={4}>
        <Text fontSize={"md"}>Page</Text>
        <Heading as="h1" size="md">
          {page}
        </Heading>
        <Text fontSize={"md"}>of {maxPage ? maxPage : 10} Page</Text>
      </HStack>
      <button
        onClick={() => (page <= maxPage - 1 ? setPage(page + 1) : null)}
        className="btn-pagination"
      >
        Next
      </button>
    </div>
  );
}
