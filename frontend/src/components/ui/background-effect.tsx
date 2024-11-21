export function BackgroundEffect() {
    return (
        <>
            <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-muted/30 to-background" />
            <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:60px_60px]" />
            <div className="absolute h-full w-full pointer-events-none">
                {[
                    { top: '10%', left: '50%', size: '20rem' },
                    { top: '60%', left: '20%', size: '25rem' },
                    { top: '30%', left: '80%', size: '22rem' },
                ].map((config, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full mix-blend-normal animate-slow-pulse"
                        style={{
                            background: `radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)`,
                            width: config.size,
                            height: config.size,
                            left: config.left,
                            top: config.top,
                            animationDelay: `${i * 1.5}s`,
                        }}
                    />
                ))}
            </div>
        </>
    );
}
