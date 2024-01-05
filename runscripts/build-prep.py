import subprocess
import os

def run_command(command, cwd=None):
    
    """
    run a shell command 
    """

    try:
        result = subprocess.run(command, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print(f"success: {result.stdout.decode().strip()}")

    except subprocess.CalledProcessError as e:
        print(f"Error: {e.stderr.decode().strip()}")

    

def main():
    backend_project_dir = os.path.expanduser("~/Sacred_scrolls_Project/backend")
    frontend_project_dir = os.path.expanduser("~/Sacred_Scrolls_Project/frontend")

    backend_commands = [
        "pip3 install -r ~/Sacred_Scrolls_Project/backend/requirements.txt",
        "python3 manage.py makemigrations",
        "python3 manage.py migrate"

    ]

    frontend_commands = [
        "npm run build",
        "sudo cp -r ~/Sacred_scrolls_Project/frontend/dist/ /usr/share/nginx/html",
        "sudo service nginx restart"
    ]

    for cmd in backend_commands:
        if 'manage.py' in cmd:
            # Run Django management commands inside the project directory
            print(f"Running: {cmd} in {backend_project_dir}")
            run_command(cmd, cwd=backend_project_dir)
        else:
            print(f"Running: {cmd}")
            run_command(cmd)

    for cmd in frontend_commands:
        if 'npm' in cmd:
            print (f"Running: {cmd} in {frontend_project_dir}")
            run_command(cmd, cwd=frontend_project_dir)
        else:
            print(f"Running: {cmd}")

