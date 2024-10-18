import { BadRequestException } from '@nestjs/common';

export const stringToInt = (string: string) => {
  const int = parseInt(string);
  if (isNaN(int))
    throw new BadRequestException(
      `Cannot transform to int the string: ${string}`,
    );
  return int;
};
