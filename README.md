# Research-Map

•	The Research Map - [access the live map here](http://institute.eib.org/map/map.html) - is an online interactive tool to access research papers produced under the EIB Institute’s research programmes. It is written in JavaScript using the D3.js library.
•	Its goal is to enable researchers and the general public to easily parse through outputs produced under the research projects.
•	It has two parts: a map that shows all the universities that have been working on EIBI financed research projects and a directory that displays the list of outputs (scientific articles, books or chapters of books, working papers and unpublished reports).

The map is a [Voronoi Arc Map](https://gist.github.com/mbostock/7608400) with images on top of it (added through CSS). Each logo has a specific url link that targets the iframe below. Instead of having a different webpage for each project, the *directory.html* file is a long list with each project having a specific ID (targeted using a specfic url in the form of *directory.hml#XXX*). The **?** question mark triggers an overlay with two tabs : *how to use the map* and *changelog*.

Logos are displayed in smaller versions because IE 11 does not render image scaling well. Higher definition logos will be used in a near future.
