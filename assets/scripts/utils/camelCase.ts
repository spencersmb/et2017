// the most terrible camelizer on the internet, guaranteed!
export default (str:any):any => `${str.charAt(0).toLowerCase()}${str.replace(/[\W_]/g, '|').split('|')
  .map((part:any) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
  .join('')
  .slice(1)}`;
