// // renderer/utils/browser-check.ts
// export const isBrowser = () => typeof window !== 'undefined';
// export const getGlobalThis = () => {
//   if (typeof self !== 'undefined') return self;
//   if (typeof window !== 'undefined') return window;
//   if (typeof global !== 'undefined') return global;
//   throw new Error('unable to locate global object');
// };