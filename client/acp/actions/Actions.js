/**
 * Created by Nicolas on 6/21/15.
 */
import Reflux from 'reflux';

export var Actions = Reflux.createActions([
    'validateClientId' //Check for Client ID validity, Twitch requirement to use client id for every API request
]);
