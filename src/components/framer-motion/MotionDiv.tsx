import { motion, MotionProps } from 'framer-motion';
import { ReactNode, Reference, RefObject } from 'react';

interface MotionDivProps extends MotionProps {
    children: ReactNode;
    ref?: RefObject<HTMLDivElement>;
    x?: number;
    y?: number;
    delay?: number;
    duration?: number;
    ease?: string;
    className?: string;
}

const MotionDiv: React.FC<MotionDivProps> = ({
    children,
    ref = undefined,
    className,
    x = 0,
    y = -10,
    delay = 0.2,
    duration = 0.3,
    ease = "easeInOut",
    ...props
}) => {
    return (
        <motion.div ref={ref} className={className}
            initial={{ opacity: 0, x, y }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay, duration, ease }}
            {...props}
        >
            {children}
        </motion.div >
    );
};

export default MotionDiv;
