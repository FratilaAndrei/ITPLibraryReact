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

export type orderType = {
  id: string;
  quantity: number;
  status: "In Progress" | "Completed";
  price: number;
  form: formType;
};

export type formType = {
  firstName: string;
  lastName: string;
  billingCity: "Romania" | "Italia" | "Germania";
  billingAddress: string;
  billingPhone: string;
  deliveryCity: "Romania" | "Italia" | "Germania";
  deliveryAddress: string;
  deliveryPhone: string;
  paymentType: "Cash" | "Online";
  deliveryDate: Date;
  observations: string;
  recommended: boolean;
  showDelivery: boolean;
};
