import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Stack,
} from "@chakra-ui/react";
import GetDetailMovie from "../../utils/networks/GetDetailMovie";
import Header from "./Header";
import Cast from "./Cast";

const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  const getDetail = async (id) => {
    const data = await GetDetailMovie(id);
    setMovie(data);
  };

  useEffect(() => {
    getDetail(id);
  }, [id]);

  if (!movie.id) {
    return (
      <Box textAlign="center" justifyContent={"center"} p={10}>
        <CircularProgress isIndeterminate color="black" />
      </Box>
    );
  }

  return (
    <Box>
      <Stack spacing={8} p={8}>
        <Header movie={movie} />
        <Cast movieId={movie.id} />
      </Stack>
    </Box>
  );
};

export default Detail;
