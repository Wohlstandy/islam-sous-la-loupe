'use client';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
export function Enter({children}:{children:ReactNode}) {
 const reduce=useReducedMotion();
 return <motion.div initial={false} animate={{y:0}} whileHover={reduce?undefined:{y:-3}} transition={{duration:.16}}>{children}</motion.div>;
}
