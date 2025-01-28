export async function getDeFiLlamaVaults() {
    try {
      const response = await fetch("https://yields.llama.fi/pools", {
        cache: "no-store", // Prevents caching issues
      });
  
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Fetched Vault Data:", data);
  
      // ✅ Ensure we extract the array of vaults from the object
      const vaultsArray = Array.isArray(data) ? data : data.data || [];
  
      if (!Array.isArray(vaultsArray)) {
        console.error("Expected an array but received:", vaultsArray);
        return [];
      }
  
      return vaultsArray.map((vault: any) => ({
        id: vault.pool || "Unknown",
        network: vault.chain || "Unknown",
        supplyToken: vault.symbol || "Unknown",
        netAPY: vault.apy ? `${vault.apy.toFixed(2)}%` : "N/A%",
        totalSupply: vault.tvlUsd ? `$${(vault.tvlUsd / 1_000_000).toFixed(2)}M` : "N/A",
        liquidity: vault.liquidity || "N/A",
        fee: vault.fee ? `${vault.fee.toFixed(2)}%` : "N/A%",
        vaultAddress: vault.url || "N/A",
      }));
    } catch (error) {
      console.error("Error fetching vault data:", error);
      return [];
    }
  }