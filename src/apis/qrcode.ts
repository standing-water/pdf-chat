export const getQRCode = (url: string) =>
  `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=http://localhost:3000/presentation/${url}`;
