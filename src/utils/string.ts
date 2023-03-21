import randomstring from 'randomstring';

export const randomPassword = () =>
  randomstring.generate({
    length: 8,
    charset: 'alphanumeric',
  });

export const randomString = (length?: number) =>
  randomstring.generate({
    length: length || 8,
    charset: 'alphanumeric',
  });

export const toSnakeCaseString = (str: string) => {
  return (
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((s) => s.toLowerCase())
      .join('-')
  );
};
