from __future__ import absolute_import, print_function, unicode_literals

from kolibri.core.webpack import hooks as webpack_hooks
from kolibri.plugins.base import KolibriPluginBase

from . import hooks, urls


class UITrackerPlugin(KolibriPluginBase):
    pass


class UITrackerAsset(webpack_hooks.WebpackBundleHook):
    unique_slug = "ui_tracker_module"
    src_file = "assets/src/module.js"
    events = {
        "content_render:exercise/perseus": "render"
    }

class UITrackerInclusionHook(hooks.UITrackerSyncHook):
    bundle_class = UITrackerAsset
