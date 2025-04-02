export type ParkingSpot = {
  id: string;
  title: string;
  address: string;
  description: string;
  distance_miles: number;
  host_rating: number;
  image_urls: string[];
  price_per_hour: number;
  amenities: string[];
  reviews: string[];
  isGuestFavorite: boolean;
  host: {
    name: string;
    years_hosting: number;
    is_super_host: boolean;
    host_image: string;
  };
  minor_description: string;
};
