'use client';

import styled from 'styled-components';

export const SearchBox = styled.div`
  padding: 6px 21px 37px 21px;
  position: relative;

  .search-input {
    width: 100%;
    height: 43px;
    color: var(--dark-blue-900);
    font-size: 0.9375rem;
    font-weight: 400;
    border-bottom: 2px solid var(--dark-blue-500);
    line-height: 43px;
    vertical-align: middle;

    &::placeholder {
      color: var(--blue-gray-600);
    }
    &:focus {
      outline: none;
    }
    &:focus ~ .bar::after {
      width: 348px;
    }
  }

  .i-search {
    position: absolute;
    top: 17px;
    right: 22px;
    font-size: 20px;
  }
`;

export const Bar = styled.div`
  &::after {
    content: '';
    position: absolute;
    top: 47px;
    left: 21px;
    width: 0;
    height: 2px;
    background: linear-gradient(to right, #5fc0c0, #7ec5ed);
    z-index: 1;
    transition: 0.3s linear;
  }
`;
