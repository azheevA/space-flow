module.exports = {
  main: {
    input: "./server/api-orval/schema.yaml",
    output: {
      target: "./server/generate/generate.ts",
      prettier: true,
      override: {
        mutator: {
          path: "./server/api-instance.ts",
          name: "createInstance",
        },
      },
    },
  },
};
