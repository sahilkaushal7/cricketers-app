export type TPlayerType = "batsman" | "bowler" | "allRounder" | "wicketKeeper";

export type TPlayer = {
  id: string;
  name: string;
  description: string;
  type: TPlayerType;
  points: number;
  rank: number;
  dob: number;
};
