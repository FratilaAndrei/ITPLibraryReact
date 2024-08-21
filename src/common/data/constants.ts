 import book1 from "../../assets/images/medea.jpg";
import book2 from "../../assets/images/the-book-of-disquiet.jpg";
import book3 from "../../assets/images/the-idiot.jpg";
import { SHOPPING_CART_ROUTE } from "./routes";


 export const BOOKS = [
    {
      id: 1,
      image:book1,
      title: "Hero With Daniel",
      author: "Dougie Rogers",
      price: 90,
      isBestBook: true,
      quantity: 1,
      status: "In Progress",
    },
    {
      id: 2,
      image: book2,
      title: "Goddess Of Insanity",
      author: "Dennis Jenkins",
      price: 70,
      isBestBook: true,
      quantity: 1,
      status: "In Progress",
    },
    {
      id: 3,
      title: "Thieves Of The Lost World Of G...",
      image: book3,
      author: "Quinn Holland",
      price: 80,
      isBestBook: true,
      quantity: 1,
      status: "In Progress",
    },
    {
      id: 4,
      image: book1,
      title: "Hunters Of Utopia",
      author: "Cole Porter",
      price: 60,
      isBestBook: true,
      quantity: 1,
      status: "In Progress",
    },
    {
      id: 5,
      image: book2,
      title: "Lords And Gods",
      author: "Elis Booth",
      price: 65,
      isBestBook: true,
      quantity: 1,
      status: "In Progress",
    },
    {
      id: 6,
      image: book3,
      title: "Girls And Officers",
      author: "Victor Miller",
      price: 75,
      isBestBook: true,
      quantity: 1,
      status: "In Progress",
    },
    {
      id: 7,
      image: book1,
      title: "Dragon's Whisper",
      author: "Lena Storm",
      price: 85,
      isBestBook: false,
      quantity: 1,
      status: "In Progress",
    },
    {
      id: 8,
      image: book2,
      title: "Realm of Shadows",
      author: "Aric Blackwood",
      price: 78,
      isBestBook: false,
      quantity: 1,
      status: "In Progress",
    },
    {
      id: 9,
      image: book3,
      title: "The Silver Crown",
      author: "Evelyn Starling",
      price: 92,
      isBestBook: false,
      quantity: 1,
      status: "In Progress",
    },
    {
      id: 10,
      image: book1,
      title: "Winds of Fate",
      author: "Jaxon Hunter",
      price: 70,
      isBestBook: false,
      quantity: 1,
      status: "In Progress",
    },
    {
      id: 11,
      image: book2,
      title: "Curse of the Dead",
      author: "Mira Ravenwood",
      price: 80,
      isBestBook: false,
      quantity: 1,
      status: "In Progress",
    },
    {
      id: 12,
      image: book3,
      title: "The Phoenix Blade",
      author: "Damon Ashcroft",
      price: 88,
      isBestBook: false,
      quantity: 1,
      status: "In Progress",
    },
  ];


 export const BOOKS_ROWS = [
    {
      id: 1,
      title: "Best Books of the Month",
      books: BOOKS.slice(0, 6),
    },
    {
      id:2 ,
      title: "Recently Added",
      books: BOOKS.slice(-6),
    }
  ];

  export const BUTTON_GROUP = [{
    id: 1,
    label: "Cancel Order",
    link: {SHOPPING_CART_ROUTE},
  }]

  