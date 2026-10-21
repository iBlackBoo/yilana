/* 讲解文案 A：index 0–28
 * 每个特效：tags（技术标签）、en/zh 两种语言下的 lead（一句导语）、how（原理，2–3 句）、tweak（2 条可改参数）
 * 讲解全部基于真实源码撰写，不是模板套话。
 */
module.exports = {

  fireworks: {
    tags: ['Canvas 2D', 'Particles', 'Gravity'],
    en: {
      lead: 'Sixty particles per burst, spread across a full circle and then pulled down by gravity — the simplest approach that still reads as a real firework.',
      how: 'boom() places particles at equal angular steps (i/60*2π), so the shell opens as an even ring instead of a clump. Each particle runs its own requestAnimationFrame loop, adds 0.06 to vy every frame, and fades l by 0.015 until it stops drawing.',
      tweak: ['Lower the 60 for a sparser, more expensive-looking shell.', 'Add vx *= 0.99 as air drag so the burst hangs at its apex.']
    },
    zh: {
      lead: '每次点击炸出 60 个粒子，按整圆均分角度抛出，再让重力把它们拉下来——最简单、但看起来最像真火花的做法。',
      how: 'boom() 里按 i/60*2π 均分角度，所以炸开的是一圈均匀的环，而不是一坨。每个粒子各自跑一条 requestAnimationFrame 循环，每帧给 vy 加 0.06，同时把亮度 l 减 0.015，减到 0 就停止绘制。',
      tweak: ['把 60 改小，环会更稀疏，反而更像高档礼花。', '加一句 vx *= 0.99 模拟空气阻力，粒子会在最高点多停一会儿。']
    }
  },

  confetti: {
    tags: ['DOM', 'CSS Transform', 'requestAnimationFrame'],
    en: {
      lead: 'No canvas at all — eighty absolutely positioned divs, each given its own gravity and spin.',
      how: 'Every piece gets a random x across 100vw, a random hue, and a starting vy between 2 and 3. The animation loop only touches two CSS properties: translateY and rotate. When a piece falls past innerHeight it removes itself from the DOM, so the page does not accumulate garbage.',
      tweak: ['Vary the width and height per piece for a more convincing paper flutter.', 'Add a sine wave on x to make pieces drift sideways instead of falling straight.']
    },
    zh: {
      lead: '完全没有 Canvas——八十个绝对定位的 div，每个都有自己的重力和自转。',
      how: '每片纸屑随机横向位置、随机色相，起始 vy 在 2 到 3 之间。动画循环只改两个 CSS 属性：translateY 和 rotate。落过 innerHeight 就 remove() 掉，页面不会越堆越多。',
      tweak: ['给每片随机宽高，纸片飘落的感觉会更真。', '给 x 叠加一条正弦波，纸屑就会左右飘而不是直着掉。']
    }
  },

  trail: {
    tags: ['Canvas 2D', 'Point buffer', 'Additive alpha'],
    en: {
      lead: 'Mouse positions are pushed into an array and each one becomes a dot with its own remaining life.',
      how: 'mousemove pushes {x, y, l:1}; the render loop filters out dead points, draws each with globalAlpha set to its life value, then decrements l by 0.02. The rainbow is Date.now()/5 % 360, so colour advances with real time rather than with distance travelled.',
      tweak: ['Push only every other mousemove event — dots get sparser and the trail looks more deliberate.', 'Swap the hue formula for a fixed hue to get a single-colour comet instead of a rainbow.']
    },
    zh: {
      lead: '把鼠标坐标不断塞进数组，每个点自带一条剩余寿命，边画边衰减。',
      how: 'mousemove 推入 {x, y, l:1}；渲染循环先过滤掉 l<=0 的点，绘制时把 globalAlpha 设成 l，然后每帧减 0.02。彩虹色来自 Date.now()/5 % 360，所以颜色跟着真实时间走，而不是跟着移动距离。',
      tweak: ['每隔一次 mousemove 才推一个点，轨迹会变稀疏，更像刻意画的。', '把色相换成固定值，就从彩虹彗星变成单色光笔。']
    }
  },

  nebula: {
    tags: ['Canvas 2D', 'Polar coordinates', 'Elliptical orbit'],
    en: {
      lead: 'Eighty particles in polar form, orbiting at different speeds — the ellipse comes from scaling y by 0.6.',
      how: 'Each particle stores only an angle a and a radius r. Every frame a increases by its own speed s, and the position is projected with cos(a)*r for x and sin(a)*r*0.6 for y. Squashing the y axis is what turns a flat circle into a tilted galaxy.',
      tweak: ['Change 0.6 to 0.25 for an edge-on view, or 1 for a face-on spiral.', 'Give r a slow oscillation so the arms breathe instead of staying rigid.']
    },
    zh: {
      lead: '八十个粒子用极坐标描述，各自以不同角速度公转——椭圆感是把 y 压到 0.6 换来的。',
      how: '每个粒子只存角度 a 和半径 r。每帧 a 按自己的速度自增，位置用 cos(a)*r 算 x、sin(a)*r*0.6 算 y。把 y 轴压扁，正圆就变成了有倾角的星系。',
      tweak: ['把 0.6 改成 0.25 是从侧面看，改成 1 就是正面俯视的漩涡。', '让 r 缓慢来回变化，旋臂会有呼吸感，而不是硬邦邦地转。']
    }
  },

  hearts: {
    tags: ['DOM', 'setInterval', 'CSS Transform'],
    en: {
      lead: 'One new emoji every 300ms, each riding its own rise-and-rotate loop until it leaves the viewport.',
      how: 'setInterval spawns a div at a random horizontal position, font-size randomised between 14 and 34px. The inner loop translates it upward by 1.5px per frame while adding 3 degrees of rotation, and removes it once it clears innerHeight plus a 40px margin.',
      tweak: ['Raise the interval to 120ms and it becomes a dense wall of hearts.', 'Give each heart a random horizontal drift for a more organic float.']
    },
    zh: {
      lead: '每 300ms 生成一颗 emoji 爱心，各自跑一条上升加旋转的循环，飘出屏幕就销毁。',
      how: 'setInterval 在随机横向位置插一个 div，字号在 14–34px 之间随机。内层循环每帧向上平移 1.5px、同时转 3 度，超出 innerHeight 加 40px 余量后 remove。',
      tweak: ['间隔改成 120ms，就变成一堵密集的爱心墙。', '给每颗爱心加一点横向漂移，飘起来更自然。']
    }
  },

  snow: {
    tags: ['Canvas 2D', 'Sine sway', 'Wrapping'],
    en: {
      lead: 'A hundred and twenty flakes that fall straight down in y but sway in x on a sine curve.',
      how: 'The horizontal sway is sin(p.y/30)*0.6 — driving the sine with the flake\'s own y position means the sway accelerates as it falls, which looks like wind rather than a pendulum. When a flake passes the bottom edge it is teleported back to y=0 instead of being respawned, so the density never drops.',
      tweak: ['Multiply the sway amplitude by 3 for a blizzard, or by 0.3 for calm air.', 'Randomise the /30 divisor per flake so they do not sway in unison.']
    },
    zh: {
      lead: '一百二十片雪花，y 方向匀速下落，x 方向走正弦曲线来回摆。',
      how: '横向摆动是 sin(p.y/30)*0.6——用雪花自己的 y 当正弦的输入，摆动会随着下落越来越快，看起来像风，而不是钟摆。落到下边缘直接重置到 y=0（而不是重新随机整片），密度不会掉。',
      tweak: ['振幅乘 3 是暴雪，乘 0.3 是无风的静雪。', '把 /30 这个除数做成每片随机，雪花就不会整齐划一地摆。']
    }
  },

  particleText: {
    tags: ['Canvas 2D', 'Radial burst', 'Interval spawner'],
    en: {
      lead: 'A burst of 40 particles every 600ms from the centre, their velocity randomised over a full 360 degrees.',
      how: 'This one leans on the canvas\'s own persistence: nothing is cleared between frames, so old particles leave a glowing smear that slowly accumulates into a cloud. Life l is unused for drawing size and only gates the fade — the visual weight comes from stacking.',
      tweak: ['Clear the canvas partially (rgba(0,0,0,0.1)) to trade the smear for crisp dots.', 'Lower the interval to 200ms and raise the count to fill the canvas much faster.']
    },
    zh: {
      lead: '每 600ms 从中心炸出 40 个粒子，速度方向在整圆上随机。',
      how: '这个效果吃的是 Canvas 自身的累积：帧间不清屏，老粒子留下的残影会慢慢堆成一团光雾。寿命 l 只用来控制淡出，粒子的大小是固定的——视觉厚度完全来自叠加。',
      tweak: ['如果每帧先盖一层 rgba(0,0,0,0.1)，残影会消失，变成干净的小点。', '间隔缩到 200ms、数量提上去，画面会瞬间填满。']
    }
  },

  bubble: {
    tags: ['DOM', 'Hit testing', 'event.stopPropagation'],
    en: {
      lead: 'Click anywhere to spawn a bubble, click the bubble to pop it — the trick is stopping the click from also spawning a new one.',
      how: 'The container listens for clicks and creates a 36px circle at the pointer, offset by half its size so it centres on the cursor. The bubble has its own click handler that calls stopPropagation(), then scales to 1.8 and fades out over 200ms before removing itself. A 3-second timer cleans up bubbles nobody popped.',
      tweak: ['Animate the scale in as well as out for a squash effect on creation.', 'Track a pop counter — it is the cheapest possible game loop.']
    },
    zh: {
      lead: '点空白处生成泡泡，点泡泡把它戳破——关键在于别让这一下同时再生成一个。',
      how: '容器监听 click，在指针位置建一个 36px 的圆，坐标各减 18px 让圆心对准鼠标。泡泡自带 click 处理器，先 stopPropagation()，再放大到 1.8 倍、200ms 内透明消失后 remove。另外挂一个 3 秒定时器，清掉没人戳的泡泡。',
      tweak: ['生成时也加一段放大动画，会有「鼓起来」的手感。', '顺手记个计数，这就是最省事的游戏循环。']
    }
  },

  gravity: {
    tags: ['Canvas 2D', 'Inverse force', 'Velocity damping'],
    en: {
      lead: 'Sixty particles that accelerate toward the cursor, with force falling off as 1/distance.',
      how: 'The pull is dx * min(0.5, 6/d) * 0.02 — the 6/d term is what makes it behave like gravity rather than a spring: nearby particles get yanked hard, distant ones barely move. Velocity is multiplied by 0.98 every frame, so particles settle into a slow orbit instead of collapsing into a single point.',
      tweak: ['Drop the damping to 0.9 for a snappier, more electric feel.', 'Invert the sign to get a repulsion field — a bubble of empty space around the cursor.']
    },
    zh: {
      lead: '六十个粒子朝鼠标加速，引力按 1/距离 衰减。',
      how: '吸力是 dx * min(0.5, 6/d) * 0.02。6/d 这一项是它像引力而不像弹簧的关键：近处被猛拽，远处的几乎不动。速度每帧乘 0.98，所以粒子最终会进入缓慢绕行，而不是全塌进一个点。',
      tweak: ['阻尼降到 0.9，会更干脆、更有电流感。', '把符号反过来就是斥力场——鼠标周围凭空出现一个空洞。']
    }
  },

  neondraw: {
    tags: ['Canvas 2D', 'shadowBlur', 'Pointer state'],
    en: {
      lead: 'Hold and drag to paint glowing strokes; the whole neon look is one shadowBlur setting.',
      how: 'A boolean drag flag is set on mousedown and cleared on mouseup, and mousemove returns early when it is false. Each stroke point is a filled circle with shadowBlur 22 and shadowColor set to the same hsl as the fill — that is what produces the halo. Because nothing clears the canvas, strokes accumulate like real paint.',
      tweak: ['Raise shadowBlur to 40 for a soft tube light, drop it to 4 for a laser.', 'Use lineTo between consecutive points for a continuous stroke instead of a dotted one.']
    },
    zh: {
      lead: '按住拖动就能画发光笔迹，整个霓虹感只靠一个 shadowBlur。',
      how: 'mousedown 置一个 drag 标志，mouseup 清掉，mousemove 里先判断标志再决定要不要画。每个点是一个实心圆，shadowBlur 设 22、shadowColor 设成和填充同一个 hsl——光晕就是这么来的。因为全程不清屏，笔迹会像真颜料一样叠加。',
      tweak: ['shadowBlur 调到 40 是柔光灯管，调到 4 是激光笔。', '相邻点之间用 lineTo 连起来，就从点状变成连续笔迹。']
    }
  },

  shockwave: {
    tags: ['Canvas 2D', 'Radial impulse', 'Distance falloff'],
    en: {
      lead: 'A click pushes every particle outward, and the strength depends only on how close it was to the impact.',
      how: 'For each particle the code computes the distance to the click, then applies an impulse of max(0, 200-d) * 0.15 along the normalised direction. Beyond 200px the impulse is exactly zero, which is why the wave has a visible edge instead of nudging the entire canvas. A 0.96 damping factor brings everything back to rest.',
      tweak: ['Increase 200 to 400 for a shockwave that covers the whole stage.', 'Add a brief screen shake on click to sell the impact.']
    },
    zh: {
      lead: '一次点击把每个粒子往外推，推力只取决于它离爆炸点多远。',
      how: '对每个粒子算到点击位置的距离，再沿单位方向施加 max(0, 200-d) * 0.15 的冲量。超过 200px 冲量精确为 0，所以波有明显的边界，而不是整块画布一起抖。0.96 的阻尼会把一切慢慢拉回静止。',
      tweak: ['把 200 改成 400，冲击波就能覆盖整个舞台。', '点击时叠一下屏幕震动，打击感会强很多。']
    }
  },

  ripple: {
    tags: ['DOM', 'Staggered rings', 'Opacity inverse'],
    en: {
      lead: 'Three rings per click, all centred on the same point but expanding at slightly different times.',
      how: 'Each ring starts at 10px with a 2px teal border and an absolute position translated by -50% so its centre lands on the cursor. The growth loop adds 4px per frame and sets opacity to 1 - size/300, which means the ring is fully opaque when small and invisible exactly at 300px.',
      tweak: ['Stagger the three rings with a setTimeout delay for a clear trailing effect.', 'Change the border to 1px and raise the growth step for a sharper, more technical look.']
    },
    zh: {
      lead: '每次点击生出三圈涟漪，圆心相同，只是扩散的起始时机略有差别。',
      how: '每圈从 10px 起步、2px 青色描边，绝对定位再用 translate(-50%,-50%) 把圆心对齐鼠标。扩散循环每帧加 4px，同时把透明度设成 1 - size/300，也就是刚生出时最实，到 300px 刚好完全消失。',
      tweak: ['三圈之间加一点 setTimeout 延迟，拖尾层次会更清楚。', '描边改成 1px 并加大扩散步长，会变成更锐利、更「科技感」的水波。']
    }
  },

  eyes: {
    tags: ['DOM', 'Math.atan2', 'Pupil offset'],
    en: {
      lead: 'Five pupils that track the cursor, each offset 10px along its own line of sight.',
      how: 'The trick is atan2: for every eye the code computes the angle from the eye\'s centre to the mouse, then places the pupil at cos(angle)*10 and sin(angle)*10 from its resting position. Because the offset is a fixed radius, the pupil slides around the inside of the eyeball instead of pointing at the cursor directly.',
      tweak: ['Raise the radius to 16 for a wider, more cartoonish look.', 'Add a small random jitter so the eyes occasionally glance away.']
    },
    zh: {
      lead: '五只瞳孔跟着鼠标转，各自沿视线方向偏移 10px。',
      how: '关键是 atan2：对每只眼睛算出从眼心到鼠标的角度，再把瞳孔放到 cos(角度)*10、sin(角度)*10 的位置。因为偏移半径固定，瞳孔是在眼白内侧绕圈，而不是直接指向鼠标。',
      tweak: ['半径调到 16，会更卡通、更夸张。', '加一点随机抖动，眼睛就会偶尔瞟开，显得有神。']
    }
  },

  bounce: {
    tags: ['Canvas 2D', 'Boundary reflection', 'No collision resolve'],
    en: {
      lead: 'Twelve balls that reflect off the walls — and pass straight through each other on contact.',
      how: 'The reflection is a single sign flip: if x leaves the range 0–width, vx *= -1. There is deliberately no pairwise collision resolution, which is why the balls overlap. It reads as playful rather than broken because the colours differ, so the eye does not expect solid bodies.',
      tweak: ['Add pairwise distance checks and swap velocities on contact for real billiards.', 'Give each ball a random radius and use r in the boundary test so big balls bounce earlier.']
    },
    zh: {
      lead: '十二个撞墙反弹的球——但彼此相遇时直接穿过去。',
      how: '反弹就是一次符号翻转：x 跑出 0–width 就让 vx *= -1。代码里刻意没有做两两碰撞解算，所以球会互相重叠。它看起来是俏皮而不是出错，因为颜色各不相同，眼睛不会把它们当成实心刚体。',
      tweak: ['加上两两距离检测、碰撞时交换速度，就是真的台球了。', '给球随机半径，并让边界判断用上 r，大球会提前反弹。']
    }
  },

  matrix: {
    tags: ['Canvas 2D', 'Trail fade', 'Column state'],
    en: {
      lead: 'One rain column every 14px, each with its own falling head position — the tail is just an unfinished clearing.',
      how: 'Instead of clearRect, every frame paints rgba(0,0,0,0.08) over the canvas. That leaves 8% of the previous frame, which is what creates the fading tail. A column resets to 0 only when it is past the bottom AND Math.random() beats 0.975, so the columns desynchronise almost immediately.',
      tweak: ['Raise the clear alpha to 0.2 for short stubs, lower it to 0.03 for very long tails.', 'Widen the character set with katakana or binary and the code looks different at a glance.']
    },
    zh: {
      lead: '每 14px 一列数字雨，每列有自己的下落头位置——尾巴其实是「没清干净的上一帧」。',
      how: '它不用 clearRect，而是每帧盖一层 rgba(0,0,0,0.08)。上一帧留下 8%，就形成了拖尾。一列只有在下落到画布外、且 Math.random() 大于 0.975 时才归零，所以各列几乎立刻就不齐了。',
      tweak: ['清屏透明度改成 0.2 是短促的雨点，改成 0.03 是拖很长的尾巴。', '换一套字符（片假名或纯 01），一眼看过去的风格就完全不同。']
    }
  },

  fire: {
    tags: ['Canvas 2D', 'HSLA ramp', 'Lifecycle'],
    en: {
      lead: 'Flames are just circles that shrink their hue as they age — the fire colours are a formula, not a palette.',
      how: 'Particles are emitted upward with negative vy and a slight random x drift; every frame vy increases, so they arc. The colour is hsl(20 + l*30, 100%, 50 + l*30), which means a fresh particle is bright yellow and a dying one is deep orange-red. The 0.2-alpha clear leaves a soft glow behind each flame.',
      tweak: ['Add a tiny random vy per particle so the flame flickers instead of pulsing.', 'Emit from a wider base (×120 instead of ×40) for a bonfire rather than a candle.']
    },
    zh: {
      lead: '火焰其实就是一堆会变色的圆——颜色是算出来的，不是配好的色板。',
      how: '粒子以负 vy 向上喷出，x 方向带一点随机漂移，每帧 vy 增加所以走抛物线。颜色是 hsl(20 + l*30, 100%, 50 + l*30)：刚生成时是亮黄，快熄灭时是深橙红。每帧 0.2 透明度的清屏给火苗留了一圈柔光。',
      tweak: ['给每个粒子一点随机 vy，火焰会跳动而不是整体脉动。', '发射口从 ×40 放宽到 ×120，就从烛火变成篝火。']
    }
  },

  kaleido: {
    tags: ['Canvas 2D', 'Transform stack', 'Rotational symmetry'],
    en: {
      lead: 'The same dot drawn six times with the canvas rotated 60 degrees between each — that is the entire kaleidoscope.',
      how: 'save() / translate() / rotate() / restore() is the whole mechanism: the mouse offset is expressed relative to the centre, then drawn six times at 2π/6 intervals. Because each copy uses the same source point, the pattern stays perfectly symmetric while the pointer moves.',
      tweak: ['Change the loop to 12 iterations for a denser mandala.', 'Fill the canvas each frame instead of fading it to get a crisp, non-smearing pattern.']
    },
    zh: {
      lead: '同一个点画六遍，每次把画布转 60 度——万花筒就这么点事。',
      how: 'save() / translate() / rotate() / restore() 就是全部机制：先把鼠标偏移换算成相对中心的坐标，然后按 2π/6 的间隔重复画六次。因为六份用的都是同一个源点，鼠标一动，图案整体保持严格对称。',
      tweak: ['循环改成 12 次，就变成更密的曼陀罗。', '每帧整屏清掉而不是留残影，图案会变得干净锐利。']
    }
  },

  holo: {
    tags: ['CSS', 'linear-gradient', 'Hue rotation'],
    en: {
      lead: 'A four-stop linear gradient whose angle simply keeps counting up.',
      how: 't increases by 0.5 every frame and is interpolated straight into the gradient angle. Nothing recalculates colours — the stops stay fixed while the whole band rotates, which is why the motion is smooth and costs almost nothing. It is the cheapest convincing holographic effect you can write.',
      tweak: ['Slow t to 0.15 for a subtle sheen, or speed it to 2 for a psychedelic wash.', 'Add a second gradient layer with a different speed for interference.']
    },
    zh: {
      lead: '一个四色线性渐变，角度只是不停地往上加。',
      how: 't 每帧加 0.5，直接插进渐变的 angle 里。颜色并没有重算——四个色标是固定的，转的是整条渐变带，所以既平滑又几乎不吃性能。这是最省性能、又最像全息的写法。',
      tweak: ['t 降到 0.15 是低调的金属反光，提到 2 就成了迷幻水洗。', '叠第二层速度不同的渐变，会产生干涉感。']
    }
  },

  aurora: {
    tags: ['DOM', 'blur filter', 'Sine drift'],
    en: {
      lead: 'Three heavily blurred circles drifting upward — the aurora form comes from the blur, not from the shapes.',
      how: 'Each blob is a 300px circle with filter: blur(60px) and 0.6 opacity, so the edges vanish entirely. Position is driven by x += sin(y/30) and y += 0.5, which produces a lazy diagonal wander; when y passes 300 it snaps back to 0, and the blur hides the jump completely.',
      tweak: ['Raise the blur to 90px for an even softer, more atmospheric wash.', 'Change the three blob colours to analogues (all blues) for a colder polar sky.']
    },
    zh: {
      lead: '三个重度模糊的圆往上飘——极光的形状是 blur 给的，不是图形本身。',
      how: '每个光团是 300px 的圆，filter: blur(60px) 加 0.6 透明度，边缘因此彻底消失。位置靠 x += sin(y/30)、y += 0.5 驱动，走出懒散的斜向漂移；y 过 300 就跳回 0，而模糊把这一下瞬移完全藏住了。',
      tweak: ['blur 提到 90px，会更虚、更有大气感。', '三个颜色改成同类色（都用蓝），就是极地的冷调天空。']
    }
  },

  cube: {
    tags: ['CSS 3D', 'transform-style', 'Keyframes'],
    en: {
      lead: 'Six divs, one shared keyframe, zero JavaScript — a rotating cube built entirely from transforms.',
      how: 'The parent has transform-style: preserve-3d so its children keep their own 3D space. Each face is a square pushed out by translateZ(50px) after being rotated into position: rotateY(90deg) for the sides, rotateX(90deg) for top and bottom. The animation rotates X and Y by 360 degrees together, which is why the spin looks tumbling rather than axial.',
      tweak: ['Animate only rotateY for a record-player spin instead of a tumble.', 'Add a subtle box-shadow to each face so the seams catch the eye as it turns.']
    },
    zh: {
      lead: '六个 div、一个共享关键帧、零 JavaScript——纯 transform 拼出来的旋转立方体。',
      how: '父级设 transform-style: preserve-3d，子元素才会保留各自的 3D 空间。每个面先转到朝向后用 translateZ(50px) 推出去：侧面是 rotateY(90deg)，上下是 rotateX(90deg)。动画同时把 X 和 Y 各转 360 度，所以看起来是翻滚，而不是绕轴自转。',
      tweak: ['只转 rotateY，就变成唱片式的自转。', '给每个面加一点 box-shadow，翻转时棱角会更清楚。']
    }
  },

  glitch: {
    tags: ['CSS', 'pseudo-elements', 'attr()'],
    en: {
      lead: 'Two copies of the text stacked on the original, each shaking on its own offset keyframe.',
      how: '::before and ::after both pull their content from attr(data-t), so the text exists once in markup but renders three times. One copy is pink and runs the shake animation forward, the other is teal and runs it in reverse — the mismatch between them is what reads as a signal fault.',
      tweak: ['Raise the translate values from 3px to 8px for a much more violent glitch.', 'Add a clip-path band to one copy so only a horizontal slice jitters, like a dropped scanline.']
    },
    zh: {
      lead: '文字叠了两层副本，各自跑一份错位的抖动关键帧。',
      how: '::before 和 ::after 都用 attr(data-t) 取内容，所以文案在 HTML 里只写一次、却渲染三遍。一层粉色正向播抖动，一层青色反向播——两层错位的那一点，就是「信号故障」的来源。',
      tweak: ['位移从 3px 加到 8px，故障感会猛烈得多。', '给其中一层加 clip-path 只留一条横带，就只有一条扫描线在抖，更像掉帧。']
    }
  },

  typewriter: {
    tags: ['DOM', 'String slice', 'setTimeout'],
    en: {
      lead: 'A cursor character appended to a growing slice of the string, one character every 120ms.',
      how: 'The whole effect is s.slice(0, i) plus a block character. It uses setTimeout rather than setInterval so that later you can vary the delay per character — punctuation can pause longer than letters, which is the difference between typing and machined output.',
      tweak: ['Give punctuation a 3× delay for a natural typing rhythm.', 'Add a small chance of a backspace so it feels like a human correcting itself.']
    },
    zh: {
      lead: '一个不断变长的字符串切片，后面缀一个光标字符，每 120ms 长一个字。',
      how: '整个效果就是 s.slice(0, i) 加一个方块光标。用的是 setTimeout 而不是 setInterval，这样以后可以按字符调整间隔——标点停久一点，才像人在打字，而不是机器在输出。',
      tweak: ['标点符号给 3 倍延迟，节奏立刻自然起来。', '加一点小概率的退格，就像人打错字又改回来。']
    }
  },

  neontext: {
    tags: ['CSS', 'text-shadow layers', 'Keyframes'],
    en: {
      lead: 'Neon is three stacked text-shadows at increasing blur and decreasing intensity.',
      how: 'The base state uses 10px, 20px and 40px pink shadows on top of each other; the midpoint of the keyframe swaps all three to teal and pushes them out further. Layering rather than a single big blur is what creates the tube-plus-halo look of real signage.',
      tweak: ['Add a fourth, very tight shadow (2px, white) to simulate the hot filament.', 'Keep the flicker irregular by using a steps() timing function instead of ease-in-out.']
    },
    zh: {
      lead: '霓虹感的本质是三层 text-shadow 叠加：模糊半径递增、亮度递减。',
      how: '初始状态同时挂 10px、20px、40px 三层粉色投影；关键帧中点把三层整体换成青色并推得更远。之所以要分层而不是用一个大模糊，就是为了同时做出「灯管」和「光晕」两种质感。',
      tweak: ['再加一层 2px 的白色紧贴投影，模拟灯丝的高光。', '把缓动换成 steps()，闪烁会变得不规则，更像坏掉的招牌。']
    }
  },

  gradienttext: {
    tags: ['CSS', 'background-clip:text', 'Animated gradient'],
    en: {
      lead: 'A gradient painted onto the background, then clipped to the shape of the glyphs.',
      how: 'background-clip: text with color: transparent makes the text a window onto its own background. The background is 300% wide and slides its position from 0 to 300%, so the visible colour band travels across the letters. The 300% is essential — at 100% there would be nothing to slide through.',
      tweak: ['Use background-size: 500% for a slower, more gradual sweep.', 'Change the angle from 90deg to 45deg for diagonal light.']
    },
    zh: {
      lead: '把渐变画在背景上，再裁剪成字的形状。',
      how: 'background-clip: text 配合 color: transparent，等于让文字变成自己背景上的一个窗口。背景宽度是 300%，位置从 0 滑到 300%，可见的色带就从字上横扫过去。300% 这个值很关键——只有 100% 的话根本没有可滑的余量。',
      tweak: ['background-size 改成 500%，扫光会变慢、更从容。', '角度从 90deg 换成 45deg，就是斜射的光。']
    }
  },

  meteors: {
    tags: ['Canvas 2D', 'Line segments', 'Angle spread'],
    en: {
      lead: 'Each meteor is a line from its head back along its own velocity vector.',
      how: 'The trail is not a stored path — it is a single lineTo computed as head minus direction times length, so a meteor is always exactly one straight segment. Angles cluster around 60 degrees with a small random spread, which is why the shower looks coherent. The list is filtered each frame to drop anything that has left the bottom.',
      tweak: ['Widen the angle spread to 0.4 rad for a scattered shower, or tighten it to 0.05 for a meteor storm.', 'Randomise lineWidth per meteor to fake depth.']
    },
    zh: {
      lead: '每颗流星就是一条线：从头沿自己的速度方向往回画。',
      how: '拖尾不是记录的历史轨迹，而是用「头部 − 方向 × 长度」一次算出来的 lineTo，所以流星永远是一条直线段。角度集中在 60 度附近、带一点点随机偏移，整场雨才会有统一的走向。每帧过滤掉飞出底部的流星。',
      tweak: ['角度随机范围放宽到 0.4 弧度是散乱的流星雨，收到 0.05 就是流星暴。', '给每颗随机 lineWidth，能伪造出远近层次。']
    }
  },

  blackhole: {
    tags: ['Canvas 2D', 'Polar spiral', 'Respawn'],
    en: {
      lead: 'Two hundred particles whose radius shrinks by 1% per frame while their angle keeps advancing.',
      how: 'r *= 0.99 is a geometric decay, so a particle covers the same *proportion* of remaining distance each frame — that is what makes the infall accelerate visually without an explicit force. Brightness is tied to radius (Math.min(80, p.r)), so particles glow brighter as they get closer, then respawn at r=250.',
      tweak: ['Use r *= 0.97 for an aggressive, violent collapse.', 'Randomise the decay per particle so the stream looks ragged instead of uniform.']
    },
    zh: {
      lead: '两百个粒子，半径每帧缩 1%，角度持续前进。',
      how: 'r *= 0.99 是几何衰减，意味着每帧吞掉的是「剩余距离的固定比例」——不用写任何力，下落感自己就加速了。亮度绑定在半径上（Math.min(80, p.r)），越靠近中心越亮，缩到 4 就在 r=250 处重生。',
      tweak: ['改成 r *= 0.97，会变成暴烈的塌缩。', '每个粒子的衰减率做成随机，粒子流就不均匀，看起来更毛躁。']
    }
  },

  constellation: {
    tags: ['Canvas 2D', 'Pairwise distance', 'Alpha by proximity'],
    en: {
      lead: 'Fifty nodes, and every pair closer than 90px gets a line whose opacity is the distance itself.',
      how: 'Two nested loops over the node array give the O(n²) pair pass — fine at 50 nodes, visibly slow at 500. Line alpha is 1 - d/90, so lines fade in continuously as nodes approach rather than popping at a threshold. The mouse is tracked but unused in the base version, which is the obvious hook for interactivity.',
      tweak: ['Link each node to the mouse as an extra edge for a stronger sense of touch.', 'Raise the threshold to 140px and reduce the node count to keep the line count sane.']
    },
    zh: {
      lead: '五十个节点，距离小于 90px 的两两之间连一条线，透明度直接用距离算。',
      how: '两层嵌套循环做 O(n²) 配对——50 个节点没问题，500 个就会肉眼可见地卡。线的不透明度是 1 - d/90，所以线是随距离连续淡入的，而不是踩到一个阈值突然出现。基础版里鼠标坐标取了但没用，这正是加交互的现成接口。',
      tweak: ['把鼠标也当成一个节点连进去，触碰感会强很多。', '阈值提到 140px 时记得降节点数，否则线会糊成一片。']
    }
  },

  laser: {
    tags: ['Canvas 2D', 'Perspective projection', 'Modulo loop'],
    en: {
      lead: 'Horizontal lines that get closer together as they approach the horizon — a fake 3D floor made of one loop.',
      how: 'Each line\'s depth z cycles 0–800 via modulo, and the projected position uses 300/(z+1): as z grows the value collapses toward zero, squeezing lines against the horizon. The vertical fan is drawn separately with fixed angles, so only the horizontal rungs actually move.',
      tweak: ['Change 300 to 800 for a flatter, more distant horizon.', 'Add glow on every eighth rung to suggest a lit runway.']
    },
    zh: {
      lead: '横线越靠近地平线越密——一个循环就够了，是假 3D 地面。',
      how: '每条线的深度 z 用取模在 0–800 之间循环，投影位置用 300/(z+1)：z 越大结果越趋近 0，横线就被挤向地平线。纵向的扇形是另画一遍、角度固定的，所以真正在动的只有横向的踏板。',
      tweak: ['300 改成 800，地平线会更远、更平。', '每第八条横线加发光，就像一条点亮的跑道。']
    }
  },

  lightning: {
    tags: ['Canvas 2D', 'Random walk', 'Probability gate'],
    en: {
      lead: 'A bolt is a random walk downward in 15px steps, redrawn from scratch every frame.',
      how: 'The branch is generated by stepping y by 15 and nudging x by a random ±20. Because a new bolt is only created when Math.random() < 0.08, the strikes feel sporadic rather than metronomic. The bolt is drawn once and immediately discarded — the lingering afterglow comes from the 0.2-alpha clear.',
      tweak: ['Reduce the step to 6px for a more detailed, jagged bolt.', 'Draw the bolt 2–3 times with slight offsets during the same strike to simulate branch forks.']
    },
    zh: {
      lead: '闪电就是一路向下、每 15px 随机偏移一点的随机游走，而且是每帧重新画的。',
      how: '分支的生成方式是 y 每次加 15、x 随机偏移 ±20。只有 Math.random() < 0.08 时才生成新闪电，所以劈下来的节奏是偶发的，不是节拍器。闪电画完就丢，眼里看到的余辉来自 0.2 透明度的清屏。',
      tweak: ['步长缩到 6px，闪电会更细碎、更毛刺。', '同一次闪电错位画 2–3 遍，就能模拟出分叉。']
    }
  },

  wave: {
    tags: ['Canvas 2D', 'Sine', 'Phase offset'],
    en: {
      lead: 'Three sine waves, each offset in phase and amplitude, sampled every pixel across the canvas.',
      how: 'The y coordinate is sin(i*0.02 + t + w)*30*(1 + w*0.3) — the w terms shift both phase and amplitude, so the three lines never overlap for long. Sampling at every pixel rather than every 10px is what makes the curve smooth without any interpolation.',
      tweak: ['Lower the 0.02 frequency for long rolling swells.', 'Add a vertical offset per wave so they stack instead of interleaving.']
    },
    zh: {
      lead: '三条正弦波，相位和振幅各不相同，每个像素采样一次。',
      how: 'y 坐标是 sin(i*0.02 + t + w)*30*(1 + w*0.3)：w 同时参与相位和振幅，所以三条线不会长时间重合。逐像素采样（而不是每 10px 取一点）是曲线看起来平滑、又不需要任何插值的原因。',
      tweak: ['频率 0.02 降下来，就是缓慢起伏的大浪。', '给每条波一个纵向基线偏移，它们会分层叠起来，而不是缠在一起。']
    }
  }

};
