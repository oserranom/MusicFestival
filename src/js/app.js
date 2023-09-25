document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    crearGaleria(); //crea la galeria de imágenes 
    scrollNav();  //crea el efecto smooth scroll al clickar enlaces del header
    navegacionFija();  //Fija la barra de navegación en la parte superior para que no desaparezca 
}

function navegacionFija(){
    const barra = document.querySelector('.header'); 
    const contenidoVideo = document.querySelector('.contenido-video'); 
    //Se meten en const las clases de header y contenido-video

    window.addEventListener('scroll', function(){  //Se manda a detectar scroll en toda la ventana y ejecutar la function

        if(contenidoVideo.getBoundingClientRect().bottom < 0){   //Método de la API para dar info de coordenadas de la web etc 
            //Básicamente cuando es <0 detecta que has pasado de la zona que ocupa contenido-video
            barra.classList.add('fijo');  //Añadimos la clase fijo si se sobrepasa esa zona
        } else {
            barra.classList.remove('fijo');  //si no la eliminamos, ir a css.header.fijo
        }
    });
} 

//Efecto de scroll suave al clickar en los enlaces del header
function scrollNav(){ 
    const enlaces = document.querySelectorAll('.navegacion-principal a');   //Se seleccionan todos los enlaces de navegacion-principal
    enlaces.forEach(enlace => {             //Se requiere bucle foreach debido a que son varios enlaces, si fuera uno solo no haría falta
        enlace.addEventListener('click', function(e){     //a cada 'click' se ejecuta la function
            e.preventDefault();    //Necesario para evitar el comportamiento por defecto que es ir directo
            const scrollSection = e.target.attributes.href.value;   //Se mete en una const toda la info para hacerla mas "portable"
            const seccion = document.querySelector(scrollSection);   //Se selecciona toda esa info de scrollSection 
            seccion.scrollIntoView({behavior: "smooth"});   //Se utiliza de esta manera el método de la API nativa de JS 
        });
    });
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');
    for(let i = 1; i <= 12; i++){
        const imagen = document.createElement('picture');

        imagen.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif"> 
        <source srcset="build/img/thumb/${i}.webp" type="image/webp"> 
        <img loading="lazy" width="200" heigh="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;

        //${i} para iterar dentro del bucle for 

        imagen.onclick = function(){
            mostrarImagen(i); //Recibe el valor del índice para diferenciar entre imgs
        }
    
       
        galeria.appendChild(imagen); 
       
    }
}

function mostrarImagen(id){
    const imagen = document.createElement('picture'); //Se crea una picture en html
        
        imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif"> 
        <source srcset="build/img/grande/${id}.webp" type="image/webp"> 
        <img loading="lazy" width="200" heigh="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
        `; 
        
        //Crea Overlay con la img
        const overlay = document.createElement('DIV'); //Se crea un DIV html con nombre overlay
        overlay.appendChild(imagen); //Se le inserta en el DIV imagen
        overlay.classList.add('overlay'); //Se cera la clase overlay para darle style
        overlay.onclick = function(){
            const body = document.querySelector('body'); //Seleccionamos elemento html
            body.classList.remove('fijar-body'); //Eliminamos la clase fijar-body (antiscroll)
            overlay.remove(); //Se elimina la imagen
        }
        

        //Boton para cerrar el modal
        const cerrarModal = document.createElement('P');//Se crea element párrafo
        cerrarModal.textContent = 'X'; // se le añade una x para que el usuario cierre la imagen
        cerrarModal.classList.add('btn-cerrar'); //Se crea la clase del boton de cerrar para darle style 
        cerrarModal.onclick = function(){
            const body = document.querySelector('body'); //Elegimos elemento html
            body.classList.remove('fijar-body'); //Eliminamos la clase fijar-body (antiscroll)
            overlay.remove(); //Se elimina la imagen
            //De esta manera se vuelve a tener scroll cuando se cierra la imagen 

        }; 

        overlay.appendChild(cerrarModal);   
        
        // Añadirlo al HTML
        const body = document.querySelector('body');
        body.appendChild(overlay); //Efecto oscurecer fondo y ampliar imagen 
        body.classList.add('fijar-body'); //Eliminar el scroll con la imagen abierta

}