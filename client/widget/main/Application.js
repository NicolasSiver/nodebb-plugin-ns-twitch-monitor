/**
 * Created by Nicolas on 6/28/15.
 */
import $ from 'jquery';
import SocketService from '../service/SocketService';

export default class TwitchMonitor {
    constructor() {
        this.socketService = new SocketService();
    }

    init(limit, layoutDirection, containerSelector) {
        this.limit = limit;
        this.vertical = layoutDirection === 'vertical';
        this.$container = $(containerSelector);
    }
}