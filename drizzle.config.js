import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials:{
  url:'postgresql://neondb_owner:npg_aEkSF2LAmpz1@ep-dark-frost-a8hnkxpb-pooler.eastus2.azure.neon.tech/crazy-lmsdatabase?sslmode=require'
 }
});
