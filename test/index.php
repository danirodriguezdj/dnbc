<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>DNBC Club – Main Page</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- tsParticles y Glide.js -->
  <script src="https://cdn.jsdelivr.net/npm/tsparticles@3/tsparticles.bundle.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@glidejs/glide/dist/css/glide.core.min.css">
  <script src="https://cdn.jsdelivr.net/npm/@glidejs/glide/dist/glide.min.js"></script>
  <style>
    body { margin:0; font-family:sans-serif; background:#000; color:#fff; }
    #tsparticles { position:fixed; z-index:0; width:100vw; height:100vh; }
    .main-content { z-index:1; position:relative; padding-top:90px; min-height:100vh; }
    .club-history { background:rgba(0,0,0,0.7); max-width:600px; margin:0 auto 48px; border-radius:14px; padding:2rem 2rem 2rem 2rem; box-shadow:0 4px 32px #0006; text-align:center;}
    .club-history h1 { font-size:2rem; color:#ff0033; margin-bottom:1.2rem;}
    .carousel-container { width:92vw; max-width:680px; margin:0 auto; background:rgba(10,10,10,0.8); border-radius:12px; box-shadow:0 8px 32px #0006; padding:1.5rem 0 2.5rem 0;}
    .glide__slide img { width:100%; max-height:360px; object-fit:cover; border-radius:10px; box-shadow:0 8px 24px #0009;}
    @media (max-width:600px) {
      .main-content { padding-top:70px;}
      .club-history { font-size:1.02rem; padding:1.2rem 0.7rem;}
      .carousel-container { max-width:100vw; }
      .glide__slide img { max-height:220px; }
    }
    .glide__bullet { background:#fff3; }
    .glide__bullet--active { background:#ff0033; }
    .glide__arrow { background:#111b; color:#fff; border:none; font-size:2rem; border-radius:50%; width:44px; height:44px; margin:0 10px; cursor:pointer;}
    .glide__arrow:hover { background:#222d; }
    /* Header/menu básicos */
    .menu-toggle { position:fixed; top:15px; left:15px; z-index:10; background:transparent; border:none; cursor:pointer; }
    .menu-toggle .bar { display:block; width:30px; height:4px; margin:6px 0; background:#fff; border-radius:2px;}
    header { position:fixed; top:0; left:0; width:100vw; z-index:9; background:rgba(0,0,0,0.8); box-shadow:0 2px 16px #0006;}
    header .logo { height:56px; margin:10px 20px;}
    #menu-container { position: fixed; left: 0; top: 0; z-index: 15;}
  </style>
</head>
<body>
  <div id="tsparticles"></div>
  <!-- Menú hamburguesa y menú lateral -->
  <button class="menu-toggle" aria-label="Toggle menu">
    <span class="bar"></span><span class="bar"></span><span class="bar"></span>
  </button>
  <div id="menu-container"></div>
  <header>
    <a href="/" rel="noopener">
      <img src="/logoletraslargo.png" alt="DNBC Agency logo" class="logo" />
    </a>
  </header>
  <main class="main-content">
    <section class="club-history">
      <h1>Historia del Club</h1>
      <p>
        DNBC nació de la pasión por la música y la cultura underground.<br>
        Todo comenzó en 2017, en un pequeño local donde unos cuantos soñadores se reunían para compartir sets, arte y amistad.<br><br>
        Lo que era solo un refugio para inadaptados pronto se transformó en el corazón de la noche: cada evento, cada colaboración y cada nuevo miembro fue escribiendo la historia que hoy seguimos viviendo.<br><br>
        Desde entonces, hemos acogido a artistas de todo el mundo y celebrado juntos decenas de noches legendarias. Y esto... solo es el principio.
      </p>
    </section>
    <section class="carousel-container">
      <div class="glide">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            <?php
              $dir = __DIR__ . '/eventos/';
              $url_base = '/eventos/';
              $exts = ['jpg','jpeg','png','gif','webp'];
              $imgs = [];
              if (is_dir($dir)) {
                foreach ($exts as $ext) {
                  foreach (glob($dir . "*.$ext") as $img) {
                    $imgs[] = $img;
                  }
                }
                sort($imgs, SORT_NATURAL|SORT_FLAG_CASE);
                foreach ($imgs as $img) {
                  $filename = basename($img);
                  echo '<li class="glide__slide"><img src="' . $url_base . $filename . '" alt="Evento '.htmlspecialchars($filename).'"></li>';
                }
              } else {
                echo "<li>No hay imágenes de eventos aún.</li>";
              }
            ?>
          </ul>
        </div>
        <div class="glide__bullets" data-glide-el="controls[nav]"></div>
        <div data-glide-el="controls">
          <button class="glide__arrow glide__arrow--left" data-glide-dir="<">&#8592;</button>
          <button class="glide__arrow glide__arrow--right" data-glide-dir=">">&#8594;</button>
        </div>
      </div>
    </section>
  </main>
  <script>
    tsParticles.load("tsparticles", {
      fpsLimit: 60,
      background: { color: "#000" },
      particles: {
        number: { value: 40, density: { enable: true, area: 800 } },
        color: { value: "#fff" },
        shape: { type: "circle" },
        opacity: { value: 0.23, random: true },
        size: { value: 2.6, random: true },
        move: { enable: true, speed: 0.7, direction: "none", outModes: "out" },
        links: { enable: false }
      },
      detectRetina: true
    });

    document.addEventListener('DOMContentLoaded', function() {
      new Glide('.glide', {
        type: 'carousel',
        autoplay: 2500,
        perView: 1,
        animationDuration: 800,
        hoverpause: true,
        gap: 0,
        rewind: true
      }).mount();
    });
  </script>
  <script src="/menu.js"></script>
</body>
</html>
