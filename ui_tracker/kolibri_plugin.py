from __future__ import absolute_import, print_function, unicode_literals

from kolibri.core.webpack import hooks as webpack_hooks
from kolibri.plugins.base import KolibriPluginBase

from . import urls


class UITrackerPlugin(KolibriPluginBase):
    def url_module(self):
        return urls

    def url_slug(self):
        return "^ui_tracker.png"


class UITrackerAsset(webpack_hooks.WebpackBundleHook):
    unique_slug = "ui_tracker_module"
    src_file = "assets/src/module.js"



class UITrackerInclusionHook(webpack_hooks.FrontEndBaseSyncHook):
    bundle_class = UITrackerAsset
