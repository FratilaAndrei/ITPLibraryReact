import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          carrouselDescription: {
            title: "Buy textbooks for the best price",
            description:
              "From applied literature to educational resources, we have a lot of textbooks to offer you. We sell only the best books.",
          },
          navbar: {
            home: "Home",
            shoppingCart: "Shopping Cart",
            orders: "Orders",
            logIn: "Log In",
          },
          bookRows: {
            bestMonthBooks: "Best Books of the Month",
            mostRecentBooks: "Recently Added",
          },
          addToCart: "Add to Cart",
        },
      },
      de: {
        translation: {
          carrouselDescription: {
            title: "Kaufen Sie Lehrbücher zum besten Preis",
            description:
              "Von angewandter Literatur bis zu Bildungsressourcen haben wir viele Lehrbücher, die wir Ihnen anbieten können. Wir verkaufen nur die besten Bücher.",
          },
          navbar: {
            home: "Startseite",
            shoppingCart: "Warenkorb",
            orders: "Bestellungen",
            logIn: "Anmelden",
          },
          bookRows: {
            bestMonthBooks: "Die besten Bücher des Monats",
            mostRecentBooks: "Kürzlich hinzugefügt",
          },
          addToCart: "In den Warenkorb",
        },
      },
      fr: {
        translation: {
          carrouselDescription: {
            title: "Achetez des manuels au meilleur prix",
            description:
              "Des livres de littérature appliquée aux ressources éducatives, nous avons beaucoup de manuels à vous offrir. Nous ne vendons que les meilleurs livres.",
          },
          navbar: {
            home: "Accueil",
            shoppingCart: "Panier",
            orders: "Commandes",
            logIn: "Se connecter",
          },
          bookRows: {
            bestMonthBooks: "Meilleurs livres du mois",
            mostRecentBooks: "Ajoutés récemment",
          },
          addToCart: "Ajouter au panier",
        },
      },
    },
  });

export default i18n;
