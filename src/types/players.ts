export enum EPlayerType {
  ALL = "all",
  BATSMAN = "batsman",
  BOWLER = "bowler",
  ALLROUNDER = "allRounder",
  WICKETKEEPER = "wicketKeeper",
}

export type TPlayer = {
  id: string;
  name: string;
  description: string;
  type: EPlayerType;
  points: number;
  rank: number;
  dob: number;
};
