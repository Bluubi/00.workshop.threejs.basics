# 00. Animación básica

## Vuelta a empezar

Vamos a copiar lo contenido en el fichero ``00-basic-scene/index.ts`` en este fichero
```01-basic-animation/index.ts```.

## requestAnimationFrame

La función ``requestAnimationFrame`` es **nativa** de Javascript, y su función es, literalmente,
_pedir el siguiente frame_. Debido a esto, podemos crear la "ilusión" de una **animación**.

> Imagina el típico bloc de notas en el que cada página tiene un dibujo con una posición distinta. Cuando
> pasas las páginas rápidamente, se crea el efecto de que el dibujo está animado. ```requestAnimationFrame``` sigue el
> mismo principio.

Antes, tenemos que hacer algunos cambios.

## Reajustes

Primero de todo, **vamos a deshacernos de la función ``setup``**. Todo lo que hay dentro, vamos a sacarlo, de manera que quede así:

````
    const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#webgl')!});
    const box = createFirstBox();
    const scene = createSceneAndAddBoxToIt(box);
    
    const perspectiveCamera = createPerspectiveCamera();
    perspectiveCamera.position.z = 10;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, perspectiveCamera);
````

Comprobamos que todo sigue funcionando con normalidad. 

> ¿Por qué es necesario este cambio? Lo veremos más adelante.

Luego, vamos a hacer un poco más pequeño el cubo. En lugar de ``BOX_WIDTH``, ``BOX_HEIGHT``
y ```BOX_DEPTH``` a 5, disminuyámoslo a 1.

A continuación, vamos a definir _qué movimiento_ queremos hacer. Vamos a hacer que nuestro
cubo **rote** en los ejes Y y X.

````
 function tick(){
        box.rotation.x += 1 / 60;
        box.rotation.y += 1 / 60;

        requestAnimationFrame(tick);

        renderer.render(scene, perspectiveCamera);

    }
````

> Dividimos entre 60 porque así lo limitamos a 60fps.

> La función ``tick`` será la encargada de realizar la animación, y ``requestFrameAnimation``, quien recibe por
> parámetro un callback, será la que utilice ``tick`` para obtener el siguiente frame.

> 1. Llamas a tick por primera vez manualmente en tu código.
> 2. Dentro de tick, modificas las propiedades de rotación de tu caja.
> 3. Pasas tick a requestAnimationFrame, lo que programa una nueva llamada a tick justo antes de que el navegador vuelva a pintar la pantalla.

> No te olvides de invocar ``tick()``.

Y, ¡voilá! nuestro cubo dará vueltas.
