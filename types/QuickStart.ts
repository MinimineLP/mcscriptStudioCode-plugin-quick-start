// WARNING: if you want to use an api you have in your main clas you can there put it into the global variable
// and just declare it here, but if you want to export declarations here, it is not enough to export it via typescript's
// export function, you also have to put it into the module.exports variable manually, becouse typescript dont does that!

/**
 * @class QuickStart
 * @package MCScriptStudioCode Plugin Quick Start
 * @author Minimine
 * @since 0.0.1
 * @version 0.0.1
 *
 * @desc This is the quick start for building a package api
 *
 */
export class QuickStart {

}

let api = new QuickStart();

export default api;
export {api};
