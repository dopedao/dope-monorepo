import { css } from '@emotion/react';

type ConnectWalletProps = {
  loading?: boolean;
};

const ConnectWallet = ({ loading = false }: ConnectWalletProps) => (
  <svg
    width="281"
    height="280"
    viewBox="0 0 281 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.25">
      <circle cx="140.5" cy="140" r="124" fill="#202221" />
      <circle cx="140.5" cy="140" r="136" stroke="#202221" strokeWidth="8" />
      <path
        d="M140.984 50L139.816 53.9591V168.844L140.984 170.007L194.468 138.485L140.984 50Z"
        fill="white"
        fillOpacity="0.5"
      />
      <path d="M140.984 50L87.5 138.485L140.984 170.008V114.246V50Z" fill="white" />
      <path
        d="M140.984 187.358L140.325 188.158V229.083L140.984 231L194.5 155.851L140.984 187.358Z"
        fill="white"
        fillOpacity="0.5"
      />
      <path d="M140.984 231V187.358L87.5 155.851L140.984 231Z" fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M140.983 170.007L87.5 138.485L140.983 114.246V170.007ZM194.467 138.485L140.983 170.007V114.246L194.467 138.485Z"
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
