from flask import Flask, jsonify
import subprocess
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

serviceCommands = {
    'start': "docker-compose start {container}",
    'stop': "docker-compose stop {container}",
    'restart': "docker-compose restart {container}",
    'pull': "docker-compose pull {container}",
    'rebuild': "docker-compose up --build {container} -d",
    'logs': "docker-compose logs --tail 50 {container}"
}

@app.route('/api/services')
def getServicesAPI():
    res = subprocess.check_output("docker ps -a --format {{.Names}}".split(' '))
    #format res as a list
    res = list(filter(None, res.decode('utf-8').split('\n')))
    return jsonify(res)

@app.route('/api/services/status')
def getServiceStatus():
    #use docker-compose ps to get the status of the container
    # extract the status from the output
    res = runCommand(['docker', 'ps', '--format="{{.Names}} {{.Status}}"', '-a'])
    if "No such service" in res.decode('utf-8'):
        jsonify({'status': "Service not found"})
    elif res.decode('utf-8') == "":
        return jsonify({'status': "Stopped"})
    res = res.decode('utf-8').replace('"', '').split('\n')
    return jsonify({'status': res[:-1]})

# @app.route('/api/services/<string:container>/logs')
# def getLogs(container):
#     global serviceCommands
#     if "logs" not in serviceCommands:
#         return jsonify({'error': 'Invalid command'})
#     command = serviceCommands["logs"].format(container=container)
#     res = runCommand(command.split(' '))
#     return jsonify({'logs': res.decode('utf-8')})

@app.route('/api/services/<string:container>/<string:command>', methods=['GET', 'POST'])
def executeServiceAction(container, command):
    global serviceCommands
    if command not in serviceCommands:
        return jsonify({'error': 'Invalid command'})
    command = serviceCommands[command].format(container=container)
    res = runCommand(command.split(' '))
    return jsonify({'output': res.decode('utf-8')})

def runCommand(command):
    res = subprocess.check_output(command)
    return res

def main():
    app.run(host="192.168.0.200", port=1213, debug=True)

main()