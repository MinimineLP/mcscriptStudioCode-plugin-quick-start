// this is the full MCScriptStudioCode api
import * as mcscriptstudiocode from 'mcscriptstudiocode'

// with @mcscriptstudiocode/ you can load modules from mcscriptstudiocode like the pluginmanager for the pluginapi
import { ServerApi, Plugin } from "@mcscriptstudiocode/pluginmanager";

/**
 * @class QuickStart
 * @package MCScriptStudioCode Plugin Quick Start
 * @author Minimine
 * @since 0.0.1
 * @version 0.0.1
 *
 * @desc This is the quick start for building a package / plugin for mcscriptstudiocode. It works correctly and will be loaded by the program, but has no realy sencefull features included!
 *
 */
export default class QuickStart extends Plugin {

  static instance:Plugin;
  server: ServerApi;

  /**
   * @function setup
   * @package MCScriptStudioCode Plugin Quick Start
   * @author Minimine
   * @since 0.0.1
   * @version 0.0.1
   *
   * @desc The setup function is called for the setup
   * @arg server:ServerApi the ServerApi gives usefull functions for the plugins
   *
   */
  setup(server: ServerApi) {

    QuickStart.instance = this;
    this.server = server;

    console.log("Quick start plugin loaded")

    // For demonstration open the dev tools
    mcscriptstudiocode.openDevTools();
  }

  /**
   * @function start
   * @package MCScriptStudioCode Plugin Quick Start
   * @author Minimine
   * @since 0.0.1
   * @version 0.0.1
   *
   * @desc the start function starts the plugins. Here you can manipulate elements etc...
   * @arg server:ServerApi the ServerApi gives usefull functions for the plugins
   *
   */
  start(server: ServerApi) {

    this.server = server;
    console.log("Quick start plugin started")

  }

  /**
   * @function stop
   * @package MCScriptStudioCode Plugin Quick Start
   * @author Minimine
   * @since 0.0.1
   * @version 0.0.1
   *
   * @desc the stop function is called for program stop. this does not work always for now
   * @arg server:ServerApi the ServerApi gives usefull functions for the plugins
   *
   */
  stop(server: ServerApi) {

    this.server = server;
    console.log("Quick start plugin stopped")

  }

  /**
   * @function reload
   * @package MCScriptStudioCode Plugin Quick Start
   * @author Minimine
   * @since 0.0.1
   * @version 0.0.1
   *
   * @desc the reload function is called on program stop. this does not work always for now
   * @arg server:ServerApi the ServerApi gives usefull functions for the plugins
   *
   */
  reload(server: ServerApi) {

    this.server = server;
    console.log("Quick start plugin reloaded")

  }
}
