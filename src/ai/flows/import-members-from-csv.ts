'use server';

/**
 * @fileOverview Imports member data from a CSV file, using AI to map columns to member fields.
 *
 * - importMembersFromCsv - A function that handles importing member data from a CSV file.
 * - ImportMembersFromCsvInput - The input type for the importMembersFromCsv function.
 * - ImportMembersFromCsvOutput - The return type for the importMembersFromCsv function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImportMembersFromCsvInputSchema = z.object({
  csvData: z
    .string()
    .describe('The CSV data to import.'),
});
export type ImportMembersFromCsvInput = z.infer<typeof ImportMembersFromCsvInputSchema>;

const ImportMembersFromCsvOutputSchema = z.object({
  fieldMapping: z.record(z.string(), z.string()).describe('A mapping of CSV columns to member fields.'),
  importSummary: z.string().describe('A summary of the import operation.'),
});
export type ImportMembersFromCsvOutput = z.infer<typeof ImportMembersFromCsvOutputSchema>;

export async function importMembersFromCsv(input: ImportMembersFromCsvInput): Promise<ImportMembersFromCsvOutput> {
  return importMembersFromCsvFlow(input);
}

const prompt = ai.definePrompt({
  name: 'importMembersFromCsvPrompt',
  input: {schema: ImportMembersFromCsvInputSchema},
  output: {schema: ImportMembersFromCsvOutputSchema},
  prompt: `You are an expert data analyst skilled at importing data from CSV files.

You will receive CSV data containing member information for a gym. Your task is to analyze the CSV data and determine the mapping between the CSV columns and the expected member fields.

Expected member fields:
- memberNumber: The unique identifier for the member.
- firstName: The member's first name.
- lastName: The member's last name.
- birthday: The member's date of birth.
- signupDate: The date the member signed up.
- paymentCycle: The member's payment cycle (e.g., monthly, yearly).
- treadmillAccess: Whether the member has treadmill access (true/false).
- status: The member's status (e.g., active, inactive).

Analyze the following CSV data:
{{{csvData}}}

Provide the field mapping as a JSON object where the keys are the CSV column names and the values are the corresponding member fields.  Also, give a brief summary of any assumptions or issues encountered during the import.

Example output:
{
  "fieldMapping": {
    "Member ID": "memberNumber",
    "First Name": "firstName",
    "Last Name": "lastName",
    "Date of Birth": "birthday",
    "Signup Date": "signupDate",
    "Payment Cycle": "paymentCycle",
    "Treadmill": "treadmillAccess",
    "Status": "status"
  },
  "importSummary": "Successfully mapped all columns to member fields.  Assumed 'Treadmill' column represents treadmill access."
}

Ensure the JSON is parsable.
`,
});

const importMembersFromCsvFlow = ai.defineFlow(
  {
    name: 'importMembersFromCsvFlow',
    inputSchema: ImportMembersFromCsvInputSchema,
    outputSchema: ImportMembersFromCsvOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
