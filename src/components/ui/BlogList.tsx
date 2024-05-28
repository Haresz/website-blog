import React from "react";
import { Box, Button, Center, Text, VStack, Link } from "@chakra-ui/react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import Cards from "./Cards";
import Pagination from "./Pagination";
import { Blog, User } from "@/types";

interface BlogListProps {
  blogs: Blog[];
  users: User[];
  page: number;
  setPage: (page: number) => void;
  maxPage: number;
  refetchBlogs?: () => void;
  onOpen?: () => void;
  isDashboard?: boolean;
}

const BlogList: React.FC<BlogListProps> = ({
  blogs,
  users,
  page,
  setPage,
  maxPage,
  refetchBlogs,
  onOpen,
  isDashboard,
}) => {
  return (
    <Box>
      {blogs.length > 0 ? (
        <VStack alignItems="start" className="w-full">
          {isDashboard && (
            <Button
              top={0}
              position={"absolute"}
              alignSelf={"end"}
              onClick={onOpen}
              colorScheme="blue"
              rightIcon={<Plus size={24} />}
              borderRadius={0}
              size={{ base: "xs", sm: "md" }}
            >
              Add Blog
            </Button>
          )}
          <Box className="w-full flex flex-wrap justify-start gap-8">
            {blogs.map((item: any) => {
              const user = users.find((user) => item.user_id === user.id);
              return (
                <Cards
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  content={item.body}
                  user={user ? user.name : "username"}
                  status={user ? user.status : "active"}
                  type={isDashboard ? "dashboard" : undefined}
                  refetchBlogs={refetchBlogs}
                />
              );
            })}
          </Box>
          <Pagination page={page} setPage={setPage} maxPage={maxPage} />
        </VStack>
      ) : (
        <Center w="100%" h="50vh">
          <Text>
            No blogs found{" "}
            {isDashboard && (
              <Link
                color={"blue.400"}
                fontWeight={"bold"}
                textDecoration={"underline"}
                onClick={onOpen}
              >
                Add Blog
              </Link>
            )}
          </Text>
        </Center>
      )}
    </Box>
  );
};

export default BlogList;
