<h1 align="center">
  Kibisis Toolkit
</h1>

<p align="center">
  A collection of UI components, utilities and types that are used throughout the Kibisis ecosystem.
</p>

---

### Table of contents

* [1. Overview](#-1-overview)
  - [1.1. Monorepo project structure](#11-monorepo-project-structure)
* [2. Getting started](#-2-getting-started)
  - [2.1. Requirements](#21-requirements)
  - [2.2. Installation](#22-installation)
* [3. Appendix](#-3-appendix)
  - [3.1. Packages](#31-packages)
* [4. How to contribute](#-4-how-to-contribute)

## 🗂️ 1. Overview

### 1.1. Monorepo project structure

The repo follows the following structure:

```text
.
├─ packages
│   ├── <package>
│   │   ├── .lintstagedrc.mjs
│   │   ├── LICENSE
│   │   ├── package.json       <-- contains package dependencies and is used to run package-level scripts
│   │   ├── README.md
│   │   ├── release.config.mjs <-- semantic release configuration
│   │   └── ...
│   └── ...                    <-- other packages
├── package.json               <-- root package.json that contains top-level dependencies and tools
└── ...
```

#### Root `package.json`

The root `package.json` utilizes `pnpm`'s workspace feature. The root `package.json` should only reference packages that are used at the root level or are utilities/tools.

#### `packages/` Directory

The `packages/` directory contains, as the name suggests, the packages of the monorepo.

#### `packages/<package_name>` Directory

Each package **SHOULD** reflect the name of the package, i.e. the `packages/<package_name>/` and **SHOULD** contain the following files and directories:

* `.lintstagedrc.mjs` - Scripts to run on the pre-commit hook. This file is **REQUIRED**, however, if there are no scripts to run, use an empty file.
* `LICENSE` - The license for the package.
* `package.json` - The package's dependencies and is used to run package-level scripts.
* `README.md` - Contains installation and usage instructions relevant to the package.
* `release.config.mjs` - The local `semantic-release` configuration.

## 🪄 2. Getting started

### 2.1. Requirements

* Install [Node v20.9.0+](https://nodejs.org/en/) (LTS as of 9th November 2024)
* Install [pnpm v10.3.0+](https://pnpm.io/installation)

<sup>[Back to top ^][table-of-contents]</sup>

### 2.2. Installation

1. Install the dependencies using:

```shell
pnpm install
```

<sup>[Back to top ^][table-of-contents]</sup>

## 📑 3. Appendix

### 3.1. Packages

| Name                                                                                               | Visibility | Description                                                                                                                                                          | Package                                                                                                                   |
|----------------------------------------------------------------------------------------------------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| [`@kibisis/assets`](https://github.com/kibis-is/toolkit/blob/main/packages/assets/README.md)       | `public`   | Provides the tools necessary to easily create and interact with AVM assets, including standard assets (SA), ARC-0200 compliant assets and ARC-0072 compliant assets. | [![NPM Version](https://img.shields.io/npm/v/%40kibisis%2Fassets)](https://www.npmjs.com/package/%40kibisis/assets)       |
| [`@kibisis/chains`](https://github.com/kibis-is/toolkit/blob/main/packages/chains/README.md)       | `public`   | Configurations and utilities for the AVM chains.                                                                                                                     | [![NPM Version](https://img.shields.io/npm/v/%40kibisis%2Fchains)](https://www.npmjs.com/package/%40kibisis/chains)       |
| [`@kibisis/icons`](https://github.com/kibis-is/toolkit/blob/main/packages/icons/README.md)         | `public`   | Icons used in Kibisis apps.                                                                                                                                          | [![NPM Version](https://img.shields.io/npm/v/%40kibisis%2Ficons)](https://www.npmjs.com/package/%40kibisis/icons)         |
| [`@kibisis/react`](https://github.com/kibis-is/toolkit/blob/main/packages/react/README.md)         | `public`   | React UI components used in the Kibisis apps.                                                                                                                        | [![NPM Version](https://img.shields.io/npm/v/%40kibisis%2Freact)](https://www.npmjs.com/package/%40kibisis/react)         |
| [`@kibisis/utilities`](https://github.com/kibis-is/toolkit/blob/main/packages/utilities/README.md) | `public`   | TypeScript utilities for Kibisis apps/tools.                                                                                                                         | [![NPM Version](https://img.shields.io/npm/v/%40kibisis%2Futilities)](https://www.npmjs.com/package/%40kibisis/utilities) |

<sup>[Back to top ^][table-of-contents]</sup>

## 👏 4. How to contribute

Please read the [**contributing guide**](https://github.com/kibis-is/toolkit/blob/main/CONTRIBUTING.md) to learn about the development process.

<sup>[Back to top ^][table-of-contents]</sup>

<!-- links -->
[table-of-contents]: #table-of-contents
