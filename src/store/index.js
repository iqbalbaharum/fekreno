import Vue from "vue";
import Vuex from "vuex";
import VuexORM from "@vuex-orm/core";
import getters from "./getters";
import database from "../database";
import VuexORMSearch from "@vuex-orm/plugin-search";

import user from "./modules/user";
import app from "./modules/app";
import session from "./modules/session";
import zone from "./modules/zone";
import role from "./modules/role";
import project from "./modules/project";
import journal from "./modules/journal";
import country from "./modules/country";
import material from "./modules/material";
import devenvironment from "./modules/devenvironment";
import repository from "./modules/repository";
import position from "./modules/position";
import applicaton from "./modules/application";
import userapplication from "./modules/userapplication";
import tags from "./modules/tags";
import file from './modules/file'

Vue.use(Vuex);
VuexORM.use(VuexORMSearch);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      user,
      app,
      session,
      zone,
      role,
      project,
      journal,
      country,
      material,
      devenvironment,
      repository,
      position,
      applicaton,
      userapplication,
      tags,
      file
    },
    getters,
    plugins: [VuexORM.install(database)],

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
