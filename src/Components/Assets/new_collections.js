import p1_img from "./product_12.png";
import p2_img from "./product_35.png";
import p3_img from "./product_14.png";
import p4_img from "./product_8.png";
import p5_img from "./product_15.png";
import p6_img from "./product_2.png";
import p7_img from "./product_17.png";
import p8_img from "./product_28.png";

let new_collections = [
  {
    id: 12,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: [p1_img,p2_img,p3_img,p4_img],
    category:"CAMISAS",
    color:["red", 'purple', 'brown'],
    brand:"TOMMY HILFIGER",
    new_price: 50.0,
    old_price: 80.5,
    value: "womens",
    size:["S", "M", "L"]
  },
  {
    id: 35,
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    image: [p3_img,p2_img,p1_img,p4_img],
    color:["yellow", 'black', 'brown'],
    category:"FALDAS",
    new_price: 85.0,
    brand:"MICHAEL KORS",
    old_price: 120.5,
    value: "kids",
    size:["S", "L", "XL"]
  },
  {
    id: 112,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: [p1_img,p2_img,p3_img,p4_img],
    category:"CAMISAS",
    color:["red", 'purple', 'brown'],
    brand:"TOMMY HILFIGER",
    new_price: 50.0,
    old_price: 80.5,
    value: "womens",
    size:["S", "M", "L"]
  },
  {
    id: 351,
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    image: [p3_img,p2_img,p1_img,p4_img],
    color:["yellow", 'black', 'brown'],
    category:"FALDAS",
    new_price: 85.0,
    brand:"MICHAEL KORS",
    old_price: 120.5,
    value: "kids",
    size:["S", "L", "XL"]
  },
  {
    id: 121,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: [p1_img,p2_img,p3_img,p4_img],
    category:"CAMISAS",
    color:["red", 'purple', 'brown'],
    brand:"TOMMY HILFIGER",
    new_price: 50.0,
    old_price: 80.5,
    value: "womens",
    size:["S", "M", "L"]
  },
  {
    id: 351,
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    image: [p3_img,p2_img,p1_img,p4_img],
    color:["yellow", 'black', 'brown'],
    category:"FALDAS",
    new_price: 85.0,
    brand:"MICHAEL KORS",
    old_price: 120.5,
    value: "kids",
    size:["S", "L", "XL"]
  },
  {
    id: 14,
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    image: [p4_img,p2_img,p3_img,p1_img],
    color:["beige", 'purple', 'brown'],
    brand:"GUESS",
    category:"VESTIDOS",
    new_price: 60.0,
    old_price: 100.5,
    value: "mens",
    size:["S", "M", "L"]
  },
  {
    id: 8,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: [p2_img,p1_img,p3_img,p4_img],
    brand:"CALVIN KLEIN",
    color:["white", 'yellow', 'brown'],
    category:"CAMISAS",
    new_price: 100.0,
    old_price: 150.0,
    value: "womens",
    size:["M", "L"]
  },
  {
    id: 15,
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    image: [p5_img,p2_img,p3_img,p4_img],
    color:["rose", 'purple', 'brown'],
    brand:"VICTORIA SECRET",
    category:"FALDAS",
    new_price: 50.0,
    old_price: 80.5,
    value: "mens",
    size:["S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: [p6_img,p2_img,p3_img,p4_img],
    color:["black", "white", 'purple', 'brown'],
    brand:"TOMMY HILFIGER",
    category:"BOLSOS",
    new_price: 85.0,
    old_price: 120.5,
    value: "womens",
    size:["S", "M", "L"]
  },
  {
    id: 17,
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    image: [p7_img,p5_img,p3_img,p4_img],
    color:["yellow", "white", 'red', 'brown'],
    brand:"MICHAEL KORS",
    category:"CAMISAS",
    new_price: 60.0,
    old_price: 100.5,
    value: "kids",
    size:["S", "M", "L"]
  },
  {
    id: 28,
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    image: [p8_img,p6_img,p7_img,p4_img],
    color:["black", "orange", 'purple', 'beige'],
    brand:"CALVIN KLEIN",
    new_price: 100.0,
    category:"VESTIDOS",
    old_price: 150.0,
    size:["M", "L"]
  },
  {
    id: 211,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: [p6_img,p2_img,p3_img,p4_img],
    color:["black", "white", 'purple', 'brown'],
    brand:"TOMMY HILFIGER",
    category:"BOLSOS",
    new_price: 85.0,
    old_price: 120.5,
    value: "womens",
    size:["S", "M", "L"]
  },
  {
    id: 171,
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    image: [p7_img,p5_img,p3_img,p4_img],
    color:["yellow", "white", 'red', 'brown'],
    brand:"MICHAEL KORS",
    category:"CAMISAS",
    new_price: 60.0,
    old_price: 100.5,
    value: "kids",
    size:["S", "M", "L"]
  },
  {
    id: 281,
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    image: [p8_img,p6_img,p7_img,p4_img],
    color:["black", "orange", 'purple', 'beige'],
    brand:"CALVIN KLEIN",
    new_price: 100.0,
    category:"VESTIDOS",
    old_price: 150.0,
    size:["M", "L"]
  },
  {
    id: 2131,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: [p6_img,p2_img,p3_img,p4_img],
    color:["black", "white", 'purple', 'brown'],
    brand:"TOMMY HILFIGER",
    category:"BOLSOS",
    new_price: 85.0,
    old_price: 120.5,
    value: "womens",
    size:["S", "M", "L"]
  },
  {
    id: 1731,
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    image: [p7_img,p5_img,p3_img,p4_img],
    color:["yellow", "white", 'red', 'brown'],
    brand:"MICHAEL KORS",
    category:"CAMISAS",
    new_price: 60.0,
    old_price: 100.5,
    value: "kids",
    size:["S", "M", "L"]
  },
  {
    id: 2381,
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    image: [p8_img,p6_img,p7_img,p4_img],
    color:["black", "orange", 'purple', 'beige'],
    brand:"CALVIN KLEIN",
    new_price: 100.0,
    category:"VESTIDOS",
    old_price: 150.0,
    size:["M", "L"]
  },
];

export default new_collections;
