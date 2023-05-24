export default function delayImport(time : number, promise:any) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
      }).then(() => promise);
}