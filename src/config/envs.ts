import "dotenv/config";
import { z } from "zod";

interface EnvVars {
  PORT?: number;
  DATABASE_URL?: string;
  NATS_SERVERS?: string[]
}

const envSchema = z.object({
  PORT: z.preprocess(
    (p: string) => Number(p),
    z.number({ required_error: "Environment Variable PORT is required" })
  ),
  DATABASE_URL: z.string(),
  NATS_SERVERS: z.preprocess((p: string) => p.split(','), z.array(z.string()))
});

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  const envar = error.issues[0].path;
  throw new Error(
    `Config validation Error: ${envar}:${error.issues[0].message}`
  );
}

//extract typing 
const envVars: EnvVars = data;

export const envs = {
  port: envVars.PORT,
  db_url: envVars.DATABASE_URL,
  nats_servers: envVars.NATS_SERVERS
};
