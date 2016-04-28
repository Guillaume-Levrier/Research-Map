# Research Map

•	The Research Map - [access the live map here](http://institute.eib.org/map/map.html) - is an online interactive tool designed to provide easy access to research papers produced with the support of the EIB Institute (EIBI). It is written in JavaScript using the D3.js library.

•	Users can access scientific articles and reports by clicking on a university logo, which triggers the display of the relevant items in the list.

•	Two different systems are called up: the map shows all universities involved in research projects supported by the EIBI, while the directory displays the list of research projects and the related outputs (scientific articles, books or chapters of books, working papers and unpublished reports).

The map is a [Voronoi Arc Map](https://gist.github.com/mbostock/7608400) with images added on top of it (CSS). Each logo has a specific url link which targets the iframe below. Instead of having a different webpage for each project, the *directory.html* file is a long list with each project having a specific ID (targeted using a specific url in the form of *directory.hml#XXX*). The **?** question mark triggers an overlay with two tabs : *how to use the map* and *changelog*.

