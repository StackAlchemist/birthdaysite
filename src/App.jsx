import React, { useState, useEffect, useRef } from "react";
import img1 from '/img/IMG_4898.JPG'
import img2 from '/img/IMG_4905.JPG'
import img3 from '/img/pasproblem.jpeg'
import vid1 from '/vid1.mp4'
import vid2 from '/vid2.mp4'
import vid3 from '/vid3.mp4'

const FONT_LINK = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Dancing+Script:wght@400;700&display=swap";

const GLOBAL_CSS = `
  @import url('${FONT_LINK}');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html, body, #root { width:100%; min-height:100%; }
  :root {
    --rose:#f9a8c9; --deep-rose:#e0507a; --blush:#fce4ec;
    --petal:#ffd6e7; --magenta:#c2185b; --cream:#fff5f8;
    --gold:#f4c04d; --text:#3a1a28; --muted:#9e6d82;
  }
  .bd-body { font-family:'Cormorant Garamond',serif; background:var(--cream); color:var(--text); overflow-x:hidden; cursor:none; width:100%; }
  @media (hover:none) and (pointer:coarse) { .bd-body{cursor:auto;} .bd-cursor{display:none!important;} }

  .bd-cursor { position:fixed; top:0; left:0; z-index:9999; pointer-events:none; mix-blend-mode:multiply; }
  .bd-cursor-dot  { width:10px; height:10px; background:var(--deep-rose); border-radius:50%; position:absolute; transform:translate(-50%,-50%); }
  .bd-cursor-ring { width:36px; height:36px; border:2px solid var(--rose); border-radius:50%; position:absolute; transform:translate(-50%,-50%); transition:transform .35s ease; }

  .bd-petals-wrap { position:fixed; inset:0; pointer-events:none; z-index:0; overflow:hidden; }
  .bd-petal { position:absolute; top:-60px; border-radius:50% 0 50% 0; opacity:0; animation:bdFall linear infinite; }
  @keyframes bdFall { 0%{opacity:0;transform:translateY(0) rotate(0deg) scale(.7)} 5%{opacity:.85} 90%{opacity:.6} 100%{opacity:0;transform:translateY(110vh) rotate(720deg) scale(1.1)} }

  .bd-wave { width:100%; overflow:hidden; line-height:0; display:block; position:relative; z-index:2; }
  .bd-wave svg { display:block; width:100%; height:70px; }

  /* gate */
  .bd-gate { position:fixed; inset:0; z-index:999999; background:linear-gradient(135deg,#2d0a17 0%,#5a1030 50%,#2d0a17 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:2rem; transition:opacity 1.4s ease; }
  .bd-gate.hidden { opacity:0; pointer-events:none; }
  .bd-gate-box { background:rgba(255,255,255,.1); backdrop-filter:blur(12px); border:1.5px solid rgba(249,168,201,.3); border-radius:20px; padding:1.4rem 1.8rem; min-width:90px; text-align:center; }
  .bd-gate-num { font-family:'Playfair Display',serif; font-size:clamp(2.4rem,6vw,4rem); font-weight:700; color:#fff; line-height:1; }
  .bd-gate-lbl { font-size:.7rem; letter-spacing:.2em; text-transform:uppercase; color:rgba(249,168,201,.75); margin-top:.4rem; }

  /* hero */
  #bd-hero { min-height:100vh; width:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:2rem; position:relative; z-index:1;
    background:radial-gradient(ellipse 80% 60% at 50% 0%,#ffd6e7aa,transparent 65%),radial-gradient(ellipse 60% 40% at 80% 100%,#f9a8c960,transparent 60%),radial-gradient(ellipse 50% 50% at 10% 80%,#fce4ec80,transparent 55%),var(--cream); }
  #bd-hero::before { content:''; position:absolute; inset:0; pointer-events:none;
    background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23f9a8c9' fill-opacity='0.09'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }
  .bd-hero-eyebrow  { font-family:'Dancing Script',cursive; font-size:clamp(1.1rem,3vw,1.6rem); color:var(--deep-rose); letter-spacing:.08em; opacity:0; animation:bdFadeUp .9s .3s ease forwards; }
  .bd-hero-title    { font-family:'Playfair Display',serif; font-size:clamp(3.2rem,10vw,8rem); font-weight:700; line-height:1.05; background:linear-gradient(135deg,#e0507a,#f9a8c9 40%,#c2185b 70%,#f472b6); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; opacity:0; animation:bdFadeUp .9s .55s ease forwards; }
  .bd-hero-subtitle { font-size:clamp(1.2rem,3vw,1.8rem); font-style:italic; color:var(--muted); margin-top:.6rem; opacity:0; animation:bdFadeUp .9s .8s ease forwards; }
  .bd-hero-date     { margin-top:2rem; font-family:'Playfair Display',serif; font-size:clamp(1rem,2.5vw,1.4rem); letter-spacing:.25em; color:var(--deep-rose); text-transform:uppercase; opacity:0; animation:bdFadeUp .9s 1s ease forwards; }
  .bd-hero-heart    { font-size:3.5rem; display:block; margin:2rem auto 0; animation:bdHeartbeat 1.4s ease-in-out infinite, bdFadeUp .9s 1.2s ease forwards; opacity:0; }
  @keyframes bdHeartbeat { 0%,100%{transform:scale(1)} 14%{transform:scale(1.18)} 28%{transform:scale(1)} 42%{transform:scale(1.12)} 56%{transform:scale(1)} }
  .bd-scroll-hint { position:absolute; bottom:2.5rem; display:flex; flex-direction:column; align-items:center; gap:.4rem; opacity:0; animation:bdFadeUp .9s 1.5s ease forwards; color:var(--muted); font-size:.85rem; letter-spacing:.1em; }
  .bd-scroll-arrow { animation:bdBounce 1.8s infinite ease; font-size:1.2rem; }
  @keyframes bdBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
  @keyframes bdFadeUp  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }

  /* sections */
  .bd-section { position:relative; z-index:1; padding:5rem 1.5rem; width:100%; }
  .bd-section-label { font-family:'Dancing Script',cursive; font-size:1.2rem; color:var(--deep-rose); display:block; text-align:center; margin-bottom:.4rem; opacity:0; transform:translateY(20px); transition:opacity .7s,transform .7s; }
  .bd-section-title { font-family:'Playfair Display',serif; font-size:clamp(2rem,5vw,3.2rem); text-align:center; margin-bottom:3rem; color:var(--text); opacity:0; transform:translateY(20px); transition:opacity .7s .15s,transform .7s .15s; }
  .bd-in-view .bd-section-label, .bd-in-view .bd-section-title { opacity:1; transform:translateY(0); }

  /* letter */
  .bd-letter-scene { max-width:640px; margin:0 auto; opacity:0; transform:translateY(36px); transition:opacity .8s .3s,transform .8s .3s; }
  .bd-in-view .bd-letter-scene { opacity:1; transform:translateY(0); }
  .bd-paper-sealed { display:flex; flex-direction:column; align-items:center; cursor:pointer; transition:transform .3s; }
  .bd-paper-sealed:hover { transform:translateY(-6px); }
  .bd-fold-top { width:88%; max-width:460px; height:58px; background:linear-gradient(160deg,#fffaf9,#fef0ec); border-radius:10px 10px 0 0; border:1.5px solid #e8c0cc; border-bottom:none; box-shadow:0 -4px 20px rgba(224,80,122,.07); }
  .bd-fold-body { width:96%; max-width:510px; background:repeating-linear-gradient(transparent,transparent 27px,#f5d8e0 27px,#f5d8e0 28px),linear-gradient(170deg,#fffefa,#fff8f5); border:1.5px solid #e8c0cc; border-top:none; border-radius:0 0 12px 12px; padding:2.5rem 2.5rem 5rem; position:relative; box-shadow:0 18px 60px rgba(224,80,122,.12),0 4px 16px rgba(249,168,201,.18); min-height:200px; display:flex; align-items:center; justify-content:center; }
  .bd-fold-body::before { content:''; position:absolute; left:54px; top:0; bottom:0; width:1px; background:rgba(224,80,122,.18); }
  .bd-fold-centre-text { text-align:center; position:relative; z-index:2; font-family:'Dancing Script',cursive; font-size:1.3rem; color:var(--muted); font-style:italic; }
  .bd-wax-wrap { position:absolute; bottom:-44px; left:50%; transform:translateX(-50%); z-index:10; filter:drop-shadow(0 8px 22px rgba(194,24,91,.5)); cursor:pointer; }
  .bd-seal-float { animation:bdSealFloat 3.2s ease-in-out infinite; }
  @keyframes bdSealFloat { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-6px)} }
  .bd-seal-pulse { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:92px; height:92px; border-radius:50%; border:2px solid rgba(194,24,91,.45); animation:bdPRing 2.2s ease-out infinite; pointer-events:none; }
  @keyframes bdPRing { 0%{transform:translate(-50%,-50%) scale(1);opacity:.7} 100%{transform:translate(-50%,-50%) scale(1.65);opacity:0} }
  .bd-seal-hint { margin-top:3rem; font-family:'Dancing Script',cursive; font-size:1.05rem; color:var(--muted); letter-spacing:.08em; font-style:italic; animation:bdHintPulse 2.5s ease-in-out infinite; }
  @keyframes bdHintPulse { 0%,100%{opacity:.55} 50%{opacity:1} }
  .bd-paper-open { border-radius:12px; overflow:hidden; box-shadow:0 24px 80px rgba(224,80,122,.14),0 6px 20px rgba(249,168,201,.22); animation:bdUnfold .7s cubic-bezier(.34,1.56,.64,1) both; }
  @keyframes bdUnfold { 0%{opacity:0;transform:scaleY(.08) translateY(-40px)} 65%{opacity:1;transform:scaleY(1.03)} 100%{opacity:1;transform:scaleY(1) translateY(0)} }
  .bd-open-paper { background:repeating-linear-gradient(transparent,transparent 30px,#efd0dc 30px,#efd0dc 31px),linear-gradient(165deg,#fffefa,#fff8f6); border:1.5px solid #e0c0cc; border-radius:12px; padding:3rem 3.5rem 3rem 4.5rem; position:relative; }
  .bd-open-paper::before { content:''; position:absolute; left:3rem; top:0; bottom:0; width:1.5px; background:rgba(224,80,122,.22); }
  .bd-letter-deco-top { display:flex; align-items:center; justify-content:center; gap:.7rem; margin-bottom:1.8rem; font-size:.88rem; color:var(--rose); letter-spacing:.12em; }
  .bd-dl { flex:1; height:1px; background:linear-gradient(90deg,transparent,var(--rose)); }
  .bd-dr { flex:1; height:1px; background:linear-gradient(90deg,var(--rose),transparent); }
  .bd-letter-salutation { font-family:'Playfair Display',serif; font-size:clamp(1.2rem,2.5vw,1.5rem); font-style:italic; color:var(--deep-rose); margin-bottom:1.4rem; display:block; }
  .bd-open-paper p { font-size:clamp(1rem,2vw,1.17rem); line-height:2; color:#4a2030; margin-bottom:1.2rem; position:relative; z-index:1; }
  .bd-letter-break   { font-family:'Playfair Display',serif; font-size:clamp(1.1rem,2.2vw,1.3rem)!important; font-style:italic; color:var(--deep-rose); margin:1.4rem 0!important; }
  .bd-letter-aside   { font-style:italic; color:var(--muted); font-size:clamp(.93rem,1.8vw,1.06rem)!important; }
  .bd-letter-closing { font-family:'Playfair Display',serif; font-size:clamp(1.15rem,2.3vw,1.38rem)!important; font-weight:700; color:var(--deep-rose); margin:1.4rem 0 .6rem!important; }
  .bd-letter-sig     { font-family:'Dancing Script',cursive; font-size:clamp(1.7rem,4vw,2.3rem); color:var(--deep-rose); display:block; margin-top:1.6rem; }
  .bd-close-btn { display:block; width:100%; margin-top:1.5rem; background:none; border:1.5px solid var(--rose); color:var(--deep-rose); border-radius:40px; padding:.65rem 2rem; font-family:'Cormorant Garamond',serif; font-size:1rem; font-style:italic; letter-spacing:.08em; cursor:pointer; transition:all .25s; }
  .bd-close-btn:hover { background:var(--rose); color:#fff; }

  /* ── POLAROID PHOTO GRID ── */
  .bd-photo-grid {
    display:grid;
    grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));
    gap:3rem 2.5rem;
    max-width:1100px;
    margin:0 auto;
    padding:1.5rem 1rem 2rem;
  }

  .bd-polaroid-wrap {
    position:relative;
    opacity:0;
    transform:translateY(60px) rotate(var(--tilt, 0deg)) scale(0.92);
    transition:opacity .7s ease, transform .7s cubic-bezier(.34,1.56,.64,1);
  }
  .bd-polaroid-wrap.bd-card-visible {
    opacity:1;
    transform:translateY(0) rotate(var(--tilt, 0deg)) scale(1);
  }
  .bd-polaroid-wrap:nth-child(1).bd-card-visible { transition-delay:0s; }
  .bd-polaroid-wrap:nth-child(2).bd-card-visible { transition-delay:0.15s; }
  .bd-polaroid-wrap:nth-child(3).bd-card-visible { transition-delay:0.3s; }
  .bd-polaroid-wrap:hover {
    transform:translateY(-10px) rotate(0deg) scale(1.04) !important;
    z-index:10;
  }

  /* tape strip on top */
  .bd-polaroid-wrap::before {
    content:'';
    position:absolute;
    top:-14px; left:50%;
    transform:translateX(-50%);
    width:44px; height:22px;
    background:rgba(249,168,201,.5);
    border-radius:3px;
    box-shadow:0 1px 4px rgba(0,0,0,.1);
    z-index:2;
  }

  .bd-polaroid {
    background:#fff;
    padding:12px 12px 52px;
    box-shadow:0 4px 12px rgba(58,26,40,.14), 0 12px 40px rgba(58,26,40,.1);
    border-radius:2px;
    position:relative;
  }
  .bd-polaroid-img-wrap {
    width:100%;
    overflow:hidden;
    background:#f0e0e8;
    line-height:0;
  }
  .bd-polaroid-img-wrap img {
    width:100%;
    height:300px;
    object-fit:cover;
    display:block;
    filter:sepia(6%) saturate(105%) brightness(102%);
    transition:transform .4s ease;
  }
  .bd-polaroid-wrap:hover   .bd-polaroid-img-wrap img {
    transform:scale(1.04);
  }
  .bd-polaroid-placeholder {
    width:100%; height:100%;
    display:flex; flex-direction:column;
    align-items:center; justify-content:center; gap:.6rem;
    background:linear-gradient(135deg,#fff0f5,#fce4ec);
  }
  .bd-polaroid-caption {
    position:absolute; bottom:0; left:0; right:0; height:52px;
    display:flex; align-items:center; justify-content:center;
    font-family:'Dancing Script',cursive;
    font-size:1.05rem; color:var(--muted);
    padding:0 10px; text-align:center;
  }

  /* ── REEL VIDEO GRID ── */
  .bd-video-grid {
    display:flex;
    justify-content:center;
    gap:1.2rem;
    max-width:1100px;
    margin:0 auto;
    flex-wrap:wrap;
  }
  .bd-reel-slot {
    position:relative;
    width:280px;
    aspect-ratio:9/16;
    border-radius:18px;
    overflow:hidden;
    background:#1a0a10;
    box-shadow:0 8px 32px rgba(58,26,40,.35);
    cursor:pointer;
    flex-shrink:0;
  }
  .bd-reel-slot:hover { box-shadow:0 16px 48px rgba(224,80,122,.4); }
  .bd-reel-gradient {
    position:absolute; bottom:0; left:0; right:0; height:45%;
    background:linear-gradient(to top, rgba(20,5,12,.85) 0%, transparent 100%);
    pointer-events:none; z-index:2;
  }
  .bd-reel-play-overlay {
    position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
    z-index:3; transition:opacity .2s ease; background:rgba(0,0,0,.15);
  }
  .bd-reel-play-btn {
    width:56px; height:56px; border-radius:50%;
    background:rgba(255,255,255,.25); backdrop-filter:blur(6px);
    border:2px solid rgba(255,255,255,.5);
    display:flex; align-items:center; justify-content:center;
    font-size:1.4rem; color:#fff; padding-left:4px;
  }
  .bd-reel-bar {
    position:absolute; bottom:0; left:0; right:0;
    padding:.8rem 1rem; z-index:4;
    display:flex; align-items:center; justify-content:space-between;
  }
  .bd-reel-label {
    font-family:'Dancing Script',cursive; font-size:1rem;
    color:rgba(255,255,255,.9); letter-spacing:.04em;
    text-shadow:0 1px 4px rgba(0,0,0,.5);
  }
  .bd-reel-mute-btn {
    background:rgba(255,255,255,.15); backdrop-filter:blur(4px);
    border:1px solid rgba(255,255,255,.25); border-radius:50%;
    width:34px; height:34px; font-size:.95rem;
    cursor:pointer; color:#fff; display:flex; align-items:center; justify-content:center;
    transition:background .2s;
  }
  .bd-reel-mute-btn:hover { background:rgba(249,168,201,.4); }
  .bd-slot-placeholder { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:.8rem; pointer-events:none; }
  .bd-ph-icon { font-size:2.8rem; opacity:.45; }
  .bd-ph-text { font-style:italic; color:var(--muted); font-size:.95rem; text-align:center; padding:0 1.2rem; }

  /* countdown */
  #bd-countdown { background:linear-gradient(135deg,#e0507a,#f9a8c9 50%,#c2185b); padding:5rem 1.5rem; text-align:center; position:relative; overflow:hidden; z-index:1; width:100%; }
  #bd-countdown::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 30% 50%,rgba(255,255,255,.12),transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(255,255,255,.08),transparent 50%); }
  #bd-countdown .bd-section-title { color:white; }
  #bd-countdown .bd-section-label { color:rgba(255,255,255,.85); }
  .bd-countdown-grid { display:flex; justify-content:center; gap:clamp(.6rem,3vw,2rem); flex-wrap:wrap; margin-top:2rem; }
  .bd-count-box { background:rgba(255,255,255,.18); backdrop-filter:blur(12px); border:1.5px solid rgba(255,255,255,.35); border-radius:20px; padding:1.3rem 1.6rem; min-width:88px; opacity:0; transform:scale(.85); transition:opacity .6s,transform .6s; }
  .bd-in-view .bd-count-box { opacity:1; transform:scale(1); }
  .bd-count-box.bd-years-box { background:rgba(255,255,255,.28); border-color:rgba(255,255,255,.55); }
  .bd-in-view .bd-count-box.bd-years-box { transform:scale(1.06); }
  .bd-count-num { font-family:'Playfair Display',serif; font-size:clamp(2rem,5vw,3.4rem); font-weight:700; color:white; line-height:1; }
  .bd-count-box.bd-years-box .bd-count-num { font-size:clamp(2.6rem,6vw,4.2rem); }
  .bd-count-label { font-size:.75rem; letter-spacing:.18em; text-transform:uppercase; color:rgba(255,255,255,.8); margin-top:.4rem; }

  /* wishes */
  .bd-wishes-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(250px,1fr)); gap:1.5rem; max-width:1100px; margin:0 auto; }
  .bd-wish-card { background:white; border-radius:24px; padding:2rem 1.8rem; box-shadow:0 4px 30px #f9a8c918; border-top:4px solid var(--rose); opacity:0; transform:translateY(24px); transition:opacity .6s,transform .6s,box-shadow .35s; }
  .bd-wish-card.bd-card-visible { opacity:1; transform:translateY(0); }
  .bd-wish-card:hover { box-shadow:0 12px 50px #e0507a22; transform:translateY(-4px); }
  .bd-wish-emoji { font-size:2.2rem; margin-bottom:.8rem; display:block; }
  .bd-wish-text  { font-size:1.05rem; line-height:1.8; color:#5a2035; font-style:italic; }

  /* footer */
  .bd-footer { background:var(--text); text-align:center; padding:3rem 1.5rem; color:var(--rose); width:100%; }
  .bd-footer-title { font-family:'Dancing Script',cursive; font-size:clamp(2rem,5vw,3rem); margin-bottom:.8rem; }
  .bd-footer-sub   { font-size:.95rem; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); }
  .bd-footer-hearts { display:flex; justify-content:center; gap:.5rem; margin-top:1.5rem; font-size:1.4rem; }
  .bd-footer-hearts span { animation:bdHeartbeat 1.6s ease-in-out infinite; }
  .bd-footer-hearts span:nth-child(2){animation-delay:.2s} .bd-footer-hearts span:nth-child(3){animation-delay:.4s}
  .bd-footer-hearts span:nth-child(4){animation-delay:.6s} .bd-footer-hearts span:nth-child(5){animation-delay:.8s}

  .bd-confetti { position:fixed; border-radius:2px; pointer-events:none; z-index:8888; animation:bdConfettiFall linear forwards; }
  @keyframes bdConfettiFall { 0%{opacity:1} 100%{opacity:0;transform:translateY(100vh) rotate(720deg)} }
  .bd-sparkle { position:fixed; pointer-events:none; z-index:9998; width:6px; height:6px; border-radius:50%; animation:bdSparkleOut .6s ease forwards; }
  @keyframes bdSparkleOut { 0%{opacity:1;transform:scale(1)} 100%{opacity:0;transform:scale(0) translateY(-20px)} }

  /* ── Music prompt ── */
  .bd-music-prompt {
    position:fixed; bottom:1.8rem; left:50%; transform:translateX(-50%);
    z-index:9000; pointer-events:none;
    display:flex; align-items:center; gap:.6rem;
    background:rgba(255,255,255,0.18);
    backdrop-filter:blur(14px);
    border:1.5px solid rgba(249,168,201,.5);
    border-radius:40px;
    padding:.65rem 1.4rem;
    box-shadow:0 8px 32px rgba(224,80,122,.18);
    animation:bdMusicFloat 2.2s ease-in-out infinite;
    white-space:nowrap;
  }
  .bd-music-prompt-icon { font-size:1.2rem; animation:bdHeartbeat 1.4s ease-in-out infinite; }
  .bd-music-prompt-text {
    font-family:'Dancing Script',cursive;
    font-size:1rem; color:var(--deep-rose);
    letter-spacing:.05em;
  }
  .bd-music-prompt.hiding {
    animation:bdMusicFadeOut .5s ease forwards;
  }
  @keyframes bdMusicFloat {
    0%,100% { transform:translateX(-50%) translateY(0); }
    50%      { transform:translateX(-50%) translateY(-5px); }
  }
  @keyframes bdMusicFadeOut {
    to { opacity:0; transform:translateX(-50%) translateY(10px); }
  }

  .bd-editor-panel { display:none; position:fixed; bottom:0; left:0; right:0; z-index:99999; background:linear-gradient(135deg,#2d0a17,#5a1030); color:#fff; padding:.9rem 1.5rem; box-shadow:0 -4px 30px rgba(0,0,0,.45); align-items:center; gap:1rem; flex-wrap:wrap; font-family:'Cormorant Garamond',serif; }
  .bd-editor-active .bd-editor-panel { display:flex; }
  .bd-ep-badge { background:var(--deep-rose); color:#fff; padding:.28rem .85rem; border-radius:20px; font-size:.78rem; letter-spacing:.1em; text-transform:uppercase; font-weight:700; white-space:nowrap; }
  .bd-ep-info  { flex:1; font-style:italic; font-size:.98rem; color:rgba(255,255,255,.75); min-width:160px; }
  .bd-ep-btn { border:none; border-radius:12px; padding:.55rem 1.3rem; font-size:.95rem; cursor:pointer; font-family:'Cormorant Garamond',serif; letter-spacing:.05em; transition:transform .2s,opacity .2s; white-space:nowrap; }
  .bd-ep-btn:hover { transform:translateY(-2px); opacity:.9; }
  .bd-ep-btn-exit { background:rgba(255,255,255,.15); color:#fff; }
`;

const WaxSeal = ({ id = "sg", size = 92, text = "Susan" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id={id} cx="38%" cy="32%">
        <stop offset="0%" stopColor="#f06292"/>
        <stop offset="50%" stopColor="#c2185b"/>
        <stop offset="100%" stopColor="#7b003c"/>
      </radialGradient>
    </defs>
    <path d="M50,3 C58,3 68,8 76,16 C85,25 92,38 92,50 C92,63 85,76 76,84 C68,92 58,97 50,97 C42,97 32,92 24,84 C15,76 8,63 8,50 C8,38 15,25 24,16 C32,8 42,3 50,3Z" fill={`url(#${id})`}/>
    {size > 50 && <>
      <circle cx="28" cy="28" r="4" fill="rgba(255,255,255,.07)"/>
      <circle cx="70" cy="22" r="5" fill="rgba(255,255,255,.05)"/>
      <circle cx="74" cy="70" r="3.5" fill="rgba(255,255,255,.06)"/>
      <circle cx="22" cy="68" r="3" fill="rgba(255,255,255,.05)"/>
      <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(255,200,220,.35)" strokeWidth="1.3"/>
      <line x1="16" y1="50" x2="30" y2="50" stroke="rgba(255,200,220,.4)" strokeWidth="1"/>
      <line x1="70" y1="50" x2="84" y2="50" stroke="rgba(255,200,220,.4)" strokeWidth="1"/>
      <text x="50" y="41" textAnchor="middle" fontFamily="Dancing Script,cursive" fontSize="13" fill="#ffffff" fontWeight="700" letterSpacing="1" opacity="0.92">for</text>
    </>}
    <text x="50" y={size > 50 ? 63 : 57} textAnchor="middle" fontFamily="Dancing Script,cursive" fontSize={size > 50 ? 20 : 13} fill="#ffffff" fontWeight="700" letterSpacing="1">{text}</text>
  </svg>
);

const pad = n => String(n).padStart(2, "0");

function spawnConfetti() {
  const colors = ["#f9a8c9","#e0507a","#f4c04d","#c2185b","#fff","#ffd6e7","#a855f7"];
  colors.forEach(col => {
    for (let i = 0; i < 11; i++) {
      const c = document.createElement("div");
      c.className = "bd-confetti";
      c.style.cssText = `left:${Math.random()*100}vw;top:-10px;background:${col};width:${6+Math.random()*10}px;height:${6+Math.random()*10}px;border-radius:${Math.random()>.5?"50%":"2px"};animation-duration:${2+Math.random()*3}s;animation-delay:${Math.random()*1.5}s`;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 5000);
    }
  });
}

const PETAL_COLORS = ["#f9a8c9","#f472b6","#fda4c8","#e0507a","#fce4ec","#ffb3d0"];
const makePetals = (n) => Array.from({length:n}, (_,i) => ({
  id: i, left: Math.random()*100,
  w: 12+Math.random()*16, h: 12+Math.random()*16,
  color: PETAL_COLORS[Math.floor(Math.random()*PETAL_COLORS.length)],
  borderRadius: Math.random()>.5?"50% 0 50% 0":"50% 50% 0 50%",
  duration: 6+Math.random()*10, delay: Math.random()*12,
}));

const WISHES = [
  {e:"🌸",t:"May this year bring you more joy, laughter, and love than your heart can hold — and may you always know you deserve every bit of it."},
  {e:"🎂",t:"Another year of being absolutely amazing. Another year of making the world a better place just by being you. Cheers to the birthday girl!"},
  {e:"💫",t:"May every dream you carry quietly in your heart find its wings this year. You've planted so many seeds — this is your season to bloom."},
  {e:"🥂",t:"Here's to the woman who turns ordinary moments into magic, who loves fiercely and laughs freely. May your day be as extraordinary as you are."},
  {e:"🌹",t:"You are the poem the universe wrote when it was feeling especially inspired. Happy birthday to the most beautiful soul I know."},
  {e:"🎀",t:"May this birthday mark the beginning of your most glorious chapter yet — filled with adventures, milestones, and all the love you give so freely returned tenfold."},
];

// Slight random tilts per polaroid — feels hand-placed
const TILTS    = [-2.5, 1.8, -1.2];
// Optional captions beneath each photo — leave "" for blank
const CAPTIONS = ["", "", ""];

/* ── Polaroid slot ── */
const PolaroidSlot = ({ src, idx }) => (
  <div className="bd-polaroid-wrap" style={{"--tilt":`${TILTS[idx]||0}deg`}}>
    <div className="bd-polaroid">
      <div className="bd-polaroid-img-wrap">
        {src
          ? <img src={src} alt={`memory ${idx+1}`} />
          : <div className="bd-polaroid-placeholder">
              <span style={{fontSize:"2.5rem",opacity:.4}}>📷</span>
              <span style={{fontStyle:"italic",color:"var(--muted)",fontSize:".9rem",textAlign:"center",padding:"0 1rem"}}>A photo of her 📸</span>
            </div>
        }
      </div>
      <div className="bd-polaroid-caption">{CAPTIONS[idx]}</div>
    </div>
  </div>
);

/* ── Video slot ── */
const VideoSlot = ({ src, label }) => {
  const [playing, setPlaying] = React.useState(false);
  const [muted, setMuted] = React.useState(true);
  const vidRef = React.useRef(null);

  const togglePlay = () => {
    if (!vidRef.current) return;
    if (playing) { vidRef.current.pause(); setPlaying(false); }
    else { vidRef.current.play(); setPlaying(true); }
  };
  const toggleMute = (e) => {
    e.stopPropagation();
    if (!vidRef.current) return;
    vidRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className="bd-reel-slot" onClick={togglePlay}>
      {!src && (
        <div className="bd-slot-placeholder">
          <span className="bd-ph-icon">🎥</span>
          <span className="bd-ph-text">{label}</span>
        </div>
      )}
      {src && (
        <>
          <video
            ref={vidRef}
            src={src}
            playsInline
            muted
            loop
            style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",display:"block"}}
            onPlay={()=>setPlaying(true)}
            onPause={()=>setPlaying(false)}
          />
          {/* play/pause overlay */}
          <div className="bd-reel-play-overlay" style={{opacity: playing ? 0 : 1}}>
            <div className="bd-reel-play-btn">▶</div>
          </div>
          {/* bottom bar */}
          <div className="bd-reel-bar">
            <span className="bd-reel-label">💕 a memory</span>
            <button className="bd-reel-mute-btn" onClick={toggleMute}>
              {muted ? "🔇" : "🔊"}
            </button>
          </div>
          {/* gradient overlay bottom */}
          <div className="bd-reel-gradient" />
        </>
      )}
    </div>
  );
};

export default function BirthdaySite() {
  useEffect(() => {
    if (document.getElementById("bd-global-css")) return;
    const s = document.createElement("style");
    s.id = "bd-global-css";
    s.textContent = GLOBAL_CSS;
    document.head.appendChild(s);
  }, []);

  const [gateVisible, setGateVisible] = useState(true); // ← change to true to re-enable gate
  const [gateHidden,  setGateHidden]  = useState(false);
  const [gateClock,   setGateClock]   = useState({days:"00",hrs:"00",min:"00",sec:"00"});
  const [letterOpen,  setLetterOpen]  = useState(false);
  const [cdTime,      setCdTime]      = useState({y:0,m:"00",d:"00",h:"00",mn:"00",s:"00"});
  const [petals]     = useState(() => makePetals(24));
  const [gatePetals] = useState(() => makePetals(18));
  const [mediaData]               = useState({ photos:[img1,img2,img3], videos:[vid1,vid3,vid2] });
  const [editorMode,  setEditorMode]  = useState(false);

  const cursorDotRef  = useRef(null);
  const cursorRingRef = useRef(null);
  const audioRef      = useRef(null);
  const musicStarted  = useRef(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);

  /* Gate countdown */
  useEffect(() => {
    const UNLOCK = new Date(2026, 2, 14, 0, 0, 0);
    const tick = () => {
      const diff = UNLOCK - new Date();
      if (diff <= 0) { setGateHidden(true); setTimeout(()=>setGateVisible(false),1500); return; }
      setGateClock({ days:pad(Math.floor(diff/86400000)), hrs:pad(Math.floor((diff%86400000)/3600000)), min:pad(Math.floor((diff%3600000)/60000)), sec:pad(Math.floor((diff%60000)/1000)) });
    };
    tick(); const t=setInterval(tick,1000); return ()=>clearInterval(t);
  }, []);

  /* Age countdown */
  useEffect(() => {
    const BIRTH = new Date(2006, 2, 14, 0, 0, 0);
    const tick = () => {
      const now=new Date();
      let y=now.getFullYear()-BIRTH.getFullYear(), m=now.getMonth()-BIRTH.getMonth(), d=now.getDate()-BIRTH.getDate();
      if(d<0){m--;d+=new Date(now.getFullYear(),now.getMonth(),0).getDate();}
      if(m<0){y--;m+=12;}
      setCdTime({y, m:pad(m), d:pad(d), h:pad(now.getHours()), mn:pad(now.getMinutes()), s:pad(now.getSeconds())});
    };
    tick(); const t=setInterval(tick,1000); return ()=>clearInterval(t);
  }, []);

  /* Confetti */
  useEffect(() => { spawnConfetti(); const t=setTimeout(spawnConfetti,3800); return ()=>clearTimeout(t); }, []);

  /* Custom cursor */
  useEffect(() => {
    let mx=0,my=0,rx=0,ry=0;
    const onMove=(e)=>{
      mx=e.clientX; my=e.clientY;
      if(cursorDotRef.current){cursorDotRef.current.style.left=mx+"px";cursorDotRef.current.style.top=my+"px";}
      if(Math.random()>.65) return;
      const s=document.createElement("div"); s.className="bd-sparkle";
      const cols=["#f9a8c9","#e0507a","#f4c04d","#c2185b","#ffd6e7"];
      s.style.cssText=`left:${mx+(Math.random()*14-7)}px;top:${my+(Math.random()*14-7)}px;background:${cols[~~(Math.random()*cols.length)]}`;
      document.body.appendChild(s); setTimeout(()=>s.remove(),600);
    };
    let raf;
    const anim=()=>{ rx+=(mx-rx)*.18; ry+=(my-ry)*.18; if(cursorRingRef.current){cursorRingRef.current.style.left=rx+"px";cursorRingRef.current.style.top=ry+"px";} raf=requestAnimationFrame(anim); };
    raf=requestAnimationFrame(anim);
    document.addEventListener("mousemove",onMove);
    return ()=>{ document.removeEventListener("mousemove",onMove); cancelAnimationFrame(raf); };
  }, []);

  /* Music */
  useEffect(() => {
    const start=()=>{
      if(musicStarted.current) return; musicStarted.current=true;
      setShowMusicPrompt(false);
      const music=audioRef.current; if(!music) return;
      music.muted=false; music.volume=0; music.play().catch(()=>{});
      let v=0; const t=setInterval(()=>{ v=Math.min(v+.01,.4); music.volume=v; if(v>=.4)clearInterval(t);},75);
    };
    ["touchstart","mousedown","keydown"].forEach(ev=>document.addEventListener(ev,start,{once:true,passive:true}));
  }, []);

  /* Secret editor */
  useEffect(() => {
    let buf="";
    const onKey=e=>{ buf=(buf+e.key.toLowerCase()).slice(-4); if(buf==="bday") setEditorMode(v=>!v); };
    document.addEventListener("keydown",onKey);
    return ()=>document.removeEventListener("keydown",onKey);
  }, []);

  /* Intersection observer — adds in-view + staggers child cards */
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if(!en.isIntersecting) return;
        en.target.classList.add("bd-in-view");
        en.target.querySelectorAll(".bd-polaroid-wrap,.bd-video-slot,.bd-wish-card,.bd-count-box")
          .forEach((el,i) => setTimeout(()=>el.classList.add("bd-card-visible"), i*120));
        obs.unobserve(en.target);
      });
    }, { threshold: 0.07 });

    const timer = setTimeout(()=>{
      document.querySelectorAll(".bd-observe").forEach(s=>obs.observe(s));
    }, 150);

    return ()=>{ clearTimeout(timer); obs.disconnect(); };
  }, []);



  return (
    <div className={`bd-body${editorMode?" bd-editor-active":""}`} style={{width:"100%",minHeight:"100vh"}}>

      {/* Music prompt */}
      {showMusicPrompt && (
        <div className="bd-music-prompt">
          <span className="bd-music-prompt-icon">🎵</span>
          <span className="bd-music-prompt-text">tap anywhere for music</span>
        </div>
      )}

      {/* Cursor */}
      <div className="bd-cursor">
        <div className="bd-cursor-dot"  ref={cursorDotRef}/>
        <div className="bd-cursor-ring" ref={cursorRingRef}/>
      </div>

      {/* Petals */}
      <div className="bd-petals-wrap">
        {petals.map(p=>(
          <div key={p.id} className="bd-petal" style={{left:`${p.left}vw`,width:p.w,height:p.h,background:p.color,borderRadius:p.borderRadius,animationDuration:`${p.duration}s`,animationDelay:`${p.delay}s`}}/>
        ))}
      </div>

      {/* Gate */}
      {gateVisible && (
        <div className={`bd-gate${gateHidden?" hidden":""}`}>
          <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
            {gatePetals.map(p=>(
              <div key={p.id} className="bd-petal" style={{left:`${p.left}vw`,width:p.w,height:p.h,background:p.color,borderRadius:p.borderRadius,animationDuration:`${p.duration}s`,animationDelay:`${p.delay}s`}}/>
            ))}
          </div>
          <p style={{fontFamily:"'Dancing Script',cursive",fontSize:"clamp(1rem,3vw,1.5rem)",color:"#f9a8c9",letterSpacing:".1em",marginBottom:".6rem",position:"relative"}}>something beautiful is coming</p>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(2.2rem,8vw,5.5rem)",fontWeight:700,background:"linear-gradient(135deg,#f9a8c9,#fff 50%,#f9a8c9)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",lineHeight:1.1,marginBottom:".5rem",position:"relative"}}>
            Happy Birthday,<br/><em>My Love</em>
          </h1>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",color:"rgba(249,168,201,.7)",fontSize:"clamp(1rem,2.5vw,1.4rem)",marginBottom:"3rem",position:"relative"}}>just for you — unlocks at midnight 🌸</p>
          <div style={{display:"flex",gap:"clamp(.6rem,3vw,1.8rem)",flexWrap:"wrap",justifyContent:"center",position:"relative"}}>
            {[{v:gateClock.days,l:"Days"},{v:gateClock.hrs,l:"Hours"},{v:gateClock.min,l:"Minutes"},{v:gateClock.sec,l:"Seconds"}].map(({v,l})=>(
              <div className="bd-gate-box" key={l}><div className="bd-gate-num">{v}</div><div className="bd-gate-lbl">{l}</div></div>
            ))}
          </div>
          <p style={{marginTop:"3rem",fontFamily:"'Dancing Script',cursive",fontSize:"clamp(1.4rem,4vw,2rem)",color:"#f9a8c9",position:"relative"}}>— Olamide 💕</p>
        </div>
      )}

      {/* Editor Panel */}
      <div className="bd-editor-panel">
        <span className="bd-ep-badge">✏️ Editor Mode</span>
        <span className="bd-ep-info">Type "bday" to toggle. 💕</span>
        <button className="bd-ep-btn bd-ep-btn-exit" onClick={()=>setEditorMode(false)}>👁 Preview Her View</button>
      </div>

      {/* Hero */}
      <section id="bd-hero">
        <span className="bd-hero-eyebrow">Today is a very special day 🌸</span>
        <h1 className="bd-hero-title">Happy Birthday,<br/><em>My Love</em></h1>
        <p className="bd-hero-subtitle">You make every day feel like a celebration</p>
        <p className="bd-hero-date">🎉 Celebrating you today & always 🎉</p>
        <span className="bd-hero-heart">💕</span>
        <div className="bd-scroll-hint"><span>scroll to explore</span><span className="bd-scroll-arrow">↓</span></div>
      </section>

      <div className="bd-wave" style={{background:"#fff5f8"}}>
        <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,0 C360,70 1080,0 1440,50 L1440,70 L0,70 Z" fill="#fce4ec"/>
        </svg>
      </div>

      {/* Letter */}
      <section id="bd-letter" className="bd-section bd-observe" style={{background:"var(--blush)"}}>
        <span className="bd-section-label">from the heart</span>
        <h2 className="bd-section-title">A Letter Just for You</h2>
        <div className="bd-letter-scene">
          {!letterOpen ? (
            <div className="bd-paper-sealed" onClick={()=>setLetterOpen(true)}>
              <div className="bd-fold-top"/>
              <div className="bd-fold-body">
                <div className="bd-fold-centre-text">A personal note, sealed with love…</div>
                <div className="bd-wax-wrap bd-seal-float">
                  <div className="bd-seal-pulse"/>
                  <WaxSeal id="sg1"/>
                </div>
              </div>
              <p className="bd-seal-hint">✦ tap the seal to open ✦</p>
            </div>
          ) : (
            <div className="bd-paper-open">
              <div className="bd-open-paper">
                <div className="bd-letter-deco-top"><span className="bd-dl"/><span>✿ 🌸 ✿</span><span className="bd-dr"/></div>
                <span className="bd-letter-salutation">My darling, my sunshine —</span>
                <p>Words have always fallen a little short when it comes to describing just how much you mean to me, but today — your birthday — I want to try my very best. You are the kind of person who makes the world brighter simply by being in it. The way you laugh, the way you care, the way your eyes light up over the smallest things — those are the moments I keep tucked safely in my heart.</p>
                <p className="bd-letter-break">Today is about you.</p>
                <p>Not just the day you were born, but the quiet impact you've had on my life since I met you. In ways big and small, you've brought moments of laughter, calm, and meaning that I didn't even realize I needed.</p>
                <p>I appreciate the conversations, the random moments, the understanding, and even the unspoken things between us. You've shown me a side of life that feels a little warmer and a little brighter.</p>
                <p>I don't know what the future holds, but I'm grateful for the part of the journey where our paths crossed. And today, I just want you to feel celebrated, valued, and deeply appreciated.</p>
                <p className="bd-letter-aside">And if this little website exists... well, that should already tell you something.</p>
                <p className="bd-letter-closing">Happy Birthday, my love.</p>
                <p>I hope this year brings you happiness, growth, peace, and all the beautiful things you truly deserve.</p>
                <span className="bd-letter-sig">With love and code, Olamide ❤️</span>
                <div><WaxSeal id="sg2" size={46} text="Susan"/></div>
              </div>
              <button className="bd-close-btn" onClick={()=>setLetterOpen(false)}>✕ close letter</button>
            </div>
          )}
        </div>
      </section>

      <div className="bd-wave" style={{background:"#fce4ec"}}>
        <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,50 C360,0 1080,70 1440,20 L1440,70 L0,70 Z" fill="#fff5f8"/>
        </svg>
      </div>

      {/* Photos — Polaroid */}
      <section id="bd-gallery" className="bd-section bd-observe" style={{background:"var(--cream)"}}>
        <span className="bd-section-label">our memories</span>
        <h2 className="bd-section-title">Picture Perfect Moments 📸</h2>
        <div className="bd-photo-grid">
          <PolaroidSlot idx={0} src={mediaData.photos[0]}/>
          <PolaroidSlot idx={1} src={mediaData.photos[1]}/>
          <PolaroidSlot idx={2} src={mediaData.photos[2]}/>
        </div>
      </section>

      <div className="bd-wave" style={{background:"#fff5f8"}}>
        <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,0 C360,70 1080,0 1440,50 L1440,70 L0,70 Z" fill="#fce4ec"/>
        </svg>
      </div>

      {/* Videos */}
      <section id="bd-videos" className="bd-section bd-observe" style={{background:"var(--blush)"}}>
        <span className="bd-section-label">moving memories</span>
        <h2 className="bd-section-title">Our Favourite Moments 🎬</h2>
        <div className="bd-video-grid">
          <VideoSlot src={mediaData.videos[0]} label="A sweet video 🎬"/>
          <VideoSlot src={mediaData.videos[1]} label="A moment on camera 💖"/>
          <VideoSlot src={mediaData.videos[2]} label="A video memory ✨"/>
        </div>
      </section>

      <div className="bd-wave" style={{background:"#fce4ec"}}>
        <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,50 C360,0 1080,70 1440,20 L1440,70 L0,70 Z" fill="#e0507a"/>
        </svg>
      </div>

      {/* Countdown */}
      <section id="bd-countdown" className="bd-observe">
        <span className="bd-section-label" style={{position:"relative",zIndex:1}}>celebrating you</span>
        <h2 className="bd-section-title" style={{position:"relative",zIndex:1}}>Every Second of You</h2>
        <div className="bd-countdown-grid">
          <div className="bd-count-box bd-years-box"><div className="bd-count-num">{cdTime.y}</div><div className="bd-count-label">Years</div></div>
          <div className="bd-count-box"><div className="bd-count-num">{cdTime.m}</div><div className="bd-count-label">Months</div></div>
          <div className="bd-count-box"><div className="bd-count-num">{cdTime.d}</div><div className="bd-count-label">Days</div></div>
          <div className="bd-count-box"><div className="bd-count-num">{cdTime.h}</div><div className="bd-count-label">Hours</div></div>
          <div className="bd-count-box"><div className="bd-count-num">{cdTime.mn}</div><div className="bd-count-label">Minutes</div></div>
          <div className="bd-count-box"><div className="bd-count-num">{cdTime.s}</div><div className="bd-count-label">Seconds</div></div>
        </div>
        <p style={{color:"rgba(255,255,255,.8)",marginTop:"2rem",fontStyle:"italic",fontSize:"1.1rem",position:"relative",zIndex:1}}>you've been making the world beautiful for every one of these seconds 🌸</p>
      </section>

      <div className="bd-wave" style={{background:"#c2185b"}}>
        <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,0 C360,70 1080,0 1440,50 L1440,70 L0,70 Z" fill="#fff5f8"/>
        </svg>
      </div>

      {/* Wishes */}
      <section id="bd-wishes" className="bd-section bd-observe" style={{background:"var(--cream)"}}>
        <span className="bd-section-label">sending all the love</span>
        <h2 className="bd-section-title">Birthday Blessings 🎀</h2>
        <div className="bd-wishes-grid">
          {WISHES.map((w,i)=>(
            <div className="bd-wish-card" key={i}>
              <span className="bd-wish-emoji">{w.e}</span>
              <p className="bd-wish-text">{w.t}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="bd-wave" style={{background:"#fff5f8"}}>
        <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,50 C360,0 1080,70 1440,20 L1440,70 L0,70 Z" fill="#3a1a28"/>
        </svg>
      </div>

      {/* Footer */}
      <footer className="bd-footer">
        <p className="bd-footer-title">Happy Birthday, Beautiful 🎂</p>
        <p className="bd-footer-sub">Today. Tomorrow. Always.</p>
        <div className="bd-footer-hearts">
          {["💗","💕","💖","💕","💗"].map((h,i)=><span key={i}>{h}</span>)}
        </div>
      </footer>

      <audio ref={audioRef} autoPlay loop muted>
        <source src="/music/myheart.mp3" type="audio/mpeg"/>
      </audio>
    </div>
  );
}