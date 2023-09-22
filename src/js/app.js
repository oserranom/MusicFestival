document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    crearGaleria();
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