import {PrismaClient} from "@prisma/client";
import {PrismaPg} from "@prisma/adapter-pg";

const globalDb=globalThis as unknown as {db?:PrismaClient};
const adapter=new PrismaPg({
 connectionString:process.env.DATABASE_URL!,
 max:1,
 idleTimeoutMillis:0,
 connectionTimeoutMillis:10_000,
});

export const db=globalDb.db??new PrismaClient({adapter});
if(process.env.NODE_ENV!=="production")globalDb.db=db;
