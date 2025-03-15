export interface Product {
  _id?: string; // Make _id optional
  name: string;
  slug: string;
  visible: boolean;
  description?: string;
  price?: number;
  media?: {
    mainMedia?: {
      image?: {
        url: string;
        width: number;
        height: number;
        altText?: string;
      };
    };
  };
}