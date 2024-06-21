import cv2
import threading
from deepface import DeepFace
from channels.generic.websocket import WebsocketConsumer

# This class should be rewritten to be the consumer. 
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + './static/machine-learning/haarcascade_frontalface_default.xml')

class AnalyzerConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        self.send("Nice" + text_data)
