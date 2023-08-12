import { replicateClient } from "@/app/api/vamp/replicateClient";
import { AudioControl } from "@/components/AudioControl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export const revalidate = 0;

export async function PredictionList() {
  const response = await replicateClient.predictions.list();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Created</TableCell>
          <TableCell>Prompt</TableCell>
          <TableCell>Output</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {response.results.map(({ created_at, input, output, id, status }) => (
          <TableRow key={id}>
            <TableCell>{created_at}</TableCell>
            <TableCell>
              {"prompt" in input ? (input.prompt as string) : ""}
            </TableCell>
            <TableCell>
              <AudioControl src={output} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
