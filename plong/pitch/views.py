from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from channels.generic.websocket import WebsocketConsumer

# Create your views here.

from pitch.analyser import AnalyzerConsumer 

def base(request):
    template = loader.get_template('base.html')
    return HttpResponse(template.render())
