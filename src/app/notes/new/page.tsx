import { db } from "@/app/db";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function NoteCreatePage() {
  async function createNote(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    const note = await db.note.create({
      data: {
        name,
        description,
        date: new Date(),
      },
    });

    console.log(note);

    redirect("/");
  }

  return (
    <div className="flex flex-col items-center">
      <p className="font-bold text-lg p-2 mb-9">Nowa notatka</p>

      <form
        action={createNote}
        className="flex flex-col w-2/4 gap-4 max-w-[860px]"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Nazwa notatki</label>
          <input
            type="text"
            name="name"
            id="name"
            className="border rounded p-2 w-full"
            placeholder="Wpisz nazwę.."
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Treść notatki</label>
          <textarea
            name="description"
            id="description"
            rows={5}
            className="border rounded p-2 w-full"
            placeholder="Wpisz treść.."
            required
          ></textarea>
        </div>

        <div className="flex gap-4 mt-9 justify-center">
          <button type="submit" className="rounded p-2 bg-blue-300 ">
            Dodaj notatkę
          </button>
          <Link href={"/"}>
            <button className="rounded p-2 bg-blue-300 ">
              Powrót do strony gównej
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
