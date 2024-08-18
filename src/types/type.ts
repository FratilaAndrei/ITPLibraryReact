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