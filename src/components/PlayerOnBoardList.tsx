import React from "react";
import { JsxElement } from "typescript";
import { PlayerOnBoard } from "../types/Player";

const PlayerOnBoardList = ({ players }: { players: PlayerOnBoard[] }) => {
  return (
    <div className="flex flex-col gap-2 divide-y-2 divide-gray-400">
      {players.map((p, i) => {
        const { name, id, position, age, number, photoUrl, active, team } = p;
        return (
          <div key={id} className="flex my-2">
            <img
              className="w-16 h-16 rounded-full border border-gray-500 shadow-sm"
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
