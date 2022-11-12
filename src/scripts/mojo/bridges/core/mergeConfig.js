export default class MergeConfig {
    constructor(config, newConfig) {
        if (newConfig !== undefined) {
            const mergeConfigs = (source, target) => {
                return (
                    Object.keys(target).forEach((key) => {
                        source[key] instanceof Object && target[key] instanceof Object
                            ? source[key] instanceof Array && target[key] instanceof Array
                            ? void (source[key] = Array.from(
                                new Set(source[key].concat(target[key]))
                            ))
                            : !(source[key] instanceof Array) && !(target[key] instanceof Array)
                                ? void mergeConfigs(source[key], target[key])
                                : void (source[key] = target[key])
                            : void (source[key] = target[key]);
                    }) || source
                );
            };

            function refactorConfig(c) {
                if (
                    c.base !== undefined &&
                    c.base.fonts !== undefined &&
                    Object.keys(c.base.fonts).length > 0
                ) {
                    config.base.fonts = c.base.fonts;
                }

                config.base.breakpoints = Object.entries(config.base.breakpoints)
                    .sort(([, a], [, b]) => parseInt(a.min) - parseInt(b.min))
                    .sort(([, a], [, b]) => parseInt(b.max) - parseInt(a.max))
                    .reduce((r, [k, v]) => ({...r, [k]: v}), {});
            }

            mergeConfigs(config, newConfig);
            refactorConfig(config);
        }

        return config;
    }
}