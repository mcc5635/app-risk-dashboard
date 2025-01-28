"use client"

// * * This is just a demostration of delete modal, actual functionality may vary

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
  import { VaultType } from "@/lib/validations/schema";
  import { Button } from "@/components/ui/button";
  
  type DeleteProps = {
    task: VaultType;
    isOpen: boolean;
    showActionToggle: (open: boolean) => void;
  };
  
  export default function DeleteDialog({
    task,
    isOpen,
    showActionToggle,
  }: DeleteProps) {
    return (
      <AlertDialog open={isOpen} onOpenChange={showActionToggle}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure absolutely sure ?</AlertDialogTitle>
            
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant='destructive'
              onClick={() => {
                showActionToggle(false);
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }