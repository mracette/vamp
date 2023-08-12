import "../styles/global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { font } from "@/theme/font";
import { Box, Container, Typography } from "@mui/material";
import { NavigationTabs } from "@/components/NavigationTabs";

export const metadata: Metadata = {
  title: "Vamp",
  description: "Vamp your samples.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeRegistry options={{ key: "mui" }}>
          <Container maxWidth={"md"} sx={{ py: 12 }}>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Typography variant="h4">VAMP</Typography>
              <NavigationTabs />
            </Box>
            {children}
          </Container>
        </ThemeRegistry>
      </body>
    </html>
  );
}
