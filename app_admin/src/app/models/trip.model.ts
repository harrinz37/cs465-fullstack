export interface Trip {
  _id?: string;
  id?: string;
  code: string;
  name: string;
  start: string;
  resort: string;
  length: number;
  price?: number;
  description: string;
  image: string;
}

