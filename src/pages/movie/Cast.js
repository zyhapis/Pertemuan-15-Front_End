import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Avatar,
  Stack,
  Text,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import GetMovieCast from "../../utils/networks/GetMovieCast";
import Flickity from "flickity";
import "flickity/css/flickity.css";
import { useBreakpointValue } from "@chakra-ui/react";

const Cast = ({ movieId }) => {
  const [cast, setCast] = useState([]);
  const flickityRef = useRef(null);

  const getCast = async (id) => {
    const data = await GetMovieCast(id);
    setCast(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCast(movieId);
    };

    fetchData();
  }, [movieId]);

  useEffect(() => {
    if (cast.length === 0) return;

    if (flickityRef.current) {
      flickityRef.current.destroy();
    }

    flickityRef.current = new Flickity(".carousel", {
      cellAlign: "left",
      contain: true,
      wrapAround: true,
      prevNextButtons: false,
      pageDots: false,
    });
  }, [cast]);

  const gradientColor = useColorModeValue(
    "rgba(255, 255, 255, 0.8)",
    "rgba(0, 0, 0, 0.8)"
  );

  const textColor = useColorModeValue(
    "rgba(0, 0, 0, 0.8)",
    "rgba(255, 255, 255, 0.8)"
  );

  // Calculate avatar size based on screen breakpoints
  const avatarSize = useBreakpointValue({ base: "md", lg: "xl" });

  return (
    <Box>
      <Stack spacing={6} p={6}>
        <Heading as="h2" fontSize="2xl" mb={4}>
          Cast
        </Heading>
        <div className="carousel" style={{ margin: "0 -10px" }}>
          {cast.map((actor) => (
            <div key={actor.id} className="carousel-cell" style={{ padding: "0 10px" }}>
              <Box
                bgImage={`linear-gradient(${gradientColor}, ${gradientColor}), url(https://image.tmdb.org/t/p/original/${actor.profile_path})`}
                bgSize="cover"
                borderRadius="xl"
                boxShadow="md"
                overflow="hidden"
                textAlign="center"
                p={4}
              >
                <Avatar
                  src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                  alt={actor.name}
                  size={avatarSize}
                  mb={2}
                />
                <Text fontSize="md" fontWeight="bold" mb={2}>
                  {actor.name}
                </Text>
                <Text fontSize="sm" fontWeight="bold" color={textColor}>
                  {actor.character}
                </Text>
              </Box>
            </div>
          ))}
        </div>
      </Stack>
    </Box>
  );
};

export default Cast;
