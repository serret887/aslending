"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Client } from "./columns"

interface BulkActionsModalProps {
  selectedClients: Client[]
  onAction: (action: string) => void
}

export function BulkActionsModal({
  selectedClients,
  onAction,
}: BulkActionsModalProps) {
  const [open, setOpen] = React.useState(false)

  const handleAction = (action: string) => {
    onAction(action)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="ml-4">
          Bulk Actions ({selectedClients.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bulk Actions</DialogTitle>
          <DialogDescription>
            Apply actions to {selectedClients.length} selected clients
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => handleAction("create-strategy")}
          >
            Create Strategy
          </Button>
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => handleAction("pre-approve")}
          >
            Pre-approve
          </Button>
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => handleAction("get-mortgage")}
          >
            Get Mortgage
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 