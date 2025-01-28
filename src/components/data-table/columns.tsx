"use client";

import { ChevronRight } from "lucide-react"; // Import the ChevronRight icon
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "./data-table-column-header";
import { VaultType } from "@/lib/validations/schema"; // <-- Change from TaskType to VaultType

export const columns: ColumnDef<VaultType>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "network",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Network" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("network")}</Badge>
    ),
  },
  {
    accessorKey: "supplyToken",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Supply Token" />
    ),
    cell: ({ row }) => <span>{row.getValue("supplyToken")}</span>,
  },
  {
    accessorKey: "netAPY",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Net APY" />
    ),
    cell: ({ row }) => <span>{row.getValue("netAPY")}</span>,
  },
  {
    accessorKey: "totalSupply",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Supply" />
    ),
    cell: ({ row }) => <span>{row.getValue("totalSupply")}</span>,
  },
  {
    accessorKey: "liquidity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Liquidity" />
    ),
    cell: ({ row }) => <span>{row.getValue("liquidity")}</span>,
  },
  {
    accessorKey: "fee",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fee" />
    ),
    cell: ({ row }) => <span>{row.getValue("fee")}</span>,
  },
  {
    accessorKey: "vaultAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vault Address" />
    ),
    cell: ({ row }) => <span className="truncate">{row.getValue("vaultAddress")}</span>,
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <button
          onClick={() => console.log(`Row details for ${row.original.id}`)}
          className="flex items-center justify-center h-8 w-8 bg-[#1a1a1a] rounded-md border border-[#2c2c2c] text-muted-foreground hover:text-white hover:bg-[#2c2c2c] focus:outline-none"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];