import { db } from "@/app/db";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type NoteDetailsPageProps = {
  params: { id: string };
};

export default async function NoteDetailsPage(props: NoteDetailsPageProps) {
  const note = await db.note.findFirst({
    where: { id: parseInt(props.params.id) },
  });

  async function deleteNote() {
    "use server";

    await db.note.delete({ where: { id: note?.id } });

    redirect("/");
  }

  if (!note) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center w-full">
      <p className="font-bold text-lg p-2 mb-9">Szczegóły notatki</p>
      <div className="flex flex-col gap-2 w-2/4 max-w-[860px]">
        <div className="flex details-row gap-2">
          <p>Nazwa notatki:</p>
          <p>{note.name}</p>
        </div>
        <div className="flex details-row gap-2">
          <p>Data i godzina utworzenia:</p>
          <p>{note.date.toLocaleString()}</p>
        </div>
        <div className="flex flex-col gap-2 details-row">
          <p>Treść notatki</p>
          <p>{note.description}</p>
        </div>
      </div>
      <div className="flex gap-4 mt-9">
        <form action={deleteNote}>
          <button type="submit" className="rounded p-2 bg-blue-300 ">
            Usuń notatkę
          </button>
        </form>
        <Link href={"/"}>
          <button className="rounded p-2 bg-blue-300 ">Powrót do listy</button>
        </Link>
      </div>
    </div>
  );
}
