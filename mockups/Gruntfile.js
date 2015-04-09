module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    distdir: 'dist',
    src: {
      less: ['src/less/styles.less']
    },
    clean: ['dist'],
    copy: {
      dev: {
        files: [
          { src: ['src/index.html'], dest: '<%= distdir %>/index.html' },
          { src: ['lib/bootstrap/js/bootstrap.min.js'], dest: '<%= distdir %>/js/bootstrap.min.js' },
          { expand: true, cwd: 'src/js/', src: ['*.js'], dest: '<%= distdir %>/js/', filter: 'isFile' }
        ]
      }
    },
    less: {
      dev: {
        options: {
          compile: true
        },
        files: {
          '<%= distdir %>/css/styles.css': ['<%= src.less %>']
        }
      }
    },
    watch: {
      files: 'src/**/*',
      tasks: ['clean', 'less', 'copy'],
      options: {
        debounceDelay: 500
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['clean', 'less', 'copy']);
}
