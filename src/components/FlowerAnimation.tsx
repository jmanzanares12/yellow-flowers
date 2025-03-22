import React, { useEffect, useRef, useState } from "react";

const FlowerAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [showFlower, setShowFlower] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const flowerTimer = setTimeout(() => setShowFlower(true), 1500);
        const messageTimer = setTimeout(() => setShowMessage(true), 2000);

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

        canvas.width = 800;
        canvas.height = 600;

        const drawFlower = (x: number, y: number) => {
            let frame = 0;
            const maxFrame = 30;

            const animatePetals = () => {
                ctx.clearRect(x -40, y - 40, 80, 80);

                const centerGradient = ctx.createRadialGradient(x, y, 2, x, y, 10);
                centerGradient.addColorStop(0, "#FFA500");
                centerGradient.addColorStop(1, "#8B4513");

                ctx.beginPath();
                ctx.arc(x, y, 10, 0, Math.PI * 2);
                ctx.fillStyle = centerGradient;
                ctx.fill();

                ctx.fillStyle = "#FFD700";
                ctx.strokeStyle = "#DAA520";
                ctx.lineWidth = 2;

                for (let angle = 0; angle < 360; angle += 45){
                    const radius = angle * (Math.PI / 180);
                    const petalSize = 5 + (frame / maxFrame) * 10;

                    const petalX = x + Math.cos(radius) * (15 + (frame / maxFrame) * 15);
                    const petalY = y + Math.sin(radius) * (15 + (frame / maxFrame) * 15);

                    ctx.beginPath();
                    ctx.ellipse(petalX, petalY, petalSize, petalSize * 0.7, radius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                }

                if (frame < maxFrame) {
                    frame++;
                    requestAnimationFrame(animatePetals);
                }
            }
            animatePetals();
        };

        const drawBouquet = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const gradient = ctx.createLinearGradient(400, 500, 400, 250);
            gradient.addColorStop(0, "#006400");
            gradient.addColorStop(1, "#32CD32");

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 6;
            ctx.lineCap = "round";

            ctx.beginPath();
            ctx.moveTo(450, 500);
            ctx.quadraticCurveTo(380, 400, 400, 300);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(400, 400);
            ctx.quadraticCurveTo(350, 350, 370, 300);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(400, 400);
            ctx.quadraticCurveTo(450, 370, 430, 300);
            ctx.stroke();

            const flowerPositions: [number, number][] = [
                [400, 250],
                [350, 340],
                [450, 340]
            ];
            flowerPositions.forEach(([fx, fy]) => drawFlower(fx, fy));
        };

        drawBouquet();
    }, [showFlower]);

    return (
        <div className="w-screen h-screen bg-black flex flex-col justify-center items-center p-4">
            <canvas ref={canvasRef} className="border-2 border-gray-800 rounded-lg shadow-lg" />
            {showMessage && (
                <div className="fixed bottom-8 text-white text-center text-lg sm:text-xl font-semibold opacity-0 animate-fadeIn">
                    <h2 className="text-yellow-400">You are a beautiful flower 🌻</h2>
                    <h3>This is for you 💛</h3>
                </div>
            )}
        </div>
    )
}

export default FlowerAnimation;