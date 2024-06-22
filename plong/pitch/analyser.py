import os
import cv2
import threading
import numpy as np
from deepface import DeepFace
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.exceptions import StopConsumer

# This class should be rewritten to be the consumer. 
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

import asyncio
class AnalyzerConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.loop = asyncio.get_running_loop()
        await self.accept()

    async def disconnect(self, close_code):
        self.stop = True
        raise StopConsumer

    async def receive(self, bytes_data):
        if not (bytes_data):
            print("Closed Connection")
            await self.close()
        else:
            self.frame = await self.loop.run_in_executor(None, cv2.imdecode, np.frombuffer(bytes_data, dtype=np.uint8),cv2.IMREAD_COLOR)
            self.gray = cv2.cvtColor(self.frame, cv2.COLOR_BGR2GRAY)
            self.rgb = cv2.cvtColor(self.gray, cv2.COLOR_GRAY2RGB)

            self.result = "temp"

            # Detect faces in the frame
            faces = face_cascade.detectMultiScale(self.gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

            for (x, y, w, h) in faces:
                # Extract the face ROI (Region of Interest)
                face_roi = self.rgb[y:y + h, x:x + w]

                # Perform emotion analysis on the face ROI
                result = DeepFace.analyze(face_roi, actions=['emotion'], enforce_detection=False)

                # Determine the dominant emotion
                emotion = result[0]['dominant_emotion']
                asyncio.sleep(1000)
                await self.send(emotion)       
        
            
        


