import React, { useEffect, useState } from 'react';
import SparkleBtn from './cover';

const RANDOM = (min: number, max: number) => 
    Math.floor(Math.random() * (max - min + 1) + min);

const Button: React.FC = () => {

    const [particleStyles, setParticleStyles] = useState<string[]>([]);

    useEffect(() => {
        const PARTICLES = document.querySelectorAll('.particle');
        const newStyles: string[] = [];

        PARTICLES.forEach(P => {
            const style = `
                --x: ${RANDOM(20, 80)};
                --y: ${RANDOM(20, 80)};
                --duration: ${RANDOM(6, 20)};
                --delay: ${RANDOM(1, 10)};
                --alpha: ${RANDOM(40, 90) / 100};
                --origin-x: ${Math.random() > 0.5 ? RANDOM(300, 800) * -1 : RANDOM(300, 800)}%;
                --origin-y: ${Math.random() > 0.5 ? RANDOM(300, 800) * -1 : RANDOM(300, 800)}%;
                --size: ${RANDOM(40, 90) / 100};
            `;
            newStyles.push(style);
        });

        setParticleStyles(newStyles);
    }, []);

    return (
        <>
            {particleStyles.map((style, index) => (
                <div 
                    key={index} 
                    className="particle" 
                    style={{}}
                >
                    <SparkleBtn />
                </div>
            ))}
        </>
    );
}

export default Button;