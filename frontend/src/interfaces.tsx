export interface ProductData {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  brand: string;
}

export interface ProductDataWithImage {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  brand: string;
  image: string;
}

export interface Navigation {
  self: string;
  next: string | null;
  prev: string | null;
  pages: number;
  current: number;
}
