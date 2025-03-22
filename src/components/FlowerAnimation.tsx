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

        const bouquetWidth = 300; 
        const bouquetHeight = 350; 

        // Ajustar el tamaño del canvas al bouquet
        canvas.width = bouquetWidth;
        canvas.height = bouquetHeight;

        drawBouquet();
    }, [showFlower]);

    const drawFlower = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
        ctx.save();
        ctx.translate(x, y);

        // Centro de la flor
        ctx.beginPath();
        ctx.arc(0, 0, 10 * scale, 0, Math.PI * 2);
        ctx.fillStyle = "#FFA500";
        ctx.fill();

        // Dibujar pétalos
        ctx.fillStyle = "#FFD700";
        ctx.strokeStyle = "#DAA520";

        for (let angle = 0; angle < 360; angle += 45) {
            const radians = angle * (Math.PI / 180);
            const petalX = Math.cos(radians) * 20 * scale;
            const petalY = Math.sin(radians) * 20 * scale;

            ctx.beginPath();
            ctx.ellipse(petalX, petalY, 12 * scale, 8 * scale, radians, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }

        ctx.restore();
    };

    const drawBouquet = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const scale = 1;
        ctx.strokeStyle = "#006400";
        ctx.lineWidth = 4;
        ctx.lineCap = "round";

        // Dibujar tallos
        ctx.beginPath();
        ctx.moveTo(170, 350);
        ctx.quadraticCurveTo(140, 250, 150, 180);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(150, 250);
        ctx.quadraticCurveTo(120, 200, 130, 150);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(150, 250);
        ctx.quadraticCurveTo(180, 200, 170, 150);
        ctx.stroke();

        // Posiciones de las flores (ajustadas al centro)
        const flowerPositions: [number, number][] = [
            [150, 120],
            [120, 170],
            [180, 170]
        ];

        flowerPositions.forEach(([fx, fy]) => drawFlower(ctx, fx, fy, scale));
    };

    return (
        <div className="w-screen h-screen bg-black flex flex-col justify-center items-center p-2">
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