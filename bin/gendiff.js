import cli from "../src/cli.js";
import genDiff from "../src/index.js";

const [filepath1, filepath2, format] = cli()
genDiff(filepath1, filepath2)
