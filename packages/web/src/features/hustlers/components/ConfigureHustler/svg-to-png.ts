const svgtopng = (target: string, name: string, background: string): Promise<string> => {
  var svg = document.querySelector(target)!;

  var svgData = new XMLSerializer().serializeToString(svg!);
  var canvas = document.createElement('canvas');
  var svgSize = svg.getBoundingClientRect();

  //Resize can break shadows
  canvas.width = svgSize.width * 5;
  canvas.height = svgSize.height * 5;
  canvas.setAttribute('height', svgSize.height * 5 + 'px');
  canvas.setAttribute('width', svgSize.width * 5 + 'px');

  var ctx = canvas.getContext('2d')!;
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var img = document.createElement('img');
  img.setAttribute('src', 'data:image/svg+xml;base64,' + btoa(svgData));
  return new Promise<string>(resolve => {
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      const file = canvas.toDataURL(`image/png`, 1);
      downloadImage({ file, name });
      resolve(file);
    };
  });
};

const downloadImage = ({ file, name }: { file: string; name: string }) => {
  var a = document.createElement('a');
  a.className = 'display-none';
  a.download = `${name}.png`;
  a.href = file;
  document.body.appendChild(a);
  a.click();
};

export default svgtopng;
