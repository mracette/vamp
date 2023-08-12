"use client";

import { Tab, Tabs } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

export function NavigationTabs() {
  const pathname = usePathname();
  const router = useRouter();

  let tabValue: number = 0;

  if (pathname === "") tabValue = 0;
  if (pathname === "/history") tabValue = 1;
  if (pathname === "/info") tabValue = 1;

  return (
    <Tabs value={tabValue}>
      <Tab label="Create" onClick={() => router.push("/")} />
      <Tab label="History" onClick={() => router.push("/history")} />
      <Tab label="Info" onClick={() => router.push("/")} />
    </Tabs>
  );
}
