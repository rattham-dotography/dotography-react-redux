var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var webserver = require('gulp-webserver');

var config = {
  bundleJS: 'bundle.js',
  devPath: 'app/dev',
  distPath: 'app/dist',
  deployTarget: 'src/main/webapp',
  jsSrcPath: [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/jquery-ui/jquery-ui.min.js',
    'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js'
  ]
}

function transformFilepath(filepath) {
  return '@import "' + filepath + '";';
}


function jsBundle(options) {
  return browserify({
      entries: options.index,
      extensions: ['.jsx', 'js'],
      debug: false
    })
    .transform("babelify", {presets: ["es2015", "react"]})
    .bundle()
    .pipe(source(options.output.file))
    .pipe(gulp.dest(options.output.dir));
}

gulp.task('deploy', function(cb) {
  //del([config.deployTarget] + '/assets', cb);
  //del([config.deployTarget] + '/index.html', cb);
  gulp.src(config.distPath+'/assets/**/*').pipe(gulp.dest(config.deployTarget+'/assets'));
  gulp.src(config.distPath+'/*.html').pipe(gulp.dest(config.deployTarget));
});

gulp.task('clean', function(cb){
  del([config.distPath], cb);
  //del([config.distPath + '/js'], cb);
});

// gulp.task('react', function() {
//   return gulp.src(config.jsSrcPath)
//     .pipe(gulp.dest(config.distPath + '/assets/js'));
// });

gulp.task('css-bootstrap', function() {
  var globalFiles = gulp.src(config.devPath + '/global/variables.scss', {read: false});
  var globalOptions = {
    transform: transformFilepath,
    starttag: '// inject:global',
    endtag: '// endinject',
    addRootSlash: false
  };
  return gulp.src(config.devPath + '/bootstrap.scss')
    .pipe(wiredep())
    .pipe(inject(globalFiles, globalOptions))
    .pipe(sass())
    .pipe(gulp.dest(config.distPath + '/assets/css'))
});

gulp.task('html', [], function() {
  return gulp.src(config.devPath + '/**/*.html')
    .pipe(gulp.dest(config.distPath + '/'));
});

/*
 * Js application need bundle file first
 */
gulp.task('js-minify', ['js-bundle'], function() {
  return gulp.src(config.distPath + '/assets/js/' + config.bundleJS)
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(config.distPath + '/assets/js'));
});

/*
 * compile all application js file together
 */
gulp.task('js-bundle', [], function() {
  var bundle = jsBundle({
    index: config.devPath + '/javascripts/index.js',
    output: {
      file: config.bundleJS,
      dir: config.distPath + '/assets/js'
    }
  });
  return bundle;
});

gulp.task('js', ['js-minify']);

// gulp.task('js', [], function() {
//   return gulp.src(config.devPath + '/javascripts/**/*.{js,jsx}')
//     .pipe(gulp.dest(config.distPath + '/assets/js'))
//     .pipe(uglify())
//     .pipe(rename({extname: '.min.js'}))
//     .pipe(gulp.dest(config.distPath + '/assets/js'));
// });

gulp.task('css', ['css-bootstrap'], function() {
  return gulp.src(config.devPath + '/stylesheets/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(config.distPath + '/assets/css'))
    .pipe(minifyCss())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(config.distPath + '/assets/css'))
});

gulp.task('watch', function() {
  gulp.watch(config.devPath + '/stylesheets/*.scss', ['css']);
  gulp.watch(config.devPath + '/javascripts/**/*.{js,jsx}', ['js']);
  gulp.watch(config.devPath + '/**/*.html', ['html']);
});

gulp.task('serve', function() {
  gulp.src(config.distPath)
    .pipe(webserver({
      fallback: 'index.html',
      open: true
    }));
});

gulp.task('default', ['html', 'css', 'js']);
gulp.task('reset', ['clean', 'html', 'css', 'js']);
gulp.task('all', ['clean', 'html', 'css', 'js', 'watch']);
