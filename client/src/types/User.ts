type UserDetails = {
  firstName: string;
  lastName: string;
};

export type UserCredentials = {
  email: string;
  password: string;
};

export type UserFullDetails = UserCredentials & UserDetails;

export type User = UserFullDetails & { token: string };
