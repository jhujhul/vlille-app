"use strict";

module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-express-server");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ng-constant");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-angular-templates");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-usemin");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-ng-annotate");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-targethtml");
  grunt.loadNpmTasks("grunt-filerev");

  grunt.initConfig({
    express: {
      dev: {
        options: {
          script: "server.js"
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      public: {
        files: [
          "client/app/**/*.css",
          "client/app/**/*.js",
          "client/app/**/*.html",
          "client/index.html"
        ]
      }
    },
    ngconstant: {
      options: {
        name: "config",
        dest: "client/app/app.config.js"
      },
      dev: {
        constants: {
          config: grunt.file.readJSON("client/config-dev.json")
        }
      },
      prod: {
        constants: {
          config: grunt.file.readJSON("client/config-prod.json")
        }
      }
    },
    clean: ["dist/", ".tmp/"],
    ngtemplates: {
      app: {
        cwd: "client",
        src: "app/**/*.html",
        dest: "client/app/app.templates.js",
        options: {
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          },
          usemin: "js/scripts.js"
        }
      }
    },
    copy: {
      main: {
        files: [
          {
            src: "client/index.html",
            dest: "dist/index.html"
          },
          {
            expand: true,
            cwd: "client/",
            src: ["assets/**"],
            dest: "dist/"
          },
          {
            src: "client/sitemap.xml",
            dest: "dist/sitemap.xml"
          },
          {
            src: "client/google9e3aa6c7a801453c.html",
            dest: "dist/google9e3aa6c7a801453c.html"
          }
        ]
      },
      usemin: {
        files: [
          {
            expand: true,
            cwd: ".tmp/concat/",
            src: ["**"],
            dest: "dist/"
          }
        ]
      }
    },
    useminPrepare: {
      html: "client/index.html",
      options: {
        root: "client",
        dest: "dist"
      }
    },
    ngAnnotate: {
      dist: {
        files: [
          {
            src: ".tmp/concat/js/scripts.js",
            dest: ".tmp/concat/js/scripts.js"
          }
        ]
      }
    },
    usemin: {
      html: ["dist/index.html"]
    },
    concat: {
      // Wrap script.js in a iife
      iife: {
        src: ["dist/js/scripts.js"],
        dest: "dist/js/scripts.js",
        options: {
          banner: "(function () {",
          footer: "})();"
        }
      }
    },
    targethtml: {
      dist: {
        files: {
          "dist/index.html": "dist/index.html"
        }
      }
    },
    filerev: {
      dist: {
        src: ["dist/css/**", "dist/js/**"]
      }
    }
  });

  grunt.registerTask("serve", "Start a local web server", function() {
    grunt.task.run(["ngconstant:dev", "express", "watch"]);
  });

  grunt.registerTask("build", "Build webapp for deployment", function(env) {
    var env = env || "dev";

    grunt.task.run([
      "clean",
      "ngconstant:" + env,
      "copy:main",
      "useminPrepare",
      "ngtemplates",
      "concat:generated",
      "ngAnnotate:dist",
      "copy:usemin",
      "cssmin:generated",
      "uglify:generated",
      "concat:iife",
      "usemin",
      "filerev:dist",
      "usemin",
      "targethtml:dist"
    ]);
  });
};
