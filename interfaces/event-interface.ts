export interface EventCategoryInterface {
  id: number;
  title: string;
  isActive: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface EventInterface {
  id?: number;
  badge: string;
  thumb?: string;
  title: string;
  subtitle?: string;
  desc?: string;
  publishedDate?: string;
  startDate?: string;
  isContracts?: boolean;
  isEvent?: boolean;
  location?: string;
  time?: string;
  isThumb?: boolean;
  client?: string;
  rating?: string;
  review?: number;
  avatar?: string;
  total_event?: number;
  payment?: number;
  talent_name?: string;
  agent_name?: string; // change by kabbo
  viewers?: number;
  badge_OPT?: boolean;
  ownerId: number;
}

export interface EventDetailsInterface {
  pay: number | undefined;
  id: number;
  title: string;
  owner_id: number;
  category_id: number;
  description: string;
  location_id: number;
  exp_date: null | string;
  price: number;
  duration: number;
  disciplines_id: number;
  status: "in_progress" | "complete";
  price_type: "hourly" | "fixed";
  image: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  category: EventCategoryInterface;
  disciplines: {
    id: number;
    title: string;
  };
  EventLanguage: {
    language: {
      id: number;
      name: string;
      code: string;
    };
  }[];
  location: {
    id: number;
    street_address: string;
    street_address_2?: string;
    city: string;
    state: string;
    zip: string;
    country_id: number;
  };
  owner: {
    first_name: string;
    last_name: string;
  };
}
