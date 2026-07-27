const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

// Projectile Class for Kokoy
class Projectile {
    constructor({ position, velocity, color = 'yellow', owner }) {
        this.position = position;
        this.velocity = velocity;
        this.width = 30;
        this.height = 10;
        this.color = color;
        this.owner = owner; // 'player' or 'enemy'
        this.active = true;
    }

    draw() {
        if (!this.active) return;
        ctx.save();
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'orange';

        // Draw Pasta Shape (Squiggle)
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        // Simple squiggle approximation
        for (let i = 0; i < 30; i += 5) {
            ctx.lineTo(this.position.x + i, this.position.y + Math.sin(this.position.x / 5) * 5);
        }

        ctx.lineWidth = 4;
        ctx.strokeStyle = '#f1c40f'; // Pasta Yellow
        ctx.stroke();
        ctx.lineWidth = 1; // Reset
        ctx.restore();
    }

    update() {
        if (!this.active) return;
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Gravity/Arc for pasta
        this.velocity.y += 0.2;

        // Out of bounds cleanup
        if (this.position.x < -100 || this.position.x > canvas.width + 100 || this.position.y > canvas.height) {
            this.active = false;
        }
    }
}

const projectiles = [];

class Sprite {
    constructor({ position, velocity, color = 'red', offset = { x: 0, y: 0 }, type = 'curly' }) {
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150; // Default height used for physics
        this.offset = offset;
        this.lastKey;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: { x: 0, y: 0 },
            width: 100,
            height: 50
        };
        this.color = color;
        this.isAttacking;
        this.health = 100;
        this.dead = false;
        this.type = type;
        this.isBlocking = false;
        this.attackFrame = 0;
        this.walkFrame = 0; // Walking Animation State

        // Stats
        this.damage = 10;
        this.attackCooldown = 0;
        this.onCooldown = false;
        this.isHit = false; // Hit Animation State
        this.speedMultiplier = 1; // Mobility Factor

        // Charge Mechanic (Allan)
        this.isCharging = false;
        this.chargeTimer = 0;

        // Custom Stats
        if (this.type === 'lolo_tatay') {
            this.damage = 25; // High Damage
            this.attackCooldown = 1500; // 1.5s Recharge
        } else if (this.type === 'muscle') {
            this.width = 60; // Bigger width
            this.height = 100; // Bigger height (was 80)
            this.damage = 3; // Low Damage for Spam
            this.attackCooldown = 50; // Ultra fast Spam
        } else if (this.type === 'allan') {
            this.damage = 40; // ONE PUNCH kill capability (almost)
            this.attackCooldown = 1000;
            this.attackBox.width = 150; // Huge Hitbox for Huge Punch
            if (this.color === 'red') this.color = '#8e44ad'; // Default Purple if not set
        } else if (this.type === 'ben_granada') {
            this.damage = 35; // High Explosive Damage
            this.attackCooldown = 800;
            // Big AOE Stats
            this.attackBox.width = 200;
            this.attackBox.height = 100; // Hit above/below too
            this.attackBox.offset.y = -25; // Center the vertical AOE
            if (this.color === 'red') this.color = '#556B2F'; // Olive Green
        } else if (this.type === 'femboy') {
            this.width = 45; // Skinny
            this.height = 90; // Short
            this.damage = 8; // Low initial damage
            this.attackCooldown = 400; // Fast
            if (this.color === 'red') this.color = '#FFB6C1'; // Light Pink

            // Burn State
            this.isBurning = false;
            this.burnFrames = 0;
        } else if (this.type === 'kokoy') {
            this.damage = 15; // Moderate projectile damage
            this.attackCooldown = 600; // Decent fire rate
        } else if (this.type === 'kokoy') {
            this.damage = 15; // Moderate projectile damage
            this.attackCooldown = 600; // Decent fire rate
            if (this.color === 'red') this.color = '#f1c40f'; // Chef Yellow
        }
    }

    applyBurn() {
        if (this.isBurning) return; // Already burning
        this.isBurning = true;
        this.burnFrames = 180; // 3 Seconds (approx 60fps)
    }

    applySlow(duration) {
        this.speedMultiplier = 0.3; // Slow down to 30%
        setTimeout(() => {
            this.speedMultiplier = 1; // Restore speed
        }, duration);
    }

    takeHit(damage) {
        this.health -= damage;
        if (this.health < 0) this.health = 0;

        this.isHit = true;
        setTimeout(() => {
            this.isHit = false;
        }, 200); // 200ms flash duration
    }

    draw() {
        ctx.save();
        if (this.isHit) {
            // Shake Effect
            ctx.translate((Math.random() * 10 - 5), (Math.random() * 10 - 5));
            // Flash Effect
            ctx.filter = 'brightness(2.5) saturate(0)';
        }

        // Burn Visual
        if (this.isBurning) {
            ctx.filter = 'sepia(1) hue-rotate(-50deg) saturate(3)'; // Orange Tint
            // Draw Flame Icon above head
            ctx.fillStyle = '#FF4500';
            ctx.beginPath();
            ctx.arc(this.width / 2, -20, 10, 0, Math.PI * 2);
            ctx.fill();
        }

        if (this.type === 'curly') {
            this.drawCurly();
        } else if (this.type === 'muscle') {
            this.drawMuscle();
        } else if (this.type === 'lolo_tatay') {
            this.drawLoloTatay();
        } else if (this.type === 'allan') {
            this.drawAllan();
        } else if (this.type === 'ben_granada') {
            this.drawBenGranada();
        } else if (this.type === 'femboy') {
            this.drawFemboy();
        } else if (this.type === 'kokoy') {
            this.drawKokoy();
        }
        ctx.restore();
    }

    drawCurly() {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);

        // Body (Lean)
        // Default height is 150. Drawing goes down to y=150.
        ctx.fillStyle = this.color;
        ctx.fillRect(10, 50, 30, 40); // Shirt

        // Shorts/Legs (Static)
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(10, 90, 30, 60);


        // Head
        ctx.fillStyle = '#ffdbac'; // Skin tone
        ctx.beginPath();
        ctx.arc(25, 25, 20, 0, Math.PI * 2);
        ctx.fill();

        // Blue Headband (Gerald's signature)
        ctx.fillStyle = '#3498db';
        ctx.fillRect(5, 10, 40, 8);

        // Curly Hair (Above headband)
        ctx.fillStyle = '#654321'; // Brown
        for (let i = 0; i < 8; i++) {
            let angle = (i / 8) * Math.PI;
            let hx = 25 + Math.cos(angle - Math.PI) * 20;
            let hy = 25 + Math.sin(angle - Math.PI) * 20; // Puffier
            ctx.beginPath();
            ctx.arc(hx, hy + 2, 8, 0, Math.PI * 2);
            ctx.fill();
        }

        // Eyes
        ctx.fillStyle = 'white';
        ctx.fillRect(15, 25, 8, 8);
        ctx.fillRect(27, 25, 8, 8);
        ctx.fillStyle = 'black';
        ctx.fillRect(19 + (this.lastKey === 'a' ? -2 : 2), 27, 4, 4);
        ctx.fillRect(31 + (this.lastKey === 'a' ? -2 : 2), 27, 4, 4);

        // Arms (Boxing Gloves)
        ctx.fillStyle = '#f1c40f'; // Golden Gloves

        if (this.isBlocking) {
            // Block Stance (Directional Asymmetry)
            // Left block needs more offset (-25) to clear body compared to Right (+10)
            let dir = (this.lastKey === 'a') ? -25 : 10;
            ctx.fillRect(20 + dir, 45, 20, 25); // Left Hand High
            ctx.fillRect(45 + dir, 45, 20, 25); // Right Hand High
        } else if (this.isAttacking) {
            // Animated Punch! EXTEND!
            let extension = Math.sin(this.attackFrame * Math.PI) * 50; // Extend

            if (this.lastKey === 'a') {
                // Facing Left
                ctx.fillRect(-70 - extension, 60, 50, 30);
            } else {
                // Facing Right
                ctx.fillRect(70 + extension, 60, 50, 30);
            }
        } else {
            ctx.fillRect(this.lastKey === 'a' ? 0 : 30, 60, 20, 20); // Guard
            ctx.fillRect(this.lastKey === 'a' ? 20 : 0, 70, 20, 20);
        }

        ctx.restore();
    }

    drawMuscle() {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.scale(1.2, 1.25); // Scale visuals (50x80 -> 60x100)

        const skinColor = '#eebb99';
        const outlineColor = 'black';
        ctx.lineWidth = 2;

        // -- Redesign: Short & Grounded --
        // Height is 80. Drawing must END at y=80 to touch ground.
        // Current scale: Head ~20px, Body ~30px, Legs ~30px.

        ctx.fillStyle = skinColor;

        // Feet center y=75, radius 5 -> bottom edge 80. Perfect.
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.ellipse(15, 75, 10, 5, 0, 0, Math.PI * 2); // Left Leg (Circle)
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(35, 75, 10, 5, 0, 0, Math.PI * 2); // Right Leg (Circle)
        ctx.fill();
        ctx.stroke();

        // Shorts (Red Trunks)
        ctx.fillStyle = '#c0392b';
        ctx.beginPath();
        ctx.moveTo(10, 55);
        ctx.quadraticCurveTo(25, 65, 40, 55); // Bottom curve
        ctx.lineTo(40, 65);
        ctx.lineTo(10, 65);
        ctx.fill();
        ctx.strokeRect(10, 55, 30, 10); // Waistband

        // Torso (Compact V)
        ctx.fillStyle = skinColor;

        // Belly
        ctx.beginPath();
        ctx.ellipse(25, 50, 12, 12, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Pecs
        ctx.beginPath();
        ctx.arc(18, 35, 12, 0, Math.PI * 2); // Left Pec
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(32, 35, 12, 0, Math.PI * 2); // Right Pec
        ctx.fill();
        ctx.stroke();

        // Head (Lowered)
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.arc(25, 15, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Sunglasses 
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.ellipse(21, 12, 5, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(29, 12, 5, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Arms
        if (this.isBlocking) {
            // Shield (Directional)
            let dir = (this.lastKey === 'a' || this.lastKey === 'ArrowLeft') ? -10 : 10;
            ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
            ctx.beginPath();
            ctx.arc(25 + dir, 40, 30, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = 'red';
            ctx.stroke();
        } else if (this.isAttacking) {
            // Punch
            let extension = Math.sin(this.attackFrame * Math.PI) * 40;
            // Determine direction based on last key (supports P1 'a' or P2 'ArrowLeft')
            let dir = (this.lastKey === 'ArrowLeft' || this.lastKey === 'a') ? -1 : 1;

            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(25 + (dir * (15 + extension)), 40, 10, 0, Math.PI * 2); // Fist
            ctx.fill();
            ctx.stroke();

            // Connector
            ctx.fillStyle = skinColor;
            ctx.beginPath();
            ctx.moveTo(25, 35);
            ctx.lineTo(25 + (dir * (15 + extension)), 40);
            ctx.lineWidth = 8;
            ctx.stroke();
            ctx.lineWidth = 2;

        } else {
            // Idle
            ctx.fillStyle = skinColor;
            ctx.beginPath();
            ctx.arc(5, 35, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(45, 35, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }

        ctx.restore();
    }

    drawLoloTatay() {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);

        if (this.onCooldown) {
            ctx.globalAlpha = 0.5;
        }

        const skinColor = '#5c3a21'; // Dark skin
        const outlineColor = '#2e1d10';
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';

        // Body (Athletic)
        ctx.fillStyle = skinColor;
        ctx.strokeStyle = outlineColor;
        ctx.fillRect(10, 50, 30, 40);
        ctx.strokeRect(10, 50, 30, 40);

        // Shorts (Green) (Static)
        ctx.fillStyle = '#2ecc71';
        ctx.fillRect(10, 90, 30, 60);
        ctx.strokeStyle = '#27ae60';
        ctx.strokeRect(10, 90, 30, 60);

        // Head
        ctx.fillStyle = skinColor;
        ctx.strokeStyle = outlineColor;
        ctx.beginPath();
        ctx.arc(25, 25, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Hair (Black)
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(25, 20, 22, Math.PI, 0);
        ctx.fill();

        // Eyes
        ctx.fillStyle = 'white';
        ctx.fillRect(15, 25, 8, 8);
        ctx.fillRect(27, 25, 8, 8);
        ctx.fillStyle = 'black';
        ctx.fillRect(19 + (this.lastKey === 'a' ? -2 : 2), 27, 4, 4);
        ctx.fillRect(31 + (this.lastKey === 'a' ? -2 : 2), 27, 4, 4);

        // Arms
        ctx.fillStyle = skinColor;
        ctx.strokeStyle = outlineColor;

        if (this.isBlocking) {
            let dir = (this.lastKey === 'a' || this.lastKey === 'ArrowLeft') ? -25 : 10;
            ctx.fillRect(20 + dir, 45, 20, 25);
            ctx.fillRect(45 + dir, 45, 20, 25);
            ctx.strokeRect(20 + dir, 45, 20, 25);
            ctx.strokeRect(45 + dir, 45, 20, 25);
        } else if (this.isAttacking) {
            let extension = Math.sin(this.attackFrame * Math.PI) * 50;
            if (this.lastKey === 'a' || this.lastKey === 'ArrowLeft') {
                ctx.fillRect(-40 - extension, 60, 50, 30);
                ctx.strokeRect(-40 - extension, 60, 50, 30);
            } else {
                ctx.fillRect(70 + extension, 60, 50, 30);
                ctx.strokeRect(70 + extension, 60, 50, 30);
            }
        } else {
            // Idle
            ctx.fillRect(this.lastKey === 'a' ? 0 : 30, 60, 20, 20);
            ctx.strokeRect(this.lastKey === 'a' ? 0 : 30, 60, 20, 20);

            ctx.fillRect(this.lastKey === 'a' ? 20 : 0, 70, 20, 20);
            ctx.strokeRect(this.lastKey === 'a' ? 20 : 0, 70, 20, 20);
        }
        ctx.restore();
    }

    drawAllan() {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);

        if (this.isCharging) {
            // Charging Shake
            ctx.translate((Math.random() * 4 - 2), (Math.random() * 4 - 2));
            // Charging Flash (Orange/Yellow)
            if (Math.floor(Date.now() / 100) % 2 === 0) {
                ctx.filter = 'brightness(1.5) sepia(1) hue-rotate(-50deg)';
            }
        }

        // Body
        ctx.fillStyle = this.color; // Purple
        ctx.fillRect(10, 50, 30, 40);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(10, 50, 30, 40);

        // Shorts (Black) (Static)
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(10, 90, 30, 60);
        ctx.strokeRect(10, 90, 30, 60);

        // Long Hair (Back)
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(10, 25);
        ctx.quadraticCurveTo(5, 50, 0, 70); // Long tail left
        ctx.lineTo(50, 70);
        ctx.quadraticCurveTo(45, 50, 40, 25); // Long tail right
        ctx.fill();

        // Head
        ctx.fillStyle = '#ffdbac';
        ctx.beginPath();
        ctx.arc(25, 25, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Long Hair (Bangs/Front)
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(5, 20);
        ctx.lineTo(25, 5); // Parting
        ctx.lineTo(45, 20);
        ctx.lineTo(45, 5); // Top right
        ctx.quadraticCurveTo(25, -5, 5, 5); // Top curve
        ctx.fill();

        // Eyes (Focused)
        ctx.fillStyle = 'black';
        ctx.fillRect(20 + (this.lastKey === 'a' ? -2 : 2), 25, 4, 4);
        ctx.fillRect(28 + (this.lastKey === 'a' ? -2 : 2), 25, 4, 4);

        // Arms
        ctx.fillStyle = this.color;
        if (this.isBlocking) {
            let dir = (this.lastKey === 'a' || this.lastKey === 'ArrowLeft') ? -25 : 10;
            ctx.fillRect(20 + dir, 45, 20, 25);
            ctx.fillRect(45 + dir, 45, 20, 25);
        } else if (this.isAttacking) {
            let extension = Math.sin(this.attackFrame * Math.PI) * 70; // LONG range for big punch
            if (this.lastKey === 'a') {
                ctx.fillRect(-60 - extension, 60, 70, 30); // Big Fist
            } else {
                ctx.fillRect(70 + extension, 60, 70, 30);
            }
        } else {
            ctx.fillRect(this.lastKey === 'a' ? 0 : 30, 60, 20, 20);
            ctx.fillRect(this.lastKey === 'a' ? 20 : 0, 70, 20, 20);
        }

        ctx.restore();
    }

    drawBenGranada() {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);

        // Body (Camo Green)
        ctx.fillStyle = this.color;
        ctx.fillRect(10, 50, 30, 40);
        ctx.strokeStyle = '#2F4F4F';
        ctx.strokeRect(10, 50, 30, 40);

        // Camo Pattern
        ctx.fillStyle = '#6B8E23';
        ctx.beginPath();
        ctx.arc(15, 60, 5, 0, Math.PI * 2);
        ctx.arc(35, 80, 4, 0, Math.PI * 2);
        ctx.fill();

        // Pants (Dark Grey) (Static)
        ctx.fillStyle = '#2F4F4F';
        ctx.fillRect(10, 90, 30, 60);

        // Head
        ctx.fillStyle = '#ffdbac';
        ctx.beginPath();
        ctx.arc(25, 25, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Helmet (Green Dome)
        ctx.fillStyle = '#556B2F';
        ctx.beginPath();
        ctx.arc(25, 20, 22, Math.PI, 0, true); // Top half
        ctx.fill();
        ctx.stroke();

        // Eyes (Intense)
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(15, 25);
        ctx.lineTo(22, 28); // Angry slant
        ctx.lineTo(22, 22);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(35, 25);
        ctx.lineTo(28, 28); // Angry slant
        ctx.lineTo(28, 22);
        ctx.fill();

        // Arms
        ctx.fillStyle = this.color;
        if (this.isBlocking) {
            ctx.fillRect(20, 45, 20, 25);
            ctx.fillRect(45, 45, 20, 25);
        } else if (this.isAttacking) {
            // EXPLOSION PUNCH

            // Global Screen Tint (Red Flash)
            ctx.fillStyle = (Math.random() > 0.5) ? 'rgba(255, 0, 0, 0.4)' : 'rgba(200, 0, 0, 0.4)';
            ctx.fillRect(-1000, -1000, 3000, 3000);

            let extension = Math.sin(this.attackFrame * Math.PI) * 50;
            let dir = (this.lastKey === 'a' || this.lastKey === 'ArrowLeft') ? -1 : 1;

            // Floor Shockwave Effect
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 4;
            ctx.beginPath();
            // Ellipse at feet (x=25, y=150). Radius expands with punch.
            let waveSize = 20 + extension * 2;
            ctx.ellipse(25, 150, waveSize, waveSize / 3, 0, 0, Math.PI * 2);
            ctx.stroke();

            // Secondary Floor Ring
            ctx.strokeStyle = '#8B0000'; // Dark Red
            ctx.beginPath();
            ctx.ellipse(25, 150, waveSize * 0.7, (waveSize * 0.7) / 3, 0, 0, Math.PI * 2);
            ctx.stroke();

            // Reset Line Width
            ctx.lineWidth = 1;

            // Flash Colors
            const colors = ['#FF4500', '#FF8C00', '#FFD700', '#FFFFFF']; // Red, Orange, Gold, White
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];

            ctx.beginPath();
            let boomX = 25 + (dir * (40 + extension));
            let boomY = 60;

            // Jagged Explosion Shape (Starburst)
            const spikes = 12;
            const outerRadius = 60 + Math.random() * 30; // 60-90
            const innerRadius = 20 + Math.random() * 15; // 20-35

            for (let i = 0; i < spikes * 2; i++) {
                const r = (i % 2 === 0) ? outerRadius : innerRadius;
                const angle = (Math.PI * i) / spikes;
                const x = boomX + Math.cos(angle) * r;
                const y = boomY + Math.sin(angle) * r;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();

            // Core
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(boomX, boomY, 15, 0, Math.PI * 2);
            ctx.fill();

            // Debris / Sparks
            for (let i = 0; i < 10; i++) {
                let dx = (Math.random() * 120) - 60; // Spread +/- 60
                let dy = (Math.random() * 120) - 60;
                let size = Math.random() * 4 + 2; // 2-6px

                // Random Spark (Red/Orange) or Debris (Grey)
                ctx.fillStyle = (Math.random() > 0.3) ? colors[Math.floor(Math.random() * 3)] : '#555';

                ctx.fillRect(boomX + dx, boomY + dy, size, size);
            }

        } else {
            ctx.fillRect(this.lastKey === 'a' ? 0 : 30, 60, 20, 20);
            ctx.fillRect(this.lastKey === 'a' ? 20 : 0, 70, 20, 20);
        }

        ctx.restore();
    }

    drawFemboy() {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);

        // Stats: Width 45, Height 90 (vs Standard 50, 150)
        // CenterX = 45 / 2 = 22.5
        const centerX = 22.5;

        // Draw Legs (Short - starting from y=60 to 90) (Static)
        ctx.fillStyle = '#2c3e50'; // Dark pants/leggings
        ctx.fillRect(centerX - 10, 60, 8, 30);
        ctx.fillRect(centerX + 2, 60, 8, 30);

        // Draw Body (Pink Shirt)
        // From y=30 to 60
        ctx.fillStyle = this.color;
        ctx.fillRect(centerX - 12, 30, 24, 30);

        // Draw Head (y=15, radius 15) -> Top at 0, Bottom at 30
        const headRadius = 14;
        const headY = 16;

        // --- BACK HAIR (Behind Head) ---
        ctx.fillStyle = 'black';
        ctx.beginPath();
        // Top cap (Behind)
        ctx.arc(centerX, headY - 4, 16, Math.PI, 0);
        // Sides (Bob) - Draws the main shape behind the head
        ctx.rect(centerX - 17, headY - 4, 34, 18);
        ctx.fill();

        // --- Head & Face ---
        ctx.fillStyle = '#ffdbac'; // Skin
        ctx.beginPath();
        // Draw head ON TOP of the back hair
        ctx.arc(centerX, headY, headRadius, 0, Math.PI * 2);
        ctx.fill();

        // Blush
        ctx.fillStyle = 'rgba(255, 105, 180, 0.5)';
        ctx.beginPath();
        ctx.ellipse(centerX - 7, headY + 4, 3, 2, 0, 0, Math.PI * 2);
        ctx.ellipse(centerX + 7, headY + 4, 3, 2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Eyes (Expressive)
        let eyeOffset = (this.lastKey === 'a') ? -1 : 1;

        // Whites
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.ellipse(centerX - 6 + eyeOffset, headY - 1, 4, 5, 0, 0, Math.PI * 2);
        ctx.ellipse(centerX + 6 + eyeOffset, headY - 1, 4, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Blue Pupils
        ctx.fillStyle = '#3498db';
        ctx.beginPath();
        ctx.arc(centerX - 6 + eyeOffset, headY - 1, 2.5, 0, Math.PI * 2);
        ctx.arc(centerX + 6 + eyeOffset, headY - 1, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Eyelashes
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Left
        ctx.moveTo(centerX - 9 + eyeOffset, headY - 4);
        ctx.lineTo(centerX - 11 + eyeOffset, headY - 6);
        // Right
        ctx.moveTo(centerX + 9 + eyeOffset, headY - 4);
        ctx.lineTo(centerX + 11 + eyeOffset, headY - 6);
        ctx.stroke();

        // Smile
        ctx.strokeStyle = '#c0392b';
        ctx.beginPath();
        ctx.arc(centerX + eyeOffset, headY + 5, 3, 0, Math.PI, false);
        ctx.stroke();

        // --- FRONT HAIR (Bangs) ---
        ctx.fillStyle = 'black';
        // Bangs (Forehead)
        ctx.fillRect(centerX - 12, headY - 12, 24, 6);

        // Inward curl at bottom (Visible at bottom of bob)
        ctx.beginPath();
        ctx.moveTo(centerX - 17, headY + 14);
        ctx.quadraticCurveTo(centerX - 24, headY + 18, centerX - 12, headY + 14); // Left flip
        ctx.moveTo(centerX + 17, headY + 14);
        ctx.quadraticCurveTo(centerX + 24, headY + 18, centerX + 12, headY + 14); // Right flip
        ctx.fill();

        // Choker (Redraw to be safe)
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(centerX - 5, 29, 10, 2);

        // --- Arms ---
        ctx.fillStyle = this.color;
        // Arm Sleeves
        ctx.fillRect(centerX - 18, 35, 6, 12);
        ctx.fillRect(centerX + 12, 35, 6, 12);
        // Skin
        ctx.fillStyle = '#ffdbac';

        if (this.isBlocking) {
            ctx.fillRect(centerX - 14, headY + 10, 8, 20);
            ctx.fillRect(centerX + 6, headY + 10, 8, 20);
        } else if (this.isAttacking) {
            let extension = Math.sin(this.attackFrame * Math.PI) * 30;
            if (this.lastKey === 'a') {
                ctx.fillRect(centerX - 20 - extension, 35, 20 + extension, 8);
            } else {
                ctx.fillRect(centerX, 35, 20 + extension, 8);
            }
        } else {
            ctx.fillRect(centerX - 18, 45, 6, 12);
            ctx.fillRect(centerX + 12, 45, 6, 12);
        }

        ctx.restore();
    }

    drawKokoy() {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);

        // Body (White Chef Coat)
        ctx.fillStyle = 'white';
        ctx.fillRect(10, 50, 30, 40);
        ctx.strokeStyle = '#bdc3c7';
        ctx.strokeRect(10, 50, 30, 40);

        // Buttons
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(20, 60, 2, 0, Math.PI * 2);
        ctx.arc(20, 70, 2, 0, Math.PI * 2);
        ctx.arc(20, 80, 2, 0, Math.PI * 2);
        ctx.fill();

        // Pants (Checkered/Grey)
        ctx.fillStyle = '#7f8c8d';
        ctx.fillRect(10, 90, 30, 60);

        // Head
        ctx.fillStyle = '#ffdbac';
        ctx.beginPath();
        ctx.arc(25, 25, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Chef Hat (Toque)
        ctx.fillStyle = 'white';
        ctx.strokeStyle = '#bdc3c7';
        ctx.beginPath();
        ctx.rect(15, 5, 20, 15); // Base
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(15, 5, 10, 0, Math.PI * 2); // Puff Left
        ctx.arc(25, 0, 12, 0, Math.PI * 2); // Puff Center
        ctx.arc(35, 5, 10, 0, Math.PI * 2); // Puff Right
        ctx.fill();
        ctx.stroke();

        // Face
        ctx.fillStyle = 'black';
        ctx.fillRect(20 + (this.lastKey === 'a' ? -2 : 2), 25, 4, 4); // Eyes
        ctx.fillRect(28 + (this.lastKey === 'a' ? -2 : 2), 25, 4, 4);

        // Moustache
        ctx.beginPath();
        ctx.moveTo(25, 35);
        ctx.quadraticCurveTo(20, 38, 18, 35);
        ctx.quadraticCurveTo(30, 38, 32, 35);
        ctx.stroke();

        // Arms
        ctx.fillStyle = 'white';
        if (this.isAttacking) {
            // Throwing pose
            let dir = (this.lastKey === 'a' || this.lastKey === 'ArrowLeft') ? -1 : 1;
            ctx.fillRect(25 + (dir * 20), 45, 20, 10);
        } else {
            // Idle
            ctx.fillRect(10, 50, 10, 30);
            ctx.fillRect(30, 50, 10, 30);
        }

        ctx.restore();
    }

    update() {
        // Charging Logic
        if (this.isCharging) {
            this.chargeTimer += 16.66; // Approx 60fps
            if (this.chargeTimer >= 1500) { // 1.5 Seconds for better feel
                this.isCharging = false;
                this.chargeTimer = 0;
                this.attack(true); // Force attack
            }
        }

        // Walk Animation Logic
        if (this.velocity.x !== 0) {
            this.walkFrame += 0.2; // Animate legs
        } else {
            this.walkFrame = 0; // Reset when standing
        }

        // Burn Damage Logic
        if (this.isBurning) {
            this.burnFrames--;
            if (this.burnFrames % 30 === 0) { // Every 0.5s (approx)
                this.takeHit(3); // DoT Tick (Increased from 1)
                // UI Update for DoT
                if (this === player) document.querySelector('#playerHealth').style.width = this.health + '%';
                else document.querySelector('#enemyHealth').style.width = this.health + '%';
            }
            if (this.burnFrames <= 0) this.isBurning = false;
        }

        this.draw();

        if (this.isAttacking) {
            this.attackFrame += 0.2;
            if (this.attackFrame > 1) this.attackFrame = 1;
        } else {
            this.attackFrame = 0;
        }

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + 10;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0;
            this.position.y = canvas.height - 96 - this.height;
        } else {
            this.velocity.y += gravity;
        }

        if (this.position.x < 0) this.position.x = 0;
        if (this.position.x + this.width > canvas.width) this.position.x = canvas.width - this.width;
    }

    pressAttack() {
        if (this.type === 'allan') {
            if (this.isBlocking || this.isAttacking || this.onCooldown || this.dead) return;
            this.isCharging = true; // Start Charge
        } else {
            this.attack(); // Normal instant attack
        }
    }

    releaseAttack() {
        if (this.type === 'allan') {
            this.isCharging = false; // Cancel Charge if released early
            this.chargeTimer = 0;
        }
    }

    attack(forced = false) {
        if (this.isBlocking || this.dead) return;
        if (!forced) {
            if (this.isAttacking || this.onCooldown) return;
        }

        // Kokoy Special Attack (Projectile)
        if (this.type === 'kokoy') {
            this.isAttacking = true;
            this.onCooldown = true;

            // Projectile Direction
            let dir = (this.lastKey === 'a' || this.lastKey === 'ArrowLeft') ? -1 : 1;
            // Velocity
            let velX = dir * 15;
            let velY = -2; // Slight arc up

            projectiles.push(new Projectile({
                position: { x: this.position.x + 25, y: this.position.y + 40 },
                velocity: { x: velX, y: velY },
                owner: (this === player) ? 'player' : 'enemy'
            }));

            setTimeout(() => {
                this.isAttacking = false;
            }, 100);

            setTimeout(() => {
                this.onCooldown = false;
            }, this.attackCooldown);

            return; // Skip melee logic
        }

        this.isAttacking = true;
        this.onCooldown = true;

        // Ben Granada Self-Harm Logic
        if (this.type === 'ben_granada') {
            let recoil = Math.floor(this.damage / 2); // 50% Recoil
            this.takeHit(recoil);
            // Immediate UI Update
            if (this === player) {
                document.querySelector('#playerHealth').style.width = this.health + '%';
            } else if (this === enemy) {
                document.querySelector('#enemyHealth').style.width = this.health + '%';
            }
        }

        setTimeout(() => {
            this.isAttacking = false;
        }, 100);

        setTimeout(() => {
            this.onCooldown = false;
        }, this.attackCooldown > 0 ? this.attackCooldown : 400);
    }
}

// --- Game Logic Variables ---
let p1Type = 'curly';
let p2Type = 'muscle';

// --- Specific Characters ---
let player;
let enemy;

function createCharacters() {
    player = new Sprite({
        position: { x: 200, y: 0 },
        velocity: { x: 0, y: 0 },
        offset: { x: 0, y: 0 },
        color: '#3498db',
        type: p1Type
    });

    enemy = new Sprite({
        position: { x: 800, y: 0 },
        velocity: { x: 0, y: 0 },
        offset: { x: -50, y: 0 }, // Adjust offset based on type if needed
        color: '#e74c3c',
        type: p2Type
    });
}

createCharacters(); // Initial create

let gameStarted = false;

function initGame() {
    createCharacters(); // Re-create with current selection

    player.health = 100;
    enemy.health = 100;
    player.position = { x: 200, y: 0 };
    enemy.position = { x: 800, y: 0 };
    player.dead = false;
    enemy.dead = false;
    player.isBlocking = false;
    enemy.isBlocking = false;
    timer = 60;
    document.querySelector('#playerHealth').style.width = '100%';
    document.querySelector('#enemyHealth').style.width = '100%';
    document.querySelector('#timer').innerHTML = timer;

    // Clear projectiles
    projectiles.length = 0;

    // Update Names in HUD
    // Simple mapping
    const names = {
        'curly': 'Gerald',
        'muscle': 'Owen',
        'lolo_tatay': 'Lolo Tatay',
        'allan': 'Allan',
        'ben_granada': 'Ben Granada',
        'femboy': 'Femboy',
        'kokoy': 'Kokoy'
    };
    document.querySelector('.player-hud .name-tag').innerText = names[p1Type] + ' (P1)';
    document.querySelector('.enemy-hud .name-tag').innerText = names[p2Type] + ' (P2)';
}

// Menu handling
// Open Selection Screen
document.getElementById('changeCharBtn').addEventListener('click', () => {
    document.querySelector('#mainMenu').style.display = 'none';
    document.querySelector('#characterSelection').style.display = 'flex';
});

// Start from Main Menu (Default)
document.getElementById('startBtn').addEventListener('click', () => {
    document.querySelector('#mainMenu').style.display = 'none';
    initGame();
    gameStarted = true;
    decreaseTimer();
});

// Start from Selection Screen
document.getElementById('confirmBtn').addEventListener('click', () => {
    document.querySelector('#characterSelection').style.display = 'none';
    initGame();
    gameStarted = true;
    decreaseTimer();
});

// Global Selection Function (called from HTML)
window.selectChar = (playerNum, type) => {
    if (playerNum === 1) {
        p1Type = type;
        document.getElementById('p1Preview').innerText = type.replace('_', ' ').toUpperCase();
        document.getElementById('p1Preview').style.background = getTypeColor(type);
    } else {
        p2Type = type;
        document.getElementById('p2Preview').innerText = type.replace('_', ' ').toUpperCase();
        document.getElementById('p2Preview').style.background = getTypeColor(type);
    }
};

function getTypeColor(type) {
    if (type === 'curly') return '#3498db';
    if (type === 'muscle') return '#e74c3c';
    if (type === 'lolo_tatay') return '#2ecc71';
    if (type === 'allan') return '#8e44ad';
    if (type === 'ben_granada') return '#556B2F';
    if (type === 'kokoy') return '#f1c40f';
    return '#333';
}

const keys = {
    // Player 1
    a: { pressed: false },
    d: { pressed: false },
    w: { pressed: false },
    e: { pressed: false }, // Shield

    // Player 2
    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false },
    ArrowUp: { pressed: false },
    Six: { pressed: false } // Shield (using '6')
};

// Touch Controls
function setupTouch(btnId, key) {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    // For Punch, we need press/release logic for Allan
    if (key === ' ' || key === '5') {
        const target = key === ' ' ? player : enemy;
        btn.addEventListener('touchstart', (e) => { e.preventDefault(); target.pressAttack(); btn.classList.add('active'); });
        btn.addEventListener('touchend', (e) => { e.preventDefault(); target.releaseAttack(); btn.classList.remove('active'); });
        btn.addEventListener('mousedown', (e) => { target.pressAttack(); btn.classList.add('active'); });
        btn.addEventListener('mouseup', (e) => { target.releaseAttack(); btn.classList.remove('active'); });
        return;
    }

    btn.addEventListener('touchstart', (e) => { e.preventDefault(); handleDown(key); btn.classList.add('active'); });
    btn.addEventListener('touchend', (e) => { e.preventDefault(); handleUp(key); btn.classList.remove('active'); });
    btn.addEventListener('mousedown', (e) => { handleDown(key); btn.classList.add('active'); });
    btn.addEventListener('mouseup', (e) => { handleUp(key); btn.classList.remove('active'); });
}

// Map UI buttons to P1 keys
setupTouch('btnLeft', 'a');
setupTouch('btnRight', 'd');
setupTouch('btnJump', 'w');
setupTouch('btnBlock', 'e');
setupTouch('btnPunch', ' ');

function handleDown(key) {
    if (!gameStarted) return;

    // P1
    if (key === ' ') player.pressAttack(); // Changed to pressAttack
    if (key === 'a') { keys.a.pressed = true; player.lastKey = 'a'; }
    if (key === 'd') { keys.d.pressed = true; player.lastKey = 'd'; }
    if (key === 'w') {
        if (player.position.y + player.height >= canvas.height - 96) player.velocity.y = -20;
    }
    if (key === 'e') keys.e.pressed = true;
}

function handleUp(key) {
    if (key === 'a') keys.a.pressed = false;
    if (key === 'd') keys.d.pressed = false;
    if (key === 'e') keys.e.pressed = false;
}

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    );
}

function determineWinner({ player, enemy, timerId }) {
    clearTimeout(timerId);
    document.querySelector('#displayText').style.display = 'flex';
    const names = {
        'curly': 'Gerald',
        'muscle': 'Owen',
        'lolo_tatay': 'Lolo Tatay',
        'allan': 'Allan',
        'ben_granada': 'Ben Granada',
        'femboy': 'Femboy',
        'kokoy': 'Kokoy'
    };

    if (player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Tie';
    } else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = names[p1Type] + ' Wins!';
    } else {
        document.querySelector('#displayText').innerHTML = names[p2Type] + ' Wins!';
    }

    // Restart / Menu Logic
    setTimeout(() => {
        gameStarted = false;
        document.querySelector('#mainMenu').style.display = 'flex';
        document.querySelector('#displayText').style.display = 'none';
        initGame(); // Reset positions
    }, 3000);
}

let timer = 60;
let timerId;
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000);
        timer--;
        document.querySelector('#timer').innerHTML = timer;
    }

    if (timer === 0) {
        determineWinner({ player, enemy, timerId });
    }
}

function animate() {
    window.requestAnimationFrame(animate);

    // Reset Transform & Apply Screen Shake (Global)
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    const isBenAttacking = (player.type === 'ben_granada' && player.isAttacking) ||
        (enemy.type === 'ben_granada' && enemy.isAttacking);

    if (isBenAttacking) {
        const shakeIntensity = 10;
        const dx = (Math.random() - 0.5) * shakeIntensity;
        const dy = (Math.random() - 0.5) * shakeIntensity;
        ctx.translate(dx, dy);
    }

    // --- Dynamic Background (Arena Style) ---
    // Gradient Background (Dark Blue to Black)
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0f0c29');
    gradient.addColorStop(0.5, '#302b63');
    gradient.addColorStop(1, '#24243e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Spotlights (Atmosphere)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width * 0.3, canvas.height);
    ctx.lineTo(canvas.width * 0.1, canvas.height);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(canvas.width, 0);
    ctx.lineTo(canvas.width * 0.7, canvas.height);
    ctx.lineTo(canvas.width * 0.9, canvas.height);
    ctx.fill();

    // Center Spotlight (Ring Focus)
    const radialGrad = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 80, canvas.width / 2, canvas.height / 2, 400);
    radialGrad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
    radialGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radialGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Crowd (Silhouettes)
    ctx.fillStyle = '#1a1a2e';
    for (let i = 0; i < 150; i += 8) {
        // Use Math.sin for static, organic variance instead of Math.random() (which blinks)
        let h = Math.abs(Math.sin(i * 132)) * 30 + 20;
        ctx.fillRect(i * 10, canvas.height - 130 - h, 8, h);
    }

    // --- Redesigned Ring Floor ---
    // Floor Canvas (Gradient Blue/Grey - Professional look)
    // Matches the 'Arena' feel better than plain red
    const floorGradient = ctx.createLinearGradient(0, canvas.height - 96, 0, canvas.height);
    floorGradient.addColorStop(0, '#4a69bd'); // Lighter blue top
    floorGradient.addColorStop(1, '#1e3799'); // Darker blue bottom
    ctx.fillStyle = floorGradient;
    ctx.fillRect(0, canvas.height - 96, canvas.width, 96);

    // Canvas Texture (Subtle grid)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let i = 0; i < canvas.width; i += 40) {
        ctx.fillRect(i, canvas.height - 96, 2, 96); // Vertical lines
    }

    // Ropes (Gradient for 3D effect)
    const ropeGradient = ctx.createLinearGradient(0, canvas.height - 96, 0, canvas.height - 90);
    ropeGradient.addColorStop(0, '#e74c3c');
    ropeGradient.addColorStop(0.5, '#c0392b');
    ropeGradient.addColorStop(1, '#922b21');

    ctx.fillStyle = ropeGradient;
    ctx.fillRect(0, canvas.height - 96, canvas.width, 6); // Bottom rope
    ctx.fillRect(0, canvas.height - 56, canvas.width, 6); // Middle rope
    ctx.fillRect(0, canvas.height - 16, canvas.width, 6); // Top rope (Added 3rd rope for realism)

    // Corner Posts (Visual anchors)
    ctx.fillStyle = '#ecf0f1';
    ctx.fillRect(0, canvas.height - 150, 20, 150); // Left Post
    ctx.fillRect(canvas.width - 20, canvas.height - 150, 20, 150); // Right Post

    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    if (gameStarted) {
        // --- Player 1 Controls (Gerald) ---
        // --- Player 1 Controls (Gerald) ---
        if (keys.e.pressed) {
            player.isBlocking = true;
            player.velocity.x = 0;
            // Auto-Face Enemy when Blocking
            if (player.position.x > enemy.position.x) {
                player.lastKey = 'a'; // Face Left
            } else {
                player.lastKey = 'd'; // Face Right
            }
        } else {
            player.isBlocking = false;
            // Move
            if (keys.a.pressed && player.lastKey === 'a') {
                player.velocity.x = -5 * player.speedMultiplier;
            } else if (keys.d.pressed && player.lastKey === 'd') {
                player.velocity.x = 5 * player.speedMultiplier;
            }

            // Sync Hitbox Direction ALWAYS
            if (player.lastKey === 'a') {
                player.attackBox.offset.x = -50;
            } else {
                player.attackBox.offset.x = 0;
            }
        }

        // --- Player 2 Controls (Owen) ---
        if (keys.Six.pressed) {
            enemy.isBlocking = true;
            enemy.velocity.x = 0;
            // Auto-Face Player when Blocking
            if (enemy.position.x > player.position.x) {
                enemy.lastKey = 'ArrowLeft'; // Face Left
            } else {
                enemy.lastKey = 'ArrowRight'; // Face Right
            }
        } else {
            enemy.isBlocking = false;
            // Move
            if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
                enemy.velocity.x = -5 * enemy.speedMultiplier;
            } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
                enemy.velocity.x = 5 * enemy.speedMultiplier;
            }

            // Sync Hitbox Direction ALWAYS (Owen)
            if (enemy.lastKey === 'ArrowLeft') {
                enemy.attackBox.offset.x = -50;
            } else {
                enemy.attackBox.offset.x = 0;
            }
        }
    }

    // Collision Detection
    // Player Hit Enemy
    if (
        rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
        player.isAttacking && gameStarted && player.attackFrame >= 0
    ) {
        player.isAttacking = false;

        let damage = player.damage;

        // Directional Block Logic
        // Player is attacker. Enemy is victim.
        // If Player X < Enemy X, Player is on LEFT. Enemy must face LEFT to block.
        // If Player X > Enemy X, Player is on RIGHT. Enemy must face RIGHT to block.
        let isFacingAttacker = false;
        if (player.position.x < enemy.position.x) {
            // Player on Left. Enemy should face Left ('ArrowLeft' or default left if P2 starts facing left?)
            // P2 controls often use 'ArrowLeft'
            if (enemy.lastKey === 'ArrowLeft') isFacingAttacker = true;
        } else {
            // Player on Right. Enemy should face Right
            if (enemy.lastKey === 'ArrowRight') isFacingAttacker = true;
        }

        if (enemy.isBlocking && isFacingAttacker) {
            damage = 2; // Chip damage (Successful Block)
        }
        enemy.takeHit(damage);

        // Lolo Tatay Slow Effect (Self-Debuff on Hit)
        if (player.type === 'lolo_tatay') {
            player.applySlow(2000);
        } else if (player.type === 'femboy') {
            enemy.applyBurn();
        }

        document.querySelector('#enemyHealth').style.width = enemy.health + '%';
    }

    // Enemy Hit Player
    if (
        rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
        enemy.isAttacking && gameStarted
    ) {
        enemy.isAttacking = false;

        let damage = enemy.damage;

        // Directional Block Logic
        // Enemy is attacker. Player is victim.
        let isFacingAttacker = false;
        if (enemy.position.x < player.position.x) {
            // Enemy on Left. Player should face Left ('a')
            if (player.lastKey === 'a') isFacingAttacker = true;
        } else {
            // Enemy on Right. Player should face Right ('d')
            if (player.lastKey === 'd') isFacingAttacker = true;
        }

        if (player.isBlocking && isFacingAttacker) {
            damage = 2; // Chip damage
        }

        player.takeHit(damage);

        // Lolo Tatay Slow Effect (Self-Debuff on Hit)
        if (enemy.type === 'lolo_tatay') {
            enemy.applySlow(2000);
        } else if (enemy.type === 'femboy') {
            player.applyBurn();
        }

        document.querySelector('#playerHealth').style.width = player.health + '%';
    }

    // Draw Projectiles
    projectiles.forEach((proj, index) => {
        proj.update();

        // Check Collision
        // If owner is player, check vs enemy
        let target = (proj.owner === 'player') ? enemy : player;

        if (
            proj.active &&
            target.position.x < proj.position.x + proj.width &&
            target.position.x + target.width > proj.position.x &&
            target.position.y < proj.position.y + proj.height &&
            target.position.y + target.height > proj.position.y
        ) {
            // Hit!
            target.takeHit(15);
            proj.active = false; // Destroy projectile

            // Update Health Bar
            if (target === player) document.querySelector('#playerHealth').style.width = player.health + '%';
            else document.querySelector('#enemyHealth').style.width = enemy.health + '%';
        }

        // Remove if inactive
        if (proj.position.x < -100 || proj.position.x > canvas.width + 100 || !proj.active) {
            projectiles.splice(index, 1);
        }
    });

    // End Game
    if (gameStarted && (enemy.health <= 0 || player.health <= 0)) {
        determineWinner({ player, enemy, timerId });
        gameStarted = false;
    }
}

animate();

window.addEventListener('keydown', (event) => {
    if (!gameStarted) return;

    // Prevent scrolling with arrows/space
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) {
        event.preventDefault();
    }

    switch (event.key) {
        // Player 1
        case 'd':
        case 'D':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case 'a':
        case 'A':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'w':
        case 'W':
            if (player.position.y + player.height >= canvas.height - 96)
                player.velocity.y = -20;
            break;
        case ' ': // Spacebar Punch
            player.pressAttack();
            break;
        case 'e':
        case 'E':
            keys.e.pressed = true;
            break;

        // Player 2
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowUp':
            if (enemy.position.y + enemy.height >= canvas.height - 96)
                enemy.velocity.y = -20;
            break;
        case '5':
        case 'Numpad5': // Support Numpad code just in case
            enemy.pressAttack();
            break;
        case '6':
        case 'Numpad6':
            keys.Six.pressed = true;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        // Player 1
        case 'd':
        case 'D':
            keys.d.pressed = false;
            break;
        case 'a':
        case 'A':
            keys.a.pressed = false;
            break;
        case 'e':
        case 'E':
            keys.e.pressed = false;
            break;
        case ' ':
            player.releaseAttack();
            break;

        // Player 2
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case '6':
        case 'Numpad6':
            keys.Six.pressed = false;
            break;
        case '5':
        case 'Numpad5':
            enemy.releaseAttack();
            break;
    }
});

// --- MOBILE ONSCREEN TOUCH CONTROLS (P1 & P2) ---
function initTouchControls() {
    const bindBtn = (btnId, onPress, onRelease) => {
        const btn = document.getElementById(btnId);
        if (!btn) return;

        const handlePress = (e) => {
            if (e) e.preventDefault();
            btn.classList.add('active');
            onPress();
        };

        const handleRelease = (e) => {
            if (e) e.preventDefault();
            btn.classList.remove('active');
            onRelease();
        };

        btn.addEventListener('touchstart', handlePress, { passive: false });
        btn.addEventListener('touchend', handleRelease, { passive: false });
        btn.addEventListener('touchcancel', handleRelease, { passive: false });

        btn.addEventListener('mousedown', handlePress);
        btn.addEventListener('mouseup', handleRelease);
        btn.addEventListener('mouseleave', handleRelease);
    };

    // --- PLAYER 1 BINDS (LEFT SIDE) ---
    bindBtn('p1Left', 
        () => { keys.a.pressed = true; player.lastKey = 'a'; }, 
        () => { keys.a.pressed = false; }
    );
    bindBtn('p1Right', 
        () => { keys.d.pressed = true; player.lastKey = 'd'; }, 
        () => { keys.d.pressed = false; }
    );
    bindBtn('p1Jump', 
        () => { 
            if (player && player.position.y + player.height >= canvas.height - 96) {
                player.velocity.y = -20;
            }
        }, 
        () => {}
    );
    bindBtn('p1Punch', 
        () => { if (player) player.pressAttack(); }, 
        () => { if (player) player.releaseAttack(); }
    );
    bindBtn('p1Block', 
        () => { keys.e.pressed = true; }, 
        () => { keys.e.pressed = false; }
    );

    // --- PLAYER 2 BINDS (RIGHT SIDE) ---
    bindBtn('p2Left', 
        () => { keys.ArrowLeft.pressed = true; enemy.lastKey = 'ArrowLeft'; }, 
        () => { keys.ArrowLeft.pressed = false; }
    );
    bindBtn('p2Right', 
        () => { keys.ArrowRight.pressed = true; enemy.lastKey = 'ArrowRight'; }, 
        () => { keys.ArrowRight.pressed = false; }
    );
    bindBtn('p2Jump', 
        () => { 
            if (enemy && enemy.position.y + enemy.height >= canvas.height - 96) {
                enemy.velocity.y = -20;
            }
        }, 
        () => {}
    );
    bindBtn('p2Punch', 
        () => { if (enemy) enemy.pressAttack(); }, 
        () => { if (enemy) enemy.releaseAttack(); }
    );
    bindBtn('p2Block', 
        () => { keys.Six.pressed = true; }, 
        () => { keys.Six.pressed = false; }
    );
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTouchControls);
} else {
    initTouchControls();
}
