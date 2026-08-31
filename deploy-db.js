const { Client } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: ".env.local" });

async function deploySchema() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.error("❌ Error: DATABASE_URL is not defined in .env.local");
    console.log("Please add your connection string first, for example:");
    console.log("DATABASE_URL=postgresql://postgres:your-vps-db-password@YOUR_VPS_IP:5432/postgres");
    process.exit(1);
  }

  console.log("🔌 Connecting to database...");
  const client = new Client({ connectionString });

  try {
    await client.connect();
    console.log("✅ Connected successfully!");

    const schemaPath = path.join(__dirname, "supabase", "schema.sql");
    console.log(`📖 Reading schema file from ${schemaPath}...`);
    const sql = fs.readFileSync(schemaPath, "utf8");

    console.log("🚀 Executing database schema...");
    await client.query(sql);
    console.log("🎉 Database schema deployed successfully! All tables and RLS rules are active.");

  } catch (error) {
    console.error("❌ Database deployment failed:");
    console.error(error.message);
  } finally {
    await client.end();
  }
}

deploySchema();
