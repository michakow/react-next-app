import Link from "next/link";
import { db } from "./db";

export default async function Home() {
  const notes = await db.note.findMany();

  return (
    <div className="flex flex-col items-center">
      <p className="font-bold text-lg p-2 mb-6">Moje notatki</p>
      <Link href={"notes/new"}>
        <button className="rounded p-2 bg-blue-300 ">Dodaj nową</button>
      </Link>
      <div className="mt-9 w-2/4 max-w-[860px] min-w-[560px]">
        <ul className="list">
          <li>
            <div className="flex justify-between">
              <p className="item-paragraph">Nazwa notatki</p>
              <p className="item-paragraph">Data utworzenia</p>
              <p className="item-paragraph">Akcja</p>
            </div>
          </li>
          {notes.map((note) => {
            return (
              <li key={note.id}>
                <div className="flex justify-between">
                  <p className="item-paragraph">{note.name}</p>
                  <p className="item-paragraph">{note.date.toLocaleDateString()}</p>
                  <p className="item-paragraph">
                    <Link href={`notes/${note.id}`}>Szczegóły</Link>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
