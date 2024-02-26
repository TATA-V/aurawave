'use client';

import RangeSlider from 'react-range-slider-input';
import styled from 'styled-components';

interface Props {
  handleRange: (values: number[]) => void;
}

function CustomRangeSlider({ handleRange } : Props) {
  return (
    <RangeSliderBlock>
      <RangeSlider
        defaultValue={[0, 50]}
        thumbsDisabled={[true, false]}
        rangeSlideDisabled
        onInput={handleRange}
      />
    </RangeSliderBlock>
  );
}

export default CustomRangeSlider;

const RangeSliderBlock = styled.div`
  .single-thumb .range-slider__thumb[data-lower] {
    width: 0;
  }
  .range-slider {
    width: 70px;
    height: 5px;
  }
  .range-slider__range {
    width: 50%;
    background: linear-gradient(to bottom, #7A99A4, #2F7381);
    border-radius: 30px 0px 0px 30px;
  }
  .range-slider__thumb {
    width: 13px;
    height: 13px;
    border-radius: 50%;
  }
  .range-slider__thumb[data-lower] {
    width: 0;
    display: none;
  }
  .range-slider__thumb[data-upper] {
    background: radial-gradient(#7A99A4, #2F7381)
  }
`;
