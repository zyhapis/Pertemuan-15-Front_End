import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const Header = ({ movie }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setTrailerKey(data.results[0].key);
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    fetchTrailer();
  }, [movie.id]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.toLocaleDateString(undefined, { day: "numeric" });
    const month = date.toLocaleDateString(undefined, { month: "long" });
    const year = date.toLocaleDateString(undefined, { year: "numeric" });
    return `${day} ${month} ${year}`;
  };

  const gradientColor = useColorModeValue(
    "rgba(255, 255, 255, 0.8)",
    "rgba(0, 0, 0, 0.8)"
  );

  return (
    <Box>
      {movie.backdrop_path ? (
        <Box
          bgImage={`linear-gradient(${gradientColor}, ${gradientColor}), url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`}
          bgSize="cover"
          borderBottom="1px solid teal.500"
          borderRadius="xl"
          boxShadow="md"
          p={8}
          display="grid"
          gridTemplateColumns={{
            base: "1fr",
            md: "1fr 2fr",
            lg: "1fr 3fr",
          }}
          gap={8}
        >
          <Box>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              style={{
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                width: "100%",
                maxWidth: "300px",
              }}
            />
          </Box>
          <Box>
            <Heading
              as="h1"
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              mb={4}
            >
              {movie.title}
            </Heading>
            <Text fontSize={{ base: "md", md: "lg", lg: "xl" }} mb={4}>
              {movie.overview}
            </Text>
            <Text fontSize="md" mb={2}>
              Release Date: {formatDate(movie.release_date)}
            </Text>
            <Text fontSize="md" mb={2}>
              Vote Average: {movie.vote_average}
            </Text>
            <Text fontSize="md" mb={4}>
              Genres: {movie.genres.map((genre) => genre.name).join(", ")}
            </Text>
            <Button
              onClick={openModal}
              bg="#b81d24"
              color="white"
            >
              View Trailer
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          borderBottom="1px solid teal.500"
          borderRadius="xl"
          boxShadow="md"
          p={8}
          display="grid"
          gridTemplateColumns={{
            base: "1fr",
            md: "1fr 2fr",
            lg: "1fr 3fr",
          }}
          gap={8}
        >
          <Box>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              style={{
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                width: "100%",
                maxWidth: "300px",
              }}
            />
          </Box>
          <Box>
            <Heading
              as="h1"
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              mb={4}
            >
              {movie.title}
            </Heading>
            <Text fontSize={{ base: "md", md: "lg", lg: "xl" }} mb={4}>
              {movie.overview}
            </Text>
            <Text fontSize="md" mb={2}>
              Release Date: {formatDate(movie.release_date)}
            </Text>
            <Text fontSize="md" mb={2}>
              Vote Average: {movie.vote_average}
            </Text>
            <Text fontSize="md" mb={4}>
              Genres: {movie.genres.map((genre) => genre.name).join(", ")}
            </Text>
            <Button
              onClick={openModal}
              bg="#b81d24"
              color="white"
            >
              View Trailer
            </Button>
          </Box>
        </Box>
      )}

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{movie.title} Trailer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {trailerKey && (
              <iframe
                title="Trailer"
                width="100%"
                height="400px"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              bg="#b81d24"
              color="white"
              onClick={closeModal}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Header;
