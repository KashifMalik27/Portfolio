'use client';

import { useEffect, useRef } from 'react';
import SkillCard from './SkillCard';

export default function SkillPhysicsField({ skills, selectedSkill, onSelect }) {
  const fieldRef = useRef(null);
  const bubbleRefs = useRef([]);
  const selectedNameRef = useRef(selectedSkill?.name);
  selectedNameRef.current = selectedSkill?.name;

  useEffect(() => {
    let disposed = false;
    let frameId = 0;
    let observer;
    let cleanupMatter = () => {};

    async function startPhysics() {
      const Matter = await import('matter-js');
      if (disposed || !fieldRef.current) return;

      const field = fieldRef.current;
      const mobile = window.matchMedia('(max-width: 640px)').matches;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const width = field.clientWidth;
      const height = field.clientHeight;
      const sizeFactors = skills.map(({ name }) => {
        if (name.length > 34) return 1.36;
        if (name.length > 24) return 1.24;
        if (name.length > 14) return 1.12;
        return 1;
      });
      const averageAreaFactor = sizeFactors.reduce((sum, factor) => sum + factor ** 2, 0) / Math.max(1, skills.length);
      const capacityRadius = Math.sqrt((width * height) / Math.max(1, skills.length * Math.PI * 1.65 * averageAreaFactor));
      const baseRadius = Math.floor(Math.max(mobile ? 30 : 40, Math.min(mobile ? 38 : 60, capacityRadius)));
      const radii = sizeFactors.map((factor) => Math.round(baseRadius * factor));
      const maxRadius = Math.max(...radii);
      bubbleRefs.current.forEach((element, index) => {
        element?.style.setProperty('--skill-bubble-size', `${radii[index] * 2}px`);
      });
      const { Bodies, Body, Composite, Engine, Sleeping } = Matter;
      const engine = Engine.create({ enableSleeping: true, gravity: { x: 0, y: mobile ? 0.72 : 1.45 } });
      engine.positionIterations = mobile ? 8 : 4;
      engine.velocityIterations = 3;

      const seededValue = (text, salt) => {
        let hash = salt;
        for (let index = 0; index < text.length; index += 1) hash = Math.imul(hash ^ text.charCodeAt(index), 2654435761);
        return ((hash >>> 0) % 1000) / 1000;
      };
      const scales = skills.map(() => 1);
      const lastTransforms = skills.map(() => '');
      const bodies = skills.map((skill, index) => {
        const radius = radii[index];
        const collisionRadius = radius + (mobile ? 4 : 0);
        const randomX = seededValue(skill.name, 17);
        const randomY = seededValue(skill.name, 91);
        const x = collisionRadius + randomX * Math.max(1, width - collisionRadius * 2);
        const y = reducedMotion
          ? height / 2
          : -collisionRadius - randomY * (mobile ? 260 : 180) - (index % 6) * 24;
        const body = Bodies.circle(x, y, collisionRadius, {
          restitution: mobile ? 0.38 : 0.56,
          friction: 0.02,
          frictionAir: mobile ? 0.035 : 0.022,
          density: 0.0015,
        });
        Body.setAngularVelocity(body, (seededValue(skill.name, 43) - 0.5) * 0.08);
        return body;
      });

      const wallOptions = { isStatic: true, restitution: 0.7 };
      const walls = [
        Bodies.rectangle(width / 2, height + 20, width + 80, 48, wallOptions),
        Bodies.rectangle(-24, height / 2, 48, height * 2, wallOptions),
        Bodies.rectangle(width + 24, height / 2, 48, height * 2, wallOptions),
      ];
      Composite.add(engine.world, [...bodies, ...walls]);
      field.classList.add('is-ready');

      let fieldRect = field.getBoundingClientRect();
      const pointer = { x: -999, y: -999, vx: 0, vy: 0, active: false, pending: false, firstHover: true, energy: 0 };
      const refreshPointerBounds = (event) => {
        fieldRect = field.getBoundingClientRect();
        pointer.x = event.clientX - fieldRect.left;
        pointer.y = event.clientY - fieldRect.top;
        pointer.vx = 0;
        pointer.vy = 0;
        pointer.active = true;
        pointer.pending = true;
        pointer.firstHover = true;
        pointer.energy = 1.8;
      };
      const trackPointer = (event) => {
        const nextX = event.clientX - fieldRect.left;
        const nextY = event.clientY - fieldRect.top;
        pointer.vx = nextX - pointer.x;
        pointer.vy = nextY - pointer.y;
        pointer.x = nextX;
        pointer.y = nextY;
        pointer.energy = pointer.firstHover ? 1.8 : Math.min(1.35, Math.max(0.55, Math.hypot(pointer.vx, pointer.vy) / 14));
        pointer.pending = true;
      };
      const clearPointer = () => {
        pointer.active = false;
        pointer.pending = false;
      };
      if (!mobile && !reducedMotion) {
        field.addEventListener('pointerenter', refreshPointerBounds);
        field.addEventListener('pointermove', trackPointer, { passive: true });
        field.addEventListener('pointerleave', clearPointer);
      }

      if (reducedMotion) {
        bodies.forEach((body, index) => {
          const columns = Math.max(1, Math.floor(width / (maxRadius * 2.25)));
          const column = index % columns;
          const row = Math.floor(index / columns);
          Body.setPosition(body, { x: maxRadius + column * maxRadius * 2.15, y: maxRadius + 12 + row * maxRadius * 2.15 });
          Body.setStatic(body, true);
        });
      }

      let visible = true;
      observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.05 });
      observer.observe(field);
      let last = performance.now();
      const minFrameTime = mobile ? 1000 / 30 : 1000 / 45;

      const tick = (now) => {
        frameId = requestAnimationFrame(tick);
        if (!visible || now - last < minFrameTime) return;
        const delta = Math.min(now - last, 34);
        last = now;
        if (!reducedMotion) {
          if (pointer.active && pointer.pending && !mobile) {
            bodies.forEach((body, index) => {
              const influenceRadius = radii[index] * 2.75;
              const dx = body.position.x - pointer.x;
              const dy = body.position.y - pointer.y;
              const distance = Math.hypot(dx, dy) || 1;
              if (distance >= influenceRadius) return;
              const strength = (1 - distance / influenceRadius) ** 2;
              const kick = (2.8 + pointer.energy * 2.6) * strength;
              const nextVelocity = {
                x: body.velocity.x + (dx / distance) * kick + pointer.vx * 0.08 * strength,
                y: body.velocity.y + (dy / distance) * kick + pointer.vy * 0.08 * strength,
              };
              const speed = Math.hypot(nextVelocity.x, nextVelocity.y);
              const velocityLimit = speed > 13 ? 13 / speed : 1;
              Sleeping.set(body, false);
              Body.setVelocity(body, {
                x: nextVelocity.x * velocityLimit,
                y: nextVelocity.y * velocityLimit,
              });
            });
            pointer.pending = false;
            pointer.firstHover = false;
            pointer.energy = 0;
          }
          Engine.update(engine, delta);
        }
        bodies.forEach((body, index) => {
          const element = bubbleRefs.current[index];
          if (!element) return;
          const radius = radii[index];
          const targetScale = selectedNameRef.current === skills[index].name ? (mobile ? 1.42 : 1.55) : 1;
          const isScaling = Math.abs(targetScale - scales[index]) > 0.003;
          if (isScaling && body.isSleeping) Sleeping.set(body, false);
          if (targetScale > 1) {
            Body.setAngularVelocity(body, body.angularVelocity * 0.72);
            Body.setAngle(body, body.angle * 0.84);
          }
          const nextScale = scales[index] + (targetScale - scales[index]) * (mobile ? 0.14 : 0.18);
          if (Math.abs(nextScale - scales[index]) > 0.0005) Body.scale(body, nextScale / scales[index], nextScale / scales[index]);
          scales[index] = nextScale;
          if (body.isSleeping && !isScaling && lastTransforms[index]) return;
          const transform = `translate3d(${body.position.x - radius}px, ${body.position.y - radius}px, 0) rotate(${body.angle}rad) scale(${nextScale})`;
          if (transform !== lastTransforms[index]) {
            element.style.transform = transform;
            lastTransforms[index] = transform;
          }
        });
      };
      frameId = requestAnimationFrame(tick);

      cleanupMatter = () => {
        field.classList.remove('is-ready');
        bubbleRefs.current.forEach((element) => element?.style.removeProperty('--skill-bubble-size'));
        cancelAnimationFrame(frameId);
        field.removeEventListener('pointerenter', refreshPointerBounds);
        field.removeEventListener('pointermove', trackPointer);
        field.removeEventListener('pointerleave', clearPointer);
        Composite.clear(engine.world, false);
        Engine.clear(engine);
      };
    }

    startPhysics();
    return () => {
      disposed = true;
      observer?.disconnect();
      cleanupMatter();
    };
  }, [skills]);

  return (
    <div ref={fieldRef} className="skill-physics-field">
      {skills.map((skill, index) => (
        <SkillCard
          key={skill.name}
          ref={(node) => { bubbleRefs.current[index] = node; }}
          skill={skill}
          isActive={selectedSkill?.name === skill.name}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
