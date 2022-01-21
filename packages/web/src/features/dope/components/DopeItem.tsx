import { css } from '@emotion/react';

type ItemProps = {
  name: string;
  namePrefix: string;
  nameSuffix: string;
  suffix: string;
  augmented: boolean;
  type: string;
  color?: string;
};

type BulletProps = {
  color?: string;
}


const Item = ({name, namePrefix, nameSuffix, suffix, augmented, type, color}: ItemProps) => (
  <div
    css={css`
      display:flex;
      align-items: center;
      height: 25px;
    `}
  >
    <Bullet color={color} />
    <div
      css={css`
        color: ${color};
        font-size: 12px;
      `}
    > 
      {name} 
      {/* <span css={css`color: #888`}>{augmented ? '+1' : ''}</span>
      
      <div 
        css={css`
          color: #888;
          font-size: 12px;
        `}
      > {namePrefix ? <>"{namePrefix} {nameSuffix}"</> : ''} {suffix} </div> */}
    
    </div>
    <div
      css={css`
      color: #888;
      margin-left: auto;
      font-size: 12px;
      `}
    >{type}</div> 
  </div>
);

const Bullet = ({color}: BulletProps) => (
    <div
      css={css`
        height: 10px;
        width: 10px;
        border-radius: 50%;
        margin-right: 8px;
        background-color: ${color};
      `}
    ></div>
);


export default Item;