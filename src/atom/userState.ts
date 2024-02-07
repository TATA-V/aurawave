import { atom } from 'recoil';

interface UserState {
  username: string | null;
  photoURL: string | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
}

const defaultValue: UserState = {
  username: '',
  photoURL: '',
  isLoggedIn: false,
  isAdmin: false,
};

const userState = atom<UserState>({
  key: 'userState',
  default: defaultValue,
});

export default userState;
