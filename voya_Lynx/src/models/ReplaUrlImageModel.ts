



function resetUrlToOrigin(url: URL) {
  url.searchParams.delete('width');
  url.searchParams.delete('height');
  url.searchParams.delete('rate');
  url.searchParams.delete('resize');
}

export default function formatS3Image(
  src: string,
  w: number,
  h: number,
  q?: number | string
) {
  
  if (!src) {
    return null;
  }
  let dimensionConfig = [200, 300, 400, 600, 800, 1200];

  function getDimesion(value: number): number {
    if (value === 0) return value;
    let result: number = 0;
    for (let index = 0; index < dimensionConfig.length; index++) {
      result = dimensionConfig[index];
      if (value <= result) {
        break;
      }
    }
    return result;
  }

  function isIncludeCacheOrigin(origin: string) { 
    var cacheOrigin = [
      'https://cdnetworks.voya.world',
      'https://assets.voya.world',
    ]
   for(let i = 0; i < cacheOrigin.length; i++){
    if(origin.includes(cacheOrigin[i])){
      return true;
    }
   }
   return false;
  }

  try {
    let oldOrigin = [
      'https://voyaimg.s3.ap-northeast-1.amazonaws.com',
      'https://img.voya.world',
    ];
    let newOrigin = 'https://cdnetworks.voya.world';
    let srcUrl;
    if (!src) {
      return '';
    }
    for (const old of oldOrigin) {
      if (src.startsWith(old)) {
        src = src.replace(old, newOrigin);
        break;
      }
    }
    try {
      srcUrl = new URL(src);
    } catch (error) {
      return src;
    }
    if (isIncludeCacheOrigin(src)) {
      let newSRC = src.split("?")[0];
      let width = Math.floor(w);
      let height = Math.floor(h);
      let ratio = 1;

     
      width = getDimesion(width * ratio);
      height = getDimesion(height * ratio);
      srcUrl.searchParams.append(
        'resize',
        `p_4` + (width ? `,w_${width}` : ``) + (height ? `,h_${height}` : ``)
      );
      newSRC = newSRC + "?" + srcUrl.searchParams.toString();
      console.log("srcUrl.href",newSRC);

      return newSRC;
    } else {
      console.log("srcUrl.href",srcUrl.href);
      return src;
    }
  } catch (error) {
    console.error(error);
    return src;
  }
}
