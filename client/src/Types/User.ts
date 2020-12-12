
export interface UserAction {
  userAction: string;
}

export type Promise = () => void;

export interface User {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  password: string;
}

export interface EditUserResponse {
  message: string;
  user: User;
}

// export interface UserDetails {

// }