



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
    console.log("src",src);
    return src;
    
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

    return [
      'https://cdnetworks.voya.world',
      'https://assets.voya.world',
    ].includes(origin);
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
    console.log("srcUrl.origin",srcUrl);
    if (isIncludeCacheOrigin(srcUrl.origin)) {
      resetUrlToOrigin(srcUrl);
      let width = Math.floor(w);
      let height = Math.floor(h);
      let ratio = Math.max(1, Math.floor(window.devicePixelRatio));

      // 大图泛滥，png比例改为1
      if (srcUrl.pathname.includes('.png')) {
        ratio = 1;
      }

      width = getDimesion(width * ratio);
      height = getDimesion(height * ratio);
      srcUrl.searchParams.append(
        'resize',
        `p_4` + (width ? `,w_${width}` : ``) + (height ? `,h_${height}` : ``)
      );
      if (q) {
        srcUrl.searchParams.append('Q', q.toString());
      }
      console.log("srcUrl.href",`${srcUrl.origin}${decodeURIComponent(
        srcUrl.pathname
      )}${decodeURIComponent(srcUrl.search)}`);
      return `${srcUrl.origin}${decodeURIComponent(
        srcUrl.pathname
      )}${decodeURIComponent(srcUrl.search)}`;
    } else {
      console.log("srcUrl.href",srcUrl.href);
      return srcUrl.href;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
