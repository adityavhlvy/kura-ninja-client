import { useEffect, useState } from 'react';
import { useTime } from '../context/TimeContext';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    duration: number;
    delay: number;
}

function generateParticles(count: number): Particle[] {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 5,
    }));
}

function Stars({ particles }: { particles: Particle[] }) {
    return (
        <>
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full bg-white animate-pulse"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        opacity: p.opacity,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`,
                    }}
                />
            ))}
        </>
    );
}

function Fireflies({ particles }: { particles: Particle[] }) {
    return (
        <>
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full bg-amber-400 blur-sm"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: `${p.size * 2}px`,
                        height: `${p.size * 2}px`,
                        opacity: p.opacity,
                        animation: `float ${p.duration}s ease-in-out infinite, pulse ${p.duration / 3}s ease-in-out infinite`,
                        animationDelay: `${p.delay}s`,
                    }}
                />
            ))}
        </>
    );
}

function Dust({ particles }: { particles: Particle[] }) {
    return (
        <>
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full bg-base-content/20"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        opacity: p.opacity * 0.5,
                        animation: `float ${p.duration}s ease-in-out infinite`,
                        animationDelay: `${p.delay}s`,
                    }}
                />
            ))}
        </>
    );
}

export default function ParticleField() {
    const { theme } = useTime();
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const count = theme.particleType === 'stars' ? 50 :
            theme.particleType === 'fireflies' ? 20 :
                theme.particleType === 'dust' ? 30 : 0;
        setParticles(generateParticles(count));
    }, [theme.particleType]);

    if (theme.particleType === 'none') return null;

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {theme.particleType === 'stars' && <Stars particles={particles} />}
            {theme.particleType === 'fireflies' && <Fireflies particles={particles} />}
            {theme.particleType === 'dust' && <Dust particles={particles} />}
        </div>
    );
}
