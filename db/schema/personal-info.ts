import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { documentTable } from "./document";

export const personalInfoTable = pgTable("personal_info", {
    id: serial("id").notNull().primaryKey(),
    docId: integer("document_id").references(() => documentTable.id, {
        onDelete: "cascade",
    }),
    firstName: varchar("first_name", { length: 255 }),
    lastName: varchar("last_name", { length: 255 }),
    jobTitle: varchar("job_title", { length: 255 }),
    address: varchar("address", { length: 500 }),
    phone: varchar("phone", { length: 50 }),
    email: varchar("email", { length: 255 }),
})