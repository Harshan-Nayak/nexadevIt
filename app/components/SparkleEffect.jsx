'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

const SparkleEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState([]);
  const [trail, setTrail] = useState([]);
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const createSparkle = useCallback((x, y) => {
    const size = Math.random() * 10 + 5;
    return {
      id: Math.random(),
      x,
      y,
      size,
      createdAt: Date.now()
    };
  }, []);

  const createTrailParticle = useCallback((x, y) => {
    return {
      id: Math.random(),
      x,
      y,
      color: `hsla(${Math.random() * 360}, 100%, 75%, 1)`,
      createdAt: Date.now()
    };
  }, []);

  const animateSparkles = useCallback((time) => {
    if (previousTimeRef.current !== undefined) {
      // Update sparkles
      setSparkles((prevSparkles) => {
        const currentTime = Date.now();
        return prevSparkles
          .filter((sparkle) => currentTime - sparkle.createdAt < 1000)
          .concat(Math.random() < 0.3 ? createSparkle(mousePosition.x, mousePosition.y) : []);
      });

      // Update trail
      setTrail((prevTrail) => {
        const currentTime = Date.now();
        return prevTrail
          .filter((particle) => currentTime - particle.createdAt < 500)
          .concat(createTrailParticle(mousePosition.x, mousePosition.y));
      });
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateSparkles);
  }, [mousePosition, createSparkle, createTrailParticle]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(animateSparkles);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, [animateSparkles]);

  return (
    <>
      <div
        className="cursor-glow"
        style={{
          transform: `translate(${mousePosition.x - 10}px, ${mousePosition.y - 10}px)`
        }}
      />
      <div className="sparkle">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="sparkle-particle"
            style={{
              left: sparkle.x - sparkle.size / 2,
              top: sparkle.y - sparkle.size / 2,
              width: sparkle.size,
              height: sparkle.size
            }}
          />
        ))}
      </div>
      {trail.map((particle) => (
        <div
          key={particle.id}
          className="sparkle-trail"
          style={{
            left: particle.x - 2,
            top: particle.y - 2,
            background: particle.color
          }}
        />
      ))}
    </>
  );
};

export default SparkleEffect;
