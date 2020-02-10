export const getDeepValue = (source: any, paths: string): any =>
  paths.split('.').reduce((target, path, index, array) => {
    target = target[path] || (array.length - 1 === index ? null : {});

    return target;
  }, source || {});

export const queryToJSON = (query: string): any =>
  JSON.parse(
    `{"${decodeURIComponent(query)
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\s/g, '')}"}`
  );
