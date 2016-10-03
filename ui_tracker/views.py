from __future__ import absolute_import, print_function, unicode_literals
import urllib
import os
from django.http import HttpResponse

def UITrackerView(request):
    # import pdb; pdb.set_trace();
    path = os.path.dirname(os.path.realpath(__file__))+'/ui_tracking.txt'
    with open(path, "a") as myfile:
        myfile.write(urllib.unquote('{'+request.META['QUERY_STRING'])+'}')

    return HttpResponse(status=204)
