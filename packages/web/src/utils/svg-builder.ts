//SVGBUILDER
// Forked from: https://github.com/nounsDAO/nouns-monorepo/blob/master/packages/nouns-sdk/src/image/types.ts

import { Time } from 'phaser';
import { ZoomWindow } from 'utils/HustlerConfig';

export interface ImageBounds {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface DecodedImage {
  paletteIndex: number;
  bounds: ImageBounds;
  rects: [length: number, colorIndex: number][];
}

/**
 * Decode the RLE image data into a format that's easier to consume in `buildSVG`.
 * @param image The RLE image data
 */
const decodeImage = (image: string, offset?: string): DecodedImage => {
  let data = image.replace(/^0x/, '');

  if (offset) {
    data =
      (parseInt(data.substring(0, 10), 16) + parseInt(offset, 16)).toString(16).padStart(10, '0') +
      data.substring(10);
  }

  const paletteIndex = parseInt(data.substring(0, 2), 16);
  const bounds = {
    top: parseInt(data.substring(2, 4), 16),
    right: parseInt(data.substring(4, 6), 16),
    bottom: parseInt(data.substring(6, 8), 16),
    left: parseInt(data.substring(8, 10), 16),
  };
  const rects = data.substring(10);

  return {
    paletteIndex,
    bounds,
    rects:
      rects
        ?.match(/.{1,4}/g)
        ?.map(rect => [parseInt(rect.substring(0, 2), 16), parseInt(rect.substring(2, 4), 16)]) ??
      [],
  };
};

/**
 * Given RLE parts, palette colors, and a background color, build an SVG image.
 * @param parts The RLE part datas
 * @param paletteColors The  palette colors
 * @param bgColor The  background color
 */
export const buildSVG = (
  parts: string[],
  bgColor: string,
  textColor: string,
  title: string,
  subtitle: string,
  zoomWindow: ZoomWindow,
  resolution: number = 64,
  htmlId: string = 'dynamicBuiltSvg',
): string => {
  const step = 320 / resolution;
  const svgWithoutEndTag = parts.reduce((result, part, i) => {
    let offset = undefined;
    if (resolution === 160 && i != 0) {
      offset = '00331D331D';
    }
    const svgRects: string[] = [];
    const { bounds, rects, paletteIndex } = decodeImage(part, offset);

    let currentX = bounds.left;
    let currentY = bounds.top;

    rects.forEach(rect => {
      const [length, colorIndex] = rect;
      const Color = palettes[paletteIndex][colorIndex].substring(2);

      // Do not push rect if transparent
      if (colorIndex !== 0) {
        svgRects.push(
          `<rect width="${length * step}" height="${step}" x="${currentX * step}" y="${
            currentY * step
          }" fill="#${Color}" />`,
        );
      }

      currentX += length;
      if (currentX === bounds.right) {
        currentX = bounds.left;
        currentY++;
      }
    });
    result += svgRects.join('');
    return result;
  }, `<svg id=${htmlId} width="100%" height="100%" viewBox="${zoomWindow[0].toString()} ${zoomWindow[1].toString()} ${zoomWindow[2].gt(0) ? zoomWindow[2].toString() : '320'} ${zoomWindow[3].gt(0) ? zoomWindow[3].toString() : '320'}" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><style xmlns="http://www.w3.org/2000/svg">.base { fill: ${textColor}; font-family: Dope; font-size: 14px; }</style><rect width="100%" height="100%" fill="${bgColor}" /><text xmlns="http://www.w3.org/2000/svg" x="160" y="25" with="320" text-anchor="middle" class="base">${title}</text><text xmlns="http://www.w3.org/2000/svg" x="160" y="303" with="320" text-anchor="middle" class="base">${subtitle}</text>`);

  return `${svgWithoutEndTag}</svg>`;
};

export const palettes = [
  [
    '',
    '0x0d0d0dff',
    '0x262626ff',
    '0x5c3c0dff',
    '0x0d1114ff',
    '0x2e1e06ff',
    '0x422b09ff',
    '0xe3cd8fff',
    '0x1c1c1c59',
    '0x0d0d0d99',
    '0x26262699',
    '0x965e3091',
    '0xae6c37ff',
    '0xcc8850ff',
    '0x415d66ff',
    '0x82512aff',
    '0x9e6333ff',
    '0x915b2fff',
    '0x9f8176ff',
    '0x634227ff',
    '0x3ccbcbff',
    '0x60f1f1ff',
    '0x77f8f8ff',
    '0x257e7eff',
    '0x5ceeeeff',
    '0x3bc7c7ff',
    '0xf0b482ff',
    '0xffc990ff',
    '0xffd99cff',
    '0xa5a5a5ff',
    '0xeda0a0ff',
    '0xf0a25bff',
    '0xb98359ff',
    '0xd29564ff',
    '0xe6a46eff',
    '0x757575ff',
    '0xb77171ff',
    '0xb9733bff',
    '0x2a1201ff',
    '0x69290bff',
    '0x983b0fff',
    '0x162b34ff',
    '0x301608ff',
    '0x00000038',
    '0x402a09ff',
    '0x000000ff',
    '0x333333ff',
    '0x1a1a1aff',
    '0x696969ff',
    '0x594330ff',
    '0x403022ff',
    '0x876549ff',
    '0xb58762ff',
    '0x664c37ff',
    '0xa8994cff',
    '0xd9c562ff',
    '0x3b2513ff',
    '0x21150bff',
    '0x292929ff',
    '0x190e06ff',
    '0x968944ff',
    '0x7d7138ff',
    '0x787878ff',
    '0x298989ff',
    '0xa8a8a8ff',
    '0x704300ff',
    '0x704f1eff',
    '0x965e30ff',
    '0x00000042',
    '0x786455ff',
    '0xccab91ff',
    '0x666666ff',
    '0xb5b5b5ff',
    '0xccccccff',
    '0xa89280ff',
    '0xccb19bff',
    '0x42464dff',
    '0x917157ff',
    '0x343434ff',
    '0x303030ff',
    '0xc7b37dff',
    '0xf7df9cff',
    '0xc2af7aff',
  ],
  [
    '',
    '0xccd3e0ff',
    '0xe0e0e0ff',
    '0xfcc02eff',
    '0x0f0f0fff',
    '0xbad1cbff',
    '0xf4baacff',
    '0xc1d3e5ff',
    '0xde9400ff',
    '0xf8e100ff',
    '0xc7b300ff',
    '0x5e6e80ff',
    '0x718499ff',
    '0xccca66ff',
    '0xa6a453ff',
    '0x2b2b2bff',
    '0x4d4d4dff',
    '0x262626ff',
    '0x1a1a1aff',
    '0xf3ebeeff',
    '0xd2212bff',
    '0xe33a3bff',
    '0x17110cff',
    '0x664d37ff',
    '0x594330ff',
    '0x876549ff',
    '0x7b8fa6ff',
    '0x8ea5bfff',
    '0x343434ff',
    '0x636363ff',
    '0x4a4a4aff',
    '0x0d1114ff',
    '0xccccccff',
    '0xe5e5e5ff',
    '0xf2f2f2ff',
    '0xc7c7c7ff',
    '0x5c3c0dff',
    '0x151515ff',
    '0x302725ff',
    '0xc69455ff',
    '0xad814bff',
    '0xa56f3bff',
    '0xffffffff',
    '0xd9d9d9ff',
    '0x452c09ff',
    '0x66410dff',
    '0x4372e0ff',
    '0x283c2dff',
    '0x982729ff',
    '0xebdfccff',
    '0xf52a2aff',
    '0xd92525ff',
    '0xcc2323ff',
    '0xe52727ff',
    '0xccc2b1ff',
    '0x5752ffff',
    '0xff3636ff',
    '0x1f1f1fff',
    '0x404040ff',
    '0x000000ff',
    '0x0d0d0dff',
    '0x080808ff',
    '0x121212ff',
    '0xb5b5b5ff',
    '0xd4d2cfff',
    '0xcc2929ff',
    '0x1a0402ff',
    '0x2e1412ff',
    '0x2f0704ff',
    '0xbfbfbfff',
    '0x465459ff',
    '0x5b6c73ff',
    '0x2e2319ff',
    '0xc2b9a9ff',
    '0x9e978aff',
    '0x382a1eff',
    '0x4f3c2bff',
    '0x856448ff',
    '0x474747ff',
    '0xd1d1d1ff',
    '0xb0b0b0ff',
    '0x211912ff',
    '0x0d1314ff',
    '0xae6c37ff',
    '0x3d0c0cff',
    '0x0f0d0dff',
    '0x333333ff',
    '0x9e7755ff',
    '0xfac52cff',
    '0xcca225ff',
    '0x242424ff',
    '0x666666ff',
    '0xb38807ff',
    '0xcf9d08ff',
    '0x616161ff',
    '0x6e6e6eff',
    '0x171717ff',
    '0xb3b3b3ff',
    '0xc9c9c9ff',
    '0x4d492cff',
    '0x787346ff',
    '0xabbcccff',
    '0xe3ebfaff',
    '0xb38565ff',
    '0x9f6e4cff',
    '0x9ea3adff',
    '0xb38d6fff',
    '0xa37855ff',
    '0xcfa380ff',
    '0xbd8b62ff',
    '0x0000004d',
    '0xe11734ff',
    '0x000a0a9d',
    '0xf8d700ff',
    '0x0000003d',
    '0x223136ff',
    '0x415d66ff',
    '0xc2bcbeff',
    '0x2d8c2dff',
    '0x34a534ff',
    '0x17262bff',
    '0xa1a1a1ff',
    '0x28414aff',
    '0xdbdbdbff',
    '0x1d2f36ff',
    '0xa32121ff',
    '0x701616ff',
    '0xffee58ff',
    '0xfed835ff',
    '0xd4d4d4ff',
    '0xa92223ff',
    '0x6e1616ff',
    '0x521010ff',
    '0x380a0aff',
    '0x4b0e0eff',
    '0x6e1515ff',
    '0x1a206aff',
    '0x222c90ff',
    '0xb38c00ff',
    '0x7f8096ff',
    '0xd9d2d5ff',
    '0x06090dff',
    '0xc2c2c2ff',
    '0x162232ff',
    '0x141414ff',
    '0x010203ff',
    '0x0d151fff',
    '0x3d4543ff',
    '0xb32424ff',
    '0xa67b47ff',
    '0xb5874eff',
    '0x8c5e32ff',
    '0xe0ccccff',
    '0x9a5682ff',
    '0xc872a6ff',
    '0xf22929ff',
    '0x260603ff',
    '0xada8aaff',
    '0xc7c1c3ff',
    '0xd9d2d4ff',
    '0xe5dfe1ff',
    '0x222421ff',
    '0x7e5a3fff',
    '0x8e6546ff',
    '0xccc6c8ff',
    '0xffe4cfff',
    '0xd4bca9ff',
    '0xdfb0e8ff',
    '0xfae0ffff',
    '0xf8f9f8ff',
    '0xfef156ff',
    '0xcf799eff',
    '0xf0a800ff',
    '0xf0e1bdff',
    '0x5c7350ff',
    '0x7a996bff',
    '0x99beffff',
    '0xf0efc5ff',
    '0xc5ebf0ff',
    '0xf0c5efff',
    '0xffeb69ff',
    '0xffaf69ff',
    '0xc7c8ccff',
    '0xf55656ff',
    '0xf57f7fff',
    '0xffeee0ff',
    '0xf3f3f4ff',
    '0xe1e2e5ff',
    '0xad8540ff',
    '0xdba951ff',
    '0xfffad9ff',
    '0xe3e5e3ff',
    '0xfff8c9ff',
    '0xd4d5d9ff',
    '0x628b99ff',
    '0xc72828ff',
    '0xbfaeaeff',
    '0x353d45ff',
    '0x21262bff',
    '0x1c2226ff',
    '0x19206aff',
    '0x252d33ff',
    '0x495563ff',
    '0x808080ff',
    '0x585651ff',
    '0x91bfb6ff',
    '0x000000cc',
  ],
  [
    '',
    '0x161616ff',
    '0x5c5c5cff',
    '0xa7c0d2ff',
    '0xd8edf1ff',
    '0xf2eddfff',
    '0x000000ff',
    '0x42519bff',
    '0x737dc8ff',
    '0x212e7dff',
    '0xfdd652ff',
    '0x243027ff',
    '0xeca000ff',
    '0x000601ff',
    '0x1c266bff',
    '0x090e36ff',
    '0x030503ff',
    '0x1d2720ff',
    '0x191919ff',
    '0xa0a9afff',
    '0x161f19ff',
    '0x535353ff',
    '0xccd6dfff',
    '0x91969eff',
    '0x858381ff',
    '0x050505ff',
    '0x797979ff',
    '0x333333ff',
    '0x00000047',
    '0x810612ff',
    '0xaf0b1eff',
    '0xdcd6cbff',
    '0xd71127ff',
    '0xb0aca2ff',
    '0x3e5144ff',
    '0x030303ff',
    '0x101913ff',
    '0x6a7987ff',
    '0xc0bab0ff',
    '0x990918ff',
    '0xb00c1eff',
    '0x65030cff',
    '0x7f7c74ff',
    '0x20281fff',
    '0x0a100bff',
    '0x8f0716ff',
    '0x989a97ff',
    '0x585a57ff',
    '0x1f2123ff',
    '0xe7e4cfff',
    '0xb5b3a2ff',
    '0xc1beadff',
    '0x0c0d0fff',
    '0x303030ff',
    '0x081317ff',
    '0x201815ff',
    '0x1b2021ff',
    '0xcf5018ff',
    '0xf6601eff',
    '0x979893ff',
    '0x6f7173ff',
    '0x634932ff',
    '0xff6c24ff',
    '0xff6622ff',
    '0xe95b1dff',
    '0xb04213ff',
    '0x000902ff',
    '0x000300ff',
    '0x1d1f21ff',
    '0x9a7c51ff',
    '0x3e3e3eff',
    '0x242427ff',
    '0x696969ff',
    '0x2c2c2cff',
    '0x1b1b1bff',
    '0xd2a977ff',
    '0x8a6e4cff',
    '0x838383ff',
    '0xe6e6e6ff',
    '0xffffffff',
    '0xd6d3d0ff',
    '0x1f1f1fff',
    '0x090909ff',
    '0x09090933',
    '0x928badff',
    '0x4721219e',
    '0xd3b5ab9e',
    '0xc2ab9d9e',
    '0xd4b5ab9e',
    '0x9b6a689e',
    '0x42191a9e',
    '0xd2b4aa9e',
    '0x9a6b699e',
    '0xd1b3a99e',
    '0x4618129e',
    '0x55417dff',
    '0x433262ff',
    '0xb09ec4ff',
    '0x2b2b2bff',
    '0xc1aa9d9e',
    '0x9b7adfff',
    '0x685096ff',
    '0x8869c3ff',
    '0x8d84abff',
    '0x4b7088ff',
    '0xa7bfd2ff',
    '0x0e0e0eff',
    '0x7b7b7bff',
    '0x82291eff',
    '0xff7013ff',
    '0x5f6979ff',
    '0x333944ff',
    '0x8d949bff',
    '0xe7efe8ff',
    '0x2b2e2bff',
    '0x5e5d5dff',
    '0x291c1aff',
    '0xfee0cbff',
    '0x3e3839ff',
    '0xfef8f5ff',
    '0x59030aff',
    '0x9c2a3cff',
    '0x7f0410ff',
    '0x100e09ff',
    '0x570003ff',
    '0x911f38ff',
    '0xbfa5a8ff',
    '0x675c5dff',
    '0x4a4445ff',
    '0x645e5fff',
    '0x302727ff',
    '0x554f4cff',
    '0x080606ff',
    '0x190e0bff',
    '0xffd600ff',
    '0xedb900ff',
    '0xd11f1fff',
    '0xed2424ff',
    '0x38363aff',
    '0x504a46ff',
    '0xebb400ff',
    '0xc09300ff',
    '0x260c03ff',
    '0xe2e5e4ff',
    '0xcacdccff',
    '0x12110eff',
    '0x3f3e3cff',
    '0x413e37ff',
    '0x3f3b35ff',
    '0x302d27ff',
    '0x12110efd',
    '0x80faf2ff',
    '0xa6518dff',
    '0x8b8276ff',
    '0xc5cacdff',
    '0x999da0ff',
    '0x3d1808ff',
    '0x4f210cff',
    '0x6e7072ff',
    '0xc6c4b0ff',
    '0x999458ff',
    '0x6b6952ff',
    '0x717e8cff',
    '0x59636fff',
    '0x2b3239ff',
    '0x382b2bad',
    '0xc3b9b5ad',
    '0xc4b9b6ad',
    '0x877675ad',
    '0x322323ad',
    '0xc2b8b4ad',
    '0x867776ad',
    '0xc1b7b3ad',
    '0x322220ad',
    '0x333b42ff',
    '0xafb7c2ff',
    '0x121619ff',
    '0x939aa3ff',
    '0x434b54ff',
    '0x2e393fff',
    '0x010203ff',
    '0xdf0000ff',
    '0x15131dff',
    '0x1e2328ff',
    '0xd1d6dcff',
    '0x662a0bff',
    '0xffc750ff',
    '0xffa73fff',
    '0x1a0000ff',
    '0x848a91ff',
    '0xa7020bff',
    '0xda0314ff',
    '0x010610ff',
    '0x24292fff',
    '0x526da9ff',
    '0x9eaeceff',
    '0x263555ff',
    '0x1a243cff',
    '0x374a75ff',
    '0x342828da',
    '0xa7a19eda',
    '0x212e4bff',
    '0x9a9591da',
    '0xa8a19eda',
    '0x726866da',
    '0x2d2221da',
    '0xa6a19dda',
    '0xa5a09cda',
    '0x291f1cda',
    '0xa5adb3ff',
    '0x9098a0ff',
    '0x989591da',
    '0x2d211fda',
    '0x293759ff',
    '0x888b91ff',
    '0x777a80ff',
    '0x263352ff',
    '0xbfd1d7ff',
    '0x2b395cff',
    '0xfff8edff',
    '0xa0a5a9ff',
    '0xb2b7bdff',
    '0x929499ff',
    '0x1d2320ff',
    '0x000302ff',
    '0xa9acb4ff',
    '0x878890ff',
    '0x000503ff',
    '0x000100ff',
    '0x72757cff',
    '0xacb3b9ff',
    '0x595c61ff',
    '0x8d9095ff',
    '0x202321ff',
    '0x000201ff',
    '0x000000ba',
  ],
  [
    '',
    '0xf1f6ffff',
    '0xe5ebf3ff',
    '0x87858eff',
    '0x372b2b94',
    '0xc3b9b694',
    '0xb2aca794',
    '0xc2b9b694',
    '0x85777694',
    '0x31212094',
    '0xc2b8b594',
    '0xc1b7b494',
    '0x30242494',
    '0xc2bcc6ff',
    '0xa3a0a9ff',
    '0xa1b3cdff',
    '0x7f8da3ff',
    '0xdee8faff',
    '0x6badcbff',
    '0x5891adff',
    '0x51829bff',
    '0x7f8cbeff',
    '0x426c82ff',
    '0xd7b8bbff',
    '0xf2d0d2ff',
    '0x398198ff',
    '0x000601ff',
    '0x243027ff',
    '0x20281fff',
    '0xd1dbecff',
    '0xdbdaebff',
    '0xc2cadbff',
    '0x000902ff',
    '0x8c9eafff',
    '0xb7beceff',
    '0xb3c9dfff',
    '0xbab7c5ff',
    '0x000300ff',
    '0x2b2e2bff',
    '0x00000047',
    '0x484e67ff',
    '0x35394cff',
    '0x1e212dff',
    '0x131a21ff',
    '0x382b2b9e',
    '0xc3b8b59e',
    '0x3222209e',
    '0xb3aba69e',
    '0xc4b9b69e',
    '0x8677769e',
    '0x3223239e',
    '0xc2b7b49e',
    '0xc1b6b39e',
    '0x0f1113ff',
    '0x5e6584ff',
    '0x6f7bb0ff',
    '0x617cadff',
    '0xa0c8f2ff',
    '0xb2aebaff',
    '0xa292a5ff',
    '0x4b7088ff',
    '0xa7bfd2ff',
    '0x454a51ff',
    '0x76322eff',
    '0xd8edf1ff',
    '0xfc544aff',
    '0x004464ff',
    '0xccd6dfff',
    '0xbe4d50ff',
    '0x8d949bff',
    '0x98423fff',
    '0xcc7421ff',
    '0x000000ff',
    '0x5a6c82ff',
    '0x29333eff',
    '0x4721219e',
    '0xd3b5ab9e',
    '0x4821219e',
    '0xd3b6ab9e',
    '0x1a2129ff',
    '0x3a4554ff',
    '0xc0ab9d9e',
    '0xd3b4ab9e',
    '0x9b6a689e',
    '0x9b6b699e',
    '0xd2b4aa9e',
    '0x40191a9e',
    '0xc1a99d9e',
    '0x9b69689e',
    '0x4720209e',
    '0x4621219e',
    '0xd3b5ac9e',
    '0xc0a99d9e',
    '0x9b6a699e',
    '0xd4b6ab9e',
    '0x9c6b699e',
    '0x3f19199e',
    '0x4722229e',
    '0xd4b5ac9e',
    '0xd4b5ab9e',
    '0xc2ab9d9e',
    '0xd4b6ac9e',
    '0x9a69679e',
    '0xd2b4ab9e',
    '0xd6b7ac9e',
    '0xc1aa9d9e',
    '0x9b6b689e',
    '0xcdd5dfff',
    '0xb1b3b1ff',
    '0xc2ab9e9e',
    '0x9b69679e',
    '0x9fa5adff',
    '0xbdc4ceff',
    '0x939595ff',
    '0xc1aa9c9e',
    '0x8e939bff',
    '0x3a4654ff',
    '0x0e1319ff',
    '0x394758ff',
    '0xe6dbddff',
    '0x29313eff',
    '0x141921ff',
    '0x242c38ff',
    '0x252a26ff',
    '0x596266ff',
    '0x9fc1d4ff',
    '0x4a5a6bff',
    '0xd0eef2ff',
    '0x2a343fff',
    '0x2f3b48ff',
    '0x9dc1d4ff',
    '0x475364ff',
    '0x000301ff',
    '0x762222ff',
    '0x585d61ff',
    '0x44474cff',
    '0x5e6166ff',
    '0x777b81ff',
    '0x2a2d30ff',
    '0xa5adb5ff',
  ],
  // Car palettes
  [
    '',
    '0xfee0cbff',
    '0x5e5d5dff',
    '0xeb9000ff',
    '0x291c1aff',
    '0x3e3839ff',
    '0xfef8f5ff',
    '0xbbb4b6ff',
    '0xffefe3ff',
    '0xebd9d0ff',
    '0x100e09ff',
    '0xb4091cff',
    '0xd5c7c6ff',
    '0xbdb1afff',
    '0x838383ff',
    '0x494641ff',
    '0x766e68ff',
    '0x9c2a3cff',
    '0x7f0410ff',
    '0x401608ff',
    '0x570003ff',
    '0x911f38ff',
    '0xbfa5a8ff',
    '0x675c5dff',
    '0x4a4445ff',
    '0x645e5fff',
    '0x00000047',
    '0xfff3e0ff',
    '0xecc593ff',
    '0xebc493ff',
    '0xecc493ff',
    '0xecc592ff',
    '0xecc693ff',
    '0xedc694ff',
    '0xecc492ff',
    '0x070c16ff',
    '0x070c15ff',
    '0x080d16ff',
    '0x060b16ff',
    '0x070c17ff',
    '0x070d16ff',
    '0x060b15ff',
    '0x080d17ff',
    '0xecc594ff',
    '0x515151ff',
    '0x525252ff',
    '0x505050ff',
    '0xfef2e0ff',
    '0xb69871ff',
    '0xc3b9b59e',
    '0xb3aba69e',
    '0xc3b8b59e',
    '0x8776759e',
    '0x8877769e',
    '0x3223239e',
    '0xbfb3b09e',
    '0xc3b8b49e',
    '0x382b2b9e',
    '0x3a2b2b9e',
    '0x8775759e',
    '0x8675749e',
    '0x372a2a9e',
    '0x8876769e',
    '0xc4b9b59e',
    '0x3123239e',
    '0xc2b7b49e',
    '0x3324249e',
    '0xebc592ff',
    '0x392a2a9e',
    '0xc4b9b69e',
    '0xb4aca69e',
    '0xc2b8b49e',
    '0x3223249e',
    '0xc6bbb79e',
    '0x8775749e',
    '0xb4aca79e',
    '0xc9a87dff',
    '0xc5bab69e',
    '0xb3aba59e',
    '0xfef3e0ff',
    '0xc1b6b39e',
    '0xdac1a3ff',
    '0xb59771ff',
    '0x8d7657ff',
    '0x3222209e',
    '0x33211f9e',
    '0x3422209e',
    '0xb79972ff',
    '0xb89871ff',
    '0xb69971ff',
    '0xb69972ff',
    '0xb69870ff',
    '0xb59770ff',
    '0xb69872ff',
    '0xb79971ff',
    '0xedc693ff',
    '0xebc492ff',
    '0xfff4e0ff',
    '0xfef2dfff',
    '0xffdaa4ff',
    '0xffdaa3ff',
    '0xcdac81ff',
    '0xceae81ff',
    '0xcead81ff',
    '0xffdaa5ff',
    '0xfedaa4ff',
    '0xffdba4ff',
    '0xfed9a4ff',
    '0xfedaa3ff',
    '0xffe3bdff',
    '0xfee4beff',
    '0xffe5beff',
    '0xffe5bfff',
    '0xffe4bfff',
    '0xfee4bdff',
    '0xcfae81ff',
    '0xcfac81ff',
    '0xb79771ff',
    '0xffe4beff',
    '0xffe3beff',
    '0xb79770ff',
    '0x2e2e2eff',
    '0x303030ff',
    '0xffe4bdff',
    '0xa8bed2ff',
    '0xffffffff',
    '0x313131ff',
    '0xa7c0d2ff',
    '0x000701ff',
    '0x000601ff',
    '0x4b7088ff',
    '0xa8c0d2ff',
    '0xcbd6deff',
    '0x4a6e87ff',
    '0xa7bfd1ff',
    '0xfff4e1ff',
    '0x4b7188ff',
    '0xced6e0ff',
    '0xa6bed2ff',
    '0x000702ff',
    '0x000602ff',
    '0xcdd5dfff',
    '0xccd6dfff',
    '0xa7bfd2ff',
    '0x252e26ff',
    '0x253128ff',
    '0x243027ff',
    '0x232e26ff',
    '0x243128ff',
    '0x243127ff',
    '0x252e27ff',
    '0xcbd5deff',
    '0x202821ff',
    '0x243026ff',
    '0x20281eff',
    '0xcdd5deff',
    '0xccd6e0ff',
    '0x20281fff',
    '0x253127ff',
    '0x030303ff',
    '0x212121ff',
    '0x020202ff',
    '0x000903ff',
    '0xcdd7e0ff',
    '0x000902ff',
    '0x000000ff',
    '0x202020ff',
    '0x000501ff',
    '0x000a03ff',
    '0x243029ff',
    '0xccd6deff',
    '0x2b2e2aff',
    '0xccd7dfff',
    '0x2b2e2bff',
    '0x000300ff',
    '0x000200ff',
    '0x000a02ff',
    '0x263029ff',
    '0x202720ff',
    '0xced6dfff',
    '0x5a5f65ff',
    '0x474444a8',
    '0x151212a8',
    '0x6d6b6aa8',
    '0x020202a8',
    '0xd6e5ffff',
    '0xbdc9e2ff',
    '0xcbd9f3ff',
    '0x090909a8',
    '0x181717a8',
    '0x6d6b6ba8',
    '0x6c6a6aa8',
    '0x636262a8',
    '0x6e6c6ba8',
    '0xa4bae1ff',
    '0x060606a8',
    '0x0b0b0dff',
    '0x404040ff',
    '0xabb7ceff',
    '0xf2f2f2ff',
    '0x121216ff',
    '0x9095b3ff',
    '0x7c0101ff',
    '0x5f0405ff',
    '0x986271ff',
    '0x610100ff',
    '0x6b2229ff',
    '0xf9fdfdff',
    '0x701e26ff',
    '0x424d62ff',
    '0xecfaffff',
    '0xd8edf1ff',
    '0xf4eedfff',
    '0xd0d7ddff',
    '0x010002ff',
    '0x6f7893ff',
    '0x848a91ff',
    '0xf3f5fdff',
    '0xa3abb2ff',
    '0x7f2e34ff',
    '0x9f3c42ff',
    '0x000001ff',
    '0x2e333aff',
  ],
  // Accessory palettes from packages/contracts/airdrops/src/cny/GetPalettes5.sol
  [
    '',
    '0x000000ff',
    '0xc72112ff',
    '0xe02514ff',
    '0x4a2f22ff',
    '0x64402eff',
    '0xc7967fff',
    '0xe1aa90ff',
    '0xad7a65ff',
    '0xc88d74ff',
    '0xa87999ff',
    '0xf2aeddff',
    '0xc48db3ff',
    '0xd79ac4ff',
    '0xf62578ff',
    '0xa2828dff',
    '0xf5e1ebff',
    '0x000100ff',
    '0x8a5000ff',
    '0xf2a54aff',
    '0xb16600ff',
    '0xf5e8d7ff',
    '0xf08a01ff',
    '0xde3680ff',
    '0xf1c092ff',
    '0xf5f5f5ff',
    '0x0d1114ff',
    '0xf6c95dff',
    '0xbf9980ff',
    '0x773332ff',
    '0x944548ff',
    '0x947f83ff',
    '0xad9498ff',
    '0xc72112eb',
    '0xe02514eb',
    '0xc77e71ff',
    '0xa6695eff',
    '0xe39082ff',
    '0xb37166ff',
    '0xf19888ff',
    '0xe5e4daff',
    '0xb54f33ff',
    '0x3e8039ff',
    '0xa92223ff',
    '0xdb2c2cff',
    '0x32662eff',
    '0x254d22ff',
    '0x766352ff',
    '0x967c65ff',
    '0xdb7783ff',
    '0x806955ff',
    '0x8c745eff',
    '0xff6b4bff',
    '0xebebebff',
    '0xd4474fff',
    '0x992e35ff',
    '0xbb3941ff',
    '0xdbd8d3ff',
    '0xe8e2dcff',
    '0xf5efe9ff',
    '0x5b2b41ff',
    '0xd5943aff',
    '0xe9a52aff',
    '0xccc1b4ff',
    '0xa62424ff',
    '0xd5891aff',
    '0xc5c5c5ff',
    '0xf0f0f0ff',
    '0xab6f15ff',
    '0xedededff',
    '0xde5f5fff',
    '0xe4a673ff',
    '0x8b9bb4ff',
    '0xa9b4c2ff',
    '0xecf0f1ff',
    '0xc0ccdcff',
    '0x5a6988ff',
    '0x590f08ff',
    '0xcc9d25ff',
    '0xfcc02eff',
    '0xef6711ff',
    '0xe3640fff',
    '0xe45c0cff',
    '0xca8b5bff',
    '0x5f5b7aff',
    '0x996242ff',
    '0x3a374aff',
    '0xa96c48ff',
    '0xdbd6d0ff',
    '0x8a6a19ff',
    '0xb08720ff',
    '0xa37d1dff',
    '0x141414ff',
    '0x262626ff',
    '0x99190eff',
    '0xc4c4c4ff',
    '0xffffffff',
  ],
  [
    '5a90d1ff','4670a3ff','112c4dff','f3ebeeff','183d6bff','223136ff','415d66ff','628b99ff','555555ff','666666ff','111111ff','060606ff','282828ff','090303da','8c837fda','0c0c0cff','78716bda','8d837fda','433735da','060202da','89837cda','88827bda','040202da','959595ff','767676ff','76716bda','131313ff','646464ff','4f4f4fff','ccccccff','161616ff','870101ff','f0f0f0ff','878787ff','ad0202ff','c20303ff','a7a7a7ff','717171ff','a30202ff','a50202ff','720101ff','9ea7afff','000000ff','010302ff','8e92a1ff','a10202ff','700101ff','5c5e69ff','42464fff','95a0a8ff','6b7076ff','282a31ff','666a70ff','020202ff','00000047','c9e1e9ff','a6a19db0','291f1cb0','726866b0','a8a19eb0','2d211fb0','55555fff','3e657fff','93bfceff','5494b0ff','e0e7e9ff','c6cbcdff','989591b0','64c0dcff','d1d8daff','427089ff','85959bff','919da4ff','6b767dff','39444cff','3c464dff','bcd7d5ff','666769ff','5e8096ff','b3b5b5ff','8e8e8fff','606061ff','487e96ff','fff0edff','9fa8a9ff','a8aeacff','ffffffff','575158ff','6e6364ff','b0bbbcff','909798ff','2b4b55ff','a3b1b3ff','8d9ea0ff','b5d3dfff','878e90ff','767d80ff','616266ff','bbc6d3ff','929499ff','2b3f53ff','72757cff','000302ff','243027ff','000601ff','ccd6dfff','a3abb2ff','000902ff','1d2320ff','000300ff'
  ]
];
