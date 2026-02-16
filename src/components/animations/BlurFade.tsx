import { motion } from 'motion/react';
import type { Transition } from 'motion/react';
import React, { useMemo, useRef, useState, useEffect } from 'react';

type BlurFadeProps = {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    direction?: 'top' | 'bottom';
    threshold?: number;
    rootMargin?: string;
    blur?: string;
    yOffset?: number;
    duration?: number;
    easing?: any;
};

// Helper for building keyframes (similar to BlurText)
const buildKeyframes = (
    from: Record<string, string | number>,
    steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
    const keys = new Set<string>([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);
    const keyframes: Record<string, Array<string | number>> = {};
    keys.forEach(k => {
        keyframes[k] = [from[k], ...steps.map(s => s[k])];
    });
    return keyframes;
};

const BlurFade: React.FC<BlurFadeProps> = ({
    children,
    delay = 0,
    className = '',
    direction = 'top',
    threshold = 0.1,
    rootMargin = '0px',
    blur = '10px',
    yOffset = 50,
    duration = 0.35,
    easing = (t: number) => t
}) => {
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        // Check for bots to ensure content is indexed even if they don't scroll
        const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);
        if (isBot) {
            setInView(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(ref.current as Element);
                }
            },
            { threshold, rootMargin }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    const defaultFrom = useMemo(
        () =>
            direction === 'top'
                ? { filter: `blur(${blur})`, opacity: 0, y: -yOffset }
                : { filter: `blur(${blur})`, opacity: 0, y: yOffset },
        [direction, blur, yOffset]
    );

    const defaultTo = useMemo(
        () => [
            {
                filter: 'blur(5px)',
                opacity: 0.5,
                y: direction === 'top' ? 5 : -5
            },
            { filter: 'blur(0px)', opacity: 1, y: 0 }
        ],
        [direction]
    );

    const stepCount = defaultTo.length + 1;
    const totalDuration = duration * (stepCount - 1);
    const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

    const animateKeyframes = buildKeyframes(defaultFrom, defaultTo);

    const moveTransition: Transition = {
        duration: totalDuration,
        times,
        delay: delay / 1000,
        ease: easing
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={defaultFrom}
            animate={inView ? animateKeyframes : defaultFrom}
            transition={moveTransition}
            style={{
                willChange: 'transform, filter, opacity'
            }}
        >
            {children}
        </motion.div>
    );
};

export default BlurFade;
