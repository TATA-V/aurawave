import { atom } from "recoil";

interface RecWeatherState {
  recEffect: string;
}

const defaultValue = {
  recEffect: '',
}

const recWeatherState = atom<RecWeatherState>({
  key: 'recWeatherState',
  default: defaultValue,
})

export default recWeatherState;