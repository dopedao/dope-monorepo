const PersonHeadIcon = ({ color = '#000' }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#a)">
      <path
        d="M6.854 7a2.917 2.917 0 1 0 0-5.833 2.917 2.917 0 0 0 0 5.833ZM8.01 8.094H5.7a3.95 3.95 0 0 0-3.949 3.949c0 .436.354.79.79.79h8.629c.436 0 .79-.353.79-.79a3.95 3.95 0 0 0-3.95-3.949Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" transform="translate(1.75 1.167)" d="M0 0h10.208v11.667H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default PersonHeadIcon;
