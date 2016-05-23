"use strict";

var gulp = require("gulp"),
		concat = require("gulp-concat"),
		uglify = require("gulp-uglify"),
		cleanCSS = require('gulp-clean-css'),
		rename = require("gulp-rename"),
		sass = require("gulp-sass"),
		maps = require("gulp-sourcemaps"),
		del = require("del"),
		ghPages = require("gulp-gh-pages"),
		deploy = require('gulp-deploy-git');

gulp.task("concatScripts", function() {
	return gulp.src([
			"js/translate.js",
			"js/app.js"])
			.pipe(maps.init())
			.pipe(concat("scripts.js"))
			.pipe(maps.write("./"))
			.pipe(gulp.dest("js"));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
	return gulp.src("js/scripts.js")
			.pipe(uglify())
			.pipe(rename("scripts.min.js"))
			.pipe(gulp.dest("js"));
});

gulp.task("compileSass", function() {
	return gulp.src("scss/style.scss")
			.pipe(maps.init())
			.pipe(sass())
			.pipe(maps.write("./"))
			.pipe(gulp.dest("css"));
});

gulp.task('minifyCss', ["compileSass"], function() {
  return gulp.src('css/style.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('css'));
});

gulp.task("clean", function() {
	del(["dist", "css/style*.css", "js/scripts*.js"]);
});

gulp.task("watchSass", function() {
	gulp.watch("scss/*.scss", ["minifyCss"]);
});

gulp.task("build", ["minifyScripts", "minifyCss"], function() {
	return gulp.src(["css/style.min.css", "js/scripts.min.js", "index.html", "img/**", "fonts/**"], {base: "./"})
			.pipe(gulp.dest("dist"));
});

gulp.task("default", ["clean"], function() {
	gulp.start("build");
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('deploy', function() {
  return gulp.src('./')
    .pipe(deploy({
      repository: 'https://github.com/rikkhop/talk-in-code.git'
    }));
});