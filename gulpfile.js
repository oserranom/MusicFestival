//Introducción:

function tarea(done){
    console.log("Mi primera tarea");
    done(); //De esta manera dices a gulp que la function se ha terminado y así no da el error de tarea incompleta 
}

//Gulp corre en el servidor con node.js requiere sintáxis node:

exports.tarea = tarea;  //exports.functionNode = functionJS  se peuden llamar igual si se quiere 

//En terminal se manda llamar como la parte nodejs (terminal: npx gulp tarea)

//Compilado automático de sass:
//CSS
const {src, dest, watch, parallel} = require ('gulp'); //así se importan funciones de gulp y se guaradan en const para luego usarlas 
const sass = require('gulp-sass')(require('sass')); 
const plumber = require ('gulp-plumber'); 
const autoprefixer = require('autoprefixer');  //Se encarga del soporte en navegadores
const cssnano = require('cssnano');  //Se encarga de comprimir la hoja css
const postcss = require('gulp-postcss');  //Transforma css por medio de los dos anteriores para mejor performance 
const sourcemaps = require('gulp-sourcemaps'); 

//Imagenes 

const webp = require('gulp-webp'); 
const imagemin = require('gulp-webp');
const cache = require('gulp-cache');
const avif = require('gulp-avif'); 

function css (done){
    src('src/scss/**/*.scss') //Identifica el archivo SASS
    .pipe(sourcemaps.init())
    .pipe( plumber())
    .pipe(sass()) //Compila el archivo SASS
    .pipe(postcss([autoprefixer(), cssnano()] ) )
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/css')); //Guarda en el disco duro 

    done(); //Evitamos tarea incompleta 
}

function javascript(done){
    src('src/js/**/*.js')
        .pipe(dest('build.js'));

    done(); 
}

//Function para convertir imgs en webp para aligerarlas 

function versionWebp (done){
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')//SUPER IMPORTANTE: Los formatos deben ir juntos {png,jpg}/ NO{png, jpg} así petardea 
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
    done();
}

function versionAvif (done){
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')//SUPER IMPORTANTE: Los formatos deben ir juntos {png,jpg}/ NO{png, jpg} así petardea 
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
    done();
}

function imagenes (done){
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
}

function dev(done){
    watch('src/scss/**/*.scss', css) //Watch para actualizar automáticamente a cada cambio, concatena con la function css de arriba con ,css
    watch('src/js/**/*.js', javascript);
    done();
}

exports.dev = parallel(dev, versionWebp, versionAvif, imagenes, javascript); //se exporta function dev. Con parallel se ejecutan varias functions a la vez 
exports.css = css; //se exporta function => Terminal: npx gulp css
exports.versionWebp = versionWebp; 
exports.imagenes = imagenes; 
//exports.dev = dev;//Se comenta para exportarla en parallel
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.js = javascript;