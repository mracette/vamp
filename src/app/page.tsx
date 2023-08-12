import { CurrentFile } from "@/components/CurrentFile";
import { DropZone } from "@/components/DropZone";
import { Box } from "@mui/material";

export default function Page() {
  return (
    <main>
      <Box>
        <CurrentFile />
        <DropZone />
        {/* <SubmitButton /> */}
      </Box>
    </main>
  );
}
