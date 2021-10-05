import React from "react";
import { PlayerOnBoard } from "../types/Player";

const PlayerOnBoardList = ({ players }: { players: PlayerOnBoard[] }) => {
  return (
    <div className="ml-2 flex flex-col h-4/5 over gap-4">
      {players
        .sort((a, b) => (a.name < b.name ? -1 : 1))
        .map((p, i) => {
          const { name, id, position, age, number, photoUrl, active, team } = p;
          return (
            <div key={id} className="flex">
              <img
                className="w-16 h-16 rounded-full ring-2"
                src={photoUrl}
                alt={name}
              />
              <div className="flex flex-col ml-2 my-auto">
                <p className="text-base subpixel-antialiased">{name}</p>
                <p className="tracking-wide text-gray-500 text-xs font-extralight subpixel-antialiased">
                  {position} · {age}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default PlayerOnBoardList;
