"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

import type { UploadResult } from "@/hooks/use-sales";

type UploadFeedbackProps = {
  error: string;
  uploadResult: UploadResult | null;
};

export function UploadFeedback({
  error,
  uploadResult,
}: UploadFeedbackProps) {
  return (
    <AnimatePresence mode="popLayout">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          <Alert variant="destructive">
            <AlertCircle className="size-4" />

            <AlertTitle>
              Upload failed
            </AlertTitle>

            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {uploadResult && !error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          <Alert>
            <CheckCircle2 className="size-4" />

            <AlertTitle>
              Import completed
            </AlertTitle>

            <AlertDescription>
              <p>
                Imported {uploadResult.imported} rows
                {uploadResult.rejected > 0 &&
                  ` and rejected ${uploadResult.rejected} invalid rows.`}
              </p>

              {uploadResult.errors.length > 0 && (
                <div className="mt-3 space-y-1 text-xs">
                  {uploadResult.errors
                    .slice(0, 5)
                    .map((errorItem, index) => (
                      <p key={index}>
                        • Row {errorItem.row}:{" "}
                        {errorItem.message}
                      </p>
                    ))}
                </div>
              )}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
}