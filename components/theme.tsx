'use client';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
export function Theme() {
 const [dark,setDark]=useState(false);
 useEffect(()=>{
   try { const saved=localStorage.getItem('loupe:theme'); if(saved==='dark'||saved==='light') document.documentElement.dataset.theme=saved; } catch {}
   setDark(document.documentElement.dataset.theme ? document.documentElement.dataset.theme==='dark' : matchMedia('(prefers-color-scheme: dark)').matches);
 },[]);
 return <Button variant="outline" aria-label="Mode sombre" aria-pressed={dark} onClick={()=>{
   const value=dark?'light':'dark'; document.documentElement.dataset.theme=value;
   try { localStorage.setItem('loupe:theme',value); } catch {} setDark(!dark);
 }}>{dark?<Sun size={17} aria-hidden/>:<Moon size={17} aria-hidden/>}</Button>;
}
