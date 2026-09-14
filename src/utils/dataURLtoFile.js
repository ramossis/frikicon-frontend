export function dataURLtoFile(dataUrl, filename) {
  // Si ya es un objeto File o Blob nativo, no hacemos nada y lo devolvemos
  if (!(typeof dataUrl === 'string' && dataUrl.startsWith('data:'))) {
    return dataUrl;
  }

  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, { type: mime });
}