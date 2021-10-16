export type Profile = {
  uid: string;
  email: string;
  photoURL: string;
  displayName: string;
}

export type User = {
  profile: Profile;
}
