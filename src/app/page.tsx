import { columns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import { Shell } from "@/components/shells/shell";
import { vaultSchema } from "@/lib/validations/schema";
import { z } from "zod";
import OrbitLogo from "/public/logofin.png";
import Link from "next/link";
import { Twitter, Linkedin } from "lucide-react";
import { getDeFiLlamaVaults } from "@/lib/api/defillama"; // ✅ Correct API import

export const runtime = "edge";

async function getVaults() {
  try {
    const rawData = await getDeFiLlamaVaults();

    if (!Array.isArray(rawData) || rawData.length === 0) {
      console.warn("No valid data returned from DeFiLlama API:", rawData);
      return [];
    }

    // ✅ Validate with Zod, using safeParse
    const vaults = z.array(vaultSchema).safeParse(rawData);

    if (!vaults.success) {
      console.error("Data validation failed:", vaults.error);
      return [];
    }

    return vaults.data;
  } catch (error) {
    console.error("Error processing vault data:", error);
    return [];
  }
}

export default async function VaultPage() {
  const vaults = await getVaults();

  return (
    <Shell>
      <div className="flex h-full min-h-screen w-full flex-col">
        {/* Vaults Header */}
        <h1 className="text-3xl font-bold text-white mb-8">Vaults</h1>

        {/* Vaults Info Boxes */}
        <div className="my-8 grid grid-cols-3 gap-8">
          <div className="bg-[#030816] text-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium mb-2">Prime Vaults TVL</h3>
            <div className="bg-[#1a1a1a] rounded-lg px-4 py-2 inline-block text-xl font-bold mb-2">
              $1.5M
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Risk adjusted yield, very low insolvency risk strategies with
              bluechip, highly liquid assets as collateral.
            </p>
          </div>
          <div className="bg-[#030816] text-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium mb-2">Core Vaults TVL</h3>
            <div className="bg-[#1a1a1a] rounded-lg px-4 py-2 inline-block text-xl font-bold mb-2">
              $4.2M
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Higher yield, low insolvency risk strategies with a blend of
              bluechip and small cap assets as collateral.
            </p>
          </div>
          <div className="bg-[#030816] text-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium mb-2">Total TVL</h3>
            <div className="bg-[#1a1a1a] rounded-lg px-4 py-2 inline-block text-xl font-bold mb-2">
              $5.7M
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Total value locked across all vaults.
            </p>
          </div>
        </div>

        {/* Data Table */}
        <DataTable data={vaults} columns={columns} />

        {/* Footer */}
        <footer className="mt-12 bg-[#030816] text-white py-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <Link href="https://www.orbitsky.xyz/" className="hover:text-white">
                About Orbit
              </Link>
              <Link href="#" className="hover:text-white">
                Resources
              </Link>
              <Link href="https://www.app.orbitsky.xyz/" className="hover:text-white">
                Platform
              </Link>
              <Link href="#" className="hover:text-white">
                Careers
              </Link>
              <Link href="#" className="hover:text-white">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white">
                Disclaimer
              </Link>
            </div>

            {/* Orbit Logo */}
            <div className="flex items-center space-x-2">
              <img src={OrbitLogo.src} alt="Orbit Logo" className="h-6 w-6" />
              <span className="text-lg font-bold">Orbit</span>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <Link href="https://x.com/orbitskyhq" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-white" />
              </Link>
              <Link href="https://linkedin.com/company/orbitskyhq" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-white" />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </Shell>
  );
}