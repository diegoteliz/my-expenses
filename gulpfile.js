// Loading modules
var gulp            = require('gulp'),
    autoprefixer    = require('gulp-autoprefixer'),
    browserSync     = require('browser-sync').create(),
    csslint         = require('gulp-csslint'),
    header          = require('gulp-header'),
    jshint          = require('gulp-jshint'),
    pkg             = require('./package.json'),
    sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps'),
    uglify          = require('gulp-uglify');

// App config
var app = {
    
        path: {
            srcDir      : 'src',
            cssDir      : 'css',
            jsDir       : 'js',
            jsSrcDir    : 'src/js',
            jsApp       : 'src/js/scripts.js',
            
            sassFiles   : [
                'src/sass/**/*.scss'
            ],
            
            jsSrcFiles  : [
                'src/js/**/*.js'
            ],
            
            htmlFiles   : [
                '**/*.html'
            ]
        },
        
        banner: ['/**',
            ' * <%= pkg.title %> v<%= pkg.version %>',
            ' * <%= pkg.homepage %>',
            ' * Copyright (c) <%= pkg.year %> - <%= pkg.author %>',
            ' * <%= pkg.license %> License',
            ' */',
        ''].join('\n')
    },

    csslintOptions = {
        'adjoining-classes'             : false,
        'box-model'                     : false,
        'box-sizing'                    : false,
        'compatible-vendor-prefixes'    : false,
        'empty-rules'                   : true,
        'errors'                        : true,
        'display-property-grouping'     : true,
        'duplicate-background-images'   : true,
        'duplicate-properties'          : true,
        'fallback-colors'               : false,
        'floats'                        : true,
        'font-faces'                    : true,
        'font-sizes'                    : false,
        'gradients'                     : true,
        'ids'                           : true,
        'import'                        : true,
        'important'                     : true,
        'known-properties'              : true,
        'outline-none'                  : false,
        'overqualified-elements'        : true,
        'qualified-headings'            : false,
        'regex-selectors'               : false,
        'shorthand'                     : true,
        'star-property-hack'            : false,
        'text-indent'                   : true,
        'underscore-property-hack'      : true,
        'unique-headings'               : false,
        'universal-selector'            : false,
        'unqualified-attributes'        : true,
        'vendor-prefix'                 : true,
        'zero-units'                    : true
    },

    jshintOptions = {
        'curly'     : true,
        'latedef'   : true,
        'eqeqeq'    : true,
        'noempty'   : true,
        'newcap'    : true,
        'nonew'     : true,
        'strict'    : true,
        'camelcase' : true,
        'quotmark'  : 'single',
        'unused'    : false,        // Set this to 'true' when developing
        'jquery'    : true
    };

// Compile sass into CSS, add vendor prefixes, lint it & auto-inject into browsers
gulp.task('sass', function() {

    return gulp.src(app.path.sassFiles)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(csslint(csslintOptions))
        .pipe(csslint.reporter())
        .pipe(sourcemaps.write('./'))
        .pipe(header(app.banner, {pkg: pkg}))
        .pipe(gulp.dest(app.path.cssDir))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

// Lint JavaScript files, minify it & reload browsers
gulp.task('js', function() {

    return gulp.src(app.path.jsApp)
        .pipe(jshint(jshintOptions))
        .pipe(jshint.reporter('jshint-stylish', {beep: true}))
        .pipe(uglify())
        .pipe(header(app.banner, {pkg: pkg}))
        .pipe(gulp.dest(app.path.jsDir))
        .pipe(browserSync.stream());
});

// Static Server + watching files
gulp.task('serve', ['sass', 'js'], function() {

    browserSync.init({
        server: './'
        //notify: false
    });

    gulp.watch(app.path.sassFiles, ['sass']);
    gulp.watch(app.path.jsSrcFiles, ['js']);
    gulp.watch(app.path.htmlFiles).on('change', browserSync.reload);
});

// Main tasks
gulp.task('default', ['dev']);
gulp.task('dev', ['serve']);