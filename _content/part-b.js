/* 讲解文案 B：index 30–57
 * 与 part-a.js 同结构，生成器按 BASE_EFFECTS 里的 id 合并。
 */
module.exports = {

  starfield: {
    tags: ['Canvas 2D', 'Pseudo-3D', 'Divide by z'],
    en: {
      lead: 'Every star has a depth value, and dividing its position by that depth is the entire perspective camera.',
      how: 'Stars store an offset from centre plus a z between 0.1 and 2. The screen position is cx + x/z, so halving z doubles the distance from centre — that is genuine perspective divide, not a scaling animation. When z drifts below zero the star respawns at z=2, which is why the field never empties.',
      tweak: ['Increase the z decrement for a faster warp speed.', 'Draw a short line from the previous position to the current one for motion streaks instead of dots.']
    },
    zh: {
      lead: '每颗星带一个深度值，位置除以深度——这就是完整的透视相机。',
      how: '星星存的是相对中心的偏移量和一个 0.1–2 之间的 z。屏幕坐标是 cx + x/z，所以 z 减半、离中心距离就翻倍，这是真正的透视除法，不是放大动画。z 掉到 0 以下就在 z=2 重生，所以星空永远不会空。',
      tweak: ['加大每帧的 z 递减量，跃迁速度立刻变快。', '从上一帧位置到当前位置画一条短线，点就变成速度线。']
    }
  },

  fractal: {
    tags: ['Canvas 2D', 'Recursion', 'Base case'],
    en: {
      lead: 'A recursive function that draws a branch, then calls itself twice at 70% length — 6 levels deep.',
      how: 'br() terminates when len < 4, which is the base case that stops the recursion. Each call draws from the current point to a computed endpoint, then spawns two children at ±0.4 radians. The a variable sweeps slowly and is mixed into the child angles, which is what makes the whole tree sway instead of standing rigid.',
      tweak: ['Change 0.7 to 0.75 and the tree gets noticeably denser and taller.', 'Set the two child angles asymmetrically (±0.6 and ±0.2) for a wind-bent tree.']
    },
    zh: {
      lead: '一个递归函数：画一根枝，然后以 70% 的长度调用自己两次，递归六层。',
      how: 'br() 在 len < 4 时返回，这就是止住递归的基线条件。每次调用从当前点画到算出的端点，再在 ±0.4 弧度处分出两个子枝。变量 a 缓慢推进并被混进子枝角度，整棵树才会摇，而不是僵着。',
      tweak: ['0.7 改成 0.75，树会明显更密更高。', '两个子枝角度改成不对称（±0.6 和 ±0.2），就是被风吹歪的树。']
    }
  },

  smoke: {
    tags: ['Canvas 2D', 'Growth + rise', 'Low alpha'],
    en: {
      lead: 'Puffs that grow as they rise and are drawn at 15% opacity, so dozens of them build up into smoke.',
      how: 'Three things happen per frame: y decreases, r increases by 0.4, and x drifts by sin(y/20). The growing radius is what makes it read as expansion rather than translation. Because each puff is only 15% opaque, no single circle is visible — only the accumulation is.',
      tweak: ['Slow the radius growth to 0.15 for tighter, more defined plumes.', 'Randomise the hue range down to one colour family for tinted stage smoke.']
    },
    zh: {
      lead: '一团团会边升边变大、而且只用 15% 不透明度画的烟，几十个叠起来才成雾。',
      how: '每帧做三件事：y 减小、r 加 0.4、x 按 sin(y/20) 漂移。半径不断变大，是它看起来像「扩散」而不是「平移」的关键。因为每一团只有 15% 不透明，单看任何一个圆都看不出来——雾感来自累积。',
      tweak: ['半径增速降到 0.15，烟柱会更紧、形状更明确。', '把色相范围收窄到同一个色系，就是舞台上的染色烟。']
    }
  },

  textwave: {
    tags: ['DOM', 'Per-character transform', 'Hue by index'],
    en: {
      lead: 'Each character becomes its own inline-block span, so each can be lifted independently.',
      how: 'The string is rebuilt every frame into spans whose transform is translateY(sin(t + i*0.5)*18). The 0.5 phase step per index is what creates the travelling wave — all characters get the same sine, just at staggered moments. Colour is hsl(i*40 + 200), a fixed rainbow across the string.',
      tweak: ['Increase the phase step to 0.9 for a shorter, faster wave.', 'Keep the spans and only update their transforms instead of rebuilding innerHTML — much cheaper at length.']
    },
    zh: {
      lead: '每个字符都包成独立的 inline-block span，才能各自上下位移。',
      how: '每帧把字符串重建成一堆 span，transform 是 translateY(sin(t + i*0.5)*18)。每个下标 0.5 的相位差就是「波在走」的来源——所有字符用的是同一条正弦，只是时间错开了。颜色是 hsl(i*40 + 200)，沿字符串固定铺开的彩虹。',
      tweak: ['相位步长加到 0.9，波会更短更急。', '保留 span 只更新 transform、别重建 innerHTML，字多的时候性能差很多。']
    }
  },

  danmaku: {
    tags: ['DOM', 'Negative velocity', 'Self cleanup'],
    en: {
      lead: 'One message every 800ms flying right to left at 2px per frame, removed once it clears the left edge.',
      how: 'Each message starts at x = container width and decrements by 2 per frame; the loop stops when x passes -200, which accounts for the text\'s own width so nothing disappears mid-word. Vertical position is a random percentage between 10% and 90%, which keeps lanes from colliding too often.',
      tweak: ['Randomise speed between 2 and 5 so messages overlap like a real comment stream.', 'Snap the vertical position to fixed lanes to make the effect look like a broadcast overlay.']
    },
    zh: {
      lead: '每 800ms 一条，每帧向左移 2px，出了左边界就销毁。',
      how: '每条消息从容器宽度开始，每帧减 2；x 越过 -200 才停，这个余量是为了照顾文字自身的宽度，免得字还没走完就消失。纵向位置是 10%–90% 的随机百分比，这样轨道之间不容易撞车。',
      tweak: ['速度随机在 2–5 之间，就会出现真实的「叠弹幕」。', '纵向位置吸附到固定轨道，立刻变成电视台那种字幕条。']
    }
  },

  textparticles: {
    tags: ['Canvas 2D', 'getImageData', 'Sample grid'],
    en: {
      lead: 'The text is drawn off-screen, its pixels read back, and every opaque pixel becomes a particle target.',
      how: 'A hidden canvas renders the string, then getImageData is sampled on a 5px grid looking only at the alpha channel. Each surviving sample becomes a target coordinate that particles ease toward with x += (tx-x)*0.08. That 0.08 lerp is why they converge rather than snap.',
      tweak: ['Sample every 3px for more particles and a sharper logo, every 8px for a lighter one.', 'Raise the lerp to 0.2 so the letters assemble faster and lose the drift.']
    },
    zh: {
      lead: '文字先画在一块看不见的画布上，把像素读回来，每个不透明的像素点变成一个粒子的目标位置。',
      how: '用一个隐藏 canvas 渲染文字，然后 getImageData 按 5px 网格采样，只看 alpha 通道。留下的每个采样点成为目标坐标，粒子用 x += (tx-x)*0.08 逼近。0.08 这个插值系数，就是它们会「汇聚」而不是「瞬移」的原因。',
      tweak: ['改成 3px 采样，粒子更多、字形更锐利；8px 则更轻。', '插值提到 0.2，字会拼得更快，但也失去那种飘的感觉。']
    }
  },

  fountain: {
    tags: ['DOM', 'Projectile physics', 'transform'],
    en: {
      lead: 'Particles leave the bottom centre with upward velocity, and gravity plus a translate() does the rest.',
      how: 'Each particle starts with vy between -8 and -12 and vx within ±2. Every frame vy increases by 0.3, which arcs the trajectory from up to down, and the rendered position is a plain translate(x, y). The loop stops when y becomes positive, meaning the particle has fallen back past its origin.',
      tweak: ['Randomise vx more widely for a wider, messier fountain.', 'Add opacity tied to y so particles fade as they fall back down.']
    },
    zh: {
      lead: '粒子从底部中央以向上速度喷出，剩下的交给重力和一个 translate()。',
      how: '每个粒子的初始 vy 在 -8 到 -12 之间，vx 在 ±2 内。每帧 vy 加 0.3，轨迹就从上升转成下落，而实际渲染位置只是一个 translate(x, y)。y 变成正值（也就是落回起点以下）时循环结束并销毁。',
      tweak: ['把 vx 的随机范围放大，喷泉会变宽、变乱。', '让透明度跟随 y，下落时逐渐变淡，会更有重量感。']
    }
  },

  fireflies: {
    tags: ['Canvas 2D', 'sin pulse', 'Shadow glow'],
    en: {
      lead: 'Points that drift slowly and pulse their brightness with an independent sine phase.',
      how: 'Each firefly carries ph, its own phase in the sine wave, and opacity is 0.4 + abs(sin(ph))*0.6. Because ph advances at the same rate for all but starts random, the field twinkles asynchronously — the whole point of the effect. shadowBlur adds the halo without any extra particles.',
      tweak: ['Give each firefly a slightly different ph increment so they never fall into rhythm.', 'Slow the drift to a quarter speed and the scene becomes genuinely nocturnal.']
    },
    zh: {
      lead: '缓慢漂移的点，亮度按各自独立的相位做正弦脉动。',
      how: '每只萤火虫带一个自己的相位 ph，透明度是 0.4 + abs(sin(ph))*0.6。ph 的推进速度一致，但起点随机，所以整片是不同步地闪——这正是这个效果的意义。shadowBlur 负责光晕，不需要额外粒子。',
      tweak: ['给每只不同的 ph 增量，它们就永远不会同步成一片。', '漂移速度降到四分之一，夜晚的氛围才真的出来。']
    }
  },

  dna: {
    tags: ['Canvas 2D', 'Double helix', 'Phase offset'],
    en: {
      lead: 'Two strands of dots orbiting a shared axis half a turn apart, with rungs every fourth step.',
      how: 'Each of the 40 steps has an angle of t + i*0.3, so the helix winds once every ~21 steps. The second strand uses the same angle plus π, which guarantees the two are always exactly opposite. A crossbar is only drawn when i%4 === 0, keeping the base-pair look sparse instead of a ladder.',
      tweak: ['Reduce the 0.3 per-step twist for a longer, looser coil.', 'Draw the crossbars with a gradient to fake depth as the strands rotate.']
    },
    zh: {
      lead: '两股点阵绕同一根轴转，相位差半圈，每隔四步连一根横档。',
      how: '40 个台阶每个的角度是 t + i*0.3，大约每 21 步绕完一圈。第二条链用的是同一个角度加 π，这样两股保证永远正对。只有当 i%4 === 0 时才画横档，碱基对才不会密成一把梯子。',
      tweak: ['每步 0.3 的扭转量调小，螺旋会更长更松。', '横档用渐变画，链旋转时就有前后深度。']
    }
  },

  rainbowrain: {
    tags: ['Canvas 2D', 'fillRect', 'Respawn'],
    en: {
      lead: 'Rain is just 3×12 rectangles in random hues, and it is the rectangle shape that makes them read as rain.',
      how: 'Each drop has a fixed vy and a random hue assigned once at birth, so drops keep their colour all the way down. When y passes the bottom, both y and x are re-randomised — resetting x matters, otherwise the rain gradually clusters into vertical stripes.',
      tweak: ['Make the rectangles taller (3×20) for heavier rain, shorter for drizzle.', 'Add a slight x drift per frame so the rain falls at an angle.']
    },
    zh: {
      lead: '雨就是一堆 3×12 的矩形，随机色相——正是「矩形」这个形状让它看起来像雨。',
      how: '每滴雨出生时定好 vy 和色相，所以整段下落过程中颜色不变。y 越过底部时，y 和 x 一起重新随机——重置 x 很重要，否则雨会慢慢聚成竖条。',
      tweak: ['矩形加高到 3×20 是大雨，压扁就是毛毛雨。', '每帧给 x 加一点偏移，雨就是斜着下的。']
    }
  },

  tornado: {
    tags: ['Canvas 2D', 'Helical motion', 'Radius mapping'],
    en: {
      lead: 'Particles spiral outward and upward, then recycle — the funnel shape is a linear map from radius to height.',
      how: 'Y is 20 + r*3.1, so height is literally derived from radius: small radius means high up, large radius means near the ground. That single line produces the cone. Adding p.r*0.05 to the angle makes the spiral tighten as it rises, which is what gives it the twisting look.',
      tweak: ['Change 3.1 to 1.8 for a squat, wide funnel.', 'Increase the angle drift so the bands become more visible.']
    },
    zh: {
      lead: '粒子向外、向上螺旋，然后回收——漏斗的形状就是「半径到高度」的一个线性映射。',
      how: 'Y 是 20 + r*3.1，也就是高度直接由半径算出来：半径小就在高处，半径大就贴地。这一行就画出了锥形。角度上再加 p.r*0.05，螺旋会越往上越紧，扭转感就是这么来的。',
      tweak: ['3.1 改成 1.8，漏斗会变矮变宽。', '加大角度漂移，螺旋的层次会更清楚。']
    }
  },

  magnet: {
    tags: ['DOM', 'getBoundingClientRect', 'Distance falloff'],
    en: {
      lead: 'Buttons slide toward the cursor, but only when it is within 140px, and the pull weakens to zero at the edge.',
      how: 'For each button the code measures the distance from its centre to the pointer, then applies translate(dx/d * f, dy/d * f) where f scales from 18 down to 0 across the 140px radius. Normalising by d first is what keeps the movement directional instead of proportional to raw offset.',
      tweak: ['Raise the 18 to 30 for a stronger, more toy-like magnet.', 'Add a rotation of dx/20 degrees so buttons tilt as they are pulled.']
    },
    zh: {
      lead: '按钮会朝鼠标滑过去，但只在 140px 范围内，而且越靠边拉力越弱直到归零。',
      how: '对每个按钮测量中心到指针的距离，再施加 translate(dx/d * f, dy/d * f)，其中 f 在 140px 半径内从 18 衰减到 0。先用 d 归一化，是位移保持「有方向」而不是和绝对偏移成正比的关键。',
      tweak: ['18 提到 30，磁力会强到像个玩具。', '再叠加一个 dx/20 度的旋转，按钮被吸的时候会歪。']
    }
  },

  spotlight: {
    tags: ['CSS', 'radial-gradient', 'CSS custom properties'],
    en: {
      lead: 'A black overlay with a transparent hole, moved by writing two CSS variables from mousemove.',
      how: 'The mask is a radial-gradient whose centre is var(--x) var(--y), fully transparent for the first 55px then opaque black by 120px. The handler only calls style.setProperty on those two variables — no reflow-triggering layout reads, no canvas. The soft edge is the gradient\'s 55–120px transition band.',
      tweak: ['Shrink the 120px stop for a hard-edged torch; widen it for a soft glow.', 'Animate the hole size on click for a zoom-in reveal.']
    },
    zh: {
      lead: '一层黑色遮罩中间挖个透明洞，靠 mousemove 写两个 CSS 变量来移动。',
      how: '遮罩是一个径向渐变，圆心是 var(--x) var(--y)，前 55px 完全透明，到 120px 变成不透明黑。处理函数只在样式上 setProperty 这两个变量——不触发重排、不用 Canvas。边缘的柔化就是 55–120px 这段过渡带。',
      tweak: ['120px 收小，就变成硬边的手电筒；放大则更柔。', '点击时让洞的大小动一下，就有了「拉近」的揭示感。']
    }
  },

  scratch: {
    tags: ['Canvas 2D', 'destination-out', 'Composite mode'],
    en: {
      lead: 'The grey coating is a canvas painted on top of the reward, and dragging erases it with a composite mode.',
      how: 'Setting globalCompositeOperation = destination-out makes every brush stroke subtract from what is already there instead of drawing on top. The canvas therefore works as a mask, and the hidden content underneath is just normal DOM. mouseleave also clears the drag flag, which prevents the classic bug of erasing after the pointer has left the box.',
      tweak: ['Enlarge the brush radius for a coarse scratch, shrink it for a coin-scratch feel.', 'Track how much alpha remains and auto-reveal the rest past 60% removed.']
    },
    zh: {
      lead: '灰色涂层是盖在答案上面的一块 canvas，拖动时用混合模式把它擦掉。',
      how: '把 globalCompositeOperation 设成 destination-out，每一笔就在「减去已有内容」，而不是往上画。于是这块 canvas 变成了遮罩，底下藏的东西就是普通 DOM。mouseleave 里也清掉拖拽标志，避免手移出框外还在擦这个经典 bug。',
      tweak: ['笔刷半径调大是粗暴地刮，调小就有硬币刮涂层的手感。', '统计剩余不透明度，擦掉 60% 就自动露出剩下的部分。']
    }
  },

  draggable: {
    tags: ['Canvas 2D', 'Spring', 'Damping'],
    en: {
      lead: 'Drag the ball anywhere, let go, and it springs back to the centre — no keyframes involved.',
      how: 'While dragging, the ball simply follows the pointer. On release, acceleration is (centre - position) * 0.05 and velocity is damped by 0.88 each frame. That combination is a spring-damper: the 0.05 sets stiffness and 0.88 sets how quickly the overshoot dies out.',
      tweak: ['Lower the damping to 0.8 for a bouncier, rubber-band release.', 'Raise 0.05 to 0.15 and the ball snaps back aggressively.']
    },
    zh: {
      lead: '把球拖到任意位置松手，它会弹回中心——整个过程没有关键帧。',
      how: '拖拽时球直接跟随指针。松手后加速度是 (中心 − 当前位置) * 0.05，速度每帧乘 0.88 衰减。这就是一个弹簧-阻尼系统：0.05 决定劲度，0.88 决定过冲多久消失。',
      tweak: ['阻尼降到 0.8，回弹更弹、更像橡皮筋。', '0.05 提到 0.15，球会「啪」地一下收回去。']
    }
  },

  metaball: {
    tags: ['Canvas 2D', 'filter: blur', 'Cheap metaballs'],
    en: {
      lead: 'Real metaballs need marching squares. This fakes them with six blurred circles and gets 90% of the look for 5% of the code.',
      how: 'Each of the six circles is drawn at radius 42 with ctx.filter = blur(16px), so their edges bleed into each other long before the shapes actually touch. Because the circles are drawn in the same solid colour, the overlaps merge visually into a single blob.',
      tweak: ['Increase the radius to 60 with the same blur for stickier merging at a distance.', 'Add a second pass drawn with screen blending for a brighter core.']
    },
    zh: {
      lead: '真正的 metaball 要写 marching squares，这里用六个模糊圆糊弄过去——效果拿到九成，代码只要零头。',
      how: '六个圆都以半径 42 绘制，并设 ctx.filter = blur(16px)，所以它们的边缘在形状真正接触之前就已经渗到一起了。又因为用的是同一个实色，重叠部分在视觉上就并成了一个团。',
      tweak: ['半径加到 60、模糊不变，隔着老远就会粘起来。', '再叠一遍用 screen 混合模式，中心会更亮。']
    }
  },

  crt: {
    tags: ['Canvas 2D', 'Scanlines', 'Alpha flicker'],
    en: {
      lead: 'Horizontal lines every 4px, plus a full-canvas green wash that pulses in brightness.',
      how: 'The scanlines are strokes at y += 4 with 15% opacity green. The flicker is a separate fillRect whose alpha is 0.04 + abs(sin(f))*0.05 — tying it to a sine of an accumulating counter rather than to time keeps the rhythm stable even if the frame rate varies.',
      tweak: ['Change the line spacing to 3px for a sharper, more modern display.', 'Add slight horizontal offset per row to simulate signal noise.']
    },
    zh: {
      lead: '每 4px 一条横线，再盖一层亮度会脉动的绿色。',
      how: '扫描线是以 y += 4 步进、15% 透明度的绿色描边。闪烁是另一层 fillRect，透明度为 0.04 + abs(sin(f))*0.05——用的是累积计数器的正弦而不是时间，帧率波动时节奏也稳。',
      tweak: ['行距改成 3px，屏幕会更锐、更现代。', '每一行加一点横向偏移，就是信号噪声。']
    }
  },

  tunnel: {
    tags: ['Canvas 2D', 'Modulo rings', 'Alpha by radius'],
    en: {
      lead: 'Thirty circles whose radius cycles through 0–600, with opacity falling off as they expand.',
      how: 'Radius is (i*20 + t*60) % 600, so rings continuously emerge at the centre and grow outward. The modulo is what makes it seamless — a ring that reaches 600 reappears at 0 without any bookkeeping. Alpha of 1 - r/600 means a ring is born bright and invisible by the time it fills the canvas.',
      tweak: ['Raise the 30 ring count and the tunnel gets denser without overlapping.', 'Use an ellipse instead of arc to fake a tilted tunnel.']
    },
    zh: {
      lead: '三十个圆，半径在 0–600 之间循环，越往外越透明。',
      how: '半径是 (i*20 + t*60) % 600，所以圆环不断从中心冒出、向外扩大。取模是它无缝的原因——扩到 600 的环自动回到 0，不需要任何额外管理。透明度 1 - r/600 让环刚出生时最亮、铺满画布时正好消失。',
      tweak: ['环数提到 30 以上，隧道会更密而不会重叠。', '把 arc 换成椭圆，就是一条倾斜的隧道。']
    }
  },

  spiral: {
    tags: ['Canvas 2D', 'Archimedean spiral', 'Hue by index'],
    en: {
      lead: 'Seventy dots placed along r = i*4 with an angle offset of i*0.12 — an Archimedean spiral, rotating.',
      how: 'The constant radial step is what makes the arms equally spaced; an exponential step would give a logarithmic spiral instead. Because t only advances 0.01 per frame, the perceived motion is a slow rotation of the whole pattern rather than dots travelling along it.',
      tweak: ['Change i*4 to i*7 for a looser spiral with wider gaps.', 'Speed t up past 0.05 and it stops being hypnotic and starts being alarming.']
    },
    zh: {
      lead: '七十个点沿 r = i*4、角度偏移 i*0.12 摆放——一条阿基米德螺旋，在缓慢旋转。',
      how: '半径是等差递增，所以每圈间距相等；如果改成等比，得到的会是等角螺线。因为 t 每帧只推进 0.01，观感上更像是整幅图案在旋转，而不是点在沿螺线跑。',
      tweak: ['i*4 改成 i*7，螺旋更松、间隙更宽。', 't 增速超过 0.05，就从催眠变成让人心慌了。']
    }
  },

  moire: {
    tags: ['Canvas 2D', 'Interference', 'Line sets'],
    en: {
      lead: 'Two sets of parallel lines at mirrored angles — the pattern you see is not drawn anywhere.',
      how: 'One pass draws lines at tan(t), the other at tan(-t); both use the same 12px spacing. The visible bands are an interference artefact of the two grids overlapping, which is why the pattern appears to move in directions neither set is moving. Nothing in the code computes those bands.',
      tweak: ['Vary the second spacing to 13px and the bands get much more pronounced.', 'Hold t still and animate one line offset instead for a classic slide-moiré.']
    },
    zh: {
      lead: '两组夹角相反的平行线——你看到的那个花纹，代码里根本没画。',
      how: '一次用 tan(t) 画一组线，另一次用 tan(-t) 画一组，两组都是 12px 间距。肉眼看到的明暗带是两组栅格叠加产生的干涉，所以它移动的方向和任何一组线都不一样。代码里没有任何地方计算那些带。',
      tweak: ['第二组间距改成 13px，条纹会明显得多。', '让 t 停住、只动一组的相位偏移，就是经典的滑动莫尔。']
    }
  },

  pulse: {
    tags: ['Canvas 2D', 'Phase offset', 'Radius modulo'],
    en: {
      lead: 'Five rings sharing one expanding radius, each offset by 40px so they never coincide.',
      how: 'Radius is (t*60 + i*40) % 200, so each ring is at a different point in the same cycle. Alpha of 1 - r/200 makes them fade exactly as they reach the edge, and the hue is derived from the same radius, so colour and size stay locked together.',
      tweak: ['Add a second set with a smaller max radius to suggest a heartbeat.', 'Decrease the 40px offset so rings bunch up into visible clusters.']
    },
    zh: {
      lead: '五个环共用一条扩张的半径，彼此错开 40px，所以永远不会重合。',
      how: '半径是 (t*60 + i*40) % 200，所以每个环处在同一循环的不同位置。透明度 1 - r/200 让它们刚好在抵达边缘时消失，色相也由同一个半径推出，颜色和大小因此始终绑定。',
      tweak: ['再叠一组最大半径更小的环，就有了心跳的双峰。', '把 40px 的错位改小，环会挤成几簇。']
    }
  },

  grain: {
    tags: ['Canvas 2D', 'createImageData', 'Per-pixel'],
    en: {
      lead: 'Every frame, a fresh ImageData buffer filled with random grey at 14% alpha.',
      how: 'This is the one effect that is genuinely per-pixel: the loop writes random values into all four channels of a new ImageData and blits it with putImageData. Alpha is fixed at 35/255, which is what makes it grain over the content rather than a white noise screen.',
      tweak: ['Raise the alpha to 80 for aggressive film grain, or lower it to 10 for a subtle texture.', 'Update only every other frame to halve the cost at almost no visual difference.']
    },
    zh: {
      lead: '每帧新建一块 ImageData，用随机灰填满，再以 14% 的透明度贴上去。',
      how: '这是少数真正逐像素的效果：循环往新 ImageData 的四个通道写随机值，再用 putImageData 贴回画布。alpha 固定 35/255，正是这个值让它成为「覆盖在内容上的颗粒」，而不是一块雪花屏。',
      tweak: ['alpha 提到 80 是粗颗粒胶片，降到 10 是极细的质感。', '隔帧才刷新，成本减半、肉眼几乎看不出差别。']
    }
  },

  strokefill: {
    tags: ['SVG', 'SMIL animate', 'Dual text layers'],
    en: {
      lead: 'Two identical SVG text elements: one outlined, one filled, each with its own SMIL animation.',
      how: 'The first text has fill:none and a stroke, and animates stroke-width 1 → 3 → 1. The second is filled pink at opacity 0 and animates opacity 0 → 1 → 0 on a slower 3s clock. Because the two cycles are different lengths, they drift in and out of phase, so the effect never looks like it is looping.',
      tweak: ['Make both durations equal and the two states will lock into an obvious pulse.', 'Add stroke-dasharray animation to make the outline appear to draw itself.']
    },
    zh: {
      lead: '两个一模一样的 SVG 文字：一个描边、一个填充，各自带一条 SMIL 动画。',
      how: '第一层 fill:none 加描边，动画改 stroke-width 从 1 到 3 再回 1。第二层是粉色填充、初始 opacity 为 0，用更慢的 3 秒周期做 0 → 1 → 0。两个周期长度不同，相位就会不断错开，所以永远看不出「在循环」。',
      tweak: ['两个时长改成一样，就会变成一眼看穿的规律脉动。', '再加 stroke-dasharray 动画，描边会有「自己画出来」的感觉。']
    }
  },

  blurfocus: {
    tags: ['CSS', 'filter: blur', 'Keyframes'],
    en: {
      lead: 'A single keyframe alternating between blur(8px) at 40% opacity and fully sharp.',
      how: 'The animation is applied via JS so the class is not needed in markup, but the whole effect is one @keyframes block. Combining blur with opacity is deliberate: blur alone at full opacity still looks like a rendering bug, while a dimmer image reads as genuinely out of focus.',
      tweak: ['Push the blur to 16px for a stronger depth-of-field feel.', 'Stagger two lines of text with animation-delay so they focus at different moments.']
    },
    zh: {
      lead: '一条关键帧，在 blur(8px)、40% 透明度和完全清晰之间来回。',
      how: '动画是用 JS 挂上去的（所以 HTML 里不用加类名），但效果本体就是一整块 @keyframes。模糊和透明度一起降是刻意的：光模糊不降透明度，看起来像渲染出错；把亮度一起压低，才像真的失焦。',
      tweak: ['blur 推到 16px，景深感更强。', '两行文字各加一个 animation-delay，就会在不同时刻对上焦。']
    }
  },

  letterflip: {
    tags: ['DOM', 'rotateX', 'animation-delay'],
    en: {
      lead: 'Each letter flips a full 360 degrees on X, staggered by 0.15s — the stagger is the whole trick.',
      how: 'Every character is its own span with animation-delay: i*0.15s, so the wave of flips travels left to right. rotateX with a perspective on the parent means the letters tumble toward the viewer instead of just squashing vertically, which is what separates this from a cheap scale animation.',
      tweak: ['Use rotateY for a flip like turning cards instead of a tumble toward the camera.', 'Reduce the delay to 0.05s for a snappier, more mechanical rhythm.']
    },
    zh: {
      lead: '每个字母绕 X 轴翻整 360 度，彼此错开 0.15 秒——错位就是全部诀窍。',
      how: '每个字符是独立 span，animation-delay 为 i*0.15s，翻转的波浪就从左往右推过去。父级带 perspective，所以字母是朝观者翻，而不是单纯上下压扁——这一点把它和廉价的缩放动画区分开了。',
      tweak: ['换成 rotateY，就是翻牌的感觉，而不是朝镜头滚。', '延迟缩到 0.05s，节奏更急、更机械。']
    }
  },

  typingloop: {
    tags: ['DOM', 'State machine', 'Bidirectional'],
    en: {
      lead: 'The same string typed and deleted forever, with a different speed for each direction.',
      how: 'A single del flag drives a two-state machine: growing until i exceeds the length, then shrinking until i hits zero. Deletion runs at 80ms per character versus 140ms for typing — that asymmetry is why it feels deliberate rather than mechanical.',
      tweak: ['Make the delete delay larger than the type delay for a reluctant, sad rhythm.', 'Add a 1s pause at full length before deleting.']
    },
    zh: {
      lead: '同一句话反复打出来又删掉，两个方向的速度不一样。',
      how: '一个 del 标志驱动两状态机：长到超过长度就切删除，删到 0 再切回来。删除是每字 80ms，打字是 140ms——正是这个不对称让它显得有意为之，而不是机械循环。',
      tweak: ['删除延迟调得比打字还慢，会读出一种犹豫的情绪。', '打满之后停 1 秒再删，节奏会从容很多。']
    }
  },

  mirrortext: {
    tags: ['CSS', 'scaleY(-1)', 'Gradient mask'],
    en: {
      lead: 'The second copy is the first flipped vertically, with a gradient making it fade out as it descends.',
      how: 'transform: scaleY(-1) does the flip. The reflection is then tinted with a background-clip:text gradient running from the text colour to transparent, which is what makes it read as a reflection on a surface rather than a second heading. Opacity 0.35 finishes the illusion.',
      tweak: ['Add a slight blur to the reflection to suggest a rippled surface.', 'Reduce the gap between the two copies so they meet at a visible "waterline".']
    },
    zh: {
      lead: '第二份是第一份垂直翻转，再用渐变让它越往下越淡。',
      how: '翻转靠 transform: scaleY(-1)。倒影再用 background-clip:text 的渐变从文字颜色过渡到透明，这才让它读起来像水面上的倒影，而不是第二个标题。0.35 的透明度补完最后一笔。',
      tweak: ['给倒影加一点模糊，就像水面有波纹。', '把两份的间距压小，中间就会出现一条明显的「水面线」。']
    }
  },

  glowpulse: {
    tags: ['CSS', 'transform: scale', 'text-shadow'],
    en: {
      lead: 'A breathing headline: scale up while the glow changes colour and widens.',
      how: 'The keyframe moves scale from 1 to 1.15 and swaps a tight yellow shadow for two wider pink ones at the midpoint. Pairing the scale with a colour change is what prevents it from looking like a zoom — the light appears to intensify as the text grows.',
      tweak: ['Animate only the shadows and drop the scale for a purely luminous pulse.', 'Use a 4s duration with ease-in-out for a calmer breathing rate.']
    },
    zh: {
      lead: '会呼吸的标题：放大的同时光晕变色并且变宽。',
      how: '关键帧把 scale 从 1 推到 1.15，并在中点把紧贴的黄色光晕换成两层更宽的粉色。缩放配合变色，才不会看成单纯放大——字变大的同时，光看起来也在变强。',
      tweak: ['只动光晕、不动 scale，就是纯粹的呼吸灯。', '时长拉到 4s 配 ease-in-out，呼吸会平缓很多。']
    }
  }

};
