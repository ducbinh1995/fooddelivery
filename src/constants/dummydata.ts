import { Menu, MenuDetail } from "../model/Menu";

export const myProfile = {
  name: "ByProgrammers",
  profile_image: require("../../assets/images/avatar.png"),
  address: "No. 88, Jln Padungan, Kuching",
};

export const dummy_categories = [
  {
    id: 1,
    name: "Fast Food",
    icon: require("../../assets/images/burger.png"),
  },
  {
    id: 2,
    name: "Fruit Item",
    icon: require("../../assets/images/cherry.png"),
  },
  {
    id: 3,
    name: "Rice Item",
    icon: require("../../assets/images/rice.png"),
  },
];

const hamburger: MenuDetail = {
  id: 1,
  name: "Hamburger",
  description: "Chicken patty hamburger",
  categories: [1, 2],
  price: 15.99,
  calories: 78,
  isFavourite: true,
  image: require("../../assets/images/hamburger.png"),
};

const hotTacos: MenuDetail = {
  id: 2,
  name: "Hot Tacos",
  description: "Mexican tortilla & tacos",
  categories: [1, 3],
  price: 10.99,
  calories: 78,
  isFavourite: false,
  image: require("../../assets/images/hot_tacos.png"),
};

const vegBiryani: MenuDetail = {
  id: 3,
  name: "Veg Biryani",
  description: "Indian Vegetable Biryani",
  categories: [1, 2, 3],
  price: 10.99,
  calories: 78,
  isFavourite: true,
  image: require("../../assets/images/veg_biryani.png"),
};

const wrapSandwich: MenuDetail = {
  id: 4,
  name: "Wrap Sandwich",
  description: "Grilled vegetables sandwich",
  categories: [1, 2],
  price: 10.99,
  calories: 78,
  isFavourite: true,
  image: require("../../assets/images/wrap_sandwich.png"),
};

export const dummy_menu: Menu[] = [
  {
    id: 1,
    name: "Featured",
    list: [hamburger, hotTacos, vegBiryani],
  },
  {
    id: 2,
    name: "Nearby you",
    list: [hamburger, vegBiryani, wrapSandwich],
  },
  {
    id: 3,
    name: "Popular",
    list: [hamburger, hotTacos, vegBiryani],
  },
  {
    id: 4,
    name: "Newest",
    list: [hamburger, hotTacos, vegBiryani],
  },
  {
    id: 5,
    name: "Trending",
    list: [hamburger, vegBiryani, wrapSandwich],
  },
  {
    id: 6,
    name: "Recommended",
    list: [hamburger, hotTacos, wrapSandwich],
  },
];

export const delivery_time = [
  {
    id: 1,
    label: "10 Mins",
  },
  {
    id: 2,
    label: "20 Mins",
  },
  {
    id: 3,
    label: "30 Mins",
  },
];

export const ratings = [
  {
    id: 1,
    label: 1,
  },
  {
    id: 2,
    label: 2,
  },
  {
    id: 3,
    label: 3,
  },
  {
    id: 4,
    label: 4,
  },
  {
    id: 5,
    label: 5,
  },
];

export const tags = [
  {
    id: 1,
    label: "Burger",
  },
  {
    id: 2,
    label: "Fast Food",
  },
  {
    id: 3,
    label: "Pizza",
  },
  {
    id: 4,
    label: "Asian",
  },
  {
    id: 5,
    label: "Dessert",
  },
  {
    id: 6,
    label: "Breakfast",
  },
  {
    id: 7,
    label: "Vegetable",
  },
  {
    id: 8,
    label: "Taccos",
  },
];
