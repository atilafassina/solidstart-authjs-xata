// Generated by Xata Codegen 0.23.5. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  { name: "books", columns: [{ name: "title", type: "string" }] },
  { name: "clients", columns: [{ name: "username", type: "email" }] },
  {
    name: "purchase",
    columns: [
      { name: "client", type: "link", link: { table: "clients" } },
      { name: "book", type: "link", link: { table: "books" } },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Books = InferredTypes["books"];
export type BooksRecord = Books & XataRecord;

export type Clients = InferredTypes["clients"];
export type ClientsRecord = Clients & XataRecord;

export type Purchase = InferredTypes["purchase"];
export type PurchaseRecord = Purchase & XataRecord;

export type DatabaseSchema = {
  books: BooksRecord;
  clients: ClientsRecord;
  purchase: PurchaseRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL: "https://demos-urucbe.eu-west-1.xata.sh/db/bookstore-solidjs",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
