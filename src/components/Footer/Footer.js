import { Box, Text } from "@chakra-ui/react";

const Footer = () => {

  return (
    <Box
      as="footer"
      backgroundColor="#b81d24"
      color="#f5f5f1"
      textAlign="center"
      py="4"
      position="relative"
      bottom="0"
      width="100%"
    >
      <Text fontSize="xl" fontWeight="bold" mb="2">
        My Movie
      </Text>
      <Text fontSize="md" fontStyle="italic">
        Created by Hapis
      </Text>
    </Box>
  );
};

export default Footer;
