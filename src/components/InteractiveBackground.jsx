import { useEffect, useRef } from 'react';

export default function InteractiveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Canvas sizing setup
    let width = 0;
    let height = 0;
    let dpr = 1;

    const handleResize = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse tracking with smooth lerp interpolation
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      vx: 0,
      vy: 0,
      active: false
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Floating 3D wireframe cube objects definition
    const cubes = [
      { x: width * 0.12, y: height * 0.22, size: 28, rotX: 0.2, rotY: 0.4, rotZ: 0.1, speedX: 0.005, speedY: 0.007 },
      { x: width * 0.88, y: height * 0.28, size: 36, rotX: 0.5, rotY: 0.2, rotZ: 0.3, speedX: 0.004, speedY: 0.006 },
      { x: width * 0.18, y: height * 0.78, size: 32, rotX: 0.1, rotY: 0.6, rotZ: 0.4, speedX: 0.006, speedY: 0.004 },
      { x: width * 0.82, y: height * 0.82, size: 42, rotX: 0.4, rotY: 0.3, rotZ: 0.2, speedX: 0.005, speedY: 0.005 },
    ];

    // Helper: 3D Wireframe Cube Projector
    const draw3DCube = (x, y, size, rx, ry, rz, opacity) => {
      const half = size / 2;
      const vertices = [
        [-half, -half, -half],
        [half, -half, -half],
        [half, half, -half],
        [-half, half, -half],
        [-half, -half, half],
        [half, -half, half],
        [half, half, half],
        [-half, half, half],
      ];

      // Rotate around X, Y, Z
      const projected = vertices.map(([vx, vy, vz]) => {
        // Rotate Y
        let x1 = vx * Math.cos(ry) + vz * Math.sin(ry);
        let z1 = -vx * Math.sin(ry) + vz * Math.cos(ry);
        // Rotate X
        let y2 = vy * Math.cos(rx) - z1 * Math.sin(rx);
        let z2 = vy * Math.sin(rx) + z1 * Math.cos(rx);
        // Rotate Z
        let x3 = x1 * Math.cos(rz) - y2 * Math.sin(rz);
        let y3 = x1 * Math.sin(rz) + y2 * Math.cos(rz);

        // Perspective factor
        const fov = 300;
        const scale = fov / (fov + z2 + 100);

        return [x + x3 * scale, y + y3 * scale];
      });

      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0], // Front face
        [4, 5], [5, 6], [6, 7], [7, 4], // Back face
        [0, 4], [1, 5], [2, 6], [3, 7], // Connecting edges
      ];

      ctx.save();
      ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
      ctx.lineWidth = 1;

      edges.forEach(([p1, p2]) => {
        ctx.beginPath();
        ctx.moveTo(projected[p1][0], projected[p1][1]);
        ctx.lineTo(projected[p2][0], projected[p2][1]);
        ctx.stroke();
      });
      ctx.restore();
    };

    // Main animation render loop
    const gridSpacing = 44;

    const render = () => {
      // Lerp mouse positions for smooth cursor movement
      const dx = mouse.targetX - mouse.x;
      const dy = mouse.targetY - mouse.y;
      mouse.x += dx * 0.1;
      mouse.y += dy * 0.1;
      mouse.vx = dx * 0.1;
      mouse.vy = dy * 0.1;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Spotlight Ambient Radial Light around mouse
      if (mouse.active || Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        const spotRadius = 240;
        const spotGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, spotRadius);
        spotGrad.addColorStop(0, 'rgba(0, 0, 0, 0.04)');
        spotGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.015)');
        spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.save();
        ctx.fillStyle = spotGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, spotRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2. Draw Floating 3D Wireframe Cubes in Corners with Parallax
      const parallaxX = (mouse.x - width / 2) * 0.02;
      const parallaxY = (mouse.y - height / 2) * 0.02;

      cubes.forEach((cube) => {
        cube.rotX += cube.speedX;
        cube.rotY += cube.speedY;

        const posX = cube.x + parallaxX;
        const posY = cube.y + parallaxY;

        draw3DCube(posX, posY, cube.size, cube.rotX, cube.rotY, cube.rotZ, 0.09);
      });

      // 3. Render Minimal Interactive Dot & 3D Block Matrix Grid
      const cols = Math.ceil(width / gridSpacing) + 1;
      const rows = Math.ceil(height / gridSpacing) + 1;

      const influenceRadius = 150;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const baseX = i * gridSpacing;
          const baseY = j * gridSpacing;

          const distMouse = Math.hypot(baseX - mouse.x, baseY - mouse.y);
          const influence = Math.max(0, 1 - distMouse / influenceRadius);

          if (influence > 0) {
            // Smooth cubic easing for 3D elevation curve
            const eased = Math.pow(influence, 2);

            // 3D Perspective displacement vectors
            const vecX = (baseX - mouse.x) * eased * 0.18;
            const vecY = (baseY - mouse.y) * eased * 0.18;
            const liftZ = eased * 12;

            const elevatedX = baseX + vecX;
            const elevatedY = baseY + vecY - liftZ;

            ctx.save();

            if (influence > 0.45) {
              // High proximity: Draw 3D elevated block/cube representation
              const blockSize = 4 + influence * 8;
              const halfBlock = blockSize / 2;

              // Draw subtle shadow base at ground level
              ctx.fillStyle = `rgba(0, 0, 0, ${0.08 * influence})`;
              ctx.beginPath();
              ctx.ellipse(baseX, baseY, halfBlock, halfBlock * 0.5, 0, 0, Math.PI * 2);
              ctx.fill();

              // Connection lines for 3D depth effect
              ctx.strokeStyle = `rgba(0, 0, 0, ${0.15 * influence})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(baseX, baseY);
              ctx.lineTo(elevatedX, elevatedY);
              ctx.stroke();

              // Elevated Block face
              ctx.fillStyle = `rgba(17, 17, 17, ${0.4 + 0.5 * influence})`;
              ctx.strokeStyle = `rgba(0, 0, 0, ${0.6 + 0.3 * influence})`;
              ctx.lineWidth = 1.2;

              ctx.beginPath();
              ctx.roundRect(
                elevatedX - halfBlock,
                elevatedY - halfBlock,
                blockSize,
                blockSize,
                2
              );
              ctx.fill();
              ctx.stroke();
            } else {
              // Medium proximity: Elevated highlighted dot
              const dotRadius = 1.5 + influence * 3.5;
              const opacity = 0.12 + influence * 0.5;

              ctx.fillStyle = `rgba(17, 17, 17, ${opacity})`;
              ctx.beginPath();
              ctx.arc(elevatedX, elevatedY, dotRadius, 0, Math.PI * 2);
              ctx.fill();
            }

            ctx.restore();
          } else {
            // Default uninfluenced matrix dot
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.beginPath();
            ctx.arc(baseX, baseY, 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 4. Subtle Micro Cursor Ring Indicator
      if (mouse.active) {
        const ringRadius = 16 + Math.hypot(mouse.vx, mouse.vy) * 0.3;
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -3, // Sits strictly BEHIND face animation canvas (-1) and page content
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    />
  );
}
