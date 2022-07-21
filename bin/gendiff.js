#!/usr/bin/env node

import { parseArgs, genDiff } from '../index.js'

const [filepath1, filepath2, format] = parseArgs();
console.log(genDiff(filepath1, filepath2, format));
