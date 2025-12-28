import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
    children: ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    duration?: number;
};

export function Reveal({
    children,
    width = "fit-content",
    delay = 0,
    direction = "up",
    duration = 0.5,
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    const getTransform = () => {
        switch (direction) {
            case "up":
                return "translateY(20px)";
            case "down":
                return "translateY(-20px)";
            case "left":
                return "translateX(20px)";
            case "right":
                return "translateX(-20px)";
            default:
                return "translateY(0)";
        }
    };

    return (
        <div ref={ref} style={{ width, overflow: "hidden" }}>
            <div
                style={{
                    transform: isVisible ? "translateY(0) translateX(0)" : getTransform(),
                    opacity: isVisible ? 1 : 0,
                    transition: `all ${duration}s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`,
                }}
            >
                {children}
            </div>
        </div>
    );
}
