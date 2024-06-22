export interface Player {
  username: string;
  createdAt: Date;
  lastLogin: Date;
  level: number;
  seen: string[];
  caught: string[];
  partner: string;
  party: string[];
  _id: string;
}
