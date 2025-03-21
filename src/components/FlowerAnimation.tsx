import React, { useEffect, useRef, useState } from "react";

const FlowerAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [showFlower, setShowFlower] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const flowerTimer = setTimeout(() => setShowFlower(true), 1500);
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
            ctx.fillStyle = "#FFD700";
            for (let angle = 0; angle < 360; angle += 45) {
                const radius = angle * (Math.PI / 180);
                const petalX = x + Math.cos(radius) * 25;
                const petalY = y + Math.sin(radius) * 25;

                ctx.beginPath();
                ctx.ellipse(petalX, petalY, 15, 10, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = "#DAA520";
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        };

        const drawBuquet = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const gardient = ctx.createLinearGradient(400, 500, 400, 250);
            gardient.addColorStop(0, "#006400");
            gardient.addColorStop(1, "#32CD32");

            ctx.strokeStyle = gardient;
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
            flowerPosition.forEach(([fx, fy]) => drawFlower(fx, fy));
        }
        drawBuquet();
    }, [showFlower]);

    return (
        <div className="w-screen h-screen bg-black flex justify-center items-center">
            <canvas ref={canvasRef} />
            {showMessage && (
                <div className="fixed bottom-12 text-white text-center
                    animate-[fadeIn_2s_ease-in_4s_fordwards] opacity-0
                    text-2xl font-bold font-coursive" >
                    <h2 >U r a beautiful flower</h2><br />
                    <h3>This is for u</h3>
                </div>
            )}
        </div>
    )
}

export default FlowerAnimation;