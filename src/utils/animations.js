export const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};
export const slideUp = {
    hidden: { opacity: 0, y: 50 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 20 },
    },
};
export const slideInFromLeft = {
    hidden: { opacity: 0, x: -50 },
    show: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 100, damping: 20 },
    },
};
export const slideInFromRight = {
    hidden: { opacity: 0, x: 50 },
    show: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 100, damping: 20 },
    },
};
export const zoomIn = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 100, damping: 20 },
    },
};
