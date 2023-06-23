# SolidStart + AuthJS + Xata

This app is a proof of concept bookstore.

- Solid-Start as the app's framework
- Auth.js to handle Authorization
- Xata to persist data.

## Creating a project

Link to a Xata database. Push the schema as `schema-template.json`.
There are 3 tables:

- **clients**: a table of every user's email **who have made a purchase**
- **books**: all books that are for sale
- **purchases**: is a junction table, it stores the `id` of each `client` and a the `id` of the purchased `book`.

## Developing

```
pnpm dev
```
