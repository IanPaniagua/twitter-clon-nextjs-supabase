import { Databas as DB } from "@/lib/database.types";

declare global {
    type Database = DB;
}