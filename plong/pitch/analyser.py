import cv2
import threading
from deepface import DeepFace

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + './static/machine-learning/haarcascade_frontalface_default.xml')

