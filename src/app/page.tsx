"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Center,
  Image,
  Link,
  Spinner,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import InputSearch from "@/components/ui/InputSearch";
import AddBlog from "@/components/layout/AddBlog";
import { useFetchBlogs } from "@/hooks/useFetchBlogs";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { useUsers } from "@/hooks/useUsers";
import { useBlogs } from "@/hooks/useBlogs";
import { validateToken } from "@/utils/auth";
import { Blog } from "../types";
import Nav from "@/components/common/Nav";
import BlogList from "@/components/ui/BlogList";
import Footer from "@/components/common/Footer";

export default function Home() {
  const [pageAll, setPageAll] = useState(1);
  const [pageDashboard, setPageDashboard] = useState(1);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [filteredDashboardBlogs, setFilteredDashboardBlogs] = useState<Blog[]>(
    []
  );
  const [maxPageAll, setMaxPageAll] = useState(1);
  const [maxPageDashboard, setMaxPageDashboard] = useState(1);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const { blogs: allBlogs, loading: blogsLoading } = useFetchBlogs();
  const { users, loading: usersLoading } = useFetchUsers();
  const { users: dashboardUsers, loading: dashboardUsersLoading } = useUsers();
  const {
    blogs: dashboardBlogs,
    loading: dashboardBlogsLoading,
    refetchBlogs,
  } = useBlogs();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const loading =
    blogsLoading ||
    usersLoading ||
    dashboardUsersLoading ||
    dashboardBlogsLoading;
  const itemsPerPage = 6;

  const filterBlogs = (blogs: Blog[], query: string, page: number) => {
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(query.toLowerCase())
    );
    const startIndex = (page - 1) * itemsPerPage;
    return {
      filteredBlogs: filtered.slice(startIndex, startIndex + itemsPerPage),
      maxPage: Math.ceil(filtered.length / itemsPerPage),
    };
  };

  useEffect(() => {
    const { filteredBlogs, maxPage } = filterBlogs(
      allBlogs,
      searchQuery,
      pageAll
    );
    setFilteredBlogs(filteredBlogs);
    setMaxPageAll(maxPage);
  }, [searchQuery, pageAll, allBlogs]);

  useEffect(() => {
    const isValid = validateToken(toast, false);
    setIsTokenValid(isValid);
    if (isValid) {
      const storedUserData = sessionStorage.getItem("userData");
      const userData = storedUserData ? JSON.parse(storedUserData) : null;
      const userBlogs = userData
        ? dashboardBlogs.filter((blog) => blog.user_id === userData.id)
        : dashboardBlogs;
      const { filteredBlogs, maxPage } = filterBlogs(
        userBlogs,
        searchQuery,
        pageDashboard
      );
      setFilteredDashboardBlogs(filteredBlogs);
      setMaxPageDashboard(maxPage);
    }
  }, [searchQuery, pageDashboard, dashboardBlogs, isTokenValid]);

  const handleTabChange = (index: number) => {
    if (index === 1 && !validateToken(toast)) {
      setIsTokenValid(false);
    }
  };

  return (
    <Box>
      <Nav theme="dark" />
      <Image width={"full"} src="Hero.png" />
      <InputSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Box className="sm:mx-20 mx-4">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Tabs
              position="relative"
              variant="unstyled"
              onChange={handleTabChange}
            >
              <TabList>
                <Tab>All Blogs</Tab>
                <Tab>Your Blogs</Tab>
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="1.5px"
                bg="black"
                borderRadius="1px"
              />
              <TabPanels>
                <TabPanel>
                  <BlogList
                    blogs={filteredBlogs}
                    users={users}
                    page={pageAll}
                    setPage={setPageAll}
                    maxPage={maxPageAll}
                  />
                </TabPanel>
                <TabPanel>
                  {isTokenValid ? (
                    <BlogList
                      blogs={filteredDashboardBlogs}
                      users={dashboardUsers}
                      page={pageDashboard}
                      setPage={setPageDashboard}
                      maxPage={maxPageDashboard}
                      refetchBlogs={refetchBlogs}
                      onOpen={onOpen}
                      isDashboard
                    />
                  ) : (
                    <Center my={16}>
                      <Text>
                        Please log in to access the your blog.
                        <Link
                          color={"blue.400"}
                          fontWeight={"bold"}
                          textDecoration={"underline"}
                          href="/auth/sign-in"
                        >
                          Login
                        </Link>
                      </Text>
                    </Center>
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </>
        )}
      </Box>
      <AddBlog isOpen={isOpen} onClose={onClose} refetchBlogs={refetchBlogs} />
      <Footer />
    </Box>
  );
}
