"use strict";

var gulp = require("gulp");
		concat = require("gulp-concat");
		uglify = require("gulp-uglify");
		rename = require("gulp-rename");
		sass = require("gulp-sass");
		maps = require("gulp-sourcemaps");
		del = require("del");
		ghPages = require("gulp-gh-pages");

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
	return gulp.src("scss/styles.scss")
			.pipe(maps.init())
			.pipe(sass())
			.pipe(maps.write("./"))
			.pipe(gulp.dest("css"));
});

gulp.task("watchFiles", function() {
	gulp.watch("scss/**.scss", ["compileSass"]);
	gulp.watch("js/*.js", ["concatScripts"]);
});

gulp.task("clean", function() {
	del(["dist", "css/application.css*", "js/scripts*.js*"]);
});

gulp.task("build", ["minifyScripts", "compileSass"], function() {
	return gulp.src(["css/styles.css", "js/scripts.min.js", "index.html", "img/**", "fonts/**", {base: "./"}])
			.pipe(gulp.dest("dist"));
});

gulp.task("serve", ["watchFiles"]);

gulp.task("default", ["clean"], function() {
	gulp.start("build");

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

});