export type Member = {
  id: number;
  name: string;
  role: string;
};

export type Band = {
  id: number;
  name: string;
  genre: string;
  image: string; 
  members: Member[];
};