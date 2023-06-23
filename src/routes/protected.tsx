import { getSession } from "@solid-auth/base";
import { signOut } from "@solid-auth/base/client";
import { For, Show, type VoidComponent } from "solid-js";
import { useRouteData } from "solid-start";
import {
  createServerAction$,
  createServerData$,
  redirect,
} from "solid-start/server";
import { authOptions } from "~/server/auth";
import { getXataClient } from "~/xata.codegen";
import { nanoid } from "nanoid";
import { Session } from "@auth/core/types";

type ExtendedSession = Session & { userId: string };

export const purchaseAction = async (
  formData: FormData,
  { request }: Record<"request", Request>
) => {
  const xata = getXataClient();

  const session = (await getSession(request, authOptions)) as ExtendedSession;
  const { book } = Object.fromEntries(formData.entries()) as Record<
    "book",
    string
  >;
  await xata.db.purchase.create({
    book,
    client: session?.userId,
  });
};

export const routeData = () => {
  return createServerData$(async (_, event) => {
    const xata = getXataClient();

    const session = await getSession(event.request, authOptions);
    if (!session) {
      throw redirect("/");
    }

    const { records } = await xata.db.books.getPaginated();

    return {
      session,
      books: records,
    };
  });
};

const Protected: VoidComponent = () => {
  const data = useRouteData<typeof routeData>();
  const [_, { Form }] = createServerAction$(purchaseAction);
  const books = () => data()?.books;
  const session = () => data()?.session;

  return (
    <Show when={session()} keyed>
      {(us) => (
        <main>
          <h1>Protected</h1>
          {us.user?.image ? <img src={us.user?.image} /> : null}
          <span>Hey there {us.user?.name}! You are signed in!</span>
          <section>
            Now that you are logged in, you can purchase!
            <Form
              style={{
                display: "grid",
                "grid-template-columns": "1fr 1fr 1fr",
                gap: "2rem",
                padding: "5rem 0",
              }}
            >
              <For each={books()} fallback={"books are coming"}>
                {(book) => (
                  <button type="submit" name="book" value={book.id}>
                    {book.title}
                  </button>
                )}
              </For>
            </Form>
          </section>
          <button
            onClick={() =>
              void signOut({
                redirectTo: "/",
                redirect: true,
              })
            }
          >
            Sign Out
          </button>
        </main>
      )}
    </Show>
  );
};

export default Protected;
