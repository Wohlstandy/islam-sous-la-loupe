import type { Metadata } from 'next';
import { basePath } from './model';
export const origin=(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000').replace(/\/$/,'');
export function pageMeta(title:string,description:string,path:string):Metadata{
 return {title,description,alternates:{canonical:origin+basePath+path},
 openGraph:{title,description,url:origin+basePath+path,locale:'fr_FR',type:'article',siteName:'Islam sous la loupe'}};
}
