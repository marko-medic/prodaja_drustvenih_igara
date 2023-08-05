import React from 'react';
import { motion } from 'framer-motion';

const opcije = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

function AnimacionaStranica({ children }) {
  return (
    <motion.div
      variants={opcije}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default AnimacionaStranica;
