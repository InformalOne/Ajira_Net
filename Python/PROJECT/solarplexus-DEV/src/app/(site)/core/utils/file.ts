export const downloadImage = async (imgUrl: string): Promise<void> => {
  const response = await fetch(imgUrl);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${new Date().toString()}.png`;
  link.click();
}
