from __future__ import absolute_import, print_function, unicode_literals

from django.http import HttpResponse

def UITrackerView(request):
    # import pdb; pdb.set_trace();
    print('elielieliiiii: '+request.META['QUERY_STRING'])
    return HttpResponse(status=204)
