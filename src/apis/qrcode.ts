export const getQRCode = (url: string) =>
  `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=http://standingwater.jadekim.kr/presentation/${url}`;
