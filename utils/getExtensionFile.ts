import { Extension } from './getColorByExtension';

export const getExtensionFile = (filename: string) => {
  return filename.split('.').pop() as Extension;
};
