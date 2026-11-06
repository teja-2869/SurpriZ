import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Sparkles, Eye, RotateCcw, Volume2, ChevronDown, ChevronUp, Palette, Maximize2 } from 'lucide-react';
import { sound } from '../../utils/soundEngine';
import { fireConfettiExplosion } from '../../utils/confettiEngine';

interface GiftBox3DStageProps {
  recipientName?: string;
  senderName?: string;
  onUnwrapComplete?: () => void;
  fullScreen?: boolean;
}

export const GiftBox3DStage: React.FC<GiftBox3DStageProps> = ({
  recipientName = 'Maya',
  senderName = 'Clara',
  onUnwrapComplete,
  fullScreen = false
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [explodedAmount, setExplodedAmount] = useState(0); // 0 to 1
  const [boxFinish, setBoxFinish] = useState<'lavender' | 'rose' | 'cream' | 'midnight'>('lavender');
  const [ribbonFinish, setRibbonFinish] = useState<'peach' | 'gold' | 'pink'>('peach');
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isUnwrapped, setIsUnwrapped] = useState(false);

  // References for render loop
  const animRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    lidGroup: THREE.Group;
    boxBaseGroup: THREE.Group;
    ribbonH: THREE.Mesh;
    ribbonV: THREE.Mesh;
    photosGroup: THREE.Group;
    materials: Record<string, THREE.MeshStandardMaterial>;
    targetExplode: number;
    currentExplode: number;
    isSoftwareGl: boolean;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL per Three.js guidelines
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 1. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // 2. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog('#FFF9F5', 10, 25);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 5.8);
    camera.lookAt(0, 0.4, 0);

    // 3. Studio Environment Reflection via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig: Warm key light + Cool Hemisphere fill
    const keyLight = new THREE.DirectionalLight('#FFF3E0', 2.4);
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 15;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
      const d = 3;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
    }
    scene.add(keyLight);

    const fillLight = new THREE.HemisphereLight('#EDE9FE', '#D1C4E9', 1.0);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight('#FCE7F3', 1.2);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    // 5. Procedural Textures (Zero 404s!)
    // Radial soft contact shadow texture
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sctx = shadowCanvas.getContext('2d')!;
    const grad = sctx.createRadialGradient(128, 128, 0, 128, 128, 120);
    grad.addColorStop(0, 'rgba(45, 35, 46, 0.35)');
    grad.addColorStop(0.5, 'rgba(45, 35, 46, 0.15)');
    grad.addColorStop(1, 'rgba(45, 35, 46, 0)');
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;

    // Contact shadow plane flush with ground
    const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.85
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.005;
    scene.add(shadowPlane);

    // Procedural Monogram Wax Seal Texture
    const sealCanvas = document.createElement('canvas');
    sealCanvas.width = 256;
    sealCanvas.height = 256;
    const cctx = sealCanvas.getContext('2d')!;
    cctx.fillStyle = '#D97706';
    cctx.beginPath();
    cctx.arc(128, 128, 124, 0, Math.PI * 2);
    cctx.fill();
    cctx.lineWidth = 8;
    cctx.strokeStyle = '#FDE68A';
    cctx.stroke();

    cctx.fillStyle = '#FFFBEB';
    cctx.font = 'bold 72px sans-serif';
    cctx.textAlign = 'center';
    cctx.textBaseline = 'middle';
    cctx.fillText('S', 128, 115);
    cctx.font = 'bold 24px sans-serif';
    cctx.fillText('SURPRIZ', 128, 175);

    const sealTex = new THREE.CanvasTexture(sealCanvas);
    sealTex.colorSpace = THREE.SRGBColorSpace;

    // 6. Materials Library
    const boxMat = new THREE.MeshStandardMaterial({
      color: '#C084FC',
      roughness: 0.35,
      metalness: 0.1
    });

    const innerMat = new THREE.MeshStandardMaterial({
      color: '#F3E8FF',
      roughness: 0.6,
      metalness: 0.05
    });

    const ribbonMat = new THREE.MeshStandardMaterial({
      color: '#FED7AA',
      roughness: 0.25,
      metalness: 0.25
    });

    const goldSealMat = new THREE.MeshStandardMaterial({
      map: sealTex,
      color: '#F59E0B',
      roughness: 0.2,
      metalness: 0.85
    });

    // 7. Composite Procedural 3D Gift Box Model (Group with 8+ distinct parts)
    const boxBaseGroup = new THREE.Group();
    boxBaseGroup.position.set(0, 0, 0);

    // Box outer walls
    const boxWidth = 1.8;
    const boxHeight = 1.1;
    const boxDepth = 1.8;
    const wallThick = 0.08;

    // Bottom floor
    const bottomGeo = new THREE.BoxGeometry(boxWidth, wallThick, boxDepth);
    const bottomMesh = new THREE.Mesh(bottomGeo, boxMat);
    bottomMesh.position.y = wallThick / 2;
    bottomMesh.castShadow = !isSoftwareGl;
    bottomMesh.receiveShadow = !isSoftwareGl;
    boxBaseGroup.add(bottomMesh);

    // 4 Walls
    const wallZGeo = new THREE.BoxGeometry(boxWidth, boxHeight, wallThick);
    const wallXGeo = new THREE.BoxGeometry(wallThick, boxHeight, boxDepth - wallThick * 2);

    const wallFront = new THREE.Mesh(wallZGeo, boxMat);
    wallFront.position.set(0, boxHeight / 2, boxDepth / 2 - wallThick / 2);
    wallFront.castShadow = !isSoftwareGl;
    boxBaseGroup.add(wallFront);

    const wallBack = new THREE.Mesh(wallZGeo, boxMat);
    wallBack.position.set(0, boxHeight / 2, -boxDepth / 2 + wallThick / 2);
    wallBack.castShadow = !isSoftwareGl;
    boxBaseGroup.add(wallBack);

    const wallLeft = new THREE.Mesh(wallXGeo, boxMat);
    wallLeft.position.set(-boxWidth / 2 + wallThick / 2, boxHeight / 2, 0);
    wallLeft.castShadow = !isSoftwareGl;
    boxBaseGroup.add(wallLeft);

    const wallRight = new THREE.Mesh(wallXGeo, boxMat);
    wallRight.position.set(boxWidth / 2 - wallThick / 2, boxHeight / 2, 0);
    wallRight.castShadow = !isSoftwareGl;
    boxBaseGroup.add(wallRight);

    // Box base horizontal & vertical ribbons
    const ribbonW = 0.24;
    const ribbonThick = 0.015;

    const baseRibbonVGeo = new THREE.BoxGeometry(ribbonW, boxHeight + 0.01, boxDepth + 0.02);
    const baseRibbonV = new THREE.Mesh(baseRibbonVGeo, ribbonMat);
    baseRibbonV.position.y = boxHeight / 2;
    baseRibbonV.castShadow = !isSoftwareGl;
    boxBaseGroup.add(baseRibbonV);

    const baseRibbonHGeo = new THREE.BoxGeometry(boxWidth + 0.02, boxHeight + 0.01, ribbonW);
    const baseRibbonH = new THREE.Mesh(baseRibbonHGeo, ribbonMat);
    baseRibbonH.position.y = boxHeight / 2;
    baseRibbonH.castShadow = !isSoftwareGl;
    boxBaseGroup.add(baseRibbonH);

    // Interior Velvet Cushion
    const cushionGeo = new THREE.BoxGeometry(boxWidth - 0.2, 0.3, boxDepth - 0.2);
    const cushion = new THREE.Mesh(cushionGeo, innerMat);
    cushion.position.y = 0.2;
    cushion.receiveShadow = !isSoftwareGl;
    boxBaseGroup.add(cushion);

    scene.add(boxBaseGroup);

    // 8. Box Lid Group (moves upward when unboxed)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, boxHeight + 0.02, 0);

    const lidTopWidth = boxWidth + 0.08;
    const lidTopDepth = boxDepth + 0.08;
    const lidRimHeight = 0.26;

    const lidTopGeo = new THREE.BoxGeometry(lidTopWidth, wallThick, lidTopDepth);
    const lidTop = new THREE.Mesh(lidTopGeo, boxMat);
    lidTop.position.y = wallThick / 2;
    lidTop.castShadow = !isSoftwareGl;
    lidGroup.add(lidTop);

    // Lid Rims
    const rimZGeo = new THREE.BoxGeometry(lidTopWidth, lidRimHeight, wallThick);
    const rimXGeo = new THREE.BoxGeometry(wallThick, lidRimHeight, lidTopDepth - wallThick * 2);

    const rimFront = new THREE.Mesh(rimZGeo, boxMat);
    rimFront.position.set(0, -lidRimHeight / 2, lidTopDepth / 2 - wallThick / 2);
    lidGroup.add(rimFront);

    const rimBack = new THREE.Mesh(rimZGeo, boxMat);
    rimBack.position.set(0, -lidRimHeight / 2, -lidTopDepth / 2 + wallThick / 2);
    lidGroup.add(rimBack);

    const rimLeft = new THREE.Mesh(rimXGeo, boxMat);
    rimLeft.position.set(-lidTopWidth / 2 + wallThick / 2, -lidRimHeight / 2, 0);
    lidGroup.add(rimLeft);

    const rimRight = new THREE.Mesh(rimXGeo, boxMat);
    rimRight.position.set(lidTopWidth / 2 - wallThick / 2, -lidRimHeight / 2, 0);
    lidGroup.add(rimRight);

    // Lid Ribbons (Cross)
    const lidRibbonVGeo = new THREE.BoxGeometry(ribbonW, wallThick + 0.01, lidTopDepth + 0.02);
    const lidRibbonV = new THREE.Mesh(lidRibbonVGeo, ribbonMat);
    lidRibbonV.position.y = wallThick / 2 + 0.005;
    lidGroup.add(lidRibbonV);

    const lidRibbonHGeo = new THREE.BoxGeometry(lidTopWidth + 0.02, wallThick + 0.01, ribbonW);
    const lidRibbonH = new THREE.Mesh(lidRibbonHGeo, ribbonMat);
    lidRibbonH.position.y = wallThick / 2 + 0.005;
    lidGroup.add(lidRibbonH);

    // 3D Ribbon Bow Knot
    const bowCurve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, wallThick + 0.02, 0),
      new THREE.Vector3(0.3, wallThick + 0.28, 0.15),
      new THREE.Vector3(0.5, wallThick + 0.35, 0),
      new THREE.Vector3(0.2, wallThick + 0.22, -0.15),
      new THREE.Vector3(0, wallThick + 0.02, 0)
    ]);
    const bowGeo1 = new THREE.TubeGeometry(bowCurve1, 32, 0.06, 8, false);
    const bow1 = new THREE.Mesh(bowGeo1, ribbonMat);
    lidGroup.add(bow1);

    const bowCurve2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, wallThick + 0.02, 0),
      new THREE.Vector3(-0.3, wallThick + 0.28, -0.15),
      new THREE.Vector3(-0.5, wallThick + 0.35, 0),
      new THREE.Vector3(-0.2, wallThick + 0.22, 0.15),
      new THREE.Vector3(0, wallThick + 0.02, 0)
    ]);
    const bowGeo2 = new THREE.TubeGeometry(bowCurve2, 32, 0.06, 8, false);
    const bow2 = new THREE.Mesh(bowGeo2, ribbonMat);
    lidGroup.add(bow2);

    // Wax Seal Medallion
    const sealGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.04, 32);
    const sealMesh = new THREE.Mesh(sealGeo, goldSealMat);
    sealMesh.position.set(0, wallThick + 0.08, 0);
    sealMesh.rotation.y = Math.PI;
    lidGroup.add(sealMesh);

    scene.add(lidGroup);

    // 9. Floating Keepsake Photos inside box
    const photosGroup = new THREE.Group();
    photosGroup.position.set(0, 0.5, 0);

    // Create 3 miniature floating polaroids
    const pGeo = new THREE.PlaneGeometry(0.7, 0.85);
    const pMat1 = new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: 0.3 });
    const pMat2 = new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: 0.3 });

    const polaroid1 = new THREE.Mesh(pGeo, pMat1);
    polaroid1.position.set(-0.35, 0.2, 0);
    polaroid1.rotation.set(-0.2, 0.3, -0.1);
    photosGroup.add(polaroid1);

    const polaroid2 = new THREE.Mesh(pGeo, pMat2);
    polaroid2.position.set(0.35, 0.3, -0.1);
    polaroid2.rotation.set(-0.15, -0.3, 0.15);
    photosGroup.add(polaroid2);

    scene.add(photosGroup);

    // Save anim reference
    animRef.current = {
      scene,
      camera,
      renderer,
      lidGroup,
      boxBaseGroup,
      ribbonH: lidRibbonH,
      ribbonV: lidRibbonV,
      photosGroup,
      materials: {
        box: boxMat,
        ribbon: ribbonMat,
        inner: innerMat,
        seal: goldSealMat
      },
      targetExplode: 0,
      currentExplode: 0,
      isSoftwareGl
    };

    // 10. Animation Loop with Exponential Damping
    let frameId = 0;
    let lastTime = performance.now();

    const tick = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (animRef.current) {
        const ref = animRef.current;
        // Smooth exponential damping: 1 - Math.exp(-k * dt)
        const lambda = 4.5;
        ref.currentExplode += (ref.targetExplode - ref.currentExplode) * (1 - Math.exp(-lambda * dt));

        // Lift lid and tilt
        ref.lidGroup.position.y = boxHeight + 0.02 + ref.currentExplode * 1.8;
        ref.lidGroup.rotation.x = -ref.currentExplode * 0.45;
        ref.lidGroup.rotation.z = ref.currentExplode * 0.2;

        // Raise floating photos gently
        ref.photosGroup.position.y = 0.5 + ref.currentExplode * 1.2;
        ref.photosGroup.scale.setScalar(0.7 + ref.currentExplode * 0.6);

        // Slow turntable rotation if enabled
        if (isAutoRotating) {
          boxBaseGroup.rotation.y += 0.4 * dt;
          lidGroup.rotation.y = boxBaseGroup.rotation.y;
          photosGroup.rotation.y = boxBaseGroup.rotation.y;
        }

        renderer.render(scene, camera);
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    // Resize Handler
    const handleResize = () => {
      if (!container || !animRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      animRef.current.camera.aspect = w / h;
      animRef.current.camera.updateProjectionMatrix();
      animRef.current.renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update exploded slider in Three.js
  useEffect(() => {
    if (animRef.current) {
      animRef.current.targetExplode = explodedAmount;
    }
  }, [explodedAmount]);

  // Update box colors
  useEffect(() => {
    if (!animRef.current) return;
    const colors: Record<string, string> = {
      lavender: '#C084FC',
      rose: '#F472B6',
      cream: '#FFFBEB',
      midnight: '#312E81'
    };
    animRef.current.materials.box.color.set(colors[boxFinish] || '#C084FC');
  }, [boxFinish]);

  // Update ribbon colors
  useEffect(() => {
    if (!animRef.current) return;
    const colors: Record<string, string> = {
      peach: '#FED7AA',
      gold: '#FDE047',
      pink: '#FBCFE8'
    };
    animRef.current.materials.ribbon.color.set(colors[ribbonFinish] || '#FED7AA');
  }, [ribbonFinish]);

  const handleUnboxTrigger = () => {
    sound.playBoxOpen();
    fireConfettiExplosion(0.5, 0.4);
    setIsUnwrapped(true);
    setExplodedAmount(1.0);
    onUnwrapComplete?.();
  };

  const handleSealAgain = () => {
    sound.playWaxPop();
    setIsUnwrapped(false);
    setExplodedAmount(0);
  };

  return (
    <div
      className={`relative w-full ${
        fullScreen ? 'h-[75vh]' : 'h-[460px]'
      } rounded-3xl overflow-hidden bg-gradient-to-b from-[#FFF9F5] to-[#FAF2EE] border border-[#EFE5DE] shadow-xl flex flex-col justify-between select-none`}
    >
      {/* Three.js Canvas Mount Container (isolated from React re-renders) */}
      <div ref={mountRef} className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing" />

      {/* Minimal Top Header Badge matching Viewport-First directives */}
      <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-purple-100 shadow-xs text-xs font-bold text-purple-950">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>Interactive 3D Parcel • For {recipientName}</span>
        </div>

        <button
          onClick={() => {
            sound.playSparkle();
            setIsAutoRotating(!isAutoRotating);
          }}
          className="pointer-events-auto px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-white shadow-2xs transition-colors"
        >
          {isAutoRotating ? 'Pause Spin' : 'Auto Orbit'}
        </button>
      </div>

      {/* Unified Bottom Control Dock (<= 15% viewport footprint, solid/rgba surfaces) */}
      <div className="relative z-10 w-full flex flex-col items-center p-3 sm:p-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-xl bg-white/95 rounded-2xl border border-purple-200 shadow-xl p-3 sm:p-4 flex flex-col gap-3 transition-all duration-300">
          {/* Header toggle strip */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5 text-purple-900">
              <Palette className="w-3.5 h-3.5 text-purple-600" />
              <span>3D Artisan Finishes & Exploded View</span>
            </span>

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 hover:bg-slate-100 rounded text-slate-500 flex items-center gap-1"
            >
              {isCollapsed ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  <span className="text-[11px]">Show Dock</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  <span className="text-[11px]">Hide</span>
                </>
              )}
            </button>
          </div>

          {!isCollapsed && (
            <div className="flex flex-col gap-3 pt-1">
              {/* Exploded Unwrap Slider */}
              <div className="flex items-center gap-3 text-xs">
                <span className="font-semibold text-slate-600 shrink-0 w-24">
                  Unwrap Stage:
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={explodedAmount}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setExplodedAmount(val);
                    if (val > 0.8 && !isUnwrapped) {
                      sound.playBoxOpen();
                      setIsUnwrapped(true);
                    }
                  }}
                  className="flex-1 accent-purple-600"
                />
                <span className="font-mono text-purple-700 font-bold w-12 text-right">
                  {Math.round(explodedAmount * 100)}%
                </span>
              </div>

              {/* Box & Ribbon Swatches */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-500">Box:</span>
                  {(['lavender', 'rose', 'cream', 'midnight'] as const).map((finish) => (
                    <button
                      key={finish}
                      onClick={() => {
                        sound.playSparkle();
                        setBoxFinish(finish);
                      }}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        boxFinish === finish ? 'scale-110 border-purple-600 shadow-2xs' : 'border-transparent'
                      }`}
                      style={{
                        backgroundColor:
                          finish === 'lavender'
                            ? '#C084FC'
                            : finish === 'rose'
                            ? '#F472B6'
                            : finish === 'cream'
                            ? '#FFFBEB'
                            : '#312E81'
                      }}
                      title={finish}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-500">Ribbon:</span>
                  {(['peach', 'gold', 'pink'] as const).map((ribbon) => (
                    <button
                      key={ribbon}
                      onClick={() => {
                        sound.playSparkle();
                        setRibbonFinish(ribbon);
                      }}
                      className={`w-5 h-5 rounded-full border-2 transition-transform ${
                        ribbonFinish === ribbon ? 'scale-110 border-purple-600 shadow-2xs' : 'border-transparent'
                      }`}
                      style={{
                        backgroundColor:
                          ribbon === 'peach'
                            ? '#FED7AA'
                            : ribbon === 'gold'
                            ? '#FDE047'
                            : '#FBCFE8'
                      }}
                      title={ribbon}
                    />
                  ))}
                </div>

                {/* Primary Unbox Action */}
                <button
                  onClick={isUnwrapped ? handleSealAgain : handleUnboxTrigger}
                  className="px-4 py-1.5 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-xs shadow-xs active:scale-95 transition-transform"
                >
                  {isUnwrapped ? 'Re-Seal Box' : 'Unbox 3D Surprise 🎁'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
