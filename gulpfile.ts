import { parallel, src, dest } from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";

const sass = gulpSass(dartSass);

function compileStylesheets(cb: () => void) {
    src([
        "./src/public/**/*"
    ])
        .pipe(sass().on("error", sass.logError))
        .pipe(dest("./dist/src/public"));
    cb();
}

function copyAssets(cb: () => void) {
    src([
        "./node_modules/govuk-frontend/govuk/assets/**/*",
    ]).pipe(dest("./dist/src/public/assets"));
    cb();
}

function copyScript(cb: () => void) {
    src([
        "./node_modules/govuk-frontend/govuk/all.js"
    ]).pipe(dest("./dist/src/public/scripts"));
    cb();
}

function copyViews(cb: () => void) {
    src([
        "./src/views/**/*"
    ]).pipe(dest("./dist/src/views"));
    cb();
}

exports.default = parallel(compileStylesheets, copyAssets, copyScript, copyViews);
