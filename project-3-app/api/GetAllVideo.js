import * as SecureStore from 'expo-secure-store';

export default async function GetVideo() {
  let result =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJuYW1lIjoiYWRtaW5pc3RyYXRvciIsInBhc3N3b3JkIjoiJDJhJDEwJHdOUXZGWEV5cGZ6S0lXS0MxRzNYSHVFRWRYbTM3TldSSUNRVU1ua0hHVUNicXJtTkw0UGd1Iiwic3Vic2NyaXB0aW9uIjp0cnVlLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTY1Njg1ODAsImV4cCI6OTk1NjU2ODU4MH0.vlqNNd0Kz0csv7V1X6bpxhZQSBx_0s_CtxxrPIf_lQg';

  const response = await fetch('https://sdi4-g2.herokuapp.com/video', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + result,
    },
  });
  const list = await response.json();
  const exportList = list.data;
  return exportList;
}
