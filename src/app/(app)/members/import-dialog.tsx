"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { importMembersFromCsv, type ImportMembersFromCsvOutput } from "@/ai/flows/import-members-from-csv";
import { Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const exampleCsv = `Member ID,First Name,Last Name,Date of Birth,Signup Date,Payment Cycle,Treadmill,Status
GF006,Sarah,Wilson,1993-10-08,2023-08-01,monthly,true,active
GF007,David,Lee,1989-04-12,2023-09-10,yearly,false,active`;

export function ImportDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [csvData, setCsvData] = useState(exampleCsv);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ImportMembersFromCsvOutput | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!csvData.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "CSV data cannot be empty.",
      });
      return;
    }
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await importMembersFromCsv({ csvData });
      setAnalysisResult(result);
    } catch (error) {
      console.error("AI analysis failed:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not analyze the CSV data. Please check the format and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = () => {
    // Here you would typically send the CSV data and mapping to your backend to perform the actual import.
    toast({
      title: "Import Successful",
      description: "Members have been imported. (This is a demo)",
    });
    onOpenChange(false);
    setAnalysisResult(null);
  };
  
  const handleClose = (isOpen: boolean) => {
    if(!isOpen) {
      setAnalysisResult(null);
      setCsvData(exampleCsv);
    }
    onOpenChange(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Import Members from CSV</DialogTitle>
          <DialogDescription>
            Paste your CSV data below. The AI will attempt to map the columns to the correct member fields.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="csv-data">CSV Data</Label>
            <Textarea
              id="csv-data"
              value={csvData}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCsvData(e.target.value)}
              placeholder="Paste CSV content here"
              className="min-h-[150px] font-mono text-xs"
            />
          </div>
        </div>
        {analysisResult && (
            <div>
                <h3 className="font-semibold mb-2">Analysis Result</h3>
                <p className="text-sm text-muted-foreground mb-4">{analysisResult.importSummary}</p>
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>CSV Column</TableHead>
                        <TableHead>Mapped Field</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(analysisResult.fieldMapping).map(([csvCol, memberField]) => (
                        <TableRow key={csvCol}>
                          <TableCell>{csvCol}</TableCell>
                          <TableCell><Badge variant="outline">{memberField}</Badge></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
            </div>
        )}
        <DialogFooter>
          {analysisResult ? (
            <Button onClick={handleImport} className="w-full sm:w-auto">Confirm and Import</Button>
          ) : (
            <Button onClick={handleAnalyze} disabled={isLoading} className="w-full sm:w-auto">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Analyze Data
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
