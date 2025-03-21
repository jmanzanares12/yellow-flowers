import React, { useEffect, useRef, useState } from "react";

const FlowerAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [showFlower, setShowFlower] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const flowerTimer = setTimeout(() => setShowFlower(true), 2000);
        const messageTimer = setTimeout(() => setShowMessage(true), 4000);

        return () => {
            clearTimeout(flowerTimer);
            clearTimeout(messageTimer);
        };
    }, []);

    useEffect(() => {
        if (!showFlower || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Configure the canvas
        canvas.width = 800;
        canvas.height = 600;

        // Draw the flower
        const drawFlower = (x: number, y: number) => {
            // Center
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fillStyle = "#8B4513";
            ctx.fill();

            // Petals
            ctx.fillStyle = "#FFFF00";
            for (let angle = 0; angle < 360; angle += 30) {
                const radius = (angle * Math.PI) / 180;
                const petalX = x + Math.cos(radius) * 25;
                const petalY = y + Math.sin(radius) * 25;
                ctx.beginPath();
                ctx.ellipse(petalX, petalY, 15, 10, 0, 0, Math.PI * 2);
            }
        };

        const drawBuquet = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = "#228B22";
            ctx.lineWidth = 5;

            ctx.beginPath();
            ctx.moveTo(400, 500);
            ctx.lineTo(400, 300);
            ctx.stroke();

            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.moveTo(400, 400);
            ctx.lineTo(350, 300);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(400, 400);
            ctx.lineTo(450, 350);
            ctx.stroke();

            //Flower
            const flowerPosition: [number, number][] = [
                [400, 250],
                [370, 300],
                [430, 300],
                [350, 340],
                [450, 340]
            ];
            flowerPosition.forEach(pos => drawFlower(pos[0], pos[1]));
        };
        drawBuquet();
    }, [showFlower]);

    return (
        <div className="w-screen h-screen bg-black flex justify-center items-center">
            <canvas ref={canvasRef} />
            {showMessage && (
                <div className="fixed bottom-12 text-white text-center
                    animate-[fadeIn_2s_ease-in_4s_fordwards] opacity-0
                    text-2xl font-bold font-coursive" >
                    
                </div>
            )}
        </div>
    )
}

export default FlowerAnimation;