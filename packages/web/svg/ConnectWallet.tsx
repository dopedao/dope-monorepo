import { css } from '@emotion/react';

type ConnectWalletProps = {
  loading?: boolean;
};

const ConnectWallet = ({ loading = false }: ConnectWalletProps) => (
  <svg
    width="280"
    height="280"
    viewBox="0 0 280 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.25">
      <circle cx="140" cy="140" r="124" fill="#202221" />
      <circle cx="140" cy="140" r="136" stroke="#202221" strokeWidth="8" />
      <path
        d="M140.484 50L139.316 53.9591V168.844L140.484 170.007L193.968 138.485L140.484 50Z"
        fill="white"
        fillOpacity="0.5"
      />
      <path d="M140.484 50L87 138.485L140.484 170.008V114.246V50Z" fill="white" />
      <path
        d="M140.484 187.358L139.825 188.158V229.083L140.484 231L194 155.851L140.484 187.358Z"
        fill="white"
        fillOpacity="0.5"
      />
      <path d="M140.484 231V187.358L87 155.851L140.484 231Z" fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M140.483 170.007L87 138.485L140.483 114.246V170.007ZM193.967 138.485L140.483 170.007V114.246L193.967 138.485Z"
        fill="white"
        fillOpacity="0.5"
      />
    </g>
    {loading && (
      <circle
        css={css`
          @keyframes rotation {
            from {
              transform-origin: 50% 50%;
              transform: rotate(0deg);
            }

            to {
              transform-origin: 50% 50%;
              transform: rotate(360deg);
            }
          }

          animation: rotation infinite 3s linear;
        `}
        cx="140"
        cy="140"
        r="136"
        stroke="#FB9D99"
        strokeWidth="8"
        strokeLinecap="square"
        strokeDasharray="110"
      />
    )}
  </svg>
);

export default ConnectWallet;
