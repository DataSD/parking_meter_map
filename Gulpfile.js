const gulp = require("gulp");
const minimist = require("minimist");
const execSync = require("child_process").execSync;
const browserSync = require('browser-sync')
const reload = browserSync.reload;

/* Parse CLI options used with the gulp command (there might not be any) */
const options = minimist(process.argv.slice(2));
const getOption = (short, long, fallback) => {
    if (options[short]) return options[short];
    if (options[long]) return options[long];
    if (fallback) return fallback;
    return null;
};


gulp.task("serve", function() {
    browserSync.init({
        port: 8811,
        notify: false,
        reloadOnRestart: true,
        https: false,
        server: ["./", "bower_components"],
        reloadDebounce: 1000
    });

    //gulp.watch(["./*.js", "./*.html"], ["dist"]);
    gulp
        .watch([
            "./*.html",
            "./**/*.html"
        ])
        .on("change", browserSync.reload);
});


/* Serve the front-end app for development */
gulp.task("build", () => {
    console.log("Build App For Production");
    //const serve = execSync(`polymer serve --root client -p ${port}`);
    const build = execSync("polymer build --preset es6-unbundled --verbose");
    // @TODO: Add scss compilation to serve pipeline
});

/* Default task */
gulp.task("default", ["serve"]);
