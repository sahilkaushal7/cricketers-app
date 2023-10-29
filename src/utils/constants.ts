import { EPlayerType } from "../types/players";

export const LOCAL_STORAGE_FILTERS_KEY = 'cricketers-app-filters';
export const LOCAL_STORAGE_PLAYERS_MAP_KEY = 'cricketers-app-players-map';

export const playerTypeMap: { [key in EPlayerType]: string } = {
  [EPlayerType.ALL]: "All",
  [EPlayerType.BATSMAN]: "Batsman",
  [EPlayerType.ALLROUNDER]: "All Rounder",
  [EPlayerType.BOWLER]: "Bowler",
  [EPlayerType.WICKETKEEPER]: "Wicket Keeper",
};
