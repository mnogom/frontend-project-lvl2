### Hexlet tests and linter status:


# Difference Generator

---
### Hexlet tests and linter status:
[![node-ci](https://github.com/mnogom/frontend-project-lvl2/actions/workflows/node-ci.yml/badge.svg)](https://github.com/mnogom/frontend-project-lvl2/actions/workflows/node-ci.yml)
[![Actions Status](https://github.com/mnogom/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/mnogom/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/812f47ed75da17428108/maintainability)](https://codeclimate.com/github/mnogom/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/812f47ed75da17428108/test_coverage)](https://codeclimate.com/github/mnogom/frontend-project-lvl2/test_coverage)


---
### Installation
```commandline
git clone https://github.com/mnogom/frontend-project-lvl2
cd frontend-project-lvl2
make install
```

---
### Usage
1. From command line
```commandline
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version          output the version number
  -f, --format <format>  set formatters of output (default: "stylish")
  -h, --help             display help for comman
```

---
### Features
1. Works with ***JSON*** and ***YAML*** format
2. Works with ***Plain*** and ***Recursive*** file structures
3. Output in ***Stylish***, ***Plain*** and ***JSON*** formats

*See examples below*

---
### Examples
#### Plain JSON @ Stylish format
[![asciicast](https://asciinema.org/a/C2l9MVxQheGPdzy9pUaQSELit.svg?)](https://asciinema.org/a/C2l9MVxQheGPdzy9pUaQSELit)

#### Plain YAML @ Stylish format
[![asciicast](https://asciinema.org/a/ntkiU0MkQgkmFAQYbiVpntgCG.svg?)](https://asciinema.org/a/ntkiU0MkQgkmFAQYbiVpntgCG)

#### Recursive JSON @ Stylish format
[![asciicast](https://asciinema.org/a/kivjrbRyj1hSe9PxYSRZZdPTW.svg?)](https://asciinema.org/a/kivjrbRyj1hSe9PxYSRZZdPTW)

#### Recursive JSON @ Plain format
[![asciicast](https://asciinema.org/a/TW3TDGf5cCZr0sHH2mVMQHaas.svg?)](https://asciinema.org/a/TW3TDGf5cCZr0sHH2mVMQHaas)

#### Recursive JSON @ JSON format
[![asciicast](https://asciinema.org/a/rwCWjWP7tpr0srJpjuO3NPyrj.svg?)](https://asciinema.org/a/rwCWjWP7tpr0srJpjuO3NPyrj)
