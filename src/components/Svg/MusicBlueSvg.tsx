import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface IProps {
  color?: string;
}

const MusicBlueSvg = ({ color }: IProps) => (
  <Svg width={20} height={22} fill="none">
    <Path
      fill="url(#a)"
      d="M20 1.27v14.807c0 .44-.148.833-.443 1.177-.295.343-.668.61-1.12.8-.45.189-.9.33-1.347.423a6.218 6.218 0 0 1-1.257.138c-.39 0-.81-.046-1.256-.138a7.312 7.312 0 0 1-1.348-.424 2.956 2.956 0 0 1-1.12-.8 1.755 1.755 0 0 1-.442-1.176c0-.44.147-.833.442-1.177.296-.344.669-.61 1.12-.8.452-.19.9-.33 1.348-.423a6.212 6.212 0 0 1 1.256-.138c.912 0 1.745.171 2.5.515v-7.1l-10 3.134v9.374c0 .44-.147.832-.442 1.176-.296.344-.669.61-1.12.8-.452.19-.9.33-1.348.423A6.22 6.22 0 0 1 4.167 22c-.391 0-.81-.046-1.257-.139a7.311 7.311 0 0 1-1.348-.423 2.957 2.957 0 0 1-1.12-.8A1.756 1.756 0 0 1 0 19.461c0-.44.148-.832.443-1.176.295-.344.668-.61 1.12-.8.45-.19.9-.33 1.347-.423a6.219 6.219 0 0 1 1.257-.139c.911 0 1.744.172 2.5.516V4.654c0-.273.082-.522.247-.747.165-.225.378-.381.638-.47L18.385.054C18.49.018 18.611 0 18.75 0c.347 0 .642.123.885.37s.365.547.365.9Z"
    />
    <Defs>
      <LinearGradient id="a" x1={10} x2={10} y1={0} y2={22} gradientUnits="userSpaceOnUse">
        <Stop stopColor={color ? color : '#7FB7BE'} />
        <Stop offset={0.495} stopColor={color ? color : '#51858C'} />
        <Stop offset={1} stopColor={color ? color : '#256772'} />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default MusicBlueSvg;
