// common

export interface MenuInterface {
  id: number;
  label: string;
  slug: string;
  icon: JSX.Element | JSX.Element[];
}

export type dropdownOptionType = {
  label: string;
  value: string | number | boolean;
};

export interface CommonRes<T> {
  statusCode: number;
  message: string;
  data: T;
}

type userType = "Talent" | "Agent";
export interface UserTypeInterface {
  id: number;
  title: userType;
  banner: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}

export interface UserCategoryInterface {
  id: number;
  name: string;
  avatar: string;
  user_type_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}

export interface UserInterface {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: null | string;
  user_type_id: number;
  category_id: number;
  avatar: null | string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  user_type: UserTypeInterface;
  Talent: TalentInterface | null;
  Agent: AgentInterface | null;
  user_language: number[];
}

export interface AgentInterface {
  id: number;
  user_id: number;
  dob: null | string;
  name: string;
  language_id: null | number;
  location_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}

export interface TalentInterface {
  id: number;
  user_id: number;
  dob: string;
  gender: "male" | "female";
  about_me: string;
  height: number;
  weight: number;
  bust: number;
  waist: number;
  hips: number;
  eyes: string;
  hair: string;
  dress_size: number;
  dress_size_unit: string;
  shoe_size: number;
  shoe_size_unit: string;
  discipline_id: number;
  portfolio: string;
  country_id: number;
  is_open_to_work: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}

export interface CountryInterface {
  id: number;
  name: string;
  code: string;
}
