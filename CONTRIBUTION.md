Every bugfix or feature is welcome! At least there are some requirements that must be fulfilled:

- this package must work with the css from the CDN (https://code.getmdl.io/1.2.1/material.indigo-pink.min.css)
- this package must work with the included scss files. these files are copied from the material-design-lite package and all mask images are included to make the usage as easy as possible. All extensions must exist outside of the scss/mdl directory or they will be overwritten the next time we pull from mdl.
- this package should only provide what is provided by material design lite so far (to keep it clean, maintainable and predictable what is included)
If these requirements can't be guaranteed there is an extension package (https://github.com/mseemann/angular2-mdl-ext). this package is open for nearly every new feature.
