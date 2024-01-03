export interface Product {
  id: number;
  prName: string;
  expires: Date;
  opened: Date;
  expiresInDays: number;
  imgUrl: string;
  user: User[];
  userId: number;
  category: Category[];
  categoryId: number;
  description: string;
  important: boolean;
}

export interface User {
  id: number;
  email: string;
  password: string;
}

export interface Category {
  id: number;
  catName: string;
}
