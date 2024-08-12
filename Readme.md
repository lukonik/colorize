# Intro

Colorize is an open-source project that allows you to bring color to black-and-white images using the advanced [DeOldify](https://github.com/jantic/DeOldify) model. Designed for developers and enthusiasts, this project provides a comprehensive solution for image colorization that you can clone, deploy, and run on your own infrastructure.

The project is composed of two main components: a front-end (FE) where users can easily upload images, and a back-end (BE) that processes and colorizes the images using the DeOldify model. With clear setup instructions, you'll find it straightforward to configure the environment and start using the tool.

# Demo video


https://github.com/user-attachments/assets/ad5eb84d-2106-483c-88dd-7224f18f9c88



## Client

Client is a web app which is based on react. it uses [React Material](https://mui.com/) as UI framework, and [Vite](https://vitejs.dev/) as a DEV tool.  
In order to start navigate to the frontend directory  
`cd frontend`

install the packages (only for the first time)  
`npm install`

run the server  
`npm run dev`

the client server will start on  
http://localhost:5174/

## Server

Server is a python based app, that uses [fastAPI](https://fastapi.tiangolo.com/) as a web server, and [Deoldify](https://github.com/jantic/DeOldify) as a colorizer model.
You need [Conda](https://conda.io/projects/conda/en/latest/index.html) package manager in order to install packages for the project.Once it is installed, follow the steps:

navigate to the backend directory  
`cd backend`

create the virtual environment with conda and environment.yml file (It only needs to run once). run the following in the terminal  
`conda env create -f environment.yml`

it will create the environment named colorize and install the dependencies into it. Once it is finished you'll need to activate the environment, run:  
`conda activate colorize`

after that you can run the dev server:  
`uvicorn app:app --reload --port 8000`

> **⚠️ Important Note:**
>
> When you run the server for the first time, it will download the model weights from DeOldify's storage (via Dropbox). This process may take approximately 10-15 minutes. You will know that the server has started successfully when you see the "Application startup complete" message in the console. For subsequent runs, the server will use the existing model weights from the local `backend/models` folder, so the startup time will be significantly faster.

the server will start on  
http://127.0.0.1:8000
