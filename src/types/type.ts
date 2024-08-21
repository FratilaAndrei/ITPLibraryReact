import { ReactNode } from "react";

export type CarrouselItem = {
    id: number;
    image: string;
  };

  export type BookType = {
    id: number;
    image: string;
    title: string;
    author: string;
    price: number;
    isBestBook: boolean;
    quantity: number;
    status: string;
  };

 export type BookRowType = {
    title: string;
    books: BookType[];
    id: number;
  };

export type ButtonGroupType = {
  id: number,
  label: string,
  link?: string,
  icon?: ReactNode,
  onClick?: () => void,
  className?: string, 
}