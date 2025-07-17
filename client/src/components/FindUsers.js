import {
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdRefresh } from "react-icons/md";
import { getRandomUsers } from "../api/users";
import Loading from "./Loading";
import UserEntry from "./UserEntry";
import HorizontalStack from "./util/HorizontalStack";

const FindUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);
  const theme = useTheme();

  const fetchUsers = async () => {
    setLoading(true);
    const data = await getRandomUsers({ size: 5 });
    setLoading(false);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClick = () => {
    fetchUsers();
  };

  return (
    <Card
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)", // ✅ Soft shadow like PostCard
        backgroundColor: theme.palette.background.paper,
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: "0 6px 24px rgba(0, 0, 0, 0.12)", // Optional hover effect
        },
      }}
    >
      <Stack spacing={2}>
        <HorizontalStack justifyContent="space-between" alignItems="center">
          <HorizontalStack spacing={1} alignItems="center">
            <AiOutlineUser size={22} />
            <Typography variant="subtitle1" fontWeight={600}>
              Find Others
            </Typography>
          </HorizontalStack>
          <IconButton
            sx={{ p: 0.5 }}
            disabled={loading}
            onClick={handleClick}
            title="Refresh suggestions"
          >
            <MdRefresh size={20} />
          </IconButton>
        </HorizontalStack>

        <Divider />

        {loading ? (
          <Loading />
        ) : (
          users &&
          users.map((user) => (
            <UserEntry username={user.username} key={user.username} />
          ))
        )}
      </Stack>
    </Card>
  );
};

export default FindUsers;
