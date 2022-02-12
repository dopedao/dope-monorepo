const PersonIcon = ({ color = '#000' }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#a)">
      <path
        d="M10.68 7.342 9.072 4.788a1.428 1.428 0 0 0-1.236-.704h-1.38c-.507 0-.97.256-1.237.685L3.61 7.342a.73.73 0 1 0 1.236.773l.658-1.053-.02 5.042c0 .403.326.73.729.73a.712.712 0 0 0 .709-.73v-3.28h.364v3.28a.73.73 0 0 0 1.458 0v-5.04l.659 1.053c.178.22.417.342.659.342a.73.73 0 0 0 .617-1.117ZM7.146 3.354a1.094 1.094 0 1 0 0-2.188 1.094 1.094 0 0 0 0 2.188Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" transform="translate(3.5 1.167)" d="M0 0h7.292v11.667H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default PersonIcon;
