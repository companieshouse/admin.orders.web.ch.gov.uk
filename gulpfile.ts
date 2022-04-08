import { parallel, src, dest } from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";

const sass = gulpSass(dartSass);

function compileStylesheets(cb: () => void) {
    src([
        "./src/public/**/*.scss"
    ])
        .pipe(sass().on("error", sass.logError))
        .pipe(dest("./dist/public"));
    cb();
}

function copyAssets(cb: () => void) {
    src([
        "./node_modules/govuk-frontend/govuk/assets/**/*",
    ]).pipe(dest("./dist/public/assets"));
    cb();
}

function copyScript(cb: () => void) {
    src([
        "./node_modules/govuk-frontend/govuk/all.js"
    ]).pipe(dest("./dist/public/scripts"));
    cb();
}

function copyViews(cb: () => void) {
    src([
        "./src/views/**/*"
    ]).pipe(dest("./dist/views"));
    cb();
}

exports.default = parallel(compileStylesheets, copyAssets, copyScript, copyViews);
