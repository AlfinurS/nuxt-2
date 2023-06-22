export type productType = {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  };
  category: string;
}

export type paginationType = {
  page: number;
  page_size: number;
  count: number;
}