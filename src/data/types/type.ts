import { HTMLInputTypeAttribute, ReactNode } from "react";
// import { v4 as uuidv4 } from "uuid";

export type BookModel = {
  id: number;
  image: string;
  title: string;
  author: string;
  price: number;
  isBestBook: boolean;
  quantity: number;
  status: string;
};

export type bookModel2 = {
  id: string;
  image: string;
  title: string;
  author: string;
  description: string;
  price: number;
  isBestBook: boolean;
  quantity: number;
  status: string;
};

export type BookRowModel = {
  title: string;
  books: BookModel[];
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

export type CarrouselItemModel = {
  id: number;
  image: string;
};

export type RoutesModel = {
  id: number;
  path: string;
  name: React.ComponentType;
};

export type LoginPageDataModel = {
  title: string;
  description: string;
  inputs?: LoginPageDataInputModel[];
  checkOption?: string;
  buttonText: string;
  options?: LoginPageDataOptionsModel[];
};

export type LoginPageDataInputModel = {
  label: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
};

export type LoginPageDataOptionsModel = {
  label: string;
  link: string;
};

export type orderDetailsModelWitoutId = {
  firstName: string;
  lastName: string;
  billingCity: "Romania" | "Italia" | "Germania";
  billingAddress: string;
  billingPhone: string;
  deliveryCity: "Romania" | "Italia" | "Germania";
  deliveryAddress: string;
  deliveryPhone: string;
  paymentType: "Cash" | "Online";
  deliveryDate: string;
  observations: string;
  recommended: boolean;
  showDelivery: boolean;
};

export type orderModel = {
  // id: string | undefined;
  id: string;
  quantity: number;
  status: "In Progress" | "Completed";
  price: number;
  orderDetails: orderDetailsModelWitoutId;
};

export type orderModelFetchModel = {
  id: string;
  totalPrice: number;
  totalQuantity: number;
  orderDetails: orderDetailsModel;
  status: "In Progress" | "Completed";
};

export type orderDetailsModel = {
  firstName: string;
  lastName: string;
  billingCity: "Romania" | "Italia" | "Germania";
  billingAddress: string;
  billingPhone: string;
  deliveryCity: "Romania" | "Italia" | "Germania";
  deliveryAddress: string;
  deliveryPhone: string;
  paymentType: "Cash" | "Online";
  deliveryDate: string;
  observations: string;
  recommended: boolean;
  showDelivery: boolean;
};
