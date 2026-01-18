# Orthonormal Basis Finder > Group 8 > CS 2-5
---
## Deployed Website : https://orthonormalbasisfinder.onrender.com
### User Guide: [Click here](Group-8_OBS-User-Guide.pdf)

## Project Notes: 
- **The project is mainly set to be accessible under the website on this [link](https://orthonormalbasisfinder.onrender.com)**
The entire project is deployed on a simplified cloud deployment platform called [Render](https://render.com/) under the free-plan and **will take estimated 1~2 minutes of initialization after the website has not been visited for a while**. 
Computations may also have some latency, but will always output while the website is live.

### Want to run on your own machine !OPTIONAL! ?
You may also install this package in your own machine via forking, but before we run the project through your machine as a local host, we do the following set-up;
- First make sure your **python environment is configured**. This project was developed with _python 3.12_ and above
- Uncomment the following;
`app.run(debug=True)` under app/\_\_init\_\_.py and
```python
def main():
     create_app().run(debug=True)
    
if __name__ == "__main__":
     main();
```
under web/__init__.py
- Once done, through your python environment, over the root folder; run the following;
```python
pip install -r requirements.txt
```
then 
```python
python -m app
```
The first python command is to install all required dependencies, then the second calls \_\_init\_\_.py under app/ which creates the app itself. 
- Finally, the terminal outputs an **http** link,  it is the local host for the app, and when visited through any **web browser** will show the website

## Developer/Student notes
\- to Sir Pat,

Thank you for this semester Sir Pat! We hope you enjoy our work


