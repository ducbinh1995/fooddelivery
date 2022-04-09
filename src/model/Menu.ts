import { ImageSourcePropType } from "react-native";

export interface MenuDetail {
  id: number;
  name: string;
  description: string;
  categories: number[];
  price: number;
  calories: number;
  isFavourite: boolean;
  image: ImageSourcePropType;
}

export interface Menu {
  id: number;
  name: string;
  list: MenuDetail[];
}
