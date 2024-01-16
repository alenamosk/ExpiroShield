export interface Product {
  id: number;
  prName: string;
  expires: Date;
  opened: Date;
  expiresInDays: number;
  imgUrl: string;
  user: User;
  category: Category;
  description: string;
  important: boolean;
}

export interface ProductFromApi extends Product {
  categoryId: number;
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
