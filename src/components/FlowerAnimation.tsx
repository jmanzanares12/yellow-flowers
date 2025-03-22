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

        const resizeCanvas = () => {
            canvas.width = window.innerWidth * 0.9;
            canvas.height = window.innerHeight * 0.7;
            drawBouquet();
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        return () => window.removeEventListener("resize", resizeCanvas);
    }, [showFlower]);

    const drawFlower = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
        let frame = 0;
        const maxFrames = 30;

        const animatePetals = () => {
            ctx.clearRect(x - 40 * scale, y - 40 * scale, 80 * scale, 80 * scale);

            // Gradiente para el centro
            const centerGradient = ctx.createRadialGradient(x, y, 2 * scale, x, y, 10 * scale);
            centerGradient.addColorStop(0, "#FFA500");
            centerGradient.addColorStop(1, "#8B4513");

            // Centro de la flor
            ctx.beginPath();
            ctx.arc(x, y, 10 * scale, 0, Math.PI * 2);
            ctx.fillStyle = centerGradient;
            ctx.fill();

            // Dibujar pétalos con animación
            ctx.fillStyle = "#FFD700";
            ctx.strokeStyle = "#DAA520";
            ctx.lineWidth = 1.5 * scale;

            for (let angle = 0; angle < 360; angle += 45) {
                const radians = angle * (Math.PI / 180);
                const petalSize = (5 + (frame / maxFrames) * 10) * scale;

                const petalX = x + Math.cos(radians) * (15 + (frame / maxFrames) * 15) * scale;
                const petalY = y + Math.sin(radians) * (15 + (frame / maxFrames) * 15) * scale;

                ctx.beginPath();
                ctx.ellipse(petalX, petalY, petalSize, petalSize * 0.7, radians, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            }

            if (frame < maxFrames) {
                frame++;
                requestAnimationFrame(animatePetals);
            }
        };

        animatePetals();
    };

    const drawBouquet = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const scale = Math.min(canvas.width / 800, canvas.height / 600);

        // Tallos con gradiente
        const gradient = ctx.createLinearGradient(400, 500, 400, 250);
        gradient.addColorStop(0, "#006400");
        gradient.addColorStop(1, "#32CD32");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 4 * scale;
        ctx.lineCap = "round";

        // Dibujar tallos
        ctx.beginPath();
        ctx.moveTo(450 * scale, 500 * scale);
        ctx.quadraticCurveTo(380 * scale, 400 * scale, 400 * scale, 300 * scale);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(400 * scale, 400 * scale);
        ctx.quadraticCurveTo(350 * scale, 350 * scale, 370 * scale, 300 * scale);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(400 * scale, 400 * scale);
        ctx.quadraticCurveTo(450 * scale, 370 * scale, 430 * scale, 300 * scale);
        ctx.stroke();

        // Posiciones de las flores
        const flowerPositions: [number, number][] = [
            [400, 250],
            [350, 340],
            [450, 340]
        ];

        flowerPositions.forEach(([fx, fy]) => drawFlower(ctx, fx * scale, fy * scale, scale));
    };

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