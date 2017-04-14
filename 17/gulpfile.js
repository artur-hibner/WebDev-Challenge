// =============== GULP AND PLUGINS ===============
var
	gulp = require('gulp'),
	htmlclean = require('gulp-htmlclean'),
    size = require('gulp-size'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-cssmin'),
    cleanCSS = require('gulp-clean-css'),
	imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync'),
    browsersyncDev = require('browser-sync'),
    browsersyncProd = require('browser-sync'),    
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
	color = require('gulp-color'),
    handleError = function(err) {
        console.log(err);
        this.emit('end');
        }



// =============== FILE LOCATIONS ===============
var

	source = 'src/',
	destDev = 'dest/dev/',
	destProd = 'dest/prod/',

	html = {
		in: source + '*.html',
		outDev: destDev,
		outProd: destProd
	},
    css = {
        in: source + 'scss/style.scss',
        outDev: destDev + 'css/',
        outProd: destProd + 'css/',
        prefixMin: '.min' 
    },
	fonts = {
		in: source + 'fonts/*.*',
		outDev: destDev + 'fonts/',
		outProd: destProd + 'fonts/'
	},
	images = {
		in: source + 'images/*.*',
		outDev: destDev + 'images/',
		outProd: destProd + 'images/'
	},
    js = {
        in: source + 'js/**/*.js',
        outDev: destDev + 'js/',
        outProd: destProd + 'js/',
        filename: 'main.js',
        prefixMin: '.min' 
    },
    syncOptsDev = {
        server: {
            baseDir: destDev,
            index: 'index.html'
        },
        open: false,
        notify: true
    },
    syncOptsProd = {
        server: {
            baseDir: destProd,
            index: 'index.html'
        },
        open: false,
        notify: true
    };



// =============== HTML TASKS ===============

 	// ========== HTML DEV task ==========	
	gulp.task('html:dev', function() {
        var sizeFile = size();
		return gulp.src(html.in)
			.pipe(gulp.dest(html.outDev))
            .pipe(sizeFile)
			.pipe(browserSync.stream())
            .pipe(notify({
                onLast: true,
                message: function () {
                    return 'HTML OUT -- FILES SIZE: ' + sizeFile.prettySize;
                }
            }))
	});

 	// ========== HTML PROD task ==========	
	gulp.task('html:prod', function() {
        var sizeFile = size();
		return gulp.src(html.in)
			.pipe(size({ title: '========================= HTML in: ' }))
			.pipe(htmlclean())
			.pipe(size({ title: '========================= HTML out: ' }))
            .pipe(sizeFile)
			.pipe(gulp.dest(html.outProd))
			.pipe(browserSync.stream())
            .pipe(notify({
                onLast: true,
                message: function () {
                    return 'HTML OUT -- FILES SIZE: ' + sizeFile.prettySize;
                }
            }))
	});



// =============== SASS TASKS ===============

    // ========== SASS DEV task ==========  
    gulp.task('sass:dev', function() {
        var sizeFile = size();
        return gulp.src(css.in)
            .pipe(plumber({
                errorHandler: handleError
            }))
            .pipe(sourcemaps.init())
            .pipe(
                sass({
                    outputStyle : 'expanded'
                })
            )
            .pipe(autoprefixer({browsers: ["> 1%"]}))
            .pipe(sizeFile)
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(css.outDev))
            .pipe(browserSync.stream({match: '**/*.css'}))
            .pipe(browsersyncDev.reload({ stream: true}))
            .pipe(notify({
                onLast: true,
                message: function () {
                    return 'CSS OUT -- FILES SIZE: ' + sizeFile.prettySize;
                }
            }))
    });

    // ========== SASS PROD task ==========

    gulp.task('sass:prod', function() {
        var sizeFile = size();
        return gulp.src(css.in)
            .pipe(plumber({
                errorHandler: handleError
            }))
            .pipe(sourcemaps.init())
            .pipe(
                sass({
                    outputStyle : 'compressed'
                })
            )
            .pipe(autoprefixer({browsers: ["> 1%"]}))
            .pipe(size({ title: '========================= CSS in: ' }))
            .pipe(cleanCSS())
            .pipe(size({ title: '========================= CSS out: ' }))
            .pipe(sizeFile)
            .pipe(rename({suffix: css.prefixMin}))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(css.outProd))
            .pipe(browserSync.stream({match: '**/*.css'}))
            .pipe(browsersyncProd.reload({ stream: true}))
            .pipe(notify({
                onLast: true,
                message: function () {
                    return 'JAVASCRIPT OUT -- FILES SIZE: ' + sizeFile.prettySize;
                }
            }))
    });



// =============== FONTS TASKS ===============

    // ========== FONTS DEV task ========== 

    gulp.task('fonts:dev', function() {
        return gulp.src(fonts.in)
            .pipe(gulp.dest(fonts.outDev));
    });

    // ========== FONTS PROD task ==========    
    gulp.task('fonts:prod', function() {
        return gulp.src(fonts.in)
            .pipe(gulp.dest(fonts.outProd));
    });



// =============== IMAGES TASKS ===============

    // ========== IMAGES DEV task ==========
    gulp.task('images:dev', function() {
        return gulp.src(images.in)
            .pipe(gulp.dest(images.outDev));
    });

    // ========== IMAGES PROD task ==========
    gulp.task('images:prod', function() {
        return gulp.src(images.in)
            .pipe(imagemin())
            .pipe(gulp.dest(images.outProd));
    });



// =============== JS TASKS ===============

    // ========== JS DEV task ==========    
    gulp.task('js:dev', function() {
        var sizeFile = size();
        return gulp.src(js.in)
            .pipe(plumber({
                errorHandler: handleError
            }))
            .pipe(sourcemaps.init())
            .pipe(concat(js.filename))
            .pipe(sizeFile)
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(js.outDev))
            .pipe(browserSync.stream())
            .pipe(notify({
                onLast: true,
                message: function () {
                    return 'JAVASCRIPT OUT -- FILES SIZE: ' + sizeFile.prettySize;
                }
            }))
    });

    // ========== JS PROD task ==========   
    gulp.task('js:prod', function() {
        var sizeFile = size();
        return gulp.src(js.in)
            .pipe(plumber({
                errorHandler: handleError
            }))
            .pipe(sourcemaps.init())
            .pipe(concat(js.filename))
            .pipe(size({ title: '========================= JAVASCRIPT in: ' }))
            .pipe(uglify())
            .pipe(size({ title: '========================= JAVASCRIPT out: ' }))
            .pipe(sizeFile)
            .pipe(rename({suffix: js.prefixMin}))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(js.outProd))
            .pipe(browserSync.stream())
            .pipe(notify({
                onLast: true,
                message: function () {
                    return 'JAVASCRIPT OUT -- FILES SIZE: ' + sizeFile.prettySize;
                }
            }))
    });


    // ========== LINT TASK ==========
    gulp.task('js-lint', function() {
        return gulp.src(js.in)
            .pipe(plumber({
                errorHandler: handleError
            }))
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });



// =============== BROWSERSYNC TASKS ===============

    // ========== BROWSERSYNC DEV task ==========

    gulp.task('browsersyncDev', function() {
        browsersyncDev(syncOptsDev);
    });

    // ========== BROWSERSYNC PROD task ==========

    gulp.task('browsersyncProd', function() {
        browsersyncProd(syncOptsProd);
    });



// ========== WATCH TASK ==========

        // ========== watch dev task ==========
    gulp.task('watch:dev', function() {
        gulp.watch(js.in, ['js-lint', 'js:dev', browsersyncDev.reload]);
        gulp.watch(source + 'scss/*/*.scss', ['sass:dev']);
        gulp.watch(html.in, ['html:dev', browsersyncDev.reload]);
        gulp.watch(fonts.in, ['fonts:dev']);
        gulp.watch(images.in, ['images:dev']);
    });

        // ========== watch prod task ==========
    gulp.task('watch:prod', function() {
        gulp.watch(js.in, ['js-lint', 'js:prod', browsersyncProd.reload]);
        gulp.watch(source + 'scss/*/*.scss', ['sass:prod']);
        gulp.watch(html.in, ['html:prod', browsersyncProd.reload]);
        gulp.watch(fonts.in, ['fonts:prod']);
        gulp.watch(images.in, ['images:prod']);
    });



// =============== MAIN TASKS ===============

    gulp.task('compile:dev', function() {
        console.log(color('======================================================================', 'GREEN'));
        console.log(color('=============== DEVELOPMENT MODE -- COMPILE FILES ONLY ===============', 'GREEN'));
        console.log(color('======================================================================', 'GREEN'));
        gulp.start('html:dev', 'sass:dev', 'fonts:dev', 'images:dev', 'js-lint', 'js:dev');
    });

    gulp.task('compile:prod', function() {
        console.log(color('======================================================================', 'MAGENTA'));
        console.log(color('=============== PRODUCTION MODE --- COMPILE FILES ONLY ===============', 'MAGENTA'));
        console.log(color('======================================================================', 'MAGENTA'));
       gulp.start('html:prod', 'sass:prod', 'fonts:prod', 'images:prod', 'js-lint', 'js:prod');
    });

    gulp.task('dev', function() {
        console.log(color('======================================================================', 'YELLOW'));
        console.log(color('================= DEVELOPMENT MODE --- COMPILE FILES =================', 'YELLOW'));
        console.log(color('===================== WATCH + BROWSER SYNC/RELOAD ====================', 'YELLOW'));
        console.log(color('======================================================================', 'YELLOW'));
        gulp.start('html:dev', 'sass:dev', 'fonts:dev', 'images:dev', 'js-lint', 'js:dev','browsersyncDev', 'watch:dev');
    });


    gulp.task('prod', function() {
        console.log(color('======================================================================', 'RED'));
        console.log(color('================== PRODUCTION MODE -- COMPILE FILES ==================', 'RED'));
        console.log(color('===================== WATCH + BROWSER SYNC/RELOAD ====================', 'RED'));
        console.log(color('======================================================================', 'RED'));
        gulp.start('html:prod', 'sass:prod', 'fonts:prod', 'images:prod', 'js-lint', 'js:prod','browsersyncProd', 'watch:prod');
    });



// =============== DEFAULT TASKS ===============
gulp.task('default', ['dev']);