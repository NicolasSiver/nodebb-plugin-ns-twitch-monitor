/**
 * Created by Nicolas on 6/28/15.
 */
import Application from './main/Application';

//Register namespace for global objects
window.ns = window.ns || {};

//Bootstrapping main application
window.ns.TwitchMonitor = new Application();

