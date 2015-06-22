/**
 * Created by Nicolas on 6/21/15.
 */
import Reflux from 'reflux';

export var Actions = Reflux.createActions([
    'addChannel', //Add a new channel to the list, it will be validated on server
    'validateClientId' //Check for Client ID validity, Twitch requirement to use client id for every API request
]);
