interface DataType {
  id: number;
  title: string;
  link: string;
  has_dropdown?: boolean;
  sub_menus?: {
    link: string;
    title: string;
  }[];
}
// menu data
const menu_data: DataType[] = [
  {
    id: 1,
    title: "Home",
    link: "/",
  },
  {
    id: 2,
    title: "Courses",
    link: "/courses",
  },

  // {
  //   id: 5,
  //   title: "Contact",
  //   link: "/contact",
  //   has_dropdown: false,
  // },
];
export default menu_data;
