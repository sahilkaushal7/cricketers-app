import { EPlayerType } from "../types/players";

export const playerTypeMap: { [key in EPlayerType]: string } = {
  [EPlayerType.ALL]: "All",
  [EPlayerType.BATSMAN]: "Batsman",
  [EPlayerType.ALLROUNDER]: "All Rounder",
  [EPlayerType.BOWLER]: "Bowler",
  [EPlayerType.WICKETKEEPER]: "Wicket Keeper",
};
