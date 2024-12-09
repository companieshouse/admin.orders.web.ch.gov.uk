process.env.PORT = "0";
process.env.DISPATCH_DAYS = "10";
process.env.COOKIE_NAME = process.env.COOKIE_NAME || "test";

module.exports = {
    default: [
        "--require-module ts-node/register",
        "--require features/**/*.ts",
        "--publish-quiet"
    ].join(" ")
};
