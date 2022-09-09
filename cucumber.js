process.env.PORT = "0";
process.env.DISPATCH_DAYS = "10";
module.exports = {
    default: [
        "--require-module ts-node/register",
        "--require features/**/*.ts",
        "--publish-quiet"
    ].join(" ")
};
