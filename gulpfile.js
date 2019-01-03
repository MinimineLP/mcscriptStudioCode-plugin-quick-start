const gulp = require(`gulp`),
  sass = require(`gulp-sass`),
  cleanCSS = require(`gulp-clean-css`),
  autoprefixer = require(`gulp-autoprefixer`),
  rename = require(`gulp-rename`),
  uglify = require(`gulp-uglify`),
  plumber = require(`gulp-plumber`),
  babel = require(`gulp-babel`),
  clean = require(`gulp-clean`),
  sourcemaps = require(`gulp-sourcemaps`),
  htmlmin = require(`gulp-html-minifier`),
  ts = require('gulp-typescript');;


/**
 * Formatters for console
 */
let Formats = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",

  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",

  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgYellow: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgMagenta: "\x1b[45m",
  BgCyan: "\x1b[46m",
  BgWhite: "\x1b[47m",
};

/**
 * The table colors
 */
let tablecolors = [
  Formats.FgGreen,
  Formats.FgCyan,
  Formats.FgRed,
  Formats.FgMagenta
]


/**
 * Clean style Function complation results
 */
function cleanStyle() {
  return Promise.all([
      new Promise((resolve, reject) => {
        gulp.src('css/*.min.css').pipe(clean())
          .on('error', reject)
          .on('end', resolve)
      }),
      new Promise((resolve, reject) => {
        gulp.src('css/*.min.css.map').pipe(clean())
          .on('error', reject)
          .on('end', resolve)
      })
    ])
}

/**
 * Clean Typescript's compilation results
 */
function cleanTypescript() {
  gulp.src(['*.js', '!gulpfile.js']).pipe(clean());
  gulp.src('scripts/*.js').pipe(clean());
}

/**
 * Cleans Types's compilation results
 */
function cleanTypes() {
  gulp.src('types/*.js').pipe(clean());
}

/**
 * Cleans HTML's compilation results
 */
function cleanHTML() {
  return new Promise((resolve, reject) => {
      gulp.src('html/*.min.html').pipe(clean())
        .on('error', reject)
        .on('end', resolve)
    });
}

/**
 * Style Task compiles Sass, SCSS and normal css to minified css
 */
function style() {
  cleanStyle().then(() => {
    gulp.src('style/css/*.css')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(autoprefixer())
      .pipe(cleanCSS())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('style/css/'));

    gulp.src('style/scss/*.scss')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(cleanCSS())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('style/css/'));

    gulp.src('style/sass/*.sass')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(cleanCSS())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('style/css/'));
  });
}

/**
 * Typescript compiles typescript from ./ and ./scripts/
 */
function typescript() {

  cleanTypescript();

  gulp.src('*.ts')
    .pipe(plumber())
    .pipe(ts.createProject('tsconfig.json')({}))
    .on("error", () => {})
    .pipe(babel({
      presets: ["babel-preset-env"].map(require.resolve)
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'));

  gulp.src('scripts/*.ts')
    .pipe(plumber())
    .pipe(ts.createProject('tsconfig.json')({}))
    .on("error", () => {})
    .pipe(babel({
      presets: ["babel-preset-env"].map(require.resolve)
    }))
    .pipe(uglify())
    .pipe(gulp.dest('scripts/'));
}


/**
 * Compiles typescript trom ./types
 */
function types() {
  cleanTypes();

  gulp.src('types/*.ts')
    .pipe(plumber())
    .pipe(ts.createProject('tsconfig.json')({}))
    .on("error", () => {})
    .pipe(babel({
      presets: ["babel-preset-env"].map(require.resolve)
    }))
    .pipe(uglify())
    .pipe(gulp.dest('types/'));
}

/**
 * Minifies HTML from ./html
 */
function html() {
  cleanHTML().then(() => {
    gulp.src('html/*.html')
      .pipe(plumber())
      .pipe(htmlmin({
        collapseWhitespace: true
      }))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('html/'));
  });
}

/**
 * listens for style changes and autocompiles
 */
function listenStyle() {
  gulp.watch(['style/sass/*.sass', 'style/scss/*.scss', 'style/css/*.css', '!style/css/*.min.css'], ['style']);
}

/**
 * listens for typescript changes and autocompiles
 */
function listenTypescript() {
  gulp.watch(['scripts/*.ts', "*.ts"], ['typescript']);
}

/**
 * listens for types changes and autocompiles
 */
function listenTypes() {
  gulp.watch(['types/*.ts'], ['types']);
}

/**
 * Listen html and autocompiles
 */
function listenHTML() {
  gulp.watch(['html/*.html', '!html/*.min.html'], ['html']);
}

/**
 * Listen everything and autocompiles
 */
function listen (){
  listenStyle();
  listenTypescript();
  listenTypes();
  listenHTML();
}

function once() {
  gulp.start("style");
  gulp.start("typescript");
  gulp.start("types");
  gulp.start("html");
}

function start() {
  once();
  listen();
}


/**
 * Help task
 */
function help() {
  function stringRepeat(string, count) {
    let ret = ""
    for (let i = 0; i < count; i++) ret += string;
    return ret;
  }

  function renderTemplate(template) {
    size = 0;
    let sizes = []
    template.forEach((e) => {
      if (e instanceof Array)
        e.forEach((c, i) => {
          if (!sizes[i]) sizes[i] = 0
          if ((c.length + 1) > sizes[i]) {
            sizes[i] = c.length + 1;
          }
        })
      else if (size < e.length) size = e.length;
    })
    let x = 0;
    sizes.forEach((e) => {
      x += e
    })
    if (size < x) size = x;
    let render = Formats.FgYellow + "┌" + stringRepeat("─", size + 1) + "┐" + Formats.Reset
    template.forEach((e) => {
      render += "\n"
      if (e instanceof Array) {
        render += Formats.FgYellow + "│ " + Formats.Reset
        let x = ""
        e.forEach((c, i) => {
          if (tablecolors[i]) x += tablecolors[i]
          x += c + Formats.Reset + stringRepeat(" ", sizes[i] - c.length)
        });
        x += stringRepeat(" ", size - x.length)
        render += x + Formats.FgYellow + "|" + Formats.Reset
      } else render += Formats.FgYellow + "│ " + Formats.Reset + e + stringRepeat(" ", size - e.length) + Formats.FgYellow + "│" + Formats.Reset;
    });
    render += Formats.FgYellow + "\n└" + stringRepeat("─", size + 1) + "┘" + Formats.Reset
    return render;
  }

  console.log(renderTemplate([
    "Help Menu",
    "",
    ["Category", "Name", "Command", "Description"],
    ["Compiler", "Style", "gulp style", "Creates min css from sass, scss or css files."],
    ["", "Typescript", "gulp typescript", "Compiles typescript from ., ./scripts to min javascript."],
    ["", "Types", "gulp types", "Compiles the typescript from ./types to min javascript."],
    ["", "HTML", "gulp html", "Compiles .html files from ./html to min files."],
    ["Linsteners", "Style listener", "gulp listen-style", "Listens for style changes and compiles them."],
    ["", "Typescript listener", "gulp listen-typescript", "Listens for typescript changes and compiles them."],
    ["", "Types listener", "gulp listen-types", "Listens for types changes and compiles them."],
    ["", "HTML listener", "gulp listen-html", "Listens for html changes and compiles them."],
    ["Cleaners", "Style cleaner", "gulp clean-style", "Cleans the compiled style files."],
    ["", "Typescript cleaner", "gulp clean-typescript", "Cleans the compiled typescript files."],
    ["", "Types cleaner", "gulp clean-types", "Cleans the compiled types files."],
    ["", "HTML cleaner", "gulp clean-html", "Cleans the compiled html files."],
    ["Multi Compiler", "Once", "gulp once", "Compiles everything once."],
    ["", "Listener", "gulp listen", "Binds all compile Listeners."],
    ["", "Start", "gulp start", "Compiles everything once and binds listeners."],
    ["", "", "gulp defaut", ""],
    ["", "", "gulp", ""],
    ["Others", "Help", "gulp help", "Shows this menu."],
    "",
    stringRepeat(" ", 85) + "- Copyright (c) Minimine 2019"
  ]))
}

gulp.task("clean-style",cleanStyle)
gulp.task("clean-typescript",cleanTypescript)
gulp.task("clean-types",cleanTypes)
gulp.task("clean-html",cleanHTML)

gulp.task("style",style);
gulp.task("typescript", typescript);
gulp.task("types", types)
gulp.task("html", html)

gulp.task("listen-style",listenStyle)
gulp.task("listen-typescript",listenTypescript)
gulp.task("listen-types",listenTypes)
gulp.task("listen-html",listenHTML)

gulp.task("help", help)
gulp.task("listen", listen)
gulp.task("once", once)
gulp.task("start", start)
gulp.task("default", start)
