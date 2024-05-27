"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Center,
  HStack,
  Image,
  Spinner,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { PlusSquare } from "@phosphor-icons/react";
import Cookies from "js-cookie";
import Cards from "@/components/ui/Cards";
import InputSearch from "@/components/ui/InputSearch";
import Pagination from "@/components/ui/Pagination";
import AddBlog from "@/components/layout/AddBlog";
import { useFetchBlogs } from "@/hooks/useFetchBlogs";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { useUsers } from "@/hooks/useUsers";
import { useBlogs } from "@/hooks/useBlogs";
import { validateToken } from "@/utils/auth";
import { Blog } from "../types";

interface SearchParams {
  query?: string;
  page?: string;
}

export default function Home({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const [pageAll, setPageAll] = useState(1);
  const [pageDashboard, setPageDashboard] = useState(1);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [filteredDashboardBlogs, setFilteredDashboardBlogs] = useState<any[]>(
    []
  );
  const [maxPageAll, setMaxPageAll] = useState(1);
  const [maxPageDashboard, setMaxPageDashboard] = useState(1);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const query = searchParams?.query || "";
  const { blogs: allBlogs, loading: blogsLoading } = useFetchBlogs();
  const { users, loading: usersLoading } = useFetchUsers();
  const loading = blogsLoading || usersLoading;
  const itemsPerPage = 6;

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { users: dashboardUsers, loading: dashboardUsersLoading } = useUsers();
  const {
    blogs: dashboardBlogs,
    loading: dashboardBlogsLoading,
    refetchBlogs,
  } = useBlogs();

  const filterBlogs = () => {
    const startIndex = (pageAll - 1) * itemsPerPage;
    const endIndex = pageAll * itemsPerPage;
    const filteredData = allBlogs.filter((blog) =>
      blog?.title?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBlogs(filteredData.slice(startIndex, endIndex));
    setMaxPageAll(Math.ceil(filteredData.length / itemsPerPage));
  };

  useEffect(() => {
    filterBlogs();
  }, [query, pageAll, allBlogs]);

  const filterDashboardBlogs = () => {
    const storedUserData = sessionStorage.getItem("userData");
    const userData = storedUserData ? JSON.parse(storedUserData) : null;

    const filtered = userData
      ? dashboardBlogs.filter((blog: any) => blog.user_id === userData.id)
      : dashboardBlogs;

    const filteredData = filtered.filter((blog: any) =>
      blog.title.toLowerCase().includes(query.toLowerCase())
    );

    const startIndex = (pageDashboard - 1) * itemsPerPage;
    const endIndex = pageDashboard * itemsPerPage;

    setFilteredDashboardBlogs(filteredData.slice(startIndex, endIndex));
    setMaxPageDashboard(Math.ceil(filteredData.length / itemsPerPage));
  };

  useEffect(() => {
    const isValid = validateToken(toast);
    setIsTokenValid(isValid);
    if (isValid) {
      filterDashboardBlogs();
    }
  }, [query, pageDashboard, dashboardBlogs]);

  const handleTabChange = (index: number) => {
    if (index === 1) {
      const isValid = validateToken(toast);
      setIsTokenValid(isValid);
      if (!isValid) {
        return;
      }
    }
  };

  return (
    <Box>
      <Image width={"full"} src="Hero.png" />
      <InputSearch />
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
                <Tab isDisabled={!isTokenValid}>Your Blogs</Tab>
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="blue.500"
                borderRadius="1px"
              />
              <TabPanels>
                <TabPanel>
                  <Box className="flex flex-wrap justify-between">
                    {filteredBlogs.length > 0 ? (
                      filteredBlogs.map((item) => {
                        const user = users.find(
                          (user) => item.user_id === user.id
                        );
                        return (
                          <Cards
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            content={item.body}
                            user={user ? user.name : "username"}
                            status={user ? user.status : "active"}
                          />
                        );
                      })
                    ) : (
                      <div className="mx-20">
                        <p>No blogs found, Refresh Your Browser</p>
                      </div>
                    )}
                  </Box>
                  <Pagination
                    page={pageAll}
                    setPage={setPageAll}
                    maxPage={maxPageAll}
                  />
                </TabPanel>
                <TabPanel>
                  <div className="flex flex-wrap justify-between">
                    {dashboardUsersLoading || dashboardBlogsLoading ? (
                      <Center w="100%" h="100vh">
                        <Spinner />
                      </Center>
                    ) : filteredDashboardBlogs.length === 0 ? (
                      <Center w="100%" h="50vh">
                        <Text>No blogs found.</Text>
                      </Center>
                    ) : (
                      filteredDashboardBlogs.map((item: any) => (
                        <Cards
                          key={item.id}
                          id={item.id}
                          title={item.title}
                          content={item.body}
                          user={item.user_name || "username"}
                          status={item.status || "active"}
                          type="dashboard"
                          refetchBlogs={refetchBlogs}
                        />
                      ))
                    )}
                  </div>
                  <Pagination
                    page={pageDashboard}
                    setPage={setPageDashboard}
                    maxPage={maxPageDashboard}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </>
        )}
      </Box>
      <AddBlog isOpen={isOpen} onClose={onClose} refetchBlogs={refetchBlogs} />
    </Box>
  );
}
