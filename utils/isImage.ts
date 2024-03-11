const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif'];

export const isImage = (ext: string) => IMAGE_EXTENSIONS.includes(ext);
