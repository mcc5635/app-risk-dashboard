"use client";

import { z } from "zod";
import { VaultType } from "@/lib/validations/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

type EditProps = {
  vault: VaultType;
};

const editSchema = z.object({
  id: z.string(),
  network: z.string(),
  supplyToken: z.string(),
  netAPY: z.string(),
  totalSupply: z.string(),
  liquidity: z.string(),
  fee: z.string(),
  vaultAddress: z.string(),
});

type editSchemaType = z.infer<typeof editSchema>;

export default function EditDialog({ vault }: EditProps) {
  const form = useForm<editSchemaType>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      id: vault.id,
      network: vault.network,
      supplyToken: vault.supplyToken,
      netAPY: vault.netAPY,
      totalSupply: vault.totalSupply,
      liquidity: vault.liquidity,
      fee: vault.fee,
      vaultAddress: vault.vaultAddress,
    },
  });

  function onSubmit(values: editSchemaType) {
    console.log(values);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Vault Details</DialogTitle>
      </DialogHeader>
      <div className='py-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
            <FormField
              control={form.control}
              name='network'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Network</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='supplyToken'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supply Token</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='netAPY'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Net APY</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='mt-2 w-full'>
              Update Vault
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}