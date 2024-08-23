import { HTMLInputTypeAttribute, ReactNode } from "react";

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
  id: number;
  label: string;
  link?: string;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
};

export type CarrouselItemType = {
  id: number;
  image: string;
};

export type RoutesType = {
  id: number;
  path: string;
  name: React.ComponentType;
};

export type LoginPageDataType = {
  title: string;
  description: string;
  inputs?: LoginPageDataInputType[];
  checkOption?: string;
  buttonText: string;
  options?: LoginPageDataOptions[];
};

export type LoginPageDataInputType = {
  label: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
};

export type LoginPageDataOptions = {
  label: string;
  link: string;
};
