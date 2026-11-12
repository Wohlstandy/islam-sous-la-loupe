import type { MetadataRoute } from 'next';
import { origin } from '@/lib/metadata';
import { basePath } from '@/lib/model';
export const dynamic='force-static';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',allow:'/'},sitemap:origin+basePath+'/sitemap.xml'};}
