import { AnimatePresence, motion } from "framer-motion";

interface PopupProps {
  txt: string;
}

const Popup = ({ txt }: PopupProps) => {
  return (
    <div className="absolute top-6 left-0 right-0  w-full flex justify-center">
      <AnimatePresence>
        {txt && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65 }}
            className="bg-white text-[var(--bg)] py-2 px-4"
          >
            <p>{txt}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Popup;
