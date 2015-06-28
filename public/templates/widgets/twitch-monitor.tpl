<div class="widget-twitch-monitor"></div>

<script>
    'use strict';

    $(document).ready(function () {
        var limit  = {limit},
            layout = '{layout}';

        ns.TwitchMonitor.init(limit, layout, $('.widget-twitch-monitor'));
    });
</script>