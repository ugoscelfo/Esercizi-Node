const missingSetting = "warning: no value set for this env variable"

const config = {
  "PORT" : process.env.PORT || missingSetting
};

export default config;