import React from "react";
import { Footer, Navbar } from "src/components";
import { LayoutProps } from "./layout.props";
import Box from "@mui/material/Box";

const Layout = ({ children }: LayoutProps) => {
  return <>
    <Navbar />
    <Box minHeight={'90vh'}>
      {children}
    </Box>
    <Footer />
  </>;
};

export default Layout;
